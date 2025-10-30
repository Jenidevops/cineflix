// Vercel Serverless Function: Login

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
    // Dynamic imports for ES modules in serverless
    const connectDB = (await import('../../lib/mongodb.js')).default
    const User = (await import('../../lib/models/User.js')).default
    
    // Connect to database
    await connectDB()

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user with password field (normally excluded)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      console.log('Login attempt: User not found for email:', email)
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    console.log('Login attempt: User found, checking password...')
    console.log('Stored password hash:', user.password.substring(0, 20) + '...')

    // Check password using bcrypt comparison
    const isPasswordCorrect = await user.comparePassword(password)

    console.log('Password comparison result:', isPasswordCorrect)

    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Return user without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      createdAt: user.createdAt
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
