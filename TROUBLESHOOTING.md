# 🔧 Troubleshooting White Page on Vercel

If you're seeing a white page after deploying to Vercel, follow these steps:

## ⚡ Quick Fix (Most Common Issue)

### The Problem
Your environment variables are not set in Vercel!

### The Solution

1. **Go to your Vercel project dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your `cineflix` project

2. **Add Environment Variables**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the sidebar
   - Add these three variables:

   ```
   Name: VITE_TMDB_API_KEY
   Value: [Your actual TMDB API key]
   Environment: Production, Preview, Development (select all)
   
   Name: VITE_TMDB_BASE_URL
   Value: https://api.themoviedb.org/3
   Environment: Production, Preview, Development (select all)
   
   Name: VITE_TMDB_IMAGE_BASE_URL
   Value: https://image.tmdb.org/t/p
   Environment: Production, Preview, Development (select all)
   ```

3. **Redeploy Your Site**
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Wait 1-2 minutes for the build to complete

4. **Test Your Site**
   - Visit your Vercel URL
   - The site should now load! 🎉

---

## 🔍 Other Common Issues & Fixes

### Issue 1: Still See White Page After Adding Variables?

**Check Browser Console:**
1. Open your deployed site
2. Press `F12` (or right-click → Inspect)
3. Go to **Console** tab
4. Look for error messages

**Common Errors:**
- `Failed to fetch` → API key is wrong or not set
- `Uncaught ReferenceError` → JavaScript error, check logs
- `404 Not Found` → Routing issue

### Issue 2: Build Failed in Vercel

**Check Build Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click on the failed deployment
3. Check the **Build Logs** tab

**Common Build Errors:**
```bash
# If you see: "terser not found"
Solution: Already fixed in package.json

# If you see: "Module not found"
Solution: Run `npm install` locally and push changes

# If you see: "Command failed with exit code 1"
Solution: Check the specific error in logs
```

### Issue 3: Site Loads But No Movies Show

**This means:**
- Your site is working ✓
- But TMDB API calls are failing

**Fix:**
1. Verify your TMDB API key is correct
2. Check the browser console for API errors
3. Make sure you added the environment variables in Vercel
4. Try generating a new TMDB API key

---

## 📋 Complete Troubleshooting Checklist

### Pre-Flight Checks
- [ ] You have a TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)
- [ ] Your code is pushed to GitHub
- [ ] You've connected Vercel to your GitHub repository

### Environment Variables Check
- [ ] `VITE_TMDB_API_KEY` is set in Vercel
- [ ] `VITE_TMDB_BASE_URL` is set to `https://api.themoviedb.org/3`
- [ ] `VITE_TMDB_IMAGE_BASE_URL` is set to `https://image.tmdb.org/t/p`
- [ ] All variables are set for **Production** environment
- [ ] You redeployed after adding variables

### Build Check
- [ ] Build completed successfully (green checkmark in Vercel)
- [ ] No errors in build logs
- [ ] Build time is reasonable (1-3 minutes)

### Browser Check
- [ ] Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- [ ] Try incognito/private browsing mode
- [ ] Check browser console for errors (F12)
- [ ] Try different browser

---

## 🎯 Step-by-Step Fix (Start Here)

### Step 1: Get Your TMDB API Key

If you don't have one:
1. Go to https://www.themoviedb.org/signup
2. Create free account
3. Go to Settings → API → Request API Key
4. Choose "Developer" option
5. Fill in the form (you can use example data)
6. Copy your API Key (v3 auth)

### Step 2: Add Variables to Vercel

```bash
# Go to Vercel Dashboard
https://vercel.com/dashboard

# Navigate to:
Your Project → Settings → Environment Variables

# Add each variable with the exact names shown above
```

### Step 3: Redeploy

**Option A - Via Dashboard:**
1. Go to Deployments tab
2. Click ⋯ menu on latest deployment
3. Click "Redeploy"

**Option B - Via Git Push:**
```bash
cd /Users/jenifernirmalraj/Desktop/FSD.HTML/cineflix

# Make a small change (add a space somewhere)
git add .
git commit -m "Trigger redeploy"
git push origin main

# Vercel will auto-redeploy
```

### Step 4: Verify It Works

1. Wait for deployment to finish
2. Visit your Vercel URL
3. You should see the CineFlix homepage
4. Check that movies are loading

---

## 🚨 Emergency Reset

If nothing works, try this:

```bash
# 1. Delete the project from Vercel dashboard
# 2. Redeploy from scratch:

# Go to vercel.com/new
# Import your GitHub repository again
# Add environment variables (don't forget this!)
# Deploy
```

---

## 📞 Need Help?

### Check These First:
1. ✅ TMDB API key is valid (test it at https://www.themoviedb.org/settings/api)
2. ✅ Environment variables are spelled correctly (case-sensitive!)
3. ✅ You clicked "Save" after adding each variable
4. ✅ You redeployed after adding variables

### Still Not Working?

**Check Browser Console:**
```javascript
// Open Console (F12) and type:
console.log('API Key set:', !!import.meta.env.VITE_TMDB_API_KEY)

// If it shows "false", environment variables aren't loading
```

**Check Network Tab:**
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for failed requests (red)
5. Click on failed request to see error details

---

## ✅ Success Indicators

Your site is working if you see:
- ✅ CineFlix logo and navigation
- ✅ Hero section with background image
- ✅ Movie rows loading
- ✅ Search bar functional
- ✅ No errors in console

---

## 📖 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- Your project's `QUICKSTART.md` file
- Your project's `DEPLOYMENT.md` file

---

**Most likely fix:** Just add the environment variables in Vercel and redeploy! 🚀
