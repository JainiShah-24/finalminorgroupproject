import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import OTPVerification from './components/OTPVerification';
import Dashboard from './components/Dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { currentStep } = useApp();

  switch (currentStep) {
    case 'landing':
      return <LandingPage />;
    case 'auth':
      return <AuthForm />;
    case 'otp':
      return <OTPVerification />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <LandingPage />;
  }
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;