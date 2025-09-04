// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../data/mockData';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivities from '../components/dashboard/RecentActivities';
import QuickActions from '../components/dashboard/QuickActions';
import {
  BellIcon,
  CalendarDaysIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setAnnouncements(mockData.dashboard.announcements);
      
      // Mock upcoming events based on user role
      const mockEvents = [
        {
          id: 'evt1',
          title: user?.role === 'student' ? 'CS-301 Midterm Exam' : 'Faculty Meeting',
          date: '2025-09-05',
          time: user?.role === 'student' ? '10:00 AM' : '2:00 PM',
          type: user?.role === 'student' ? 'exam' : 'meeting',
          location: user?.role === 'student' ? 'CS Building 205' : 'Admin Conference Room'
        },
        {
          id: 'evt2',
          title: user?.role === 'admin' ? 'Budget Review Meeting' : user?.role === 'faculty' ? 'Office Hours' : 'Assignment Due: Data Structures',
          date: '2025-09-08',
          time: user?.role === 'admin' ? '9:00 AM' : user?.role === 'faculty' ? '2:00 PM' : '11:59 PM',
          type: user?.role === 'admin' ? 'meeting' : user?.role === 'faculty' ? 'office_hours' : 'assignment',
          location: user?.role === 'faculty' ? 'CS Building 301' : 'Online'
        }
      ];
      setUpcomingEvents(mockEvents);

      // Mock system alerts based on user role
      const mockAlerts = [];
      if (user?.role === 'admin') {
        mockAlerts.push(
          {
            id: 'alert1',
            type: 'warning',
            title: 'Server Maintenance Required',
            message: 'Database server needs maintenance this weekend',
            priority: 'medium'
          },
          {
            id: 'alert2',
            type: 'info',
            title: 'New Student Applications',
            message: '15 new applications pending review',
            priority: 'low'
          }
        );
      } else if (user?.role === 'faculty') {
        mockAlerts.push({
          id: 'alert1',
          type: 'warning',
          title: 'Grade Submission Deadline',
          message: 'Midterm grades due by Friday',
          priority: 'high'
        });
      } else if (user?.role === 'student') {
        mockAlerts.push({
          id: 'alert1',
          type: 'info',
          title: 'Registration Reminder',
          message: 'Course registration for Spring 2026 opens Monday',
          priority: 'medium'
        });
      }
      
      setSystemAlerts(mockAlerts);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
    return `Good ${timeOfDay}`;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Loading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {user?.name || 'User'}!
            </h1>
            <p className="text-blue-100 mt-1 capitalize">
              {user?.role} Dashboard - {user?.department}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-blue-100 text-sm">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`${getAlertBgColor(alert.type)} border rounded-lg p-4 flex items-start space-x-3`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                  <span className={getPriorityBadge(alert.priority)}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dashboard Statistics */}
      <DashboardStats userRole={user?.role} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Announcements */}
          {announcements.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
                  <BellIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="space-y-4">
                  {announcements.slice(0, 3).map((announcement) => {
                    const isRelevant = announcement.targetAudience.includes('all') || 
                                     announcement.targetAudience.includes(user?.role);
                    
                    if (!isRelevant) return null;

                    return (
                      <div
                        key={announcement.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          announcement.priority === 'high' 
                            ? 'border-red-500 bg-red-50' 
                            : announcement.priority === 'medium'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-blue-500 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {announcement.title}
                            </h4>
                            <p className="text-sm text-gray-700 mt-1">
                              {announcement.content}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              By {announcement.author} • {new Date(announcement.publishDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            announcement.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : announcement.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {announcement.priority}
                          </span>
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150">
                    View All Announcements →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <RecentActivities />

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="p-6 pt-4">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <ClockIcon className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150">
                    View Full Calendar →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-sm text-white p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-purple-100">Active Users</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-100">System Uptime</span>
                <span className="font-semibold">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-100">Data Processed</span>
                <span className="font-semibold">2.4TB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;