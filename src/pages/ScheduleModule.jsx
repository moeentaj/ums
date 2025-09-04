// src/pages/ScheduleModule.jsx - Main Schedule Management Interface
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar,
  Clock, 
  ClipboardList,
  Home,
  Plus,
  Filter,
  Search,
  Download,
  Settings,
  ChevronRight
} from 'lucide-react';

// Import schedule components
import ClassSchedule from '../components/schedule/ClassSchedule';
import ExamSchedule from '../components/schedule/ExamSchedule';
import CampusEvents from '../components/schedule/CampusEvents';
import AcademicCalendar from '../components/schedule/AcademicCalendar';
import RoomBooking from '../components/schedule/RoomBooking';

const ScheduleModule = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [quickStats, setQuickStats] = useState({});

  // Mock data for quick stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuickStats({
        totalClasses: 45,
        upcomingExams: 8,
        campusEvents: 12,
        roomsBooked: 23,
        mySchedule: user?.role === 'student' ? 6 : user?.role === 'faculty' ? 4 : 15
      });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  // Determine active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/classes')) setActiveTab('classes');
    else if (path.includes('/exams')) setActiveTab('exams');
    else if (path.includes('/events')) setActiveTab('events');
    else if (path.includes('/calendar')) setActiveTab('calendar');
    else if (path.includes('/booking')) setActiveTab('booking');
    else setActiveTab('overview');
  }, [location]);

  const scheduleMenuItems = [
    {
      id: 'classes',
      name: 'Class Schedule',
      path: '/schedule/classes',
      icon: Calendar,
      description: 'View and manage class schedules',
      permission: 'schedule',
      color: 'blue',
      stats: quickStats.totalClasses
    },
    {
      id: 'exams',
      name: 'Examination Schedule',
      path: '/schedule/exams',
      icon: ClipboardList,
      description: 'Exam timetables and arrangements',
      permission: 'schedule',
      color: 'red',
      stats: quickStats.upcomingExams
    },
    {
      id: 'events',
      name: 'Campus Events',
      path: '/schedule/events',
      icon: Calendar,
      description: 'University events and activities',
      permission: 'schedule',
      color: 'green',
      stats: quickStats.campusEvents
    },
    {
      id: 'calendar',
      name: 'Academic Calendar',
      path: '/schedule/calendar',
      icon: Calendar,
      description: 'Important academic dates',
      permission: 'schedule',
      color: 'purple',
      stats: null
    },
    {
      id: 'booking',
      name: 'Room Booking',
      path: '/schedule/booking',
      icon: Home,
      description: 'Reserve rooms and facilities',
      permission: user?.role === 'admin' ? 'all' : 'schedule',
      color: 'yellow',
      stats: quickStats.roomsBooked
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
      red: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
      green: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      blue: 'text-blue-600',
      red: 'text-red-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-event':
        navigate('/schedule/events');
        break;
      case 'book-room':
        navigate('/schedule/booking');
        break;
      case 'view-calendar':
        navigate('/schedule/calendar');
        break;
      case 'export-schedule':
        // Mock export functionality
        alert('Schedule export feature coming soon!');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
          <p className="text-gray-600 mt-1">
            Manage classes, exams, events, and room bookings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleQuickAction('export-schedule')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Routes for specific components */}
      <Routes>
        <Route path="classes/*" element={<ClassSchedule />} />
        <Route path="exams/*" element={<ExamSchedule />} />
        <Route path="events/*" element={<CampusEvents />} />
        <Route path="calendar/*" element={<AcademicCalendar />} />
        <Route path="booking/*" element={<RoomBooking />} />
        <Route path="*" element={
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">My Schedule Items</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.mySchedule}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <span>Active this week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Exams</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.upcomingExams}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ClipboardList className="text-red-600" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-red-600">
                  <span>Next 2 weeks</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Campus Events</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.campusEvents}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <span>This month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Room Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{quickStats.roomsBooked}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Home className="text-yellow-600" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-yellow-600">
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {hasPermission('schedule') && (
                  <button
                    onClick={() => handleQuickAction('new-event')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 flex flex-col items-center space-y-2"
                  >
                    <Plus className="text-gray-400" size={24} />
                    <span className="text-sm text-gray-600">Create Event</span>
                  </button>
                )}
                <button
                  onClick={() => handleQuickAction('book-room')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors duration-200 flex flex-col items-center space-y-2"
                >
                  <Home className="text-gray-400" size={24} />
                  <span className="text-sm text-gray-600">Book Room</span>
                </button>
                <button
                  onClick={() => handleQuickAction('view-calendar')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors duration-200 flex flex-col items-center space-y-2"
                >
                  <Calendar className="text-gray-400" size={24} />
                  <span className="text-sm text-gray-600">View Calendar</span>
                </button>
                <button
                  onClick={() => handleQuickAction('export-schedule')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors duration-200 flex flex-col items-center space-y-2"
                >
                  <Download className="text-gray-400" size={24} />
                  <span className="text-sm text-gray-600">Export Data</span>
                </button>
              </div>
            </div>

            {/* Schedule Menu Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheduleMenuItems
                .filter(item => hasPermission(item.permission))
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => navigate(item.path)}
                      className={`${getColorClasses(item.color)} border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm`}>
                          <Icon className={getIconColorClasses(item.color)} size={24} />
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.stats && (
                            <span className="px-2 py-1 bg-white rounded-full text-sm font-medium">
                              {item.stats}
                            </span>
                          )}
                          <ChevronRight size={20} />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm opacity-80">{item.description}</p>
                    </div>
                  );
                })}
            </div>

            {/* Recent Schedule Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Schedule Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Calendar className="text-white" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Class schedule updated</p>
                    <p className="text-xs text-gray-500">CS-301 moved to Room 205 - 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <ClipboardList className="text-white" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Exam scheduled</p>
                    <p className="text-xs text-gray-500">Midterm exam for BUS-201 - 1 day ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Home className="text-white" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Room booking confirmed</p>
                    <p className="text-xs text-gray-500">Conference Room A - 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
};

export default ScheduleModule;