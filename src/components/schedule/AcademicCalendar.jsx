// src/components/schedule/AcademicCalendar.jsx - Academic Calendar Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Coffee,
  Sun,
  Snowflake,
  Leaf,
  Search,
  Filter,
  Download,
  Eye,
  Plus,
  Edit
} from 'lucide-react';

const AcademicCalendar = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, year, list
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [academicEvents, setAcademicEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock academic calendar data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockEvents = [
        // Fall 2025 Semester
        {
          id: 'AC001',
          title: 'Fall 2025 Semester Begins',
          date: '2025-08-25',
          endDate: null,
          type: 'semester_start',
          description: 'First day of classes for Fall 2025 semester',
          category: 'Academic',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC002',
          title: 'Add/Drop Deadline',
          date: '2025-09-06',
          endDate: null,
          type: 'deadline',
          description: 'Last day to add or drop classes without penalty',
          category: 'Registration',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC003',
          title: 'Labor Day Holiday',
          date: '2025-09-01',
          endDate: null,
          type: 'holiday',
          description: 'University closed - No classes',
          category: 'Holiday',
          importance: 'medium',
          semester: 'Fall 2025'
        },
        {
          id: 'AC004',
          title: 'Midterm Exams',
          date: '2025-10-13',
          endDate: '2025-10-17',
          type: 'exam_period',
          description: 'Midterm examination period',
          category: 'Exams',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC005',
          title: 'Fall Break',
          date: '2025-10-20',
          endDate: '2025-10-24',
          type: 'break',
          description: 'Fall recess - No classes',
          category: 'Break',
          importance: 'medium',
          semester: 'Fall 2025'
        },
        {
          id: 'AC006',
          title: 'Spring 2026 Registration Opens',
          date: '2025-11-01',
          endDate: null,
          type: 'registration',
          description: 'Registration for Spring 2026 semester begins',
          category: 'Registration',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC007',
          title: 'Thanksgiving Break',
          date: '2025-11-27',
          endDate: '2025-11-30',
          type: 'break',
          description: 'Thanksgiving holiday break',
          category: 'Holiday',
          importance: 'medium',
          semester: 'Fall 2025'
        },
        {
          id: 'AC008',
          title: 'Final Exams',
          date: '2025-12-08',
          endDate: '2025-12-15',
          type: 'exam_period',
          description: 'Final examination period',
          category: 'Exams',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC009',
          title: 'Fall 2025 Semester Ends',
          date: '2025-12-15',
          endDate: null,
          type: 'semester_end',
          description: 'Last day of Fall 2025 semester',
          category: 'Academic',
          importance: 'high',
          semester: 'Fall 2025'
        },
        {
          id: 'AC010',
          title: 'Winter Graduation',
          date: '2025-12-20',
          endDate: null,
          type: 'graduation',
          description: 'Winter commencement ceremony',
          category: 'Graduation',
          importance: 'high',
          semester: 'Fall 2025'
        },

        // Spring 2026 Semester
        {
          id: 'AC011',
          title: 'Spring 2026 Semester Begins',
          date: '2026-01-15',
          endDate: null,
          type: 'semester_start',
          description: 'First day of classes for Spring 2026 semester',
          category: 'Academic',
          importance: 'high',
          semester: 'Spring 2026'
        },
        {
          id: 'AC012',
          title: 'Martin Luther King Jr. Day',
          date: '2026-01-19',
          endDate: null,
          type: 'holiday',
          description: 'University closed - No classes',
          category: 'Holiday',
          importance: 'medium',
          semester: 'Spring 2026'
        },
        {
          id: 'AC013',
          title: 'Spring Break',
          date: '2026-03-09',
          endDate: '2026-03-13',
          type: 'break',
          description: 'Spring recess - No classes',
          category: 'Break',
          importance: 'medium',
          semester: 'Spring 2026'
        },
        {
          id: 'AC014',
          title: 'Spring Graduation',
          date: '2026-05-15',
          endDate: null,
          type: 'graduation',
          description: 'Spring commencement ceremony',
          category: 'Graduation',
          importance: 'high',
          semester: 'Spring 2026'
        }
      ];

      setAcademicEvents(mockEvents);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = academicEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getEventIcon = (type) => {
    const iconMap = {
      semester_start: BookOpen,
      semester_end: BookOpen,
      exam_period: Clock,
      break: Coffee,
      holiday: Sun,
      graduation: GraduationCap,
      deadline: AlertTriangle,
      registration: Calendar
    };
    return iconMap[type] || Calendar;
  };

  const getEventColor = (type, importance) => {
    if (importance === 'high') {
      return 'bg-red-100 border-red-300 text-red-800';
    } else if (importance === 'medium') {
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      semester_start: 'bg-green-100 text-green-800',
      semester_end: 'bg-red-100 text-red-800',
      exam_period: 'bg-purple-100 text-purple-800',
      break: 'bg-blue-100 text-blue-800',
      holiday: 'bg-yellow-100 text-yellow-800',
      graduation: 'bg-indigo-100 text-indigo-800',
      deadline: 'bg-orange-100 text-orange-800',
      registration: 'bg-teal-100 text-teal-800'
    };
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => {
      if (event.endDate) {
        return dateStr >= event.date && dateStr <= event.endDate;
      }
      return event.date === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarHeader = () => {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const weeks = [];
    const currentWeek = [];
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayEvents = getEventsForDate(date);
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      const isToday = date.toDateString() === new Date().toDateString();
      
      currentWeek.push({
        date,
        events: dayEvents,
        isCurrentMonth,
        isToday
      });
      
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek.length = 0;
      }
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {renderCalendarHeader()}
        
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`min-h-24 p-2 border-r border-b border-gray-100 ${
                  !day.isCurrentMonth ? 'bg-gray-50' : ''
                } ${day.isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm ${
                  !day.isCurrentMonth ? 'text-gray-400' : 
                  day.isToday ? 'text-blue-600 font-semibold' : 'text-gray-900'
                }`}>
                  {day.date.getDate()}
                </div>
                
                <div className="mt-1 space-y-1">
                  {day.events.slice(0, 2).map((event) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowModal(true);
                        }}
                        className={`px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getEventColor(event.type, event.importance)} border`}
                      >
                        <div className="flex items-center">
                          <Icon size={10} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    );
                  })}
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return (
      <div className="space-y-4">
        {sortedEvents.map((event) => {
          const Icon = getEventIcon(event.type);
          const isUpcoming = new Date(event.date) >= new Date();
          
          return (
            <div
              key={event.id}
              className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                !isUpcoming ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEventColor(event.type, event.importance)} border`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {event.importance === 'high' && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Important
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {formatDate(event.date)}
                          {event.endDate && ` - ${formatDate(event.endDate)}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{getDaysUntil(event.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowModal(true);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  {hasPermission('schedule') && user?.role === 'admin' && (
                    <button
                      className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                      title="Edit Event"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Academic Calendar</h2>
          <p className="text-gray-600 mt-1">
            Important academic dates and deadlines
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasPermission('schedule') && user?.role === 'admin' && (
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <Plus size={16} />
              <span>Add Date</span>
            </button>
          )}
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Semester</p>
              <p className="text-xl font-bold text-blue-600">Fall 2025</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Leaf className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Days Until Finals</p>
              <p className="text-xl font-bold text-red-600">
                {getDaysUntil('2025-12-08').replace(' days', '')}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Break</p>
              <p className="text-xl font-bold text-green-600">Fall Break</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Coffee className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {formatShortDate('2025-10-20')} - {formatShortDate('2025-10-24')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Graduation</p>
              <p className="text-xl font-bold text-purple-600">Winter</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {formatShortDate('2025-12-20')}
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search calendar events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="semester_start">Semester Start</option>
              <option value="semester_end">Semester End</option>
              <option value="exam_period">Exams</option>
              <option value="break">Breaks</option>
              <option value="holiday">Holidays</option>
              <option value="graduation">Graduation</option>
              <option value="deadline">Deadlines</option>
              <option value="registration">Registration</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      {viewMode === 'month' ? renderMonthView() : renderListView()}

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEventColor(selectedEvent.type, selectedEvent.importance)} border`}>
                    {React.createElement(getEventIcon(selectedEvent.type), { size: 20 })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedEvent.type)}`}>
                        {selectedEvent.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        selectedEvent.importance === 'high' ? 'bg-red-100 text-red-800' : 
                        selectedEvent.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedEvent.importance === 'high' ? 'High Priority' : 
                         selectedEvent.importance === 'medium' ? 'Medium Priority' : 
                         'Normal Priority'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">{selectedEvent.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="text-gray-900">
                      {formatDate(selectedEvent.date)}
                      {selectedEvent.endDate && (
                        <div className="text-sm text-gray-600 mt-1">
                          Ends: {formatDate(selectedEvent.endDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Until</label>
                    <div className="text-gray-900">{getDaysUntil(selectedEvent.date)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="text-gray-900">{selectedEvent.category}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                    <div className="text-gray-900">{selectedEvent.semester}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                {hasPermission('schedule') && user?.role === 'admin' && (
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    Edit Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;