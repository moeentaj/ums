// src/components/schedule/ExamSchedule.jsx - Examination Schedule Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ClipboardList,
  Clock, 
  MapPin,
  User,
  AlertTriangle,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  FileText,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ExamSchedule = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, upcoming, completed, graded
  const [filterSemester, setFilterSemester] = useState('Fall 2025');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view, add, edit
  const [selectedExam, setSelectedExam] = useState(null);
  const [examData, setExamData] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [stats, setStats] = useState({});

  // Mock exam data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockExams = [
        {
          id: 'EXM001',
          courseCode: 'CS-301',
          courseName: 'Data Structures and Algorithms',
          examType: 'Midterm',
          date: '2025-10-15',
          startTime: '10:00',
          endTime: '12:00',
          duration: 120,
          classroom: 'CS Building 101',
          instructor: 'Dr. Sarah Wilson',
          instructorId: 'FAC001',
          semester: 'Fall 2025',
          studentsEnrolled: 75,
          maxScore: 100,
          passingScore: 60,
          status: 'Scheduled',
          graded: false,
          instructions: 'Bring calculator and pencil. No electronic devices allowed.',
          materials: ['Calculator allowed', 'Pencil/Pen only'],
          type: 'Written'
        },
        {
          id: 'EXM002',
          courseCode: 'BUS-201',
          courseName: 'Business Management Fundamentals',
          examType: 'Final',
          date: '2025-12-10',
          startTime: '14:00',
          endTime: '17:00',
          duration: 180,
          classroom: 'Business Building 150',
          instructor: 'Prof. Michael Brown',
          instructorId: 'FAC002',
          semester: 'Fall 2025',
          studentsEnrolled: 108,
          maxScore: 100,
          passingScore: 60,
          status: 'Scheduled',
          graded: false,
          instructions: 'Comprehensive exam covering all course materials.',
          materials: ['No materials allowed', 'University provided answer sheets'],
          type: 'Written'
        },
        {
          id: 'EXM003',
          courseCode: 'CS-301L',
          courseName: 'Data Structures Lab',
          examType: 'Practical',
          date: '2025-11-20',
          startTime: '09:00',
          endTime: '11:00',
          duration: 120,
          classroom: 'CS Building 301',
          instructor: 'Dr. Sarah Wilson',
          instructorId: 'FAC001',
          semester: 'Fall 2025',
          studentsEnrolled: 25,
          maxScore: 100,
          passingScore: 70,
          status: 'Scheduled',
          graded: false,
          instructions: 'Practical programming exam on computers.',
          materials: ['Computer provided', 'IDE pre-configured'],
          type: 'Practical'
        },
        {
          id: 'EXM004',
          courseCode: 'ENG-201',
          courseName: 'Technical Writing',
          examType: 'Final',
          date: '2025-09-01',
          startTime: '11:00',
          endTime: '13:00',
          duration: 120,
          classroom: 'English Building 102',
          instructor: 'Prof. Jennifer Lee',
          instructorId: 'FAC004',
          semester: 'Summer 2025',
          studentsEnrolled: 32,
          maxScore: 100,
          passingScore: 65,
          status: 'Completed',
          graded: true,
          averageScore: 78.5,
          instructions: 'Essay-based examination.',
          materials: ['Blue books provided', 'Pencil/Pen only'],
          type: 'Written'
        }
      ];

      // Filter based on user role
      let filteredExams = mockExams;
      if (user?.role === 'faculty') {
        filteredExams = mockExams.filter(exam => exam.instructorId === user.id);
      } else if (user?.role === 'student') {
        // Mock enrolled courses for student
        const enrolledCourses = ['CS-301', 'CS-301L', 'ENG-201'];
        filteredExams = mockExams.filter(exam => enrolledCourses.includes(exam.courseCode));
      }

      setExamData(filteredExams);

      // Mock conflicts
      setConflicts([
        {
          id: 'CONF001',
          message: 'Two exams scheduled at same time: CS-301 and MATH-201 on Oct 15',
          type: 'time_conflict',
          severity: 'high',
          affectedExams: ['EXM001']
        }
      ]);

      // Calculate stats
      const upcoming = filteredExams.filter(exam => new Date(exam.date) > new Date() && exam.status === 'Scheduled').length;
      const completed = filteredExams.filter(exam => exam.status === 'Completed').length;
      const graded = filteredExams.filter(exam => exam.graded).length;
      const thisWeek = filteredExams.filter(exam => {
        const examDate = new Date(exam.date);
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return examDate >= now && examDate <= weekFromNow && exam.status === 'Scheduled';
      }).length;

      setStats({ upcoming, completed, graded, thisWeek });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const filteredExams = examData.filter(exam => {
    const matchesSearch = exam.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.examType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || 
                       (filterType === 'upcoming' && exam.status === 'Scheduled' && new Date(exam.date) > new Date()) ||
                       (filterType === 'completed' && exam.status === 'Completed') ||
                       (filterType === 'graded' && exam.graded);
                       
    const matchesSemester = filterSemester === 'all' || exam.semester === filterSemester;
    
    return matchesSearch && matchesType && matchesSemester;
  });

  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddExam = () => {
    setSelectedExam(null);
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

  const getStatusIcon = (exam) => {
    if (exam.status === 'Completed' && exam.graded) {
      return <CheckCircle className="text-green-500" size={16} />;
    } else if (exam.status === 'Completed' && !exam.graded) {
      return <ClipboardList className="text-yellow-500" size={16} />;
    } else if (new Date(exam.date) < new Date()) {
      return <XCircle className="text-red-500" size={16} />;
    }
    return <Clock className="text-blue-500" size={16} />;
  };

  const getStatusColor = (exam) => {
    if (exam.status === 'Completed' && exam.graded) {
      return 'bg-green-100 text-green-800';
    } else if (exam.status === 'Completed' && !exam.graded) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (new Date(exam.date) < new Date()) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  const getStatusText = (exam) => {
    if (exam.status === 'Completed' && exam.graded) {
      return 'Graded';
    } else if (exam.status === 'Completed' && !exam.graded) {
      return 'Pending Grades';
    } else if (new Date(exam.date) < new Date()) {
      return 'Overdue';
    }
    return 'Scheduled';
  };

  const getDaysUntilExam = (dateString) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past due';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
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
          <h2 className="text-xl font-bold text-gray-900">Examination Schedule</h2>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' ? 'Your upcoming exams' : 
             user?.role === 'faculty' ? 'Your course examinations' : 
             'All scheduled examinations'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {hasPermission('schedule') && user?.role !== 'student' && (
            <button
              onClick={handleAddExam}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Schedule Exam</span>
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
              <p className="text-sm text-gray-600">Upcoming Exams</p>
              <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>This week: {stats.thisWeek}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Graded: {stats.graded}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.thisWeek}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-yellow-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Next 7 days</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Grades</p>
              <p className="text-2xl font-bold text-purple-600">{stats.completed - stats.graded}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Awaiting grading</span>
          </div>
        </div>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-red-800 font-medium">Exam Schedule Conflicts</h4>
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

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Exams</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="graded">Graded</option>
            </select>

            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Semesters</option>
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2025">Spring 2025</option>
              <option value="Summer 2025">Summer 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exam List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Course & Exam</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.length > 0 ? filteredExams.map((exam) => (
                <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{exam.courseCode}</div>
                      <div className="text-sm text-gray-600">{exam.courseName}</div>
                      <div className="text-xs text-gray-500">{exam.examType} • {exam.type}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(exam.date)}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center mt-1">
                      <Clock size={12} className="mr-1" />
                      {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getDaysUntilExam(exam.date)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={14} className="text-gray-400 mr-1" />
                      {exam.classroom}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {exam.studentsEnrolled}
                    </div>
                    <div className="text-xs text-gray-500">
                      {exam.graded && exam.averageScore && `Avg: ${exam.averageScore}%`}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(exam)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam)}`}>
                        {getStatusText(exam)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewExam(exam)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {hasPermission('schedule') && (user?.role === 'admin' || exam.instructorId === user?.id) && (
                        <button
                          onClick={() => handleEditExam(exam)}
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit Exam"
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
                    No exams found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === 'add' ? 'Schedule New Exam' : 
                   modalMode === 'edit' ? 'Edit Exam' : 'Exam Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {selectedExam && modalMode === 'view' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                      </label>
                      <div className="text-gray-900">{selectedExam.courseCode} - {selectedExam.courseName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exam Type
                      </label>
                      <div className="text-gray-900">{selectedExam.examType}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <div className="text-gray-900">{formatDate(selectedExam.date)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <div className="text-gray-900">
                        {formatTime(selectedExam.startTime)} - {formatTime(selectedExam.endTime)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <div className="text-gray-900">{selectedExam.duration} minutes</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <div className="text-gray-900">{selectedExam.classroom}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructor
                      </label>
                      <div className="text-gray-900">{selectedExam.instructor}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Students Enrolled
                      </label>
                      <div className="text-gray-900">{selectedExam.studentsEnrolled}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Score
                      </label>
                      <div className="text-gray-900">{selectedExam.maxScore} points</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passing Score
                      </label>
                      <div className="text-gray-900">{selectedExam.passingScore} points</div>
                    </div>
                  </div>

                  {selectedExam.graded && selectedExam.averageScore && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Results
                      </label>
                      <div className="text-gray-900">Average Score: {selectedExam.averageScore}%</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedExam.instructions}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allowed Materials
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedExam.materials.map((material, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {material}
                        </span>
                      ))}
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
                {modalMode === 'view' && hasPermission('schedule') && (user?.role === 'admin' || selectedExam?.instructorId === user?.id) && (
                  <button
                    onClick={() => setModalMode('edit')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Edit Exam
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

export default ExamSchedule;