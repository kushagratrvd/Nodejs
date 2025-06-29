import { pool } from '../config/database.js';

const sampleSchools = [
  {
    name: "Central High School",
    address: "123 Main Street, Downtown, City 12345",
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    name: "Riverside Elementary",
    address: "456 Oak Avenue, Riverside, City 12346",
    latitude: 12.9720,
    longitude: 77.5950
  },
  {
    name: "Northside Middle School",
    address: "789 Pine Road, Northside, City 12347",
    latitude: 12.9730,
    longitude: 77.5960
  },
  {
    name: "Southwest Academy",
    address: "321 Elm Street, Southwest, City 12348",
    latitude: 12.9700,
    longitude: 77.5930
  },
  {
    name: "Eastside Preparatory",
    address: "654 Maple Drive, Eastside, City 12349",
    latitude: 12.9740,
    longitude: 77.5970
  },
  {
    name: "Westfield High School",
    address: "987 Cedar Lane, Westfield, City 12350",
    latitude: 12.9690,
    longitude: 77.5920
  },
  {
    name: "Sunset Elementary",
    address: "147 Sunset Boulevard, Sunset District, City 12351",
    latitude: 12.9750,
    longitude: 77.5980
  },
  {
    name: "Mountain View Academy",
    address: "258 Hill Street, Mountain View, City 12352",
    latitude: 12.9680,
    longitude: 77.5910
  }
];

const insertSampleData = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log('🗑️  Clearing existing data...');
    await connection.execute('DELETE FROM schools');
    
    console.log('📝 Inserting sample schools...');
    
    for (const school of sampleSchools) {
      await connection.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [school.name, school.address, school.latitude, school.longitude]
      );
      console.log(`✅ Added: ${school.name}`);
    }
    
    connection.release();
    
    console.log('\n🎉 Sample data inserted successfully!');
    console.log(`📊 Total schools in database: ${sampleSchools.length}`);
    console.log('\n📍 Sample coordinates for testing:');
    console.log('   User Location: 12.9716, 77.5946 (Downtown)');
    console.log('   Test with: GET /api/listSchools?latitude=12.9716&longitude=77.5946');
    
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
    process.exit(1);
  }
};

// Run the script
insertSampleData(); 