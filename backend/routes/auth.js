import express from 'express';
import { findUserByEmail, addUser } from '../models/users.js';

const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Find user
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  // Check password (in production, use bcrypt to compare hashed passwords)
  if (user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  // Return user data (excluding password)
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: userWithoutPassword
  });
});

// Signup endpoint
router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  if (password.length < 4) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 4 characters' 
    });
  }

  // Check if user already exists
  if (findUserByEmail(email)) {
    return res.status(409).json({ 
      success: false, 
      message: 'User with this email already exists' 
    });
  }

  // Create new user (in production, hash the password with bcrypt)
  const newUser = addUser({
    email,
    password, // Should be hashed in production
    name: name || email.split('@')[0]
  });

  // Return user data (excluding password)
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({ 
    success: true, 
    message: 'Account created successfully',
    user: userWithoutPassword
  });
});

// Logout endpoint (for completeness, though we're not using sessions/tokens)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

export default router;
