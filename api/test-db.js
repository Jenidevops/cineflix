// Test endpoint to verify MongoDB connection
import connectDB from '../../lib/mongodb.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const hasMongoURI = !!process.env.MONGODB_URI
    console.log('MONGODB_URI exists:', hasMongoURI)
    
    if (!hasMongoURI) {
      return res.status(500).json({
        success: false,
        message: 'MONGODB_URI environment variable is not set',
        env: process.env.NODE_ENV
      })
    }

    await connectDB()
    
    return res.status(200).json({
      success: true,
      message: 'MongoDB connection successful!',
      connected: true
    })
  } catch (error) {
    console.error('Connection test error:', error)
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    })
  }
}
