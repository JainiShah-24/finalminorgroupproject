import React, { useState } from 'react';
import { ArrowLeft, User, Upload, X, UserCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      // Proceed to OTP verification
      setCurrentStep('otp');
    } else {
      // Login - create mock user and go to dashboard
      const mockUser: UserType = {
        id: '1',
        name: formData.name || 'John Doe',
        email: formData.email,
        contactNumber: '+91 98765 43210',
        userType,
        profilePicture: previewUrl,
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
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.9)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <div className="w-full max-w-2xl">
        <button
          onClick={() => setCurrentStep('landing')}
          className="mb-6 flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-200 shadow-md font-medium"
        >
          <ArrowLeft size={20} />
          <span>{language === 'hi' ? 'वापस' : language === 'gu' ? 'પાછળ' : 'Back'}</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-green-200">
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
            
            <p className="text-gray-700 font-medium bg-white/70 px-4 py-2 rounded-lg border border-green-200 shadow-sm">
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
              <>
                {/* Profile Picture Upload */}
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                    {getTranslation('profilePicture', language)}
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

                {/* Name */}
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

                      placeholder={language === 'hi' ? 'उपयोगकर्ता नाम दर्ज करें' : 
                                 language === 'gu' ? 'વપરાશકર્તા નામ દાખલ કરો' : 
                                 'Enter username'}
                      required
                    >
                      <option value="">
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                {getTranslation('email', language)}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                {getTranslation('password', language)}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
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

            {/* Confirm Password (Registration only) */}
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                  {getTranslation('confirmPassword', language)}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <button
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                userType === 'farmer' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-2 border-green-500' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-2 border-blue-500'
              }`}
            >
              {authMode === 'login' ? getTranslation('login', language) : getTranslation('register', language)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;