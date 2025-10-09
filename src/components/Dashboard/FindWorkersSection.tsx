import React, { useState } from 'react';
import { Search, MapPin, Star, Send, Filter, User, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/translations';

interface Worker {
  id: string;
  name: string;
  profilePicture: string;
  city: string;
  state: string;
  jobExpertise: string[];
  skillLevel: string;
  workCapacity: string;
  timeAvailability: string;
  requiredSalary: string;
  rating: number;
  completedJobs: number;
  verified: boolean;
}

const FindWorkersSection: React.FC = () => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [requestSent, setRequestSent] = useState<string[]>([]);

  // Mock worker data
  const workers: Worker[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      city: 'Pune',
      state: 'Maharashtra',
      jobExpertise: ['harvesting', 'planting', 'general'],
      skillLevel: 'experienced',
      workCapacity: 'heavy',
      timeAvailability: 'full-time',
      requiredSalary: '₹600/day',
      rating: 4.8,
      completedJobs: 45,
      verified: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      city: 'Jaipur',
      state: 'Rajasthan',
      jobExpertise: ['water', 'machinery'],
      skillLevel: 'expert',
      workCapacity: 'moderate',
      timeAvailability: 'part-time',
      requiredSalary: '₹800/day',
      rating: 4.9,
      completedJobs: 62,
      verified: true
    },
    {
      id: '3',
      name: 'Amit Patel',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      city: 'Ahmedabad',
      state: 'Gujarat',
      jobExpertise: ['driver', 'mechanic'],
      skillLevel: 'intermediate',
      workCapacity: 'light',
      timeAvailability: 'flexible',
      requiredSalary: '₹500/day',
      rating: 4.6,
      completedJobs: 28,
      verified: false
    }
  ];

  const jobExpertiseOptions = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'driver', label: { en: 'Driver', hi: 'ड्राइवर', gu: 'ડ્રાઇવર' } },
    { value: 'mechanic', label: { en: 'Mechanic', hi: 'मैकेनिक', gu: 'મિકેનિક' } }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !selectedExpertise || worker.jobExpertise.includes(selectedExpertise);
    const matchesLocation = !selectedLocation || worker.city.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSkill = !selectedSkillLevel || worker.skillLevel === selectedSkillLevel;
    
    return matchesSearch && matchesExpertise && matchesLocation && matchesSkill;
  });

  const handleSendRequest = (workerId: string) => {
    setRequestSent(prev => [...prev, workerId]);
  };

  const getExpertiseLabel = (expertise: string) => {
    const option = jobExpertiseOptions.find(opt => opt.value === expertise);
    return option ? option.label[language as keyof typeof option.label] : expertise;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="mr-3 text-green-600" size={28} />
          {getTranslation('findWorkers', language)}
        </h2>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={language === 'hi' ? 'नाम या स्थान खोजें' : language === 'gu' ? 'નામ અથવા સ્થાન શોધો' : 'Search by name or location'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>


          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            onClick={() => setShowFilters(!showFilters)}
            <Filter size={18} className="mr-2" />
            {language === 'hi' ? 'फ़िल्टर' : language === 'gu' ? 'ફિલ્ટર' : 'Filter'}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">{language === 'hi' ? 'सभी विशेषज्ञता' : language === 'gu' ? 'બધી નિપુણતા' : 'All Expertise'}</option>
                {jobExpertiseOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label[language as keyof typeof option.label]}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder={language === 'hi' ? 'स्थान' : language === 'gu' ? 'સ્થાન' : 'Location'}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />

              <select
                value={selectedSkillLevel}
                onChange={(e) => setSelectedSkillLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">{language === 'hi' ? 'सभी स्तर' : language === 'gu' ? 'બધા સ્તર' : 'All Levels'}</option>
                <option value="beginner">{language === 'hi' ? 'शुरुआती' : language === 'gu' ? 'શરૂઆતી' : 'Beginner'}</option>
                <option value="intermediate">{language === 'hi' ? 'मध्यम' : language === 'gu' ? 'મધ્યમ' : 'Intermediate'}</option>
                <option value="experienced">{language === 'hi' ? 'अनुभवी' : language === 'gu' ? 'અનુભવી' : 'Experienced'}</option>
                <option value="expert">{language === 'hi' ? 'विशेषज्ञ' : language === 'gu' ? 'નિષ્ણાત' : 'Expert'}</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                {language === 'hi' ? 'लागू करें' : language === 'gu' ? 'લાગુ કરો' : 'Apply'}
              </button>
              <button 
                onClick={() => {
                  setSelectedExpertise('');
                  setSelectedLocation('');
                  setSelectedSkillLevel('');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {language === 'hi' ? 'हटाएं' : language === 'gu' ? 'હટાવો' : 'Remove'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(worker => (
          <div key={worker.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <img
                src={worker.profilePicture}
                alt={worker.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-green-100"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  {worker.name}
                  {worker.verified && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ {language === 'hi' ? 'सत्यापित' : language === 'gu' ? 'ચકાસાયેલ' : 'Verified'}
                    </span>
                  )}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  {worker.city}, {worker.state}
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'hi' ? 'विशेषज्ञता:' : language === 'gu' ? 'નિપુણતા:' : 'Expertise:'}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {worker.jobExpertise.slice(0, 3).map(expertise => (
                    <span key={expertise} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {getExpertiseLabel(expertise)}
                    </span>
                  ))}
                  {worker.jobExpertise.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      +{worker.jobExpertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">
                    {language === 'hi' ? 'स्तर:' : language === 'gu' ? 'સ્તર:' : 'Level:'}
                  </span>
                  <p className="font-medium capitalize">{worker.skillLevel}</p>
                </div>
                <div>
                  <span className="text-gray-600">
                    {language === 'hi' ? 'उपलब्धता:' : language === 'gu' ? 'ઉપલબ્ધતા:' : 'Availability:'}
                  </span>
                  <p className="font-medium capitalize">{worker.timeAvailability}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="ml-1 text-sm font-medium">{worker.rating}</span>
                  <span className="ml-2 text-xs text-gray-600">
                    ({worker.completedJobs} {language === 'hi' ? 'कार्य' : language === 'gu' ? 'કામ' : 'jobs'})
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{worker.requiredSalary}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              {requestSent.includes(worker.id) ? (
                <div className="text-center py-2">
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
                    {language === 'hi' ? 'अनुरोध भेजा गया' : language === 'gu' ? 'વિનંતી મોકલી' : 'Request Sent'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleSendRequest(worker.id)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  {language === 'hi' ? 'अनुरोध भेजें' : language === 'gu' ? 'વિનંતી મોકલો' : 'Send Request'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {language === 'hi' ? 'कोई मजदूर नहीं मिला' : language === 'gu' ? 'કોઈ કામદાર મળ્યો નથી' : 'No workers found'}
          </h3>
          <p className="text-gray-500">
            {language === 'hi' ? 'अपने खोज मापदंड बदलने का प्रयास करें' : 
             language === 'gu' ? 'તમારા શોધ માપદંડો બદલવાનો પ્રયાસ કરો' : 
             'Try adjusting your search criteria'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FindWorkersSection;