import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Search, Upload, X, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FindWorkSection: React.FC = () => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');
  const [showWorkerForm, setShowWorkerForm] = useState(false);
  const [workerData, setWorkerData] = useState({
    workerName: '',
    skills: [] as string[],
    experience: '',
    preferredDuration: '',
    preferredSalaryType: '',
    willingToRelocate: false,
    additionalNeeds: [] as string[],
    currentState: '',
    currentDistrict: '',
    phoneNumber: '',
    email: '',
    resume: null as File | null
  });

  const skills = [
    { value: 'harvesting', label: { en: 'Harvesting', hi: 'कटाई', gu: 'લણણી' } },
    { value: 'planting', label: { en: 'Planting', hi: 'बुआई', gu: 'વાવેતર' } },
    { value: 'general', label: { en: 'General Farm Work', hi: 'सामान्य खेती का काम', gu: 'સામાન્ય ખેતીનું કામ' } },
    { value: 'water', label: { en: 'Water Management', hi: 'जल प्रबंधन', gu: 'પાણી વ્યવસ્થાપન' } },
    { value: 'machinery', label: { en: 'Machinery Operation', hi: 'मशीन संचालन', gu: 'મશીન સંચાલન' } },
    { value: 'driver', label: { en: 'Driver', hi: 'ड्राइवर', gu: 'ડ્રાઇવર' } },
    { value: 'mechanic', label: { en: 'Mechanic', hi: 'मैकेनिक', gu: 'મિકેનિક' } },
    { value: 'others', label: { en: 'Others', hi: 'अन्य', gu: 'અન્ય' } }
  ];

  const experienceLevels = [
    { value: 'fresher', label: { en: 'Fresher', hi: 'नया', gu: 'નવો' } },
    { value: '1-2', label: { en: '1–2 Years', hi: '1–2 साल', gu: '1–2 વર્ષ' } },
    { value: '3-5', label: { en: '3–5 Years', hi: '3–5 साल', gu: '3–5 વર્ષ' } },
    { value: '5+', label: { en: '5+ Years', hi: '5+ साल', gu: '5+ વર્ષ' } }
  ];

  const additionalNeeds = [
    { value: 'housing', label: { en: 'Housing Required', hi: 'आवास चाहिए', gu: 'આવાસ જોઈએ' } },
    { value: 'food', label: { en: 'Food Required', hi: 'भोजन चाहिए', gu: 'ભોજન જોઈએ' } },
    { value: 'health', label: { en: 'Health Benefits Required', hi: 'स्वास्थ्य लाभ चाहिए', gu: 'આરોગ્ય લાભ જોઈએ' } }
  ];

  const states = [
    'Andhra Pradesh', 'Gujarat', 'Haryana', 'Karnataka', 'Madhya Pradesh', 
    'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh'
  ];

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

  const handleSkillChange = (skill: string) => {
    setWorkerData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNeedChange = (need: string) => {
    setWorkerData(prev => ({
      ...prev,
      additionalNeeds: prev.additionalNeeds.includes(need)
        ? prev.additionalNeeds.filter(n => n !== need)
        : [...prev.additionalNeeds, need]
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setWorkerData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleWorkerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Worker profile submitted:', workerData);
    setShowWorkerForm(false);
    // Reset form
    setWorkerData({
      workerName: '',
      skills: [],
      experience: '',
      preferredDuration: '',
      preferredSalaryType: '',
      willingToRelocate: false,
      additionalNeeds: [],
      currentState: '',
      currentDistrict: '',
      phoneNumber: '',
      email: '',
      resume: null
    });
  };

  const handleApply = (jobId: string) => {
    setShowWorkerForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'काम खोजें' : 
           language === 'gu' ? 'કામ શોધો' : 
           'Find Work'}
        </h2>
        <button
          onClick={() => setShowWorkerForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-md"
        >
          <FileText size={18} />
          <span>
            {language === 'hi' ? 'अपनी प्रोफाइल बनाएं' : 
             language === 'gu' ? 'તમારી પ્રોફાઇલ બનાવો' : 
             'Create Worker Profile'}
          </span>
        </button>
      </div>

      {/* Worker Profile Form */}
      {showWorkerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  {language === 'hi' ? 'वर्कर प्रोफाइल बनाएं' : 
                   language === 'gu' ? 'વર્કર પ્રોફાઇલ બનાવો' : 
                   'Create Worker Profile'}
                </h3>
                <button
                  onClick={() => setShowWorkerForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleWorkerFormSubmit} className="p-6 space-y-8">
              {/* Worker Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {language === 'hi' ? 'मजदूर का नाम' : language === 'gu' ? 'કામદારનું નામ' : 'Worker Name'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={workerData.workerName}
                  onChange={(e) => setWorkerData({...workerData, workerName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'hi' ? 'अपना पूरा नाम दर्ज करें' : language === 'gu' ? 'તમારું સંપૂર્ણ નામ દાખલ કરો' : 'Enter your full name'}
                  required
                />
              </div>

              {/* Skills / Job Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'कौशल / काम की प्राथमिकता (एक से अधिक चुन सकते हैं)' : 
                   language === 'gu' ? 'કૌશલ્ય / કામની પ્રાથમિકતા (એક કરતાં વધુ પસંદ કરી શકો છો)' : 
                   'Skills / Job Preference (Select multiple)'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <label key={skill.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={workerData.skills.includes(skill.value)}
                        onChange={() => handleSkillChange(skill.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{skill.label[language as keyof typeof skill.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'अनुभव' : language === 'gu' ? 'અનુભવ' : 'Experience'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {experienceLevels.map((exp) => (
                    <label key={exp.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={exp.value}
                        checked={workerData.experience === exp.value}
                        onChange={(e) => setWorkerData({...workerData, experience: e.target.value})}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{exp.label[language as keyof typeof exp.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Job Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'पसंदीदा काम की अवधि' : language === 'gu' ? 'પસંદીદા કામની અવધિ' : 'Preferred Job Duration'}
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
                        name="preferredDuration"
                        value={duration.value}
                        checked={workerData.preferredDuration === duration.value}
                        onChange={(e) => setWorkerData({...workerData, preferredDuration: e.target.value})}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{duration.label[language as keyof typeof duration.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Salary Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'पसंदीदा वेतन प्रकार' : language === 'gu' ? 'પસંદીદા પગાર પ્રકાર' : 'Preferred Salary Type'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'fixed', label: { en: 'Fixed Salary', hi: 'निश्चित वेतन', gu: 'નિશ્ચિત પગાર' } },
                    { value: 'hourly', label: { en: 'Hourly Rate', hi: 'घंटे के हिसाब से', gu: 'કલાકના હિસાબે' } },
                    { value: 'per-acre', label: { en: 'Per Acre', hi: 'प्रति एकड़', gu: 'પ્રતિ એકર' } }
                  ].map((salary) => (
                    <label key={salary.value} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredSalaryType"
                        value={salary.value}
                        checked={workerData.preferredSalaryType === salary.value}
                        onChange={(e) => setWorkerData({...workerData, preferredSalaryType: e.target.value})}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{salary.label[language as keyof typeof salary.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Willing to Relocate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'क्या आप स्थानांतरित होने को तैयार हैं?' : 
                   language === 'gu' ? 'શું તમે સ્થળાંતર કરવા તૈયાર છો?' : 
                   'Willing to Relocate?'}
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="willingToRelocate"
                      value="true"
                      checked={workerData.willingToRelocate === true}
                      onChange={() => setWorkerData({...workerData, willingToRelocate: true})}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'hi' ? 'हाँ' : language === 'gu' ? 'હા' : 'Yes'}
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="willingToRelocate"
                      value="false"
                      checked={workerData.willingToRelocate === false}
                      onChange={() => setWorkerData({...workerData, willingToRelocate: false})}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'hi' ? 'नहीं' : language === 'gu' ? 'ના' : 'No'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Needs */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'अतिरिक्त आवश्यकताएं' : language === 'gu' ? 'વધારાની જરૂરિયાતો' : 'Additional Needs'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {additionalNeeds.map((need) => (
                    <label key={need.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={workerData.additionalNeeds.includes(need.value)}
                        onChange={() => handleNeedChange(need.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{need.label[language as keyof typeof need.label]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'hi' ? 'वर्तमान राज्य' : language === 'gu' ? 'વર્તમાન રાજ્ય' : 'Current State'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={workerData.currentState}
                    onChange={(e) => setWorkerData({...workerData, currentState: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    {language === 'hi' ? 'वर्तमान जिला/शहर' : language === 'gu' ? 'વર્તમાન જિલ્લો/શહેર' : 'Current District/City'}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={workerData.currentDistrict}
                    onChange={(e) => setWorkerData({...workerData, currentDistrict: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'फोन नंबर' : language === 'gu' ? 'ફોન નંબર' : 'Phone Number'}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={workerData.phoneNumber}
                      onChange={(e) => setWorkerData({...workerData, phoneNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'ईमेल (वैकल्पिक)' : language === 'gu' ? 'ઈમેઈલ (વૈકલ્પિક)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={workerData.email}
                      onChange={(e) => setWorkerData({...workerData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="worker@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {language === 'hi' ? 'रिज्यूमे/पहचान प्रमाण अपलोड करें (वैकल्पिक)' : 
                   language === 'gu' ? 'રિઝ્યુમે/ઓળખ પુરાવો અપલોડ કરો (વૈકલ્પિક)' : 
                   'Upload Resume/ID Proof (Optional)'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'hi' ? 'PDF, DOC या JPG फाइल' : 
                     language === 'gu' ? 'PDF, DOC અથવા JPG ફાઇલ' : 
                     'PDF, DOC or JPG file'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    {language === 'hi' ? 'फाइल चुनें' : language === 'gu' ? 'ફાઇલ પસંદ કરો' : 'Choose File'}
                  </label>
                </div>

                {/* File Preview */}
                {workerData.resume && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">{workerData.resume.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWorkerData({...workerData, resume: null})}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md"
                >
                  {language === 'hi' ? 'प्रोफाइल बनाएं' : language === 'gu' ? 'પ્રોફાઇલ બનાવો' : 'Create Profile'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowWorkerForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {language === 'hi' ? 'रद्द करें' : language === 'gu' ? 'રદ કરો' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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