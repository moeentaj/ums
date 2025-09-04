// src/components/schedule/ClassSchedule.jsx - Complete Class Schedule Management Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar,
  Clock, 
  MapPin,
  User,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Download
} from 'lucide-react';

const ClassSchedule = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // week, day, list
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view, add, edit
  const [selectedClass, setSelectedClass] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  // Mock class schedule data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockSchedule = [
        {
          id: 'CLS001',
          courseCode: 'CS-301',
          courseName: 'Data Structures and Algorithms',
          instructor: 'Dr. Sarah Wilson',
          instructorId: 'FAC001',
          days: ['Monday', 'Wednesday', 'Friday'],
          startTime: '10:00',
          endTime: '11:00',
          duration: 60,
          classroom: 'CS Building 205',
          capacity: 80,
          enrolled: 75,
          semester: 'Fall 2025',
          status: 'Active',
          color: 'blue',
          credits: 3,
          type: 'Lecture'
        },
        {
          id: 'CLS002',
          courseCode: 'CS-301L',
          courseName: 'Data Structures Lab',
          instructor: 'Dr. Sarah Wilson',
          instructorId: 'FAC001',
          days: ['Tuesday'],
          startTime: '14:00',
          endTime: '16:00',
          duration: 120,
          classroom: 'CS Building 301',
          capacity: 30,
          enrolled: 25,
          semester: 'Fall 2025',
          status: 'Active',
          color: 'green',
          credits: 1,
          type: 'Laboratory'
        },
        {
          id: 'CLS003',
          courseCode: 'BUS-201',
          courseName: 'Business Management Fundamentals',
          instructor: 'Prof. Michael Brown',
          instructorId: 'FAC002',
          days: ['Monday', 'Wednesday'],
          startTime: '13:00',
          endTime: '14:30',
          duration: 90,
          classroom: 'Business Building 150',
          capacity: 120,
          enrolled: 108,
          semester: 'Fall 2025',
          status: 'Active',
          color: 'purple',
          credits: 3,
          type: 'Lecture'
        },
        {
          id: 'CLS004',
          courseCode: 'ENG-201',
          courseName: 'Technical Writing',
          instructor: 'Prof. Jennifer Lee',
          instructorId: 'FAC004',
          days: ['Tuesday', 'Thursday'],
          startTime: '11:00',
          endTime: '12:30',
          duration: 90,
          classroom: 'English Building 102',
          capacity: 35,
          enrolled: 32,
          semester: 'Fall 2025',
          status: 'Active',
          color: 'red',
          credits: 3,
          type: 'Lecture'
        }
      ];

      // Filter based on user role
      let filteredSchedule = mockSchedule;
      if (user?.role === 'faculty') {
        filteredSchedule = mockSchedule.filter(cls => cls.instructorId === user.id);
      } else if (user?.role === 'student') {
        // Mock enrolled courses for student
        const enrolledCourses = ['CS-301', 'CS-301L', 'ENG-201'];
        filteredSchedule = mockSchedule.filter(cls => enrolledCourses.includes(cls.courseCode));
      }

      setScheduleData(filteredSchedule);
      
      // Mock conflicts
      setConflicts([
        {
          id: 'CONF001',
          message: 'Room CS Building 205 double-booked on Monday 10:00 AM',
          type: 'room_conflict',
          severity: 'high',
          affectedClasses: ['CLS001']
        }
      ]);
      
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getColorClasses = (color, type = 'bg') => {
    const colorMap = {
      blue: type === 'bg' ? 'bg-blue-100 border-blue-300 text-blue-800' : 'text-blue-600',
      green: type === 'bg' ? 'bg-green-100 border-green-300 text-green-800' : 'text-green-600',
      purple: type === 'bg' ? 'bg-purple-100 border-purple-300 text-purple-800' : 'text-purple-600',
      red: type === 'bg' ? 'bg-red-100 border-red-300 text-red-800' : 'text-red-600',
      yellow: type === 'bg' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'text-yellow-600'
    };
    return colorMap[color] || colorMap.blue;
  };

  const filteredSchedule = scheduleData.filter(cls => {
    const matchesSearch = cls.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cls.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleViewClass = (classItem) => {
    setSelectedClass(classItem);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddClass = () => {
    setSelectedClass(null);
    setModalMode('add');
    setShowModal(true);
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getClassesForDay = (day) => {
    return filteredSchedule.filter(cls => cls.days.includes(day));
  };

  const renderWeekView = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200">
          <div className="p-3 bg-gray-50 text-sm font-medium text-gray-600">Time</div>
          {daysOfWeek.map(day => (
            <div key={day} className="p-3 bg-gray-50 text-sm font-medium text-gray-900 text-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 min-h-96">
          <div className="border-r border-gray-200">
            {timeSlots.map(time => (
              <div key={time} className="h-16 p-2 text-xs text-gray-500 border-b border-gray-100">
                {formatTime(time)}
              </div>
            ))}
          </div>
          
          {daysOfWeek.map(day => (
            <div key={day} className="border-r border-gray-200 relative">
              {timeSlots.map(time => (
                <div key={time} className="h-16 border-b border-gray-100 relative">
                  {getClassesForDay(day)
                    .filter(cls => cls.startTime === time)
                    .map(cls => (
                      <div
                        key={cls.id}
                        onClick={() => handleViewClass(cls)}
                        className={`absolute inset-1 ${getColorClasses(cls.color)} border rounded p-1 cursor-pointer hover:opacity-80 transition-opacity text-xs`}
                        style={{
                          height: `${(cls.duration / 60) * 4 - 0.25}rem`
                        }}
                      >
                        <div className="font-medium truncate">{cls.courseCode}</div>
                        <div className="truncate opacity-80">{cls.classroom}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
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
                <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Instructor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Schedule</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Enrollment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.length > 0 ? filteredSchedule.map((cls) => (
                <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{cls.courseCode}</div>
                      <div className="text-sm text-gray-600">{cls.courseName}</div>
                      <div className="text-xs text-gray-500">{cls.credits} credits • {cls.type}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{cls.instructor}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {cls.days.join(', ')}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      {formatTime(cls.startTime)} - {formatTime(cls.endTime)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={14} className="text-gray-400 mr-1" />
                      {cls.classroom}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {cls.enrolled}/{cls.capacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cls.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cls.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewClass(cls)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {hasPermission('schedule') && (user?.role === 'admin' || cls.instructorId === user?.id) && (
                        <button
                          onClick={() => handleEditClass(cls)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit Class"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No classes found matching your criteria
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
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Class Schedule</h2>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' ? 'Your enrolled classes' : 
             user?.role === 'faculty' ? 'Your teaching schedule' : 
             'All class schedules'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasPermission('schedule') && user?.role !== 'student' && (
            <button
              onClick={handleAddClass}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Class</span>
            </button>
          )}
        </div>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-red-800 font-medium">Schedule Conflicts Detected</h4>
              <div className="mt-2 space-y-1">
                {conflicts.map(conflict => (
                  <p key={conflict.id} className="text-red-700 text-sm">
                    {conflict.message}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid size={16} className="inline mr-1" />
                Week
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List size={16} className="inline mr-1" />
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Content */}
      {viewMode === 'week' ? renderWeekView() : renderListView()}

      {/* Class Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === 'add' ? 'Add New Class' : 
                   modalMode === 'edit' ? 'Edit Class' : 'Class Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {selectedClass && modalMode === 'view' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Code
                      </label>
                      <div className="text-gray-900">{selectedClass.courseCode}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Name
                      </label>
                      <div className="text-gray-900">{selectedClass.courseName}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructor
                      </label>
                      <div className="text-gray-900">{selectedClass.instructor}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Credits
                      </label>
                      <div className="text-gray-900">{selectedClass.credits}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule
                    </label>
                    <div className="text-gray-900">
                      {selectedClass.days.join(', ')} • {formatTime(selectedClass.startTime)} - {formatTime(selectedClass.endTime)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Classroom
                      </label>
                      <div className="text-gray-900">{selectedClass.classroom}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enrollment
                      </label>
                      <div className="text-gray-900">
                        {selectedClass.enrolled} / {selectedClass.capacity} students
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <div className="text-gray-900">{selectedClass.type}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedClass.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedClass.status}
                      </span>
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
                {modalMode === 'view' && hasPermission('schedule') && (user?.role === 'admin' || selectedClass?.instructorId === user?.id) && (
                  <button
                    onClick={() => setModalMode('edit')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Edit Class
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

export default ClassSchedule;