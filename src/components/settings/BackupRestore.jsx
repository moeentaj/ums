// src/components/settings/BackupRestore.jsx - Data Backup and Recovery Management
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Download, 
  Upload, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Database, 
  HardDrive,
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Play,
  Pause,
  Settings,
  Eye,
  Trash2,
  FileText,
  Archive,
  Cloud,
  Server,
  Save,
  Plus
} from 'lucide-react';

const BackupRestore = () => {
  const [backups, setBackups] = useState([]);
  const [backupSettings, setBackupSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('backups');
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock backup data
  const mockBackups = [
    {
      id: 'BACKUP_001',
      name: 'Daily Backup - September 2025',
      type: 'automatic',
      scope: 'full',
      status: 'completed',
      createdAt: '2025-09-02T02:00:00Z',
      completedAt: '2025-09-02T02:45:00Z',
      duration: 45, // minutes
      size: 2.8, // GB
      location: 'cloud',
      retentionDate: '2025-12-02T02:00:00Z',
      includes: ['students', 'academics', 'financial', 'infrastructure', 'security', 'settings'],
      health: 'verified',
      encryption: true,
      compression: true
    },
    {
      id: 'BACKUP_002',
      name: 'Weekly Backup - August 2025',
      type: 'automatic',
      scope: 'full',
      status: 'completed',
      createdAt: '2025-08-26T02:00:00Z',
      completedAt: '2025-08-26T03:15:00Z',
      duration: 75,
      size: 3.2,
      location: 'local',
      retentionDate: '2025-11-26T02:00:00Z',
      includes: ['students', 'academics', 'financial', 'infrastructure', 'security', 'settings'],
      health: 'verified',
      encryption: true,
      compression: true
    },
    {
      id: 'BACKUP_003',
      name: 'Pre-Update Backup',
      type: 'manual',
      scope: 'selective',
      status: 'completed',
      createdAt: '2025-08-15T10:30:00Z',
      completedAt: '2025-08-15T11:00:00Z',
      duration: 30,
      size: 1.5,
      location: 'cloud',
      retentionDate: '2025-11-15T10:30:00Z',
      includes: ['students', 'academics', 'settings'],
      health: 'verified',
      encryption: true,
      compression: false
    },
    {
      id: 'BACKUP_004',
      name: 'Emergency Backup',
      type: 'manual',
      scope: 'full',
      status: 'failed',
      createdAt: '2025-08-10T16:00:00Z',
      completedAt: null,
      duration: null,
      size: null,
      location: 'local',
      retentionDate: null,
      includes: ['students', 'academics', 'financial', 'infrastructure', 'security', 'settings'],
      health: 'corrupted',
      encryption: true,
      compression: true,
      errorMessage: 'Insufficient storage space'
    },
    {
      id: 'BACKUP_005',
      name: 'Academic Year End Backup',
      type: 'manual',
      scope: 'full',
      status: 'in_progress',
      createdAt: '2025-09-02T14:00:00Z',
      completedAt: null,
      duration: null,
      size: null,
      location: 'cloud',
      retentionDate: null,
      includes: ['students', 'academics', 'financial', 'infrastructure', 'security', 'settings'],
      health: 'unknown',
      encryption: true,
      compression: true,
      progress: 65
    }
  ];

  // Mock backup settings
  const mockBackupSettings = {
    automatic: {
      enabled: true,
      frequency: 'daily', // daily, weekly, monthly
      time: '02:00',
      retention: 90, // days
      location: 'cloud', // local, cloud, both
      scope: 'full' // full, selective
    },
    storage: {
      localPath: '/var/backups/university',
      cloudProvider: 'aws-s3',
      cloudBucket: 'university-backups',
      cloudRegion: 'us-east-1',
      maxLocalStorage: 100, // GB
      maxCloudStorage: 500 // GB
    },
    security: {
      encryption: true,
      encryptionKey: '********',
      compression: true,
      compressionLevel: 'medium', // low, medium, high
      verifyBackups: true,
      notifyOnCompletion: true,
      notifyOnFailure: true
    },
    modules: {
      students: { enabled: true, priority: 'high' },
      academics: { enabled: true, priority: 'high' },
      financial: { enabled: true, priority: 'critical' },
      infrastructure: { enabled: true, priority: 'medium' },
      security: { enabled: true, priority: 'critical' },
      settings: { enabled: true, priority: 'high' }
    }
  };

  const tabs = [
    {
      id: 'backups',
      name: 'Backup History',
      icon: Archive,
      description: 'View and manage backup files'
    },
    {
      id: 'schedule',
      name: 'Backup Schedule',
      icon: Calendar,
      description: 'Configure automatic backup schedule'
    },
    {
      id: 'storage',
      name: 'Storage Settings',
      icon: HardDrive,
      description: 'Configure backup storage options'
    },
    {
      id: 'security',
      name: 'Security & Encryption',
      icon: Shield,
      description: 'Backup security and encryption settings'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setBackups(mockBackups);
        setBackupSettings(mockBackupSettings);
      } catch (error) {
        console.error('Failed to load backup data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateBackup = async () => {
    setCreatingBackup(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup = {
        id: `BACKUP_${Date.now()}`,
        name: `Manual Backup - ${new Date().toLocaleDateString()}`,
        type: 'manual',
        scope: 'full',
        status: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        duration: 42,
        size: 2.6,
        location: backupSettings.storage.cloudProvider ? 'cloud' : 'local',
        retentionDate: new Date(Date.now() + (backupSettings.automatic.retention * 24 * 60 * 60 * 1000)).toISOString(),
        includes: Object.keys(backupSettings.modules).filter(module => backupSettings.modules[module].enabled),
        health: 'verified',
        encryption: backupSettings.security.encryption,
        compression: backupSettings.security.compression
      };
      
      setBackups(prev => [newBackup, ...prev]);
      alert('Backup created successfully!');
    } catch (error) {
      console.error('Failed to create backup:', error);
      alert('Failed to create backup. Please try again.');
    } finally {
      setCreatingBackup(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    if (!confirm('Are you sure you want to restore this backup? This will overwrite current data.')) {
      return;
    }
    
    setRestoringBackup(backupId);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      alert('Backup restored successfully! Please restart the system.');
    } catch (error) {
      console.error('Failed to restore backup:', error);
      alert('Failed to restore backup. Please try again.');
    } finally {
      setRestoringBackup(null);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Backup settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in_progress': return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-gray-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'corrupted': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'unknown': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatFileSize = (gb) => {
    if (gb < 1) return `${Math.round(gb * 1024)} MB`;
    return `${gb.toFixed(1)} GB`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderBackupHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-medium text-gray-900">Backup Files</h4>
          <p className="text-sm text-gray-600">Manage your system backups and restore points</p>
        </div>
        
        <button
          onClick={handleCreateBackup}
          disabled={creatingBackup}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {creatingBackup ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {creatingBackup ? 'Creating...' : 'Create Backup'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Backup
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Scope
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size & Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Archive className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(backup.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{backup.type}</div>
                    <div className="text-sm text-gray-500 capitalize">{backup.scope}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(backup.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                        {backup.status.replace('_', ' ')}
                      </span>
                    </div>
                    {backup.status === 'in_progress' && backup.progress && (
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${backup.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{backup.progress}%</div>
                      </div>
                    )}
                    {backup.errorMessage && (
                      <div className="text-xs text-red-600 mt-1">{backup.errorMessage}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {backup.size ? formatFileSize(backup.size) : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDuration(backup.duration)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {backup.location === 'cloud' ? (
                        <Cloud className="h-4 w-4 text-blue-500 mr-1" />
                      ) : (
                        <Server className="h-4 w-4 text-gray-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-900 capitalize">{backup.location}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {getHealthIcon(backup.health)}
                      <span className="text-xs text-gray-500 ml-1 capitalize">{backup.health}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {/* View backup details */}}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {backup.status === 'completed' && backup.health === 'verified' && (
                        <button
                          onClick={() => handleRestoreBackup(backup.id)}
                          disabled={restoringBackup === backup.id}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          title="Restore Backup"
                        >
                          {restoringBackup === backup.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                        </button>
                      )}
                      
                      <button
                        onClick={() => {/* Download backup */}}
                        disabled={backup.status !== 'completed'}
                        className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        title="Download Backup"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this backup?')) {
                            setBackups(prev => prev.filter(b => b.id !== backup.id));
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Backup"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderScheduleSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Automatic Backup Schedule</h4>
        <p className="text-sm text-gray-600 mb-6">Configure when and how often backups are created automatically.</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Enable Compression</h5>
            <p className="text-sm text-gray-600">Compress backup files to save storage space</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={backupSettings.security.compression}
              onChange={(e) => setBackupSettings(prev => ({
                ...prev,
                security: { ...prev.security, compression: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Verify Backups</h5>
            <p className="text-sm text-gray-600">Automatically verify backup integrity after creation</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={backupSettings.security.verifyBackups}
              onChange={(e) => setBackupSettings(prev => ({
                ...prev,
                security: { ...prev.security, verifyBackups: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {backupSettings.security.compression && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compression Level
              </label>
              <select
                value={backupSettings.security.compressionLevel}
                onChange={(e) => setBackupSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, compressionLevel: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low (Faster)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Smaller files)</option>
              </select>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-900">Notification Settings</h5>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-sm text-gray-700">Notify on successful completion</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={backupSettings.security.notifyOnCompletion}
                onChange={(e) => setBackupSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, notifyOnCompletion: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <span className="text-sm text-gray-700">Notify on failure</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={backupSettings.security.notifyOnFailure}
                onChange={(e) => setBackupSettings(prev => ({
                  ...prev,
                  security: { ...prev.security, notifyOnFailure: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div>
          <h5 className="text-sm font-medium text-gray-900 mb-4">Module Backup Priority</h5>
          <div className="space-y-3">
            {Object.entries(backupSettings.modules).map(([moduleKey, module]) => (
              <div key={moduleKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`module-${moduleKey}`}
                    checked={module.enabled}
                    onChange={(e) => setBackupSettings(prev => ({
                      ...prev,
                      modules: {
                        ...prev.modules,
                        [moduleKey]: { ...prev.modules[moduleKey], enabled: e.target.checked }
                      }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`module-${moduleKey}`} className="ml-3 text-sm font-medium text-gray-900 capitalize">
                    {moduleKey} Module
                  </label>
                </div>
                
                <select
                  value={module.priority}
                  onChange={(e) => setBackupSettings(prev => ({
                    ...prev,
                    modules: {
                      ...prev.modules,
                      [moduleKey]: { ...prev.modules[moduleKey], priority: e.target.value }
                    }
                  }))}
                  disabled={!module.enabled}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'backups':
        return renderBackupHistory();
      case 'schedule':
        return renderScheduleSettings();
      case 'storage':
        return renderStorageSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return renderBackupHistory();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Backup & Restore</h2>
          <p className="text-gray-600">Manage system backups and data recovery options</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Backup Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful Backups</p>
              <p className="text-2xl font-bold text-green-600">
                {backups.filter(b => b.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <HardDrive className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Storage Used</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatFileSize(backups.filter(b => b.size).reduce((sum, b) => sum + b.size, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-lg font-semibold text-purple-600">
                {backups.length > 0 ? new Date(backups[0].createdAt).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Backup</p>
              <p className="text-lg font-semibold text-green-600">
                {backupSettings.automatic.enabled ? 'Tonight 2:00 AM' : 'Not Scheduled'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {tabs.find(t => t.id === activeTab)?.name}
            </h3>
            <p className="text-sm text-gray-600">
              {tabs.find(t => t.id === activeTab)?.description}
            </p>
          </div>
          
          {renderCurrentTab()}
        </div>
      </div>

      {/* System Health Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Backup System Status</h4>
            <div className="mt-2 text-sm text-blue-700">
              <p>✓ Automatic backups are enabled and running</p>
              <p>✓ Last backup completed successfully</p>
              <p>✓ All backup storage locations are accessible</p>
              <p>✓ Backup verification is enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;