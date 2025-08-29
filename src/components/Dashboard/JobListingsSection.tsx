import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const JobListingsSection: React.FC = () => {
  const { language } = useApp();

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
        <div className="text-sm text-gray-600">
          {mockJobs.length} {language === 'hi' ? 'कुल नौकरियां' : language === 'gu' ? 'કુલ નોકરીઓ' : 'total jobs'}
        </div>
      </div>

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