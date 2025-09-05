// src/components/student/AcademicRecords.jsx - Complete Academic Records Management Component
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockData, getStudentById, getCourseById } from '../../data/mockData';
import { 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  BookOpen,
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  FileText,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  GraduationCap,
  Calculator,
  Printer
} from 'lucide-react';

const AcademicRecords = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter states
  const [filters, setFilters] = useState({
    program: 'all',
    year: 'all',
    status: 'all',
    gpaRange: 'all',
    semester: 'all'
  });

  // Permission checks
  const canEditGrades = hasPermission('academics.write') || user?.role === 'admin' || user?.role === 'faculty';
  const canViewTranscripts = hasPermission('academics.read') || canEditGrades;
  const canGenerateReports = hasPermission('reports.read') || user?.role === 'admin';

  // Mock academic data
  const mockAcademicRecords = [
    {
      studentId: 'STU001',
      student: mockData.students[0],
      currentSemester: 'Fall 2025',
      cumulativeGPA: 3.75,
      semesterGPA: 3.82,
      totalCredits: 45,
      creditsInProgress: 15,
      academicStatus: 'Good Standing',
      transcriptRequests: 2,
      lastUpdated: '2025-09-01',
      grades: [
        {
          id: 'G001',
          courseId: 'CS101',
          courseName: 'Introduction to Computer Science',
          semester: 'Fall 2025',
          credits: 3,
          grade: 'A-',
          gradePoints: 3.7,
          instructor: 'Dr. Smith',
          finalGrade: true,
          midtermGrade: 'B+',
          assignments: [
            { name: 'Assignment 1', score: 95, maxScore: 100, weight: 20 },
            { name: 'Midterm Exam', score: 88, maxScore: 100, weight: 30 },
            { name: 'Final Project', score: 92, maxScore: 100, weight: 50 }
          ]
        },
        {
          id: 'G002',
          courseId: 'MATH201',
          courseName: 'Calculus II',
          semester: 'Fall 2025',
          credits: 4,
          grade: 'A',
          gradePoints: 4.0,
          instructor: 'Prof. Johnson',
          finalGrade: true,
          midtermGrade: 'A-',
          assignments: [
            { name: 'Quiz 1', score: 98, maxScore: 100, weight: 15 },
            { name: 'Quiz 2', score: 95, maxScore: 100, weight: 15 },
            { name: 'Midterm', score: 94, maxScore: 100, weight: 35 },
            { name: 'Final Exam', score: 96, maxScore: 100, weight: 35 }
          ]
        },
        {
          id: 'G003',
          courseId: 'ENG102',
          courseName: 'English Composition',
          semester: 'Fall 2025',
          credits: 3,
          grade: 'B+',
          gradePoints: 3.3,
          instructor: 'Dr. Williams',
          finalGrade: true,
          midtermGrade: 'B',
          assignments: [
            { name: 'Essay 1', score: 85, maxScore: 100, weight: 25 },
            { name: 'Essay 2', score: 88, maxScore: 100, weight: 25 },
            { name: 'Research Paper', score: 90, maxScore: 100, weight: 50 }
          ]
        }
      ],
      semesterHistory: [
        {
          semester: 'Spring 2025',
          gpa: 3.68,
          credits: 15,
          courses: 5,
          status: 'Good Standing'
        },
        {
          semester: 'Fall 2024',
          gpa: 3.45,
          credits: 15,
          courses: 5,
          status: 'Good Standing'
        }
      ]
    }
  ];

  // Load data
  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load students with academic records
        const studentsWithRecords = mockData.students.map(student => {
          const academicRecord = mockAcademicRecords.find(record => record.studentId === student.id);
          return {
            ...student,
            academicRecord: academicRecord || {
              cumulativeGPA: student.gpa || 0,
              semesterGPA: student.gpa || 0,
              totalCredits: 0,
              creditsInProgress: 0,
              academicStatus: 'Active',
              grades: []
            }
          };
        });

        setStudents(studentsWithRecords);
        setFilteredStudents(studentsWithRecords);
      } catch (error) {
        console.error('Error loading academic data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAcademicData();
  }, []);

  // Filter students
  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.program.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProgram = filters.program === 'all' || student.program === filters.program;
      const matchesYear = filters.year === 'all' || student.year === filters.year;
      const matchesStatus = filters.status === 'all' || student.status === filters.status;
      
      const gpa = student.academicRecord?.cumulativeGPA || 0;
      const matchesGPA = filters.gpaRange === 'all' || 
        (filters.gpaRange === 'high' && gpa >= 3.5) ||
        (filters.gpaRange === 'medium' && gpa >= 2.5 && gpa < 3.5) ||
        (filters.gpaRange === 'low' && gpa < 2.5);

      return matchesSearch && matchesProgram && matchesYear && matchesStatus && matchesGPA;
    });

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, students]);

  // Get paginated students
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  // GPA badge component
  const GPABadge = ({ gpa }) => {
    const getGPAStyle = (gpa) => {
      if (gpa >= 3.7) return 'bg-green-100 text-green-800 border-green-200';
      if (gpa >= 3.0) return 'bg-blue-100 text-blue-800 border-blue-200';
      if (gpa >= 2.5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-red-100 text-red-800 border-red-200';
    };

    const getGPAIcon = (gpa) => {
      if (gpa >= 3.5) return <TrendingUp className="h-3 w-3" />;
      if (gpa >= 2.5) return <BarChart3 className="h-3 w-3" />;
      return <TrendingDown className="h-3 w-3" />;
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getGPAStyle(gpa)}`}>
        {getGPAIcon(gpa)}
        <span className="ml-1">{gpa.toFixed(2)}</span>
      </span>
    );
  };

  // Academic status badge
  const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase().replace(' ', '_')) {
        case 'good_standing':
          return 'bg-green-100 text-green-800';
        case 'academic_probation':
          return 'bg-red-100 text-red-800';
        case 'academic_warning':
          return 'bg-yellow-100 text-yellow-800';
        case 'dean\'s_list':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
        {status}
      </span>
    );
  };

  // Student Academic Detail Modal
  const AcademicDetailModal = ({ student, onClose }) => {
    if (!student) return null;

    const academicRecord = mockAcademicRecords.find(record => record.studentId === student.id) || {
      grades: [],
      semesterHistory: [],
      cumulativeGPA: student.gpa || 0,
      totalCredits: 0
    };

    const tabs = [
      { id: 'overview', name: 'Overview', icon: BarChart3 },
      { id: 'grades', name: 'Current Grades', icon: Award },
      { id: 'history', name: 'Academic History', icon: Calendar },
      { id: 'transcript', name: 'Transcript', icon: FileText }
    ];

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
            <div className="bg-white">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Academic Records - {student.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {student.studentId} | {student.program} | {student.year}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GPABadge gpa={academicRecord.cumulativeGPA} />
                    <StatusBadge status={academicRecord.academicStatus || 'Active'} />
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                      >
                        <TabIcon className="h-4 w-4" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="px-6 py-6 max-h-96 overflow-y-auto">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Academic Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Calculator className="h-8 w-8 text-blue-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-blue-900">Cumulative GPA</p>
                            <p className="text-2xl font-semibold text-blue-600">
                              {academicRecord.cumulativeGPA.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <BookOpen className="h-8 w-8 text-green-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-900">Total Credits</p>
                            <p className="text-2xl font-semibold text-green-600">
                              {academicRecord.totalCredits || 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-8 w-8 text-yellow-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-yellow-900">In Progress</p>
                            <p className="text-2xl font-semibold text-yellow-600">
                              {academicRecord.creditsInProgress || 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Award className="h-8 w-8 text-purple-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-purple-900">Status</p>
                            <p className="text-sm font-semibold text-purple-600">
                              {academicRecord.academicStatus || 'Active'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Chart */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Academic Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Credits Completed</span>
                          <span>{academicRecord.totalCredits || 0} / 120</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(((academicRecord.totalCredits || 0) / 120) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {Math.max(0, 120 - (academicRecord.totalCredits || 0))} credits remaining for graduation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'grades' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium text-gray-900">Current Semester Grades</h4>
                      {canEditGrades && (
                        <button
                          onClick={() => setShowGradeModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Grade
                        </button>
                      )}
                    </div>

                    {academicRecord.grades && academicRecord.grades.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Credits
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grade
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instructor
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {academicRecord.grades.map((grade) => (
                              <tr key={grade.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {grade.courseName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {grade.courseId}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {grade.credits}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                                    grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                    grade.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {grade.grade}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {grade.instructor}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex items-center justify-end space-x-2">
                                    <button
                                      onClick={() => {
                                        // Handle view grade details
                                        console.log('View grade details:', grade);
                                      }}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    {canEditGrades && (
                                      <button
                                        onClick={() => {
                                          // Handle edit grade
                                          console.log('Edit grade:', grade);
                                        }}
                                        className="text-gray-600 hover:text-gray-900"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No grades recorded for current semester</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Academic History</h4>
                    
                    {academicRecord.semesterHistory && academicRecord.semesterHistory.length > 0 ? (
                      <div className="space-y-4">
                        {academicRecord.semesterHistory.map((semester, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-gray-900">{semester.semester}</h5>
                              <StatusBadge status={semester.status} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Semester GPA:</span>
                                <span className="ml-2 text-gray-900">{semester.gpa.toFixed(2)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Credits:</span>
                                <span className="ml-2 text-gray-900">{semester.credits}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Courses:</span>
                                <span className="ml-2 text-gray-900">{semester.courses}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No academic history available</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium text-gray-900">Official Transcript</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowTranscriptModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </button>
                        <button
                          onClick={() => {
                            // Handle print transcript
                            window.print();
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </button>
                        <button
                          onClick={() => {
                            // Handle download transcript
                            console.log('Download transcript');
                          }}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        Official transcripts contain complete academic records including:
                      </p>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        <li>All courses taken and grades received</li>
                        <li>Cumulative and semester GPAs</li>
                        <li>Transfer credits (if applicable)</li>
                        <li>Academic honors and recognitions</li>
                        <li>Degree(s) conferred</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!canViewTranscripts) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to view academic records.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Records</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage student grades, transcripts, and academic performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {canGenerateReports && (
              <button
                onClick={() => {
                  // Handle generate academic report
                  console.log('Generate academic report');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </button>
            )}
            <span className="text-sm text-gray-500">
              {filteredStudents.length} of {students.length} students
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Students',
            value: students.length,
            icon: User,
            color: 'blue'
          },
          {
            title: 'Honor Roll',
            value: students.filter(s => (s.academicRecord?.cumulativeGPA || 0) >= 3.5).length,
            icon: Award,
            color: 'green'
          },
          {
            title: 'At Risk',
            value: students.filter(s => (s.academicRecord?.cumulativeGPA || 0) < 2.5).length,
            icon: AlertCircle,
            color: 'red'
          },
          {
            title: 'Average GPA',
            value: (students.reduce((sum, s) => sum + (s.academicRecord?.cumulativeGPA || 0), 0) / students.length).toFixed(2),
            icon: Calculator,
            color: 'purple'
          }
        ].map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-2 bg-${stat.color}-100 rounded-md`}>
                  <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Export */}
          <button
            onClick={() => {
              // Handle export functionality
              console.log('Exporting academic records...');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select
                  value={filters.program}
                  onChange={(e) => setFilters(prev => ({ ...prev, program: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Programs</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Probation">Probation</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GPA Range</label>
                <select
                  value={filters.gpaRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, gpaRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All GPAs</option>
                  <option value="high">High (3.5+)</option>
                  <option value="medium">Medium (2.5-3.5)</option>
                  <option value="low">Low (&lt;2.5)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                <select
                  value={filters.semester}
                  onChange={(e) => setFilters(prev => ({ ...prev, semester: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Semesters</option>
                  <option value="Fall 2025">Fall 2025</option>
                  <option value="Spring 2025">Spring 2025</option>
                  <option value="Summer 2025">Summer 2025</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Students Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading academic records...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GPA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <GPABadge gpa={student.academicRecord?.cumulativeGPA || 0} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.academicRecord?.totalCredits || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={student.academicRecord?.academicStatus || student.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setActiveTab('overview');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Academic Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setShowTranscriptModal(true);
                              setSelectedStudent(student);
                            }}
                            className="text-green-600 hover:text-green-900"
                            title="View Transcript"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          {canEditGrades && (
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setActiveTab('grades');
                              }}
                              className="text-gray-600 hover:text-gray-900"
                              title="Manage Grades"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, filteredStudents.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredStudents.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Academic Detail Modal */}
      {selectedStudent && (
        <AcademicDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Help Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Academic Records Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-800">Grade Management</h4>
            <p className="text-green-700">View and manage student grades across all courses and semesters</p>
          </div>
          <div>
            <h4 className="font-medium text-green-800">Transcript Generation</h4>
            <p className="text-green-700">Generate official transcripts for students and alumni</p>
          </div>
          <div>
            <h4 className="font-medium text-green-800">Academic Analytics</h4>
            <p className="text-green-700">Track GPA trends, credit progress, and graduation requirements</p>
          </div>
        </div>
      </div>

      {/* Grade Entry Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowGradeModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Grade</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter grade information for the selected student
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select course</option>
                      <option value="CS101">CS101 - Introduction to Computer Science</option>
                      <option value="MATH201">MATH201 - Calculus II</option>
                      <option value="ENG102">ENG102 - English Composition</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select grade</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credits
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Semester
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select semester</option>
                      <option value="Fall 2025">Fall 2025</option>
                      <option value="Spring 2025">Spring 2025</option>
                      <option value="Summer 2025">Summer 2025</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Additional notes about this grade..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    // Handle save grade
                    setShowGradeModal(false);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Grade
                </button>
                <button
                  onClick={() => setShowGradeModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {showTranscriptModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowTranscriptModal(false)}></div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white">
                {/* Transcript Header */}
                <div className="bg-blue-600 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Official Academic Transcript</h3>
                      <p className="text-blue-100 text-sm mt-1">
                        {selectedStudent.name} - {selectedStudent.studentId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100 text-sm">Generated: {new Date().toLocaleDateString()}</p>
                      <p className="text-blue-100 text-sm">University Management System</p>
                    </div>
                  </div>
                </div>

                {/* Transcript Content */}
                <div className="px-6 py-6 max-h-96 overflow-y-auto">
                  {/* Student Information */}
                  <div className="mb-6 border-b pb-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Student Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Student ID:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.studentId}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Program:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.program}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Year:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.year}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date of Birth:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.dateOfBirth || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Enrollment Date:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.enrollmentDate || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Summary */}
                  <div className="mb-6 border-b pb-4">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Academic Summary</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cumulative GPA:</span>
                        <span className="ml-2 text-gray-900 font-semibold">{selectedStudent.gpa?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Total Credits:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.totalCredits || 0}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Academic Status:</span>
                        <span className="ml-2 text-gray-900">{selectedStudent.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course History */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Course History</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                              Course Code
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                              Course Title
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                              Credits
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                              Grade
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">
                              Semester
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {/* Sample course data */}
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">CS101</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">Introduction to Computer Science</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">3</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">A-</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">Fall 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">MATH201</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">Calculus II</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">4</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">A</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">Fall 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">ENG102</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">English Composition</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">3</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">B+</td>
                            <td className="px-4 py-2 text-sm text-gray-900 border-b">Fall 2025</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="text-center text-xs text-gray-500 border-t pt-4">
                    <p>This is an official transcript generated by the University Management System</p>
                    <p>Document ID: TRANS-{selectedStudent.studentId}-{new Date().getFullYear()}</p>
                    <p>Generated on: {new Date().toLocaleString()}</p>
                  </div>
                </div>

                {/* Transcript Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex space-x-3 justify-end">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </button>
                    <button
                      onClick={() => {
                        // Handle download transcript
                        console.log('Download transcript for:', selectedStudent.name);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => setShowTranscriptModal(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicRecords;