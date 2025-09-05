// src/components/academic/CurriculumPlanning.jsx - Complete Curriculum Planning Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import {
  School,
  BookOpen,
  Plus,
  Edit,
  Eye,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Download,
  Upload,
  Users,
  Clock,
  Award,
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ArrowRight,
  BarChart3,
  TrendingUp,
  Settings,
  Copy
} from 'lucide-react';

const CurriculumPlanning = () => {
  const { user, hasPermission } = useAuth();
  
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadPrograms = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate comprehensive curriculum data
      const curriculumData = generateCurriculumData();
      setPrograms(curriculumData);
      setLoading(false);
    };
    loadPrograms();
  }, []);

  // Generate comprehensive curriculum data
  const generateCurriculumData = () => {
    return [
      {
        id: 'PROG001',
        name: 'Computer Science',
        code: 'CS',
        department: 'Computer Science',
        level: 'Undergraduate',
        degree: 'Bachelor of Science',
        duration: 4,
        totalCredits: 120,
        status: 'Active',
        enrollmentCount: 450,
        graduationRate: 92,
        lastUpdated: '2024-08-15',
        description: 'Comprehensive computer science program covering software development, algorithms, and system design.',
        coordinator: {
          name: 'Dr. Sarah Wilson',
          email: 'sarah.wilson@university.edu',
          phone: '+1 (555) 0123'
        },
        requirements: {
          coreCredits: 72,
          electiveCredits: 36,
          generalEducation: 12,
          prerequisites: ['High School Mathematics', 'Physics'],
          minimumGPA: 2.0
        },
        semesters: [
          {
            semester: 1,
            name: 'First Semester',
            courses: [
              { code: 'CS-101', name: 'Introduction to Programming', credits: 3, type: 'core' },
              { code: 'MATH-101', name: 'Calculus I', credits: 4, type: 'core' },
              { code: 'ENG-101', name: 'English Composition', credits: 3, type: 'general' },
              { code: 'PHYS-101', name: 'Physics I', credits: 4, type: 'core' },
              { code: 'GEN-101', name: 'University Seminar', credits: 1, type: 'general' }
            ]
          },
          {
            semester: 2,
            name: 'Second Semester',
            courses: [
              { code: 'CS-102', name: 'Data Structures', credits: 3, type: 'core' },
              { code: 'MATH-102', name: 'Calculus II', credits: 4, type: 'core' },
              { code: 'ENG-102', name: 'Technical Writing', credits: 3, type: 'general' },
              { code: 'PHYS-102', name: 'Physics II', credits: 4, type: 'core' },
              { code: 'HIST-101', name: 'World History', credits: 3, type: 'general' }
            ]
          }
          // Add more semesters as needed
        ],
        careerOutcomes: [
          { title: 'Software Developer', percentage: 35, averageSalary: '$75,000' },
          { title: 'Data Scientist', percentage: 20, averageSalary: '$85,000' },
          { title: 'Systems Analyst', percentage: 15, averageSalary: '$70,000' },
          { title: 'Graduate Studies', percentage: 30, averageSalary: 'N/A' }
        ]
      },
      {
        id: 'PROG002',
        name: 'Business Administration',
        code: 'BUS',
        department: 'Business',
        level: 'Undergraduate',
        degree: 'Bachelor of Business Administration',
        duration: 4,
        totalCredits: 120,
        status: 'Active',
        enrollmentCount: 380,
        graduationRate: 88,
        lastUpdated: '2024-07-20',
        description: 'Comprehensive business program focusing on management, finance, and entrepreneurship.',
        coordinator: {
          name: 'Dr. Michael Chen',
          email: 'michael.chen@university.edu',
          phone: '+1 (555) 0124'
        },
        requirements: {
          coreCredits: 78,
          electiveCredits: 30,
          generalEducation: 12,
          prerequisites: ['High School Mathematics', 'Economics'],
          minimumGPA: 2.5
        },
        semesters: [
          {
            semester: 1,
            name: 'First Semester',
            courses: [
              { code: 'BUS-101', name: 'Introduction to Business', credits: 3, type: 'core' },
              { code: 'MATH-105', name: 'Business Mathematics', credits: 3, type: 'core' },
              { code: 'ENG-101', name: 'English Composition', credits: 3, type: 'general' },
              { code: 'ECON-101', name: 'Microeconomics', credits: 3, type: 'core' },
              { code: 'SOC-101', name: 'Introduction to Sociology', credits: 3, type: 'general' }
            ]
          }
        ],
        careerOutcomes: [
          { title: 'Business Analyst', percentage: 25, averageSalary: '$65,000' },
          { title: 'Project Manager', percentage: 20, averageSalary: '$72,000' },
          { title: 'Financial Analyst', percentage: 18, averageSalary: '$68,000' },
          { title: 'Marketing Specialist', percentage: 15, averageSalary: '$58,000' },
          { title: 'Entrepreneur', percentage: 22, averageSalary: 'Varies' }
        ]
      },
      {
        id: 'PROG003',
        name: 'Data Science',
        code: 'DS',
        department: 'Computer Science',
        level: 'Graduate',
        degree: 'Master of Science',
        duration: 2,
        totalCredits: 36,
        status: 'Active',
        enrollmentCount: 120,
        graduationRate: 95,
        lastUpdated: '2024-09-01',
        description: 'Advanced program in data science, machine learning, and analytics.',
        coordinator: {
          name: 'Dr. Emily Rodriguez',
          email: 'emily.rodriguez@university.edu',
          phone: '+1 (555) 0125'
        },
        requirements: {
          coreCredits: 24,
          electiveCredits: 9,
          thesis: 3,
          prerequisites: ['Bachelor\'s in CS, Math, or Statistics', 'Programming Experience'],
          minimumGPA: 3.0
        },
        semesters: [
          {
            semester: 1,
            name: 'First Semester',
            courses: [
              { code: 'DS-601', name: 'Statistical Learning', credits: 3, type: 'core' },
              { code: 'DS-602', name: 'Machine Learning', credits: 3, type: 'core' },
              { code: 'DS-603', name: 'Data Mining', credits: 3, type: 'core' },
              { code: 'DS-604', name: 'Big Data Analytics', credits: 3, type: 'core' }
            ]
          }
        ],
        careerOutcomes: [
          { title: 'Data Scientist', percentage: 40, averageSalary: '$95,000' },
          { title: 'ML Engineer', percentage: 25, averageSalary: '$105,000' },
          { title: 'Research Scientist', percentage: 20, averageSalary: '$110,000' },
          { title: 'Analytics Manager', percentage: 15, averageSalary: '$90,000' }
        ]
      }
    ];
  };

  // Filter programs
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || program.department === selectedDepartment;
    const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel;
    
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  // Get unique values for filters
  const departments = [...new Set(programs.map(p => p.department))];
  const levels = [...new Set(programs.map(p => p.level))];

  // Handle program actions
  const handleAddProgram = () => {
    if (!hasPermission('curriculum_write')) {
      alert('You do not have permission to add programs.');
      return;
    }
    setShowAddModal(true);
  };

  const handleEditProgram = (program) => {
    if (!hasPermission('curriculum_write')) {
      alert('You do not have permission to edit programs.');
      return;
    }
    setSelectedProgram(program);
    setShowEditModal(true);
  };

  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    setActiveTab('details');
  };

  const handleDeleteProgram = (programId) => {
    if (!hasPermission('curriculum_delete')) {
      alert('You do not have permission to delete programs.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== programId));
    }
  };

  const handleCloneProgram = (program) => {
    if (!hasPermission('curriculum_write')) {
      alert('You do not have permission to clone programs.');
      return;
    }
    const clonedProgram = {
      ...program,
      id: `PROG${Date.now()}`,
      name: `${program.name} (Copy)`,
      code: `${program.code}-COPY`,
      status: 'Planning',
      enrollmentCount: 0
    };
    setPrograms([...programs, clonedProgram]);
  };

  // Calculate overall statistics
  const stats = {
    totalPrograms: programs.length,
    activePrograms: programs.filter(p => p.status === 'Active').length,
    totalStudents: programs.reduce((sum, p) => sum + p.enrollmentCount, 0),
    averageGraduationRate: programs.length > 0 
      ? Math.round(programs.reduce((sum, p) => sum + p.graduationRate, 0) / programs.length)
      : 0
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
            <h2 className="text-2xl font-bold text-gray-900">Curriculum Planning</h2>
            <p className="text-gray-600">Design and manage academic programs and degree requirements</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {viewMode === 'grid' ? 'Table View' : 'Grid View'}
            </button>
            {hasPermission('curriculum_write') && (
              <button
                onClick={handleAddProgram}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Program
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <School className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPrograms}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activePrograms}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollment</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Graduation Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageGraduationRate}%</p>
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
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Programs List/Grid */}
      {activeTab === 'overview' && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                        <p className="text-sm text-gray-500">{program.code} • {program.degree}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                          program.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {program.status}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleViewProgram(program)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {hasPermission('curriculum_write') && (
                          <>
                            <button
                              onClick={() => handleEditProgram(program)}
                              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleCloneProgram(program)}
                              className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProgram(program.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium">{program.duration} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Credits:</span>
                        <span className="font-medium">{program.totalCredits}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Enrollment:</span>
                        <span className="font-medium">{program.enrollmentCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Graduation Rate:</span>
                        <span className="font-medium text-green-600">{program.graduationRate}%</span>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPrograms.map((program) => (
                      <tr key={program.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{program.name}</div>
                            <div className="text-sm text-gray-500">{program.code} • {program.degree}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.level}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.totalCredits}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.enrollmentCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-600">{program.graduationRate}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            program.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {program.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewProgram(program)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {hasPermission('curriculum_write') && (
                              <>
                                <button
                                  onClick={() => handleEditProgram(program)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleCloneProgram(program)}
                                  className="text-purple-600 hover:text-purple-900"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProgram(program.id)}
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
          )}
        </>
      )}

      {/* Program Details View */}
      {activeTab === 'details' && selectedProgram && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedProgram.name}</h3>
                <p className="text-sm text-gray-500">{selectedProgram.code} • {selectedProgram.degree}</p>
              </div>
              <button
                onClick={() => setActiveTab('overview')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Overview
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Program Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Description</h4>
                  <p className="text-sm text-gray-600">{selectedProgram.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Program Requirements</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Core Credits</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProgram.requirements.coreCredits}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Elective Credits</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProgram.requirements.electiveCredits}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">General Education</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProgram.requirements.generalEducation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Minimum GPA</p>
                      <p className="text-sm font-medium text-gray-900">{selectedProgram.requirements.minimumGPA}</p>
                    </div>
                  </div>
                </div>

                {/* Curriculum Structure */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Curriculum Structure</h4>
                  <div className="space-y-4">
                    {selectedProgram.semesters.map((semester) => (
                      <div key={semester.semester} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-3">{semester.name}</h5>
                        <div className="space-y-2">
                          {semester.courses.map((course, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900">{course.code}</span>
                                <span className="text-sm text-gray-600">{course.name}</span>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  course.type === 'core' 
                                    ? 'bg-blue-100 text-blue-800'
                                    : course.type === 'general'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {course.type}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-gray-500">{course.credits} credits</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Outcomes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Career Outcomes</h4>
                  <div className="space-y-3">
                    {selectedProgram.careerOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{outcome.title}</p>
                          <p className="text-xs text-gray-500">{outcome.percentage}% of graduates</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{outcome.averageSalary}</p>
                          <p className="text-xs text-gray-500">Avg. starting salary</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Program Statistics */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Program Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Duration</span>
                      <span className="text-sm font-medium text-gray-900">{selectedProgram.duration} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Total Credits</span>
                      <span className="text-sm font-medium text-gray-900">{selectedProgram.totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Current Enrollment</span>
                      <span className="text-sm font-medium text-gray-900">{selectedProgram.enrollmentCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Graduation Rate</span>
                      <span className="text-sm font-medium text-green-600">{selectedProgram.graduationRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Last Updated</span>
                      <span className="text-sm font-medium text-gray-900">{new Date(selectedProgram.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Program Coordinator</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedProgram.coordinator.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-blue-600">{selectedProgram.coordinator.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedProgram.coordinator.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Prerequisites</h4>
                  <div className="space-y-2">
                    {selectedProgram.requirements.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Add New Program</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Code</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., CS"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select Level</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Doctoral">Doctoral</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Program description..."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years)</label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Credits</label>
                    <input
                      type="number"
                      min="30"
                      max="200"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum GPA</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
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
                  Save Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Program Modal */}
      {showEditModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Program: {selectedProgram.name}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Settings className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Advanced Program Editor</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Detailed program editing interface would be implemented here with curriculum builder, 
                  course mapping, and requirement management tools.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
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
    </div>
  );
};

export default CurriculumPlanning;