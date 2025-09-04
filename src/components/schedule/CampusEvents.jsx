// src/components/schedule/CampusEvents.jsx - Campus Events Management Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  Clock, 
  MapPin,
  Users,
  Tag,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

const CampusEvents = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, calendar
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view, add, edit
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});

  // Mock events data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockEvents = [
        {
          id: 'EVT001',
          title: 'Fall 2025 Orientation',
          description: 'Welcome new students to the university with campus tours, information sessions, and social activities.',
          category: 'Academic',
          type: 'University Event',
          date: '2025-09-10',
          startTime: '09:00',
          endTime: '17:00',
          location: 'Main Campus Quad',
          organizer: 'Student Affairs Office',
          organizerId: 'ORG001',
          capacity: 500,
          registered: 324,
          price: 0,
          status: 'Published',
          featured: true,
          tags: ['Orientation', 'Students', 'Campus Life'],
          image: null,
          registrationRequired: true,
          registrationDeadline: '2025-09-08',
          contactEmail: 'events@university.edu',
          contactPhone: '+1-555-0100'
        },
        {
          id: 'EVT002',
          title: 'Computer Science Career Fair',
          description: 'Connect with top tech companies and explore career opportunities in computer science and related fields.',
          category: 'Career',
          type: 'Career Event',
          date: '2025-10-05',
          startTime: '10:00',
          endTime: '16:00',
          location: 'CS Building Atrium',
          organizer: 'CS Department',
          organizerId: 'DEPT001',
          capacity: 200,
          registered: 156,
          price: 0,
          status: 'Published',
          featured: true,
          tags: ['Career', 'Technology', 'Networking'],
          image: null,
          registrationRequired: true,
          registrationDeadline: '2025-10-03',
          contactEmail: 'cs-events@university.edu',
          contactPhone: '+1-555-0101'
        },
        {
          id: 'EVT003',
          title: 'Annual Research Symposium',
          description: 'Showcase of student and faculty research across all departments with presentations and poster sessions.',
          category: 'Research',
          type: 'Academic Conference',
          date: '2025-11-15',
          startTime: '08:00',
          endTime: '18:00',
          location: 'University Conference Center',
          organizer: 'Graduate School',
          organizerId: 'GRAD001',
          capacity: 300,
          registered: 89,
          price: 25,
          status: 'Published',
          featured: false,
          tags: ['Research', 'Academic', 'Conference'],
          image: null,
          registrationRequired: true,
          registrationDeadline: '2025-11-10',
          contactEmail: 'research@university.edu',
          contactPhone: '+1-555-0102'
        },
        {
          id: 'EVT004',
          title: 'Spring Festival 2025',
          description: 'Annual spring celebration with live music, food vendors, games, and activities for the entire campus community.',
          category: 'Social',
          type: 'Campus Festival',
          date: '2025-04-20',
          startTime: '12:00',
          endTime: '20:00',
          location: 'Central Park Area',
          organizer: 'Student Union',
          organizerId: 'STU001',
          capacity: 1000,
          registered: 0,
          price: 0,
          status: 'Draft',
          featured: false,
          tags: ['Festival', 'Music', 'Community'],
          image: null,
          registrationRequired: false,
          registrationDeadline: null,
          contactEmail: 'studentunion@university.edu',
          contactPhone: '+1-555-0103'
        },
        {
          id: 'EVT005',
          title: 'Alumni Homecoming Weekend',
          description: 'Welcome back alumni with campus tours, networking events, sports activities, and reunion dinners.',
          category: 'Alumni',
          type: 'Alumni Event',
          date: '2025-10-25',
          startTime: '09:00',
          endTime: '22:00',
          location: 'Multiple Campus Locations',
          organizer: 'Alumni Relations',
          organizerId: 'ALUM001',
          capacity: 800,
          registered: 267,
          price: 50,
          status: 'Published',
          featured: true,
          tags: ['Alumni', 'Networking', 'Reunion'],
          image: null,
          registrationRequired: true,
          registrationDeadline: '2025-10-20',
          contactEmail: 'alumni@university.edu',
          contactPhone: '+1-555-0104'
        },
        {
          id: 'EVT006',
          title: 'Guest Lecture: AI and the Future',
          description: 'Distinguished speaker Dr. Jane Smith will discuss the future of artificial intelligence and its impact on society.',
          category: 'Academic',
          type: 'Guest Lecture',
          date: '2025-09-25',
          startTime: '14:00',
          endTime: '15:30',
          location: 'Main Auditorium',
          organizer: 'CS Department',
          organizerId: 'DEPT001',
          capacity: 400,
          registered: 398,
          price: 0,
          status: 'Published',
          featured: false,
          tags: ['AI', 'Technology', 'Lecture'],
          image: null,
          registrationRequired: true,
          registrationDeadline: '2025-09-23',
          contactEmail: 'lectures@university.edu',
          contactPhone: '+1-555-0105'
        }
      ];

      const eventCategories = [
        'Academic', 'Career', 'Research', 'Social', 'Alumni', 'Sports', 'Arts', 'Community'
      ];

      setEventsData(mockEvents);
      setCategories(eventCategories);

      // Calculate stats
      const upcoming = mockEvents.filter(event => new Date(event.date) > new Date() && event.status === 'Published').length;
      const thisWeek = mockEvents.filter(event => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return eventDate >= now && eventDate <= weekFromNow && event.status === 'Published';
      }).length;
      const featured = mockEvents.filter(event => event.featured && event.status === 'Published').length;
      const totalRegistrations = mockEvents.reduce((sum, event) => sum + event.registered, 0);

      setStats({ upcoming, thisWeek, featured, totalRegistrations });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || event.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setModalMode('add');
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800',
      'Career': 'bg-purple-100 text-purple-800',
      'Research': 'bg-indigo-100 text-indigo-800',
      'Social': 'bg-pink-100 text-pink-800',
      'Alumni': 'bg-orange-100 text-orange-800',
      'Sports': 'bg-green-100 text-green-800',
      'Arts': 'bg-red-100 text-red-800',
      'Community': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {event.featured && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs font-medium text-white">
                <Star className="inline mr-1" size={12} />
                Featured Event
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{event.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2 text-gray-400" />
                  <span>{formatDate(event.date)}</span>
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                    {getDaysUntilEvent(event.date)}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-2 text-gray-400" />
                  <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2 text-gray-400" />
                  <span className="truncate">{event.location}</span>
                </div>
                
                {event.registrationRequired && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={14} className="mr-2 text-gray-400" />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                {event.price > 0 && (
                  <span className="text-sm font-medium text-gray-900">${event.price}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewEvent(event)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  {hasPermission('schedule') && (
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                      title="Edit Event"
                    >
                      <Edit size={16} />
                    </button>
                  )}
                  <button
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                    title="Share Event"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
                
                {event.registrationRequired && new Date(event.date) > new Date() && (
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Registration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-start">
                      {event.featured && (
                        <Star className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{event.type}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(event.date)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getDaysUntilEvent(event.date)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={14} className="text-gray-400 mr-1" />
                      {event.location}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {event.organizer}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {event.registrationRequired ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {event.registered}/{event.capacity}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                        {event.price > 0 && (
                          <div className="text-xs text-gray-600 mt-1">${event.price}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not required</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewEvent(event)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {hasPermission('schedule') && (
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit Event"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No events found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Campus Events</h2>
          <p className="text-gray-600 mt-1">
            Discover and manage university events and activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasPermission('schedule') && (
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Create Event</span>
            </button>
          )}
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-green-600">{stats.upcoming}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Published events</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">{stats.thisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Next 7 days</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured Events</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Highlighted events</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Registrations</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalRegistrations}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>All events</span>
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
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

      {/* Events Content */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {/* Event Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === 'add' ? 'Create New Event' : 
                   modalMode === 'edit' ? 'Edit Event' : 'Event Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {selectedEvent && modalMode === 'view' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedEvent.category)}`}>
                          {selectedEvent.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                          {selectedEvent.status}
                        </span>
                        {selectedEvent.featured && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center">
                            <Star size={12} className="mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700">{selectedEvent.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="mr-3 text-gray-400" size={20} />
                        <div>
                          <div className="font-medium">{formatDate(selectedEvent.date)}</div>
                          <div className="text-sm text-gray-500">{getDaysUntilEvent(selectedEvent.date)}</div>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <Clock className="mr-3 text-gray-400" size={20} />
                        <span>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <MapPin className="mr-3 text-gray-400" size={20} />
                        <span>{selectedEvent.location}</span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <User className="mr-3 text-gray-400" size={20} />
                        <span>{selectedEvent.organizer}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedEvent.registrationRequired && (
                        <div>
                          <div className="flex items-center text-gray-700 mb-2">
                            <Users className="mr-3 text-gray-400" size={20} />
                            <span>Registration: {selectedEvent.registered} / {selectedEvent.capacity}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {selectedEvent.price > 0 && (
                        <div className="text-gray-700">
                          <span className="font-medium">Price: ${selectedEvent.price}</span>
                        </div>
                      )}

                      {selectedEvent.registrationDeadline && (
                        <div className="text-gray-700">
                          <span className="font-medium">Registration Deadline: </span>
                          <span>{formatDate(selectedEvent.registrationDeadline)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            <Tag size={12} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Email: {selectedEvent.contactEmail}</p>
                      <p>Phone: {selectedEvent.contactPhone}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                {modalMode === 'view' && hasPermission('schedule') && (
                  <button
                    onClick={() => setModalMode('edit')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Edit Event
                  </button>
                )}
                {selectedEvent && selectedEvent.registrationRequired && new Date(selectedEvent.date) > new Date() && (
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Register for Event
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

export default CampusEvents;