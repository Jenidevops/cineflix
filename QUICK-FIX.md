# 🎯 QUICK FIX - Environment Variables in Vercel

## Copy These Exact Values:

```bash
# Variable 1
Name: VITE_TMDB_API_KEY
Value: YOUR_ACTUAL_API_KEY_HERE
Environments: ☑ Production ☑ Preview ☑ Development

# Variable 2  
Name: VITE_TMDB_BASE_URL
Value: https://api.themoviedb.org/3
Environments: ☑ Production ☑ Preview ☑ Development

# Variable 3
Name: VITE_TMDB_IMAGE_BASE_URL
Value: https://image.tmdb.org/t/p
Environments: ☑ Production ☑ Preview ☑ Development
```

## 🔴 MOST IMPORTANT STEPS:

### After adding variables, you MUST:

1. **Click "Save"** on each variable
2. **Go to Deployments tab**
3. **Click (...) menu** on latest deployment
4. **Click "Redeploy"**
5. **Confirm "Redeploy"**
6. **Wait 1-2 minutes** for build
7. **Clear browser cache** or use Incognito
8. **Visit your site**

## ⚠️ Common Issues:

### Issue: "No environment variables were created"
**Fix:** Check all 3 environment checkboxes (Production, Preview, Development)

### Issue: Still white page after adding variables
**Fix:** You forgot to REDEPLOY! Go to Deployments → Redeploy

### Issue: Variables not showing
**Fix:** After adding each variable, click SAVE, not just close

### Issue: Site shows old version
**Fix:** Clear browser cache (Ctrl+Shift+Delete) or use Incognito mode

### Issue: "API key undefined" in console
**Fix:** Make sure variable name is exactly `VITE_TMDB_API_KEY` (case-sensitive)

## 🔍 Quick Test:

After deploying, open your site and press **F12**:

```javascript
// Type this in Console tab:
console.log(import.meta.env.VITE_TMDB_API_KEY)

// Should show your key, NOT "undefined"
```

## 📱 Support Files:

- Read `VERCEL-ENV-SETUP.md` for step-by-step visual guide
- Read `VERCEL-DEBUGGING.md` for troubleshooting
- Read `TROUBLESHOOTING.md` for all common issues

## ✅ Working Checklist:

- [ ] Added all 3 environment variables in Vercel
- [ ] Checked all 3 environment boxes for each variable
- [ ] Clicked "Save" on each variable
- [ ] Redeployed the site
- [ ] Waited for deployment to finish (green checkmark)
- [ ] Cleared browser cache
- [ ] Tested site - works!

---

**Remember: Add variables → Save → Redeploy → Wait → Test** 🚀
