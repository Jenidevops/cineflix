# 🎬 CineFlix - Netflix Clone

<div align="center">
  <h3>Production-Ready Streaming Platform with MongoDB Atlas</h3>
  <p>Full-stack Netflix clone featuring secure authentication, real database integration, and responsive design</p>
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://cineflix-movieapp.vercel.app)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
</div>

---

## 🌟 Features

### 🔐 Authentication & Security
- ✅ **Secure User Registration** - bcrypt password hashing (10 salt rounds)
- ✅ **MongoDB Atlas Database** - Production-ready cloud database
- ✅ **Password Reset System** - 6-digit verification code with 15-min expiry
- ✅ **Remember Me Feature** - Secure email persistence only
- ✅ **24-Hour Sessions** - Auto-expiring sessions with refresh
- ✅ **Show/Hide Password** - Enhanced UX on all auth forms

### 🎥 Content Features
- 🎬 **Browse Movies & TV Shows** - TMDB API integration
- 🔍 **Real-Time Search** - Search entire movie catalog
- ⭐ **Favorites System** - Persistent favorites with counter
- 📺 **Continue Watching** - Resume playback progress
- 🎭 **Movie Details** - Trailers, reviews, cast, related movies
- 🎯 **Category Filtering** - Trending, Top 10, by Genre

### 💳 Subscription System
- 📦 **4 Subscription Plans** - Mobile, Basic, Standard, Premium
- 💰 **Payment Integration** - Mock payment gateway (Credit Card, PayPal, UPI)
- 🔒 **Protected Routes** - Content access based on subscription
- 📊 **Subscription Tracking** - Status stored in MongoDB

### 🎨 User Experience
- 📱 **Fully Responsive** - Mobile, tablet, desktop optimized
- 🎭 **Netflix-Inspired UI** - Modern, clean interface
- ⚡ **No Page Flickering** - Event-based state management
- 🖱️ **Stable Dropdowns** - Smooth hover interactions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | Modern UI library |
| Vite | 7.1.9 | Lightning-fast build tool |
| React Router | 6.26.0 | Client-side routing |
| Axios | 1.12.2 | HTTP client |
| Tailwind CSS | 3.4.11 | Utility-first styling |
| Lucide React | 0.445.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| MongoDB Atlas | - | Cloud NoSQL database |
| Mongoose | 8.x | ODM for MongoDB |
| bcryptjs | 2.x | Password hashing |
| Vercel Serverless | - | API endpoints |

### APIs & Services
- **TMDB API** - Movie & TV show data
- **Vercel** - Hosting & deployment
- **MongoDB Atlas** - Database hosting

---

## 📁 Project Structure

```
cineflix/
├── api/                          # Serverless API Functions
│   ├── auth/
│   │   ├── login.js             # User authentication
│   │   ├── signup.js            # User registration
│   │   ├── logout.js            # Session cleanup
│   │   ├── forgot-password.js   # Password reset (generate code)
│   │   └── reset-password.js    # Password reset (verify code)
│   └── subscription/
│       ├── plans.js             # Get subscription plans
│       └── subscribe.js         # Handle subscriptions
├── lib/
│   ├── mongodb.js               # MongoDB connection (with caching)
│   └── models/
│       └── User.js              # Mongoose User schema
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx          # Navigation with profile dropdown
│   │   ├── Hero.jsx            # Homepage hero section
│   │   ├── MovieCard.jsx       # Movie display cards
│   │   ├── Footer.jsx          # Footer component
│   │   └── ...
│   ├── pages/
│   │   ├── GetStarted.jsx      # Landing page
│   │   ├── Login.jsx           # Login with remember me
│   │   ├── SignUp.jsx          # Registration form
│   │   ├── ForgotPassword.jsx  # Password reset flow
│   │   ├── Browse.jsx          # Main browse page
│   │   ├── Favorites.jsx       # User favorites
│   │   └── SubscriptionPlans.jsx
│   ├── utils/
│   │   ├── authManager.js      # Auth state management
│   │   ├── favoritesManager.js # Favorites logic
│   │   └── continueWatchingManager.js
│   ├── services/
│   │   └── tmdbApi.js          # TMDB API integration
│   └── config/
│       └── api.js              # API URL configuration
├── .env                         # Environment variables (not in git)
├── .env.example                 # Template for environment setup
├── .gitignore                   # Git ignore rules
├── vercel.json                  # Vercel deployment config
└── package.json                 # Dependencies and scripts
```

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+
npm or yarn
MongoDB Atlas account (free tier)
TMDB API key (optional)
```

### 1. Clone Repository
```bash
git clone https://github.com/Jenidevops/cineflix.git
cd cineflix
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create `.env` file in root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/cineflix?retryWrites=true&w=majority

