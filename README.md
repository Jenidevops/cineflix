# 🎬 CineFlix - Full Stack Streaming Platform

A modern Netflix-inspired streaming platform with full-stack authentication, subscription management, and movie browsing capabilities. Built for educational purposes with React, Node.js/Express, and TMDB API.

> **🚀 Deployment Status:** Currently configured for local development. Backend and frontend run together on localhost. Vercel deployment setup available but not activated.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Authentication System](#-authentication-system)
- [Subscription Plans](#-subscription-plans)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### Frontend Features
- 🎥 Browse popular, trending, and top-rated movies
- 🔍 Real-time movie search with TMDB API
- 🎬 Movie details with trailers and reviews
- ⭐ Favorites management with localStorage
- 📺 Continue watching functionality
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Netflix-inspired UI/UX

### Backend Features
- 🔐 User authentication (signup/login/logout)
- 💳 Subscription management with 3 tier plans
- 💰 Mock payment processing (Credit Card, PayPal, UPI)
- 🛡️ Protected routes and session management
- 📊 In-memory database (educational purpose)
- 🔒 Input validation and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 7.1.9** - Build tool and dev server
- **React Router 6.26.0** - Client-side routing
- **Axios 1.12.2** - HTTP client for API calls
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **TMDB API** - Movie database and content

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript module system

### Development Tools
- **Concurrently 9.2.1** - Run multiple commands simultaneously
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
cineflix/
├── backend/                    # Backend server
│   ├── server.js              # Express server entry point
│   ├── models/                # Data models
│   │   ├── users.js          # User database & operations
│   │   └── subscriptionPlans.js  # Subscription plans
│   └── routes/                # API routes
│       ├── auth.js           # Authentication endpoints
│       └── subscription.js   # Subscription endpoints
├── src/                       # Frontend source
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # React entry point
│   ├── index.css             # Global styles
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   ├── MovieCard.jsx    # Movie display card
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Modal.jsx        # Modal component
│   │   ├── ProtectedRoute.jsx  # Route protection
│   │   └── ...              # Other components
│   ├── pages/               # Page components
│   │   ├── GetStarted.jsx   # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── SignUp.jsx       # Registration page
│   │   ├── SubscriptionPlans.jsx  # Plan selection
│   │   ├── Browse.jsx       # Main browse page
│   │   └── Favorites.jsx    # User favorites
│   ├── services/            # API services
│   │   └── tmdbApi.js       # TMDB API integration
│   └── utils/               # Utility functions
│       ├── favoritesManager.js      # Favorites logic
│       └── continueWatchingManager.js  # Watch history
├── public/                  # Static assets
├── package.json            # Dependencies & scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── vercel.json            # Vercel deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (optional for movie browsing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd cineflix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start both servers:**
   ```bash
   npm start
   ```
   This runs both frontend (port 3000) and backend (port 5001) concurrently.

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Individual Server Commands

```bash
# Run backend only
npm run server

# Run frontend only
npm run dev

# Run both (recommended)
npm start
```

## 🔧 Environment Setup

### Optional: TMDB API (for real movie data)

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Get your API key from: https://www.themoviedb.org/settings/api

## 🔐 Authentication System

### Demo Credentials

**User with Active Subscription:**
- Email: `demo@cineflix.com`
- Password: `Demo@2024!Secure`
- Status: Can access browse page directly

**User without Subscription:**
- Email: `test@test.com`
- Password: `Test@2024!Pass`
- Status: Redirected to subscription page

### User Flow

1. **New User:**
   - Visit landing page (/)
   - Click "Get Started"
   - Sign up with email/password
   - Redirected to subscription plans
   - Choose plan and payment method
   - Access browse page

2. **Existing User:**
   - Click "Sign In"
   - Enter credentials
   - Automatic redirect based on subscription status
   - Browse movies if subscribed

3. **Session Management:**
   - User data stored in localStorage
   - Automatic logout clears all data
   - Protected routes check authentication

## 💳 Subscription Plans

### Available Plans

| Plan | Price | Features |
|------|-------|----------|
| **Basic** | $6.99/month | HD quality, Watch on 1 device, Limited content |
| **Standard** | $12.99/month | Full HD quality, Watch on 2 devices, Full catalog |
| **Premium** | $19.99/month | 4K + HDR, Watch on 4 devices, Premium content |

### Payment Methods (Mock)

- **Credit Card** - Simulated card processing
- **PayPal** - Mock PayPal integration
- **UPI** - Mock UPI payment

**Note:** All payments are mocked for educational purposes. No real transactions occur.

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### POST `/auth/signup`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 3,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/auth/login`
Authenticate user and get session data.

**Request:**
```json
{
  "email": "demo@cineflix.com",
  "password": "Demo@2024!Secure"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@cineflix.com",
    "subscription": {
      "planId": 2,
      "planName": "Standard",
      "status": "active",
      "startDate": "2024-01-01",
      "paymentMethod": "credit-card"
    }
  }
}
```

#### POST `/auth/logout`
End user session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Subscription Endpoints

#### GET `/subscription/plans`
Get all available subscription plans.

**Response:**
```json
{
  "success": true,
  "plans": [
    {
      "id": 1,
      "name": "Basic",
      "price": 6.99,
      "features": ["HD", "1 device", "Limited content"]
    }
  ]
}
```

#### POST `/subscription/subscribe`
Subscribe user to a plan.

**Request:**
```json
{
  "userId": 1,
  "planId": 2,
  "paymentMethod": "credit-card",
  "paymentDetails": {
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription activated successfully",
  "subscription": {
    "planId": 2,
    "planName": "Standard",
    "status": "active"
  }
}
```

## 🌐 Deployment

### Current Status: Local Development Only

This project is currently configured to run **locally** with both frontend and backend servers:

- **Frontend:** http://localhost:3000 (React + Vite)
- **Backend:** http://localhost:5001 (Express API)

To run the full application:
```bash
npm start
```

### Future Deployment Options

When you're ready to deploy to production, you have these options:

#### Option 1: Frontend on Vercel + Backend on Railway/Render

**Frontend (Vercel):**
1. The `vercel.json` configuration is already set up
2. Simply connect your GitHub repository to Vercel
3. Add TMDB environment variables if needed

**Backend (Railway/Render):**
1. Deploy Express backend separately
2. Update frontend API URL to point to deployed backend
3. Add persistent database (MongoDB, PostgreSQL)

#### Option 2: Full-Stack on Single Platform
- Use platforms like Heroku, Railway, or Render that support both frontend and backend
- Configure monorepo deployment

**Note:** Current setup uses in-memory storage and is perfect for learning and local development. For production deployment, you'll need to migrate to a real database.

### Production Considerations (For Future Deployment)

When ready to deploy, you'll need to:
1. Replace in-memory database with persistent storage (MongoDB, PostgreSQL)
2. Add real authentication with JWT/sessions
3. Implement real payment processing (Stripe, PayPal API)
4. Add environment-based configuration
5. Set up proper CORS policies for production domains
6. Add rate limiting and security headers
7. Update API URLs from localhost to production URLs

## 🔍 Troubleshooting

### Common Issues

**1. Servers not starting**
```bash
# Kill processes on ports
lsof -ti:5001 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Restart
npm start
```

**2. Login form not clickable (large screens)**
- Clear browser cache (Cmd+Shift+R on Mac)
- Ensure latest code is pulled
- Check z-index fix is applied in Login.jsx

**3. Chrome password breach warning**
- Demo passwords are intentionally complex to avoid this
- Use provided credentials or create new strong passwords

**4. Cannot access browse page**
- Ensure you're logged in with a user that has an active subscription
- Use `demo@cineflix.com` / `Demo@2024!Secure` for testing

**5. Movies not loading**
- Add TMDB API key to `.env` file
- Check internet connection
- Verify TMDB API key is valid

**6. Backend API errors**
```bash
# Check backend is running
curl http://localhost:5001/

# Should return: "CineFlix Backend API is running!"
```

### Reset Application State

```bash
# Clear all localStorage (in browser console)
localStorage.clear()

# Restart servers (will reset in-memory database)
npm start
```

## 📝 Development Notes

### Educational Purpose
This project is built for **learning purposes** and demonstrates:
- Full-stack application architecture
- React component design patterns
- Express REST API development
- Authentication flows
- Subscription management
- Mock payment integration

### Not Production-Ready
Current limitations:
- In-memory database (data lost on restart)
- localStorage authentication (not secure)
- Mock payments (no real transactions)
- No data persistence
- No advanced security measures

### Future Enhancements
- Real database (MongoDB/PostgreSQL)
- JWT authentication
- Real payment gateway integration
- User profile management
- Watchlist and recommendations
- Admin dashboard
- Email verification
- Password reset functionality

## 📄 License

MIT License - Feel free to use this project for learning!

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

---

**Made with ❤️ for learning full-stack development**

For questions or issues, please check the troubleshooting section above.
