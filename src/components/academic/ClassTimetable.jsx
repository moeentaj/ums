// src/components/academic/ClassTimetable.jsx - Complete Class Schedule Management
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Search,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Settings,
  Save,
  X
} from 'lucide-react';

const ClassTimetable = () => {
  const { user, hasPermission } = useAuth();
  
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // week, day, month
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    department: 'all',
    room: 'all',
    instructor: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Time slots for the schedule grid
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate comprehensive schedule data
      const generatedSchedules = generateScheduleData();
      setSchedules(generatedSchedules);
      
      // Check for conflicts
      const scheduleConflicts = detectConflicts(generatedSchedules);
      setConflicts(scheduleConflicts);
      
      setLoading(false);
    };
    
    loadSchedules();
  }, []);

  // Generate comprehensive schedule data
  const generateScheduleData = () => {
    const courses = [
      { code: 'CS-101', name: 'Introduction to Computer Science', instructor: 'Dr. Sarah Wilson', department: 'Computer Science' },
      { code: 'CS-201', name: 'Data Structures', instructor: 'Dr. Sarah Wilson', department: 'Computer Science' },
      { code: 'MATH-101', name: 'Calculus I', instructor: 'Dr. Emily Rodriguez', department: 'Mathematics' },
      { code: 'MATH-201', name: 'Linear Algebra', instructor: 'Dr. Emily Rodriguez', department: 'Mathematics' },
      { code: 'BUS-101', name: 'Introduction to Business', instructor: 'Dr. Michael Chen', department: 'Business' },
      { code: 'BUS-301', name: 'Strategic Management', instructor: 'Dr. Michael Chen', department: 'Business' },
      { code: 'ENG-101', name: 'English Composition', instructor: 'Prof. Lisa Anderson', department: 'English' },
      { code: 'ENG-201', name: 'Literature Analysis', instructor: 'Prof. Lisa Anderson', department: 'English' }
    ];

    const rooms = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Lab A', 'Lab B', 'Auditorium', 'Conference Room'];
    const timeSlotPairs = [
      { start: '9:00 AM', end: '10:30 AM' },
      { start: '10:30 AM', end: '12:00 PM' },
      { start: '1:00 PM', end: '2:30 PM' },
      { start: '2:30 PM', end: '4:00 PM' },
      { start: '4:00 PM', end: '5:30 PM' }
    ];

    const scheduleData = [];
    let idCounter = 1;

    courses.forEach(course => {
      // Generate 2-3 sessions per week for each course
      const sessionsPerWeek = Math.random() > 0.5 ? 3 : 2;
      const dayIndices = sessionsPerWeek === 3 ? [0, 2, 4] : [1, 3]; // MWF or TTh
      
      dayIndices.forEach(dayIndex => {
        const timeSlot = timeSlotPairs[Math.floor(Math.random() * timeSlotPairs.length)];
        const room = rooms[Math.floor(Math.random() * rooms.length)];
        
        scheduleData.push({
          id: `SCH${String(idCounter++).padStart(3, '0')}`,
          courseCode: course.code,
          courseName: course.name,
          instructor: course.instructor,
          department: course.department,
          dayOfWeek: weekDays[dayIndex],
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          room: room,
          capacity: Math.floor(Math.random() * 50) + 20, // 20-70
          enrolled: Math.floor(Math.random() * 40) + 15, // 15-55
          semester: 'Fall 2025',
          credits: 3,
          type: 'Lecture',
          status: 'Active',
          color: getRandomColor(),
          recurring: true,
          notes: ''
        });
      });
    });

    return scheduleData;
  };

  // Generate random colors for courses
  const getRandomColor = () => {
    const colors = [
      'bg-blue-100 border-blue-500 text-blue-800',
      'bg-green-100 border-green-500 text-green-800',
      'bg-purple-100 border-purple-500 text-purple-800',
      'bg-yellow-100 border-yellow-500 text-yellow-800',
      'bg-red-100 border-red-500 text-red-800',
      'bg-indigo-100 border-indigo-500 text-indigo-800',
      'bg-pink-100 border-pink-500 text-pink-800',
      'bg-orange-100 border-orange-500 text-orange-800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Detect scheduling conflicts
  const detectConflicts = (scheduleData) => {
    const conflicts = [];
    
    // Group by day and check for time overlaps
    const dayGroups = scheduleData.reduce((acc, schedule) => {
      if (!acc[schedule.dayOfWeek]) acc[schedule.dayOfWeek] = [];
      acc[schedule.dayOfWeek].push(schedule);
      return acc;
    }, {});

    Object.keys(dayGroups).forEach(day => {
      const daySchedules = dayGroups[day];
      
      for (let i = 0; i < daySchedules.length; i++) {
        for (let j = i + 1; j < daySchedules.length; j++) {
          const schedule1 = daySchedules[i];
          const schedule2 = daySchedules[j];
          
          // Check for room conflicts
          if (schedule1.room === schedule2.room && timesOverlap(schedule1, schedule2)) {
            conflicts.push({
              id: `CONFLICT_${conflicts.length + 1}`,
              type: 'Room Conflict',
              description: `Room ${schedule1.room} is double-booked`,
              schedules: [schedule1, schedule2],
              severity: 'high'
            });
          }
          
          // Check for instructor conflicts
          if (schedule1.instructor === schedule2.instructor && timesOverlap(schedule1, schedule2)) {
            conflicts.push({
              id: `CONFLICT_${conflicts.length + 1}`,
              type: 'Instructor Conflict',
              description: `${schedule1.instructor} is scheduled for multiple classes`,
              schedules: [schedule1, schedule2],
              severity: 'high'
            });
          }
        }
      }
    });

    return conflicts;
  };

  // Check if two time slots overlap
  const timesOverlap = (schedule1, schedule2) => {
    const start1 = convertTimeToMinutes(schedule1.startTime);
    const end1 = convertTimeToMinutes(schedule1.endTime);
    const start2 = convertTimeToMinutes(schedule2.startTime);
    const end2 = convertTimeToMinutes(schedule2.endTime);
    
    return start1 < end2 && start2 < end1;
  };

  // Convert time string to minutes for comparison
  const convertTimeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  };

  // Filter schedules
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === 'all' || schedule.department === filters.department;
    const matchesRoom = filters.room === 'all' || schedule.room === filters.room;
    const matchesInstructor = filters.instructor === 'all' || schedule.instructor === filters.instructor;
    
    return matchesSearch && matchesDepartment && matchesRoom && matchesInstructor;
  });

  // Get unique values for filters
  const filterOptions = React.useMemo(() => {
    const departments = [...new Set(schedules.map(s => s.department))];
    const rooms = [...new Set(schedules.map(s => s.room))];
    const instructors = [...new Set(schedules.map(s => s.instructor))];
    
    return {
      departments: departments.sort(),
      rooms: rooms.sort(),
      instructors: instructors.sort()
    };
  }, [schedules]);

  // Handle schedule actions
  const handleAddSchedule = () => {
    if (!hasPermission('schedule_write')) {
      alert('You do not have permission to add schedules.');
      return;
    }
    setSelectedEvent(null);
    setShowAddModal(true);
  };

  const handleEditSchedule = (schedule) => {
    if (!hasPermission('schedule_write')) {
      alert('You do not have permission to edit schedules.');
      return;
    }
    setSelectedEvent(schedule);
    setShowEditModal(true);
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (!hasPermission('schedule_delete')) {
      alert('You do not have permission to delete schedules.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(s => s.id !== scheduleId));
    }
  };

  const handleViewSchedule = (schedule) => {
    setSelectedEvent(schedule);
    setShowDetailsModal(true);
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  // Get week dates
  const getWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    startOfWeek.setDate(diff);
    
    return weekDays.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  // Get schedules for a specific time slot
  const getScheduleForTimeSlot = (day, timeSlot) => {
    return filteredSchedules.find(schedule => 
      schedule.dayOfWeek === day && schedule.startTime === timeSlot
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Class Timetable</h2>
            <p className="text-gray-600">Manage class schedules and prevent conflicts</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  viewMode === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  viewMode === 'day' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day
              </button>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            {hasPermission('schedule_write') && (
              <button
                onClick={handleAddSchedule}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Schedule
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Scheduling Conflicts Detected</h3>
              <div className="mt-2 space-y-1">
                {conflicts.slice(0, 3).map(conflict => (
                  <p key={conflict.id} className="text-sm text-red-700">
                    • {conflict.description}
                  </p>
                ))}
                {conflicts.length > 3 && (
                  <p className="text-sm text-red-700">
                    • And {conflicts.length - 3} more conflicts...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {filterOptions.departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filters.room}
              onChange={(e) => setFilters({...filters, room: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Rooms</option>
              {filterOptions.rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
            <select
              value={filters.instructor}
              onChange={(e) => setFilters({...filters, instructor: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Instructors</option>
              {filterOptions.instructors.map(instructor => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Week of {getWeekDates()[0].toLocaleDateString()} - {getWeekDates()[4].toLocaleDateString()}
              </h3>
              <p className="text-sm text-gray-500">
                {getWeekDates()[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Schedule Grid */}
      {viewMode === 'week' ? (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  {weekDays.map((day, index) => {
                    const date = getWeekDates()[index];
                    return (
                      <th key={day} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        <div>{day}</div>
                        <div className="text-gray-400 font-normal">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                      {timeSlot}
                    </td>
                    {weekDays.map((day) => {
                      const schedule = getScheduleForTimeSlot(day, timeSlot);
                      return (
                        <td key={day} className="px-2 py-2 text-center relative">
                          {schedule ? (
                            <div 
                              className={`${schedule.color} border-l-4 rounded-lg p-2 text-xs cursor-pointer hover:shadow-md transition-shadow`}
                              onClick={() => handleViewSchedule(schedule)}
                            >
                              <div className="font-semibold truncate">{schedule.courseCode}</div>
                              <div className="truncate">{schedule.instructor.split(' ').slice(-1)[0]}</div>
                              <div className="text-xs opacity-75">{schedule.room}</div>
                            </div>
                          ) : (
                            <div 
                              className="h-16 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => {
                                if (hasPermission('schedule_write')) {
                                  // Set up for adding a new schedule at this time slot
                                  setSelectedEvent({ dayOfWeek: day, startTime: timeSlot });
                                  setShowAddModal(true);
                                }
                              }}
                            >
                              {hasPermission('schedule_write') && (
                                <Plus className="h-4 w-4" />
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Day View</h3>
            <p className="mt-1 text-sm text-gray-500">
              Day view interface would be implemented here with detailed hourly schedule view
            </p>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Schedules</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{schedule.courseCode}</div>
                      <div className="text-sm text-gray-500">{schedule.courseName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.dayOfWeek}</div>
                    <div className="text-sm text-gray-500">{schedule.startTime} - {schedule.endTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.enrolled}/{schedule.capacity}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((schedule.enrolled / schedule.capacity) * 100)}% full
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      schedule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewSchedule(schedule)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {hasPermission('schedule_write') && (
                        <>
                          <button
                            onClick={() => handleEditSchedule(schedule)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Schedule</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      defaultValue={selectedEvent?.courseCode || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., CS-101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Introduction to Computer Science"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Instructor</option>
                    {filterOptions.instructors.map(instructor => (
                      <option key={instructor} value={instructor}>{instructor}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                    <select 
                      defaultValue={selectedEvent?.dayOfWeek || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Day</option>
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <select 
                      defaultValue={selectedEvent?.startTime || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Room</option>
                      {filterOptions.rooms.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Schedule: {selectedEvent.courseCode}
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      defaultValue={selectedEvent.courseCode}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                      type="text"
                      defaultValue={selectedEvent.courseName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <select 
                    defaultValue={selectedEvent.instructor}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {filterOptions.instructors.map(instructor => (
                      <option key={instructor} value={instructor}>{instructor}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                    <select 
                      defaultValue={selectedEvent.dayOfWeek}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <select 
                      defaultValue={selectedEvent.startTime}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <select 
                      defaultValue={selectedEvent.endTime}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                    <select 
                      defaultValue={selectedEvent.room}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {filterOptions.rooms.map(room => (
                        <option key={room} value={room}>{room}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      defaultValue={selectedEvent.capacity}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    defaultValue={selectedEvent.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    defaultValue={selectedEvent.notes}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedEvent.courseCode} - {selectedEvent.courseName}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Course Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course Code:</span>
                        <span className="font-medium">{selectedEvent.courseCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Course Name:</span>
                        <span className="font-medium">{selectedEvent.courseName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Instructor:</span>
                        <span className="font-medium">{selectedEvent.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium">{selectedEvent.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Credits:</span>
                        <span className="font-medium">{selectedEvent.credits}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Schedule Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Day:</span>
                        <span className="font-medium">{selectedEvent.dayOfWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium">{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Room:</span>
                        <span className="font-medium">{selectedEvent.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Semester:</span>
                        <span className="font-medium">{selectedEvent.semester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{selectedEvent.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Enrollment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Enrolled:</span>
                        <span className="font-medium">{selectedEvent.enrolled}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Capacity:</span>
                        <span className="font-medium">{selectedEvent.capacity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Utilization:</span>
                        <span className="font-medium">
                          {Math.round((selectedEvent.enrolled / selectedEvent.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((selectedEvent.enrolled / selectedEvent.capacity) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedEvent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedEvent.status}
                    </span>
                  </div>

                  {selectedEvent.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {selectedEvent.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {hasPermission('schedule_write') && (
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowEditModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Schedule
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSchedules.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No schedules found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || Object.values(filters).some(f => f !== 'all') 
              ? 'Try adjusting your search or filters.'
              : 'Get started by adding your first class schedule.'
            }
          </p>
          {hasPermission('schedule_write') && (
            <div className="mt-6">
              <button
                onClick={handleAddSchedule}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Add Schedule
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassTimetable;