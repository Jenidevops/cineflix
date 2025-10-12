# 🎯 How to Add Environment Variables in Vercel

## Visual Step-by-Step Guide

### 📍 Step 1: Access Your Project
```
1. Go to https://vercel.com/dashboard
2. Click on your "cineflix" project
```

### 📍 Step 2: Navigate to Settings
```
1. Click the "Settings" tab at the top
2. Click "Environment Variables" in the left sidebar
```

### 📍 Step 3: Add First Variable - API Key
```
Field 1 - Name:
VITE_TMDB_API_KEY

Field 2 - Value:
[Paste your TMDB API key here]
Example: abc123def456ghi789jkl012mno345pq

Field 3 - Environment:
☑ Production
☑ Preview  
☑ Development
(Check ALL three boxes)

Then click "Save"
```

### 📍 Step 4: Add Second Variable - Base URL
```
Click "Add Another" button

Field 1 - Name:
VITE_TMDB_BASE_URL

Field 2 - Value:
https://api.themoviedb.org/3

Field 3 - Environment:
☑ Production
☑ Preview
☑ Development

Then click "Save"
```

### 📍 Step 5: Add Third Variable - Image URL
```
Click "Add Another" button

Field 1 - Name:
VITE_TMDB_IMAGE_BASE_URL

Field 2 - Value:
https://image.tmdb.org/t/p

Field 3 - Environment:
☑ Production
☑ Preview
☑ Development

Then click "Save"
```

### 📍 Step 6: Verify All Variables Are Added
```
You should now see 3 environment variables listed:
✓ VITE_TMDB_API_KEY
✓ VITE_TMDB_BASE_URL
✓ VITE_TMDB_IMAGE_BASE_URL
```

### 📍 Step 7: Redeploy
```
1. Click on "Deployments" tab at the top
2. Find your latest deployment (top of the list)
3. Click the three dots (...) on the right
4. Click "Redeploy"
5. Click "Redeploy" again to confirm
6. Wait 1-2 minutes for build to complete
```

### 📍 Step 8: Test Your Site
```
1. Once deployment shows "Ready" with green checkmark
2. Click "Visit" button
3. Your site should now load properly! 🎉
```

---

## ⚠️ IMPORTANT NOTES

### ✅ DO:
- ✓ Use exact variable names (case-sensitive!)
- ✓ Check all three environment checkboxes
- ✓ Click "Save" after each variable
- ✓ Redeploy after adding variables
- ✓ Wait for deployment to complete

### ❌ DON'T:
- ✗ Don't use spaces in variable names
- ✗ Don't forget to check environment boxes
- ✗ Don't skip the redeploy step
- ✗ Don't share your API key publicly

---

## 🔑 Where to Get Your TMDB API Key

If you don't have a TMDB API key yet:

```
1. Visit: https://www.themoviedb.org/signup
2. Create a free account
3. Verify your email
4. Go to: https://www.themoviedb.org/settings/api
5. Click "Request an API Key"
6. Choose "Developer"
7. Fill out the form:
   - Type of Use: Education/Personal
   - Application Name: CineFlix
   - Application URL: https://your-site.vercel.app
   - Application Summary: Movie browsing app
8. Accept terms
9. Copy your API Key (v3 auth)
10. Paste it in Vercel as VITE_TMDB_API_KEY value
```

---

## 📋 Quick Copy-Paste Reference

```bash
# Variable 1
Name: VITE_TMDB_API_KEY
Value: [Your API Key Here]

# Variable 2
Name: VITE_TMDB_BASE_URL
Value: https://api.themoviedb.org/3

# Variable 3
Name: VITE_TMDB_IMAGE_BASE_URL
Value: https://image.tmdb.org/t/p
```

---

## 🎉 Success!

After completing these steps:
- Your site will load properly
- Movies will display
- Search will work
- No more white page!

**Your CineFlix app is now live!** 🚀
