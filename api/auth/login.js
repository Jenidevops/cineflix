// Vercel Serverless Function: Login

// Mock user database (inline for serverless compatibility)
const users = [
  {
    id: 1,
    email: 'demo@cineflix.com',
    password: 'Demo@2024!Secure',
    name: 'Demo User',
    subscription: {
      planId: 3,
      planName: 'Premium',
      status: 'active',
      startDate: new Date().toISOString(),
      paymentMethod: 'credit-card'
    }
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'Test@2024!Pass',
    name: 'Test User',
    subscription: null
  }
];

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
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
        message: 'Invalid credentials' 
      });
    }

    // Check password (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
