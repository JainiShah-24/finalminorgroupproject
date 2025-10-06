import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Eye, CreditCard as Edit, Trash2, CheckCircle, Plus, X, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { indianStatesAndCities } from '../../utils/cityData';

const JobListingsSection: React.FC = () => {
  const { user, language } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobImages, setJobImages] = useState<File[]>([]);
  const [jobData, setJobData] = useState({
    jobTitle: '',
    jobTypes: [] as string[],
    customJobType: '',
    landArea: '',
    workersNeeded: '',
    jobDuration: '',
    paymentType: '',
    salaryAmount: '',
    urgencyLevel: '',
    skillLevel: '',
    physicalDemands: '',
    workingHours: '',
    accommodationType: '',
    transportationProvided: false,
    additionalBenefits: [] as string[],
    customAdditionalBenefits: '',
    state: '',
    city: '',
    jobDescription: '',
    contactInfo: user?.fullAddress || ''
  });

  const jobTypes = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'crop-care', label: { en: 'Crop Care', hi: 'फसल देखभाल', gu: 'પાક સંભાળ' } },
    { value: 'livestock', label: { en: 'Livestock Care', hi: 'पशुधन देखभाल', gu: 'પશુધન સંભાળ' } }
  ];

  const additionalBenefitsOptions = [
    { value: 'housing', label: { en: 'Housing', hi: 'आवास', gu: 'આવાસ' } },
    { value: 'food', label: { en: 'Food', hi: 'भोजन', gu: 'ભોજન' } },
    { value: 'health', label: { en: 'Health Insurance', hi: 'स्वास्थ्य बीमा', gu: 'આરોગ્ય વીમો' } },
    { value: 'transport', label: { en: 'Transportation', hi: 'परिवहन', gu: 'પરિવહન' } },
    { value: 'bonus', label: { en: 'Performance Bonus', hi: 'प्रदर्शन बोनस', gu: 'પ્રદર્શન બોનસ' } }
  ];

  const handleJobTypeChange = (type: string) => {
    setJobData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const handleBenefitChange = (benefit: string) => {
    setJobData(prev => ({
      ...prev,
      additionalBenefits: prev.additionalBenefits.includes(benefit)
        ? prev.additionalBenefits.filter(b => b !== benefit)
        : [...prev.additionalBenefits, benefit]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setJobImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setJobImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (jobData.jobTypes.length === 0 && !jobData.customJobType) {
      alert('Please select at least one job type or specify a custom job type!');
      return;
    }
    
    if (jobData.additionalBenefits.length === 0 && !jobData.customAdditionalBenefits) {
      alert('Please select at least one additional benefit or specify other benefits!');
      return;
    }
    
    console.log('Job posted:', jobData, jobImages);
    setShowJobForm(false);
    // Reset form
    setJobData({
      jobTitle: '',
      jobTypes: [],
      customJobType: '',
      landArea: '',
      workersNeeded: '',
      jobDuration: '',
      paymentType: '',
      salaryAmount: '',
      urgencyLevel: '',
      skillLevel: '',
      physicalDemands: '',
      workingHours: '',
      accommodationType: '',
      transportationProvided: false,
      additionalBenefits: [],
      customAdditionalBenefits: '',
      state: '',
      city: '',
      jobDescription: '',
      contactInfo: user?.fullAddress || ''
    });
    setJobImages([]);
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
      paymentType: 'per-day',
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
      paymentType: 'per-month',
      salaryAmount: '15000',
      workersNeeded: 3,
      additionalBenefits: ['food'],
      applicants: 8,
      status: 'open' as const,
      createdAt: new Date('2025-01-14'),
      description: 'Regular farm maintenance work including weeding, watering, and plant care.',
      farmerName: 'Priya Patel',
      farmerPhone: '+91 87654 32109'
    }
  ];

  const getJobTypeLabel = (type: string) => {
    const jobType = jobTypes.find(jt => jt.value === type);
    return jobType ? jobType.label[language as keyof typeof jobType.label] : type;
  };

  const getBenefitLabel = (benefit: string) => {
    const benefitOption = additionalBenefitsOptions.find(b => b.value === benefit);
    return benefitOption ? benefitOption.label[language as keyof typeof benefitOption.label] : benefit;
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
            {language === 'hi' ? 'नई नौकरी बनाएं' : 
             language === 'gu' ? 'નવી નોકરી બનાવો' : 
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
                  {language === 'hi' ? 'नई नौकरी बनाएं' : 
                   language === 'gu' ? 'નવી નોકરી બનાવો' : 
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
                  placeholder={language === 'hi' ? 'जैसे: कुशल मजदूर की आवश्यकता - गेहूं की कटाई' : 
                             language === 'gu' ? 'જેવા કે: કુશળ કામદારની જરૂર - ઘઉંની લણણી' : 
                             'e.g: Skilled Worker Requirement - Wheat Harvesting'}
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
                    {language === 'hi' ? 'कितने मजदूर चाहिए' : language === 'gu' ? 'કેટલા કામદાર જોઈએ' : 'Number of Workers Needed'}
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

              {/* Job Duration and Payment Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'काम की अवधि' : language === 'gu' ? 'કામની અવધિ' : 'Job Duration'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.jobDuration}
                    onChange={(e) => setJobData({...jobData, jobDuration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="1-day">1 Day</option>
                    <option value="2-3-days">2-3 Days</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                    <option value="seasonal">Seasonal</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'भुगतान का प्रकार' : language === 'gu' ? 'ચુકવણીનો પ્રકાર' : 'Payment Type'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.paymentType}
                    onChange={(e) => setJobData({...jobData, paymentType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Payment Type</option>
                    <option value="per-day">Per Day</option>
                    <option value="per-month">Per Month</option>
                  </select>
                </div>
              </div>

              {/* Salary Amount and Urgency Level */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'वेतन राशि (₹)' : language === 'gu' ? 'પગારની રકમ (₹)' : 'Salary Amount (₹)'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={jobData.salaryAmount}
                    onChange={(e) => setJobData({...jobData, salaryAmount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'तात्कालिकता का स्तर' : language === 'gu' ? 'તાત્કાલિકતાનું સ્તર' : 'Urgency Level'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.urgencyLevel}
                    onChange={(e) => setJobData({...jobData, urgencyLevel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Urgency</option>
                    <option value="low">Low - Can wait 1-2 weeks</option>
                    <option value="medium">Medium - Need within a week</option>
                    <option value="high">High - Need within 2-3 days</option>
                    <option value="urgent">Urgent - Need immediately</option>
                  </select>
                </div>
              </div>

              {/* Required Skill Level and Physical Demands */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'आवश्यक कौशल स्तर' : language === 'gu' ? 'જરૂરી કૌશલ્ય સ્તર' : 'Required Skill Level'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.skillLevel}
                    onChange={(e) => setJobData({...jobData, skillLevel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Skill Level</option>
                    <option value="beginner">Beginner - No experience needed</option>
                    <option value="intermediate">Intermediate - Some experience</option>
                    <option value="experienced">Experienced - 2+ years</option>
                    <option value="expert">Expert - 5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'शारीरिक मांग' : language === 'gu' ? 'શારીરિક માંગ' : 'Physical Demands'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.physicalDemands}
                    onChange={(e) => setJobData({...jobData, physicalDemands: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Physical Demands</option>
                    <option value="light">Light - Minimal physical effort</option>
                    <option value="moderate">Moderate - Regular physical work</option>
                    <option value="heavy">Heavy - Intensive physical labor</option>
                  </select>
                </div>
              </div>

              {/* Working Hours and Accommodation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'दैनिक कार्य घंटे' : language === 'gu' ? 'દૈનિક કામના કલાકો' : 'Working Hours per Day'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.workingHours}
                    onChange={(e) => setJobData({...jobData, workingHours: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Working Hours</option>
                    <option value="4-hours">4 Hours</option>
                    <option value="6-hours">6 Hours</option>
                    <option value="8-hours">8 Hours (Full Day)</option>
                    <option value="10-hours">10 Hours</option>
                    <option value="flexible">Flexible Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'आवास का प्रकार' : language === 'gu' ? 'આવાસનો પ્રકાર' : 'Accommodation Type'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.accommodationType}
                    onChange={(e) => setJobData({...jobData, accommodationType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Accommodation</option>
                    <option value="not-provided">Not Provided</option>
                    <option value="shared-room">Shared Room</option>
                    <option value="private-room">Private Room</option>
                    <option value="family-accommodation">Family Accommodation</option>
                  </select>
                </div>
              </div>

              {/* Transportation and State/City */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'hi' ? 'परिवहन सुविधा' : language === 'gu' ? 'પરિવહન સુવિધા' : 'Transportation Facility'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="transportationProvided"
                        checked={jobData.transportationProvided === true}
                        onChange={() => setJobData(prev => ({ ...prev, transportationProvided: true }))}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        required
                      />
                      <span className="ml-2 text-gray-700">Provided</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="transportationProvided"
                        checked={jobData.transportationProvided === false}
                        onChange={() => setJobData(prev => ({ ...prev, transportationProvided: false }))}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        required
                      />
                      <span className="ml-2 text-gray-700">Not Provided</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'राज्य' : language === 'gu' ? 'રાજ્ય' : 'State'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.state}
                    onChange={(e) => setJobData({...jobData, state: e.target.value, city: ''})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select State</option>
                    {Object.keys(indianStatesAndCities).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'शहर' : language === 'gu' ? 'શહેર' : 'City'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.city}
                    onChange={(e) => setJobData({...jobData, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    disabled={!jobData.state}
                  >
                    <option value="">Select City</option>
                    {jobData.state && indianStatesAndCities[jobData.state as keyof typeof indianStatesAndCities]?.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Benefits */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'अतिरिक्त लाभ' : language === 'gu' ? 'વધારાના ફાયદા' : 'Additional Benefits'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {additionalBenefitsOptions.map((benefit) => (
                    <label key={benefit.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={jobData.additionalBenefits.includes(benefit.value)}
                        onChange={() => handleBenefitChange(benefit.value)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{benefit.label[language as keyof typeof benefit.label]}</span>
                    </label>
                  ))}
                </div>
                
                {/* Custom Additional Benefits */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={jobData.customAdditionalBenefits}
                    onChange={(e) => setJobData({...jobData, customAdditionalBenefits: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'hi' ? 'अन्य लाभ (यदि ऊपर उल्लिखित नहीं है)' : 
                               language === 'gu' ? 'અન્ય ફાયદા (જો ઉપર ઉલ્લેખિત નથી)' : 
                               'Other benefits (if not mentioned above)'}
                    required={jobData.additionalBenefits.length === 0}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'hi' ? 'संपर्क जानकारी' : language === 'gu' ? 'સંપર્ક માહિતી' : 'Contact Information'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={jobData.contactInfo}
                  onChange={(e) => setJobData({...jobData, contactInfo: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={language === 'hi' ? 'पूरा पता और संपर्क विवरण' : 
                             language === 'gu' ? 'સંપૂર્ણ સરનામું અને સંપર્ક વિગતો' : 
                             'Full address and contact details'}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'hi' ? 'नोट: संपर्क जानकारी केवल तभी दिखाई जाएगी जब दोनों पक्ष अनुरोध स्वीकार करें।' :
                   language === 'gu' ? 'નોંધ: સંપર્ક માહિતી ત્યારે જ દેખાશે જ્યારે બંને પક્ષો વિનંતી સ્વીકારે.' :
                   'Note: Contact information will be revealed only when both parties accept the request.'}
                </p>
              </div>

              {/* Job Description (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'hi' ? 'काम का विवरण (वैकल्पिक)' : language === 'gu' ? 'કામનું વર્ણન (વૈકલ્પિક)' : 'Job Description (Optional)'}
                </label>
                <textarea
                  value={jobData.jobDescription}
                  onChange={(e) => setJobData({...jobData, jobDescription: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={language === 'hi' ? 'काम के बारे में अतिरिक्त जानकारी...' : 
                             language === 'gu' ? 'કામ વિશે વધારાની માહિતી...' : 
                             'Additional details about the work...'}
                />
              </div>

              {/* Image Upload (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'तस्वीरें अपलोड करें (वैकल्पिक, अधिकतम 5)' : 
                   language === 'gu' ? 'ચિત્રો અપલોડ કરો (વૈકલ્પિક, મહત્તમ 5)' : 
                   'Upload Images (Optional, Max 5)'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="job-images"
                  />
                  <label
                    htmlFor="job-images"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload images</span>
                  </label>
                  
                  {jobImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {jobImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Job image ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

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
              <p className="text-2xl font-bold text-gray-800">2</p>
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
                {language === 'hi' ? 'कुल बजेट' : language === 'gu' ? 'કુલ બજેટ' : 'Total Budget'}
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
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.status === 'open' ? (language === 'hi' ? 'खुला' : language === 'gu' ? 'ખુલ્લું' : 'Open') : 'Closed'}
                  </span>
                </div>
                
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
                    ₹{job.salaryAmount}/{job.paymentType.replace('per-', '')}
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
      </div>
    </div>
  );
};

export default JobListingsSection;