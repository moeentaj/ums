// src/pages/StudentModule.jsx - Updated Student Management Module with Real Components

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

// Import student components
const StudentList = React.lazy(() => import('../components/student/StudentList'));
const StudentForm = React.lazy(() => import('../components/student/StudentForm'));
const StudentProfile = React.lazy(() => import('../components/student/StudentProfile'));
const AdmissionsManagement = React.lazy(() => import('../components/student/AdmissionsManagement'));
const AcademicRecords = React.lazy(() => import('../components/student/AcademicRecords'));
const StudentReports = React.lazy(() => import('../components/student/StudentReports'));

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
  const activeTab = currentPath === 'students' ? 'list' : 
                   currentPath === 'add-student' ? 'add' :
                   currentPath === 'admissions' ? 'admissions' :
                   currentPath === 'academic-records' ? 'records' :
                   currentPath === 'reports' ? 'reports' : 'list';

  // Permission checks
  const canManageStudents = hasPermission('students.write') || user?.role === 'admin' || user?.role === 'registrar';
  const canViewAcademics = hasPermission('academics.read') || user?.role === 'admin' || user?.role === 'faculty';
  const canViewReports = hasPermission('reports.read') || user?.role === 'admin';

  // Load student statistics
  useEffect(() => {
    const loadStudentStats = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const students = mockData.students;
        setStudentStats({
          total: students.length,
          active: students.filter(s => s.status === 'Active').length,
          inactive: students.filter(s => s.status === 'Inactive').length,
          probation: students.filter(s => s.status === 'Probation').length
        });
      } catch (error) {
        console.error('Error loading student stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentStats();
  }, []);

  // Navigation items
  const navigationItems = [
    {
      id: 'list',
      path: '/students',
      name: 'Student Directory',
      icon: UserGroupIcon,
      description: 'Search and manage student records',
      permission: 'students.read'
    },
    {
      id: 'add',
      path: '/students/add-student',
      name: 'Add Student',
      icon: UserPlusIcon,
      description: 'Register new students',
      permission: 'students.write'
    },
    {
      id: 'admissions',
      path: '/students/admissions',
      name: 'Admissions',
      icon: AcademicCapIcon,
      description: 'Manage applications and admissions',
      permission: 'students.write'
    },
    {
      id: 'records',
      path: '/students/academic-records',
      name: 'Academic Records',
      icon: DocumentTextIcon,
      description: 'View grades and transcripts',
      permission: 'academics.read'
    },
    {
      id: 'reports',
      path: '/students/reports',
      name: 'Reports & Analytics',
      icon: ChartBarIcon,
      description: 'Generate student reports',
      permission: 'reports.read'
    }
  ];

  // Filter navigation items based on permissions
  const visibleNavItems = navigationItems.filter(item => 
    hasPermission(item.permission) || 
    user?.role === 'admin'
  );

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage student enrollment, academic records, and reporting
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Quick search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate('/students', { state: { searchQuery } });
                  }
                }}
              />
            </div>
            
            {canManageStudents && (
              <button
                onClick={() => navigate('/students/add-student')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Add Student
              </button>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Total Students',
                value: studentStats.total,
                icon: UserGroupIcon,
                color: 'blue',
                change: '+5.2%'
              },
              {
                title: 'Active Enrollment',
                value: studentStats.active,
                icon: UserGroupIcon,
                color: 'green',
                change: '+2.1%'
              },
              {
                title: 'Academic Probation',
                value: studentStats.probation,
                icon: ExclamationTriangleIcon,
                color: 'yellow',
                change: '-1.3%'
              },
              {
                title: 'Inactive Students',
                value: studentStats.inactive,
                icon: UserGroupIcon,
                color: 'red',
                change: '+0.8%'
              }
            ].map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.title} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className={`p-2 bg-${stat.color}-100 rounded-md`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          stat.change.startsWith('+') 
                            ? 'text-green-800 bg-green-100' 
                            : 'text-red-800 bg-red-100'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {visibleNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={`${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <React.Suspense 
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<StudentList />} />
              
              <Route path="/add-student" element={
                canManageStudents ? (
                  <StudentForm />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to add students.</p>
                  </div>
                )
              } />
              
              <Route path="/admissions" element={
                canManageStudents ? (
                  <AdmissionsManagement />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to manage admissions.</p>
                  </div>
                )
              } />
              
              <Route path="/academic-records" element={
                canViewAcademics ? (
                  <AcademicRecords />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to view academic records.</p>
                  </div>
                )
              } />
              
              <Route path="/reports" element={
                canViewReports ? (
                  <StudentReports />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to view reports.</p>
                  </div>
                )
              } />
              
              <Route path="/profile/:studentId" element={<StudentProfile />} />
              <Route path="/edit/:studentId" element={
                canManageStudents ? (
                  <StudentForm />
                ) : (
                  <div className="text-center p-8">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="text-gray-600">You don't have permission to edit students.</p>
                  </div>
                )
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
            <p className="text-blue-700">Search, filter, and manage comprehensive student records</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Academic Tracking</h4>
            <p className="text-blue-700">Monitor grades, GPA, and academic progress in real-time</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Admissions Management</h4>
            <p className="text-blue-700">Process applications and manage enrollment decisions</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Reporting & Analytics</h4>
            <p className="text-blue-700">Generate detailed reports on enrollment and performance</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Record Management</h4>
            <p className="text-blue-700">Maintain complete academic transcripts and documents</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Data Export</h4>
            <p className="text-blue-700">Export student data in multiple formats for analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentModule;