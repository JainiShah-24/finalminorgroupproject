import React from 'react';
import { ArrowRight, Users, Briefcase, Globe, Star, CheckCircle, Tractor, Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const LandingPage: React.FC = () => {
  const { language, setCurrentStep, setAuthMode, setUserType } = useApp();

  const handleGetStarted = (userType: 'farmer' | 'worker', authMode: 'login' | 'register') => {
    setUserType(userType);
    setAuthMode(authMode);
    setCurrentStep('auth');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 139, 34, 0.7), rgba(154, 205, 50, 0.6)), url('https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-10">
        <select
          value={language}
          onChange={(e) => setCurrentStep('landing')}
          className="bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-lg px-4 py-2 font-semibold text-gray-800 shadow-lg hover:bg-white transition-all"
        >
          <option value="en">🇺🇸 English</option>
          <option value="hi">🇮🇳 हिंदी</option>
          <option value="gu">🇮🇳 ગુજરાતી</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl max-w-4xl mx-auto">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/50 shadow-lg">
                <span className="text-6xl">🌾</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl text-shadow-lg">
              <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                {getTranslation('appName', language)}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold drop-shadow-lg text-shadow-md bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
              {getTranslation('tagline', language)}
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:bg-white/20 transition-all">
              <Users className="w-12 h-12 text-white mb-4 mx-auto drop-shadow-lg" />
              <h3 className="text-lg font-bold text-white mb-2 text-shadow-md">
                {getTranslation('connectWorkers', language)}
              </h3>
              <p className="text-white/80 text-shadow-sm bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                {getTranslation('connectWorkersDesc', language)}
              </p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:bg-white/20 transition-all">
              <Briefcase className="w-12 h-12 text-white mb-4 mx-auto drop-shadow-lg" />
              <h3 className="text-lg font-bold text-white mb-2 text-shadow-md">
                {getTranslation('findWork', language)}
              </h3>
              <p className="text-white/80 text-shadow-sm bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                {getTranslation('findWorkDesc', language)}
              </p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg hover:bg-white/20 transition-all">
              <Globe className="w-12 h-12 text-white mb-4 mx-auto drop-shadow-lg" />
              <h3 className="text-lg font-bold text-white mb-2 text-shadow-md">
                {getTranslation('multiLanguage', language)}
              </h3>
              <p className="text-white/80 text-shadow-sm bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                {getTranslation('multiLanguageDesc', language)}
              </p>
            </div>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Farmer Card */}
            <div className="bg-gradient-to-br from-green-600/80 to-green-700/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/50 shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-4 border-2 border-white/50 shadow-lg">
                  <Tractor className="w-12 h-12 text-white mx-auto drop-shadow-lg" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 text-shadow-lg">
                  {getTranslation('farmer', language)}
                </h2>
                <p className="text-white/90 text-shadow-md bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                  {getTranslation('farmerDesc', language)}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleGetStarted('farmer', 'register')}
                  className="w-full bg-white/90 backdrop-blur-sm text-green-700 font-bold py-3 px-6 rounded-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/50 flex items-center justify-center space-x-2"
                >
                  <span>{getTranslation('register', language)}</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => handleGetStarted('farmer', 'login')}
                  className="w-full bg-transparent border-2 border-white/70 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  {getTranslation('login', language)}
                </button>
              </div>
            </div>

            {/* Worker Card */}
            <div className="bg-gradient-to-br from-blue-600/80 to-blue-700/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-400/50 shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-4 border-2 border-white/50 shadow-lg">
                  <Sprout className="w-12 h-12 text-white mx-auto drop-shadow-lg" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 text-shadow-lg">
                  {getTranslation('worker', language)}
                </h2>
                <p className="text-white/90 text-shadow-md bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                  {getTranslation('workerDesc', language)}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleGetStarted('worker', 'register')}
                  className="w-full bg-white/90 backdrop-blur-sm text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/50 flex items-center justify-center space-x-2"
                >
                  <span>{getTranslation('register', language)}</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => handleGetStarted('worker', 'login')}
                  className="w-full bg-transparent border-2 border-white/70 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
                >
                  {getTranslation('login', language)}
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <CheckCircle size={20} className="text-green-400 drop-shadow-lg" />
              <span className="font-semibold text-shadow-md">
                {getTranslation('verified', language)}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Star size={20} className="text-yellow-400 drop-shadow-lg" />
              <span className="font-semibold text-shadow-md">
                {getTranslation('trusted', language)}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Users size={20} className="text-blue-400 drop-shadow-lg" />
              <span className="font-semibold text-shadow-md">
                {getTranslation('community', language)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;