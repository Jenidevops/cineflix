import express from 'express';
import { getPlans, getPlanById } from '../models/subscriptionPlans.js';
import { updateUserSubscription, findUserByEmail } from '../models/users.js';

const router = express.Router();

// Get all subscription plans
router.get('/plans', (req, res) => {
  const plans = getPlans();
  res.json({ 
    success: true, 
    plans 
  });
});

// Subscribe to a plan
router.post('/subscribe', (req, res) => {
  const { userId, email, planId, paymentMethod, paymentDetails } = req.body;

  // Validation
  if (!planId || !paymentMethod) {
    return res.status(400).json({ 
      success: false, 
      message: 'Plan ID and payment method are required' 
    });
  }

  // Find the plan
  const plan = getPlanById(planId);
  if (!plan) {
    return res.status(404).json({ 
      success: false, 
      message: 'Plan not found' 
    });
  }

  // Mock payment processing
  // In production, integrate with Stripe, PayPal, etc.
  const paymentSuccess = mockPaymentProcessing(paymentMethod, paymentDetails, plan.price);

  if (!paymentSuccess.success) {
    return res.status(400).json({ 
      success: false, 
      message: paymentSuccess.message 
    });
  }

  // Find user and update subscription
  let user;
  if (userId) {
    user = { id: userId }; // In real app, validate userId
  } else if (email) {
    user = findUserByEmail(email);
  }

  if (user) {
    const subscriptionData = {
      plan: planId,
      planName: plan.name,
      price: plan.price,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: paymentMethod
    };

    updateUserSubscription(user.id, subscriptionData);
  }

  res.json({ 
    success: true, 
    message: 'Subscription successful!',
    subscription: {
      plan: planId,
      planName: plan.name,
      status: 'active',
      transactionId: `TXN${Date.now()}`
    }
  });
});

// Mock payment processing function
function mockPaymentProcessing(method, details, amount) {
  // Simulate payment validation
  if (method === 'credit-card') {
    const { cardNumber, cvv, expiryDate } = details;
    
    if (!cardNumber || cardNumber.length < 16) {
      return { success: false, message: 'Invalid card number' };
    }
    
    if (!cvv || cvv.length < 3) {
      return { success: false, message: 'Invalid CVV' };
    }
    
    if (!expiryDate) {
      return { success: false, message: 'Invalid expiry date' };
    }
    
    // Simulate successful payment
    return { 
      success: true, 
      message: 'Payment processed successfully',
      transactionId: `CC${Date.now()}`
    };
  }
  
  if (method === 'paypal') {
    const { email } = details;
    
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid PayPal email' };
    }
    
    // Simulate successful PayPal payment
    return { 
      success: true, 
      message: 'PayPal payment processed successfully',
      transactionId: `PP${Date.now()}`
    };
  }
  
  if (method === 'upi') {
    const { upiId } = details;
    
    if (!upiId || !upiId.includes('@')) {
      return { success: false, message: 'Invalid UPI ID' };
    }
    
    // Simulate successful UPI payment
    return { 
      success: true, 
      message: 'UPI payment processed successfully',
      transactionId: `UPI${Date.now()}`
    };
  }
  
  return { success: false, message: 'Invalid payment method' };
}

export default router;
