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
  RefreshCw
} from 'lucide-react';

const ClassTimetable = () => {
  const { user, hasPermission } = useAuth();
  
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // week, day, month
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [conflicts, setConflicts] = useState([]);

  // Time slots for the schedule grid
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
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
    const scheduleData = [];
    const courses = mockData.courses;
    
    courses.forEach((course, index) => {
      if (course.schedule && course.schedule.days) {
        course.schedule.days.forEach(day => {
          scheduleData.push({
            id: `schedule_${index}_${day}`,
            courseId: course.id,
            courseCode: course.code,
            courseName: course.name,
            instructor: course.instructor,
            day: day,
            startTime: course.schedule.time?.split(' - ')[0] || '9:00 AM',
            endTime: course.schedule.time?.split(' - ')[1] || '10:00 AM',
            duration: course.schedule.duration || 60,
            room: course.classroom,
            department: course.department,
            enrolled: course.enrolled,
            capacity: course.capacity,
            type: 'lecture',
            status: 'confirmed',
            semester: course.semester,
            color: getColorForDepartment(course.department)
          });
        });
      }
    });

    // Add some additional events (labs, seminars, etc.)
    const additionalEvents = [
      {
        id: 'lab_1',
        courseCode: 'CS-101L',
        courseName: 'Computer Science Lab',
        instructor: 'Dr. Sarah Wilson',
        day: 'Wednesday',
        startTime: '2:00 PM',
        endTime: '4:00 PM',
        duration: 120,
        room: 'Lab 201',
        department: 'Computer Science',
        type: 'lab',
        status: 'confirmed',
        color: '#3B82F6'
      },
      {
        id: 'seminar_1',
        courseCode: 'BUS-SEM',
        courseName: 'Business Leadership Seminar',
        instructor: 'Prof. Michael Brown',
        day: 'Friday',
        startTime: '1:00 PM',
        endTime: '2:30 PM',
        duration: 90,
        room: 'Conference Room A',
        department: 'Business Administration',
        type: 'seminar',
        status: 'tentative',
        color: '#10B981'
      }
    ];

    return [...scheduleData, ...additionalEvents];
  };

  // Get color based on department
  const getColorForDepartment = (department) => {
    const colors = {
      'Computer Science': '#3B82F6',
      'Business Administration': '#10B981',
      'Engineering': '#F59E0B',
      'Sciences': '#8B5CF6',
      'Arts': '#EC4899',
      'Mathematics': '#6366F1'
    };
    return colors[department] || '#6B7280';
  };

  // Detect scheduling conflicts
  const detectConflicts = (scheduleData) => {
    const conflicts = [];
    
    for (let i = 0; i < scheduleData.length; i++) {
      for (let j = i + 1; j < scheduleData.length; j++) {
        const event1 = scheduleData[i];
        const event2 = scheduleData[j];
        
        if (event1.day === event2.day && event1.room === event2.room) {
          const start1 = convertTimeToMinutes(event1.startTime);
          const end1 = convertTimeToMinutes(event1.endTime);
          const start2 = convertTimeToMinutes(event2.startTime);
          const end2 = convertTimeToMinutes(event2.endTime);
          
          if ((start1 < end2 && end1 > start2)) {
            conflicts.push({
              id: `conflict_${i}_${j}`,
              event1: event1,
              event2: event2,
              type: 'room_conflict',
              severity: 'high'
            });
          }
        }
      }
    }
    
    return conflicts;
  };

  // Convert time string to minutes for comparison
  const convertTimeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + (minutes || 0);
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return schedules.filter(schedule => schedule.day === day);
  };

  // Get unique departments and rooms for filtering
  const departments = [...new Set(schedules.map(s => s.department))];
  const rooms = [...new Set(schedules.map(s => s.room))];

  // Filter schedules based on selections
  const filteredSchedules = schedules.filter(schedule => {
    const matchesDepartment = selectedDepartment === 'all' || schedule.department === selectedDepartment;
    const matchesRoom = selectedRoom === 'all' || schedule.room === selectedRoom;
    return matchesDepartment && matchesRoom;
  });

  // Navigation functions
  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setSelectedDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Get current week dates
  const getCurrentWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    startOfWeek.setDate(diff);
    
    return weekDays.map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  // Event component for calendar grid
  const EventBlock = ({ event, style }) => (
    <div
      className={`absolute rounded-lg p-2 text-white text-xs cursor-pointer hover:opacity-90 transition-opacity ${
        event.status === 'tentative' ? 'opacity-70 border-2 border-dashed' : ''
      }`}
      style={{
        backgroundColor: event.color,
        ...style
      }}
      onClick={() => setSelectedEvent(event)}
      title={`${event.courseName} - ${event.instructor}`}
    >
      <div className="font-semibold truncate">{event.courseCode}</div>
      <div className="truncate text-xs opacity-90">{event.room}</div>
      {event.type !== 'lecture' && (
        <div className="text-xs opacity-75 capitalize">{event.type}</div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-10 w-32 rounded"></div>
        </div>
        <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Navigation and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => viewMode === 'week' ? navigateWeek(-1) : navigateDay(-1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            
            <div className="px-4 py-2 bg-gray-100 rounded-lg">
              <span className="font-medium">
                {viewMode === 'week' 
                  ? `Week of ${getCurrentWeekDates()[0].toLocaleDateString()}`
                  : selectedDate.toLocaleDateString()
                }
              </span>
            </div>
            
            <button
              onClick={() => viewMode === 'week' ? navigateWeek(1) : navigateDay(1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Today
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Filters */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>

          {/* Actions */}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Schedule Conflicts Detected</h3>
              <p className="text-sm text-red-700 mt-1">
                {conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} found. 
                <button className="ml-1 text-red-800 underline hover:text-red-900">
                  View details
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Grid */}
      {viewMode === 'week' ? (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-700">Time</div>
                {weekDays.map((day, index) => {
                  const date = getCurrentWeekDates()[index];
                  return (
                    <div key={day} className="p-4 bg-gray-50 text-center">
                      <div className="font-medium text-gray-700">{day}</div>
                      <div className="text-sm text-gray-500">{date.getDate()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="relative">
                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="grid grid-cols-6 border-b border-gray-100 min-h-[60px]">
                    <div className="p-3 bg-gray-50 text-sm text-gray-600 font-medium border-r border-gray-200">
                      {time}
                    </div>
                    
                    {weekDays.map(day => {
                      const dayEvents = filteredSchedules.filter(event => 
                        event.day === day && event.startTime === time
                      );
                      
                      return (
                        <div key={`${day}-${time}`} className="relative border-r border-gray-100 p-1">
                          {dayEvents.map(event => (
                            <EventBlock
                              key={event.id}
                              event={event}
                              style={{
                                top: '4px',
                                left: '4px',
                                right: '4px',
                                height: `${Math.max(event.duration / 30 * 30 - 8, 46)}px`
                              }}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Day View
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            <div className="space-y-3">
              {getEventsForDay(weekDays[selectedDate.getDay() - 1]).map(event => (
                <div 
                  key={event.id}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div 
                    className="w-4 h-4 rounded-full mr-4"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{event.courseName}</div>
                    <div className="text-sm text-gray-600">{event.courseCode} • {event.instructor}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="text-sm text-gray-600">{event.room}</div>
                  </div>
                  
                  <div className="ml-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {departments.map(dept => (
            <div key={dept} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: getColorForDepartment(dept) }}
              ></div>
              <span className="text-sm text-gray-700">{dept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedEvent.courseName}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Course Code:</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{selectedEvent.courseCode}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Instructor:</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{selectedEvent.instructor}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Time:</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{selectedEvent.room}</span>
                </div>
                
                {selectedEvent.enrolled && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Enrollment:</span>
                    <span className="ml-auto text-sm font-medium text-gray-900">
                      {selectedEvent.enrolled}/{selectedEvent.capacity}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="ml-auto text-sm font-medium text-gray-900 capitalize">{selectedEvent.type}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classes scheduled</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or add a new class to the schedule.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassTimetable;