#!/bin/bash

# CineFlix Direct Deployment Script
# Run this script to deploy directly to Vercel

echo "🎬 CineFlix - Direct Vercel Deployment"
echo "======================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Build the project
echo "🔨 Building project..."
npm run build
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
echo "⚠️  IMPORTANT: When prompted, add these environment variables:"
echo "   VITE_TMDB_API_KEY = [your TMDB API key]"
echo "   VITE_TMDB_BASE_URL = https://api.themoviedb.org/3"
echo "   VITE_TMDB_IMAGE_BASE_URL = https://image.tmdb.org/t/p"
echo ""
echo "🔑 Get your TMDB API key from: https://www.themoviedb.org/settings/api"
echo ""

# Deploy
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo "Your site should be live now!"