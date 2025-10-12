# Deploying CineFlix to Vercel

This guide will help you deploy your CineFlix application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure all changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Install Vercel CLI (Optional)

You can deploy via the Vercel dashboard or CLI:

```bash
npm install -g vercel
```

### 3. Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4. Add Environment Variables

In the Vercel dashboard, add these environment variables:

1. Go to Project Settings → Environment Variables
2. Add the following:

```
VITE_TMDB_API_KEY=your_actual_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_APP_NAME=CineFlix
VITE_APP_URL=https://your-project.vercel.app
```

**Important**: Replace `your_actual_tmdb_api_key` with your real TMDB API key!

### 5. Deploy

Click "Deploy" and wait for the build to complete.

### 6. Deploy via CLI (Alternative)

If you prefer using the CLI:

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts to configure your project.

## Post-Deployment

### Update URLs

After deployment, update these URLs in your code:

1. In `index.html`: Update Open Graph and Twitter meta tags with your actual Vercel URL
2. In `.env.production`: Update `VITE_APP_URL` with your Vercel URL

### Custom Domain (Optional)

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to the `main` branch
- **Preview**: When you create a pull request

## Monitoring

After deployment:
- Check deployment logs in Vercel dashboard
- Monitor analytics and performance
- Review any build errors or warnings

## Security Checklist

✅ Environment variables are set in Vercel
✅ TMDB API key is not in the code
✅ Security headers are configured (via `vercel.json`)
✅ HTTPS is enabled (automatic on Vercel)
✅ Dependencies are up to date

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Environment Variables Not Working
- Make sure variable names start with `VITE_`
- Redeploy after adding new variables
- Check for typos in variable names

### 404 Errors
- Verify `vercel.json` rewrites are configured
- Check that routes match your React Router setup

## Updating Your Deployment

To update your deployed app:

```bash
git add .
git commit -m "Update description"
git push origin main
```

Vercel will automatically redeploy.

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review deployment logs
- Check GitHub Issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
