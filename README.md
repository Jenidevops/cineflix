# 🎬 CineFlex

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>

<p align="center">
  <strong>A Modern OTT Platform for Movie Streaming & Discovery</strong>
</p>

<p align="center">
  Experience the future of entertainment with CineFlex - Your personal movie streaming companion
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#tech-stack">Tech Stack</a>
</p>

---

## 🎯 About The Project

CineFlex is a fully-featured OTT (Over-The-Top) streaming platform built with modern web technologies. Designed to provide users with an immersive movie browsing and streaming experience, CineFlex offers seamless navigation, personalized movie recommendations, and a responsive interface that works flawlessly across all devices.

Whether you're discovering new movies, managing your favorites, or watching trailers, CineFlex delivers a premium streaming experience similar to industry-leading platforms like Netflix and Prime Video.

---

## ✨ Key Features

### 🔐 **Authentication System**
- User Registration with form validation
- Secure Login/Logout functionality
- Protected routes for authenticated users
- Session management

### 🎬 **Movie Discovery & Management**
- Browse extensive movie catalog
- Real-time API integration for movie data
- Search and filter movies
- Detailed movie information pages
- Genre-based categorization

### ⭐ **Personalization**
- Add movies to favorites list
- Remove movies from favorites
- Persistent favorites storage
- User-specific movie collections

### 🎥 **Interactive Features**
- Watch movie trailers directly in-app
- Embedded video player
- Thumbs up/Like functionality
- Smooth video playback experience

### 📱 **Responsive Design**
- Fully responsive layout
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions
- Touch-friendly interface

### 🎨 **Modern UI/UX**
- Clean and intuitive interface
- Netflix-inspired design
- Tailwind CSS powered styling
- Smooth scrolling experience
- Loading states and error handling

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.2+** - Component-based UI library
- **Vite** - Next-generation frontend tooling for blazing fast development

### **Styling**
- **Tailwind CSS** - Utility-first CSS framework
- Custom responsive design utilities
- Modern gradient and shadow effects

### **State Management & Routing**
- **React Router DOM** - Client-side routing
- **React Hooks** - useState, useEffect, useContext for state management
- **Context API** - Global state management

### **API Integration**
- **Axios / Fetch API** - HTTP client for API calls
- **TMDB API** - The Movie Database for movie data
- RESTful API integration

### **Development Tools**
- **ES6+ JavaScript** - Modern JavaScript features
- **ESLint** - Code linting
- **Git** - Version control

---

## 📁 Project Structure

Based on your React + Vite + Tailwind CSS implementation:

```
cineflix/
│
├── public/                     # Static files
│   └── vite.svg               # Vite logo
│
├── src/
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx        # Navigation bar with logo & menu
│   │   ├── Footer.jsx        # Footer section
│   │   ├── MovieCard.jsx     # Individual movie card component
│   │   ├── TrailerPlayer.jsx # Video player for trailers
│   │   ├── FavoriteButton.jsx # Add/Remove from favorites
│   │   ├── LikeButton.jsx    # Thumbs up/like functionality
│   │   └── Loader.jsx        # Loading spinner
│   │
│   ├── pages/                 # Main application pages
│   │   ├── Startup.jsx       # Landing/Welcome page
│   │   ├── Signup.jsx        # User registration page
│   │   ├── Login.jsx         # User login page
│   │   ├── Home.jsx          # Main dashboard with movies
│   │   ├── MovieDetails.jsx  # Individual movie details page
│   │   └── Favorites.jsx     # User's favorite movies collection
│   │
│   ├── api/                   # API integration
│   │   └── tmdb.js           # TMDB API configuration & calls
│   │
│   ├── context/               # State management (if using Context API)
│   │   └── AuthContext.jsx   # Authentication state
│   │
│   ├── hooks/                 # Custom React hooks (optional)
│   │   └── useFavorites.js   # Custom hook for favorites logic
│   │
│   ├── assets/                # Static assets
│   │   ├── images/           # Images and graphics
│   │   └── logo.png          # App logo
│   │
│   ├── utils/                 # Helper utilities
│   │   └── constants.js      # App constants and configs
│   │
│   ├── App.jsx                # Root component with routing
│   ├── main.jsx               # Entry point (ReactDOM.render)
│   └── index.css              # Global styles & Tailwind imports
│
├── .env                       # Environment variables (git ignored)
├── .env.example               # Example environment file
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── package-lock.json          # Locked dependency versions
├── vite.config.js             # Vite bundler configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint rules (optional)
└── README.md                  # Project documentation
```

### 📝 Key Files Explanation

