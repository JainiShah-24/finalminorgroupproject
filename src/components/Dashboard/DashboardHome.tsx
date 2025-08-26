import React from 'react';
import { Users, Briefcase, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DashboardHome: React.FC = () => {
  const { user, language } = useApp();

  const farmerStats = [
    {
      title: language === 'hi' ? 'सक्रिय नौकरियां' : language === 'gu' ? 'સક્રિય નોકરીઓ' : 'Active Jobs',
      value: '5',
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: language === 'hi' ? 'कुल आवेदन' : language === 'gu' ? 'કુલ અરજીઓ' : 'Total Applications',
      value: '23',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: language === 'hi' ? 'मासिक आय' : language === 'gu' ? 'માસિક આવક' : 'Monthly Earnings',
      value: '₹45,000',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%'
    },
    {
      title: language === 'hi' ? 'उपकरण किराया' : language === 'gu' ? 'સાધન ભાડું' : 'Equipment Lease',
      value: '₹12,000',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    }
  ];

  const workerStats = [
    {
      title: language === 'hi' ? 'काम पूरे किए' : language === 'gu' ? 'કામ પૂર્ણ કર્યા' : 'Jobs Completed',
      value: '18',
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+22%'
    },
    {
      title: language === 'hi' ? 'कुल कमाई' : language === 'gu' ? 'કુલ કમાણી' : 'Total Earnings',
      value: '₹28,500',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: language === 'hi' ? 'औसत रेटिंग' : language === 'gu' ? 'સરેરાશ રેટિંગ' : 'Average Rating',
      value: '4.8/5',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      change: '+0.2'
    },
    {
      title: language === 'hi' ? 'इस महीने के काम' : language === 'gu' ? 'આ મહિનાનું કામ' : 'This Month Jobs',
      value: '6',
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+3'
    }
  ];

  const stats = user?.userType === 'farmer' ? farmerStats : workerStats;

  const recentActivities = [
    {
      id: 1,
      type: user?.userType === 'farmer' ? 'application' : 'job',
      title: user?.userType === 'farmer' ? 
        (language === 'hi' ? 'गेहूं की कटाई के लिए नया आवेदन' : language === 'gu' ? 'ઘઉંની લણણી માટે નવી અરજી' : 'New application for wheat harvesting') :
        (language === 'hi' ? 'गेहूं की कटाई का काम पूरा' : language === 'gu' ? 'ઘઉંની લણણીનું કામ પૂર્ણ' : 'Wheat harvesting job completed'),
      time: language === 'hi' ? '2 घंटे पहले' : language === 'gu' ? '2 કલાક પહેલાં' : '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: user?.userType === 'farmer' ? 'equipment' : 'application',
      title: user?.userType === 'farmer' ? 
        (language === 'hi' ? 'ट्रैक्टर को किराए पर दिया गया' : language === 'gu' ? 'ટ્રેક્ટર ભાડે આપ્યું' : 'Tractor leased out successfully') :
        (language === 'hi' ? 'सब्जी के खेत के काम के लिए आवेदन किया' : language === 'gu' ? 'શાકભાજીના ખેતના કામ માટે અરજી કરી' : 'Applied for vegetable farm work'),
      time: language === 'hi' ? '1 दिन पहले' : language === 'gu' ? '1 દિવસ પહેલાં' : '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'payment',
      title: language === 'hi' ? 'भुगतान प्राप्त हुआ' : language === 'gu' ? 'ચુકવણી પ્રાપ્ત થઈ' : 'Payment received',
      time: language === 'hi' ? '3 दिन पहले' : language === 'gu' ? '3 દિવસ પહેલાં' : '3 days ago',
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'hi' ? 'नमस्कार' : language === 'gu' ? 'નમસ્કાર' : 'Welcome'}, {user?.name}!
        </h1>
        <p className="text-green-100">
          {user?.userType === 'farmer' ? 
            (language === 'hi' ? 'आज आपको 3 नए आवेदन मिले हैं।' : 
             language === 'gu' ? 'આજે તમને 3 નવી અરજીઓ મળી છે.' : 
             'You have received 3 new applications today.') :
            (language === 'hi' ? 'आज आपके लिए 5 नए काम उपलब्ध हैं।' : 
             language === 'gu' ? 'આજે તમારા માટે 5 નવા કામ ઉપલબ્ધ છે.' : 
             'You have 5 new job opportunities today.')
          }
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {language === 'hi' ? 'हाल की गतिविधि' : language === 'gu' ? 'તાજેતરની પ્રવૃત્તિ' : 'Recent Activity'}
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {language === 'hi' ? 'त्वरित कार्य' : language === 'gu' ? 'ઝડપી ક્રિયાઓ' : 'Quick Actions'}
          </h2>
          <div className="space-y-3">
            {user?.userType === 'farmer' ? (
              <>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'नई नौकरी पोस्ट करें' : language === 'gu' ? 'નવી નોકરી પોસ્ટ કરો' : 'Post New Job'}
                </button>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'उपकरण जोड़ें' : language === 'gu' ? 'સાધન ઉમેરો' : 'Add Equipment'}
                </button>
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'आवेदन देखें' : language === 'gu' ? 'અરજીઓ જુઓ' : 'View Applications'}
                </button>
              </>
            ) : (
              <>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'नए काम खोजें' : language === 'gu' ? 'નવા કામ શોધો' : 'Search New Jobs'}
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'प्रोफाइल अपडेट करें' : language === 'gu' ? 'પ્રોફાઇલ અપડેટ કરો' : 'Update Profile'}
                </button>
                <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  {language === 'hi' ? 'अपने आवेदन देखें' : language === 'gu' ? 'તમારી અરજીઓ જુઓ' : 'View My Applications'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;