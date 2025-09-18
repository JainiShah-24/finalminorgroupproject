import React from 'react';
import { Tractor, Users, BookOpen, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const LandingPage: React.FC = () => {
  const { language, setCurrentStep, setAuthMode, setUserType } = useApp();

  const handleUserTypeSelection = (type: 'farmer' | 'worker', mode: 'login' | 'register') => {
    setUserType(type);
    setAuthMode(mode);
    setCurrentStep('auth');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(154, 205, 50, 0.3), rgba(34, 139, 34, 0.4)), url('https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full mb-6 shadow-xl">
              <Tractor className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              {getTranslation('welcome', language)}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              {getTranslation('subtitle', language)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Farmer Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Tractor className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'किसान' : language === 'gu' ? 'ખેડૂત' : 'Farmer'}
                </h2>
                <p className="text-gray-600">
                  {language === 'hi' ? 'मजदूर खोजें, उपकरण किराए पर दें' : 
                   language === 'gu' ? 'કામદાર શોધો, સાધનો ભાડે આપો' : 
                   'Find workers, lease equipment'}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'login')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{getTranslation('loginAsFarmer', language)}</span>
                  <ArrowRight size={18} />
                </button>
                
                <button
                  onClick={() => handleUserTypeSelection('farmer', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-green-600 py-3 px-6 rounded-lg font-semibold transition-colors border-2 border-green-600"
                >
                  {getTranslation('register', language)}
                </button>
              </div>
            </div>

            {/* Worker Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/50">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'मजदूर' : language === 'gu' ? 'કામદાર' : 'Worker'}
                </h2>
                <p className="text-gray-600">
                  {language === 'hi' ? 'काम खोजें, कृषि में काम करें' : 
                   language === 'gu' ? 'કામ શોધો, ખેતીમાં કામ કરો' : 
                   'Find work, work in agriculture'}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleUserTypeSelection('worker', 'login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{getTranslation('loginAsWorker', language)}</span>
                  <ArrowRight size={18} />
                </button>
                
                <button
                  onClick={() => handleUserTypeSelection('worker', 'register')}
                  className="w-full bg-white hover:bg-gray-50 text-blue-600 py-3 px-6 rounded-lg font-semibold transition-colors border-2 border-blue-600"
                >
                  {getTranslation('register', language)}
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'hi' ? 'कुशल मजदूर' : language === 'gu' ? 'કુશળ કામદાર' : 'Skilled Workers'}
              </h3>
            </div>
            
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <Tractor className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'hi' ? 'उपकरण साझाकरण' : language === 'gu' ? 'સાધન શેરિંગ' : 'Equipment Sharing'}
              </h3>
            </div>
            
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">
                {language === 'hi' ? 'कृषि शिक्षा' : language === 'gu' ? 'કૃષિ શિક્ષણ' : 'Agricultural Education'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;