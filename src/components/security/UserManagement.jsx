// src/components/security/UserManagement.jsx - User Account Management (Complete)
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Lock,
  Unlock,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  MapPin,
  Send,
  Key,
  RefreshCw,
  Clock
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit, view
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data
  const mockUsers = [
    {
      id: 'USR001',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      phone: '+1-555-0101',
      role: 'faculty',
      department: 'Computer Science',
      status: 'active',
      employeeId: 'EMP001',
      createdDate: '2024-01-15',
      lastLogin: '2025-09-02T10:30:00Z',
      loginCount: 342,
      profileImage: null,
      address: '123 University Ave, Campus City',
      emergencyContact: {
        name: 'John Wilson',
        phone: '+1-555-0102',
        relationship: 'Spouse'
      },
      accountSettings: {
        emailNotifications: true,
        smsNotifications: false,
        twoFactorEnabled: true,
        passwordLastChanged: '2025-07-15'
      }
    },
    {
      id: 'USR002',
      name: 'John Administrator',
      email: 'admin@university.edu',
      phone: '+1-555-0201',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      employeeId: 'ADM001',
      createdDate: '2023-08-10',
      lastLogin: '2025-09-02T09:15:00Z',
      loginCount: 1247,
      profileImage: null,
      address: '456 Admin Street, Campus City',
      emergencyContact: {
        name: 'Jane Administrator',
        phone: '+1-555-0202',
        relationship: 'Spouse'
      },
      accountSettings: {
        emailNotifications: true,
        smsNotifications: true,
        twoFactorEnabled: true,
        passwordLastChanged: '2025-08-01'
      }
    },
    {
      id: 'USR003',
      name: 'Jane Student',
      email: 'jane.student@university.edu',
      phone: '+1-555-0301',
      role: 'student',
      department: 'Computer Science',
      status: 'active',
      employeeId: 'STU001',
      createdDate: '2024-08-25',
      lastLogin: '2025-09-02T08:45:00Z',
      loginCount: 156,
      profileImage: null,
      address: '789 Student Dorm, Campus City',
      emergencyContact: {
        name: 'Robert Student',
        phone: '+1-555-0302',
        relationship: 'Parent'
      },
      accountSettings: {
        emailNotifications: true,
        smsNotifications: false,
        twoFactorEnabled: false,
        passwordLastChanged: '2025-06-20'
      }
    },
    {
      id: 'USR004',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      phone: '+1-555-0401',
      role: 'faculty',
      department: 'Mathematics',
      status: 'suspended',
      employeeId: 'EMP002',
      createdDate: '2023-03-20',
      lastLogin: '2025-08-30T14:20:00Z',
      loginCount: 892,
      profileImage: null,
      address: '321 Faculty Row, Campus City',
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '+1-555-0402',
        relationship: 'Spouse'
      },
      accountSettings: {
        emailNotifications: false,
        smsNotifications: false,
        twoFactorEnabled: false,
        passwordLastChanged: '2024-12-10'
      }
    },
    {
      id: 'USR005',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      phone: '+1-555-0501',
      role: 'faculty',
      department: 'Biology',
      status: 'inactive',
      employeeId: 'EMP003',
      createdDate: '2022-09-05',
      lastLogin: '2025-08-15T16:30:00Z',
      loginCount: 567,
      profileImage: null,
      address: '654 Research Lane, Campus City',
      emergencyContact: {
        name: 'Carlos Rodriguez',
        phone: '+1-555-0502',
        relationship: 'Spouse'
      },
      accountSettings: {
        emailNotifications: true,
        smsNotifications: true,
        twoFactorEnabled: true,
        passwordLastChanged: '2025-05-01'
      }
    }
  ];

  const roles = ['all', 'admin', 'faculty', 'student', 'staff'];
  const statuses = ['all', 'active', 'inactive', 'suspended', 'pending'];
  const departments = ['all', 'Computer Science', 'Mathematics', 'Biology', 'Administration', 'Physics', 'Chemistry'];

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setUsers(mockUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'suspended': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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

  const handleAddUser = () => {
    setModalMode('add');
    setSelectedUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleViewUser = (user) => {
    setModalMode('view');
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleSuspendUser = (userId) => {
    if (window.confirm('Are you sure you want to suspend this user?')) {
      setUsers(users.map(u => u.id === userId ? { ...u, status: 'suspended' } : u));
    }
  };

  const handleActivateUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
  };

  const handleResetPassword = (userId) => {
    if (window.confirm('Send password reset email to this user?')) {
      // Password reset logic would go here
      alert('Password reset email sent successfully!');
    }
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
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Create and manage user accounts</p>
        </div>
        
        <button
          onClick={handleAddUser}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or employee ID..."
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
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
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
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Faculty</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'faculty').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UserX className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'suspended').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* User Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{user.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500">ID: {user.employeeId}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.department}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{user.phone}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Login count:</span>
                  <span className="font-medium">{user.loginCount}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">2FA Enabled:</span>
                  <span className={user.accountSettings.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}>
                    {user.accountSettings.twoFactorEnabled ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="text-xs text-gray-500 pt-2 border-t">
                  <p>Created: {new Date(user.createdDate).toLocaleDateString()}</p>
                  <p>Password changed: {new Date(user.accountSettings.passwordLastChanged).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* User Actions */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleViewUser(user)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                    title="Reset Password"
                  >
                    <Key className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit User"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  {user.status === 'active' ? (
                    <button
                      onClick={() => handleSuspendUser(user.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Suspend User"
                    >
                      <Lock className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivateUser(user.id)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Activate User"
                    >
                      <Unlock className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or create a new user.
          </p>
          <button
            onClick={handleAddUser}
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First User
          </button>
        </div>
      )}

      {/* User Modal would be rendered here */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'add' ? 'Add New User' : 
                 modalMode === 'edit' ? 'Edit User' : 'User Details'}
              </h3>
              <button 
                onClick={() => setShowUserModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-500">
                  User form would be implemented here with all necessary fields for creating/editing users.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              {modalMode !== 'view' && (
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;