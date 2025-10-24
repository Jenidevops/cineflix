// Local Users Manager - Store signup users in localStorage

const LOCAL_USERS_KEY = 'cineflix_local_users';

export class LocalUsersManager {
  // Get all locally stored users
  static getLocalUsers() {
    try {
      const usersJson = localStorage.getItem(LOCAL_USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Failed to get local users:', error);
      return [];
    }
  }

  // Save a new user to localStorage
  static saveUser(user) {
    try {
      const users = this.getLocalUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
      if (existingUser) {
        return { success: false, message: 'User already exists in local storage' };
      }

      // Add new user with auto-increment ID
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 100, // Start local users at ID 100
        ...user,
        createdAt: new Date().toISOString(),
        isLocalUser: true // Flag to identify localStorage users
      };

      users.push(newUser);
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
      
      console.log('✅ User saved to localStorage:', newUser.email);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Failed to save user:', error);
      return { success: false, message: 'Failed to save user to local storage' };
    }
  }

  // Find user by email and password
  static authenticateUser(email, password) {
    try {
      const users = this.getLocalUsers();
      const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        console.log('✅ Local user authenticated:', user.email);
        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
      }

      return { success: false, message: 'User not found in local storage' };
    } catch (error) {
      console.error('Failed to authenticate local user:', error);
      return { success: false, message: 'Authentication failed' };
    }
  }

  // Update user data (e.g., subscription)
  static updateUser(userId, updates) {
    try {
      const users = this.getLocalUsers();
      const userIndex = users.findIndex(u => u.id === userId);

      if (userIndex === -1) {
        return { success: false, message: 'User not found' };
      }

      // Update user
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));

      console.log('✅ User updated in localStorage:', users[userIndex].email);
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = users[userIndex];
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Failed to update user:', error);
      return { success: false, message: 'Failed to update user' };
    }
  }

  // Check if email exists
  static emailExists(email) {
    const users = this.getLocalUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // Get user by email
  static getUserByEmail(email) {
    const users = this.getLocalUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Delete user (for testing)
  static deleteUser(userId) {
    try {
      const users = this.getLocalUsers();
      const filteredUsers = users.filter(u => u.id !== userId);
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(filteredUsers));
      console.log('✅ User deleted from localStorage');
      return { success: true };
    } catch (error) {
      console.error('Failed to delete user:', error);
      return { success: false, message: 'Failed to delete user' };
    }
  }

  // Clear all local users (for testing)
  static clearAllUsers() {
    try {
      localStorage.removeItem(LOCAL_USERS_KEY);
      console.log('✅ All local users cleared');
      return { success: true };
    } catch (error) {
      console.error('Failed to clear users:', error);
      return { success: false };
    }
  }

  // Get total local users count
  static getUserCount() {
    return this.getLocalUsers().length;
  }
}

// Export for debugging in browser console
if (typeof window !== 'undefined') {
  window.LocalUsersManager = LocalUsersManager;
}
