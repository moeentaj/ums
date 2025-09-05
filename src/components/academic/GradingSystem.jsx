// src/components/academic/GradingSystem.jsx - Complete Grading System Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import {
  Award,
  BookOpen,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Edit,
  Save,
  X,
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Upload,
  Percent,
  Target,
  Star
} from 'lucide-react';

const GradingSystem = () => {
  const { user, hasPermission } = useAuth();
  
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: 'all',
    semester: 'current',
    status: 'all',
    instructor: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);
  const [showBulkEntry, setShowBulkEntry] = useState(false);
  const [showGradeDetails, setShowGradeDetails] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [gradeStats, setGradeStats] = useState({});
  const [activeTab, setActiveTab] = useState('overview'); // overview, entry, analytics

  useEffect(() => {
    const loadGrades = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate comprehensive grade data
      const gradesData = generateGradeData();
      setGrades(gradesData);
      calculateGradeStats(gradesData);
      setLoading(false);
    };
    loadGrades();
  }, []);

  // Generate comprehensive grade data
  const generateGradeData = () => {
    const courses = ['CS-101', 'CS-201', 'MATH-101', 'ENG-101', 'BUS-101'];
    const students = [
      'John Smith', 'Emily Davis', 'Michael Brown', 'Sarah Johnson', 'David Wilson',
      'Lisa Chen', 'Robert Taylor', 'Amanda White', 'Kevin Martinez', 'Rachel Kim'
    ];
    const instructors = ['Dr. Sarah Wilson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'];
    
    return students.flatMap((student, studentIndex) => 
      courses.map((course, courseIndex) => ({
        id: `GRADE_${studentIndex}_${courseIndex}`,
        studentId: `STU${String(studentIndex + 1).padStart(3, '0')}`,
        studentName: student,
        courseCode: course,
        courseName: getCourseNameFromCode(course),
        instructor: instructors[courseIndex % instructors.length],
        semester: 'Fall 2025',
        credits: 3,
        assignments: generateAssignmentGrades(),
        midtermGrade: Math.floor(Math.random() * 30) + 70, // 70-100
        finalGrade: Math.floor(Math.random() * 30) + 70,   // 70-100
        finalLetterGrade: '',
        gpa: 0,
        status: Math.random() > 0.2 ? 'Completed' : 'In Progress',
        submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        attendance: Math.floor(Math.random() * 20) + 80, // 80-100%
        participation: Math.floor(Math.random() * 30) + 70, // 70-100
        notes: Math.random() > 0.8 ? 'Excellent performance throughout the semester' : ''
      }))
    ).map(grade => {
      // Calculate final grade and GPA
      const assignmentAvg = grade.assignments.reduce((sum, a) => sum + a.score, 0) / grade.assignments.length;
      const finalScore = (assignmentAvg * 0.4) + (grade.midtermGrade * 0.25) + (grade.finalGrade * 0.35);
      
      grade.finalLetterGrade = getLetterGrade(finalScore);
      grade.gpa = getGPAFromGrade(grade.finalLetterGrade);
      grade.finalScore = Math.round(finalScore);
      
      return grade;
    });
  };

  const getCourseNameFromCode = (code) => {
    const courseNames = {
      'CS-101': 'Introduction to Computer Science',
      'CS-201': 'Data Structures',
      'MATH-101': 'Calculus I',
      'ENG-101': 'English Composition',
      'BUS-101': 'Introduction to Business'
    };
    return courseNames[code] || 'Unknown Course';
  };

  const generateAssignmentGrades = () => {
    const assignmentTypes = ['Homework 1', 'Quiz 1', 'Project 1', 'Homework 2', 'Quiz 2'];
    return assignmentTypes.map((type, index) => ({
      id: `ASSIGN_${index}`,
      name: type,
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      maxScore: 100,
      weight: 20,
      dueDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  };

  const getLetterGrade = (score) => {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 63) return 'D';
    if (score >= 60) return 'D-';
    return 'F';
  };

  const getGPAFromGrade = (letterGrade) => {
    const gpaScale = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    return gpaScale[letterGrade] || 0.0;
  };

  // Calculate grade statistics
  const calculateGradeStats = (gradesData) => {
    const stats = {
      totalStudents: gradesData.length,
      averageGPA: 0,
      gradeDistribution: {},
      completionRate: 0,
      pendingGrades: 0,
      courseStats: {}
    };

    if (gradesData.length > 0) {
      // Calculate average GPA
      const totalGPA = gradesData.reduce((sum, grade) => sum + grade.gpa, 0);
      stats.averageGPA = (totalGPA / gradesData.length).toFixed(2);

      // Grade distribution
      const distribution = {};
      gradesData.forEach(grade => {
        distribution[grade.finalLetterGrade] = (distribution[grade.finalLetterGrade] || 0) + 1;
      });
      stats.gradeDistribution = distribution;

      // Completion rate
      const completedGrades = gradesData.filter(g => g.status === 'Completed').length;
      stats.completionRate = ((completedGrades / gradesData.length) * 100).toFixed(1);

      // Pending grades
      stats.pendingGrades = gradesData.filter(g => g.status === 'In Progress').length;

      // Course-specific stats
      const courseGroups = gradesData.reduce((acc, grade) => {
        if (!acc[grade.courseCode]) acc[grade.courseCode] = [];
        acc[grade.courseCode].push(grade);
        return acc;
      }, {});

      Object.keys(courseGroups).forEach(courseCode => {
        const courseGrades = courseGroups[courseCode];
        const avgGPA = courseGrades.reduce((sum, g) => sum + g.gpa, 0) / courseGrades.length;
        const avgScore = courseGrades.reduce((sum, g) => sum + g.finalScore, 0) / courseGrades.length;
        
        stats.courseStats[courseCode] = {
          averageGPA: avgGPA.toFixed(2),
          averageScore: Math.round(avgScore),
          studentCount: courseGrades.length,
          passRate: ((courseGrades.filter(g => g.gpa >= 2.0).length / courseGrades.length) * 100).toFixed(1)
        };
      });
    }

    setGradeStats(stats);
  };

  // Get unique values for filtering
  const filterOptions = React.useMemo(() => {
    const courses = [...new Set(grades.map(g => g.courseCode))];
    const instructors = [...new Set(grades.map(g => g.instructor))];
    const semesters = [...new Set(grades.map(g => g.semester))];
    
    return {
      courses: courses.sort(),
      instructors: instructors.sort(),
      semesters: semesters.sort()
    };
  }, [grades]);

  // Filter grades
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filters.course === 'all' || grade.courseCode === filters.course;
    const matchesSemester = filters.semester === 'all' || grade.semester === filters.semester;
    const matchesStatus = filters.status === 'all' || grade.status === filters.status;
    const matchesInstructor = filters.instructor === 'all' || grade.instructor === filters.instructor;
    
    return matchesSearch && matchesCourse && matchesSemester && matchesStatus && matchesInstructor;
  });

  // Handle grade actions
  const handleEditGrade = (grade) => {
    if (!hasPermission('grade_write')) {
      alert('You do not have permission to edit grades.');
      return;
    }
    setEditingGrade(grade);
  };

  const handleViewDetails = (grade) => {
    setSelectedGrade(grade);
    setShowGradeDetails(true);
  };

  const handleSaveGrade = () => {
    if (editingGrade) {
      const updatedGrades = grades.map(g => 
        g.id === editingGrade.id ? editingGrade : g
      );
      setGrades(updatedGrades);
      calculateGradeStats(updatedGrades);
      setEditingGrade(null);
    }
  };

  const getGradeColor = (letterGrade) => {
    if (['A+', 'A', 'A-'].includes(letterGrade)) return 'text-green-600 bg-green-100';
    if (['B+', 'B', 'B-'].includes(letterGrade)) return 'text-blue-600 bg-blue-100';
    if (['C+', 'C', 'C-'].includes(letterGrade)) return 'text-yellow-600 bg-yellow-100';
    if (['D+', 'D', 'D-'].includes(letterGrade)) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
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
            <h2 className="text-2xl font-bold text-gray-900">Grading System</h2>
            <p className="text-gray-600">Manage grades, assessments, and academic performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Grades
            </button>
            {hasPermission('grade_write') && (
              <>
                <button
                  onClick={() => setShowBulkEntry(true)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Bulk Entry
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Grade
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Grade Overview', icon: BarChart3 },
              { id: 'entry', name: 'Grade Entry', icon: Edit },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Grades</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.totalStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.completionRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grades</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.pendingGrades}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <Target className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Grade Distribution</p>
              <p className="text-2xl font-bold text-gray-900">{Object.keys(gradeStats.gradeDistribution || {}).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search students, courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filters.course}
                  onChange={(e) => setFilters({...filters, course: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Courses</option>
                  {filterOptions.courses.map(course => (
                    <option key={course} value={course}>{course}</option>
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
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                          <div className="text-sm text-gray-500">{grade.studentId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{grade.courseCode}</div>
                          <div className="text-sm text-gray-500">{grade.courseName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.instructor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{grade.finalScore}%</div>
                        <div className="text-xs text-gray-500">Attendance: {grade.attendance}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.finalLetterGrade)}`}>
                          {grade.finalLetterGrade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.gpa.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grade.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {grade.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(grade)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {hasPermission('grade_write') && (
                            <button
                              onClick={() => handleEditGrade(grade)}
                              className="text-green-600 hover:text-green-900"
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
          </div>
        </>
      )}

      {activeTab === 'entry' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <Edit className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Grade Entry Interface</h3>
            <p className="mt-1 text-sm text-gray-500">
              Advanced grade entry interface would be implemented here with spreadsheet-like functionality,
              assignment breakdown, rubric management, and batch operations.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Grade Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(gradeStats.gradeDistribution || {}).map(([grade, count]) => (
                <div key={grade} className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-lg font-bold ${getGradeColor(grade)}`}>
                    {grade}
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-900">{count}</div>
                    <div className="text-xs text-gray-500">students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
            <div className="space-y-4">
              {Object.entries(gradeStats.courseStats || {}).map(([courseCode, stats]) => (
                <div key={courseCode} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{courseCode}</h4>
                    <span className="text-sm text-gray-500">{stats.studentCount} students</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Average GPA</p>
                      <p className="font-medium text-lg text-green-600">{stats.averageGPA}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average Score</p>
                      <p className="font-medium text-lg text-blue-600">{stats.averageScore}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pass Rate</p>
                      <p className="font-medium text-lg text-purple-600">{stats.passRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grade Details Modal */}
      {showGradeDetails && selectedGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Grade Details: {selectedGrade.studentName} - {selectedGrade.courseCode}
                </h3>
                <button
                  onClick={() => setShowGradeDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student & Course Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Course Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Course</p>
                        <p className="font-medium text-gray-900">{selectedGrade.courseCode} - {selectedGrade.courseName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Instructor</p>
                        <p className="font-medium text-gray-900">{selectedGrade.instructor}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Semester</p>
                        <p className="font-medium text-gray-900">{selectedGrade.semester}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Credits</p>
                        <p className="font-medium text-gray-900">{selectedGrade.credits}</p>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Breakdown */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Assignment Breakdown</h4>
                    <div className="space-y-2">
                      {selectedGrade.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{assignment.name}</p>
                            <p className="text-xs text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{assignment.score}/{assignment.maxScore}</p>
                            <p className="text-xs text-gray-500">{Math.round((assignment.score / assignment.maxScore) * 100)}%</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Midterm Exam</p>
                          <p className="text-xs text-blue-700">25% of final grade</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-blue-900">{selectedGrade.midtermGrade}/100</p>
                          <p className="text-xs text-blue-700">{selectedGrade.midtermGrade}%</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div>
                          <p className="text-sm font-medium text-green-900">Final Exam</p>
                          <p className="text-xs text-green-700">35% of final grade</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-900">{selectedGrade.finalGrade}/100</p>
                          <p className="text-xs text-green-700">{selectedGrade.finalGrade}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedGrade.notes && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Instructor Notes</h4>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-gray-900">{selectedGrade.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Grade Summary */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Final Grade</h4>
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold ${getGradeColor(selectedGrade.finalLetterGrade)}`}>
                        {selectedGrade.finalLetterGrade}
                      </div>
                      <div className="mt-3">
                        <p className="text-lg font-semibold text-gray-900">{selectedGrade.finalScore}%</p>
                        <p className="text-sm text-gray-500">GPA: {selectedGrade.gpa.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Attendance</span>
                        <span className="text-sm font-medium text-gray-900">{selectedGrade.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Participation</span>
                        <span className="text-sm font-medium text-gray-900">{selectedGrade.participation}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Status</span>
                        <span className={`text-sm font-medium ${
                          selectedGrade.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {selectedGrade.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Last Modified</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(selectedGrade.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Grade Modal */}
      {editingGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Grade: {editingGrade.studentName} - {editingGrade.courseCode}
                </h3>
                <button
                  onClick={() => setEditingGrade(null)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Midterm Grade</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingGrade.midtermGrade}
                      onChange={(e) => setEditingGrade({...editingGrade, midtermGrade: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Final Grade</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingGrade.finalGrade}
                      onChange={(e) => setEditingGrade({...editingGrade, finalGrade: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attendance (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingGrade.attendance}
                      onChange={(e) => setEditingGrade({...editingGrade, attendance: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Participation</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingGrade.participation}
                      onChange={(e) => setEditingGrade({...editingGrade, participation: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingGrade.status}
                    onChange={(e) => setEditingGrade({...editingGrade, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={editingGrade.notes}
                    onChange={(e) => setEditingGrade({...editingGrade, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add instructor notes..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingGrade(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGrade}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Entry Modal */}
      {showBulkEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Bulk Grade Entry</h3>
                <button
                  onClick={() => setShowBulkEntry(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Bulk Grade Entry</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Advanced bulk entry interface would be implemented here with CSV upload,
                  spreadsheet import, and batch processing capabilities.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBulkEntry(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Process Grades
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingSystem;