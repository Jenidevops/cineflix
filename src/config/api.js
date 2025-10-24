// API Configuration for both local and production environments
// Automatically detects environment and uses correct API endpoint

const isProduction = import.meta.env.PROD;
const isLocalDevelopment = import.meta.env.DEV;

// API Base URL Configuration
export const API_CONFIG = {
  // For local development with Express backend
  EXPRESS_URL: 'http://localhost:5001/api',
  
  // For Vercel deployment (production and preview)
  VERCEL_URL: '/api',
  
  // Current environment detection
  get BASE_URL() {
    // If in production (Vercel deployment)
    if (isProduction) {
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

// Log current configuration (only in development)
if (isLocalDevelopment) {
  console.log('🔧 API Configuration:', {
    environment: isProduction ? 'production' : 'development',
    apiUrl: API_URL
  });
}
