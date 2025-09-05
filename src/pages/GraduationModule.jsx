// src/pages/GraduationModule.jsx - Complete Graduation Management Module

import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCapIcon,
  UserGroupIcon,
  ClipboardListIcon,
  CalendarIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Import graduation components (lazy loaded)
const StudentProgress = React.lazy(() => import('../components/graduation/StudentProgress'));
const GraduationRequirements = React.lazy(() => import('../components/graduation/GraduationRequirements'));
const GraduationCeremonies = React.lazy(() => import('../components/graduation/GraduationCeremonies'));
const TranscriptServices = React.lazy(() => import('../components/graduation/TranscriptServices'));
const AlumniRelations = React.lazy(() => import('../components/graduation/AlumniRelations'));

// Placeholder component for development
const PlaceholderComponent = ({ title, description, icon: Icon = GraduationCapIcon }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="text-sm text-gray-500">
      Component will be implemented in the next development session
    </div>
  </div>
);

const GraduationModule = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [graduationStats, setGraduationStats] = useState({
    totalStudents: 0,
    eligibleForGraduation: 0,
    pendingRequirements: 0,
    upcomingCeremonies: 0,
    alumniCount: 0
  });

  // Get current tab from URL
  const currentPath = location.pathname.split('/').pop();
  const activeTab = currentPath === 'graduation' ? 'overview' : currentPath;

  // Navigation tabs for graduation module
  const graduationTabs = [
    {
      id: 'overview',
      name: 'Overview',
      path: '/graduation',
      icon: ChartBarIcon,
      description: 'Graduation statistics and overview'
    },
    {
      id: 'progress',
      name: 'Student Progress',
      path: '/graduation/progress',
      icon: ChartBarIcon,
      description: 'Monitor academic progress',
      requiresPermission: 'graduation.read'
    },
    {
      id: 'requirements',
      name: 'Requirements',
      path: '/graduation/requirements',
      icon: ClipboardListIcon,
      description: 'Manage degree requirements',
      requiresPermission: 'graduation.write'
    },
    {
      id: 'ceremonies',
      name: 'Ceremonies',
      path: '/graduation/ceremonies',
      icon: CalendarIcon,
      description: 'Plan graduation ceremonies',
      requiresPermission: 'graduation.write'
    },
    {
      id: 'transcripts',
      name: 'Transcripts',
      path: '/graduation/transcripts',
      icon: DocumentTextIcon,
      description: 'Manage official transcripts',
      requiresPermission: 'graduation.read'
    },
    {
      id: 'alumni',
      name: 'Alumni',
      path: '/graduation/alumni',
      icon: UsersIcon,
      description: 'Track and engage alumni',
      requiresPermission: 'graduation.read'
    }
  ];

  // Filter tabs based on user permissions
  const availableTabs = graduationTabs.filter(tab => 
    !tab.requiresPermission || hasPermission(tab.requiresPermission)
  );

  useEffect(() => {
    const loadGraduationData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock graduation statistics
        setGraduationStats({
          totalStudents: 2847,
          eligibleForGraduation: 425,
          pendingRequirements: 68,
          upcomingCeremonies: 3,
          alumniCount: 15230
        });
      } catch (error) {
        console.error('Failed to load graduation data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGraduationData();
  }, []);

  // Check permissions
  if (!hasPermission('graduation.read')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600 mb-4">
            You don't have permission to access the Graduation Tracking module.
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

        {/* Navigation skeleton */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="flex space-x-8 p-6 border-b animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <GraduationCapIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Graduation Tracking</h1>
              <p className="text-gray-600">Monitor student progress and manage graduation requirements</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Academic Year 2024-2025</p>
            <p className="text-lg font-semibold text-gray-900">{graduationStats.totalStudents} Total Students</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <nav className="flex space-x-8 p-6 border-b border-gray-200">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive || activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 border-purple-300'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Module Statistics */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <UserGroupIcon className="h-10 w-10 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{graduationStats.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-blue-600">Total Students</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircleIcon className="h-10 w-10 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{graduationStats.eligibleForGraduation}</div>
                  <div className="text-sm text-green-600">Eligible to Graduate</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <ClockIcon className="h-10 w-10 text-yellow-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{graduationStats.pendingRequirements}</div>
                  <div className="text-sm text-yellow-600">Pending Requirements</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center">
                <CalendarIcon className="h-10 w-10 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{graduationStats.upcomingCeremonies}</div>
                  <div className="text-sm text-purple-600">Upcoming Ceremonies</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <TrophyIcon className="h-10 w-10 text-gray-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-600">{graduationStats.alumniCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Alumni</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin mr-3" />
                <span className="text-gray-600">Loading graduation module...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <GraduationCapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Graduation Tracking Overview</h3>
                    <p className="text-gray-600 mb-6">
                      Select a tab above to manage graduation requirements, track student progress, or view ceremonies.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableTabs.slice(1).map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150 text-left"
                          >
                            <Icon className="h-8 w-8 text-gray-600 mb-3" />
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{tab.name}</h4>
                            <p className="text-gray-600 text-sm">{tab.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              } />

              <Route path="progress" element={
                hasPermission('graduation.read') ? (
                  <StudentProgress />
                ) : (
                  <PlaceholderComponent 
                    title="Student Progress"
                    description="Monitor academic progress towards graduation requirements."
                    icon={ChartBarIcon}
                  />
                )
              } />

              <Route path="requirements" element={
                hasPermission('graduation.write') ? (
                  <GraduationRequirements />
                ) : (
                  <PlaceholderComponent 
                    title="Graduation Requirements"
                    description="Manage degree requirements and academic standards."
                    icon={ClipboardListIcon}
                  />
                )
              } />

              <Route path="ceremonies" element={
                hasPermission('graduation.write') ? (
                  <GraduationCeremonies />
                ) : (
                  <PlaceholderComponent 
                    title="Graduation Ceremonies"
                    description="Plan and manage graduation ceremonies and events."
                    icon={CalendarIcon}
                  />
                )
              } />

              <Route path="transcripts" element={
                hasPermission('graduation.read') ? (
                  <TranscriptServices />
                ) : (
                  <PlaceholderComponent 
                    title="Transcript Services"
                    description="Manage official transcripts and academic records."
                    icon={DocumentTextIcon}
                  />
                )
              } />

              <Route path="alumni" element={
                hasPermission('graduation.read') ? (
                  <AlumniRelations />
                ) : (
                  <PlaceholderComponent 
                    title="Alumni Relations"
                    description="Track and engage with alumni network."
                    icon={UsersIcon}
                  />
                )
              } />
            </Routes>
          </React.Suspense>
        </div>
      </div>

      {/* Quick Help Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">Graduation Module Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-800">Progress Tracking</h4>
            <p className="text-purple-700">Monitor student academic progress and completion status</p>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Requirements Management</h4>
            <p className="text-purple-700">Define and manage graduation requirements by program</p>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Ceremony Planning</h4>
            <p className="text-purple-700">Organize graduation ceremonies and commencement events</p>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Transcript Services</h4>
            <p className="text-purple-700">Generate and manage official academic transcripts</p>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Alumni Network</h4>
            <p className="text-purple-700">Track graduates and maintain alumni relationships</p>
          </div>
          <div>
            <h4 className="font-medium text-purple-800">Analytics & Reports</h4>
            <p className="text-purple-700">Generate insights on graduation rates and trends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationModule;