import React, { useState } from 'react';
import { 
  Home, User, Users, Wrench, BookOpen, LogOut, Briefcase, 
  Menu, X, Globe, ChevronDown, List
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
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    { id: 'home', icon: Home, label: getTranslation('home', language) },
    { id: 'profile', icon: User, label: getTranslation('profile', language) },
    { id: 'find-workers', icon: Users, label: getTranslation('findWorkers', language) },
    { id: 'job-listings', icon: List, label: getTranslation('jobListings', language) },
    { id: 'lease-assets', icon: Wrench, label: getTranslation('leaseAssets', language) },
    { id: 'news', icon: BookOpen, label: getTranslation('news', language) },
  ];

  const workerMenuItems = [
    { id: 'home', icon: Home, label: getTranslation('home', language) },
    { id: 'profile', icon: User, label: getTranslation('profile', language) },
    { id: 'find-work', icon: Briefcase, label: getTranslation('findWork', language) },
    { id: 'news', icon: BookOpen, label: getTranslation('news', language) },
  ];

  const menuItems = user?.userType === 'farmer' ? farmerMenuItems : workerMenuItems;

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg h-full flex flex-col transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow z-10"
      >
        {isCollapsed ? <Menu size={16} /> : <X size={16} />}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            user?.userType === 'farmer' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {user?.userType === 'farmer' ? (
              <User className="w-5 h-5 text-green-600" />
            ) : (
              <Users className="w-5 h-5 text-blue-600" />
            )}
          </div>
          {!isCollapsed && (
            <div>
              <h3 className="font-semibold text-gray-800 truncate">{user?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user?.userType}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors text-left group relative ${
                  activeSection === item.id
                    ? `${user?.userType === 'farmer' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {item.label}
                  </div>
                )}
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
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group`}
            title={isCollapsed ? getTranslation('language', language) : undefined}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <Globe size={20} />
              {!isCollapsed && (
                <span className="font-medium">{getTranslation('language', language)}</span>
              )}
            </div>
            {!isCollapsed && <ChevronDown size={16} />}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {getTranslation('language', language)}
              </div>
            )}
          </button>
          
          {showLanguageDropdown && (
            <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'bottom-full mb-2'} bg-white rounded-lg shadow-lg border border-gray-200 min-w-[140px] z-30`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-green-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    language === lang.code ? 'bg-green-100 text-green-800' : 'text-gray-700'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group relative`}
          title={isCollapsed ? getTranslation('logout', language) : undefined}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">{getTranslation('logout', language)}</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              {getTranslation('logout', language)}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;