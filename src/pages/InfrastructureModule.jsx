// src/pages/InfrastructureModule.jsx - Campus Infrastructure Management
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building, 
  Home, 
  BarChart3, 
  School, 
  MapPin, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import subcomponents
import ClassroomManagement from '../components/infrastructure/ClassroomManagement';
import AIRoomAllocation from '../components/infrastructure/AIRoomAllocation';
import LabManagement from '../components/infrastructure/LabManagement';
import TransportServices from '../components/infrastructure/TransportServices';
import MaintenanceSystem from '../components/infrastructure/MaintenanceSystem';
import AssetManagement from '../components/infrastructure/AssetManagement';

const InfrastructureModule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(false);

  // Check permissions
  if (!hasPermission('infrastructure')) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have permission to access Infrastructure Management.
          </p>
        </div>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    {
      id: 'classrooms',
      name: 'Classroom Management',
      path: '/infrastructure/classrooms',
      icon: Home,
      description: 'Manage classroom facilities and resources',
      component: ClassroomManagement
    },
    {
      id: 'ai-allocation',
      name: 'AI Room Allocation',
      path: '/infrastructure/ai-allocation',
      icon: BarChart3,
      description: 'Smart room assignment and optimization',
      component: AIRoomAllocation,
      badge: 'AI'
    },
    {
      id: 'labs',
      name: 'Laboratory Management',
      path: '/infrastructure/labs',
      icon: School,
      description: 'Lab equipment and scheduling',
      component: LabManagement
    },
    {
      id: 'transport',
      name: 'Transport Services',
      path: '/infrastructure/transport',
      icon: MapPin,
      description: 'Campus transportation management',
      component: TransportServices
    },
    {
      id: 'maintenance',
      name: 'Maintenance System',
      path: '/infrastructure/maintenance',
      icon: Settings,
      description: 'Facility maintenance tracking',
      component: MaintenanceSystem
    },
    {
      id: 'assets',
      name: 'Asset Management',
      path: '/infrastructure/assets',
      icon: Building,
      description: 'University asset inventory',
      component: AssetManagement
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
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Infrastructure Management...</p>
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
            <Building className="mr-3 h-8 w-8 text-blue-600" />
            Campus Infrastructure Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage campus facilities, resources, and infrastructure systems
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
            Export Data
          </button>
        </div>
      </div>

      {/* Infrastructure Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">98% Utilized</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <School className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Laboratories</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-medium">18 Active</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-red-600 font-medium">Pending Tasks</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600 font-medium">+12% This Year</span>
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
                  {tab.badge && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/infrastructure/classrooms" replace />} />
            <Route path="/classrooms" element={<ClassroomManagement />} />
            <Route path="/ai-allocation" element={<AIRoomAllocation />} />
            <Route path="/labs" element={<LabManagement />} />
            <Route path="/transport" element={<TransportServices />} />
            <Route path="/maintenance" element={<MaintenanceSystem />} />
            <Route path="/assets" element={<AssetManagement />} />
            <Route path="*" element={<Navigate to="/infrastructure/classrooms" replace />} />
          </Routes>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Add New Room</p>
              <p className="text-sm text-gray-600">Create a new classroom or facility</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Search className="h-5 w-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Find Available Rooms</p>
              <p className="text-sm text-gray-600">Search for available facilities</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="h-5 w-5 text-orange-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Schedule Maintenance</p>
              <p className="text-sm text-gray-600">Create maintenance requests</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureModule;