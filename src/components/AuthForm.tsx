import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Upload, X, UserCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { User as UserType } from '../types';
import { indianStatesAndCities } from '../utils/cityData';
import { indianStatesAndCities } from '../utils/cityData';
import { indianStatesAndCities } from '../utils/cityData';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Worker specific fields
    jobExpertise: [] as string[],
    skillLevel: '',
    workCapacity: '',
    accommodationNeeded: false,
    timeAvailability: '',
    requiredSalary: '',
    additionalBenefits: [] as string[]
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  const jobExpertiseOptions = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'driver', label: { en: 'Driver', hi: 'ड्राइवर', gu: 'ડ્રાઇવર' } },
    { value: 'mechanic', label: { en: 'Mechanic', hi: 'मैकेनिक', gu: 'મિકેનિક' } }
  ];

  const additionalBenefitsOptions = [
    { value: 'housing', label: { en: 'Housing', hi: 'आवास', gu: 'આવાસ' } },
    { value: 'food', label: { en: 'Food', hi: 'भोजन', gu: 'ભોજન' } },
    { value: 'health', label: { en: 'Health Insurance', hi: 'स्वास्थ्य बीमा', gu: 'આરોગ્ય વીમો' } },
    { value: 'transport', label: { en: 'Transportation', hi: 'परिवहन', gu: 'પરિવહન' } }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleExpertiseChange = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      jobExpertise: prev.jobExpertise.includes(expertise)
        ? prev.jobExpertise.filter(e => e !== expertise)
        : [...prev.jobExpertise, expertise]
    }));
  };

  const handleBenefitChange = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      additionalBenefits: prev.additionalBenefits.includes(benefit)
        ? prev.additionalBenefits.filter(b => b !== benefit)
        : [...prev.additionalBenefits, benefit]
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
        contactNumber: formData.contactNumber || '+91 98765 43210',
        city: formData.city || 'Mumbai',
        state: formData.state || 'Maharashtra',
        userType,
        profilePicture: previewUrl,
        jobExpertise: formData.jobExpertise,
        skillLevel: formData.skillLevel,
        workCapacity: formData.workCapacity,
        accommodationNeeded: formData.accommodationNeeded,
        timeAvailability: formData.timeAvailability,
        requiredSalary: formData.requiredSalary,
        additionalBenefits: formData.additionalBenefits,
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
        backgroundImage: `linear-gradient(rgba(154, 205, 50, 0.4), rgba(34, 139, 34, 0.5)), url('https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <div className="w-full max-w-2xl">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'register' && (
              <>
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

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                    {getTranslation('name', language)}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
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

                {/* Contact Number */}
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

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                      {getTranslation('city', language)}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
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
                        {language === 'hi' ? 'शहर चुनें' : language === 'gu' ? 'શહેર પસંદ કરો' : 'Select City'}
                      </option>
                      {formData.state && indianStatesAndCities[formData.state as keyof typeof indianStatesAndCities]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                        {language === 'hi' ? 'शहर चुनें' : language === 'gu' ? 'શહેર પસંદ કરો' : 'Select City'}
                      </option>
                      {formData.state && indianStatesAndCities[formData.state as keyof typeof indianStatesAndCities]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                        {language === 'hi' ? 'राज्य चुनें' : language === 'gu' ? 'રાજ્ય પસંદ કરો' : 'Select State'}
                      </option>
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Worker Specific Fields */}
                {userType === 'worker' && (
                  <>
                    {/* Job Expertise */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                        {getTranslation('expertise', language)}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {jobExpertiseOptions.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.jobExpertise.includes(option.value)}
                              onChange={() => handleExpertiseChange(option.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{option.label[language as keyof typeof option.label]}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Skill Level and Work Capacity */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                          {getTranslation('skillLevel', language)}
                        </label>
                        <select
                          name="skillLevel"
                          value={formData.skillLevel}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                        >
                          <option value="">Select Level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="experienced">Experienced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                          {getTranslation('workCapacity', language)}
                        </label>
                        <select
                          name="workCapacity"
                          value={formData.workCapacity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                        >
                          <option value="">Select Capacity</option>
                          <option value="light">Light Work</option>
                          <option value="moderate">Moderate Work</option>
                          <option value="heavy">Heavy Work</option>
                        </select>
                      </div>
                    </div>

                    {/* Time Availability and Required Salary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                          {getTranslation('timeAvailability', language)}
                        </label>
                        <select
                          name="timeAvailability"
                          value={formData.timeAvailability}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                        >
                          <option value="">Select Availability</option>
                          <option value="full-time">Full Time</option>
                          <option value="part-time">Part Time</option>
                          <option value="seasonal">Seasonal</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                          {getTranslation('requiredSalary', language)}
                        </label>
                        <input
                          type="text"
                          name="requiredSalary"
                          value={formData.requiredSalary}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                          placeholder="₹500/day or ₹15000/month"
                        />
                      </div>
                    </div>

                    {/* Accommodation Needed */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                        {getTranslation('accommodationNeeded', language)}
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="accommodationNeeded"
                            value="true"
                            checked={formData.accommodationNeeded === true}
                            onChange={() => setFormData({...formData, accommodationNeeded: true})}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="accommodationNeeded"
                            value="false"
                            checked={formData.accommodationNeeded === false}
                            onChange={() => setFormData({...formData, accommodationNeeded: false})}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Additional Benefits */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 bg-white/70 px-3 py-1 rounded-lg border border-gray-300">
                        Additional Benefits Required
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {additionalBenefitsOptions.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.additionalBenefits.includes(option.value)}
                              onChange={() => handleBenefitChange(option.value)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{option.label[language as keyof typeof option.label]}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
                  <select
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white/90 backdrop-blur-sm font-medium"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'शहर चुनें' : language === 'gu' ? 'શહેર પસંદ કરો' : 'Select City'}
                    </option>
                    {formData.state && indianStatesAndCities[formData.state as keyof typeof indianStatesAndCities]?.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
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