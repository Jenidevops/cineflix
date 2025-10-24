// API Configuration for both local and production environments
// Automatically detects environment and uses correct API endpoint

// Safe environment detection that works in both SSR and client
const getEnvironment = () => {
  if (typeof window === 'undefined') {
    // Server-side or build time
    return 'production';
  }
  // Client-side detection
  return window.location.hostname === 'localhost' ? 'development' : 'production';
};

// API Base URL Configuration
export const API_CONFIG = {
  // For local development with Express backend
  EXPRESS_URL: 'http://localhost:5001/api',
  
  // For Vercel deployment (production and preview)
  VERCEL_URL: '/api',
  
  // Current environment detection
  get BASE_URL() {
    const env = getEnvironment();
    
    // If in production (Vercel deployment)
    if (env === 'production') {
      return this.VERCEL_URL;
    }
    
    // If in development, use Express backend
    return this.EXPRESS_URL;
  }
};

// Export the current API URL
export const API_URL = API_CONFIG.BASE_URL;

// Helper function to build API endpoint
export const getApiUrl = (endpoint) => {
  return `${API_URL}${endpoint}`;
};

// Log current configuration (only in development, only on client)
if (typeof window !== 'undefined' && getEnvironment() === 'development') {
  console.log('🔧 API Configuration:', {
    environment: getEnvironment(),
    apiUrl: API_URL
  });
}
