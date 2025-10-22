import { getPlans } from '../../backend/models/subscriptionPlans.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const plans = getPlans();
    return res.status(200).json({
      success: true,
      plans
    });
  } catch (error) {
    console.error('Get plans error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error fetching plans'
    });
  }
}
