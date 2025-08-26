import React from 'react';
import { User, Users, Wrench, BookOpen, LogOut, Briefcase, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const { user, language, setUser, setCurrentStep } = useApp();

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('landing');
  };

  const farmerMenuItems = [
    { id: 'dashboard', icon: User, label: getTranslation('dashboard', language) },
    { id: 'profile', icon: User, label: getTranslation('profile', language) },
    { id: 'find-workers', icon: Users, label: getTranslation('findWorkers', language) },
    { id: 'lease-equipment', icon: Wrench, label: getTranslation('leaseEquipment', language) },
    { id: 'news', icon: BookOpen, label: getTranslation('news', language) },
  ];

  const workerMenuItems = [
    { id: 'dashboard', icon: User, label: getTranslation('dashboard', language) },
    { id: 'profile', icon: User, label: getTranslation('profile', language) },
    { id: 'find-work', icon: Briefcase, label: getTranslation('findWork', language) },
    { id: 'news', icon: BookOpen, label: getTranslation('news', language) },
  ];

  const menuItems = user?.userType === 'farmer' ? farmerMenuItems : workerMenuItems;

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            user?.userType === 'farmer' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {user?.userType === 'farmer' ? (
              <User className="w-5 h-5 text-green-600" />
            ) : (
              <Users className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{user?.userType}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeSection === item.id
                    ? `${user?.userType === 'farmer' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">{getTranslation('logout', language)}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;