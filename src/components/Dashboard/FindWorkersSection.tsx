import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Phone, Mail, User, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../utils/translations';

const FindWorkersSection: React.FC = () => {
  const { language, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    expertise: '',
    skillLevel: '',
    location: '',
    availability: '',
    accommodationNeeded: ''
  });

  // Mock worker data
  const workers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      expertise: ['harvesting', 'planting', 'general'],
      skillLevel: 'experienced',
      location: 'Ahmedabad, Gujarat',
      rating: 4.8,
      completedJobs: 45,
      availability: 'full-time',
      accommodationNeeded: false,
      requiredSalary: '₹600/day',
      contactNumber: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      requestStatus: null
    },
    {
      id: '2',
      name: 'Priya Patel',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      expertise: ['water', 'machinery', 'driver'],
      skillLevel: 'expert',
      location: 'Surat, Gujarat',
      rating: 4.9,
      completedJobs: 67,
      availability: 'part-time',
      accommodationNeeded: true,
      requiredSalary: '₹800/day',
      contactNumber: '+91 87654 32109',
      email: 'priya.patel@email.com',
      requestStatus: 'pending'
    },
    {
      id: '3',
      name: 'Amit Singh',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      expertise: ['mechanic', 'machinery', 'general'],
      skillLevel: 'intermediate',
      location: 'Vadodara, Gujarat',
      rating: 4.6,
      completedJobs: 32,
      availability: 'seasonal',
      accommodationNeeded: false,
      requiredSalary: '₹500/day',
      contactNumber: '+91 76543 21098',
      email: 'amit.singh@email.com',
      requestStatus: 'accepted'
    }
  ];

  const expertiseOptions = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'driver', label: { en: 'Driver', hi: 'ड्राइवर', gu: 'ડ્રાઇવર' } },
    { value: 'mechanic', label: { en: 'Mechanic', hi: 'मैकेनिक', gu: 'મિકેનિક' } }
  ];

  const handleSendRequest = (workerId: string) => {
    // Handle sending request to worker
    console.log('Sending request to worker:', workerId);
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = !filters.expertise || worker.expertise.includes(filters.expertise);
    const matchesSkillLevel = !filters.skillLevel || worker.skillLevel === filters.skillLevel;
    const matchesLocation = !filters.location || worker.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesAvailability = !filters.availability || worker.availability === filters.availability;
    const matchesAccommodation = !filters.accommodationNeeded || 
                                worker.accommodationNeeded.toString() === filters.accommodationNeeded;

    return matchesSearch && matchesExpertise && matchesSkillLevel && 
           matchesLocation && matchesAvailability && matchesAccommodation;
  });

  const getRequestStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getRequestStatusIcon = (status: string | null) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'accepted': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Send size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <User className="mr-3 text-green-600" size={28} />
          {getTranslation('findWorkers', language)}
        </h2>
        <p className="text-gray-600">
          {language === 'hi' ? 'अपने खेत के लिए कुशल मजदूर खोजें' : 
           language === 'gu' ? 'તમારા ખેત માટે કુશળ કામદારો શોધો' : 
           'Find skilled workers for your farm'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'hi' ? 'नाम या स्थान खोजें' : 
                          language === 'gu' ? 'નામ અથવા સ્થાન શોધો' : 
                          'Search by name or location'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Expertise Filter */}
          <select
            value={filters.expertise}
            onChange={(e) => setFilters({...filters, expertise: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Expertise</option>
            {expertiseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language as keyof typeof option.label]}
              </option>
            ))}
          </select>

          {/* Skill Level Filter */}
          <select
            value={filters.skillLevel}
            onChange={(e) => setFilters({...filters, skillLevel: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Skill Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="experienced">Experienced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Filter */}
          <input
            type="text"
            placeholder="Filter by location"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />

          {/* Availability Filter */}
          <select
            value={filters.availability}
            onChange={(e) => setFilters({...filters, availability: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Availability</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="seasonal">Seasonal</option>
            <option value="flexible">Flexible</option>
          </select>

          {/* Accommodation Filter */}
          <select
            value={filters.accommodationNeeded}
            onChange={(e) => setFilters({...filters, accommodationNeeded: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Accommodation Preference</option>
            <option value="true">Needs Accommodation</option>
            <option value="false">No Accommodation Needed</option>
          </select>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            {/* Profile Header */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center space-x-4">
                <img
                  src={worker.profilePicture}
                  alt={worker.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{worker.location}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="text-yellow-500 mr-1" size={16} />
                    <span className="text-sm font-semibold">{worker.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">({worker.completedJobs} jobs)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Details */}
            <div className="p-6">
              {/* Expertise */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {worker.expertise.map((skill) => {
                    const skillOption = expertiseOptions.find(opt => opt.value === skill);
                    return (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {skillOption?.label[language as keyof typeof skillOption.label] || skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Skill Level:</span>
                  <p className="font-semibold capitalize">{worker.skillLevel}</p>
                </div>
                <div>
                  <span className="text-gray-600">Availability:</span>
                  <p className="font-semibold capitalize">{worker.availability}</p>
                </div>
                <div>
                  <span className="text-gray-600">Required Salary:</span>
                  <p className="font-semibold">{worker.requiredSalary}</p>
                </div>
                <div>
                  <span className="text-gray-600">Accommodation:</span>
                  <p className="font-semibold">{worker.accommodationNeeded ? 'Needed' : 'Not Needed'}</p>
                </div>
              </div>

              {/* Contact Information (only if request accepted) */}
              {worker.requestStatus === 'accepted' && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="text-sm font-semibold text-green-800 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-700">
                      <Phone size={16} className="mr-2" />
                      <span>{worker.contactNumber}</span>
                    </div>
                    <div className="flex items-center text-green-700">
                      <Mail size={16} className="mr-2" />
                      <span>{worker.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => handleSendRequest(worker.id)}
                disabled={worker.requestStatus === 'pending'}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  worker.requestStatus === 'accepted'
                    ? 'bg-green-100 text-green-800 cursor-default'
                    : worker.requestStatus === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
                    : worker.requestStatus === 'rejected'
                    ? 'bg-red-100 text-red-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-lg'
                }`}
              >
                <span className={`px-2 py-1 rounded-full ${getRequestStatusColor(worker.requestStatus)}`}>
                  {getRequestStatusIcon(worker.requestStatus)}
                </span>
                <span>
                  {worker.requestStatus === 'accepted' ? 'Request Accepted' :
                   worker.requestStatus === 'pending' ? 'Request Pending' :
                   worker.requestStatus === 'rejected' ? 'Request Rejected' :
                   'Send Request'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Workers Found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default FindWorkersSection;