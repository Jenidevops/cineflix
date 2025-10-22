import { getPlanById } from '../../backend/models/subscriptionPlans.js';
import { updateUserSubscription } from '../../backend/models/users.js';

// Mock payment processing function
function mockPaymentProcessing(paymentMethod, paymentDetails) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate payment processing
      resolve({
        success: true,
        transactionId: `TXN${Date.now()}`,
        message: `Payment processed successfully via ${paymentMethod}`
      });
    }, 1000);
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { userId, planId, paymentMethod, paymentDetails } = req.body;

    // Validation
    if (!userId || !planId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'User ID, Plan ID, and Payment Method are required'
      });
    }

    // Get plan details
    const plan = getPlanById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Invalid plan ID'
      });
    }

    // Process payment (mock)
    const paymentResult = await mockPaymentProcessing(paymentMethod, paymentDetails);

    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment processing failed'
      });
    }

    // Update user subscription
    const subscription = {
      planId: plan.id,
      planName: plan.name,
      status: 'active',
      startDate: new Date().toISOString(),
      paymentMethod: paymentMethod,
      transactionId: paymentResult.transactionId
    };

    const updatedUser = updateUserSubscription(userId, subscription);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription activated successfully',
      subscription: updatedUser.subscription
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during subscription'
    });
  }
}
