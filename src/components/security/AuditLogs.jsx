// src/components/security/AuditLogs.jsx - System Activity Monitoring and Security Events
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Shield,
  Database,
  Settings,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  MapPin,
  Activity,
  TrendingUp
} from 'lucide-react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Helper functions defined at the top
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'critical': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'authentication': return <LogIn className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'data_access': return <Database className="h-4 w-4" />;
      case 'data_modification': return <Edit className="h-4 w-4" />;
      case 'user_management': return <User className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'success': return 'text-green-600';
      case 'failure': return 'text-red-600';
      case 'blocked': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Mock audit log data
  const mockLogs = [
    {
      id: 'LOG001',
      timestamp: '2025-09-02T10:30:15Z',
      category: 'authentication',
      severity: 'info',
      event: 'User Login',
      description: 'Successful login attempt',
      user: {
        id: 'USR001',
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        role: 'faculty'
      },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: 'Campus Network',
      resource: '/login',
      action: 'LOGIN_SUCCESS',
      details: {
        sessionId: 'sess_abc123',
        loginMethod: 'password',
        twoFactorUsed: true,
        previousLogin: '2025-09-01T16:45:00Z'
      },
      outcome: 'success'
    },
    {
      id: 'LOG002',
      timestamp: '2025-09-02T10:25:42Z',
      category: 'security',
      severity: 'warning',
      event: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected',
      user: {
        id: 'unknown',
        name: 'Unknown User',
        email: 'john.doe@university.edu',
        role: 'unknown'
      },
      ipAddress: '203.45.67.89',
      userAgent: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
      location: 'External Network',
      resource: '/login',
      action: 'LOGIN_FAILURE',
      details: {
        attemptCount: 5,
        reason: 'invalid_credentials',
        accountLocked: true,
        lockDuration: '15 minutes'
      },
      outcome: 'failure'
    },
    {
      id: 'LOG003',
      timestamp: '2025-09-02T10:20:30Z',
      category: 'data_access',
      severity: 'info',
      event: 'Student Record Access',
      description: 'Student academic records viewed',
      user: {
        id: 'USR002',
        name: 'John Administrator',
        email: 'admin@university.edu',
        role: 'admin'
      },
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      location: 'Administration Office',
      resource: '/students/STU001/records',
      action: 'DATA_VIEW',
      details: {
        studentId: 'STU001',
        recordType: 'academic_transcript',
        dataFields: ['grades', 'courses', 'gpa'],
        accessReason: 'graduation_review'
      },
      outcome: 'success'
    },
    {
      id: 'LOG004',
      timestamp: '2025-09-02T10:15:18Z',
      category: 'user_management',
      severity: 'info',
      event: 'User Permission Modified',
      description: 'User permissions updated',
      user: {
        id: 'USR002',
        name: 'John Administrator',
        email: 'admin@university.edu',
        role: 'admin'
      },
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      location: 'Administration Office',
      resource: '/security/users/USR003/permissions',
      action: 'PERMISSION_UPDATE',
      details: {
        targetUserId: 'USR003',
        targetUserName: 'Jane Student',
        changedPermissions: ['schedule_write', 'financial_read'],
        previousPermissions: ['schedule_read'],
        changeReason: 'role_promotion'
      },
      outcome: 'success'
    },
    {
      id: 'LOG005',
      timestamp: '2025-09-02T10:10:05Z',
      category: 'system',
      severity: 'error',
      event: 'Database Connection Failure',
      description: 'Failed to establish database connection',
      user: {
        id: 'system',
        name: 'System Process',
        email: 'system@university.edu',
        role: 'system'
      },
      ipAddress: '127.0.0.1',
      userAgent: 'University Management System v2.1',
      location: 'Server',
      resource: '/api/database/connection',
      action: 'DB_CONNECT',
      details: {
        errorCode: 'CONN_TIMEOUT',
        errorMessage: 'Connection timeout after 30 seconds',
        retryAttempt: 3,
        maxRetries: 5,
        databaseHost: 'db-primary.university.edu'
      },
      outcome: 'failure'
    }
  ];

  const categories = ['all', 'authentication', 'security', 'data_access', 'data_modification', 'user_management', 'system'];
  const severities = ['all', 'info', 'warning', 'error', 'critical'];
  const dateRanges = ['today', 'yesterday', 'last_7_days', 'last_30_days', 'custom'];

  // Get unique users from logs for filter
  const users = ['all', ...Array.from(new Set(logs.map(log => log.user.name))).filter(Boolean)];

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLogs(mockLogs);
      } catch (error) {
        console.error('Failed to load audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesUser = selectedUser === 'all' || log.user.name === selectedUser;
    
    return matchesSearch && matchesCategory && matchesSeverity && matchesUser;
  });

  const handleViewLog = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const handleExportLogs = () => {
    alert('Exporting audit logs... This feature would generate a CSV/PDF report.');
  };

  const handleRefreshLogs = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-gray-900">System Audit Logs</h2>
          <p className="text-gray-600">Monitor system activities and security events</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshLogs}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleExportLogs}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            {severities.map(severity => (
              <option key={severity} value={severity}>
                {severity === 'all' ? 'All Severities' : severity.charAt(0).toUpperCase() + severity.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Users</option>
            {users.slice(1).map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>
                {range.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold">{logs.filter(l => l.severity === 'warning').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Errors</p>
              <p className="text-2xl font-bold">{logs.filter(l => l.severity === 'error' || l.severity === 'critical').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Security Events</p>
              <p className="text-2xl font-bold">{logs.filter(l => l.category === 'security').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Audit Trail ({filteredLogs.length} events)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Outcome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-gray-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{log.event}</div>
                      <div className="text-gray-500 truncate max-w-xs">{log.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                        <div className="text-xs text-gray-500">{log.user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getCategoryIcon(log.category)}
                      <span className="ml-2 text-sm text-gray-600">
                        {log.category.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getSeverityIcon(log.severity)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getOutcomeColor(log.outcome)}`}>
                      {log.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewLog(log)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Modal */}
      {showLogModal && selectedLog && (
        <LogDetailModal
          log={selectedLog}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </div>
  );
};

// Log Detail Modal Component
const LogDetailModal = ({ log, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Audit Log Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Event Overview */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Event Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{log.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Type</label>
                  <p className="mt-1 text-sm text-gray-900">{log.event}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Outcome</label>
                  <p className="mt-1 text-sm text-gray-900">{log.outcome}</p>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{log.description}</p>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Event Details</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-900 whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;