| File/Folder | Purpose |
|------------|---------|
| `src/pages/` | Main application screens (Startup, Login, Signup, Home, etc.) |
| `src/components/` | Reusable UI components used across pages |
| `src/api/tmdb.js` | TMDB API integration and HTTP requests |
| `src/App.jsx` | Main app component with React Router setup |
| `src/main.jsx` | Application entry point that renders App |
| `index.html` | Root HTML file that loads the React app |
| `vite.config.js` | Vite build tool configuration |
| `tailwind.config.js` | Tailwind CSS theme customization |

### 🔧 Configuration Files

**vite.config.js** - Configures Vite build process
**tailwind.config.js** - Customizes Tailwind theme
**postcss.config.js** - PostCSS plugins for Tailwind

---

## 🚀 Getting Started

### **Prerequisites**

Make sure you have the following installed on your system:

- **Node.js** (v16.0 or higher)
- **npm** (v8.0 or higher) or **yarn**
- **Git**

### **Installation Steps**

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Jenidevops/cineflex.git
cd cineflex
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

or if you're using yarn:

```bash
yarn install
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
# TMDB API Configuration
VITE_API_KEY=your_tmdb_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# Application Configuration
VITE_APP_NAME=CineFlex
VITE_APP_URL=http://localhost:5173
```

**Get your TMDB API Key:**
1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Sign up for a free account
3. Go to Settings → API
4. Request an API key
5. Copy your API key and paste it in the `.env` file

#### 4️⃣ Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## 🎮 Usage

### **Running the Application**

**Development Mode:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

**Lint Code:**
```bash
npm run lint
```

### **Application Workflow**

1. **Startup Page** - Landing page with app introduction
2. **Sign Up** - Create a new account with email and password
3. **Login** - Access your account securely
4. **Browse Movies** - Explore the movie catalog
5. **Movie Details** - View detailed information about any movie
6. **Watch Trailer** - Play movie trailers directly
7. **Add to Favorites** - Save movies to your favorites list
8. **Manage Favorites** - View and remove movies from favorites
9. **Like Movies** - Give thumbs up to movies you enjoy

---

## 🎨 Features Walkthrough

### **1. Authentication System**
- Secure user registration with email validation
- Login with credential verification
- Protected routes for authenticated users
- Logout functionality with session clearing

### **2. Movie Browsing**
- Dynamic movie grid layout
- Hover effects on movie cards
- Movie posters with high-quality images
- Genre tags and ratings display

### **3. Favorites Management**
- One-click add to favorites
- Visual feedback on favorite status
- Dedicated favorites page
- Easy removal from favorites list

### **4. Trailer Playback**
- Embedded YouTube player
- Full-screen support
- Play/Pause controls
- Responsive video player

### **5. Responsive Design**
- Breakpoints for mobile (< 640px)
- Tablet optimization (640px - 1024px)
- Desktop layout (> 1024px)
- Touch-friendly buttons and navigation

---

## 🔌 API Integration

### **TMDB API Endpoints Used**

```javascript
// Get Popular Movies
GET /movie/popular

// Get Movie Details
GET /movie/{movie_id}

// Get Movie Trailers
GET /movie/{movie_id}/videos

// Search Movies
GET /search/movie

// Get Movie by Genre
GET /discover/movie
```

### **API Service Example**

```javascript
// services/movieService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};
```

---

## 🖼️ Screenshots

_Add your application screenshots here to showcase the UI_

### Startup Page
```
[Add screenshot]
```

### Login/Signup
```
[Add screenshots]
```

### Home Page - Movie Grid
```
[Add screenshot]
```

### Movie Details & Trailer
```
[Add screenshot]
```

### Favorites Page
```
[Add screenshot]
```

### Mobile Responsive View
```
[Add screenshot]
```

---

## 🎯 Future Enhancements

- [ ] User profile management
- [ ] Movie recommendations based on preferences
- [ ] Advanced search with filters
- [ ] Movie reviews and ratings
- [ ] Watchlist feature
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Social sharing functionality
- [ ] Continue watching feature
- [ ] Backend integration with Node.js
- [ ] Payment gateway for premium content
- [ ] Download for offline viewing

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### **How to Contribute:**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Contribution Guidelines:**

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 🐛 Known Issues

- _List any known bugs or limitations here_
- _Example: Trailer not loading for some movies (working on fix)_

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Developer

**Your Name**

- GitHub: [@Jenidevops](https://github.com/Jenidevops)

- Email: jenidevops@gmail.com.com


---

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie API
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://react.dev/) for the powerful UI library
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---

## 📞 Support

If you like this project, please give it a ⭐ on GitHub!

For support, email your.email@example.com or create an issue in the repository.

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p><strong>Happy Streaming! 🎬🍿</strong></p>
</div>
