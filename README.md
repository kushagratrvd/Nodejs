# School Management API

A Node.js REST API for managing school data with proximity-based sorting functionality.

## 🚀 Features

- **Add Schools**: Add new schools with name, address, and geographical coordinates
- **List Schools by Proximity**: Retrieve schools sorted by distance from user location
- **Input Validation**: Comprehensive validation for all API inputs
- **Distance Calculation**: Accurate geographical distance calculation using Haversine formula
- **Database Integration**: MySQL database with connection pooling
- **Security**: Helmet.js for security headers and CORS protection

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a MySQL database named `school_management`
   - Update the database configuration in `config.env`

4. **Environment Configuration**
   ```bash
   # Copy and edit the config file
   cp config.env.example config.env
   ```
   
   Update the following variables in `config.env`:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   DB_PORT=3306
   PORT=3000
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### 1. Add School API

**Endpoint:** `POST /addSchool`

**Description:** Add a new school to the database

**Request Body:**
```json
{
  "name": "Example High School",
  "address": "123 Main Street, City, State 12345",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Example High School",
    "address": "123 Main Street, City, State 12345",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "School name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### 2. List Schools API

**Endpoint:** `GET /listSchools`

**Description:** Retrieve all schools sorted by proximity to user location

**Query Parameters:**
- `latitude` (required): User's latitude (-90 to 90)
- `longitude` (required): User's longitude (-180 to 180)

**Example Request:**
```
GET /api/listSchools?latitude=12.9716&longitude=77.5946
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": {
    "userLocation": {
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "totalSchools": 3,
    "schools": [
      {
        "id": 2,
        "name": "Nearby Elementary",
        "address": "456 Oak Avenue, City, State 12345",
        "latitude": 12.9720,
        "longitude": 77.5950,
        "distance": 0.05,
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": 1,
        "name": "Example High School",
        "address": "123 Main Street, City, State 12345",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "distance": 0.12,
        "created_at": "2024-01-15T10:00:00.000Z",
        "updated_at": "2024-01-15T10:00:00.000Z"
      }
    ]
  }
}
```

### 3. Health Check API

**Endpoint:** `GET /health`

**Description:** Check if the API is running

**Response:**
```json
{
  "success": true,
  "message": "School Management API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🗄️ Database Schema

### Schools Table
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔧 Project Structure

```
school-management-api/
├── config/
│   └── database.js          # Database configuration and connection
├── middleware/
│   └── validation.js        # Input validation middleware
├── routes/
│   └── schools.js           # API routes
├── utils/
│   └── distanceCalculator.js # Distance calculation utilities
├── config.env               # Environment variables
├── package.json             # Project dependencies
├── server.js                # Main server file
└── README.md                # Project documentation
```

## 🧪 Testing with Postman

### Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "School Management API",
    "description": "API collection for School Management System",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Example High School\",\n  \"address\": \"123 Main Street, City, State 12345\",\n  \"latitude\": 12.9716,\n  \"longitude\": 77.5946\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/addSchool",
          "host": ["{{baseUrl}}"],
          "path": ["addSchool"]
        }
      }
    },
    {
      "name": "List Schools",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/listSchools?latitude=12.9716&longitude=77.5946",
          "host": ["{{baseUrl}}"],
          "path": ["listSchools"],
          "query": [
            {
              "key": "latitude",
              "value": "12.9716"
            },
            {
              "key": "longitude",
              "value": "77.5946"
            }
          ]
        }
      }
    },
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000/api"
    }
  ]
}
```

### Environment Variables for Postman
- `baseUrl`: `http://localhost:3000/api`

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "school-management-api"
   ```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Comprehensive validation for all inputs
- **SQL Injection Protection**: Parameterized queries
- **Error Handling**: Secure error responses

## 📝 Validation Rules

### Add School API
- **name**: Required, 2-255 characters
- **address**: Required, 5-500 characters
- **latitude**: Required, float between -90 and 90
- **longitude**: Required, float between -180 and 180

### List Schools API
- **latitude**: Required, float between -90 and 90
- **longitude**: Required, float between -180 and 180

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please create an issue in the repository or contact the development team. 