// src/pages/SettingsModule.jsx - Complete System Settings Management
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  Settings, 
  Calendar, 
  Bell, 
  Database, 
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  Globe,
  Server,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import settings subcomponents
import GeneralSettings from '../components/settings/GeneralSettings';
import AcademicYear from '../components/settings/AcademicYear';
import NotificationSettings from '../components/settings/NotificationSettings';
import SystemIntegrations from '../components/settings/SystemIntegrations';
import BackupRestore from '../components/settings/BackupRestore';

const SettingsModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(false);

  // Check permissions - only admin should access settings
  if (!hasPermission('settings') && user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Settings className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have permission to access System Settings.
          </p>
        </div>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    {
      id: 'general',
      name: 'General Settings',
      path: '/settings/general',
      icon: Settings,
      description: 'Basic system configuration and preferences',
      component: GeneralSettings
    },
    {
      id: 'academic-year',
      name: 'Academic Year',
      path: '/settings/academic-year',
      icon: Calendar,
      description: 'Configure academic periods and calendar',
      component: AcademicYear
    },
    {
      id: 'notifications',
      name: 'Notifications',
      path: '/settings/notifications',
      icon: Bell,
      description: 'Manage system notifications and alerts',
      component: NotificationSettings
    },
    {
      id: 'integrations',
      name: 'Integrations',
      path: '/settings/integrations',
      icon: Zap,
      description: 'Third-party system integrations',
      component: SystemIntegrations
    },
    {
      id: 'backup',
      name: 'Backup & Restore',
      path: '/settings/backup',
      icon: Shield,
      description: 'Data backup and recovery management',
      component: BackupRestore
    }
  ];

  // Get current tab from location
  const currentPath = location.pathname;
  const currentTab = tabs.find(tab => currentPath.includes(tab.id)) || tabs[0];

  const handleTabChange = (tab) => {
    navigate(tab.path);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and integrations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Download className="mr-2 h-4 w-4" />
            Export Config
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Changes
          </button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-lg font-semibold text-green-600">Online</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Last updated: 2 minutes ago</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Server className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Database</p>
              <p className="text-lg font-semibold text-blue-600">Healthy</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Response time: 23ms</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Integrations</p>
              <p className="text-lg font-semibold text-purple-600">12 Active</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">All systems connected</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-lg font-semibold text-green-600">2 hours ago</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Backup successful</span>
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
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
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
            <Route path="/" element={<Navigate to="/settings/general" replace />} />
            <Route path="/general" element={<GeneralSettings />} />
            <Route path="/academic-year" element={<AcademicYear />} />
            <Route path="/notifications" element={<NotificationSettings />} />
            <Route path="/integrations" element={<SystemIntegrations />} />
            <Route path="/backup" element={<BackupRestore />} />
            <Route path="*" element={<Navigate to="/settings/general" replace />} />
          </Routes>
        </div>
      </div>

      {/* Quick Settings Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add Integration</p>
              <p className="text-sm text-gray-600">Connect new third-party service</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="h-5 w-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Create Backup</p>
              <p className="text-sm text-gray-600">Manual system backup</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="h-5 w-5 text-orange-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">System Maintenance</p>
              <p className="text-sm text-gray-600">Schedule maintenance window</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Configuration Changes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Configuration Changes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Academic Year 2025-2026 configured</p>
                <p className="text-xs text-gray-500">2 hours ago by John Administrator</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email notifications updated</p>
                <p className="text-xs text-gray-500">1 day ago by Sarah Wilson</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">LMS integration enabled</p>
                <p className="text-xs text-gray-500">3 days ago by Michael Chen</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;