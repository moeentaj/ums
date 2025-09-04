// src/pages/StudentModule.jsx - Complete Student Management Module

import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockData, getStudentsByStatus, getTotalEnrollment } from '../data/mockData';
import {
  UserGroupIcon,
  UserPlusIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Import student components (these will be created in subsequent sessions)
const StudentList = React.lazy(() => import('../components/student/StudentList'));
const StudentForm = React.lazy(() => import('components/student/StudentForm'));
const StudentProfile = React.lazy(() => import('components/student/StudentProfile'));
//const AdmissionsManagement = React.lazy(() => import('components/student/AdmissionsManagement'));
//const AcademicRecords = React.lazy(() => import('components/student/AcademicRecords'));
//const StudentReports = React.lazy(() => import('components/student/StudentReports'));

// Placeholder components for now
const PlaceholderComponent = ({ title, description }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <UserGroupIcon className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="text-sm text-gray-500">
      Component will be implemented in the next development session
    </div>
  </div>
);

const StudentModule = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [studentStats, setStudentStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    probation: 0
  });

  // Get current tab from URL
  const currentPath = location.pathname.split('/').pop();
  const activeTab = currentPath === 'students' ? 'directory' : currentPath;

  // Permission checks
  const canViewStudents = hasPermission('students') || hasPermission('all');
  const canManageStudents = hasPermission('all') || user?.role === 'admin' || user?.role === 'registrar';
  const canViewAcademics = hasPermission('academics') || hasPermission('all') || user?.role === 'faculty';
  const canViewReports = hasPermission('all') || user?.role === 'admin';

  // Tab configuration with role-based visibility
  const tabs = [
    {
      id: 'directory',
      name: 'Student Directory',
      icon: UserGroupIcon,
      path: '/students',
      visible: canViewStudents,
      description: 'View and manage student information'
    },
    {
      id: 'add-student',
      name: 'Add Student',
      icon: UserPlusIcon,
      path: '/students/add-student',
      visible: canManageStudents,
      description: 'Register new student'
    },
    {
      id: 'admissions',
      name: 'Admissions',
      icon: AcademicCapIcon,
      path: '/students/admissions',
      visible: canManageStudents,
      description: 'Manage student applications'
    },
    {
      id: 'academic-records',
      name: 'Academic Records',
      icon: DocumentTextIcon,
      path: '/students/academic-records',
      visible: canViewAcademics,
      description: 'View grades and transcripts'
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: ChartBarIcon,
      path: '/students/reports',
      visible: canViewReports,
      description: 'Student analytics and reports'
    }
  ].filter(tab => tab.visible);

  useEffect(() => {
    const initializeModule = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Calculate student statistics
        const totalStudents = getTotalEnrollment();
        const activeStudents = getStudentsByStatus('Active').length;
        const inactiveStudents = getStudentsByStatus('Inactive').length;
        const probationStudents = mockData.students.filter(s => s.gpa < 2.0).length;

        setStudentStats({
          total: totalStudents,
          active: activeStudents,
          inactive: inactiveStudents,
          probation: probationStudents
        });

        setLoading(false);
      } catch (error) {
        console.error('Error initializing student module:', error);
        setLoading(false);
      }
    };

    if (canViewStudents) {
      initializeModule();
    } else {
      setLoading(false);
    }
  }, [canViewStudents]);

  // Redirect to first available tab if user lands on base path
  useEffect(() => {
    if (location.pathname === '/students' && tabs.length > 0) {
      navigate(tabs[0].path, { replace: true });
    }
  }, [location.pathname, navigate, tabs]);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to directory tab with search query
      navigate('/students', { state: { searchQuery } });
    }
  };

  // Access control - show access denied if no permissions
  if (!canViewStudents) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the Student Management module.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
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
      {/* Module Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Student Management
            </h1>
            <nav className="text-sm text-gray-500">
              <span>University Management</span> 
              <span className="mx-2">/</span> 
              <span className="text-blue-600 font-medium">Students</span>
            </nav>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Filter Button */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>

            {/* Export Button */}
            {canManageStudents && (
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Student Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.total.toLocaleString()}</p>
              <p className="text-sm text-green-600">↑ 12% from last year</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.active.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{Math.round((studentStats.active / studentStats.total) * 100)}% of total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <AcademicCapIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">New Admissions</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-blue-600">Fall 2025 semester</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Academic Probation</p>
              <p className="text-2xl font-bold text-gray-900">{studentStats.probation}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || (activeTab === '' && tab.id === 'directory');
              
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={`${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          }>
            <Routes>
              <Route index element={
                <PlaceholderComponent 
                  title="Student Directory"
                  description="Comprehensive list of all students with search, filter, and management capabilities."
                />
              } />
              
              <Route path="add-student" element={
                canManageStudents ? (
                  <PlaceholderComponent 
                    title="Add New Student"
                    description="Register a new student with personal information, academic program, and enrollment details."
                  />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to add students.</p>
                  </div>
                )
              } />
              
              <Route path="admissions" element={
                canManageStudents ? (
                  <PlaceholderComponent 
                    title="Admissions Management"
                    description="Review and process student applications, manage admission decisions and enrollment."
                  />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to manage admissions.</p>
                  </div>
                )
              } />
              
              <Route path="academic-records" element={
                canViewAcademics ? (
                  <PlaceholderComponent 
                    title="Academic Records"
                    description="View and manage student grades, transcripts, and academic performance data."
                  />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to view academic records.</p>
                  </div>
                )
              } />
              
              <Route path="reports" element={
                canViewReports ? (
                  <PlaceholderComponent 
                    title="Student Reports"
                    description="Generate analytics and reports on student enrollment, performance, and demographics."
                  />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to view reports.</p>
                  </div>
                )
              } />
              
              <Route path="profile/:studentId" element={
                <PlaceholderComponent 
                  title="Student Profile"
                  description="Detailed view of individual student information, academic history, and records."
                />
              } />
            </Routes>
          </React.Suspense>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Student Module Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800">Student Directory</h4>
            <p className="text-blue-700">Search, filter, and manage student records</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Academic Tracking</h4>
            <p className="text-blue-700">Monitor grades, GPA, and academic progress</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Enrollment Management</h4>
            <p className="text-blue-700">Handle admissions and course registration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModule;