import React, { useState } from 'react';
import { Camera, Save, MapPin, Phone, Award, Upload, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ProfileSection: React.FC = () => {
  const { user, language } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    contactNumber: user?.contactNumber || '',
    email: user?.email || '',
    city: user?.city || '',
    state: user?.state || '',
    // Worker specific fields
    jobExpertise: user?.jobExpertise?.join(', ') || '',
    skillLevel: user?.skillLevel || '',
    workCapacity: user?.workCapacity || '',
    accommodationNeeded: user?.accommodationNeeded || false,
    timeAvailability: user?.timeAvailability || '',
    requiredSalary: user?.requiredSalary || '',
    additionalBenefits: user?.additionalBenefits?.join(', ') || ''
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {language === 'hi' ? 'प्रोफाइल' : 
             language === 'gu' ? 'પ્રોફાઇલ' : 
             'Profile'}
          </h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : user?.userType === 'farmer' 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isEditing ? (
              <>
                <Save size={16} className="inline mr-2" />
                {language === 'hi' ? 'सहेजें' : language === 'gu' ? 'સાચવો' : 'Save'}
              </>
            ) : (
              language === 'hi' ? 'संपादित करें' : language === 'gu' ? 'સંપાદિત કરો' : 'Edit'
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block">
                {previewUrl || user?.profilePicture ? (
                  <img
                    src={previewUrl || user?.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className={`w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white ${
                    user?.userType === 'farmer' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image-upload"
                    />
                    <label
                      htmlFor="profile-image-upload"
                      className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors cursor-pointer block"
                    >
                      <Camera size={16} />
                    </label>
                  </div>
                )}
              </div>
              {isEditing && previewUrl && (
                <button
                  onClick={removeImage}
                  className="text-red-500 hover:text-red-700 text-sm font-medium mb-2"
                >
                  {language === 'hi' ? 'तस्वीर हटाएं' : language === 'gu' ? 'ચિત્ર હટાવો' : 'Remove Image'}
                </button>
              )}
              <h3 className="text-xl font-semibold text-gray-800">{profileData.name}</h3>
              <p className="text-gray-500 capitalize">{user?.userType}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'पूरा नाम' : language === 'gu' ? 'સંપૂર્ણ નામ' : 'Full Name'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-1" />
                  {language === 'hi' ? 'संपर्क नंबर' : language === 'gu' ? 'સંપર્ક નંબર' : 'Contact Number'}
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="+91 98765 43210"
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.contactNumber || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'ईमेल' : language === 'gu' ? 'ઈમેઈલ' : 'Email'}
                </label>
                <p className="py-2 text-gray-800">{profileData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  {language === 'hi' ? 'शहर' : language === 'gu' ? 'શહેર' : 'City'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.city || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'राज्य' : language === 'gu' ? 'રાજ્ય' : 'State'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.state || 'Not provided'}</p>
                )}
              </div>
            </div>

            {/* Worker Specific Fields */}
            {user?.userType === 'worker' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Award size={16} className="inline mr-1" />
                    {language === 'hi' ? 'विशेषज्ञता' : language === 'gu' ? 'નિપુણતા' : 'Job Expertise'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.jobExpertise}
                      onChange={(e) => handleInputChange('jobExpertise', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Harvesting, Planting, etc."
                    />
                  ) : (
                    <p className="py-2 text-gray-800">{profileData.jobExpertise || 'Not specified'}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'कौशल स्तर' : language === 'gu' ? 'કૌશલ્ય સ્તર' : 'Skill Level'}
                    </label>
                    {isEditing ? (
                      <select
                        value={profileData.skillLevel}
                        onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                        <option value="expert">Expert</option>
                      </select>
                    ) : (
                      <p className="py-2 text-gray-800 capitalize">{profileData.skillLevel || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'कार्य क्षमता' : language === 'gu' ? 'કાર્ય ક્ષમતા' : 'Work Capacity'}
                    </label>
                    {isEditing ? (
                      <select
                        value={profileData.workCapacity}
                        onChange={(e) => handleInputChange('workCapacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Capacity</option>
                        <option value="light">Light Work</option>
                        <option value="moderate">Moderate Work</option>
                        <option value="heavy">Heavy Work</option>
                      </select>
                    ) : (
                      <p className="py-2 text-gray-800 capitalize">{profileData.workCapacity || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'समय उपलब्धता' : language === 'gu' ? 'સમય ઉપલબ્ધતા' : 'Time Availability'}
                    </label>
                    {isEditing ? (
                      <select
                        value={profileData.timeAvailability}
                        onChange={(e) => handleInputChange('timeAvailability', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select Availability</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="seasonal">Seasonal</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    ) : (
                      <p className="py-2 text-gray-800 capitalize">{profileData.timeAvailability || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'आवश्यक वेतन' : language === 'gu' ? 'જરૂરી પગાર' : 'Required Salary'}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.requiredSalary}
                        onChange={(e) => handleInputChange('requiredSalary', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="₹500/day or ₹15000/month"
                      />
                    ) : (
                      <p className="py-2 text-gray-800">{profileData.requiredSalary || 'Not specified'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'आवास की आवश्यकता' : language === 'gu' ? 'આવાસની જરૂર' : 'Accommodation Needed'}
                  </label>
                  {isEditing ? (
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accommodationNeeded"
                          checked={profileData.accommodationNeeded === true}
                          onChange={() => handleInputChange('accommodationNeeded', true)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="accommodationNeeded"
                          checked={profileData.accommodationNeeded === false}
                          onChange={() => handleInputChange('accommodationNeeded', false)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  ) : (
                    <p className="py-2 text-gray-800">
                      {profileData.accommodationNeeded ? 'Yes' : 'No'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'अतिरिक्त लाभ' : language === 'gu' ? 'વધારાના ફાયદા' : 'Additional Benefits'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.additionalBenefits}
                      onChange={(e) => handleInputChange('additionalBenefits', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Housing, Food, Health Insurance, etc."
                    />
                  ) : (
                    <p className="py-2 text-gray-800">{profileData.additionalBenefits || 'None specified'}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;