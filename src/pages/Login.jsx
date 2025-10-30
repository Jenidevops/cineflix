import { useState, useEffect } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('cineflix_remembered_email');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

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
      console.log('🔄 Attempting login with:', { email: formData.email, apiUrl: API_URL });
      
      // Try to authenticate with MongoDB backend
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      
      console.log('📥 Response received:', response.data);
      
      if (response.data.success) {
        // Backend authentication successful
        AuthManager.saveSession(response.data.user);
        console.log('✅ Session saved:', response.data.user.email);
        
        // Save email to localStorage if "Remember me" is checked
        if (rememberMe) {
          localStorage.setItem('cineflix_remembered_email', formData.email);
        } else {
          localStorage.removeItem('cineflix_remembered_email');
        }
        
        console.log('✅ Logged in successfully:', response.data.user.email);
        console.log('📋 User subscription:', response.data.user.subscription);
        
        // Check if user has subscription
        if (response.data.user.subscription && response.data.user.subscription.status === 'active') {
          console.log('🚀 Navigating to /browse');
          navigate('/browse');
        } else {
          console.log('🚀 Navigating to /subscription');
          navigate('/subscription', { state: { user: response.data.user } });
        }
        return;
      }
      
      // If we get here, authentication failed
      console.log('❌ Login failed - response.data.success was false');
      setErrors({ 
        general: 'Incorrect email or password. Please try again.' 
      });
      
    } catch (err) {
      console.error('❌ Login error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Check if it's a 401 (wrong credentials) or network/server error
      if (err.response && err.response.status === 401) {
        setErrors({ 
          general: 'Incorrect email or password. Please try again.' 
        });
      } else {
        setErrors({ 
          general: 'Unable to connect to server. Please check your internet connection and try again.' 
        });
      }
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-5 py-4 pr-12 bg-gray-700 border ${
                  errors.password ? 'border-orange-500' : 'border-gray-600'
                } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
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
              <Link to="/forgot-password" className="text-gray-400 hover:underline">
                Forgot password?
              </Link>
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


        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
