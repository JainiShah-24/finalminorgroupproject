import React, { useState } from 'react';
import { ArrowLeft, User, Eye, EyeOff, Upload, X, Wheat, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { indianStatesAndCities } from '../utils/cityData';

const AuthForm: React.FC = () => {
  const { language, setCurrentStep, authMode, userType, setUser } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedState, setSelectedState] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
    fullAddress: '',
    // Worker specific fields
    jobExpertise: [] as string[],
    customJobExpertise: '',
    skillLevel: '',
    workCapacity: '',
    accommodationNeeded: '',
    timeAvailability: '',
    availabilityDuration: '',
    requiredSalary: '',
    salaryType: '',
    additionalBenefits: [] as string[],
    customAdditionalBenefits: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

  const handleJobExpertiseChange = (expertise: string) => {
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
      if (!profileImage) {
        alert('Profile picture is required!');
        return;
      }
      if (userType === 'worker' && !formData.accommodationNeeded) {
        alert('Please specify if you need accommodation!');
        return;
      }
      // Proceed to OTP verification
      setCurrentStep('otp');
    } else {
      // Login - create mock user and go to dashboard
      const mockUser = {
        id: '1',
        name: formData.name || 'John Doe',
        email: formData.email,
        contactNumber: formData.contactNumber || '+91 98765 43210',
        city: formData.city,
        state: formData.state,
        fullAddress: formData.fullAddress,
        userType,
        profilePicture: previewUrl,
        verified: true,
        // Worker specific fields
        jobExpertise: formData.jobExpertise,
        customJobExpertise: formData.customJobExpertise,
        skillLevel: formData.skillLevel,
        workCapacity: formData.workCapacity,
        accommodationNeeded: formData.accommodationNeeded === 'yes',
        timeAvailability: formData.timeAvailability,
        availabilityDuration: formData.availabilityDuration,
        requiredSalary: formData.requiredSalary,
        salaryType: formData.salaryType,
        additionalBenefits: formData.additionalBenefits,
        customAdditionalBenefits: formData.customAdditionalBenefits
      };
      
      setUser(mockUser);
      setCurrentStep('dashboard');
    }
  };

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

  const getLogo = () => {
    if (userType === 'farmer') {
      return (
        <svg width="64" height="64" viewBox="0 0 100 100" className="text-green-600">
          <circle cx="50" cy="50" r="45" fill="currentColor"/>
          <path d="M35 25 L65 25 L65 35 L55 35 L55 45 L65 45 L65 55 L55 55 L55 65 L45 65 L45 55 L35 55 L35 45 L45 45 L45 35 L35 35 Z" fill="white"/>
          <circle cx="30" cy="70" r="8" fill="white"/>
          <circle cx="70" cy="70" r="8" fill="white"/>
        </svg>
      );
    } else {
      return (
        <svg width="64" height="64" viewBox="0 0 100 100" className="text-green-600">
          <circle cx="50" cy="50" r="45" fill="currentColor"/>
          <path d="M35 25 L65 25 L65 35 L55 35 L55 45 L65 45 L65 55 L55 55 L55 65 L45 65 L45 55 L35 55 L35 45 L45 45 L45 35 L35 35 Z" fill="white"/>
          <circle cx="30" cy="70" r="8" fill="white"/>
          <circle cx="70" cy="70" r="8" fill="white"/>
        </svg>
      );
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      <div className="w-full max-w-4xl">
        <button
          onClick={() => setCurrentStep('landing')}
          className="mb-6 flex items-center space-x-2 text-white hover:text-white/80 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium shadow-lg"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <img 
                src="/image.png" 
                alt="FarmConnect Logo" 
                className="w-20 h-20 object-contain drop-shadow-lg"
              />
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
                {/* Profile Picture - Required */}
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Picture <span className="text-red-500">*</span>
                  </label>
                  <div className="relative inline-block">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Profile Preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200 shadow-md">
                        <Upload className="w-8 h-8 text-gray-400" />
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

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                {/* State and City */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setFormData(prev => ({ ...prev, state: e.target.value, city: '' }));
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                      required
                    >
                      <option value="">Select State</option>
                      {Object.keys(indianStatesAndCities).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                      required
                      disabled={!selectedState}
                    >
                      <option value="">Select City</option>
                      {selectedState && indianStatesAndCities[selectedState as keyof typeof indianStatesAndCities]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>

                {/* Worker Specific Fields */}
                {userType === 'worker' && (
                  <>
                    {/* Job Expertise */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Job Expertise <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {jobExpertiseOptions.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.jobExpertise.includes(option.value)}
                              onChange={() => handleJobExpertiseChange(option.value)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{option.label[language as keyof typeof option.label]}</span>
                          </label>
                        ))}
                      </div>
                      
                      {/* Custom Job Expertise */}
                      <div className="mt-3">
                        <input
                          type="text"
                          name="customJobExpertise"
                          value={formData.customJobExpertise}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          placeholder="Other expertise (if not mentioned above)"
                        />
                      </div>
                    </div>

                    {/* Skill Level and Work Capacity */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skill Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="skillLevel"
                          value={formData.skillLevel}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          required
                        >
                          <option value="">Select Level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="experienced">Experienced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Capacity <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="workCapacity"
                          value={formData.workCapacity}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          required
                        >
                          <option value="">Select Capacity</option>
                          <option value="light">Light Work</option>
                          <option value="moderate">Moderate Work</option>
                          <option value="heavy">Heavy Work</option>
                        </select>
                      </div>
                    </div>

                    {/* Time Availability and Duration */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Availability <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="timeAvailability"
                          value={formData.timeAvailability}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          required
                        >
                          <option value="">Select Availability</option>
                          <option value="full-time">Full Time</option>
                          <option value="part-time">Part Time</option>
                          <option value="seasonal">Seasonal</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Availability Duration <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="availabilityDuration"
                          value={formData.availabilityDuration}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          required
                        >
                          <option value="">Select Duration</option>
                          <option value="1-week">1 Week</option>
                          <option value="2-weeks">2 Weeks</option>
                          <option value="1-month">1 Month</option>
                          <option value="3-months">3 Months</option>
                          <option value="6-months">6 Months</option>
                          <option value="1-year">1 Year</option>
                          <option value="permanent">Permanent</option>
                        </select>
                      </div>
                    </div>

                    {/* Expected Salary */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Salary (INR ₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="requiredSalary"
                          value={formData.requiredSalary}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          placeholder="500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="salaryType"
                          value={formData.salaryType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="per-day">Per Day</option>
                          <option value="per-month">Per Month</option>
                        </select>
                      </div>
                    </div>

                    {/* Accommodation Needed - Required */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Accommodation Needed <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accommodationNeeded"
                            value="yes"
                            checked={formData.accommodationNeeded === 'yes'}
                            onChange={handleChange}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            required
                          />
                          <span className="ml-2 text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="accommodationNeeded"
                            value="no"
                            checked={formData.accommodationNeeded === 'no'}
                            onChange={handleChange}
                            className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            required
                          />
                          <span className="ml-2 text-gray-700">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Additional Benefits Required */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Additional Benefits Required <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {additionalBenefitsOptions.map((option) => (
                          <label key={option.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.additionalBenefits.includes(option.value)}
                              onChange={() => handleBenefitChange(option.value)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{option.label[language as keyof typeof option.label]}</span>
                          </label>
                        ))}
                      </div>
                      
                      {/* Custom Additional Benefits */}
                      <div className="mt-3">
                        <input
                          type="text"
                          name="customAdditionalBenefits"
                          value={formData.customAdditionalBenefits}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                          placeholder="Other benefits (if not mentioned above)"
                          required={formData.additionalBenefits.length === 0}
                        />
                      </div>
                    </div>
                  </>
                )}
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

            {/* Confirm Password - Only for Registration */}
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white font-medium"
                    placeholder="Re-enter your password"
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