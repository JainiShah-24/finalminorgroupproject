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
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.85), rgba(220, 252, 231, 0.85)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-green-200 hover:bg-white transition-all text-gray-800 font-medium"
          >
            <Globe size={18} className="text-green-600" />
            <span className="text-shadow-sm">{languages.find(l => l.code === language)?.name}</span>
            <ChevronDown size={16} className="text-green-600" />
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border border-green-200 min-w-[140px] z-20 overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-green-50 transition-colors font-medium border-b border-green-100 last:border-b-0 ${
                    language === lang.code ? 'bg-green-100 text-green-800 border-l-4 border-l-green-500' : 'text-gray-700'
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
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg border-4 border-white">
              <Wheat className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800 text-shadow-lg">
              <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-green-200 shadow-lg">
                {getTranslation('welcome', language)}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 font-semibold max-w-3xl mx-auto leading-relaxed">
              <span className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-green-200 shadow-md">
                {getTranslation('subtitle', language)}
              </span>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'hi' ? '10,000+ किसान' : 
                 language === 'gu' ? '10,000+ ખેડૂતો' : 
                 '10,000+ Farmers'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'hi' ? 'भरोसेमंद प्लेटफॉर्म' : 
                 language === 'gu' ? 'વિશ્વસનીય પ્લેટફોર્મ' : 
                 'Trusted Platform'}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-green-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wheat className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'सुरक्षित कनेक्शन' : 
                 language === 'gu' ? 'સુરક્ષિત કનેક્શન' : 
                 'Secure Connection'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'hi' ? 'सत्यापित उपयोगकर्ता' : 
                 language === 'gu' ? 'ચકાસાયેલ વપરાશકર્તાઓ' : 
                 'Verified Users'}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-green-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'पूरे भारत में' : 
                 language === 'gu' ? 'સમગ્ર ભારતમાં' : 
                 'All Over India'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'hi' ? '28 राज्यों में सेवा' : 
                 language === 'gu' ? '28 રાજ્યોમાં સેવા' : 
                 'Service in 28 States'}
              </p>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Farmer Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Wheat className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'किसान' : language === 'gu' ? 'ખેડૂત' : 'Farmer'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {language === 'hi' ? 'मजदूर खोजें और अपनी फसल बढ़ाएं' : 
                   language === 'gu' ? 'કામદાર શોધો અને તમારી પાક વધારો' : 
                   'Find workers and grow your crops'}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'login')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {getTranslation('loginAsFarmer', language)}
                </button>
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-green-600 py-3 px-6 rounded-lg font-semibold border-2 border-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {language === 'hi' ? 'किसान के रूप में पंजीकरण' : 
                   language === 'gu' ? 'ખેડૂત તરીકે નોંધણી' : 
                   'Register as Farmer'}
                </button>
              </div>
            </div>

            {/* Worker Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'मजदूर' : language === 'gu' ? 'કામદાર' : 'Worker'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {language === 'hi' ? 'काम खोजें और अच्छी कमाई करें' : 
                   language === 'gu' ? 'કામ શોધો અને સારી કમાણી કરો' : 
                   'Find work and earn good income'}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleUserTypeSelection('worker', 'login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {getTranslation('loginAsWorker', language)}
                </button>
                <button
                  onClick={() => handleUserTypeSelection('worker', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-blue-600 py-3 px-6 rounded-lg font-semibold border-2 border-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {language === 'hi' ? 'मजदूर के रूप में पंजीकरण' : 
                   language === 'gu' ? 'કામદાર તરીકે નોંધણી' : 
                   'Register as Worker'}
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'hi' ? 'प्लेटफॉर्म की विशेषताएं' : 
                 language === 'gu' ? 'પ્લેટફોર્મની વિશેષતાઓ' : 
                 'Platform Features'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{getTranslation('findWorkers', language)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>{getTranslation('findWork', language)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>{getTranslation('leaseAssets', language)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>{getTranslation('news', language)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;