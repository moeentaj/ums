// src/components/academic/FacultyWorkload.jsx - Complete Faculty Workload Management
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import {
  Users,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap,
  FileText,
  Settings,
  UserCheck,
  Activity
} from 'lucide-react';

const FacultyWorkload = () => {
  const { user, hasPermission } = useAuth();
  
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    workload: 'all',
    status: 'all'
  });
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // cards or table

  useEffect(() => {
    const loadFaculty = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Enhanced faculty data with calculated workload metrics
      const enhancedFaculty = generateEnhancedFacultyData();
      setFaculty(enhancedFaculty);
      setLoading(false);
    };
    loadFaculty();
  }, []);

  // Generate enhanced faculty data with comprehensive workload information
  const generateEnhancedFacultyData = () => {
    return [
      {
        id: 'FAC001',
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        phone: '+1 (555) 0123',
        department: 'Computer Science',
        title: 'Professor',
        status: 'Active',
        officeLocation: 'CS Building, Room 301',
        hireDate: '2018-09-01',
        currentCourses: [
          { code: 'CS-101', name: 'Introduction to Programming', credits: 3, enrolled: 45, capacity: 50 },
          { code: 'CS-301', name: 'Advanced Algorithms', credits: 3, enrolled: 28, capacity: 30 },
          { code: 'CS-401', name: 'Senior Capstone', credits: 3, enrolled: 15, capacity: 20 }
        ],
        advisingStudents: [
          { id: 'STU001', name: 'John Smith', year: 'Senior', program: 'Computer Science' },
          { id: 'STU002', name: 'Emily Davis', year: 'Junior', program: 'Computer Science' },
          { id: 'STU003', name: 'Michael Brown', year: 'Senior', program: 'Computer Science' }
        ],
        committees: ['Curriculum Committee', 'Graduate Admissions'],
        research: {
          activeGrants: 2,
          publications: 15,
          projects: ['AI in Education', 'Machine Learning Applications']
        },
        officeHours: {
          monday: '2:00 PM - 4:00 PM',
          wednesday: '2:00 PM - 4:00 PM',
          friday: '10:00 AM - 12:00 PM'
        },
        specializations: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
        teachingLoad: 9, // credit hours
        maxLoad: 12,
        utilizationRate: 75,
        workloadLevel: 'Normal',
        performance: {
          studentRating: 4.2,
          courseCompletionRate: 95,
          researchProductivity: 'High'
        }
      },
      {
        id: 'FAC002',
        name: 'Dr. Michael Chen',
        email: 'michael.chen@university.edu',
        phone: '+1 (555) 0124',
        department: 'Business',
        title: 'Associate Professor',
        status: 'Active',
        officeLocation: 'Business Building, Room 205',
        hireDate: '2020-01-15',
        currentCourses: [
          { code: 'BUS-101', name: 'Introduction to Business', credits: 3, enrolled: 60, capacity: 65 },
          { code: 'BUS-301', name: 'Strategic Management', credits: 3, enrolled: 35, capacity: 40 },
          { code: 'BUS-401', name: 'Business Ethics', credits: 3, enrolled: 25, capacity: 30 },
          { code: 'BUS-501', name: 'MBA Leadership', credits: 3, enrolled: 20, capacity: 25 }
        ],
        advisingStudents: [
          { id: 'STU004', name: 'Sarah Johnson', year: 'Junior', program: 'Business Administration' },
          { id: 'STU005', name: 'David Wilson', year: 'Senior', program: 'Business Administration' },
          { id: 'STU006', name: 'Lisa Chen', year: 'Graduate', program: 'MBA' },
          { id: 'STU007', name: 'Robert Taylor', year: 'Graduate', program: 'MBA' },
          { id: 'STU008', name: 'Amanda White', year: 'Senior', program: 'Business Administration' }
        ],
        committees: ['Faculty Senate', 'Strategic Planning Committee', 'Budget Committee'],
        research: {
          activeGrants: 1,
          publications: 8,
          projects: ['Sustainable Business Practices', 'Leadership Development']
        },
        officeHours: {
          tuesday: '1:00 PM - 3:00 PM',
          thursday: '1:00 PM - 3:00 PM'
        },
        specializations: ['Strategic Management', 'Leadership', 'Business Ethics'],
        teachingLoad: 12, // credit hours
        maxLoad: 12,
        utilizationRate: 100,
        workloadLevel: 'High',
        performance: {
          studentRating: 4.5,
          courseCompletionRate: 98,
          researchProductivity: 'Medium'
        }
      },
      {
        id: 'FAC003',
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@university.edu',
        phone: '+1 (555) 0125',
        department: 'Mathematics',
        title: 'Assistant Professor',
        status: 'Active',
        officeLocation: 'Math Building, Room 102',
        hireDate: '2022-08-20',
        currentCourses: [
          { code: 'MATH-101', name: 'Calculus I', credits: 4, enrolled: 80, capacity: 85 },
          { code: 'MATH-201', name: 'Linear Algebra', credits: 3, enrolled: 35, capacity: 40 }
        ],
        advisingStudents: [
          { id: 'STU009', name: 'Kevin Martinez', year: 'Sophomore', program: 'Mathematics' }
        ],
        committees: ['New Faculty Committee'],
        research: {
          activeGrants: 1,
          publications: 5,
          projects: ['Applied Mathematics in Engineering']
        },
        officeHours: {
          monday: '10:00 AM - 12:00 PM',
          wednesday: '10:00 AM - 12:00 PM',
          friday: '2:00 PM - 4:00 PM'
        },
        specializations: ['Applied Mathematics', 'Linear Algebra', 'Mathematical Modeling'],
        teachingLoad: 7, // credit hours
        maxLoad: 12,
        utilizationRate: 58,
        workloadLevel: 'Low',
        performance: {
          studentRating: 4.0,
          courseCompletionRate: 92,
          researchProductivity: 'Medium'
        }
      },
      {
        id: 'FAC004',
        name: 'Prof. James Thompson',
        email: 'james.thompson@university.edu',
        phone: '+1 (555) 0126',
        department: 'Engineering',
        title: 'Professor',
        status: 'Active',
        officeLocation: 'Engineering Building, Room 401',
        hireDate: '2015-01-10',
        currentCourses: [
          { code: 'ENG-201', name: 'Engineering Mechanics', credits: 4, enrolled: 50, capacity: 55 },
          { code: 'ENG-301', name: 'Thermodynamics', credits: 3, enrolled: 40, capacity: 45 },
          { code: 'ENG-401', name: 'Design Project', credits: 4, enrolled: 25, capacity: 30 }
        ],
        advisingStudents: [
          { id: 'STU010', name: 'Alex Johnson', year: 'Senior', program: 'Mechanical Engineering' },
          { id: 'STU011', name: 'Maria Garcia', year: 'Junior', program: 'Mechanical Engineering' },
          { id: 'STU012', name: 'Chris Lee', year: 'Senior', program: 'Mechanical Engineering' },
          { id: 'STU013', name: 'Jessica Brown', year: 'Graduate', program: 'Engineering' }
        ],
        committees: ['ABET Accreditation', 'Engineering Curriculum Committee'],
        research: {
          activeGrants: 3,
          publications: 25,
          projects: ['Renewable Energy Systems', 'Advanced Materials Research']
        },
        officeHours: {
          tuesday: '9:00 AM - 11:00 AM',
          thursday: '9:00 AM - 11:00 AM'
        },
        specializations: ['Mechanical Engineering', 'Thermodynamics', 'Renewable Energy'],
        teachingLoad: 11, // credit hours
        maxLoad: 12,
        utilizationRate: 92,
        workloadLevel: 'High',
        performance: {
          studentRating: 4.3,
          courseCompletionRate: 96,
          researchProductivity: 'High'
        }
      },
      {
        id: 'FAC005',
        name: 'Dr. Lisa Anderson',
        email: 'lisa.anderson@university.edu',
        phone: '+1 (555) 0127',
        department: 'Psychology',
        title: 'Associate Professor',
        status: 'Sabbatical',
        officeLocation: 'Psychology Building, Room 201',
        hireDate: '2019-09-01',
        currentCourses: [], // On sabbatical
        advisingStudents: [
          { id: 'STU014', name: 'Rachel Kim', year: 'Graduate', program: 'Clinical Psychology' },
          { id: 'STU015', name: 'Tom Wilson', year: 'Graduate', program: 'Clinical Psychology' }
        ],
        committees: ['Research Ethics Committee'],
        research: {
          activeGrants: 2,
          publications: 12,
          projects: ['Mental Health in Higher Education', 'Cognitive Behavioral Therapy Research']
        },
        officeHours: {},
        specializations: ['Clinical Psychology', 'Cognitive Behavioral Therapy', 'Research Methods'],
        teachingLoad: 0, // On sabbatical
        maxLoad: 12,
        utilizationRate: 0,
        workloadLevel: 'Sabbatical',
        performance: {
          studentRating: 4.4,
          courseCompletionRate: 97,
          researchProductivity: 'High'
        }
      }
    ];
  };

  // Filter faculty based on search and filters
  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filters.department === 'all' || member.department === filters.department;
    const matchesWorkload = filters.workload === 'all' || member.workloadLevel === filters.workload;
    const matchesStatus = filters.status === 'all' || member.status === filters.status;
    
    return matchesSearch && matchesDepartment && matchesWorkload && matchesStatus;
  });

  // Get unique values for filters
  const departments = [...new Set(faculty.map(f => f.department))];
  const workloadLevels = [...new Set(faculty.map(f => f.workloadLevel))];
  const statuses = [...new Set(faculty.map(f => f.status))];

  // Calculate overall statistics
  const overallStats = {
    totalFaculty: faculty.length,
    activeFaculty: faculty.filter(f => f.status === 'Active').length,
    averageLoad: faculty.length > 0 
      ? Math.round(faculty.reduce((sum, f) => sum + f.teachingLoad, 0) / faculty.length)
      : 0,
    averageUtilization: faculty.length > 0 
      ? Math.round(faculty.reduce((sum, f) => sum + f.utilizationRate, 0) / faculty.length)
      : 0,
    highWorkload: faculty.filter(f => f.workloadLevel === 'High').length,
    lowWorkload: faculty.filter(f => f.workloadLevel === 'Low').length,
    averageRating: faculty.length > 0 
      ? (faculty.reduce((sum, f) => sum + f.performance.studentRating, 0) / faculty.length).toFixed(1)
      : 0
  };

  // Handle faculty actions
  const handleViewDetails = (facultyMember) => {
    setSelectedFaculty(facultyMember);
    setShowDetailsModal(true);
  };

  const handleAssignCourse = (facultyMember) => {
    if (!hasPermission('faculty_write')) {
      alert('You do not have permission to assign courses.');
      return;
    }
    setSelectedFaculty(facultyMember);
    setShowAssignModal(true);
  };

  const getWorkloadColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Sabbatical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (rate) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
            <h2 className="text-2xl font-bold text-gray-900">Faculty Workload Management</h2>
            <p className="text-gray-600">Monitor faculty teaching loads, assignments, and performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {viewMode === 'cards' ? 'Table View' : 'Card View'}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Faculty</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalFaculty}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Faculty</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.activeFaculty}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Load</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageLoad}h</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageUtilization}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">High Workload</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.highWorkload}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingDown className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Low Workload</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.lowWorkload}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search faculty..."
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
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filters.workload}
              onChange={(e) => setFilters({...filters, workload: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Workloads</option>
              {workloadLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Faculty List */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{member.title} • {member.department}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member.workloadLevel)}`}>
                        {member.workloadLevel}
                      </span>
                      <span className={`text-sm font-medium ${getUtilizationColor(member.utilizationRate)}`}>
                        {member.utilizationRate}% utilized
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => handleViewDetails(member)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {hasPermission('faculty_write') && (
                      <button
                        onClick={() => handleAssignCourse(member)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Teaching Load:</span>
                    <span className="font-medium">{member.teachingLoad}/{member.maxLoad} hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Current Courses:</span>
                    <span className="font-medium">{member.currentCourses.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Advising Students:</span>
                    <span className="font-medium">{member.advisingStudents.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Student Rating:</span>
                    <span className="font-medium text-yellow-600">★ {member.performance.studentRating}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Research Projects:</span>
                    <span className="font-medium">{member.research.projects.length}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Workload</span>
                    <span>{member.utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        member.utilizationRate >= 90 ? 'bg-red-500' :
                        member.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(member.utilizationRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching Load</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFaculty.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.teachingLoad}/{member.maxLoad}h</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.currentCourses.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.advisingStudents.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                member.utilizationRate >= 90 ? 'bg-red-500' :
                                member.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(member.utilizationRate, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${getUtilizationColor(member.utilizationRate)}`}>
                          {member.utilizationRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-yellow-600">★ {member.performance.studentRating}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWorkloadColor(member.workloadLevel)}`}>
                        {member.workloadLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(member)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {hasPermission('faculty_write') && (
                          <button
                            onClick={() => handleAssignCourse(member)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Plus className="h-4 w-4" />
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
      )}

      {/* Faculty Details Modal */}
      {showDetailsModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Faculty Details: {selectedFaculty.name}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Title</p>
                        <p className="font-medium text-gray-900">{selectedFaculty.title}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Department</p>
                        <p className="font-medium text-gray-900">{selectedFaculty.department}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium text-blue-600">{selectedFaculty.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">{selectedFaculty.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Office</p>
                        <p className="font-medium text-gray-900">{selectedFaculty.officeLocation}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hire Date</p>
                        <p className="font-medium text-gray-900">{new Date(selectedFaculty.hireDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Courses */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Current Courses</h4>
                    <div className="space-y-2">
                      {selectedFaculty.currentCourses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{course.name}</p>
                            <p className="text-xs text-gray-500">{course.code} • {course.credits} credits</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{course.enrolled}/{course.capacity}</p>
                            <p className="text-xs text-gray-500">enrolled</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Research & Committees */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Research</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Active Grants:</span>
                          <span className="font-medium">{selectedFaculty.research.activeGrants}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Publications:</span>
                          <span className="font-medium">{selectedFaculty.research.publications}</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Current Projects:</p>
                          {selectedFaculty.research.projects.map((project, index) => (
                            <p key={index} className="text-sm text-gray-900">• {project}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Committees</h4>
                      <div className="space-y-1">
                        {selectedFaculty.committees.map((committee, index) => (
                          <p key={index} className="text-sm text-gray-900">• {committee}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Information */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Workload Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Teaching Load</span>
                        <span className="text-sm font-medium text-gray-900">{selectedFaculty.teachingLoad}/{selectedFaculty.maxLoad}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Utilization Rate</span>
                        <span className={`text-sm font-medium ${getUtilizationColor(selectedFaculty.utilizationRate)}`}>
                          {selectedFaculty.utilizationRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Workload Level</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getWorkloadColor(selectedFaculty.workloadLevel)}`}>
                          {selectedFaculty.workloadLevel}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedFaculty.utilizationRate >= 90 ? 'bg-red-500' :
                            selectedFaculty.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(selectedFaculty.utilizationRate, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Student Rating</span>
                        <span className="text-sm font-medium text-yellow-600">★ {selectedFaculty.performance.studentRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Completion Rate</span>
                        <span className="text-sm font-medium text-green-600">{selectedFaculty.performance.courseCompletionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Research Productivity</span>
                        <span className="text-sm font-medium text-blue-600">{selectedFaculty.performance.researchProductivity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Office Hours</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedFaculty.officeHours).length > 0 ? (
                        Object.entries(selectedFaculty.officeHours).map(([day, time]) => (
                          <div key={day} className="flex justify-between text-sm">
                            <span className="text-gray-500 capitalize">{day}:</span>
                            <span className="font-medium text-gray-900">{time}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No office hours scheduled</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Specializations</h4>
                    <div className="space-y-1">
                      {selectedFaculty.specializations.map((spec, index) => (
                        <span key={index} className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-1 mb-1">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Advising Students</h4>
                    <div className="space-y-2">
                      {selectedFaculty.advisingStudents.map((student) => (
                        <div key={student.id} className="text-sm">
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.year} • {student.program}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Assignment Modal */}
      {showAssignModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Assign Course to {selectedFaculty.name}</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a course</option>
                    <option value="CS-102">CS-102 - Data Structures</option>
                    <option value="CS-201">CS-201 - Computer Organization</option>
                    <option value="CS-301">CS-301 - Database Systems</option>
                    <option value="CS-401">CS-401 - Software Engineering</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select semester</option>
                      <option value="Fall 2025">Fall 2025</option>
                      <option value="Spring 2026">Spring 2026</option>
                      <option value="Summer 2026">Summer 2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Days (e.g., MWF)"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Time (e.g., 10:00-11:30 AM)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Room number"
                  />
                </div>

                {/* Current Workload Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Workload Impact</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Current workload: {selectedFaculty.teachingLoad}/{selectedFaculty.maxLoad} hours ({selectedFaculty.utilizationRate}% utilization)
                      </p>
                      <p className="text-sm text-yellow-700">
                        Adding this course will increase utilization. Please review workload balance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Assign Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredFaculty.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No faculty found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || Object.values(filters).some(f => f !== 'all') 
              ? 'Try adjusting your search or filters.'
              : 'No faculty members match the current criteria.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyWorkload;