import React, { useState } from 'react';
import { Plus, MapPin, Clock, DollarSign, Users, Upload, X, Search, Filter, Send, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FindWorkersSection: React.FC = () => {
  const { language } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobData, setJobData] = useState({
    jobTypes: [] as string[],
    customJobType: '',
    jobTitle: '',
    landArea: '',
    jobDuration: '',
    paymentType: '',
    salaryAmount: '',
    workersNeeded: '',
    urgencyLevel: '',
    workingHours: '',
    accommodationType: '',
    transportationProvided: false,
    skillLevel: '',
    physicalDemands: '',
    weatherConditions: '',
    contractType: '',
    additionalBenefits: [] as string[],
    jobDescription: '',
    state: '',
    district: '',
    farmerName: '',
    phoneNumber: '',
    email: '',
    images: [] as File[]
  });

  const jobTypes = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'crop-care', label: { en: 'Crop Care', hi: 'फसल की देखभाल', gu: 'પાકની સંભાળ' } },
    { value: 'dirt-removal', label: { en: 'Dirt / Rock Removal', hi: 'मिट्टी/पत्थर हटाना', gu: 'માટી/પથ્થર હટાવવું' } },
    { value: 'hauling', label: { en: 'Hauling', hi: 'ढुलाई', gu: 'પરિવહન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'tiling', label: { en: 'Tiling', hi: 'टाइलिंग', gu: 'ટાઇલિંગ' } },
    { value: 'truck-driving', label: { en: 'Truck Driving', hi: 'ट्रक चलाना', gu: 'ટ્રક ચલાવવું' } },
    { value: 'mechanic', label: { en: 'Mechanic Work', hi: 'मैकेनिक का काम', gu: 'મિકેનિકનું કામ' } }
  ];

  const urgencyLevels = [
    { value: 'immediate', label: { en: 'Immediate (1-2 days)', hi: 'तत्काल (1-2 दिन)', gu: 'તાત્કાલિક (1-2 દિવસ)' } },
    { value: 'this-week', label: { en: 'This Week', hi: 'इस सप्ताह', gu: 'આ અઠવાડિયે' } },
    { value: 'next-week', label: { en: 'Next Week', hi: 'अगले सप्ताह', gu: 'આવતા અઠવાડિયે' } },
    { value: 'flexible', label: { en: 'Flexible', hi: 'लचीला', gu: 'લવચીક' } }
  ];

  const skillLevels = [
    { value: 'beginner', label: { en: 'Beginner', hi: 'शुरुआती', gu: 'શરૂઆતી' } },
    { value: 'intermediate', label: { en: 'Intermediate', hi: 'मध्यम', gu: 'મધ્યમ' } },
    { value: 'experienced', label: { en: 'Experienced', hi: 'अनुभवी', gu: 'અનુભવી' } },
    { value: 'expert', label: { en: 'Expert', hi: 'विशेषज्ञ', gu: 'નિષ્ણાત' } }
  ];

  const physicalDemands = [
    { value: 'light', label: { en: 'Light Work', hi: 'हल्का काम', gu: 'હળવું કામ' } },
    { value: 'moderate', label: { en: 'Moderate Work', hi: 'मध्यम काम', gu: 'મધ્યમ કામ' } },
    { value: 'heavy', label: { en: 'Heavy Work', hi: 'भारी काम', gu: 'ભારે કામ' } }
  ];

  const accommodationTypes = [
    { value: 'not-provided', label: { en: 'Not Provided', hi: 'प्रदान नहीं', gu: 'પૂરું પાડવામાં નથી' } },
    { value: 'shared-room', label: { en: 'Shared Room', hi: 'साझा कमरा', gu: 'વહેંચાયેલ રૂમ' } },
    { value: 'private-room', label: { en: 'Private Room', hi: 'निजी कमरा', gu: 'ખાનગી રૂમ' } },
    { value: 'family-quarters', label: { en: 'Family Quarters', hi: 'पारिवारिक आवास', gu: 'કૌટુંબિક આવાસ' } }
  ];

  const benefits = [
    { value: 'housing', label: { en: 'Housing', hi: 'आवास', gu: 'આવાસ' } },
    { value: 'food', label: { en: 'Food Provided', hi: 'भोजन प्रदान', gu: 'ભોજન પૂરું પાડવામાં' } },
    { value: 'health', label: { en: 'Health Insurance', hi: 'स्वास्थ्य बीमा', gu: 'આરોગ્ય વીમો' } },
    { value: 'transport', label: { en: 'Transportation', hi: 'परिवहन', gu: 'પરિવહન' } },
    { value: 'bonus', label: { en: 'Performance Bonus', hi: 'प्रदर्शन बोनस', gu: 'પ્રદર્શન બોનસ' } }
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  // Mock workers data
  const mockWorkers = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['harvesting', 'machinery'],
      experience: '3-5',
      location: 'Punjab, India',
      city: 'Ludhiana',
      state: 'Punjab',
      preferredSalary: 'hourly',
      accommodationNeeded: true,
      rating: 4.8,
      completedJobs: 25,
      availability: 'available',
      contactNumber: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Priya Patel',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['planting', 'crop-care'],
      experience: '1-2',
      location: 'Gujarat, India',
      city: 'Ahmedabad',
      state: 'Gujarat',
      preferredSalary: 'fixed',
      accommodationNeeded: false,
      rating: 4.6,
      completedJobs: 12,
      availability: 'available',
      contactNumber: '+91 87654 32109'
    },
    {
      id: '3',
      name: 'Suresh Singh',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      skills: ['truck-driving', 'hauling'],
      experience: '5+',
      location: 'Maharashtra, India',
      city: 'Pune',
      state: 'Maharashtra',
      preferredSalary: 'per-acre',
      accommodationNeeded: true,
      rating: 4.9,
      completedJobs: 45,
      availability: 'busy',
      contactNumber: '+91 76543 21098'
    }
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
    setJobData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5)
    }));
  };

  const removeImage = (index: number) => {
    setJobData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posted:', jobData);
    setShowJobForm(false);
    setJobData({
      jobTypes: [],
      customJobType: '',
      jobTitle: '',
      landArea: '',
      jobDuration: '',
      paymentType: '',
      salaryAmount: '',
      workersNeeded: '',
      urgencyLevel: '',
      workingHours: '',
      accommodationType: '',
      transportationProvided: false,
      skillLevel: '',
      physicalDemands: '',
      weatherConditions: '',
      contractType: '',
      additionalBenefits: [],
      jobDescription: '',
      state: '',
      district: '',
      farmerName: '',
      phoneNumber: '',
      email: '',
      images: []
    });
  };

  const handleSendRequest = (workerId: string) => {
    console.log('Sending request to worker:', workerId);
    // Here you would implement the request sending logic
  };

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || worker.skills.includes(skillFilter);
    const matchesExperience = !experienceFilter || worker.experience === experienceFilter;
    const matchesLocation = !locationFilter || worker.state.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesSkill && matchesExperience && matchesLocation;
  });

  const getSkillLabel = (skill: string) => {
    const skillObj = jobTypes.find(type => type.value === skill);
    return skillObj ? skillObj.label[language as keyof typeof skillObj.label] : skill;
  };

  const getExperienceLabel = (exp: string) => {
    const labels: any = {
      'fresher': { en: 'Fresher', hi: 'नया', gu: 'નવો' },
      '1-2': { en: '1-2 Years', hi: '1-2 साल', gu: '1-2 વર્ષ' },
      '3-5': { en: '3-5 Years', hi: '3-5 साल', gu: '3-5 વર્ષ' },
      '5+': { en: '5+ Years', hi: '5+ साल', gu: '5+ વર્ષ' }
    };
    return labels[exp]?.[language] || exp;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'मजदूर खोजें' : 
           language === 'gu' ? 'કામદાર શોધો' : 
           'Find Workers'}
        </h2>
      </div>

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

              {/* Job Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'काम की अवधि' : language === 'gu' ? 'કામની અવધિ' : 'Job Duration'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'one-time', label: { en: 'One-time', hi: 'एक बार', gu: 'એક વાર' } },
                    { value: 'part-time', label: { en: 'Part-time (Seasonal)', hi: 'अंशकालिक (मौसमी)', gu: 'અંશકાલિક (મોસમી)' } },
                    { value: 'full-time', label: { en: 'Full-time', hi: 'पूर्णकालिक', gu: 'પૂર્ણકાલિક' } }
                  ].map((duration) => (
                    <label key={duration.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="jobDuration"
                        value={duration.value}
                        checked={jobData.jobDuration === duration.value}
                        onChange={(e) => setJobData({...jobData, jobDuration: e.target.value})}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{duration.label[language as keyof typeof duration.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'भुगतान का प्रकार' : language === 'gu' ? 'ચુકવણીનો પ્રકાર' : 'Payment Type'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'fixed', label: { en: 'Fixed Salary', hi: 'निश्चित वेतन', gu: 'નિશ્ચિત પગાર' } },
                    { value: 'hourly', label: { en: 'Hourly Rate', hi: 'घंटे के हिसाब से', gu: 'કલાકના હિસાબે' } },
                    { value: 'per-acre', label: { en: 'Per Acre Salary', hi: 'प्रति एकड़ वेतन', gu: 'પ્રતિ એકર પગાર' } }
                  ].map((payment) => (
                    <label key={payment.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value={payment.value}
                        checked={jobData.paymentType === payment.value}
                        onChange={(e) => setJobData({...jobData, paymentType: e.target.value})}
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{payment.label[language as keyof typeof payment.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Amount and Urgency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'वेतन राशि (₹)' : language === 'gu' ? 'પગારની રકમ (₹)' : 'Salary Amount (₹)'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={jobData.salaryAmount}
                    onChange={(e) => setJobData({...jobData, salaryAmount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={
                      jobData.paymentType === 'fixed' ? '15000' :
                      jobData.paymentType === 'hourly' ? '50' :
                      jobData.paymentType === 'per-acre' ? '2000' : '500'
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'तत्कालता' : language === 'gu' ? 'તાત્કાલિકતા' : 'Urgency Level'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.urgencyLevel}
                    onChange={(e) => setJobData({...jobData, urgencyLevel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                    </option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label[language as keyof typeof level.label]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skill Level and Physical Demands */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'hi' ? 'आवश्यक कौशल स्तर' : language === 'gu' ? 'જરૂરી કૌશલ્ય સ્તર' : 'Required Skill Level'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="space-y-2">
                    {skillLevels.map((level) => (
                      <label key={level.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="skillLevel"
                          value={level.value}
                          checked={jobData.skillLevel === level.value}
                          onChange={(e) => setJobData({...jobData, skillLevel: e.target.value})}
                          className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{level.label[language as keyof typeof level.label]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {language === 'hi' ? 'शारीरिक मांग' : language === 'gu' ? 'શારીરિક માંગ' : 'Physical Demands'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="space-y-2">
                    {physicalDemands.map((demand) => (
                      <label key={demand.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="physicalDemands"
                          value={demand.value}
                          checked={jobData.physicalDemands === demand.value}
                          onChange={(e) => setJobData({...jobData, physicalDemands: e.target.value})}
                          className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{demand.label[language as keyof typeof demand.label]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Working Hours and Accommodation */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'काम के घंटे (प्रति दिन)' : language === 'gu' ? 'કામના કલાકો (દિવસ દીઠ)' : 'Working Hours (per day)'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.workingHours}
                    onChange={(e) => setJobData({...jobData, workingHours: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                    </option>
                    <option value="4-6">4-6 {language === 'hi' ? 'घंटे' : language === 'gu' ? 'કલાક' : 'hours'}</option>
                    <option value="6-8">6-8 {language === 'hi' ? 'घंटे' : language === 'gu' ? 'કલાક' : 'hours'}</option>
                    <option value="8-10">8-10 {language === 'hi' ? 'घंटे' : language === 'gu' ? 'કલાક' : 'hours'}</option>
                    <option value="flexible">{language === 'hi' ? 'लचीला' : language === 'gu' ? 'લવચીક' : 'Flexible'}</option>
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
                    <option value="">
                      {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                    </option>
                    {accommodationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label[language as keyof typeof type.label]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transportation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'परिवहन सुविधा' : language === 'gu' ? 'પરિવહન સુવિધા' : 'Transportation Facility'}
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="transportationProvided"
                      value="true"
                      checked={jobData.transportationProvided === true}
                      onChange={() => setJobData({...jobData, transportationProvided: true})}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'hi' ? 'हाँ, प्रदान की जाएगी' : language === 'gu' ? 'હા, પૂરી પાડવામાં આવશે' : 'Yes, Provided'}
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="transportationProvided"
                      value="false"
                      checked={jobData.transportationProvided === false}
                      onChange={() => setJobData({...jobData, transportationProvided: false})}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'hi' ? 'नहीं, खुद का इंतजाम' : language === 'gu' ? 'ના, પોતાનું વ્યવસ્થા' : 'No, Own Arrangement'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Benefits */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'अतिरिक्त लाभ' : language === 'gu' ? 'વધારાના ફાયદા' : 'Additional Benefits'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {benefits.map((benefit) => (
                    <label key={benefit.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
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
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'राज्य' : language === 'gu' ? 'રાજ્ય' : 'State'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={jobData.state}
                    onChange={(e) => setJobData({...jobData, state: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">
                      {language === 'hi' ? 'राज्य चुनें' : language === 'gu' ? 'રાજ્ય પસંદ કરો' : 'Select State'}
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'जिला/शहर' : language === 'gu' ? 'જિલ્લો/શહેર' : 'District/City'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobData.district}
                    onChange={(e) => setJobData({...jobData, district: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={language === 'hi' ? 'जिला या शहर का नाम' : language === 'gu' ? 'જિલ્લો અથવા શહેરનું નામ' : 'District or city name'}
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {language === 'hi' ? 'संपर्क जानकारी' : language === 'gu' ? 'સંપર્ક માહિતી' : 'Contact Information'}
                </h4>
                <p className="text-sm text-gray-600 mb-4 bg-yellow-50 p-3 rounded border border-yellow-200">
                  {language === 'hi' ? 'नोट: संपर्क जानकारी केवल तभी दिखाई जाएगी जब कोई मजदूर आवेदन करे और आप स्वीकार करें।' :
                   language === 'gu' ? 'નોંધ: સંપર્ક માહિતી ફક્ત ત્યારે જ બતાવવામાં આવશે જ્યારે કોઈ કામદાર અરજી કરે અને તમે સ્વીકારો.' :
                   'Note: Contact information will only be shown when a worker applies and you accept.'}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'किसान का नाम' : language === 'gu' ? 'ખેડૂતનું નામ' : 'Farmer Name'}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={jobData.farmerName}
                      onChange={(e) => setJobData({...jobData, farmerName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'फोन नंबर' : language === 'gu' ? 'ફોન નંબર' : 'Phone Number'}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={jobData.phoneNumber}
                      onChange={(e) => setJobData({...jobData, phoneNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Job Description */}
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

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'तस्वीरें अपलोड करें (वैकल्पिक)' : 
                   language === 'gu' ? 'ચિત્રો અપલોડ કરો (વૈકલ્પિક)' : 
                   'Upload Images (Optional)'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'hi' ? 'खेत, उपकरण या काम की तस्वीरें' : 
                     language === 'gu' ? 'ખેત, સાધન અથવા કામની તસવીરો' : 
                     'Farm, equipment or work photos'}
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    {language === 'hi' ? 'फाइल चुनें' : language === 'gu' ? 'ફાઇલ પસંદ કરો' : 'Choose Files'}
                  </label>
                </div>

                {/* Image Preview */}
                {jobData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                    {jobData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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

      {/* Search and Filters for Workers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {language === 'hi' ? 'मजदूर खोजें और फिल्टर करें' : 
             language === 'gu' ? 'કામદાર શોધો અને ફિલ્ટર કરો' : 
             'Search and Filter Workers'}
          </h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'hi' ? 'मजदूर का नाम खोजें' : language === 'gu' ? 'કામદારનું નામ શોધો' : 'Search worker name'}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">
                {language === 'hi' ? 'सभी कौशल' : language === 'gu' ? 'બધા કૌશલ્ય' : 'All Skills'}
              </option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label[language as keyof typeof type.label]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">
                {language === 'hi' ? 'सभी अनुभव' : language === 'gu' ? 'બધો અનુભવ' : 'All Experience'}
              </option>
              <option value="fresher">{language === 'hi' ? 'नया' : language === 'gu' ? 'નવો' : 'Fresher'}</option>
              <option value="1-2">1-2 {language === 'hi' ? 'साल' : language === 'gu' ? 'વર્ષ' : 'Years'}</option>
              <option value="3-5">3-5 {language === 'hi' ? 'साल' : language === 'gu' ? 'વર્ષ' : 'Years'}</option>
              <option value="5+">5+ {language === 'hi' ? 'साल' : language === 'gu' ? 'વર્ષ' : 'Years'}</option>
            </select>
          </div>

          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">
                {language === 'hi' ? 'सभी स्थान' : language === 'gu' ? 'બધા સ્થાનો' : 'All Locations'}
              </option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Worker Profiles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center mb-4">
              <img
                src={worker.profilePicture}
                alt={worker.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-green-100"
              />
              <h3 className="text-lg font-semibold text-gray-800">{worker.name}</h3>
              <p className="text-sm text-gray-600">{worker.city}, {worker.state}</p>
              
              <div className="flex items-center justify-center space-x-1 mt-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium text-gray-700">{worker.rating}</span>
                <span className="text-xs text-gray-500">({worker.completedJobs} jobs)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  {language === 'hi' ? 'कौशल:' : language === 'gu' ? 'કૌશલ્ય:' : 'Skills:'}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {worker.skills.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {getSkillLabel(skill)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">
                    {language === 'hi' ? 'अनुभव:' : language === 'gu' ? 'અનુભવ:' : 'Experience:'}
                  </span>
                  <p className="font-medium">{getExperienceLabel(worker.experience)}</p>
                </div>
                <div>
                  <span className="text-gray-600">
                    {language === 'hi' ? 'स्थिति:' : language === 'gu' ? 'સ્થિતિ:' : 'Status:'}
                  </span>
                  <p className={`font-medium ${worker.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                    {worker.availability === 'available' 
                      ? (language === 'hi' ? 'उपलब्ध' : language === 'gu' ? 'ઉપલબ્ધ' : 'Available')
                      : (language === 'hi' ? 'व्यस्त' : language === 'gu' ? 'વ્યસ્ત' : 'Busy')
                    }
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-3">
                <button
                  onClick={() => handleSendRequest(worker.id)}
                  disabled={worker.availability !== 'available'}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm flex items-center justify-center space-x-1"
                >
                  <Send size={14} />
                  <span>
                    {language === 'hi' ? 'अनुरोध भेजें' : language === 'gu' ? 'વિનંતી મોકલો' : 'Send Request'}
                  </span>
                </button>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredWorkers.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">
              <Users size={48} className="mx-auto mb-2" />
              <p>{language === 'hi' ? 'कोई मजदूर नहीं मिला' : language === 'gu' ? 'કોઈ કામદાર મળ્યો નથી' : 'No workers found'}</p>
              <p className="text-sm">{language === 'hi' ? 'अलग फिल्टर आजमाएं' : language === 'gu' ? 'અલગ ફિલ્ટર અજમાવો' : 'Try different filters'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindWorkersSection;