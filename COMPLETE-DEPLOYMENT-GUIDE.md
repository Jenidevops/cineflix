# 🚀 Complete Guide: Deploy CineFlix to Vercel (From Scratch)

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] TMDB API key (we'll get this)
- [ ] Your code is on GitHub

---

## Part 1: Get TMDB API Key (5 minutes)

### Step 1: Create TMDB Account

1. Go to: **https://www.themoviedb.org/signup**
2. Fill in the form:
   - Username: (choose any)
   - Password: (create one)
   - Email: (your email)
3. Click **"Sign Up"**
4. Check your email and click verification link

### Step 2: Request API Key

1. Log in to TMDB
2. Go to: **https://www.themoviedb.org/settings/api**
3. Click **"Request an API Key"**
4. Choose **"Developer"** option
5. Accept the terms
6. Fill in the application form:
   ```
   Application Name: CineFlix
   Application URL: https://your-name.vercel.app (or just http://localhost:3000)
   Application Summary: A movie browsing web application for learning
   ```
7. Submit the form
8. **Copy your API Key (v3 auth)** - You'll need this!
   - It looks like: `abc123def456ghi789jkl012mno345pq`
   - Keep it safe!

---

## Part 2: Verify GitHub Repository (2 minutes)

### Step 1: Check Your Code is on GitHub

1. Go to: **https://github.com/Jenidevops/cineflix**
2. Verify you see all your files:
   - ✓ `src/` folder
   - ✓ `public/` folder
   - ✓ `package.json`
   - ✓ `vite.config.js`
   - ✓ `vercel.json`
   - ✓ `.env.example`
   - ✓ Documentation files

**If files are missing:** You need to push your local code first

---

## Part 3: Deploy to Vercel (10 minutes)

### Step 1: Go to Vercel

1. Open browser and go to: **https://vercel.com**
2. Click **"Sign Up"** (if new) or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### Step 2: Create New Project

1. You'll land on the Vercel Dashboard
2. Click **"Add New..."** button (top right)
3. Select **"Project"**
4. You'll see "Import Git Repository" page

### Step 3: Import Your GitHub Repository

1. Find **"Import Git Repository"** section
2. If you don't see your repository:
   - Click **"Adjust GitHub App Permissions"**
   - Select repositories you want to access
   - Choose **"Jenidevops/cineflix"**
   - Click **"Install"**
3. Back on Vercel, click **"Import"** next to **cineflix** repository

### Step 4: Configure Project

You'll see the "Configure Project" page:

```
┌─────────────────────────────────────────────────────────┐
│ Configure Project                                       │
├─────────────────────────────────────────────────────────┤
│ Project Name:    cineflix                       [Keep]  │
│ Framework:       Vite                   [Auto-detected] │
│ Root Directory:  ./                             [Keep]  │
│ Build Command:   npm run build          [Auto-detected] │
│ Output Dir:      dist                   [Auto-detected] │
└─────────────────────────────────────────────────────────┘
```

**Leave all settings as they are** - Vercel detects everything automatically!

### Step 5: Add Environment Variables (CRITICAL!)

**Don't click Deploy yet!** First, add environment variables:

1. Click **"Environment Variables"** dropdown (expand it)

2. **Add First Variable:**
   ```
   Name: VITE_TMDB_API_KEY
   Value: [Paste your TMDB API key from Part 1]
   ```
   Click "Add" (the small + icon)

3. **Add Second Variable:**
   ```
   Name: VITE_TMDB_BASE_URL
   Value: https://api.themoviedb.org/3
   ```
   Click "Add"

4. **Add Third Variable:**
   ```
   Name: VITE_TMDB_IMAGE_BASE_URL
   Value: https://image.tmdb.org/t/p
   ```
   Click "Add"

**You should now see 3 environment variables listed:**
```
✓ VITE_TMDB_API_KEY
✓ VITE_TMDB_BASE_URL
✓ VITE_TMDB_IMAGE_BASE_URL
```

### Step 6: Deploy!

1. Click **"Deploy"** button
2. Watch the build process (exciting to watch!)
   - Installing dependencies...
   - Building...
   - Deploying...
3. Wait **1-3 minutes** for completion
4. You'll see: **"🎉 Congratulations!"**

### Step 7: Get Your Live URL

1. You'll see a screenshot of your site
2. Your URL will be: **`https://cineflix-something.vercel.app`**
3. Click **"Continue to Dashboard"**
4. Or click **"Visit"** to see your live site!

---

## Part 4: Verify Deployment (5 minutes)

### Step 1: Test Your Live Site

1. Click the **"Visit"** button or copy your Vercel URL
2. Your site should load with:
   - ✓ CineFlix logo
   - ✓ Navigation bar
   - ✓ Hero section
   - ✓ Movie rows
   - ✓ Search bar
   - ✓ Footer

### Step 2: Test Diagnostic Page

Visit: **`https://your-site.vercel.app/diagnostic.html`**

Should show:
- ✓ Browser check - JavaScript running
- ✓ Environment Variables Found
- ✓ API Test Success (click the button)

### Step 3: Test Features

- [ ] Click "Browse" - loads movies
- [ ] Search for "Avengers" - shows results
- [ ] Click on a movie - shows details
- [ ] Add to favorites - works
- [ ] Remove from favorites - works

---

## Part 5: Post-Deployment (Optional)

### Get Your Exact Vercel URL

1. In Vercel Dashboard → Your Project
2. Look for: **"Domains"** section
3. Your main URL: `https://cineflix-xxxxx.vercel.app`
4. Copy and save it!

### Add Custom Domain (Optional)

If you have a domain:
1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain
4. Follow DNS configuration steps

### Set Up Continuous Deployment

**Already set up automatically!** 🎉

When you push to GitHub:
```
git add .
git commit -m "Update feature"
git push origin main
    ↓
Vercel auto-deploys (1-2 minutes)
    ↓
Your site updates automatically!
```

---

## 🆘 Troubleshooting

### Issue 1: White Page After Deployment

**Cause:** Environment variables not set correctly

**Fix:**
1. Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Verify all 3 variables are there
4. Check spelling (case-sensitive!)
5. Deployments → Redeploy

### Issue 2: Build Failed

**Check build logs:**
1. Vercel Dashboard → Deployments
2. Click on the failed deployment
3. Read error message

**Common fixes:**
- Missing dependencies: Run `npm install` locally and push
- Syntax error: Check the error line number
- Node version: Usually auto-detected, should work

### Issue 3: Movies Not Loading

**Check:**
1. Browser Console (F12) for errors
2. TMDB API key is correct
3. Go to diagnostic page: `/diagnostic.html`

**Fix:**
1. Test your API key: `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY`
2. If error, generate new API key
3. Update in Vercel Settings → Environment Variables
4. Redeploy

### Issue 4: "API Key Undefined"

**Cause:** Forgot to add environment variables before first deploy

**Fix:**
1. Settings → Environment Variables
2. Add all 3 variables
3. **Must select all environments:**
   - ☑ Production
   - ☑ Preview
   - ☑ Development
4. Deployments → Redeploy

---

## 📋 Quick Reference

### Your Important Links

```
GitHub Repo:  https://github.com/Jenidevops/cineflix
Vercel Site:  https://cineflix-xxxxx.vercel.app
Diagnostic:   https://cineflix-xxxxx.vercel.app/diagnostic.html
TMDB API:     https://www.themoviedb.org/settings/api
```

### Environment Variables (Copy-Paste Ready)

```bash
# Variable 1
VITE_TMDB_API_KEY=your_api_key_here

# Variable 2
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Variable 3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Redeploy Commands

```bash
# If you need to redeploy from terminal
cd /Users/jenifernirmalraj/Desktop/FSD.HTML/cineflix
git add .
git commit -m "Trigger redeploy"
git push origin main
# Vercel auto-deploys in 1-2 minutes
```

---

## ✅ Success Checklist

Deployment is successful when:

- [x] Project imported to Vercel
- [x] Environment variables added (all 3)
- [x] Build completed successfully
- [x] Site loads (not white page)
- [x] Movies are displayed
- [x] Search works
- [x] No console errors
- [x] Diagnostic page shows all green
- [x] Custom domain added (optional)

---

## 🎉 Congratulations!

Your CineFlix site is now:
- ✅ **Live** on Vercel
- ✅ **Secure** with A+ security rating
- ✅ **Fast** with optimized Vite build
- ✅ **Auto-deploying** from GitHub
- ✅ **Mobile responsive**
- ✅ **SEO optimized**

**Share your site:** `https://cineflix-xxxxx.vercel.app`

---

## 📞 Need Help?

**Documentation in your project:**
- `README.md` - Overview
- `QUICKSTART.md` - Fast deployment guide
- `DEPLOYMENT-CHECKLIST.md` - Detailed checklist
- `TROUBLESHOOTING.md` - Common issues
- `VERCEL-ENV-SETUP.md` - Environment variable guide

**Useful Links:**
- Vercel Docs: https://vercel.com/docs
- TMDB API Docs: https://developers.themoviedb.org/3
- Your diagnostic page: `/diagnostic.html`

---

## 🎯 Time Estimate

- **Part 1** (TMDB API Key): 5 minutes
- **Part 2** (Verify GitHub): 2 minutes
- **Part 3** (Deploy to Vercel): 10 minutes
- **Part 4** (Verify): 5 minutes

**Total: ~20-25 minutes** from start to finish! 🚀

---

**Ready? Let's deploy!** Follow the steps in order and your site will be live in no time! 🎬
