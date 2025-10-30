// Vercel Serverless Function: Subscribe to Plan

// Subscription plans (inline)
const subscriptionPlans = [
  { id: 1, name: 'Basic', price: 6.99 },
  { id: 2, name: 'Standard', price: 12.99 },
  { id: 3, name: 'Premium', price: 19.99 }
];

const getPlanById = (planId) => {
  return subscriptionPlans.find(plan => plan.id === planId);
};

// Mock payment processing
const mockPaymentProcessing = async (paymentMethod, paymentDetails) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, integrate with Stripe, PayPal, etc.
  return {
    success: true,
    transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
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
    // Dynamic imports for ES modules in serverless
    const connectDB = (await import('../../lib/mongodb.js')).default
    const User = (await import('../../lib/models/User.js')).default
    
    // Connect to database
    await connectDB()

    const { userId, planId, paymentMethod, paymentDetails} = req.body;

    // Validation
    if (!userId || !planId || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Verify user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Verify plan exists
    const plan = getPlanById(planId);
    if (!plan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plan not found' 
      });
    }

    // Process mock payment
    const paymentResult = await mockPaymentProcessing(paymentMethod, paymentDetails);

    if (!paymentResult.success) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment processing failed' 
      });
    }

    // Update user subscription in database
    user.subscription = {
      planId: plan.id,
      planName: plan.name,
      status: 'active',
      startDate: new Date(),
      paymentMethod: paymentMethod,
      transactionId: paymentResult.transactionId
    }

    await user.save()

    // Return user response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      createdAt: user.createdAt
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription activated successfully',
      user: userResponse,
      subscription: user.subscription
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
