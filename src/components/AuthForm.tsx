import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Upload, X, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { User as UserType } from '../types';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    city: '',
    state: ''
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setPreviewUrl('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGoogleAuth = () => {
    // Mock Google authentication
    const mockUser: UserType = {
      id: '1',
      name: formData.name || 'John Doe',
      email: 'john.doe@gmail.com',
      contactNumber: formData.contactNumber || '+91 98765 43210',
      city: formData.city || 'Mumbai',
      state: formData.state || 'Maharashtra',
      userType,
      profilePicture: previewUrl,
      verified: true
    };
    
    setUser(mockUser);
    setCurrentStep('dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGoogleAuth();
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
          className="mb-6 flex items-center space-x-2 text-white hover:text-white/80 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-shadow">{language === 'hi' ? 'वापस' : language === 'gu' ? 'પાછળ' : 'Back'}</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg ${
              userType === 'farmer' ? 'bg-green-100 border-2 border-green-200' : 'bg-blue-100 border-2 border-blue-200'
            }`}>
              {userType === 'farmer' ? (
                <User className="w-8 h-8 text-green-600" />
              ) : (
                <UserCheck className="w-8 h-8 text-blue-600" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-shadow-sm">
              {authMode === 'login' ? getTranslation('login', language) : getTranslation('register', language)}
            </h2>
            
            <p className="text-gray-700 font-medium bg-white/50 px-4 py-2 rounded-lg border border-gray-200">
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

          {authMode === 'login' ? (
            // Login Form - Only Google Sign In
            <div className="space-y-6">
              <button
                onClick={handleGoogleAuth}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  userType === 'farmer' 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-2 border-green-500' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-2 border-blue-500'
                } flex items-center justify-center space-x-3`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{getTranslation('loginWithGoogle', language)}</span>
              </button>
            </div>
          ) : (
            // Registration Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <label className="block text-sm font-semibold text-gray-700 mb-3 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                  {getTranslation('profilePicture', language)}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative inline-block">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className={`w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                      userType === 'farmer' ? 'border-green-400 bg-green-50' : 'border-blue-400 bg-blue-50'
                    }`}>
                      <Upload className={`w-8 h-8 ${userType === 'farmer' ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                  {getTranslation('name', language)}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 
                               language === 'gu' ? 'તમારું સંપૂર્ણ નામ દાખલ કરો' : 
                               'Enter your full name'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                  {getTranslation('contactNumber', language)}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                    {getTranslation('city', language)}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    placeholder={language === 'hi' ? 'शहर का नाम' : language === 'gu' ? 'શહેરનું નામ' : 'City name'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                    {getTranslation('state', language)}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'राज्य चुनें' : language === 'gu' ? 'રાજ્ય પસંદ કરો' : 'Select State'}
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!profileImage || !formData.name || !formData.contactNumber || !formData.city || !formData.state}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  userType === 'farmer' 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-2 border-green-500' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-2 border-blue-500'
                } flex items-center justify-center space-x-3`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{getTranslation('signUpWithGoogle', language)}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;