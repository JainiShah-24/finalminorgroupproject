import React, { useState } from 'react';
import { Camera, Save, MapPin, Phone, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ProfileSection: React.FC = () => {
  const { user, language } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    experience: user?.experience || '',
    skills: user?.skills?.join(', ') || '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
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
                <div className={`w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white ${
                  user?.userType === 'farmer' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{profileData.name}</h3>
              <p className="text-gray-500 capitalize">{user?.userType}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'नाम' : language === 'gu' ? 'નામ' : 'Name'}
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
                  {language === 'hi' ? 'ईमेल' : language === 'gu' ? 'ઈમેઈલ' : 'Email'}
                </label>
                <p className="py-2 text-gray-800">{profileData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-1" />
                  {language === 'hi' ? 'फोन' : language === 'gu' ? 'ફોન' : 'Phone'}
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'hi' ? 'फोन नंबर' : language === 'gu' ? 'ફોન નંબર' : 'Phone number'}
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  {language === 'hi' ? 'स्थान' : language === 'gu' ? 'સ્થાન' : 'Location'}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'hi' ? 'शहर, राज्य' : language === 'gu' ? 'શહેર, રાજ્ય' : 'City, State'}
                  />
                ) : (
                  <p className="py-2 text-gray-800">{profileData.location || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award size={16} className="inline mr-1" />
                {language === 'hi' ? 'अनुभव' : language === 'gu' ? 'અનુભવ' : 'Experience'}
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={
                    user?.userType === 'farmer' 
                      ? (language === 'hi' ? 'अपने खेती के अनुभव के बारे में बताएं' : 
                         language === 'gu' ? 'તમારા ખેતીના અનુભવ વિશે જણાવો' : 
                         'Tell us about your farming experience')
                      : (language === 'hi' ? 'अपने काम के अनुभव के बारे में बताएं' : 
                         language === 'gu' ? 'તમારા કામના અનુભવ વિશે જણાવો' : 
                         'Tell us about your work experience')
                  }
                />
              ) : (
                <p className="py-2 text-gray-800">{profileData.experience || 'No experience added yet'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {user?.userType === 'farmer' 
                  ? (language === 'hi' ? 'विशेषता' : language === 'gu' ? 'વિશેષતા' : 'Specialization')
                  : (language === 'hi' ? 'कौशल' : language === 'gu' ? 'કૌશલ્ય' : 'Skills')
                }
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={
                    user?.userType === 'farmer' 
                      ? (language === 'hi' ? 'जैसे: गेहूं, चावल, सब्जी' : 
                         language === 'gu' ? 'જેવા કે: ઘઉં, ચાવલ, શાકભાજી' : 
                         'e.g: Wheat, Rice, Vegetables')
                      : (language === 'hi' ? 'जैसे: हार्वेस्टिंग, ट्रैक्टर चलाना' : 
                         language === 'gu' ? 'જેવા કે: લણણી, ટ્રેક્ટર ચલાવવું' : 
                         'e.g: Harvesting, Tractor Operation')
                  }
                />
              ) : (
                <p className="py-2 text-gray-800">{profileData.skills || 'No skills added yet'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;