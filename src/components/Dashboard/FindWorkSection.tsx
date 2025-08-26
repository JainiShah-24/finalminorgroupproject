import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FindWorkSection: React.FC = () => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');

  const mockJobs = [
    {
      id: '1',
      title: 'Wheat Harvesting Work',
      farmerName: 'Rajesh Kumar',
      location: 'Punjab, India',
      workType: 'Harvesting',
      duration: '2 weeks',
      payRate: '₹500/day',
      workersNeeded: 5,
      description: 'Need experienced workers for wheat harvesting. Provide accommodation and meals.',
      requirements: ['Experience in harvesting', 'Own transportation preferred'],
      status: 'open'
    },
    {
      id: '2',
      title: 'Vegetable Farm Maintenance',
      farmerName: 'Priya Patel',
      location: 'Gujarat, India',
      workType: 'General Farm Work',
      duration: '1 month',
      payRate: '₹400/day',
      workersNeeded: 3,
      description: 'Regular farm maintenance work including weeding, watering, and plant care.',
      requirements: ['Basic farming knowledge', 'Physical fitness'],
      status: 'open'
    },
    {
      id: '3',
      title: 'Tomato Planting',
      farmerName: 'Suresh Singh',
      location: 'Maharashtra, India',
      workType: 'Planting',
      duration: '1 week',
      payRate: '₹450/day',
      workersNeeded: 8,
      description: 'Seasonal tomato planting work. Training will be provided for new workers.',
      requirements: ['Willingness to learn', 'Team work'],
      status: 'open'
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesWorkType = !workTypeFilter || job.workType === workTypeFilter;
    
    return matchesSearch && matchesLocation && matchesWorkType;
  });

  const handleApply = (jobId: string) => {
    // Here you would typically handle job application
    alert(language === 'hi' ? 'आवेदन भेजा गया!' : language === 'gu' ? 'અરજી મોકલી!' : 'Application sent!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'काम खोजें' : 
           language === 'gu' ? 'કામ શોધો' : 
           'Find Work'}
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'hi' ? 'नौकरी या किसान खोजें' : language === 'gu' ? 'નોકરી અથવા ખેડૂત શોધો' : 'Search job or farmer'}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {language === 'hi' ? 'सभी स्थान' : language === 'gu' ? 'બધા સ્થાનો' : 'All Locations'}
              </option>
              <option value="punjab">Punjab</option>
              <option value="gujarat">Gujarat</option>
              <option value="maharashtra">Maharashtra</option>
            </select>
          </div>

          <div>
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                {language === 'hi' ? 'सभी प्रकार का काम' : language === 'gu' ? 'બધા પ્રકારનું કામ' : 'All Work Types'}
              </option>
              <option value="Harvesting">
                {language === 'hi' ? 'कटाई' : language === 'gu' ? 'લણણી' : 'Harvesting'}
              </option>
              <option value="Planting">
                {language === 'hi' ? 'बुआई' : language === 'gu' ? 'વાવેતર' : 'Planting'}
              </option>
              <option value="General Farm Work">
                {language === 'hi' ? 'सामान्य खेती का काम' : language === 'gu' ? 'સામાન્ય ખેતીનું કામ' : 'General Farm Work'}
              </option>
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            {language === 'hi' ? 'खोजें' : language === 'gu' ? 'શોધો' : 'Search'}
          </button>
        </div>
      </div>

      {/* Available Jobs */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-3">
                  {language === 'hi' ? 'किसान:' : language === 'gu' ? 'ખેડૂત:' : 'Farmer:'} {job.farmerName}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {job.duration}
                  </span>
                  <span className="flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    {job.payRate}
                  </span>
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {job.workersNeeded} {language === 'hi' ? 'मजदूर चाहिए' : language === 'gu' ? 'કામદાર જોઈએ' : 'workers needed'}
                  </span>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.status === 'open' ? (language === 'hi' ? 'खुला' : language === 'gu' ? 'ખુલ્લું' : 'Open') : 'Closed'}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'hi' ? 'काम का विवरण:' : language === 'gu' ? 'કામનું વર્ણન:' : 'Job Description:'}
              </h4>
              <p className="text-gray-600 text-sm mb-3">{job.description}</p>
              
              {job.requirements.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {language === 'hi' ? 'आवश्यकताएं:' : language === 'gu' ? 'જરૂરિયાતો:' : 'Requirements:'}
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {language === 'hi' ? '2 घंटे पहले पोस्ट किया गया' : language === 'gu' ? '2 કલાક પહેલાં પોસ્ટ કર્યું' : 'Posted 2 hours ago'}
              </span>
              <button 
                onClick={() => handleApply(job.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {language === 'hi' ? 'आवेदन करें' : language === 'gu' ? 'અરજી કરો' : 'Apply Now'}
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Users size={48} className="mx-auto mb-2" />
              <p>{language === 'hi' ? 'कोई काम नहीं मिला' : language === 'gu' ? 'કોઈ કામ મળ્યું નથી' : 'No jobs found'}</p>
              <p className="text-sm">{language === 'hi' ? 'अलग फिल्टर आजमाएं' : language === 'gu' ? 'અલગ ફિલ્ટર અજમાવો' : 'Try different filters'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindWorkSection;