// src/components/security/UserForm.jsx - User Creation and Editing Form
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar, 
  Key, 
  Shield, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

const UserForm = ({ 
  mode = 'add', // add, edit, view
  user = null,
  onSave,
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    department: '',
    employeeId: '',
    address: '',
    password: '',
    confirmPassword: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    accountSettings: {
      emailNotifications: true,
      smsNotifications: false,
      twoFactorEnabled: false,
      forcePasswordChange: true
    }
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { value: 'student', label: 'Student', description: 'Basic access to personal information and schedules' },
    { value: 'faculty', label: 'Faculty', description: 'Teaching staff with academic management access' },
    { value: 'staff', label: 'Staff', description: 'Administrative staff with department-specific access' },
    { value: 'admin', label: 'Administrator', description: 'Full system access and management privileges' }
  ];

  const departments = [
    'Computer Science',
    'Mathematics',
    'Biology',
    'Physics',
    'Chemistry',
    'Administration',
    'Engineering',
    'Business',
    'Psychology',
    'Education'
  ];

  const relationships = [
    'Parent',
    'Spouse',
    'Sibling',
    'Child',
    'Friend',
    'Other'
  ];

  useEffect(() => {
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'student',
        department: user.department || '',
        employeeId: user.employeeId || '',
        address: user.address || '',
        password: '',
        confirmPassword: '',
        emergencyContact: {
          name: user.emergencyContact?.name || '',
          phone: user.emergencyContact?.phone || '',
          relationship: user.emergencyContact?.relationship || ''
        },
        accountSettings: {
          emailNotifications: user.accountSettings?.emailNotifications ?? true,
          smsNotifications: user.accountSettings?.smsNotifications ?? false,
          twoFactorEnabled: user.accountSettings?.twoFactorEnabled ?? false,
          forcePasswordChange: user.accountSettings?.forcePasswordChange ?? false
        }
      });
    }
  }, [user, mode]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee/Student ID is required';
    }

    // Password validation for new users
    if (mode === 'add') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Emergency contact validation
    if (formData.emergencyContact.name && !formData.emergencyContact.phone) {
      newErrors['emergencyContact.phone'] = 'Emergency contact phone is required when name is provided';
    }

    if (formData.emergencyContact.phone && !formData.emergencyContact.name) {
      newErrors['emergencyContact.name'] = 'Emergency contact name is required when phone is provided';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Prepare data for saving
      const userData = {
        ...formData,
        id: user?.id || `USR${String(Date.now()).slice(-3).padStart(3, '0')}`,
        createdDate: user?.createdDate || new Date().toISOString().split('T')[0],
        lastLogin: user?.lastLogin || null,
        loginCount: user?.loginCount || 0,
        status: user?.status || 'active'
      };

      // Remove password fields before saving (in real app, these would be handled securely)
      if (mode === 'edit') {
        delete userData.password;
        delete userData.confirmPassword;
      }

      onSave(userData);
    } catch (error) {
      console.error('Failed to save user:', error);
      setErrors({ submit: 'Failed to save user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));

    // Clear error when user starts typing
    const errorKey = `${parent}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined
      }));
    }
  };

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  const selectedRole = roles.find(r => r.value === formData.role);

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                disabled={isViewMode}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode ? 'bg-gray-50' : 'bg-white'
                } ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  disabled={isViewMode}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                    isViewMode ? 'bg-gray-50' : 'bg-white'
                  } ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="user@university.edu"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  disabled={isViewMode}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                    isViewMode ? 'bg-gray-50' : 'bg-white'
                  } ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="+1-555-0123"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee/Student ID *
              </label>
              <input
                type="text"
                required
                disabled={isViewMode || isEditMode}
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode || isEditMode ? 'bg-gray-50' : 'bg-white'
                } ${errors.employeeId ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="EMP001 or STU001"
              />
              {errors.employeeId && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors.employeeId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Role and Department */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Role and Department
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                required
                disabled={isViewMode}
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode ? 'bg-gray-50' : 'bg-white'
                } border-gray-300`}
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {selectedRole && (
                <p className="mt-1 text-sm text-gray-500">{selectedRole.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  required
                  disabled={isViewMode}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                    isViewMode ? 'bg-gray-50' : 'bg-white'
                  } ${errors.department ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors.department}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Address Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              disabled={isViewMode}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                isViewMode ? 'bg-gray-50' : 'bg-white'
              } border-gray-300`}
              placeholder="Enter full address"
            />
          </div>
        </div>

        {/* Security Settings */}
        {(isAddMode || isEditMode) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Key className="mr-2 h-5 w-5" />
              Security Settings
            </h3>
            
            {isAddMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-red-500 bg-white ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 bg-white ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Account Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isViewMode}
                    checked={formData.accountSettings.emailNotifications}
                    onChange={(e) => handleNestedInputChange('accountSettings', 'emailNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isViewMode}
                    checked={formData.accountSettings.smsNotifications}
                    onChange={(e) => handleNestedInputChange('accountSettings', 'smsNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isViewMode}
                    checked={formData.accountSettings.twoFactorEnabled}
                    onChange={(e) => handleNestedInputChange('accountSettings', 'twoFactorEnabled', e.target.checked)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable two-factor authentication</span>
                </label>

                {isAddMode && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.accountSettings.forcePasswordChange}
                      onChange={(e) => handleNestedInputChange('accountSettings', 'forcePasswordChange', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Force password change on first login</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                disabled={isViewMode}
                value={formData.emergencyContact.name}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode ? 'bg-gray-50' : 'bg-white'
                } ${errors['emergencyContact.name'] ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Emergency contact name"
              />
              {errors['emergencyContact.name'] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors['emergencyContact.name']}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                disabled={isViewMode}
                value={formData.emergencyContact.phone}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode ? 'bg-gray-50' : 'bg-white'
                } ${errors['emergencyContact.phone'] ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="+1-555-0123"
              />
              {errors['emergencyContact.phone'] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {errors['emergencyContact.phone']}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <select
                disabled={isViewMode}
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                  isViewMode ? 'bg-gray-50' : 'bg-white'
                } border-gray-300`}
              >
                <option value="">Select relationship</option>
                {relationships.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{errors.submit}</span>
            </div>
          </div>
        )}

        {/* Form Actions */}
        {!isViewMode && (
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isAddMode ? 'Creating...' : 'Saving...'}
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isAddMode ? 'Create User' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        )}

        {/* View Mode Actions */}
        {isViewMode && (
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </form>

      {/* Additional Info for View Mode */}
      {isViewMode && user && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-medium text-gray-700">Account Created:</span>
              <span className="ml-2 text-gray-600">
                {new Date(user.createdDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Login:</span>
              <span className="ml-2 text-gray-600">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Login Count:</span>
              <span className="ml-2 text-gray-600">{user.loginCount || 0}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Account Status:</span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status}
              </span>
            </div>
            {user.accountSettings?.passwordLastChanged && (
              <div>
                <span className="font-medium text-gray-700">Password Last Changed:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(user.accountSettings.passwordLastChanged).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;