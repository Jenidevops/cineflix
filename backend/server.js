import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import subscriptionRoutes from './routes/subscription.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎬 CineFlix Backend API Server',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      subscription: {
        plans: 'GET /api/subscription/plans',
        subscribe: 'POST /api/subscription/subscribe'
      }
    },
    frontend: 'http://localhost:3000'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

// Keep the process alive and handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT received, closing server...');
  server.close();
  process.exit(0);
});
