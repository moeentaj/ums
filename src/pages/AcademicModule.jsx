// src/pages/AcademicModule.jsx - Complete Academic Management System
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../data/mockData';
import {
  BookOpen,
  Users,
  Calendar,
  Award,
  School,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FileText,
  GraduationCap
} from 'lucide-react';

// Sub-components (would normally be in separate files)
const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setCourses(mockData.courses);
      setLoading(false);
    };
    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(courses.map(course => course.department))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{course.code}</h3>
                <p className="text-gray-600">{course.name}</p>
                <p className="text-sm text-gray-500">{course.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-green-600 hover:text-green-800 p-1">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Credits</p>
                <p className="font-semibold">{course.credits}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-semibold text-sm">{course.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Enrolled</p>
                <p className="font-semibold">{course.enrolled}/{course.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule</p>
                <p className="font-semibold text-sm">{course.schedule?.days?.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {course.status}
              </span>
              <div className="text-right">
                <div className="text-sm text-gray-500">Utilization</div>
                <div className="text-sm font-semibold">
                  {Math.round((course.enrolled / course.capacity) * 100)}%
                </div>
              </div>
            </div>

            {course.waitlist > 0 && (
              <div className="mt-3 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center text-yellow-800">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{course.waitlist} students on waitlist</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new course.
          </p>
        </div>
      )}
    </div>
  );
};

const FacultyWorkload = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaculty = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setFaculty(mockData.faculty);
      setLoading(false);
    };
    loadFaculty();
  }, []);

  if (loading) {
    return <div className="animate-pulse bg-white rounded-lg shadow-sm border p-6"><div className="h-32 bg-gray-200 rounded"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Faculty Workload</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faculty.map((member) => {
                const courseCount = member.currentCourses?.length || 0;
                const studentCount = member.advisingStudents?.length || 0;
                const workloadLevel = courseCount >= 4 ? 'High' : courseCount >= 2 ? 'Normal' : 'Low';
                
                return (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{courseCount} courses</div>
                      <div className="text-xs text-gray-500">
                        {member.currentCourses?.slice(0, 2).join(', ')}
                        {courseCount > 2 && ` +${courseCount - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {studentCount} advisees
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        workloadLevel === 'High' ? 'bg-red-100 text-red-800' :
                        workloadLevel === 'Normal' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {workloadLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const GradingSystem = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('all');

  useEffect(() => {
    const loadGrades = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setGrades(mockData.academic.grades);
      setLoading(false);
    };
    loadGrades();
  }, []);

  const courses = [...new Set(grades.map(grade => grade.courseName))];
  const filteredGrades = selectedCourse === 'all' ? grades : grades.filter(g => g.courseName === selectedCourse);

  if (loading) {
    return <div className="animate-pulse bg-white rounded-lg shadow-sm border p-6"><div className="h-32 bg-gray-200 rounded"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Grading System</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FileText className="h-4 w-4 mr-2" />
            Grade Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
            <div className="space-y-3">
              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].map(grade => {
                const count = filteredGrades.filter(g => g.finalGrade === grade).length;
                const percentage = filteredGrades.length > 0 ? (count / filteredGrades.length * 100) : 0;
                return (
                  <div key={grade} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{grade}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                        <div className="text-sm text-gray-500">{grade.studentId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{grade.courseName}</div>
                        <div className="text-sm text-gray-500">{grade.courseId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {grade.assignments.slice(0, 3).map((assignment, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {assignment.score}/{assignment.maxScore}
                            </span>
                          ))}
                          {grade.assignments.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                              +{grade.assignments.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          grade.finalGrade.startsWith('A') ? 'bg-green-100 text-green-800' :
                          grade.finalGrade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                          grade.finalGrade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {grade.finalGrade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {grade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClassTimetable = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('week'); // week, month

  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setSchedules(mockData.academic.schedules);
      setLoading(false);
    };
    loadSchedules();
  }, []);

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  if (loading) {
    return <div className="animate-pulse bg-white rounded-lg shadow-sm border p-6"><div className="h-32 bg-gray-200 rounded"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Class Timetable</h2>
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month View
            </button>
          </div>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </button>
        </div>
      </div>

      {viewMode === 'week' ? (
        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Time</th>
                {weekDays.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className={timeIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {time}
                  </td>
                  {weekDays.map(day => {
                    // Mock data for demonstration
                    const hasClass = Math.random() > 0.7;
                    const courseCode = hasClass ? `CS-${Math.floor(Math.random() * 500) + 100}` : null;
                    const classroom = hasClass ? `Room ${Math.floor(Math.random() * 300) + 100}` : null;
                    
                    return (
                      <td key={day} className="px-2 py-2 text-center">
                        {hasClass ? (
                          <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 text-xs">
                            <div className="font-semibold text-blue-900">{courseCode}</div>
                            <div className="text-blue-700">{classroom}</div>
                          </div>
                        ) : (
                          <div className="h-12 flex items-center justify-center text-gray-400">
                            -
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
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Month View</h3>
            <p className="mt-1 text-sm text-gray-500">
              Month view calendar would be implemented here with a calendar library
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Academic Module Component
const AcademicModule = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeFaculty: 0,
    averageEnrollment: 0,
    pendingGrades: 0
  });

  // Calculate stats from mock data
  useEffect(() => {
    const courses = mockData.courses || [];
    const faculty = mockData.faculty || [];
    const grades = mockData.academic?.grades || [];
    
    setStats({
      totalCourses: courses.length,
      activeFaculty: faculty.filter(f => f.status === 'Active').length,
      averageEnrollment: courses.length > 0 ? 
        Math.round(courses.reduce((sum, course) => sum + course.enrolled, 0) / courses.length) : 0,
      pendingGrades: grades.filter(g => g.status === 'In Progress').length
    });
  }, []);

  // Tab configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, component: null },
    { id: 'courses', name: 'Course Management', icon: BookOpen, component: CourseManagement },
    { id: 'faculty', name: 'Faculty Workload', icon: Users, component: FacultyWorkload },
    { id: 'grading', name: 'Grading System', icon: Award, component: GradingSystem },
    { id: 'timetable', name: 'Class Timetable', icon: Calendar, component: ClassTimetable }
  ];

  // Permission check
  if (!hasPermission('all') && user?.role !== 'admin' && user?.role !== 'faculty') {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-yellow-200 p-8 text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access the Academic Management system.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Overview Component
  const OverviewComponent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Faculty</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeFaculty}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <School className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Enrollment</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageEnrollment}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grades</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingGrades}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Courses</h3>
            <BookOpen className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {mockData.courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{course.code}</div>
                  <div className="text-sm text-gray-500">{course.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{course.enrolled}/{course.capacity}</div>
                  <div className="text-xs text-gray-500">enrolled</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('courses')}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View All Courses
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Faculty Status</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {mockData.faculty.slice(0, 3).map((faculty) => (
              <div key={faculty.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{faculty.name}</div>
                  <div className="text-sm text-gray-500">{faculty.department}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{faculty.currentCourses?.length || 0}</div>
                  <div className="text-xs text-gray-500">courses</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('faculty')}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            View Faculty Workload
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
            <CheckCircle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Grade Submission Due</div>
                <div className="text-sm text-gray-500">CS-301 Final Grades</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="h-4 w-4 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Schedule Review</div>
                <div className="text-sm text-gray-500">Spring 2026 Planning</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <GraduationCap className="h-4 w-4 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Curriculum Update</div>
                <div className="text-sm text-gray-500">Program Requirements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Academic Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Course Created', detail: 'CS-401 Advanced Algorithms added to Fall 2025', time: '2 hours ago', icon: BookOpen, color: 'blue' },
            { action: 'Grades Posted', detail: 'BUS-201 midterm grades published', time: '4 hours ago', icon: Award, color: 'green' },
            { action: 'Schedule Updated', detail: 'ENG-101 time changed to MWF 10:00-11:00 AM', time: '1 day ago', icon: Calendar, color: 'purple' },
            { action: 'Faculty Assignment', detail: 'Dr. Emily Chen assigned to MECH-301', time: '2 days ago', icon: Users, color: 'yellow' }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.detail}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Management</h1>
          <nav className="text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 font-medium">Academic Management</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && <OverviewComponent />}
          {tabs.find(tab => tab.id === activeTab && tab.component) && 
            React.createElement(tabs.find(tab => tab.id === activeTab).component)
          }
        </div>
      </div>
    </div>
  );
};

export default AcademicModule;