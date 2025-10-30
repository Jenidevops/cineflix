import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroimage from '../images/heroimage.png';
import { API_URL } from '../config/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter reset code & new password
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [displayResetCode, setDisplayResetCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email: formData.email
      });

      if (response.data.success) {
        setDisplayResetCode(response.data.resetCode);
        setStep(2);
      }
    } catch (err) {
      setErrors({ 
        general: err.response?.data?.message || 'Failed to send reset code. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.resetCode) {
      newErrors.resetCode = 'Please enter the reset code';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Please enter a new password';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        email: formData.email,
        resetCode: formData.resetCode,
        newPassword: formData.newPassword
      });

      if (response.data.success) {
        alert('Password reset successfully! You can now login with your new password.');
        navigate('/login');
      }
    } catch (err) {
      setErrors({ 
        general: err.response?.data?.message || 'Failed to reset password. Please try again.' 
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
          <h1 className="text-3xl font-bold text-white mb-7">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </h1>

          {errors.general && (
            <div className="bg-orange-500 text-white px-4 py-3 rounded mb-4 text-sm">
              {errors.general}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <p className="text-gray-300 text-sm mb-4">
                  Enter your email address and we'll send you a reset code.
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full px-5 py-4 bg-gray-700 border ${
                    errors.email ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                {errors.email && (
                  <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cineflix text-white py-4 rounded font-semibold text-base hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-blue-500 hover:underline text-sm">
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {displayResetCode && (
                <div className="bg-green-600 text-white px-4 py-3 rounded mb-4">
                  <p className="font-semibold">Your reset code is:</p>
                  <p className="text-2xl font-mono tracking-wider">{displayResetCode}</p>
                  <p className="text-xs mt-2">
                    (In production, this would be sent to your email)
                  </p>
                </div>
              )}

              <div>
                <input
                  type="text"
                  name="resetCode"
                  value={formData.resetCode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit reset code"
                  maxLength={6}
                  className={`w-full px-5 py-4 bg-gray-700 border ${
                    errors.resetCode ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                {errors.resetCode && (
                  <p className="text-orange-500 text-sm mt-1">{errors.resetCode}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New password"
                  className={`w-full px-5 py-4 pr-12 bg-gray-700 border ${
                    errors.newPassword ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                {errors.newPassword && (
                  <p className="text-orange-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className={`w-full px-5 py-4 bg-gray-700 border ${
                    errors.confirmPassword ? 'border-orange-500' : 'border-gray-600'
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-gray-600`}
                />
                {errors.confirmPassword && (
                  <p className="text-orange-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cineflix text-white py-4 rounded font-semibold text-base hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Back to Email Entry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
