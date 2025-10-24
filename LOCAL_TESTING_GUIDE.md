# 🧪 Local Testing Guide

## Quick Start - Testing Locally

### Step 1: Start Both Servers

```bash
# Open Terminal and run:
cd /Users/jenifernirmalraj/Desktop/cineflix
npm start
```

This will start:
- ✅ **Backend** on `http://localhost:5001`
- ✅ **Frontend** on `http://localhost:3000`

### Step 2: Verify Backend is Running

Open a NEW terminal tab and run:

```bash
# Test 1: Check backend health
curl http://localhost:5001/api/health

# Expected output:
# {"status":"Server is running!"}

# Test 2: Check subscription plans
curl http://localhost:5001/api/subscription/plans

# Expected: JSON with 3 subscription plans
```

### Step 3: Open Frontend in Browser

1. Open browser: `http://localhost:3000`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. You should see: `🔧 API Configuration: { environment: 'development', apiUrl: 'http://localhost:5001/api' }`

### Step 4: Test Signup Flow

1. Click "Get Started" or go to `/signup`
2. Fill in the form:
   - Name: Test User
   - Email: newuser123@test.com  
   - Password: Pass123
3. Click "Sign Up"
4. **Check Browser Console** for logs:
   - Should see: "⚠️ Backend signup failed, using localStorage fallback" (this is NORMAL!)
   - Then: "✅ User saved to localStorage"
   - Then: "✅ User created in localStorage and logged in"
5. You should be redirected to `/subscription` page

### Step 5: Test Subscription Plans Page

1. After signup, you should see subscription plans
2. If you see "Failed to load subscription plans" error:
   - Open Browser Console (F12)
   - Look for error messages
   - Check Network tab for failed requests

**Common Issues:**

#### Issue: "Failed to load subscription plans"

**Solution 1: Check Backend is Running**
```bash
# In a new terminal:
curl http://localhost:5001/api/subscription/plans

# If this fails, backend is not running
# Restart with: npm start
```

**Solution 2: Check CORS**
```bash
# Test from command line:
curl -v http://localhost:5001/api/subscription/plans

# Look for these headers:
# access-control-allow-origin: *
```

**Solution 3: Check API Config**
Open browser console on `http://localhost:3000` and type:
```javascript
// Check current API URL
console.log(window.location.hostname); // Should be 'localhost'

// Manually test fetch
fetch('http://localhost:5001/api/subscription/plans')
  .then(r => r.json())
  .then(d => console.log('✅ Plans:', d))
  .catch(e => console.error('❌ Error:', e));
```

### Step 6: Test Login with localStorage User

1. After signup, logout (or open new incognito window)
2. Go to `/login`
3. Enter the same credentials you just created:
   - Email: newuser123@test.com
   - Password: Pass123
4. Click "Sign In"
5. **Check Browser Console**:
   - Should see: "⚠️ Backend login failed, checking localStorage"
   - Then: "✅ Logged in with localStorage user"
6. You should be redirected to `/subscription` page

### Step 7: Complete Full Flow Test

1. **Signup**: Create account → Stored in localStorage
2. **Subscribe**: Choose plan → Payment → Gets subscription
3. **Browse**: Redirected to browse page
4. **Logout**: Clear session
5. **Login**: Use same credentials → Works!

---

## Debugging Tools

### Check localStorage Users

Open Browser Console (`F12`) and run:

```javascript
// View all localStorage users
console.log(JSON.parse(localStorage.getItem('cineflix_local_users')));

// View current user session
console.log(JSON.parse(localStorage.getItem('cineflix_user')));

// Count users
const users = JSON.parse(localStorage.getItem('cineflix_local_users') || '[]');
console.log(`Total users: ${users.length}`);

// Clear all users (reset)
localStorage.removeItem('cineflix_local_users');
console.log('✅ All users cleared');
```

### Check Current Session

```javascript
// Check if logged in
console.log('Authenticated:', localStorage.getItem('cineflix_isAuthenticated'));

// View current user
console.log('User:', JSON.parse(localStorage.getItem('cineflix_user')));

// Logout
localStorage.clear();
window.location.reload();
```

### Test Backend Directly

```bash
# Test signup
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"backend@test.com","password":"Pass123"}'

# Test login  
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@cineflix.com","password":"Demo@2024!Secure"}'
```

---

## How It Works: Hybrid System

### Local Development Flow:

```
1. User signs up
   ├─→ Try backend first (http://localhost:5001)
   └─→ If backend fails → Save to localStorage ✅

2. User logs in  
   ├─→ Try backend first (demo/test users work)
   └─→ If backend fails → Check localStorage ✅

3. User subscribes
   ├─→ Try backend first
   └─→ If backend fails → Save to localStorage ✅
```

### What Gets Stored in localStorage:

```javascript
{
  cineflix_local_users: [
    {
      id: 100,
      name: "New User",
      email: "newuser@test.com",
      password: "Pass123",
      subscription: {
        planId: "premium",
        planName: "Premium",
        status: "active",
        startDate: "2025-10-24...",
        paymentMethod: "credit-card"
      },
      isLocalUser: true,
      createdAt: "2025-10-24..."
    }
  ],
  cineflix_user: { /* current session */ },
  cineflix_isAuthenticated: "true",
  cineflix_session_timestamp: "1729789..."
}
```

---

## Expected Behavior

✅ **Demo users** (`demo@cineflix.com`) → Work via backend
✅ **Test users** (`test@test.com`) → Work via backend  
✅ **New signups** → Saved to localStorage, persist in browser
✅ **Login with new user** → Checks localStorage, works!
✅ **Subscription** → Saves to localStorage
✅ **Session** → Lasts 24 hours, auto-refresh

❌ **localStorage users DON'T sync** between:
- Different browsers
- Different computers
- Incognito mode (cleared when closed)

---

## Ready to Deploy?

Once local testing works perfectly:

```bash
# Stage changes
git add -A

# Commit
git commit -m "Add localStorage support for new user signups and authentication"

# Push to Vercel
git push origin main
```

Vercel will automatically deploy! 🚀

---

## Troubleshooting

### "Failed to load subscription plans"

1. Check backend is running: `curl http://localhost:5001/api/health`
2. Check browser console for errors
3. Check Network tab - is request reaching backend?
4. Try manual fetch in console (see above)

### "User not found" after signup

1. Check localStorage: `LocalUsersManager.getLocalUsers()` in console
2. User should be in array with `isLocalUser: true`
3. If not, check browser console for signup errors

### Session expires immediately

1. Check session timestamp: `localStorage.getItem('cineflix_session_timestamp')`
2. Should be recent Unix timestamp
3. Sessions last 24 hours from last activity

### CORS errors

1. Check backend has CORS enabled (it does in server.js)
2. Restart backend: `npm start`
3. Clear browser cache

---

## Success Checklist

Before pushing to production, verify:

- [ ] Backend runs on port 5001
- [ ] Frontend runs on port 3000
- [ ] Can fetch `/api/subscription/plans`
- [ ] Can signup with new email
- [ ] New user saved to localStorage
- [ ] Can login with new user
- [ ] Can subscribe to a plan
- [ ] Subscription saved to localStorage
- [ ] Can logout and login again
- [ ] Session persists after page reload
- [ ] No console errors

**All green? Ready to deploy!** ✅
