import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Language } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  currentStep: 'landing' | 'auth' | 'otp' | 'dashboard';
  setCurrentStep: (step: 'landing' | 'auth' | 'otp' | 'dashboard') => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  userType: 'farmer' | 'worker';
  setUserType: (type: 'farmer' | 'worker') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<'landing' | 'auth' | 'otp' | 'dashboard'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'farmer' | 'worker'>('farmer');

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        language,
        setLanguage,
        currentStep,
        setCurrentStep,
        authMode,
        setAuthMode,
        userType,
        setUserType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};