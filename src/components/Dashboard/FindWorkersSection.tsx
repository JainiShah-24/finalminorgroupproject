import React, { useState } from 'react';
import { Plus, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FindWorkersSection: React.FC = () => {
  const { language } = useApp();
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    workType: '',
    duration: '',
    payRate: '',
    workersNeeded: 1,
    requirements: '',
    skills: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to backend
    setShowJobForm(false);
    setJobData({
      title: '',
      description: '',
      location: '',
      workType: '',
      duration: '',
      payRate: '',
      workersNeeded: 1,
      requirements: '',
      skills: ''
    });
  };

  const mockJobs = [
    {
      id: '1',
      title: 'Wheat Harvesting Work',
      location: 'Punjab, India',
      workType: 'Harvesting',
      duration: '2 weeks',
      payRate: '₹500/day',
      workersNeeded: 5,
      applicants: 12,
      status: 'open'
    },
    {
      id: '2',
      title: 'Vegetable Farm Maintenance',
      location: 'Gujarat, India',
      workType: 'General Farm Work',
      duration: '1 month',
      payRate: '₹400/day',
      workersNeeded: 3,
      applicants: 8,
      status: 'open'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'मजदूर खोजें' : 
           language === 'gu' ? 'કામદાર શોધો' : 
           'Find Workers'}
        </h2>
        <button
          onClick={() => setShowJobForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>
            {language === 'hi' ? 'नई नौकरी पोस्ट करें' : 
             language === 'gu' ? 'નવી નોકરી પોસ્ટ કરો' : 
             'Post New Job'}
          </span>
        </button>
      </div>

      {/* Job Posting Form */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'hi' ? 'नई नौकरी पोस्ट करें' : 
                   language === 'gu' ? 'નવી નોકરી પોસ્ટ કરો' : 
                   'Post New Job'}
                </h3>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'नौकरी का शीर्षक' : language === 'gu' ? 'નોકરીનું શીર્ષક' : 'Job Title'}
                    </label>
                    <input
                      type="text"
                      value={jobData.title}
                      onChange={(e) => setJobData({...jobData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'जैसे: गेहूं की कटाई' : language === 'gu' ? 'જેવા કે: ઘઉંની લણણી' : 'e.g: Wheat Harvesting'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'hi' ? 'काम का प्रकार' : language === 'gu' ? 'કામનો પ્રકાર' : 'Work Type'}
                    </label>
                    <select
                      value={jobData.workType}
                      onChange={(e) => setJobData({...jobData, workType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">
                        {language === 'hi' ? 'चुनें' : language === 'gu' ? 'પસંદ કરો' : 'Select'}
                      </option>
                      <option value="harvesting">
                        {language === 'hi' ? 'कटाई' : language === 'gu' ? 'લણણી' : 'Harvesting'}
                      </option>
                      <option value="planting">
                        {language === 'hi' ? 'बुआई' : language === 'gu' ? 'વાવેતર' : 'Planting'}
                      </option>
                      <option value="general">
                        {language === 'hi' ? 'सामान्य खेती का काम' : language === 'gu' ? 'સામાન્ય ખેતીનું કામ' : 'General Farm Work'}
                      </option>
                      <option value="maintenance">
                        {language === 'hi' ? 'रखरखाव' : language === 'gu' ? 'જાળવણી' : 'Maintenance'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      {language === 'hi' ? 'स्थान' : language === 'gu' ? 'સ્થાન' : 'Location'}
                    </label>
                    <input
                      type="text"
                      value={jobData.location}
                      onChange={(e) => setJobData({...jobData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'शहर, राज्य' : language === 'gu' ? 'શહેર, રાજ્ય' : 'City, State'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-1" />
                      {language === 'hi' ? 'अवधि' : language === 'gu' ? 'અવધિ' : 'Duration'}
                    </label>
                    <input
                      type="text"
                      value={jobData.duration}
                      onChange={(e) => setJobData({...jobData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? 'जैसे: 2 सप्ताह' : language === 'gu' ? 'જેવા કે: 2 અઠવાડિયા' : 'e.g: 2 weeks'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign size={16} className="inline mr-1" />
                      {language === 'hi' ? 'वेतन दर' : language === 'gu' ? 'પગાર દર' : 'Pay Rate'}
                    </label>
                    <input
                      type="text"
                      value={jobData.payRate}
                      onChange={(e) => setJobData({...jobData, payRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder={language === 'hi' ? '₹500/दिन' : language === 'gu' ? '₹500/દિવસ' : '₹500/day'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users size={16} className="inline mr-1" />
                      {language === 'hi' ? 'मजदूरों की संख्या' : language === 'gu' ? 'કામદારોની સંખ્યા' : 'Number of Workers'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={jobData.workersNeeded}
                      onChange={(e) => setJobData({...jobData, workersNeeded: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'काम का विवरण' : language === 'gu' ? 'કામનું વર્ણન' : 'Job Description'}
                  </label>
                  <textarea
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={language === 'hi' ? 'काम के बारे में विस्तार से बताएं' : language === 'gu' ? 'કામ વિશે વિગતથી જણાવો' : 'Describe the work in detail'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'hi' ? 'आवश्यकताएं/कौशल' : language === 'gu' ? 'જરૂરિયાતો/કૌશલ્ય' : 'Requirements/Skills'}
                  </label>
                  <textarea
                    value={jobData.requirements}
                    onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={language === 'hi' ? 'जैसे: ट्रैक्टर चलाना, अनुभव आदि' : language === 'gu' ? 'જેવા કે: ટ્રેક્ટર ચલાવવું, અનુભવ વગેરે' : 'e.g: Tractor operation, experience etc'}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {language === 'hi' ? 'नौकरी पोस्ट करें' : language === 'gu' ? 'નોકરી પોસ્ટ કરો' : 'Post Job'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {language === 'hi' ? 'रद्द करें' : language === 'gu' ? 'રદ કરો' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Posted Jobs */}
      <div className="grid gap-6">
        {mockJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
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
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {job.applicants} {language === 'hi' ? 'आवेदन' : language === 'gu' ? 'અરજીઓ' : 'applicants'}
              </span>
              <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors">
                {language === 'hi' ? 'आवेदन देखें' : language === 'gu' ? 'અરજીઓ જુઓ' : 'View Applications'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindWorkersSection;