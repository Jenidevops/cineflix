// Mock user database (shared between Express and Vercel API)
// In-memory for demo purposes - data resets on serverless function restart

export const users = [
  {
    id: 1,
    email: 'demo@cineflix.com',
    password: 'Demo@2024!Secure', // In production, this should be hashed
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

// Helper functions
export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const addUser = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    subscription: null
  };
  users.push(newUser);
  return newUser;
};

export const updateUserSubscription = (userId, subscriptionData) => {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.subscription = subscriptionData;
    return user;
  }
  return null;
};

export const findUserById = (userId) => {
  return users.find(user => user.id === userId);
};
