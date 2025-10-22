import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Check } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get user data from location state
  const userData = location.state?.user;

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    upiId: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${API_URL}/subscription/plans`);
      if (response.data.success) {
        setPlans(response.data.plans);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load subscription plans');
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
    setError('');
  };

  const handlePaymentDetailChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let details = {};
      
      if (paymentMethod === 'credit-card') {
        details = {
          cardNumber: paymentDetails.cardNumber,
          cardHolder: paymentDetails.cardHolder,
          expiryDate: paymentDetails.expiryDate,
          cvv: paymentDetails.cvv
        };
      } else if (paymentMethod === 'paypal') {
        details = { email: paymentDetails.paypalEmail };
      } else if (paymentMethod === 'upi') {
        details = { upiId: paymentDetails.upiId };
      }

      const response = await axios.post(`${API_URL}/subscription/subscribe`, {
        userId: userData?.id,
        email: userData?.email,
        planId: selectedPlan.id,
        paymentMethod,
        paymentDetails: details
      });

      if (response.data.success) {
        // Store subscription info
        const updatedUser = {
          ...userData,
          subscription: response.data.subscription
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Navigate to browse page
        alert('Subscription successful! Welcome to CineFlix!');
        navigate('/browse');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {!showPayment ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Choose the plan that's right for you
              </h1>
              <p className="text-xl text-gray-400">
                Watch on your favorite devices. Cancel anytime.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-gradient-to-br ${
                    plan.id === 'basic' ? 'from-blue-900 to-blue-700' :
                    plan.id === 'standard' ? 'from-red-900 to-red-700' :
                    'from-purple-900 to-purple-700'
                  } rounded-lg p-8 relative hover:scale-105 transition-transform duration-300 cursor-pointer`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-1">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-300">/month</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-6">{plan.quality}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check size={20} className="flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setShowPayment(false)}
              className="text-gray-400 hover:text-white mb-6"
            >
              ← Back to plans
            </button>

            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Complete Your Subscription</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{selectedPlan?.name} Plan</h3>
                    <p className="text-gray-400">{selectedPlan?.quality}</p>
                  </div>
                  <div className="text-2xl font-bold">
                    ${selectedPlan?.price}/mo
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubscribe}>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit-card')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition ${
                        paymentMethod === 'credit-card'
                          ? 'border-cineflix bg-red-900/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <CreditCard size={32} className="mb-2" />
                      <span className="text-sm">Card</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition ${
                        paymentMethod === 'paypal'
                          ? 'border-cineflix bg-red-900/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">💳</div>
                      <span className="text-sm">PayPal</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition ${
                        paymentMethod === 'upi'
                          ? 'border-cineflix bg-red-900/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Smartphone size={32} className="mb-2" />
                      <span className="text-sm">UPI</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                        required
                        maxLength="16"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Card Holder Name</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={paymentDetails.cardHolder}
                        onChange={handlePaymentDetailChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={handlePaymentDetailChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                          required
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentDetailChange}
                          placeholder="123"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                          required
                          maxLength="4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div>
                    <label className="block text-sm mb-2">PayPal Email</label>
                    <input
                      type="email"
                      name="paypalEmail"
                      value={paymentDetails.paypalEmail}
                      onChange={handlePaymentDetailChange}
                      placeholder="your@paypal.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                      required
                    />
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm mb-2">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetailChange}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cineflix"
                      required
                    />
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cineflix py-4 rounded text-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : `Subscribe for $${selectedPlan?.price}/month`}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-4">
                    This is a demo payment. No real charges will be made.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
