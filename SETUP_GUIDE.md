# 🚀 School Management API - Setup Guide

## Quick Start Guide

### Prerequisites Checklist
- [ ] Node.js (v14 or higher) installed
- [ ] MySQL (v8.0 or higher) installed and running
- [ ] Git installed (optional)

### Step 1: Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE school_management;
   ```

2. **Update Database Configuration**
   Edit `config.env` file and update your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   DB_PORT=3306
   ```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

### Step 4: Test the API

1. **Health Check**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Add Sample Data** (Optional)
   ```bash
   npm run sample-data
   ```

3. **Test with Postman**
   - Import `School_Management_API.postman_collection.json` into Postman
   - Set environment variable: `baseUrl = http://localhost:3000/api`

### Step 5: API Testing Examples

#### Add a School
```bash
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test High School",
    "address": "123 Test Street, Test City 12345",
    "latitude": 12.9716,
    "longitude": 77.5946
  }'
```

#### List Schools by Proximity
```bash
curl "http://localhost:3000/api/listSchools?latitude=12.9716&longitude=77.5946"
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check credentials in `config.env`
   - Ensure database `school_management` exists

2. **Port Already in Use**
   - Change PORT in `config.env`
   - Or kill process using port 3000

3. **Module Not Found Errors**
   - Run `npm install` again
   - Delete `node_modules` and run `npm install`

### Verification Steps

1. **Server Status**: Should see "🚀 Server is running on port 3000"
2. **Database**: Should see "✅ Database connected successfully"
3. **Tables**: Should see "✅ Schools table created/verified successfully"

## 📊 Expected Output

### Server Startup
```
🚀 Server is running on port 3000
📊 Environment: development
🔗 API Base URL: http://localhost:3000/api
📝 Available endpoints:
   POST /api/addSchool - Add a new school
   GET /api/listSchools - List schools by proximity
   GET /api/health - Health check
✅ Database connected successfully
✅ Schools table created/verified successfully
```

### Health Check Response
```json
{
  "success": true,
  "message": "School Management API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Next Steps

1. **Test all endpoints** using Postman collection
2. **Add sample data** using `npm run sample-data`
3. **Deploy to production** (see README.md for deployment options)
4. **Customize** the API as needed

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the README.md for detailed documentation
3. Check the console logs for error messages
4. Verify all prerequisites are met 