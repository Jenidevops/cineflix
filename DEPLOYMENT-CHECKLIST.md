# ✅ Pre-Deployment Checklist

Use this checklist before deploying to Vercel.

## 📋 Before Deployment

### 1. Environment Setup
- [ ] Create `.env` file from `.env.example`
- [ ] Add your TMDB API key to `.env`
- [ ] Verify `.env` is in `.gitignore`
- [ ] Test locally with `npm run dev`

### 2. Build Verification
- [ ] Run `npm run build` successfully
- [ ] Run `npm run preview` to test production build
- [ ] Check for console errors in browser
- [ ] Test all pages (Home, Browse, Favorites)
- [ ] Verify search functionality works
- [ ] Test on mobile view

### 3. Security Check
- [ ] Run `npm audit` (should show 0 vulnerabilities)
- [ ] Verify no API keys in source code
- [ ] Check `.env` file is not committed
- [ ] Review `vercel.json` security headers

### 4. Git & GitHub
- [ ] Commit all changes
  ```bash
  git add .
  git commit -m "Security updates and production deployment config"
  ```
- [ ] Push to GitHub
  ```bash
  git push origin main
  ```
- [ ] Verify all files are on GitHub

## 🚀 Vercel Deployment

### 5. Vercel Setup
- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Sign in with GitHub
- [ ] Import your `cineflix` repository
- [ ] Verify settings:
  - Framework: Vite ✓
  - Build Command: `npm run build` ✓
  - Output Directory: `dist` ✓

### 6. Environment Variables
Add these in Vercel → Settings → Environment Variables:

- [ ] `VITE_TMDB_API_KEY` = [Your TMDB API Key]
- [ ] `VITE_TMDB_BASE_URL` = https://api.themoviedb.org/3
- [ ] `VITE_TMDB_IMAGE_BASE_URL` = https://image.tmdb.org/t/p

### 7. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (~2 minutes)
- [ ] Check deployment logs for errors
- [ ] Verify "Deployment Complete" message

## 🧪 Post-Deployment Testing

### 8. Functional Testing
Visit your deployed site and verify:

- [ ] Site loads without errors
- [ ] Home page displays correctly
- [ ] Navigation works (all menu items)
- [ ] Browse page loads movies
- [ ] Search functionality works
- [ ] Favorites can be added/removed
- [ ] Movie details display correctly
- [ ] Trailer player works
- [ ] Mobile responsive design works

### 9. Security Testing
Open browser DevTools → Network tab:

- [ ] All resources load over HTTPS
- [ ] No mixed content warnings
- [ ] Check Response Headers include:
  - `strict-transport-security`
  - `x-frame-options`
  - `x-content-type-options`
  - `content-security-policy`

### 10. Performance Check
- [ ] Page loads in under 3 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] Lighthouse score > 80 (optional)

## 🔍 Google Search Console

### 11. Submit to Google
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add your Vercel URL as a property
- [ ] Verify ownership (via DNS or HTML)
- [ ] Submit sitemap: `https://your-site.vercel.app/sitemap.xml`
- [ ] Request indexing for main pages

### 12. robots.txt & Sitemap
- [ ] Verify `robots.txt` is accessible: `/robots.txt`
- [ ] Verify `sitemap.xml` is accessible: `/sitemap.xml`
- [ ] Check `security.txt`: `/.well-known/security.txt`

## 📱 Additional Steps (Optional)

### 13. Custom Domain
- [ ] Purchase domain (optional)
- [ ] Add domain in Vercel → Settings → Domains
- [ ] Configure DNS settings
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate is active

### 14. Monitoring & Analytics
- [ ] Set up Vercel Analytics (built-in)
- [ ] Add Google Analytics (optional)
- [ ] Monitor deployment logs
- [ ] Set up error tracking (optional)

### 15. Social Media
- [ ] Test Open Graph tags (use [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Test Twitter Cards (use [Twitter Card Validator](https://cards-dev.twitter.com/validator))
- [ ] Update URLs in meta tags if using custom domain

## 🎉 Final Verification

### 16. Complete Check
- [ ] Site is live and accessible
- [ ] No broken links or images
- [ ] Search engines can access site
- [ ] Security headers are active
- [ ] HTTPS works correctly
- [ ] All features functional
- [ ] Mobile-friendly
- [ ] Fast loading speed

## 📝 Documentation Update

### 17. Update Files
If using custom domain, update:
- [ ] `index.html` - meta tags URLs
- [ ] `public/sitemap.xml` - site URLs
- [ ] `README.md` - deployment URL
- [ ] `public/robots.txt` - sitemap URL

## 🆘 If Something Goes Wrong

### Troubleshooting
1. **Build fails**: Check build logs in Vercel dashboard
2. **Blank page**: Verify environment variables are set
3. **API errors**: Check TMDB API key is correct
4. **404 errors**: Verify `vercel.json` rewrites
5. **Security warnings**: Check CSP in `vercel.json`

### Quick Fixes
```bash
# Rebuild locally
npm run build

# Check for errors
npm audit

# Test production build
npm run preview

# Redeploy to Vercel
# Just push to GitHub or click "Redeploy" in Vercel
```

## ✅ All Done!

When all items are checked, your CineFlix site is:
- 🔒 Secure
- 🚀 Deployed
- 🔍 SEO Optimized
- ✨ Production Ready

---

**Congratulations! Your site is live! 🎉**

Share it: `https://cineflix-[your-id].vercel.app`
