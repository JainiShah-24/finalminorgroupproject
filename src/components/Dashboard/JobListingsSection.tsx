import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Eye, Edit, Trash2, CheckCircle, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const JobListingsSection: React.FC = () => {
  const { language } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobTypes: [] as string[],
    landArea: '',
    workersNeeded: '',
    customJobType: ''
  });

  const jobTypes = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } }
  ];

  const handleJobTypeChange = (type: string) => {
    setJobData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posted:', jobData);
    setShowJobForm(false);
    // Reset form
    setJobData({
      jobTitle: '',
      jobTypes: [],
      landArea: '',
      workersNeeded: '',
      customJobType: ''
    });
  };

  const mockJobs = [
    {
      id: '1',
      title: 'Wheat Harvesting Work',
      location: 'Punjab, India',
      state: 'Punjab',
      district: 'Ludhiana',
      jobTypes: ['harvesting'],
      landArea: '10',
      duration: 'one-time',
      paymentType: 'fixed',
      salaryAmount: '500',
      workersNeeded: 5,
      additionalBenefits: ['housing', 'food'],
      applicants: 12,
      status: 'open' as const,
      createdAt: new Date('2025-01-15'),
      description: 'Need experienced workers for wheat harvesting. Accommodation and meals provided.',
      farmerName: 'Rajesh Kumar',
      farmerPhone: '+91 98765 43210'
    },
    {
      id: '2',
      title: 'Vegetable Farm Maintenance',
      location: 'Gujarat, India',
      state: 'Gujarat',
      district: 'Ahmedabad',
      jobTypes: ['general', 'crop-care'],
      landArea: '5',
      duration: 'part-time',
      paymentType: 'hourly',
      salaryAmount: '50',
      workersNeeded: 3,
      additionalBenefits: ['food'],
      applicants: 8,
      status: 'open' as const,
      createdAt: new Date('2025-01-14'),
      description: 'Regular farm maintenance work including weeding, watering, and plant care.',
      farmerName: 'Priya Patel',
      farmerPhone: '+91 87654 32109'
    },
    {
      id: '3',
      title: 'Tomato Planting Project',
      location: 'Maharashtra, India',
      state: 'Maharashtra',
      district: 'Pune',
      jobTypes: ['planting'],
      landArea: '8',
      duration: 'one-time',
      paymentType: 'per-acre',
      salaryAmount: '2000',
      workersNeeded: 8,
      additionalBenefits: ['housing'],
      applicants: 15,
      status: 'in_progress' as const,
      createdAt: new Date('2025-01-13'),
      description: 'Seasonal tomato planting work. Training provided for new workers.',
      farmerName: 'Suresh Singh',
      farmerPhone: '+91 76543 21098'
    }
  ];

  const getJobTypeLabel = (type: string) => {
    const labels: any = {
      harvesting: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' },
      planting: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' },
      general: { en: 'General Work', hi: 'सामान्य काम', gu: 'સામાન્ય કામ' },
      'crop-care': { en: 'Crop Care', hi: 'फसल देखभाल', gu: 'પાક સંભાળ' }
    };
    return labels[type]?.[language] || type;
  };

  const getDurationLabel = (duration: string) => {
    const labels: any = {
      'one-time': { en: 'One-time', hi: 'एक बार', gu: 'એક વાર' },
      'part-time': { en: 'Part-time', hi: 'अंशकालिक', gu: 'અંશકાલિક' },
      'full-time': { en: 'Full-time', hi: 'पूर्णकालिक', gu: 'પૂર્ણકાલિક' }
    };
    return labels[duration]?.[language] || duration;
  };

  const getPaymentTypeLabel = (type: string) => {
    const labels: any = {
      fixed: { en: 'Fixed', hi: 'निश्चित', gu: 'નિશ્ચિત' },
      hourly: { en: 'Hourly', hi: 'घंटे के हिसाब', gu: 'કલાકના હિસાબે' },
      'per-acre': { en: 'Per Acre', hi: 'प्रति एकड़', gu: 'પ્રતિ એકર' }
    };
    return labels[type]?.[language] || type;
  };

  const getBenefitLabel = (benefit: string) => {
    const labels: any = {
      housing: { en: 'Housing', hi: 'आवास', gu: 'આવાસ' },
      food: { en: 'Food', hi: 'भोजन', gu: 'ભોજન' },
      health: { en: 'Health', hi: 'स्वास्थ्य', gu: 'આરોગ્ય' }
    };
    return labels[benefit]?.[language] || benefit;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: any = {
      open: { en: 'Open', hi: 'खुला', gu: 'ખુલ્લું' },
      in_progress: { en: 'In Progress', hi: 'प्रगति में', gu: 'પ્રગતિમાં' },
      closed: { en: 'Closed', hi: 'बंद', gu: 'બંધ' }
    };
    return labels[status]?.[language] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'नौकरी सूची' : 
           language === 'gu' ? 'નોકરી યાદી' : 
           'Job Listings'}
        </h2>
        <button
          onClick={() => setShowJobForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-md"
        >
          <Plus size={18} />
          <span>
            {language === 'hi' ? 'नई नौकरी पोस्ट करें' : 
             language === 'gu' ? 'નવી નોકરી પોસ્ટ કરો' : 
             'Create New Job'}
          </span>
        </button>
      </div>

      {/* Enhanced Job Posting Form */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  {language === 'hi' ? 'नई नौकरी पोस्ट करें' : 
                   language === 'gu' ? 'નવી નોકરી પોસ્ટ કરો' : 
                   'Create New Job'}
                </h3>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Job Types - Multi-select */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'काम के प्रकार (एक से अधिक चुन सकते हैं)' : 
                   language === 'gu' ? 'કામના પ્રકાર (એક કરતાં વધુ પસંદ કરી શકો છો)' : 
                   'Job Types (Select multiple if needed)'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {jobTypes.map((type) => (
                    <label key={type.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={jobData.jobTypes.includes(type.value)}
                        onChange={() => handleJobTypeChange(type.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{type.label[language as keyof typeof type.label]}</span>
                    </label>
                  ))}
                </div>
                
                {/* Custom Job Type */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'अन्य (यदि ऊपर उल्लिखित नहीं है)' : 
                     language === 'gu' ? 'અન્ય (જો ઉપર ઉલ્લેખિત નથી)' : 
                     'Others (if not mentioned above)'}
                  </label>
                  <input
                    type="text"
                    value={jobData.customJobType}
                    onChange={(e) => setJobData({...jobData, customJobType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'hi' ? 'कस्टम जॉब टाइप दर्ज करें' : 
                               language === 'gu' ? 'કસ્ટમ જોબ પ્રકાર દાખલ કરો' : 
                               'Enter custom job type'}
                  />
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'hi' ? 'नौकरी का शीर्षक' : language === 'gu' ? 'નોકરીનું શીર્ષક' : 'Job Title'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={jobData.jobTitle}
                  onChange={(e) => setJobData({...jobData, jobTitle: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={language === 'hi' ? 'जैसे: कुशल मजदूर की आवश्यकता' : 
                             language === 'gu' ? 'જેવા કે: કુશળ કામદારની જરૂર' : 
                             'e.g: Skilled Worker Requirement'}
                  required
                />
              </div>

              {/* Land Area and Workers Needed */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'भूमि क्षेत्र (एकड़)' : language === 'gu' ? 'જમીનનો વિસ્તાર (એકર)' : 'Land Area (Acres)'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={jobData.landArea}
                    onChange={(e) => setJobData({...jobData, landArea: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="5.0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'कितने मजदूर चाहिए' : language === 'gu' ? 'કેટલા કામદાર જોઈએ' : 'How Many Workers Needed'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={jobData.workersNeeded}
                    onChange={(e) => setJobData({...jobData, workersNeeded: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="5"
                    required
                  />
                </div>
              </div>

              {/* Rest of the form fields... */}
              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md"
                >
                  {language === 'hi' ? 'नौकरी पोस्ट करें' : language === 'gu' ? 'નોકરી પોસ્ટ કરો' : 'Post Job'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {language === 'hi' ? 'रद्द करें' : language === 'gu' ? 'રદ કરો' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {mockJobs.filter(job => job.status === 'open').length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'hi' ? 'खुली नौकरियां' : language === 'gu' ? 'ખુલ્લી નોકરીઓ' : 'Open Jobs'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {mockJobs.reduce((sum, job) => sum + job.applicants, 0)}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'hi' ? 'कुल आवेदन' : language === 'gu' ? 'કુલ અરજીઓ' : 'Total Applications'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {mockJobs.filter(job => job.status === 'in_progress').length}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'hi' ? 'प्रगति में' : language === 'gu' ? 'પ્રગતિમાં' : 'In Progress'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ₹{mockJobs.reduce((sum, job) => sum + parseInt(job.salaryAmount) * job.workersNeeded, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'hi' ? 'कुल बजट' : language === 'gu' ? 'કુલ બજેટ' : 'Total Budget'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                    {getStatusLabel(job.status)}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {job.district}, {job.state}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {getDurationLabel(job.duration)}
                  </span>
                  <span className="flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    ₹{job.salaryAmount}/{getPaymentTypeLabel(job.paymentType)}
                  </span>
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {job.workersNeeded} {language === 'hi' ? 'मजदूर' : language === 'gu' ? 'કામદાર' : 'workers'}
                  </span>
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
                    </div>
                  )}

                  <p className="text-gray-600 text-sm">{job.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{language === 'hi' ? 'पोस्ट किया:' : language === 'gu' ? 'પોસ્ટ કર્યું:' : 'Posted:'} {job.createdAt.toLocaleDateString()}</p>
                    <p>{job.applicants} {language === 'hi' ? 'आवेदन' : language === 'gu' ? 'અરજીઓ' : 'applications'}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors" title="View Applications">
                      <Eye size={16} />
                    </button>
                    <button className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors" title="Edit Job">
                      <Edit size={16} />
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors" title="Delete Job">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {mockJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Users size={48} className="mx-auto mb-2" />
              <p>{language === 'hi' ? 'कोई नौकरी पोस्ट नहीं की गई' : language === 'gu' ? 'કોઈ નોકરી પોસ્ટ કરી નથી' : 'No jobs posted yet'}</p>
              <p className="text-sm">{language === 'hi' ? 'नई नौकरी पोस्ट करने के लिए "मजदूर खोजें" पर जाएं' : language === 'gu' ? 'નવી નોકરી પોસ્ટ કરવા માટે "કામદાર શોધો" પર જાઓ' : 'Go to "Find Workers" to post a new job'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsSection;