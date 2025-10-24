import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroimage from '../images/heroimage.png';
import { API_URL } from '../config/api';
import { AuthManager } from '../utils/authManager';
import { LocalUsersManager } from '../utils/localUsersManager';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Please enter a valid email address or phone number.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Your password must contain between 4 and 60 characters.';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Your password must contain between 4 and 60 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // First, try to authenticate with backend
      try {
        const response = await axios.post(`${API_URL}/auth/login`, formData);
        
        if (response.data.success) {
          // Backend authentication successful
          AuthManager.saveSession(response.data.user);
          
          // Check if user has subscription
          if (response.data.user.subscription && response.data.user.subscription.status === 'active') {
            navigate('/browse');
          } else {
            navigate('/subscription', { state: { user: response.data.user } });
          }
          return;
        }
      } catch (backendErr) {
        console.log('⚠️ Backend login failed, checking localStorage:', backendErr.message);
      }

      // Fallback: Check localStorage
      const localAuth = LocalUsersManager.authenticateUser(formData.email, formData.password);
      
      if (localAuth.success) {
        // Local authentication successful
        AuthManager.saveSession(localAuth.user);
        
        console.log('✅ Logged in with localStorage user');
        
        // Check if user has subscription
        if (localAuth.user.subscription && localAuth.user.subscription.status === 'active') {
          navigate('/browse');
        } else {
          navigate('/subscription', { state: { user: localAuth.user } });
        }
      } else {
        // Both backend and localStorage failed
        setErrors({ 
          general: 'Incorrect email or password. Please try again or use demo@cineflix.com / Demo@2024!Secure' 
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ 
        general: 'Login failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${heroimage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar showLinks={false} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="bg-black/75 rounded-md p-8 md:p-16 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-7">Sign In</h1>

          {errors.general && (
            <div className="bg-orange-500 text-white px-4 py-3 rounded mb-4 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or phone number"
                className={`w-full px-5 py-4 bg-gray-700 border ${
                  errors.email ? 'border-orange-500' : 'border-gray-600'
                } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
              />
              {errors.email && (
                <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-5 py-4 bg-gray-700 border ${
                  errors.password ? 'border-orange-500' : 'border-gray-600'
                } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
              />
              {errors.password && (
                <p className="text-orange-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cineflix text-white py-4 rounded font-semibold text-base hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-gray-400"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-gray-400 hover:underline">
                Need help?
              </button>
            </div>
          </form>

          <div className="mt-16">
            <p className="text-gray-400">
              New to CineFlix?{' '}
              <Link to="/signup" className="text-white hover:underline font-semibold">
                Sign up now
              </Link>
              .
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <button className="text-blue-500 hover:underline">Learn more</button>.
            </p>
          </div>

          <div className="mt-8 text-xs text-gray-400 bg-gray-800/50 p-3 rounded">
            <p className="font-semibold mb-2">Test Credentials (for developers):</p>
            <div className="space-y-2">
              <div className="border-l-2 border-green-500 pl-2">
                <p className="text-green-400 font-semibold">Demo User (has subscription):</p>
                <p>Email: demo@cineflix.com</p>
                <p>Password: Demo@2024!Secure</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-2">
                <p className="text-yellow-400 font-semibold">Test User (needs subscription):</p>
                <p>Email: test@test.com</p>
                <p>Password: Test@2024!Pass</p>
              </div>
            </div>
            <p className="mt-3 text-gray-500 italic">Or create a new account using Sign Up</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
