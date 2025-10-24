# 🚀 CineFlix - Hybrid Development & Deployment Guide

## 📋 Project Architecture

This project supports **two deployment modes**:

### **1. Local Development (Express Backend)**
- Traditional server setup for development
- Express backend on port 5001
- Vite frontend on port 3000
- Hot reload for both frontend and backend

### **2. Production Deployment (Vercel Serverless)**
- Frontend and backend deployed together on Vercel
- Serverless API routes replace Express
- Single deployment URL
- Zero server maintenance

---

## 🏗️ File Structure

```
/cineflix
├── api/                          # Vercel Serverless Functions (Production)
│   ├── auth/
│   │   ├── login.js             # POST /api/auth/login
│   │   ├── signup.js            # POST /api/auth/signup
│   │   └── logout.js            # POST /api/auth/logout
│   └── subscription/
│       ├── plans.js             # GET /api/subscription/plans
│       └── subscribe.js         # POST /api/subscription/subscribe
│
├── backend/                      # Express Backend (Local Development)
│   ├── server.js                # Express server
│   ├── models/                  # Original models (kept for reference)
│   └── routes/                  # Original routes (kept for reference)
│
├── lib/                         # Shared Code (Used by both)
│   ├── users.js                 # User database & operations
│   └── subscriptionPlans.js    # Subscription plans data
│
├── src/                         # React Frontend
│   ├── config/
│   │   └── api.js              # Smart API URL detection
│   ├── utils/
│   │   └── authManager.js      # localStorage-based auth
│   ├── pages/                  # Updated to use new API config
│   └── components/             # Updated to use AuthManager
│
├── vercel.json                  # Vercel configuration
└── package.json                 # Updated scripts
```

---

## 🔧 Development Commands

### **Local Development (Express + Vite)**
```bash
npm start
# Runs:
# - Express backend on http://localhost:5001
# - Vite frontend on http://localhost:3000
```

### **Vercel Dev (Serverless + Vite)**
```bash
vercel dev
# Runs:
# - Serverless functions on http://localhost:3000/api
# - Vite frontend on http://localhost:3000
```

### **Build for Production**
```bash
npm run build
# Creates optimized production build in /dist
```

### **Deploy to Vercel**
```bash
npm run deploy
# Deploys to Vercel production
```

---

## 🔄 How API Switching Works

### **Automatic Environment Detection**

**File:** `src/config/api.js`

```javascript
export const API_CONFIG = {
  EXPRESS_URL: 'http://localhost:5001/api',  // Local Express
  VERCEL_URL: '/api',                        // Vercel Serverless
  
  get BASE_URL() {
    if (import.meta.env.PROD) return this.VERCEL_URL;
    return this.EXPRESS_URL;
  }
};
```

**Development Mode:**
- Uses `http://localhost:5001/api` (Express backend)
- Full backend with real-time updates

**Production Mode (Vercel):**
- Uses `/api` (Serverless functions)
- Same API, different implementation

---

## 🔐 Authentication System

### **localStorage-Based Persistence**

**File:** `src/utils/authManager.js`

**Features:**
- ✅ Session persistence across page refreshes
- ✅ Automatic session expiration (24 hours)
- ✅ Centralized auth management
- ✅ Auto-refresh session on activity

**Usage Example:**
```javascript
import { AuthManager } from '../utils/authManager';

// Save session after login
AuthManager.saveSession(user);

// Check if authenticated
if (AuthManager.isAuthenticated()) {
  // User is logged in
}

// Get current user
const user = AuthManager.getUser();

// Update user after subscription
AuthManager.updateUser({ subscription: newSubscription });

// Logout
AuthManager.clearSession();
```

---

## 📡 API Endpoints

### **Authentication Routes**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/signup` | POST | User registration |
| `/api/auth/logout` | POST | User logout |

### **Subscription Routes**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/subscription/plans` | GET | Get all plans |
| `/api/subscription/subscribe` | POST | Subscribe to plan |

---

## 🎯 Demo Credentials

### **User with Subscription:**
- Email: `demo@cineflix.com`
- Password: `Demo@2024!Secure`
- Access: Direct to browse page

### **User without Subscription:**
- Email: `test@test.com`
- Password: `Test@2024!Pass`
- Access: Redirected to subscription page

---

## 🚀 Deployment Workflow

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Your message"
git push origin main
```

### **Step 2: Deploy to Vercel**

**Option A: Automatic (Recommended)**
1. Connect GitHub repo to Vercel
2. Vercel auto-deploys on every push
3. No manual intervention needed

**Option B: Manual**
```bash
npm run deploy
```

### **Step 3: Verify Deployment**
1. Frontend: `https://your-app.vercel.app`
2. API: `https://your-app.vercel.app/api/subscription/plans`

---

## ⚠️ Important Notes

### **Data Persistence**
- **Local Express:** Data persists while server runs
- **Vercel Serverless:** Data resets between function calls
- **Solution:** AuthManager uses localStorage for demo persistence

### **Session Management**
- Sessions stored in browser (localStorage)
- 24-hour auto-expiration
- Auto-refresh on page activity

### **Production Recommendations**
For real production deployment:
1. Add real database (MongoDB Atlas, Supabase)
2. Implement JWT tokens for auth
3. Use Vercel KV for session storage
4. Add proper password hashing (bcrypt)
5. Implement rate limiting

---

## 🔍 Troubleshooting

### **API not working locally**
```bash
# Check if Express server is running
curl http://localhost:5001/

# Should return: "CineFlix Backend API is running!"
```

### **API not working on Vercel**
```bash
# Check serverless function
curl https://your-app.vercel.app/api/subscription/plans

# Should return: { "success": true, "plans": [...] }
```

### **Session not persisting**
- Clear browser cache
- Check localStorage in DevTools
- Verify AuthManager.isAuthenticated() returns true

### **CORS errors**
- Local: CORS configured in Express
- Vercel: CORS configured in each serverless function

---

## 🎓 Learning Outcomes

This hybrid setup teaches you:
1. ✅ Full-stack development (Express + React)
2. ✅ Serverless architecture (Vercel Functions)
3. ✅ API design and implementation
4. ✅ Authentication patterns
5. ✅ localStorage session management
6. ✅ Environment-based configuration
7. ✅ Modern deployment workflows

---

## 📚 Next Steps

### **For Learning:**
- Experiment with both development modes
- Compare Express vs Serverless behavior
- Test session management

### **For Production:**
- Integrate real database
- Add Vercel KV for sessions
- Implement proper authentication
- Add payment gateway integration

---

**Made with ❤️ for learning full-stack development**