# TMDB API (Optional - for movie data)
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Important:** Never commit `.env` to git. It's already in `.gitignore`.

### 4. Run Development Server
```bash
npm run dev
```
Visit http://localhost:5173

### 5. Build for Production
```bash
npm run build
```

---

## 🔐 MongoDB Atlas Setup

### Step 1: Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Database name: `cineflix`

### Step 2: Create User
1. Navigate to: **Database Access**
2. Click **Add New Database User**
3. Create username and strong password
4. Set permissions: **Read and write to any database**

### Step 3: Network Access
1. Navigate to: **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
   - Required for Vercel serverless functions

### Step 4: Get Connection String
1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy connection string
4. Replace `<password>` with your database user password
5. Add to `.env` file

---

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Add environment variables:
   - `MONGODB_URI` - Your MongoDB connection string

### Environment Variables in Vercel

1. Project Settings → Environment Variables
2. Add:
   ```
   Name: MONGODB_URI
   Value: mongodb+srv://...
   Environment: Production
   ```
3. Save and redeploy

---

## 🔑 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/signup`
Register new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": null,
    "createdAt": "2025-10-30T12:00:00.000Z"
  }
}
```

#### POST `/api/auth/login`
Authenticate user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": {
      "planId": 2,
      "planName": "Standard",
      "status": "active"
    }
  }
}
```

#### POST `/api/auth/forgot-password`
Generate password reset code

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reset code generated successfully",
  "resetCode": "123456",
  "note": "In production, this code would be sent via email"
}
```

#### POST `/api/auth/reset-password`
Reset password with verification code

**Request:**
```json
{
  "email": "john@example.com",
  "resetCode": "123456",
  "newPassword": "NewSecurePass456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Subscription Endpoints

#### GET `/api/subscription/plans`
Get all available subscription plans

**Response:**
```json
{
  "success": true,
  "plans": [
    {
      "id": 1,
      "name": "Mobile",
      "price": 4.99,
      "features": ["Mobile only", "SD quality", "1 device"]
    },
    {
      "id": 2,
      "name": "Basic",
      "price": 9.99,
      "features": ["Watch on phone, tablet, laptop, TV", "HD quality", "2 devices"]
    }
  ]
}
```

#### POST `/api/subscription/subscribe`
Subscribe user to a plan

**Request:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
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
    "planName": "Basic",
    "status": "active",
    "startDate": "2025-10-30T12:00:00.000Z"
  }
}
```

---

## 🔒 Security Features

### Implemented Security Measures

- ✅ **bcrypt Password Hashing** - Salt rounds: 10
- ✅ **Password Never Stored Plain** - Always hashed in database
- ✅ **Session Management** - 24-hour auto-expiring sessions
- ✅ **Input Validation** - Server-side validation on all endpoints
- ✅ **CORS Protection** - Configured for security
- ✅ **Protected Routes** - Auth required for content access
- ✅ **Reset Code Expiry** - 15-minute validity for password resets
- ✅ **Mongoose Schema Validation** - Prevents injection attacks
- ✅ **Environment Variables** - Credentials never in source code
- ✅ **Event-Based Auth** - No password in localStorage

### Password Security
```javascript
// Passwords are hashed before storing
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Password comparison for login
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
```

---

## 🎯 Key Features Implementation

### 1. Authentication Flow
1. User registers → Password hashed with bcrypt → Stored in MongoDB
2. User logs in → Password compared → JWT session created
3. Session stored in localStorage (24-hour expiry)
4. Custom events trigger state updates (no flickering)

### 2. Password Reset
1. User clicks "Forgot password?"
2. Enters email → 6-digit code generated
3. Code stored in MongoDB with 15-minute expiry
4. User enters code + new password
5. Password updated and code invalidated

### 3. Remember Me
- Saves **email only** (never password)
- Stored in localStorage as `cineflix_remembered_email`
- Auto-fills email on next login
- Industry-standard security practice

### 4. Session Management
```javascript
// Save session (login)
AuthManager.saveSession(user)
window.dispatchEvent(new CustomEvent('authChanged'))

// Clear session (logout)
AuthManager.clearSession()
window.dispatchEvent(new CustomEvent('authChanged'))

