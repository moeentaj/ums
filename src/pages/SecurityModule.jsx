// src/pages/SecurityModule.jsx - Security & Access Control Management
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Users, 
  UserCheck, 
  FileText, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import subcomponents
import AccessControl from '../components/security/AccessControl';
import UserManagement from '../components/security/UserManagement';
import RoleManagement from '../components/security/RoleManagement';
import AuditLogs from '../components/security/AuditLogs';
import SecuritySettings from '../components/security/SecuritySettings';

const SecurityModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(false);

  // Check permissions - only admin should access security module
  if (!hasPermission('security') || !user?.role === 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have permission to access Security & Access Control.
          </p>
        </div>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    {
      id: 'access-control',
      name: 'Access Control',
      path: '/security/access',
      icon: Lock,
      description: 'Manage user permissions and access levels',
      component: AccessControl
    },
    {
      id: 'user-management',
      name: 'User Management',
      path: '/security/users',
      icon: Users,
      description: 'Create and manage user accounts',
      component: UserManagement
    },
    {
      id: 'role-management',
      name: 'Role Management',
      path: '/security/roles',
      icon: UserCheck,
      description: 'Define user roles and permissions',
      component: RoleManagement
    },
    {
      id: 'audit-logs',
      name: 'System Audit',
      path: '/security/audit',
      icon: FileText,
      description: 'Monitor system activities and security events',
      component: AuditLogs
    },
    {
      id: 'security-settings',
      name: 'Security Settings',
      path: '/security/settings',
      icon: Settings,
      description: 'Configure security policies and parameters',
      component: SecuritySettings
    }
  ];

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => currentPath.startsWith(tab.path)) || tabs[0];
  };

  const currentTab = getCurrentTab();

  const handleTabChange = (tab) => {
    navigate(tab.path);
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentTab) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Security Management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-3 h-8 w-8 text-red-600" />
            Security & Access Control
          </h1>
          <p className="mt-2 text-gray-600">
            Manage user access, permissions, and system security
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Security Report
          </button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">+12 this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">Normal activity</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Alerts</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-yellow-600 font-medium">Requires attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Login Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">97.8%</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600 font-medium">Last 24 hours</span>
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">
              Security Alert: Multiple Failed Login Attempts Detected
            </h3>
            <p className="mt-1 text-sm text-red-700">
              3 failed login attempts from IP 192.168.1.100 in the last hour. Account temporarily locked.
            </p>
            <div className="mt-2">
              <button className="text-sm text-red-800 underline hover:text-red-900">
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab.id === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab)}
                  className={`flex-shrink-0 flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/security/access" replace />} />
            <Route path="/access" element={<AccessControl />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/settings" element={<SecuritySettings />} />
            <Route path="*" element={<Navigate to="/security/access" replace />} />
          </Routes>
        </div>
      </div>

      {/* Quick Security Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Security Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add New User</p>
              <p className="text-sm text-gray-600">Create user account with permissions</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-5 w-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Active Sessions</p>
              <p className="text-sm text-gray-600">Monitor current user sessions</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Lock className="h-5 w-5 text-red-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Security Lockdown</p>
              <p className="text-sm text-gray-600">Emergency security protocols</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Security Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Security Events</h3>
          <button className="text-sm text-red-600 hover:text-red-800">View All →</button>
        </div>
        <div className="space-y-3">
          {[
            { time: '10 minutes ago', event: 'Admin user logged in from 192.168.1.50', type: 'login', severity: 'info' },
            { time: '25 minutes ago', event: 'Failed login attempt for user john.doe@university.edu', type: 'security', severity: 'warning' },
            { time: '1 hour ago', event: 'New role "Research Assistant" created', type: 'role', severity: 'info' },
            { time: '2 hours ago', event: 'Password policy updated', type: 'policy', severity: 'info' },
            { time: '3 hours ago', event: 'User permissions modified for jane.smith@university.edu', type: 'permission', severity: 'info' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  event.severity === 'warning' ? 'bg-yellow-500' :
                  event.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <span className="text-sm text-gray-900">{event.event}</span>
              </div>
              <span className="text-xs text-gray-500">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityModule;