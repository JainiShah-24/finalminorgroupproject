import React, { useState } from 'react';
import { 
  Home, User, Users, Wrench, BookOpen, LogOut, Briefcase, 
  Menu, X, Globe, ChevronDown, List, Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';
import { Language } from '../types';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { user, language, setLanguage, setUser, setCurrentStep } = useApp();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('landing');
  };

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const farmerMenuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'find-workers', icon: Users, label: 'Find Workers' },
    { id: 'job-listings', icon: List, label: 'Job Listings' },
    { id: 'lease-assets', icon: Wrench, label: 'Lease Land & Equipment' },
    { id: 'news', icon: BookOpen, label: 'News & Education' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  const workerMenuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'find-work', icon: Briefcase, label: 'Find Work' },
    { id: 'news', icon: BookOpen, label: 'News & Education' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  const menuItems = user?.userType === 'farmer' ? farmerMenuItems : workerMenuItems;

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-green-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{user?.userType}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left font-medium ${
                  activeSection === item.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Language Selector */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all font-medium"
          >
            <div className="flex items-center space-x-3">
              <Globe size={20} className="text-green-600" />
              <span>Language</span>
            </div>
            <ChevronDown size={16} className="text-green-600" />
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[160px] z-30 overflow-hidden">
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
    </div>
  );
};

export default Sidebar;