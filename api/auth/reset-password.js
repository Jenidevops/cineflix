// Vercel Serverless Function: Reset Password
// Verifies reset code and updates password

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

    const { email, resetCode, newPassword } = req.body;

    // Validation
    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, reset code, and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Find user with reset code
    const user = await User.findOne({ 
      email,
      resetCode,
      resetCodeExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired reset code' 
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword
    user.resetCode = undefined
    user.resetCodeExpiry = undefined
    await user.save()

    console.log(`Password reset successful for ${email}`)

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
