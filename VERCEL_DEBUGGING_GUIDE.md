# 🔍 Vercel Backend Debugging Guide

## Method 1: Using Browser DevTools

### Step 1: Open Developer Tools
1. Open your site: https://cineflix-movieapp.vercel.app
2. Press `F12` or `Right-click` → `Inspect`
3. Go to **Network** tab

### Step 2: Test API Calls
1. Try to login with demo credentials
2. Watch the Network tab
3. Look for requests to `/api/auth/login`

### Step 3: Check Response
- Click on the request
- Go to **Response** tab
- You should see JSON like:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {...}
}
```

### Step 4: Check for Errors
- If you see HTML instead of JSON → API routing problem
- If you see 500 error → Function code error
- If you see 404 → Function not found

---

## Method 2: Using Terminal (Command Line)

### Test 1: Check if API Returns JSON
```bash
curl -s https://cineflix-movieapp.vercel.app/api/subscription/plans
```

**Expected:** JSON with subscription plans
**If you see HTML:** API routing is broken

### Test 2: Test Login
```bash
curl -X POST https://cineflix-movieapp.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@cineflix.com","password":"Demo@2024!Secure"}'
```

**Expected:**
```json
{"success":true,"message":"Login successful","user":{...}}
```

### Test 3: Test Signup
```bash
curl -X POST https://cineflix-movieapp.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test123@test.com","password":"Pass123"}'
```

### Test 4: Check Response Headers
```bash
curl -I https://cineflix-movieapp.vercel.app/api/subscription/plans
```

Look for:
- `HTTP/2 200` → Success
- `content-type: application/json` → Correct format
- `server: Vercel` → Deployed on Vercel

---

## Method 3: Vercel Dashboard

### Step 1: Open Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Click on your **cineflix** project

### Step 2: Check Deployment Status
- Look for latest deployment
- Should show: ✅ **Ready**
- If ❌ **Failed** → Click to see error logs

### Step 3: View Function Logs
1. Click on **Deployments**
2. Click on the latest deployment
3. Click on **Functions** tab
4. Click on any function (e.g., `api/auth/login.js`)
5. See execution logs and errors

### Step 4: Real-Time Logs
1. In your project dashboard
2. Click **Logs** in the sidebar
3. Make a request to your API
4. Watch logs appear in real-time

---

## Method 4: Test in Browser Console

### Step 1: Open Console
1. On your site, press `F12`
2. Go to **Console** tab

### Step 2: Test API Directly
```javascript
// Test login
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'demo@cineflix.com',
    password: 'Demo@2024!Secure'
  })
})
.then(r => r.json())
.then(data => console.log('✅ Login Response:', data))
.catch(err => console.error('❌ Error:', err));
```

### Step 3: Test Get Plans
```javascript
fetch('/api/subscription/plans')
  .then(r => r.json())
  .then(data => console.log('✅ Plans:', data))
  .catch(err => console.error('❌ Error:', err));
```

---

## Common Issues & Solutions

### Issue 1: API Returns HTML
**Problem:** Routes not configured correctly
**Check:** vercel.json rewrites
**Solution:** Make sure rewrites exclude /api paths

### Issue 2: 500 Internal Server Error
**Problem:** Code error in serverless function
**Check:** Vercel function logs
**Common causes:**
- Import errors
- Undefined variables
- Async/await issues

### Issue 3: 404 Not Found
**Problem:** Function file not detected
**Check:** 
- File is in `/api` folder
- File exports default function
- File ends in `.js`

### Issue 4: CORS Errors
**Problem:** Missing CORS headers
**Solution:** Add to each function:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

---

## Quick Health Check Checklist

Run these commands to verify everything:

```bash
# 1. Check frontend loads
curl -I https://cineflix-movieapp.vercel.app

# 2. Check API returns JSON
curl -s https://cineflix-movieapp.vercel.app/api/subscription/plans | head -5

# 3. Test login works
curl -X POST https://cineflix-movieapp.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@cineflix.com","password":"Demo@2024!Secure"}' | head -5

# 4. Check for errors
# Open: https://vercel.com/dashboard → Your Project → Logs
```

**All good if:**
- ✅ Frontend returns HTML
- ✅ API returns JSON
- ✅ Login returns success
- ✅ No errors in Vercel logs

---

## Understanding Your Current Issue

### Why New Signups Don't Work:

```
1. User signs up → Signup function creates user → Returns success ✅
2. User tries to login → NEW Login function instance → Only has demo+test users ❌
```

**Each serverless function is independent!**

### The Fix:

You need a **real database** to share data between functions:

**Options:**
1. **Vercel KV (Redis)** - Best for this project
2. **MongoDB Atlas** - Full database
3. **Supabase** - Database + Auth

**For now (demo):**
- ✅ Demo user (`demo@cineflix.com`) always works
- ✅ Test user (`test@test.com`) always works
- ❌ New signups won't persist (serverless limitation)

This is **normal for serverless without a database**!

---

## Next Steps for Production

If you want new signups to work:

1. Add Vercel KV database
2. Update functions to read/write to KV
3. Sessions will persist between function calls

Want me to help set that up? 🚀
