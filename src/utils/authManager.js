// Enhanced Authentication Manager with localStorage persistence

const STORAGE_KEYS = {
  USER: 'cineflix_user',
  AUTH_STATUS: 'cineflix_isAuthenticated',
  SESSION_TIMESTAMP: 'cineflix_session_timestamp'
};

// Session timeout (24 hours in milliseconds)
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

export class AuthManager {
  // Save user session to localStorage
  static saveSession(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_STATUS, 'true');
      localStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, Date.now().toString());
      console.log('✅ Session saved:', user.email);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  // Get user from localStorage
  static getUser() {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userJson) return null;

      const sessionTimestamp = localStorage.getItem(STORAGE_KEYS.SESSION_TIMESTAMP);
      if (sessionTimestamp) {
        const sessionAge = Date.now() - parseInt(sessionTimestamp);
        
        // Check if session has expired
        if (sessionAge > SESSION_TIMEOUT) {
          console.log('⏰ Session expired');
          this.clearSession();
          return null;
        }
      }

      return JSON.parse(userJson);
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const authStatus = localStorage.getItem(STORAGE_KEYS.AUTH_STATUS);
    const user = this.getUser();
    return authStatus === 'true' && user !== null;
  }

  // Clear session (logout)
  static clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_STATUS);
      localStorage.removeItem(STORAGE_KEYS.SESSION_TIMESTAMP);
      
      // Also clear favorites and continue watching
      localStorage.removeItem('cineflix_favorites');
      localStorage.removeItem('cineflix_continue_watching');
      
      console.log('🔓 Session cleared');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  // Update user data (e.g., after subscription)
  static updateUser(updatedUser) {
    try {
      const currentUser = this.getUser();
      if (currentUser) {
        const mergedUser = { ...currentUser, ...updatedUser };
        this.saveSession(mergedUser);
        console.log('✅ User updated:', mergedUser.email);
        return mergedUser;
      }
      return null;
    } catch (error) {
      console.error('Failed to update user:', error);
      return null;
    }
  }

  // Check if user has active subscription
  static hasSubscription() {
    const user = this.getUser();
    return user?.subscription?.status === 'active';
  }

  // Get user subscription details
  static getSubscription() {
    const user = this.getUser();
    return user?.subscription || null;
  }

  // Refresh session timestamp (extend session)
  static refreshSession() {
    if (this.isAuthenticated()) {
      localStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, Date.now().toString());
    }
  }
}

// Auto-refresh session on page activity (every 5 minutes)
if (typeof window !== 'undefined') {
  setInterval(() => {
    if (AuthManager.isAuthenticated()) {
      AuthManager.refreshSession();
    }
  }, 5 * 60 * 1000); // 5 minutes
}
