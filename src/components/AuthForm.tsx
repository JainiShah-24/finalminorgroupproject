import React, { useState } from 'react';
import { ArrowLeft, User, Mail, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      // Mock login - in real app, verify credentials
      const mockUser: User = {
        id: '1',
        name: formData.name || 'John Doe',
        email: formData.email,
        phone: formData.phone || '+91 98765 43210',
        userType,
        verified: true
      };
      setUser(mockUser);
      setCurrentStep('dashboard');
    } else {
      setCurrentStep('otp');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(154, 205, 50, 0.4), rgba(34, 139, 34, 0.5)), url('https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <div className="w-full max-w-md">
        <button
          onClick={() => setCurrentStep('landing')}
          className="mb-6 flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{language === 'hi' ? 'वापस' : language === 'gu' ? 'પાછળ' : 'Back'}</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              userType === 'farmer' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {userType === 'farmer' ? (
                <User className={`w-8 h-8 ${userType === 'farmer' ? 'text-green-600' : 'text-blue-600'}`} />
              ) : (
                <UserCheck className="w-8 h-8 text-blue-600" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {authMode === 'login' ? getTranslation('login', language) : getTranslation('register', language)}
            </h2>
            
            <p className="text-gray-600">
              {authMode === 'login' ? (
                userType === 'farmer' ? 
                  (language === 'hi' ? 'किसान के रूप में लॉगिन करें' : 
                   language === 'gu' ? 'ખેડૂત તરીકે લૉગિન કરો' : 
                   'Login as a Farmer') :
                  (language === 'hi' ? 'मजदूर के रूप में लॉगिन करें' : 
                   language === 'gu' ? 'કામદાર તરીકે લૉગિન કરો' : 
                   'Login as a Worker')
              ) : (
                userType === 'farmer' ? 
                  (language === 'hi' ? 'किसान के रूप में पंजीकरण करें' : 
                   language === 'gu' ? 'ખેડૂત તરીકે નોંધણી કરો' : 
                   'Register as a Farmer') :
                  (language === 'hi' ? 'मजदूर के रूप में पंजीकरण करें' : 
                   language === 'gu' ? 'કામદાર તરીકે નોંધણી કરો' : 
                   'Register as a Worker')
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation('name', language)}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 
                               language === 'gu' ? 'તમારું સંપૂર્ણ નામ દાખલ કરો' : 
                               'Enter your full name'}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('phone', language)}
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder={language === 'hi' ? '+91 98765 43210' : 
                             language === 'gu' ? '+91 98765 43210' : 
                             '+91 98765 43210'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('email', language)}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder={language === 'hi' ? 'आपका ईमेल पता' : 
                             language === 'gu' ? 'તમારું ઈમેઈલ સરનામું' : 
                             'Your email address'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('password', language)}
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder={language === 'hi' ? 'पासवर्ड दर्ज करें' : 
                             language === 'gu' ? 'પાસવર્ડ દાખલ કરો' : 
                             'Enter password'}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                userType === 'farmer' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {authMode === 'register' ? 
                (language === 'hi' ? authMode === 'register' ? 'OTP भेजें' : 'लॉगिन' : 
                 language === 'gu' ? authMode === 'register' ? 'OTP મોકલો' : 'લૉગિન' : 
                 authMode === 'register' ? 'Send OTP' : 'Login') : 
                getTranslation('login', language)
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;