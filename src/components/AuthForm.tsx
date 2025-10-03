import React, { useState } from 'react';
import { ArrowLeft, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'register') {
      // Proceed to OTP verification
      setCurrentStep('otp');
    } else {
      // Login - create mock user and go to dashboard
      const mockUser = {
        id: '1',
        name: formData.name || 'John Doe',
        email: formData.email,
        contactNumber: '+91 98765 43210',
        userType,
        profilePicture: '',
        verified: true
      };
      
      setUser(mockUser);
      setCurrentStep('dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      <div className="w-full max-w-md">
        <button
          onClick={() => setCurrentStep('landing')}
          className="mb-6 flex items-center space-x-2 text-white hover:text-white/80 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-lg ${
              userType === 'farmer' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <User className={`w-8 h-8 ${userType === 'farmer' ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {authMode === 'login' ? 'Login' : 'Register'}
            </h2>
            
            <p className="text-gray-600 font-medium">
              {authMode === 'login' ? 
                `Login as a ${userType === 'farmer' ? 'Farmer' : 'Worker'}` :
                `Register as a ${userType === 'farmer' ? 'Farmer' : 'Worker'}`
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
                userType === 'farmer' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {authMode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;