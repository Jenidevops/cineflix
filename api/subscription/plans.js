// Vercel Serverless Function: Get Subscription Plans

// Subscription plans (inline for serverless compatibility)
const subscriptionPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 6.99,
    features: [
      'Watch on 1 device at a time',
      'HD available',
      'Unlimited movies and TV shows',
      'Cancel anytime'
    ],
    quality: 'Good (720p)'
  },
  {
    id: 2,
    name: 'Standard',
    price: 12.99,
    features: [
      'Watch on 2 devices at a time',
      'Full HD available',
      'Unlimited movies and TV shows',
      'Cancel anytime',
      'Download on 2 devices'
    ],
    quality: 'Better (1080p)',
    popular: true
  },
  {
    id: 3,
    name: 'Premium',
    price: 19.99,
    features: [
      'Watch on 4 devices at a time',
      'Ultra HD available',
      'Unlimited movies and TV shows',
      'Cancel anytime',
      'Download on 4 devices',
      'Spatial audio'
    ],
    quality: 'Best (4K + HDR)'
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only accept GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    return res.status(200).json({
      success: true,
      plans: subscriptionPlans
    });

  } catch (error) {
    console.error('Get plans error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
