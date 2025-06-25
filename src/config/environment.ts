
export const config = {
  mongodbApiUrl: process.env.REACT_APP_MONGODB_API_URL || 'http://localhost:5000/api',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Environment variables you'll need to set:
// REACT_APP_MONGODB_API_URL=https://your-backend-api.com/api
// (or http://localhost:5000/api for local development)
