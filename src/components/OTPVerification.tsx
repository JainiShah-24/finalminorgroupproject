import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import LanguageSelector from './LanguageSelector';
import { User } from '../types';

const OTPVerification: React.FC = () => {
  const { language, setCurrentStep, setUser, userType } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length === 6) {
      // Mock user creation
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        username: 'john_farmer',
        email: 'john@example.com',
        userType,
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
        backgroundImage: `linear-gradient(rgba(154, 205, 50, 0.4), rgba(34, 139, 34, 0.5)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <LanguageSelector />
      
      <div className="w-full max-w-md">
        <button
          onClick={() => setCurrentStep('auth')}
          className="mb-6 flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{language === 'hi' ? 'वापस' : language === 'gu' ? 'પાછળ' : 'Back'}</span>
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'hi' ? 'OTP सत्यापन' : 
               language === 'gu' ? 'OTP ચકાસણી' : 
               'OTP Verification'}
            </h2>
            
            <p className="text-gray-600">
              {language === 'hi' ? 'आपके ईमेल पर भेजा गया 6 अंकों का कोड दर्ज करें' : 
               language === 'gu' ? 'તમારા ઈમેઈલ પર મોકલેલો 6 અંકનો કોડ દાખલ કરો' : 
               'Enter the 6-digit code sent to your email'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={otp.join('').length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {getTranslation('verify', language)}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                {language === 'hi' ? 'OTP दोबारा भेजें' : 
                 language === 'gu' ? 'OTP ફરી મોકલો' : 
                 'Resend OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;