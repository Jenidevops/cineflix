// Vercel Serverless Function: Subscribe to Plan

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

// Subscription plans (inline)
const subscriptionPlans = [
  { id: 1, name: 'Basic', price: 6.99 },
  { id: 2, name: 'Standard', price: 12.99 },
  { id: 3, name: 'Premium', price: 19.99 }
];

const findUserById = (userId) => {
  return users.find(user => user.id === userId);
};

const getPlanById = (planId) => {
  return subscriptionPlans.find(plan => plan.id === planId);
};

const updateUserSubscription = (userId, subscriptionData) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.subscription = subscriptionData;
    return user;
  }
  return null;
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
    const { userId, planId, paymentMethod, paymentDetails } = req.body;

    // Validation
    if (!userId || !planId || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Verify user exists
    const user = findUserById(userId);
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

    // Create subscription data
    const subscriptionData = {
      planId: plan.id,
      planName: plan.name,
      status: 'active',
      startDate: new Date().toISOString(),
      paymentMethod: paymentMethod,
      transactionId: paymentResult.transactionId
    };

    // Update user subscription
    const updatedUser = updateUserSubscription(userId, subscriptionData);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      success: true,
      message: 'Subscription activated successfully',
      user: userWithoutPassword,
      subscription: subscriptionData
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
