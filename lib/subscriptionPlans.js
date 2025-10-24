// Subscription plans (shared between Express and Vercel API)
export const subscriptionPlans = [
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

export const getPlans = () => subscriptionPlans;

export const getPlanById = (planId) => {
  return subscriptionPlans.find(plan => plan.id === planId);
};
