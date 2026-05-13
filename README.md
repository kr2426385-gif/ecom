# Jewelry Shop E-Commerce Website

A full-stack e-commerce website for a jewelry shop built with React (Frontend) and Node.js/Express (Backend) with MongoDB database.

## Project Structure

```
ecommercr/
├── backend/
│   ├── models/
│   │   └── User.js           # MongoDB User schema
│   ├── routes/
│   │   └── auth.js          # Authentication routes
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env                 # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.js  # Protected route component
    │   ├── context/
    │   │   └── AuthContext.js      # Auth context & hooks
    │   ├── pages/
    │   │   ├── Home.js            # Home page
    │   │   ├── Login.js           # Login page
    │   │   ├── Register.js        # Register page
    │   │   ├── Dashboard.js       # User dashboard
    │   │   └── *.css              # Styling
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Protected routes (Dashboard)
- ✅ MongoDB integration
- ✅ Secure password hashing with bcryptjs
- ✅ Responsive UI design
- ✅ Context API for state management

## Backend Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account (connection string provided)

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your MongoDB connection string (already provided)

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

## Frontend Setup

### Prerequisites
- Node.js installed
- Backend running on port 5000

### Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Visit `http://localhost:3000` in your browser
2. Click "Get Started" or "Register" to create a new account
3. Fill in your details and submit
4. Login with your credentials
5. Access your dashboard with personalized greeting

## MongoDB Connection

The application is configured to use MongoDB Atlas with the provided connection string. All user data including authentication information is stored in MongoDB.

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for session management
- Protected routes requiring authentication
- Secure HTTP headers with CORS
- Input validation on both frontend and backend

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JWT (jsonwebtoken)

### Frontend
- React 18
- React Router v6
- Axios
- Context API

## Notes

- JWT token expires in 30 days
- Token is stored in localStorage on the frontend
- Backend runs on port 5000, frontend on port 3000
- CORS is enabled for local development
