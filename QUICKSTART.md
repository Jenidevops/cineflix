# Quick Start: Deploy to Vercel

## ⚡ Fast Deployment (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment with security updates"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

3. **Import Repository**
   - Click "Import Project"
   - Select your `cineflix` repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Vite** (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Leave other settings as default

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   Name: VITE_TMDB_API_KEY
   Value: [Your TMDB API Key from https://www.themoviedb.org/settings/api]
   
   Name: VITE_TMDB_BASE_URL
   Value: https://api.themoviedb.org/3
   
   Name: VITE_TMDB_IMAGE_BASE_URL
   Value: https://image.tmdb.org/t/p
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - Your site is live! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? cineflix
# - Directory? ./
# - Override settings? No

# Add environment variables when prompted or after deployment
```

## 🔐 Don't Forget!

**CRITICAL**: Add your TMDB API key in Vercel:
- Go to your project → Settings → Environment Variables
- Add `VITE_TMDB_API_KEY` with your actual API key
- Redeploy if you added variables after first deployment

## 📝 After Deployment

1. **Update URLs**: Your site URL in `index.html` and `.env`
2. **Test**: Visit your site and check all features work
3. **Custom Domain**: Add in Vercel Settings → Domains (optional)
4. **SSL**: Automatically enabled by Vercel ✅

## ✅ Security Checklist

Before going live, verify:
- [ ] TMDB API key is in Vercel environment variables (not in code)
- [ ] `.env` file is in `.gitignore` and NOT committed
- [ ] HTTPS is working (automatic on Vercel)
- [ ] Security headers are active (check browser dev tools)
- [ ] All dependencies are updated (ran `npm audit`)

## 🔍 Google Search Console

After deployment, submit your site to Google:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (Vercel URL)
3. Verify ownership via DNS or HTML file
4. Submit your sitemap: `https://your-site.vercel.app/sitemap.xml`

## 🛡️ Security Headers (Already Configured)

Your site now has these security headers via `vercel.json`:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- Referrer-Policy
- Permissions-Policy

## 🆘 Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

**Blank page?**
- Check browser console for errors
- Verify environment variables are set correctly
- Redeploy after adding environment variables

**API not working?**
- Verify `VITE_TMDB_API_KEY` is set in Vercel
- Check TMDB API key is valid
- Look at Network tab in browser dev tools

## 📱 Test Your Deployment

After deployment, test:
1. ✅ Home page loads
2. ✅ Browse movies works
3. ✅ Search functionality
4. ✅ Favorites feature
5. ✅ Mobile responsiveness
6. ✅ HTTPS is enabled
7. ✅ No console errors

## 🎉 Success!

Your CineFlix site is now:
- ✅ Deployed and live
- ✅ Secured with industry-standard headers
- ✅ Protected against common vulnerabilities
- ✅ Optimized for search engines
- ✅ Fast and performant

Share your site: `https://cineflix-[your-id].vercel.app`

---

Need help? Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
