# Sports Facility Booking Platform - Backend

A comprehensive RESTful API for managing sports facility bookings with user authentication, facility management, and booking system.

## 🚀 Features

- **Authentication & Authorization**
  - User signup and login with JWT
  - Role-based access control (Admin, User)
  - Password change functionality
  - Secure password hashing with bcrypt

- **Facility Management**
  - Create, read, update, and delete facilities (Admin)
  - Advanced search and filtering
  - Pagination support
  - Soft delete functionality

- **Booking System**
  - Create bookings with automatic price calculation
  - Check available time slots
  - View all bookings (Admin) or user-specific bookings
  - Cancel bookings
  - Prevent overlapping bookings
  - Date validation

- **Advanced Features**
  - Query builder for filtering, sorting, and pagination
  - Global error handling
  - Input validation with Zod
  - Type-safe with TypeScript
  - Comprehensive API documentation

## 🛠️ Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v4.21.2)
- **Language**: TypeScript (v5.7.3)
- **Database**: MongoDB with Mongoose (v8.9.3)
- **Authentication**: JWT (jsonwebtoken v9.0.2)
- **Validation**: Zod (v3.24.1)
- **Password Hashing**: bcrypt (v5.1.1)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🔧 Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/sports-facility-booking
   JWT_ACCESS_SECRET=your_secret_key_here
   JWT_REFRESH_SECRET=your_refresh_secret_here
   JWT_ACCESS_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   BCRYPT_SALT_ROUNDS=12
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── index.ts      # Environment variables
│   │   └── database.ts   # Database connection
│   ├── errors/           # Custom error classes
│   ├── middlewares/      # Express middlewares
│   │   ├── auth.ts       # Authentication middleware
│   │   ├── validateRequest.ts
│   │   ├── globalErrorHandler.ts
│   │   └── notFound.ts
│   ├── modules/          # Feature modules
│   │   ├── auth/
│   │   ├── user/
│   │   ├── facility/
│   │   └── booking/
│   ├── routes/           # Route aggregator
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/change-password` | Change password | Authenticated |

### Facilities

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/facility` | Create facility | Admin |
| GET | `/api/facility` | Get all facilities | Public |
| GET | `/api/facility/:id` | Get facility by ID | Public |
| PUT | `/api/facility/:id` | Update facility | Admin |
| DELETE | `/api/facility/:id` | Delete facility | Admin |

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/bookings/check-availability` | Check available slots | Public |
| POST | `/api/bookings` | Create booking | User/Admin |
| GET | `/api/bookings` | Get all bookings | Admin |
| GET | `/api/bookings/user` | Get user bookings | User/Admin |
| DELETE | `/api/bookings/:id` | Cancel booking | User/Admin |

## 📝 API Usage Examples

### 1. User Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St, City",
  "role": "user"
}
```

### 2. User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Create Facility (Admin)
```bash
POST /api/facility
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Tennis Court",
  "description": "Professional tennis court",
  "pricePerHour": 50,
  "location": "Downtown Sports Complex",
  "image": "https://example.com/image.jpg"
}
```

### 4. Check Availability
```bash
GET /api/bookings/check-availability?date=2026-02-15&facility=FACILITY_ID
```

### 5. Create Booking
```bash
POST /api/bookings
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "facility": "FACILITY_ID",
  "date": "2026-02-15",
  "startTime": "10:00",
  "endTime": "12:00"
}
```

## 🧪 Testing with Postman

1. Import the Postman collection: `Sports-Facility-Booking-API.postman_collection.json`
2. Set the `baseUrl` variable to `http://localhost:5000`
3. First, signup/login to get a JWT token
4. The token will be automatically saved to environment variables
5. Use the token for authenticated requests

## 🔍 Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Sorting
- `sort`: Sort field (prefix with `-` for descending)
  - Example: `sort=pricePerHour` or `sort=-pricePerHour`

### Filtering
- `searchTerm`: Search in name, location, description
- `date`: Filter bookings by date
- `isBooked`: Filter by booking status (confirmed, unconfirmed, canceled)

### Example
```
GET /api/facility?page=1&limit=10&searchTerm=tennis&sort=-pricePerHour
```

## 🛡️ Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Detailed error message"
    }
  ]
}
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt (12 rounds)
- Role-based access control
- Input validation with Zod
- Protection against common vulnerabilities
- CORS configuration

## 📊 Database Schema

### User Schema
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  role: 'admin' | 'user',
  address: String,
  passwordChangedAt: Date,
  timestamps: true
}
```

### Facility Schema
```typescript
{
  name: String (unique),
  description: String,
  pricePerHour: Number,
  location: String,
  image: String,
  isDeleted: Boolean,
  timestamps: true
}
```

### Booking Schema
```typescript
{
  facility: ObjectId (ref: Facility),
  user: ObjectId (ref: User),
  date: String (YYYY-MM-DD),
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  payableAmount: Number (auto-calculated),
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled',
  timestamps: true
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set secure values for:
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `DATABASE_URL`
