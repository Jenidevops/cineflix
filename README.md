# 🎬 CineFlix

A modern, secure Netflix-like streaming platform built with React, Vite, and TMDB API.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jenidevops/cineflix)

## ✨ Features

- 🎥 Browse popular, trending, and top-rated movies
- 🔍 Advanced search functionality
- ⭐ Favorites management
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure with comprehensive security headers
- ⚡ Fast performance with Vite
- 🎯 SEO optimized

## 🔒 Security Features

This project implements industry-standard security practices:

- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options protection
- ✅ X-Content-Type-Options (nosniff)
- ✅ XSS Protection
- ✅ Referrer Policy
- ✅ Permissions Policy
- ✅ HSTS (Strict-Transport-Security)
- ✅ Secure environment variable handling
- ✅ Regular dependency updates

See [SECURITY.md](./SECURITY.md) for more details.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jenidevops/cineflix.git
   cd cineflix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your TMDB API key to `.env`:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy CineFlix is using Vercel:

1. Click the "Deploy with Vercel" button above, or
2. Follow the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

**Important**: Don't forget to add your environment variables in Vercel!

### Deploy to Other Platforms

This project can also be deployed to:
- Netlify
- GitHub Pages
- Railway
- Any static hosting service

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)
- **Deployment**: Vercel

## 📁 Project Structure

```
cineflix/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── data/           # Mock data
│   └── images/         # Static images
├── public/             # Public assets
├── vercel.json         # Vercel configuration
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind configuration
```

## 🔐 Environment Variables

Required environment variables:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**Never commit your `.env` file!** Use `.env.example` as a template.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Vercel](https://vercel.com) for hosting
- The React and Vite communities

## 📞 Support

For support, please:
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
- Review [SECURITY.md](./SECURITY.md) for security issues
- Open an issue on GitHub

## 🔄 Updates

To keep your dependencies secure and up-to-date:

```bash
npm audit
npm audit fix
npm update
```

---

Made with ❤️ by [Jenidevops](https://github.com/Jenidevops)

## License

MIT License