// Event-based updates (no flickering)
window.addEventListener('authChanged', handleAuthChange)
```

---

## 📊 Database Schema

### User Model
```javascript
{
  name: {
    type: String,
    required: true,
    maxlength: 60
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Not returned by default
  },
  resetCode: {
    type: String,
    select: false
  },
  resetCodeExpiry: {
    type: Date,
    select: false
  },
  subscription: {
    planId: Number,
    planName: String,
    status: String,  // 'active' | 'inactive' | 'cancelled'
    startDate: Date,
    paymentMethod: String,
    transactionId: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🐛 Bug Fixes & Improvements

### Recent Updates
- ✅ Fixed password double-hashing bug in Mongoose pre-save hook
- ✅ Eliminated page flickering with event-based authentication
- ✅ Fixed navigation after login (event system)
- ✅ Improved dropdown menu stability
- ✅ Added show/hide password toggle
- ✅ Implemented remember me feature
- ✅ Added password reset functionality
- ✅ Removed localStorage fallback authentication
- ✅ Added comprehensive error logging
- ✅ Fixed session persistence across page reloads

---

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Tablet Support** - Adaptive layouts
- **Desktop Experience** - Full-featured interface
- **Touch Friendly** - Optimized interactions

---

## 🗺️ Roadmap

### Completed ✅
- [x] MongoDB Atlas integration
- [x] bcrypt password hashing
- [x] Password reset functionality
- [x] Remember me feature
- [x] Event-based authentication
- [x] Show/hide password toggle
- [x] Stable dropdown menus
- [x] Vercel serverless deployment

### In Progress 🚧
- [ ] Email delivery for password reset codes
- [ ] User profile management
- [ ] Admin dashboard

### Planned 📋
- [ ] Email verification on signup
- [ ] Real payment gateway (Stripe)
- [ ] Recommendation engine
- [ ] Multi-language support
- [ ] Social features (reviews, sharing)
- [ ] Watch party feature
- [ ] Download for offline viewing

---

## 💼 For Recruiters & Developers

### This Project Demonstrates:

**Frontend Skills:**
- React 18 with modern hooks (useState, useEffect, useContext)
- Component-based architecture
- React Router for SPA navigation
- Axios for API integration
- Tailwind CSS for responsive design
- State management patterns

**Backend Skills:**
- MongoDB & Mongoose ODM
- RESTful API design
- Serverless architecture (Vercel Functions)
- bcrypt password hashing
- Input validation & error handling
- CORS configuration

**Database Skills:**
- NoSQL database design
- Mongoose schema modeling
- Database indexing (unique email)
- Data validation
- Query optimization

**DevOps & Tools:**
- Git version control
- CI/CD with Vercel
- Environment variable management
- Production deployment
- Security best practices

**Best Practices:**
- Clean, maintainable code
- Comprehensive documentation
- Security-first approach
- Error handling
- Performance optimization
- Responsive design patterns

---

## 📄 License

This project is licensed under the MIT License - free to use for learning and portfolios.

---

## 👨‍💻 Author

**Jenifer Nirmal Raj**
- GitHub: [@Jenidevops](https://github.com/Jenidevops)
- Repository: [CineFlix](https://github.com/Jenidevops/cineflix)
- Live Demo: [cineflix-movieapp.vercel.app](https://cineflix-movieapp.vercel.app)

---

## 🙏 Acknowledgments

- [Netflix](https://netflix.com) - Design inspiration
- [TMDB](https://www.themoviedb.org) - Movie database API
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Vercel](https://vercel.com) - Deployment platform
- [React](https://react.dev) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling framework

---

## 🔗 Live Demo

**Production URL:** [https://cineflix-movieapp.vercel.app](https://cineflix-movieapp.vercel.app)

### Test the Application

1. ✅ **Sign Up** - Create new account
2. ✅ **Login** - Test remember me feature
3. ✅ **Password Reset** - Try forgot password flow
4. ✅ **Browse Movies** - Search and add favorites
5. ✅ **Subscription** - Select a plan
6. ✅ **Responsive** - Test on mobile device

---

<div align="center">
  <h3>Made with ❤️ by Jenifer Nirmal Raj</h3>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p><a href="https://cineflix-movieapp.vercel.app">View Live Demo</a> • <a href="https://github.com/Jenidevops/cineflix/issues">Report Bug</a> • <a href="https://github.com/Jenidevops/cineflix/issues">Request Feature</a></p>
</div>
