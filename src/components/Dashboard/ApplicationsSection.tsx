import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Eye, User, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ApplicationsSection: React.FC = () => {
  const { user, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const mockApplications = [
    {
      id: '1',
      type: user?.userType === 'farmer' ? 'received' : 'sent',
      jobTitle: 'Wheat Harvesting Work',
      applicantName: user?.userType === 'farmer' ? 'Ramesh Kumar' : 'Rajesh Farmer',
      location: 'Punjab, India',
      salary: '₹500/day',
      status: 'pending' as const,
      appliedAt: new Date('2025-01-15T10:30:00'),
      message: 'I have 5 years of experience in wheat harvesting and own transportation.',
      contactInfo: user?.userType === 'farmer' ? 'Will be revealed after acceptance' : 'Will be revealed after acceptance'
    },
    {
      id: '2',
      type: user?.userType === 'farmer' ? 'received' : 'sent',
      jobTitle: 'Vegetable Farm Maintenance',
      applicantName: user?.userType === 'farmer' ? 'Priya Sharma' : 'Suresh Patel',
      location: 'Gujarat, India',
      salary: '₹15000/month',
      status: 'accepted' as const,
      appliedAt: new Date('2025-01-14T15:45:00'),
      message: 'Experienced in vegetable farming with good references.',
      contactInfo: user?.userType === 'farmer' 
        ? 'Priya Sharma, +91 98765 43210, Village Anand, Gujarat'
        : 'Suresh Patel, +91 87654 32109, Ahmedabad, Gujarat'
    },
    {
      id: '3',
      type: user?.userType === 'farmer' ? 'received' : 'sent',
      jobTitle: 'Tomato Planting Work',
      applicantName: user?.userType === 'farmer' ? 'Amit Singh' : 'Ravi Farmer',
      location: 'Maharashtra, India',
      salary: '₹450/day',
      status: 'rejected' as const,
      appliedAt: new Date('2025-01-13T09:15:00'),
      message: 'Available for seasonal work with flexible timing.',
      contactInfo: 'Not available due to rejection'
    }
  ];

  const filteredApplications = mockApplications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return language === 'hi' ? 'अभी' : language === 'gu' ? 'હમણાં' : 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${language === 'hi' ? 'घंटे पहले' : language === 'gu' ? 'કલાક પહેલાં' : 'hours ago'}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${language === 'hi' ? 'दिन पहले' : language === 'gu' ? 'દિવસ પહેલાં' : 'days ago'}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'hi' ? 'आवेदन' : 
           language === 'gu' ? 'અરજીઓ' : 
           'Applications'}
        </h2>
        <div className="text-sm text-gray-600">
          {filteredApplications.length} {language === 'hi' ? 'आवेदन' : language === 'gu' ? 'અરજીઓ' : 'applications'}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: { en: 'All', hi: 'सभी', gu: 'બધું' } },
            { key: 'pending', label: { en: 'Pending', hi: 'लंबित', gu: 'બાકી' } },
            { key: 'accepted', label: { en: 'Accepted', hi: 'स्वीकृत', gu: 'સ્વીકૃત' } },
            { key: 'rejected', label: { en: 'Rejected', hi: 'अस्वीकृत', gu: 'નકારવામાં આવ્યું' } }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              {tab.label[language as keyof typeof tab.label]}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className={`bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md ${
              application.status === 'pending' ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{application.jobTitle}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(application.status)}
                      <span className="capitalize">{application.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {user?.userType === 'farmer' ? 'Applicant:' : 'Farmer:'} {application.applicantName}
                  </span>
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {application.location}
                  </span>
                  <span className="flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    {application.salary}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatTime(application.appliedAt)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{application.message}</p>

                {/* Contact Information */}
                {application.status === 'accepted' && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">
                      {language === 'hi' ? 'संपर्क जानकारी:' : language === 'gu' ? 'સંપર્ક માહિતી:' : 'Contact Information:'}
                    </h4>
                    <p className="text-green-700 text-sm">{application.contactInfo}</p>
                  </div>
                )}

                {application.status === 'pending' && application.contactInfo.includes('Will be revealed') && (
                  <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-700 text-sm">
                      {language === 'hi' ? 'संपर्क जानकारी स्वीकृति के बाद दिखाई जाएगी' : 
                       language === 'gu' ? 'સંપર્ક માહિતી સ્વીકૃતિ પછી દેખાશે' : 
                       'Contact information will be revealed after acceptance'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {user?.userType === 'farmer' && application.status === 'pending' && (
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  {language === 'hi' ? 'स्वीकार करें' : language === 'gu' ? 'સ્વીકારો' : 'Accept'}
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  {language === 'hi' ? 'अस्वीकार करें' : language === 'gu' ? 'નકારો' : 'Reject'}
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Eye size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">
              {language === 'hi' ? 'कोई आवेदन नहीं मिला' : 
               language === 'gu' ? 'કોઈ અરજી મળી નથી' : 
               'No applications found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsSection;