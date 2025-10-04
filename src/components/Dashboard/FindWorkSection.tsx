import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Search, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FindWorkSection: React.FC = () => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const mockJobs = [
    {
      id: '1',
      title: 'Skilled Worker Requirement - Wheat Harvesting',
      farmerName: 'Rajesh Kumar',
      location: 'Punjab, India',
      state: 'Punjab',
      district: 'Ludhiana',
      workType: 'Harvesting',
      jobTypes: ['harvesting'],
      landArea: '10 acres',
      duration: '2 weeks',
      payRate: '₹500/day',
      paymentType: 'daily',
      workersNeeded: 5,
      urgencyLevel: 'high',
      skillLevel: 'experienced',
      physicalDemands: 'heavy',
      workingHours: '8-hours',
      accommodationType: 'shared-room',
      transportationProvided: true,
      additionalBenefits: ['housing', 'food'],
      description: 'Need experienced workers for wheat harvesting. Provide accommodation and meals.',
      requirements: ['Experience in harvesting', 'Own transportation preferred'],
      status: 'open',
      createdAt: new Date('2025-01-15'),
      applicationStatus: null // null, 'pending', 'accepted', 'rejected'
    },
    {
      id: '2',
      title: 'Worker Requirement - Vegetable Farm Maintenance',
      farmerName: 'Priya Patel',
      location: 'Gujarat, India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      workType: 'General Farm Work',
      jobTypes: ['general', 'crop-care'],
      landArea: '5 acres',
      duration: '1 month',
      payRate: '₹400/day',
      paymentType: 'daily',
      workersNeeded: 3,
      urgencyLevel: 'medium',
      skillLevel: 'intermediate',
      physicalDemands: 'moderate',
      workingHours: '6-hours',
      accommodationType: 'not-provided',
      transportationProvided: false,
      additionalBenefits: ['food'],
      description: 'Regular farm maintenance work including weeding, watering, and plant care.',
      requirements: ['Basic farming knowledge', 'Physical fitness'],
      status: 'open',
      createdAt: new Date('2025-01-14'),
      applicationStatus: 'pending'
    },
    {
      id: '3',
      title: 'Skilled Worker Requirement - Tomato Planting',
      farmerName: 'Suresh Singh',
      location: 'Maharashtra, India',
      state: 'Maharashtra',
      district: 'Pune',
      workType: 'Planting',
      jobTypes: ['planting'],
      landArea: '8 acres',
      duration: '1 week',
      payRate: '₹450/day',
      paymentType: 'daily',
      workersNeeded: 8,
      urgencyLevel: 'medium',
      skillLevel: 'beginner',
      physicalDemands: 'moderate',
      workingHours: '8-hours',
      accommodationType: 'private-room',
      transportationProvided: true,
      additionalBenefits: ['housing', 'transport'],
      description: 'Seasonal tomato planting work. Training will be provided for new workers.',
      requirements: ['Willingness to learn', 'Team work'],
      status: 'open',
      createdAt: new Date('2025-01-13'),
      applicationStatus: 'accepted'
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
    setAppliedJobs(prev => [...prev, jobId]);
    // Here you would implement the application logic
    console.log('Applied to job:', jobId);
  };

  const getJobTypeLabel = (type: string) => {
    const labels: any = {
      harvesting: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' },
      planting: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' },
      general: { en: 'General Work', hi: 'सामान्य काम', gu: 'સામાન્ય કામ' },
      'crop-care': { en: 'Crop Care', hi: 'फसल देखभाल', gu: 'પાક સંભાળ' }
    };
    return labels[type]?.[language] || type;
  };

  const getBenefitLabel = (benefit: string) => {
    const labels: any = {
      housing: { en: 'Housing', hi: 'आवास', gu: 'આવાસ' },
      food: { en: 'Food', hi: 'भोजन', gu: 'ભોજન' },
      health: { en: 'Health', hi: 'स्वास्थ्य', gu: 'આરોગ્ય' },
      transport: { en: 'Transport', hi: 'परिवहन', gu: 'પરિવહન' }
    };
    return labels[benefit]?.[language] || benefit;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getApplicationStatusIcon = (status: string | null) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getApplicationStatusLabel = (status: string | null) => {
    const labels: any = {
      pending: { en: 'Pending', hi: 'लंबित', gu: 'બાકી' },
      accepted: { en: 'Accepted', hi: 'स्वीकृत', gu: 'સ્વીકૃત' },
      rejected: { en: 'Rejected', hi: 'अस्वीकृत', gu: 'નકારવામાં આવ્યું' }
    };
    return status ? labels[status]?.[language] || status : null;
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
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgencyLevel)}`}>
                    {job.urgencyLevel.charAt(0).toUpperCase() + job.urgencyLevel.slice(1)} Priority
                  </span>
                  {job.applicationStatus && (
                    <div className="flex items-center space-x-1">
                      {getApplicationStatusIcon(job.applicationStatus)}
                      <span className="text-sm font-medium">
                        {getApplicationStatusLabel(job.applicationStatus)}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">
                  {language === 'hi' ? 'किसान:' : language === 'gu' ? 'ખેડૂત:' : 'Farmer:'} {job.farmerName}
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {job.district}, {job.state}
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

                {/* Job Details */}
                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'भूमि क्षेत्र:' : language === 'gu' ? 'જમીનનો વિસ્તાર:' : 'Land Area:'}
                    </span>
                    <span className="ml-2 text-gray-600">{job.landArea}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'कौशल स्तर:' : language === 'gu' ? 'કૌશલ્ય સ્તર:' : 'Skill Level:'}
                    </span>
                    <span className="ml-2 text-gray-600 capitalize">{job.skillLevel}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'कार्य घंटे:' : language === 'gu' ? 'કામના કલાકો:' : 'Working Hours:'}
                    </span>
                    <span className="ml-2 text-gray-600">{job.workingHours.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {language === 'hi' ? 'आवास:' : language === 'gu' ? 'આવાસ:' : 'Accommodation:'}
                    </span>
                    <span className="ml-2 text-gray-600 capitalize">
                      {job.accommodationType.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.jobTypes.map((type, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {getJobTypeLabel(type)}
                      </span>
                    ))}
                  </div>

                  {job.additionalBenefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs text-gray-600 mr-2">
                        {language === 'hi' ? 'लाभ:' : language === 'gu' ? 'ફાયદા:' : 'Benefits:'}
                      </span>
                      {job.additionalBenefits.map((benefit, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {getBenefitLabel(benefit)}
                        </span>
                      ))}
                      {job.transportationProvided && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {language === 'hi' ? 'परिवहन' : language === 'gu' ? 'પરિવહન' : 'Transportation'}
                        </span>
                      )}
                    </div>
                  )}

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
                    {language === 'hi' ? 'पोस्ट किया:' : language === 'gu' ? 'પોસ્ટ કર્યું:' : 'Posted:'} {job.createdAt.toLocaleDateString()}
                  </span>
                  
                  <div className="flex space-x-3">
                    {job.applicationStatus === 'accepted' && (
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Eye size={16} />
                        <span>
                          {language === 'hi' ? 'संपर्क देखें' : language === 'gu' ? 'સંપર્ક જુઓ' : 'View Contact'}
                        </span>
                      </button>
                    )}
                    
                    {!job.applicationStatus && !appliedJobs.includes(job.id) ? (
                      <button 
                        onClick={() => handleApply(job.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        {language === 'hi' ? 'आवेदन करें' : language === 'gu' ? 'અરજી કરો' : 'Apply Now'}
                      </button>
                    ) : appliedJobs.includes(job.id) ? (
                      <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
                        {language === 'hi' ? 'आवेदन भेजा गया' : language === 'gu' ? 'અરજી મોકલી' : 'Application Sent'}
                      </span>
                    ) : (
                      <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        job.applicationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        job.applicationStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getApplicationStatusLabel(job.applicationStatus)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
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