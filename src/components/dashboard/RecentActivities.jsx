// src/components/dashboard/RecentActivities.jsx - Fixed with Lucide Icons
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import { 
  UserPlus, 
  GraduationCap, 
  CreditCard, 
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const RecentActivities = () => {
  const { user, hasPermission } = useAuth();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setActivities(mockData.dashboard.recentActivities);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter activities based on user role and filter type
    let filtered = activities;

    // Role-based filtering
    if (user?.role === 'student') {
      // Students see activities related to them or general activities
      filtered = filtered.filter(activity => 
        activity.type === 'grade' || 
        activity.type === 'payment' || 
        activity.user === user.name ||
        activity.type === 'enrollment'
      );
    } else if (user?.role === 'faculty') {
      // Faculty see academic and system activities
      filtered = filtered.filter(activity => 
        activity.type === 'grade' || 
        activity.type === 'enrollment' || 
        activity.user === user.name ||
        activity.type === 'maintenance'
      );
    }
    // Admin sees all activities by default

    // Type filtering
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType);
    }

    setFilteredActivities(filtered);
  }, [activities, filterType, user]);

  const getActivityIcon = (type, status) => {
    const iconClass = "h-5 w-5";
    
    switch (type) {
      case 'enrollment':
        return <UserPlus className={`${iconClass} text-blue-500`} />;
      case 'grade':
        return <GraduationCap className={`${iconClass} text-green-500`} />;
      case 'payment':
        return <CreditCard className={`${iconClass} text-purple-500`} />;
      case 'maintenance':
        return <Wrench className={`${iconClass} text-orange-500`} />;
      default:
        return <Info className={`${iconClass} text-gray-500`} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    
    return activityTime.toLocaleDateString();
  };

  const handleActivityClick = (activity) => {
    // Handle navigation to related page based on activity type
    console.log('Navigate to activity:', activity);
    // In a real app, you would use navigate() from react-router-dom
    // navigate(`/${activity.type}/${activity.id}`);
  };

  const getFilterOptions = () => {
    const baseOptions = [
      { value: 'all', label: 'All Activities', count: activities.length }
    ];

    const typeOptions = [];
    
    if (hasPermission('students') || user?.role === 'admin') {
      typeOptions.push({ 
        value: 'enrollment', 
        label: 'Enrollments', 
        count: activities.filter(a => a.type === 'enrollment').length 
      });
    }
    
    if (hasPermission('academics') || hasPermission('schedule')) {
      typeOptions.push({ 
        value: 'grade', 
        label: 'Grades', 
        count: activities.filter(a => a.type === 'grade').length 
      });
    }
    
    if (hasPermission('financial') || user?.role === 'student') {
      typeOptions.push({ 
        value: 'payment', 
        label: 'Payments', 
        count: activities.filter(a => a.type === 'payment').length 
      });
    }
    
    if (hasPermission('infrastructure') || user?.role === 'admin') {
      typeOptions.push({ 
        value: 'maintenance', 
        label: 'Maintenance', 
        count: activities.filter(a => a.type === 'maintenance').length 
      });
    }

    return [...baseOptions, ...typeOptions];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {getFilterOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-6 pt-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <Info className="mx-auto h-12 w-12 text-gray-400" />
            <h4 className="mt-2 text-sm font-medium text-gray-900">No activities found</h4>
            <p className="mt-1 text-sm text-gray-500">
              {filterType === 'all' 
                ? 'No recent activities to display.' 
                : `No ${filterType} activities found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150 border border-transparent hover:border-gray-200"
              >
                {/* Activity Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          by {activity.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusIcon(activity.status)}
                      <span className={getStatusBadge(activity.status)}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredActivities.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150">
            View All Activities →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;