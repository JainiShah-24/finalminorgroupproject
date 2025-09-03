import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from '../Sidebar';
import HomeSection from './HomeSection';
import ProfileSection from './ProfileSection';
import FindWorkersSection from './FindWorkersSection';
import FindWorkSection from './FindWorkSection';
import LeaseAssetsSection from './LeaseAssetsSection';
import NewsSection from './NewsSection';
import JobListingsSection from './JobListingsSection';
import NotificationsSection from './NotificationsSection';

const Dashboard: React.FC = () => {
  const { user } = useApp();
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'profile':
        return <ProfileSection />;
      case 'find-workers':
        return <FindWorkersSection />;
      case 'job-listings':
        return <JobListingsSection />;
      case 'find-work':
        return <FindWorkSection />;
      case 'lease-assets':
        return <LeaseAssetsSection />;
      case 'news':
        return <NewsSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1')`
      }}
    >
      <div className="flex h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;