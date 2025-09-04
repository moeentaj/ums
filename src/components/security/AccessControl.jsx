// src/components/security/AccessControl.jsx - User Permission Management (Complete)
import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Settings,
  Database,
  FileText,
  Calendar,
  Building,
  School,
  DollarSign,
  Plus,
  Minus
} from 'lucide-react';

const AccessControl = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data with permissions
  const mockUsers = [
    {
      id: 'USR001',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      role: 'faculty',
      department: 'Computer Science',
      status: 'active',
      lastLogin: '2025-09-02T10:30:00Z',
      permissions: {
        students: { read: true, write: true, delete: false },
        academics: { read: true, write: true, delete: false },
        financial: { read: false, write: false, delete: false },
        infrastructure: { read: true, write: false, delete: false },
        security: { read: false, write: false, delete: false },
        schedule: { read: true, write: true, delete: false },
        graduation: { read: true, write: true, delete: false },
        settings: { read: false, write: false, delete: false }
      },
      specialPermissions: ['grade_override', 'course_creation'],
      accessHistory: [
        { action: 'Login', timestamp: '2025-09-02T10:30:00Z', ip: '192.168.1.100' },
        { action: 'Access Students Module', timestamp: '2025-09-02T10:35:00Z', ip: '192.168.1.100' }
      ]
    },
    {
      id: 'USR002',
      name: 'John Administrator',
      email: 'admin@university.edu',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      lastLogin: '2025-09-02T09:15:00Z',
      permissions: {
        students: { read: true, write: true, delete: true },
        academics: { read: true, write: true, delete: true },
        financial: { read: true, write: true, delete: true },
        infrastructure: { read: true, write: true, delete: true },
        security: { read: true, write: true, delete: true },
        schedule: { read: true, write: true, delete: true },
        graduation: { read: true, write: true, delete: true },
        settings: { read: true, write: true, delete: true }
      },
      specialPermissions: ['system_admin', 'user_management', 'security_override'],
      accessHistory: [
        { action: 'Login', timestamp: '2025-09-02T09:15:00Z', ip: '192.168.1.50' },
        { action: 'Access Security Module', timestamp: '2025-09-02T09:20:00Z', ip: '192.168.1.50' }
      ]
    },
    {
      id: 'USR003',
      name: 'Jane Student',
      email: 'jane.student@university.edu',
      role: 'student',
      department: 'Computer Science',
      status: 'active',
      lastLogin: '2025-09-02T08:45:00Z',
      permissions: {
        students: { read: false, write: false, delete: false },
        academics: { read: true, write: false, delete: false },
        financial: { read: true, write: false, delete: false },
        infrastructure: { read: false, write: false, delete: false },
        security: { read: false, write: false, delete: false },
        schedule: { read: true, write: false, delete: false },
        graduation: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false }
      },
      specialPermissions: ['view_own_records'],
      accessHistory: [
        { action: 'Login', timestamp: '2025-09-02T08:45:00Z', ip: '10.0.1.200' },
        { action: 'View Schedule', timestamp: '2025-09-02T08:50:00Z', ip: '10.0.1.200' }
      ]
    },
    {
      id: 'USR004',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      role: 'faculty',
      department: 'Mathematics',
      status: 'suspended',
      lastLogin: '2025-08-30T14:20:00Z',
      permissions: {
        students: { read: true, write: true, delete: false },
        academics: { read: true, write: true, delete: false },
        financial: { read: false, write: false, delete: false },
        infrastructure: { read: false, write: false, delete: false },
        security: { read: false, write: false, delete: false },
        schedule: { read: true, write: true, delete: false },
        graduation: { read: true, write: false, delete: false },
        settings: { read: false, write: false, delete: false }
      },
      specialPermissions: ['grade_entry'],
      accessHistory: []
    }
  ];

  // Mock permission modules
  const permissionModules = [
    { id: 'students', name: 'Student Management', icon: Users, description: 'Manage student records and information' },
    { id: 'academics', name: 'Academic Management', icon: School, description: 'Handle courses, curriculum, and grading' },
    { id: 'financial', name: 'Financial Management', icon: DollarSign, description: 'Manage finances and payments' },
    { id: 'infrastructure', name: 'Infrastructure', icon: Building, description: 'Campus facilities and resources' },
    { id: 'security', name: 'Security & Access', icon: Shield, description: 'User access and system security' },
    { id: 'schedule', name: 'Schedule Management', icon: Calendar, description: 'Class and event scheduling' },
    { id: 'graduation', name: 'Graduation Tracking', icon: School, description: 'Student progress and graduation' },
    { id: 'settings', name: 'System Settings', icon: Settings, description: 'System configuration' }
  ];

  const roles = ['all', 'admin', 'faculty', 'student', 'staff'];
  const statuses = ['all', 'active', 'inactive', 'suspended'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setUsers(mockUsers);
        setPermissions(permissionModules);
      } catch (error) {
        console.error('Failed to load access control data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'suspended': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'faculty': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionLevel = (permissions) => {
    const totalPerms = Object.keys(permissions).length * 3; // read, write, delete
    const grantedPerms = Object.values(permissions).reduce((sum, perm) => {
      return sum + (perm.read ? 1 : 0) + (perm.write ? 1 : 0) + (perm.delete ? 1 : 0);
    }, 0);
    return Math.round((grantedPerms / totalPerms) * 100);
  };

  const handleEditPermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionModal(true);
  };

  const updateUserPermission = (userId, module, permissionType, value) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: {
            ...user.permissions,
            [module]: {
              ...user.permissions[module],
              [permissionType]: value
            }
          }
        };
      }
      return user;
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Access Control</h2>
          <p className="text-gray-600">Manage user permissions and access levels</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Admin Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Permission Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">User Permissions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const permissionLevel = getPermissionLevel(user.permissions);
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{permissionLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                permissionLevel >= 75 ? 'bg-red-500' :
                                permissionLevel >= 50 ? 'bg-yellow-500' :
                                permissionLevel >= 25 ? 'bg-blue-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${permissionLevel}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditPermissions(user)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditPermissions(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Edit Modal */}
      {showPermissionModal && selectedUser && (
        <PermissionModal
          user={selectedUser}
          permissions={permissionModules}
          onClose={() => setShowPermissionModal(false)}
          onSave={(updatedPermissions) => {
            setUsers(users.map(u => 
              u.id === selectedUser.id 
                ? { ...u, permissions: updatedPermissions }
                : u
            ));
            setShowPermissionModal(false);
          }}
        />
      )}
    </div>
  );
};

// Permission Edit Modal Component
const PermissionModal = ({ user, permissions, onClose, onSave }) => {
  const [userPermissions, setUserPermissions] = useState(user.permissions);

  const updatePermission = (moduleId, permType, value) => {
    setUserPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permType]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(userPermissions);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Permissions: {user.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {permissions.map((module) => {
              const Icon = module.icon;
              const perms = userPermissions[module.id];
              
              return (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{module.name}</h4>
                        <p className="text-xs text-gray-500">{module.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={perms.read}
                        onChange={(e) => updatePermission(module.id, 'read', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Read</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={perms.write}
                        onChange={(e) => updatePermission(module.id, 'write', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Write</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={perms.delete}
                        onChange={(e) => updatePermission(module.id, 'delete', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Delete</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;