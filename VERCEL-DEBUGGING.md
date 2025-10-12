# ⚠️ CRITICAL: Environment Variables Not Loading in Vercel

If you added environment variables in Vercel but still see errors, follow this checklist:

## 🚨 Common Issues & Solutions

### Issue 1: Forgot to Redeploy After Adding Variables

**THE PROBLEM:**
Vercel doesn't automatically apply new environment variables to existing deployments. You MUST redeploy!

**THE FIX:**
1. Go to your Vercel project dashboard
2. Click **"Deployments"** tab
3. Click the **three dots (...)** on the latest deployment
4. Click **"Redeploy"**
5. **IMPORTANT:** Click "Redeploy" again to confirm
6. Wait for the new deployment to finish (1-2 minutes)

### Issue 2: Wrong Environment Selected

**THE PROBLEM:**
You only checked "Production" but not "Preview" or "Development"

**THE FIX:**
1. Go to **Settings** → **Environment Variables**
2. For EACH variable, make sure ALL THREE boxes are checked:
   - ☑️ **Production**
   - ☑️ **Preview**
   - ☑️ **Development**
3. If not all checked, edit the variable and check all boxes
4. Click Save
5. Redeploy (see Issue 1 above)

### Issue 3: Typo in Variable Names

**THE PROBLEM:**
Variable names are case-sensitive and must be EXACT

**VERIFY YOUR VARIABLES:**
Open Vercel → Settings → Environment Variables and check you have EXACTLY:

```
✓ VITE_TMDB_API_KEY
✓ VITE_TMDB_BASE_URL
✓ VITE_TMDB_IMAGE_BASE_URL

Common typos:
✗ Vite_TMDB_API_KEY (lowercase 'v')
✗ VITE_TMDB_APIKEY (missing underscore)
✗ VITE_TMDB_API_KEY  (extra space at end)
```

### Issue 4: Invalid or Expired API Key

**THE PROBLEM:**
Your TMDB API key might be wrong or not activated yet

**THE FIX:**
1. Go to https://www.themoviedb.org/settings/api
2. Verify your API key is there and active
3. Copy it again (don't copy extra spaces!)
4. Test it manually:
   ```
   Visit this URL in browser (replace YOUR_KEY):
   https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY
   
   Should show JSON data, not error
   ```
5. If error, generate a new API key
6. Update it in Vercel
7. Redeploy

### Issue 5: Build Cache Issues

**THE PROBLEM:**
Vercel might be using cached build

**THE FIX:**
Force a clean deployment:
1. Go to **Deployments** tab
2. Click three dots (...) on latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** - make sure it's UNCHECKED
5. Click "Redeploy"

---

## 📋 Step-by-Step Verification Checklist

Follow this EXACT order:

### ✅ Step 1: Verify Variables Are Saved
```
Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

You should see:
┌─────────────────────────────┬──────────────────┬────────────────────────────┐
│ Name                        │ Value            │ Environment                │
├─────────────────────────────┼──────────────────┼────────────────────────────┤
│ VITE_TMDB_API_KEY          │ [Hidden]         │ Production, Preview, Dev   │
│ VITE_TMDB_BASE_URL         │ https://api...   │ Production, Preview, Dev   │
│ VITE_TMDB_IMAGE_BASE_URL   │ https://image... │ Production, Preview, Dev   │
└─────────────────────────────┴──────────────────┴────────────────────────────┘
```

**If you don't see this, the variables aren't saved!**

### ✅ Step 2: Check Each Variable Details
Click "Edit" on each variable and verify:
- Name is exactly correct (copy from below)
- Value has no extra spaces
- All three environment checkboxes are checked
- Click "Save"

### ✅ Step 3: Trigger Fresh Deployment
```bash
Option A - Via Vercel Dashboard:
1. Deployments tab
2. Click (...) on latest
3. Click "Redeploy"
4. Uncheck "Use existing Build Cache"
5. Click "Redeploy" to confirm

Option B - Via Git Push (Easier):
1. Make a tiny change in README.md (add a space)
2. git add .
3. git commit -m "trigger redeploy"
4. git push origin main
5. Vercel auto-deploys
```

### ✅ Step 4: Wait for Deployment
- Watch the deployment progress
- Should take 1-3 minutes
- Wait for "Ready" status with green ✓

### ✅ Step 5: Clear Browser Cache
```
Chrome/Edge: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
Or just use Incognito/Private browsing mode
```

### ✅ Step 6: Test Your Site
1. Visit your Vercel URL
2. Open DevTools (F12)
3. Go to Console tab
4. Reload page
5. Check for errors

---

## 🔍 How to Check If Variables Are Actually Loading

### Method 1: Check Build Logs
1. Go to Vercel → Deployments → Latest deployment
2. Click "View Build Logs"
3. Look for lines mentioning environment variables
4. Should NOT see "undefined" or "missing"

### Method 2: Check Browser Console
1. Open your deployed site
2. Press F12 → Console tab
3. Type this and press Enter:
   ```javascript
   console.log(import.meta.env)
   ```
4. Should show your VITE_ variables
5. If it says "undefined", variables aren't loading

### Method 3: Test API Directly
1. Open your site
2. Press F12 → Network tab
3. Reload page
4. Look for requests to "api.themoviedb.org"
5. Click on one
6. Check if it has "?api_key=..." in the URL
7. If URL shows "?api_key=undefined", variables aren't set

---

## 🆘 Nuclear Option - Start Fresh

If NOTHING works, delete and recreate:

```bash
1. Delete project from Vercel dashboard (Settings → Delete)
2. Go to vercel.com/new
3. Import your GitHub repo again
4. BEFORE clicking deploy:
   - Click "Environment Variables"
   - Add all 3 variables
   - Check all environment boxes
   - Then click "Deploy"
5. Wait for deployment
6. Test
```

---

## 📸 Screenshots to Help You

When adding variables, it should look like this:

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│ Name                                                        │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ VITE_TMDB_API_KEY                                    │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ abc123def456...                                      │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                             │
│ Environment                                                 │
│ ☑ Production   ☑ Preview   ☑ Development               │
│                                                             │
│                    [Cancel]  [Save]                        │
└─────────────────────────────────────────────────────────────┘
```

**All 3 checkboxes MUST be checked!**

---

## ✅ Final Verification

Your site is working when:
- ✓ No white page
- ✓ Movies are showing
- ✓ Search works
- ✓ No console errors
- ✓ Network requests to TMDB succeed (status 200)

---

## 💡 Most Common Mistake

**90% of the time it's this:**
You added the variables but **didn't redeploy**!

**Always do this after changing variables:**
```
Deployments → (...) menu → Redeploy → Confirm
```

---

## 📞 Still Having Issues?

If you've tried everything:

1. Double-check the exact error message in browser console
2. Share the error with the community
3. Verify your TMDB API key works (test the URL manually)
4. Try the "Nuclear Option" above

**Remember:** Vercel needs you to redeploy after adding variables! 🔄
