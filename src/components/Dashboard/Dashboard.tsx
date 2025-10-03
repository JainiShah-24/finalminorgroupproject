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
    <div className="min-h-screen bg-gray-50">
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