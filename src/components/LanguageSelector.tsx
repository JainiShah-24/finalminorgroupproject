import React from 'react';
import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useApp();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg hover:bg-white transition-colors">
          <Globe size={16} />
          <span className="text-sm font-medium">
            {languages.find(l => l.code === language)?.flag}
          </span>
        </button>
        
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-green-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code ? 'bg-green-100 text-green-800' : 'text-gray-700'
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;