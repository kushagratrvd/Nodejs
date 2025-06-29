import express from 'express';
import { pool } from '../config/database.js';
import { sortSchoolsByDistance } from '../utils/distanceCalculator.js';
import { validateAddSchool, validateListSchools } from '../middleware/validation.js';

const router = express.Router();

// Add School API
// POST /addSchool
router.post('/addSchool', validateAddSchool, async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    
    const connection = await pool.getConnection();
    
    // Check if school with same name and address already exists
    const [existingSchools] = await connection.execute(
      'SELECT id FROM schools WHERE name = ? AND address = ?',
      [name, address]
    );
    
    if (existingSchools.length > 0) {
      connection.release();
      return res.status(409).json({
        success: false,
        message: 'School with this name and address already exists'
      });
    }
    
    // Insert new school
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, parseFloat(latitude), parseFloat(longitude)]
    );
    
    connection.release();
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    });
    
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// List Schools API
// GET /listSchools?latitude=12.9716&longitude=77.5946
router.get('/listSchools', validateListSchools, async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    const connection = await pool.getConnection();
    
    // Fetch all schools
    const [schools] = await connection.execute(
      'SELECT id, name, address, latitude, longitude, created_at, updated_at FROM schools ORDER BY name'
    );
    
    connection.release();
    
    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found',
        data: []
      });
    }
    
    // Sort schools by distance from user location
    const sortedSchools = sortSchoolsByDistance(
      schools, 
      parseFloat(latitude), 
      parseFloat(longitude)
    );
    
    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      data: {
        userLocation: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        },
        totalSchools: sortedSchools.length,
        schools: sortedSchools.map(school => ({
          id: school.id,
          name: school.name,
          address: school.address,
          latitude: school.latitude,
          longitude: school.longitude,
          distance: Math.round(school.distance * 100) / 100, // Round to 2 decimal places
          created_at: school.created_at,
          updated_at: school.updated_at
        }))
      }
    });
    
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Management API is running',
    timestamp: new Date().toISOString()
  });
});

export default router; 