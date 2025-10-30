// Vercel Serverless Function: Forgot Password
// Generates a temporary reset code and stores it in the user document

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

    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({ 
        success: true, 
        message: 'If an account exists with this email, a reset code has been generated. Please check your email or use the code: ' 
      });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    // Save reset code to user
    user.resetCode = resetCode
    user.resetCodeExpiry = resetCodeExpiry
    await user.save()

    console.log(`Password reset code generated for ${email}: ${resetCode}`)

    return res.status(200).json({
      success: true,
      message: 'Reset code generated successfully',
      // In production, send this via email. For demo, return it
      resetCode: resetCode,
      note: 'In production, this code would be sent via email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
