// Test MongoDB Connection Locally
import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://jenidevops:HrTdfyJQKwWQKSGg@cluster0.olw9ygd.mongodb.net/cineflix?retryWrites=true&w=majority'

async function testConnection() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connected successfully!')
    
    // Test ping
    await mongoose.connection.db.admin().ping()
    console.log('✅ Ping successful!')
    
    await mongoose.disconnect()
    console.log('✅ Disconnected')
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
  }
}

testConnection()
