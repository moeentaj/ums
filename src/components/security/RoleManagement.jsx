// src/components/security/RoleManagement.jsx - Role Definition and Assignment
import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy,
  Users,
  Shield,
  Lock,
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  User,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit, view
  const [selectedRole, setSelectedRole] = useState(null);

  // Mock role data
  const mockRoles = [
    {
      id: 'ROLE001',
      name: 'System Administrator',
      description: 'Full system access with all administrative privileges',
      type: 'admin',
      userCount: 2,
      status: 'active',
      createdDate: '2023-01-15',
      lastModified: '2025-08-15',
      permissions: {
        students: { read: true, write: true, delete: true, admin: true },
        academics: { read: true, write: true, delete: true, admin: true },
        financial: { read: true, write: true, delete: true, admin: true },
        infrastructure: { read: true, write: true, delete: true, admin: true },
        security: { read: true, write: true, delete: true, admin: true },
        schedule: { read: true, write: true, delete: true, admin: true },
        graduation: { read: true, write: true, delete: true, admin: true },
        settings: { read: true, write: true, delete: true, admin: true }
      },
      specialPermissions: [
        'user_management',
        'system_backup',
        'security_override',
        'audit_access',
        'role_management'
      ],
      restrictions: [],
      inheritance: null
    },
    {
      id: 'ROLE002',
      name: 'Faculty Member',
      description: 'Teaching staff with access to academic and student management',
      type: 'faculty',
      userCount: 45,
      status: 'active',
      createdDate: '2023-02-01',
      lastModified: '2025-07-20',
      permissions: {
        students: { read: true, write: true, delete: false, admin: false },
        academics: { read: true, write: true, delete: false, admin: false },
        financial: { read: false, write: false, delete: false, admin: false },
        infrastructure: { read: true, write: false, delete: false, admin: false },
        security: { read: false, write: false, delete: false, admin: false },
        schedule: { read: true, write: true, delete: false, admin: false },
        graduation: { read: true, write: true, delete: false, admin: false },
        settings: { read: false, write: false, delete: false, admin: false }
      },
      specialPermissions: [
        'grade_entry',
        'course_creation',
        'attendance_tracking',
        'grade_override'
      ],
      restrictions: [
        'no_financial_access',
        'limited_user_data'
      ],
      inheritance: null
    },
    {
      id: 'ROLE003',
      name: 'Student',
      description: 'Basic student access to view personal information and schedules',
      type: 'student',
      userCount: 1200,
      status: 'active',
      createdDate: '2023-01-20',
      lastModified: '2025-06-10',
      permissions: {
        students: { read: false, write: false, delete: false, admin: false },
        academics: { read: true, write: false, delete: false, admin: false },
        financial: { read: true, write: false, delete: false, admin: false },
        infrastructure: { read: false, write: false, delete: false, admin: false },
        security: { read: false, write: false, delete: false, admin: false },
        schedule: { read: true, write: false, delete: false, admin: false },
        graduation: { read: true, write: false, delete: false, admin: false },
        settings: { read: false, write: false, delete: false, admin: false }
      },
      specialPermissions: [
        'view_own_records',
        'course_enrollment',
        'grade_viewing'
      ],
      restrictions: [
        'own_data_only',
        'no_admin_access',
        'read_only_access'
      ],
      inheritance: null
    },
    {
      id: 'ROLE004',
      name: 'Department Head',
      description: 'Faculty with additional administrative privileges for their department',
      type: 'faculty',
      userCount: 8,
      status: 'active',
      createdDate: '2023-03-10',
      lastModified: '2025-08-01',
      permissions: {
        students: { read: true, write: true, delete: false, admin: true },
        academics: { read: true, write: true, delete: true, admin: true },
        financial: { read: true, write: false, delete: false, admin: false },
        infrastructure: { read: true, write: true, delete: false, admin: false },
        security: { read: false, write: false, delete: false, admin: false },
        schedule: { read: true, write: true, delete: true, admin: true },
        graduation: { read: true, write: true, delete: false, admin: true },
        settings: { read: true, write: false, delete: false, admin: false }
      },
      specialPermissions: [
        'department_management',
        'faculty_oversight',
        'course_approval',
        'budget_viewing',
        'schedule_management'
      ],
      restrictions: [
        'department_scope_only'
      ],
      inheritance: 'ROLE002' // Inherits from Faculty Member
    },
    {
      id: 'ROLE005',
      name: 'Finance Officer',
      description: 'Financial management and reporting access',
      type: 'staff',
      userCount: 3,
      status: 'active',
      createdDate: '2023-04-05',
      lastModified: '2025-07-15',
      permissions: {
        students: { read: true, write: false, delete: false, admin: false },
        academics: { read: false, write: false, delete: false, admin: false },
        financial: { read: true, write: true, delete: true, admin: true },
        infrastructure: { read: false, write: false, delete: false, admin: false },
        security: { read: false, write: false, delete: false, admin: false },
        schedule: { read: false, write: false, delete: false, admin: false },
        graduation: { read: false, write: false, delete: false, admin: false },
        settings: { read: false, write: false, delete: false, admin: false }
      },
      specialPermissions: [
        'financial_reporting',
        'payment_processing',
        'scholarship_management',
        'budget_management'
      ],
      restrictions: [
        'financial_scope_only'
      ],
      inheritance: null
    },
    {
      id: 'ROLE006',
      name: 'Research Assistant',
      description: 'Limited access for research activities and data collection',
      type: 'student',
      userCount: 67,
      status: 'active',
      createdDate: '2023-05-20',
      lastModified: '2025-06-25',
      permissions: {
        students: { read: true, write: false, delete: false, admin: false },
        academics: { read: true, write: true, delete: false, admin: false },
        financial: { read: false, write: false, delete: false, admin: false },
        infrastructure: { read: true, write: false, delete: false, admin: false },
        security: { read: false, write: false, delete: false, admin: false },
        schedule: { read: true, write: false, delete: false, admin: false },
        graduation: { read: true, write: false, delete: false, admin: false },
        settings: { read: false, write: false, delete: false, admin: false }
      },
      specialPermissions: [
        'research_data_access',
        'lab_equipment_booking',
        'research_reporting'
      ],
      restrictions: [
        'supervised_access',
        'limited_data_export'
      ],
      inheritance: 'ROLE003' // Inherits from Student
    }
  ];

  // Permission modules for role configuration
  const permissionModules = [
    { id: 'students', name: 'Student Management', icon: Users },
    { id: 'academics', name: 'Academic Management', icon: GraduationCap },
    { id: 'financial', name: 'Financial Management', icon: Briefcase },
    { id: 'infrastructure', name: 'Infrastructure', icon: Settings },
    { id: 'security', name: 'Security & Access', icon: Shield },
    { id: 'schedule', name: 'Schedule Management', icon: Settings },
    { id: 'graduation', name: 'Graduation Tracking', icon: GraduationCap },
    { id: 'settings', name: 'System Settings', icon: Settings }
  ];

  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setRoles(mockRoles);
      } catch (error) {
        console.error('Failed to load roles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  const filteredRoles = roles.filter(role => {
    return role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           role.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getRoleTypeIcon = (type) => {
    switch (type) {
      case 'admin': return <Crown className="h-5 w-5 text-purple-600" />;
      case 'faculty': return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'student': return <User className="h-5 w-5 text-green-600" />;
      case 'staff': return <Briefcase className="h-5 w-5 text-yellow-600" />;
      default: return <UserCheck className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRoleTypeColor = (type) => {
    switch (type) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'faculty': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionLevel = (permissions) => {
    const totalPerms = Object.keys(permissions).length * 4; // read, write, delete, admin
    const grantedPerms = Object.values(permissions).reduce((sum, perm) => {
      return sum + (perm.read ? 1 : 0) + (perm.write ? 1 : 0) + (perm.delete ? 1 : 0) + (perm.admin ? 1 : 0);
    }, 0);
    return Math.round((grantedPerms / totalPerms) * 100);
  };

  const handleAddRole = () => {
    setModalMode('add');
    setSelectedRole(null);
    setShowRoleModal(true);
  };

  const handleEditRole = (role) => {
    setModalMode('edit');
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const handleViewRole = (role) => {
    setModalMode('view');
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role.userCount > 0) {
      alert(`Cannot delete role "${role.name}" because it is assigned to ${role.userCount} users.`);
      return;
    }
    if (window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const handleDuplicateRole = (role) => {
    const newRole = {
      ...role,
      id: 'ROLE' + String(roles.length + 1).padStart(3, '0'),
      name: `${role.name} (Copy)`,
      userCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setRoles([...roles, newRole]);
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
          <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
          <p className="text-gray-600">Define user roles and permissions</p>
        </div>
        
        <button
          onClick={handleAddRole}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Role
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold">{roles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Crown className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Admin Roles</p>
              <p className="text-2xl font-bold">{roles.filter(r => r.type === 'admin').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold">{roles.reduce((sum, r) => sum + r.userCount, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Roles</p>
              <p className="text-2xl font-bold">{roles.filter(r => r.status === 'active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.map((role) => {
          const permissionLevel = getPermissionLevel(role.permissions);
          const parentRole = role.inheritance ? roles.find(r => r.id === role.inheritance) : null;
          
          return (
            <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Role Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {getRoleTypeIcon(role.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      {parentRole && (
                        <p className="text-xs text-blue-600 mt-1">
                          Inherits from: {parentRole.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleTypeColor(role.type)}`}>
                      {role.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {role.userCount} users
                    </span>
                  </div>
                </div>
              </div>

              {/* Role Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Permission Level */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Permission Level</span>
                      <span className="text-sm font-medium">{permissionLevel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
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

                  {/* Special Permissions */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Special Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {role.specialPermissions.slice(0, 3).map((perm, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {perm.replace('_', ' ')}
                        </span>
                      ))}
                      {role.specialPermissions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{role.specialPermissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Restrictions */}
                  {role.restrictions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Restrictions</p>
                      <div className="flex flex-wrap gap-1">
                        {role.restrictions.slice(0, 2).map((restriction, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {restriction.replace('_', ' ')}
                          </span>
                        ))}
                        {role.restrictions.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{role.restrictions.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Module Access */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Module Access</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(role.permissions).slice(0, 8).map(([moduleId, perms]) => {
                        const hasAccess = perms.read || perms.write || perms.delete || perms.admin;
                        return (
                          <div key={moduleId} className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                              hasAccess ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {hasAccess ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    <p>Created: {new Date(role.createdDate).toLocaleDateString()}</p>
                    <p>Modified: {new Date(role.lastModified).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Role Actions */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewRole(role)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicateRole(role)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Duplicate Role"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditRole(role)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit Role"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Role"
                      disabled={role.userCount > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or create a new role.
          </p>
          <button
            onClick={handleAddRole}
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create First Role
          </button>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <RoleModal
          mode={modalMode}
          role={selectedRole}
          roles={roles}
          permissionModules={permissionModules}
          onClose={() => setShowRoleModal(false)}
          onSave={(roleData) => {
            if (modalMode === 'add') {
              const newRole = {
                ...roleData,
                id: 'ROLE' + String(roles.length + 1).padStart(3, '0'),
                userCount: 0,
                status: 'active',
                createdDate: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0]
              };
              setRoles([...roles, newRole]);
            } else if (modalMode === 'edit') {
              setRoles(roles.map(r => 
                r.id === selectedRole.id 
                  ? { ...r, ...roleData, lastModified: new Date().toISOString().split('T')[0] }
                  : r
              ));
            }
            setShowRoleModal(false);
          }}
        />
      )}
    </div>
  );
};

// Role Modal Component
const RoleModal = ({ mode, role, roles, permissionModules, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    type: role?.type || 'student',
    inheritance: role?.inheritance || '',
    permissions: role?.permissions || permissionModules.reduce((acc, module) => ({
      ...acc,
      [module.id]: { read: false, write: false, delete: false, admin: false }
    }), {}),
    specialPermissions: role?.specialPermissions || [],
    restrictions: role?.restrictions || []
  });

  const [newSpecialPermission, setNewSpecialPermission] = useState('');
  const [newRestriction, setNewRestriction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updatePermission = (moduleId, permType, value) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [moduleId]: {
          ...formData.permissions[moduleId],
          [permType]: value
        }
      }
    });
  };

  const addSpecialPermission = () => {
    if (newSpecialPermission && !formData.specialPermissions.includes(newSpecialPermission)) {
      setFormData({
        ...formData,
        specialPermissions: [...formData.specialPermissions, newSpecialPermission]
      });
      setNewSpecialPermission('');
    }
  };

  const removeSpecialPermission = (permission) => {
    setFormData({
      ...formData,
      specialPermissions: formData.specialPermissions.filter(p => p !== permission)
    });
  };

  const addRestriction = () => {
    if (newRestriction && !formData.restrictions.includes(newRestriction)) {
      setFormData({
        ...formData,
        restrictions: [...formData.restrictions, newRestriction]
      });
      setNewRestriction('');
    }
  };

  const removeRestriction = (restriction) => {
    setFormData({
      ...formData,
      restrictions: formData.restrictions.filter(r => r !== restriction)
    });
  };

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Create New Role' : 
                mode === 'edit' ? 'Edit Role' : 'Role Details';

  const availableParentRoles = roles.filter(r => r.id !== role?.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isViewMode}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Type *
                  </label>
                  <select
                    required
                    disabled={isViewMode}
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    disabled={isViewMode}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inherit From Role
                  </label>
                  <select
                    disabled={isViewMode}
                    value={formData.inheritance}
                    onChange={(e) => setFormData({...formData, inheritance: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  >
                    <option value="">No Inheritance</option>
                    {availableParentRoles.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Module Permissions */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Module Permissions</h4>
              <div className="space-y-4">
                {permissionModules.map((module) => {
                  const Icon = module.icon;
                  const perms = formData.permissions[module.id];
                  
                  return (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 text-gray-500 mr-3" />
                          <h5 className="text-sm font-medium text-gray-900">{module.name}</h5>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            disabled={isViewMode}
                            checked={perms.read}
                            onChange={(e) => updatePermission(module.id, 'read', e.target.checked)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Read</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            disabled={isViewMode}
                            checked={perms.write}
                            onChange={(e) => updatePermission(module.id, 'write', e.target.checked)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Write</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            disabled={isViewMode}
                            checked={perms.delete}
                            onChange={(e) => updatePermission(module.id, 'delete', e.target.checked)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Delete</span>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            disabled={isViewMode}
                            checked={perms.admin}
                            onChange={(e) => updatePermission(module.id, 'admin', e.target.checked)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Admin</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Special Permissions */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Special Permissions</h4>
              <div className="space-y-4">
                {!isViewMode && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter special permission..."
                      value={newSpecialPermission}
                      onChange={(e) => setNewSpecialPermission(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={addSpecialPermission}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {formData.specialPermissions.map((permission, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center">
                      {permission.replace('_', ' ')}
                      {!isViewMode && (
                        <button
                          type="button"
                          onClick={() => removeSpecialPermission(permission)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <XCircle className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Restrictions */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Restrictions</h4>
              <div className="space-y-4">
                {!isViewMode && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter restriction..."
                      value={newRestriction}
                      onChange={(e) => setNewRestriction(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="button"
                      onClick={addRestriction}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Add
                    </button>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {formData.restrictions.map((restriction, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full flex items-center">
                      {restriction.replace('_', ' ')}
                      {!isViewMode && (
                        <button
                          type="button"
                          onClick={() => removeRestriction(restriction)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!isViewMode && (
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {mode === 'add' ? 'Create Role' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RoleManagement;