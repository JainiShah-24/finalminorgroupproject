import React, { useState } from 'react';
import { Wheat, Users, Globe, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Language } from '../types';

const LandingPage: React.FC = () => {
  const { language, setLanguage, setCurrentStep, setAuthMode, setUserType } = useApp();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const handleUserTypeSelection = (type: 'farmer' | 'worker', mode: 'login' | 'register') => {
    setUserType(type);
    setAuthMode(mode);
    setCurrentStep('auth');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 hover:bg-white transition-all text-gray-800 font-medium"
          >
            <Globe size={18} className="text-green-600" />
            <span>{languages.find(l => l.code === language)?.name}</span>
            <ChevronDown size={16} className="text-green-600" />
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[140px] z-20 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors font-medium border-b border-gray-100 last:border-b-0 ${
                    language === lang.code ? 'bg-green-50 text-green-800' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="inline-flex items-center justify-center mb-8">
              <img 
                src="/image.png" 
                alt="FarmConnect Logo" 
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              Welcome to FarmConnect
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Connecting Farmers and Workers for Better Agriculture
            </p>
          </div>

          {/* User Type Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Farmer Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Wheat className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Farmer
                </h2>
                <p className="text-gray-600 text-lg">
                  Find workers, lease equipment
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'login')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Login as Farmer</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-green-600 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Worker Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Worker
                </h2>
                <p className="text-gray-600 text-lg">
                  Find work, work in agriculture
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleUserTypeSelection('worker', 'login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Login as Worker</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => handleUserTypeSelection('worker', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-blue-600 py-4 px-6 rounded-xl font-semibold text-lg border-2 border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;