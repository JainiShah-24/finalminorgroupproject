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
    { id: 'notifications', icon: Bell, label: getTranslation('notifications', language) },
  ];

  const workerMenuItems = [
    { id: 'home', icon: Home, label: getTranslation('home', language) },
    { id: 'profile', icon: User, label: getTranslation('profile', language) },
    { id: 'find-work', icon: Briefcase, label: getTranslation('findWork', language) },
    { id: 'news', icon: BookOpen, label: getTranslation('news', language) },
    { id: 'notifications', icon: Bell, label: getTranslation('notifications', language) },
  ];

  const menuItems = user?.userType === 'farmer' ? farmerMenuItems : workerMenuItems;

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-xl h-full flex flex-col transition-all duration-300 relative border-r-2 border-green-100`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border-2 border-green-200 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all z-10 hover:scale-110"
      >
        {isCollapsed ? <Menu size={16} className="text-green-600" /> : <X size={16} className="text-green-600" />}
      </button>

      {/* Header */}
      <div className="p-6 border-b-2 border-green-100 bg-gradient-to-r from-green-50 to-green-100">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${
            user?.userType === 'farmer' ? 'bg-green-100 border-green-300' : 'bg-blue-100 border-blue-300'
          }`}>
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className={`w-6 h-6 ${user?.userType === 'farmer' ? 'text-green-600' : 'text-blue-600'}`} />
            )}
          </div>
          {!isCollapsed && (
            <div>
              <h3 className="font-bold text-gray-800 truncate text-shadow-sm">{user?.name}</h3>
              <p className="text-sm text-gray-600 capitalize font-medium bg-white/50 px-2 py-1 rounded border">{user?.userType}</p>
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
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all text-left group relative font-medium border-2 ${
                  activeSection === item.id
                    ? `${user?.userType === 'farmer' ? 'bg-green-100 text-green-700 border-green-300 shadow-md' : 'bg-blue-100 text-blue-700 border-blue-300 shadow-md'}`
                    : 'text-gray-700 hover:bg-gray-100 border-transparent hover:border-gray-200 hover:shadow-sm'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="font-semibold">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg border border-gray-600">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Language Selector */}
      <div className="p-4 border-t-2 border-green-100 bg-gradient-to-r from-green-50 to-green-100">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 text-gray-700 hover:bg-white/70 rounded-lg transition-all group border-2 border-transparent hover:border-green-200 font-medium`}
            title={isCollapsed ? getTranslation('language', language) : undefined}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <Globe size={20} className="text-green-600" />
              {!isCollapsed && (
                <span className="font-semibold text-gray-800">{getTranslation('language', language)}</span>
              )}
            </div>
            {!isCollapsed && <ChevronDown size={16} className="text-green-600" />}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg border border-gray-600">
                {getTranslation('language', language)}
              </div>
            )}
          </button>
          
          {showLanguageDropdown && (
            <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'bottom-full mb-2'} bg-white rounded-lg shadow-xl border-2 border-green-200 min-w-[160px] z-30 overflow-hidden`}>
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

      {/* Logout */}
      <div className="p-4 border-t-2 border-red-100 bg-gradient-to-r from-red-50 to-red-100">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 text-red-600 hover:bg-red-100 rounded-lg transition-all group relative font-semibold border-2 border-transparent hover:border-red-200 hover:shadow-sm`}
          title={isCollapsed ? getTranslation('logout', language) : undefined}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-semibold">{getTranslation('logout', language)}</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-lg border border-gray-600">
              {getTranslation('logout', language)}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;