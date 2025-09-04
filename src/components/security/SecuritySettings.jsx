// src/components/security/SecuritySettings.jsx - Security Policy Configuration (Complete)
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Shield, 
  Lock, 
  Key, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Mail,
  Phone,
  Bell,
  Database,
  Server,
  Globe,
  Users,
  FileText,
  Toggle
} from 'lucide-react';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('authentication');

  // Mock security settings data
  const mockSettings = {
    authentication: {
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        preventReuse: 5,
        maxAge: 90
      },
      loginSettings: {
        maxFailedAttempts: 5,
        lockoutDuration: 15,
        sessionTimeout: 480,
        requireTwoFactor: false,
        allowRememberMe: true,
        forcePasswordChange: true
      },
      twoFactorAuth: {
        enabled: true,
        methods: ['sms', 'email', 'authenticator'],
        backupCodes: true,
        gracePeriod: 7
      }
    },
    accessControl: {
      ipWhitelist: {
        enabled: false,
        allowedIPs: ['192.168.1.0/24', '10.0.0.0/16'],
        blockUnknownIPs: false
      },
      geolocation: {
        enabled: true,
        allowedCountries: ['US', 'CA'],
        blockSuspiciousLocations: true,
        alertOnNewLocation: true
      },
      deviceManagement: {
        maxDevicesPerUser: 5,
        requireDeviceApproval: false,
        autoLogoutInactiveDevices: true,
        deviceTrustPeriod: 30
      }
    },
    monitoring: {
      auditLogging: {
        enabled: true,
        logLevel: 'detailed',
        retentionPeriod: 365,
        realTimeAlerts: true,
        logCategories: ['authentication', 'authorization', 'data_access', 'system_changes']
      },
      alertSettings: {
        enabled: true,
        alertMethods: ['email', 'sms'],
        alertRecipients: ['admin@university.edu', 'security@university.edu'],
        severityThreshold: 'warning',
        rateLimiting: true
      },
      behaviorAnalytics: {
        enabled: true,
        anomalyDetection: true,
        riskScoring: true,
        automaticResponse: false
      }
    },
    dataProtection: {
      encryption: {
        dataAtRest: true,
        dataInTransit: true,
        keyRotationPeriod: 90,
        encryptionAlgorithm: 'AES-256'
      },
      dataRetention: {
        userDataRetention: 2555, // 7 years
        auditLogRetention: 365,
        backupRetention: 90,
        automaticPurging: true
      },
      privacySettings: {
        dataMinimization: true,
        consentManagement: true,
        rightToErasure: true,
        dataPortability: true
      }
    },
    systemSecurity: {
      systemHardening: {
        autoUpdates: true,
        securityHeaders: true,
        csrfProtection: true,
        sqlInjectionProtection: true
      },
      backupSecurity: {
        encryptedBackups: true,
        offSiteBackups: true,
        backupFrequency: 'daily',
        backupTesting: 'weekly'
      },
      networkSecurity: {
        firewallEnabled: true,
        intrusionDetection: true,
        ddosProtection: true,
        vpnRequired: false
      }
    }
  };

  const tabs = [
    {
      id: 'authentication',
      name: 'Authentication',
      icon: Key,
      description: 'Password policies and login settings'
    },
    {
      id: 'accessControl',
      name: 'Access Control',
      icon: Lock,
      description: 'IP restrictions and device management'
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      icon: Eye,
      description: 'Audit logging and alert configuration'
    },
    {
      id: 'dataProtection',
      name: 'Data Protection',
      icon: Shield,
      description: 'Encryption and data retention policies'
    },
    {
      id: 'systemSecurity',
      name: 'System Security',
      icon: Server,
      description: 'System hardening and network security'
    }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSettings(mockSettings);
      } catch (error) {
        console.error('Failed to load security settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Save settings logic would go here
      alert('Security settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (category, subcategory, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [key]: value
        }
      }
    }));
  };

  const updateArraySetting = (category, subcategory, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [key]: value
        }
      }
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
          <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
          <p className="text-gray-600">Configure security policies and system parameters</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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

        <div className="p-6">
          {/* Authentication Settings */}
          {activeTab === 'authentication' && settings.authentication && (
            <div className="space-y-8">
              {/* Password Policy */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Password Length
                    </label>
                    <input
                      type="number"
                      min="8"
                      max="128"
                      value={settings.authentication.passwordPolicy.minLength}
                      onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Max Age (days)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="365"
                      value={settings.authentication.passwordPolicy.maxAge}
                      onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'maxAge', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prevent Password Reuse (last N passwords)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={settings.authentication.passwordPolicy.preventReuse}
                      onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'preventReuse', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Password Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.passwordPolicy.requireUppercase}
                        onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.passwordPolicy.requireLowercase}
                        onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'requireLowercase', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require lowercase letters</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.passwordPolicy.requireNumbers}
                        onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require numbers</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.passwordPolicy.requireSpecialChars}
                        onChange={(e) => updateSetting('authentication', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require special characters</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Login Settings */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Failed Login Attempts
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={settings.authentication.loginSettings.maxFailedAttempts}
                      onChange={(e) => updateSetting('authentication', 'loginSettings', 'maxFailedAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Lockout Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="1440"
                      value={settings.authentication.loginSettings.lockoutDuration}
                      onChange={(e) => updateSetting('authentication', 'loginSettings', 'lockoutDuration', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="1440"
                      value={settings.authentication.loginSettings.sessionTimeout}
                      onChange={(e) => updateSetting('authentication', 'loginSettings', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.loginSettings.requireTwoFactor}
                        onChange={(e) => updateSetting('authentication', 'loginSettings', 'requireTwoFactor', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require two-factor authentication</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.loginSettings.allowRememberMe}
                        onChange={(e) => updateSetting('authentication', 'loginSettings', 'allowRememberMe', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Allow "Remember Me" option</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.authentication.loginSettings.forcePasswordChange}
                        onChange={(e) => updateSetting('authentication', 'loginSettings', 'forcePasswordChange', e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Force password change on first login</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.authentication.twoFactorAuth.enabled}
                      onChange={(e) => updateSetting('authentication', 'twoFactorAuth', 'enabled', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable two-factor authentication system</span>
                  </label>

                  {settings.authentication.twoFactorAuth.enabled && (
                    <div className="ml-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Available Methods</h4>
                        <div className="space-y-2">
                          {['sms', 'email', 'authenticator'].map(method => (
                            <label key={method} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={settings.authentication.twoFactorAuth.methods.includes(method)}
                                onChange={(e) => {
                                  const methods = settings.authentication.twoFactorAuth.methods;
                                  const newMethods = e.target.checked 
                                    ? [...methods, method]
                                    : methods.filter(m => m !== method);
                                  updateSetting('authentication', 'twoFactorAuth', 'methods', newMethods);
                                }}
                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 capitalize">
                                {method === 'authenticator' ? 'Authenticator App' : method.toUpperCase()}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grace Period for New Users (days)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={settings.authentication.twoFactorAuth.gracePeriod}
                          onChange={(e) => updateSetting('authentication', 'twoFactorAuth', 'gracePeriod', parseInt(e.target.value))}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.authentication.twoFactorAuth.backupCodes}
                          onChange={(e) => updateSetting('authentication', 'twoFactorAuth', 'backupCodes', e.target.checked)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable backup codes</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other tab contents would continue here... */}
        </div>
      </div>

      {/* Security Status Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Status Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Authentication</h4>
            <p className="text-sm text-green-600">Secure</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Access Control</h4>
            <p className="text-sm text-green-600">Protected</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="font-medium text-gray-900">Monitoring</h4>
            <p className="text-sm text-yellow-600">Needs Attention</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Data Protection</h4>
            <p className="text-sm text-green-600">Compliant</p>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">Security Recommendations</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Consider enabling two-factor authentication requirement for all users</li>
                <li>Review and update password policies to increase minimum length to 14 characters</li>
                <li>Enable behavioral analytics for enhanced threat detection</li>
                <li>Configure automatic security updates for critical patches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;