import React from 'react';
import { Users, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const HomeSection: React.FC = () => {
  const { user } = useApp();

  const farmerStats = [
    {
      title: 'Active Jobs',
      value: '5',
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Applications',
      value: '23',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Monthly Earnings',
      value: '₹45,000',
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+15%'
    },
    {
      title: 'Equipment Lease',
      value: '₹12,000',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    }
  ];

  const workerStats = [
    {
      title: 'Jobs Completed',
      value: '18',
      icon: Briefcase,
      color: 'bg-blue-500',
      change: '+22%'
    },
    {
      title: 'Total Earnings',
      value: '₹28,500',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: 'Average Rating',
      value: '4.8/5',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      change: '+0.2'
    },
    {
      title: 'This Month Jobs',
      value: '6',
      icon: Users,
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
        'New application for wheat harvesting' :
        'Wheat harvesting job completed',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: user?.userType === 'farmer' ? 'equipment' : 'application',
      title: user?.userType === 'farmer' ? 
        'Tractor leased out successfully' :
        'Applied for vegetable farm work',
      time: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      time: '3 days ago',
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-green-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-green-100">
          {user?.userType === 'farmer' ? 
            'You have received 3 new applications today.' :
            'You have 5 new job opportunities today.'
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
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
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {user?.userType === 'farmer' ? (
              <>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  Post New Job
                </button>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  Add Equipment
                </button>
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  View Applications
                </button>
              </>
            ) : (
              <>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  Search New Jobs
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  Update Profile
                </button>
                <button className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 px-4 rounded-lg font-medium transition-colors text-left">
                  View My Applications
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;