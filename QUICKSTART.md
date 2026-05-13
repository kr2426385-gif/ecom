# Quick Start Guide

## Running the Application

### Step 1: Start the Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
npm start
```

Expected output:
```
MongoDB connected successfully
Server running on port 5000
```

The backend server will be available at `http://localhost:5000`

### Step 2: Start the Frontend (in a new terminal)

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

The frontend will automatically open at `http://localhost:3000`

## Testing the Application

### 1. Create a New Account
- Click "Get Started" or "Register"
- Fill in:
  - Full Name: e.g., "John Doe"
  - Email: e.g., "john@example.com"
  - Password: (minimum 6 characters)
  - Confirm Password
- Click "Register"

### 2. Login
- Click "Login"
- Enter your email and password
- Click "Login"
- You'll be redirected to the Dashboard

### 3. Dashboard
- View your profile information
- See placeholder sections for Products, Orders, and Favorites
- Click "Logout" to exit

## Testing with API

You can test the backend API directly using Postman or curl:

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## MongoDB Connection Status

The application is configured to connect to your MongoDB Atlas cluster:
- Database: Connected via provided connection string
- Collections: `users` (automatically created)
- User data is stored with hashed passwords

## Troubleshooting

### Backend won't start
- Ensure MongoDB connection string is correct in `.env`
- Check if port 5000 is available
- Run `npm install` to ensure all dependencies are installed

### Frontend won't load
- Ensure backend is running on port 5000
- Clear browser cache and refresh
- Run `npm install` if dependencies are missing

### Login/Register fails
- Check MongoDB connection
- Ensure backend server is running
- Check browser console for error messages

## Next Steps

To extend this application, you can:
1. Add product catalog and shopping cart
2. Implement order management
3. Add payment integration
4. Create admin panel
5. Add product reviews and ratings
6. Implement wishlist functionality

For any issues, check the console logs in both backend and frontend terminals.
