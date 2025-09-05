// src/components/settings/SystemIntegrations.jsx - Third-party System Integrations
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Globe,
  Database,
  Mail,
  CreditCard,
  BookOpen,
  Users,
  Calendar,
  Shield,
  Cloud,
  Key,
  Link,
  TestTube
} from 'lucide-react';

const SystemIntegrations = () => {
  const [integrations, setIntegrations] = useState([]);
  const [availableIntegrations, setAvailableIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // add, edit, configure
  const [testingConnection, setTestingConnection] = useState(null);

  // Mock existing integrations
  const mockIntegrations = [
    {
      id: 'CANVAS_LMS',
      name: 'Canvas LMS',
      type: 'Learning Management System',
      description: 'Synchronize courses, enrollments, and grades with Canvas',
      category: 'academic',
      status: 'connected',
      lastSync: '2025-09-02T10:30:00Z',
      health: 'healthy',
      config: {
        apiUrl: 'https://canvas.university.edu',
        apiKey: '********',
        syncInterval: 'hourly',
        enableGradeSync: true,
        enableEnrollmentSync: true,
        enableCourseSync: true
      },
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 'STRIPE_PAYMENTS',
      name: 'Stripe',
      type: 'Payment Gateway',
      description: 'Process student payments and manage billing',
      category: 'financial',
      status: 'connected',
      lastSync: '2025-09-02T11:15:00Z',
      health: 'healthy',
      config: {
        publicKey: 'pk_live_********',
        secretKey: '********',
        webhookSecret: '********',
        currency: 'USD',
        enableRefunds: true,
        enableRecurring: true
      },
      icon: CreditCard,
      color: 'green'
    },
    {
      id: 'GOOGLE_WORKSPACE',
      name: 'Google Workspace',
      type: 'Identity Provider',
      description: 'Single sign-on and email integration',
      category: 'identity',
      status: 'connected',
      lastSync: '2025-09-02T09:45:00Z',
      health: 'healthy',
      config: {
        clientId: '********',
        clientSecret: '********',
        domain: 'university.edu',
        enableSSO: true,
        enableEmailSync: true,
        autoCreateUsers: true
      },
      icon: Mail,
      color: 'red'
    },
    {
      id: 'ZOOM_MEETINGS',
      name: 'Zoom',
      type: 'Video Conferencing',
      description: 'Create and manage virtual classrooms',
      category: 'communication',
      status: 'error',
      lastSync: '2025-09-01T14:20:00Z',
      health: 'error',
      config: {
        apiKey: '********',
        apiSecret: '********',
        accountId: 'university-zoom-account',
        enableRecording: true,
        enableWaitingRoom: true,
        maxDuration: 120
      },
      icon: Users,
      color: 'blue'
    },
    {
      id: 'SLACK_NOTIFICATIONS',
      name: 'Slack',
      type: 'Communication Platform',
      description: 'Send notifications to Slack channels',
      category: 'communication',
      status: 'connected',
      lastSync: '2025-09-02T12:00:00Z',
      health: 'healthy',
      config: {
        webhookUrl: '********',
        defaultChannel: '#general',
        enableAlerts: true,
        enableDigest: true,
        alertThreshold: 'warning'
      },
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  // Mock available integrations
  const mockAvailableIntegrations = [
    {
      id: 'BLACKBOARD_LMS',
      name: 'Blackboard Learn',
      type: 'Learning Management System',
      description: 'Alternative LMS integration option',
      category: 'academic',
      icon: BookOpen,
      color: 'black',
      featured: true
    },
    {
      id: 'PAYPAL_PAYMENTS',
      name: 'PayPal',
      type: 'Payment Gateway',
      description: 'Alternative payment processing solution',
      category: 'financial',
      icon: CreditCard,
      color: 'blue',
      featured: false
    },
    {
      id: 'MICROSOFT_365',
      name: 'Microsoft 365',
      type: 'Identity Provider',
      description: 'Microsoft Azure AD integration',
      category: 'identity',
      icon: Cloud,
      color: 'blue',
      featured: true
    },
    {
      id: 'TEAMS_MEETINGS',
      name: 'Microsoft Teams',
      type: 'Video Conferencing',
      description: 'Microsoft Teams integration for virtual classes',
      category: 'communication',
      icon: Users,
      color: 'blue',
      featured: false
    },
    {
      id: 'SALESFORCE_CRM',
      name: 'Salesforce',
      type: 'Customer Relationship Management',
      description: 'Student relationship and recruitment management',
      category: 'crm',
      icon: Users,
      color: 'blue',
      featured: false
    },
    {
      id: 'TWILIO_SMS',
      name: 'Twilio',
      type: 'SMS Service',
      description: 'Send SMS notifications to students and staff',
      category: 'communication',
      icon: MessageSquare,
      color: 'red',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'financial', name: 'Financial', icon: CreditCard },
    { id: 'identity', name: 'Identity & Access', icon: Shield },
    { id: 'communication', name: 'Communication', icon: Users },
    { id: 'crm', name: 'CRM & Marketing', icon: Users }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadIntegrations = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setIntegrations(mockIntegrations);
        setAvailableIntegrations(mockAvailableIntegrations);
      } catch (error) {
        console.error('Failed to load integrations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIntegrations();
  }, []);

  const handleTestConnection = async (integrationId) => {
    setTestingConnection(integrationId);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate test result
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        alert('Connection test successful!');
        setIntegrations(prev => 
          prev.map(int => 
            int.id === integrationId 
              ? { ...int, health: 'healthy', status: 'connected' }
              : int
          )
        );
      } else {
        alert('Connection test failed. Please check your configuration.');
        setIntegrations(prev => 
          prev.map(int => 
            int.id === integrationId 
              ? { ...int, health: 'error', status: 'error' }
              : int
          )
        );
      }
    } catch (error) {
      alert('Connection test failed due to an error.');
    } finally {
      setTestingConnection(null);
    }
  };

  const handleSaveIntegration = async (integrationData) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalMode === 'add') {
        const newIntegration = {
          ...integrationData,
          id: `INTEGRATION_${Date.now()}`,
          status: 'disconnected',
          health: 'unknown',
          lastSync: null
        };
        setIntegrations(prev => [...prev, newIntegration]);
      } else {
        setIntegrations(prev => 
          prev.map(int => 
            int.id === selectedIntegration.id 
              ? { ...int, ...integrationData }
              : int
          )
        );
      }
      
      setShowIntegrationModal(false);
      alert('Integration saved successfully!');
    } catch (error) {
      console.error('Failed to save integration:', error);
      alert('Failed to save integration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected': return <XCircle className="h-5 w-5 text-gray-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'configuring': return <Settings className="h-5 w-5 text-yellow-500 animate-spin" />;
      default: return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'configuring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredIntegrations = integrations.filter(integration => 
    selectedCategory === 'all' || integration.category === selectedCategory
  );

  const filteredAvailableIntegrations = availableIntegrations.filter(integration => 
    selectedCategory === 'all' || integration.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">System Integrations</h2>
          <p className="text-gray-600">Connect with third-party services and manage API integrations</p>
        </div>
        
        <button
          onClick={() => {
            setModalMode('add');
            setSelectedIntegration(null);
            setShowIntegrationModal(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </button>
      </div>

      {/* Integration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Integrations</p>
              <p className="text-2xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'connected').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Issues</p>
              <p className="text-2xl font-bold text-red-600">
                {integrations.filter(i => i.status === 'error').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-2xl font-bold text-blue-600">{integrations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RefreshCw className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Sync</p>
              <p className="text-lg font-semibold text-purple-600">2 min ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Integrations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Integrations</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            
            return (
              <div key={integration.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-${integration.color}-100 mr-4`}>
                      <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          {getStatusIcon(integration.status)}
                          <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                            {integration.status}
                          </span>
                        </div>
                        
                        <div className={`text-sm ${getHealthColor(integration.health)}`}>
                          Health: {integration.health}
                        </div>
                        
                        {integration.lastSync && (
                          <div className="text-sm text-gray-500">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTestConnection(integration.id)}
                      disabled={testingConnection === integration.id}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      {testingConnection === integration.id ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="mr-2 h-4 w-4" />
                      )}
                      Test
                    </button>
                    
                    <button
                      onClick={() => {
                        setModalMode('configure');
                        setSelectedIntegration(integration);
                        setShowIntegrationModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to remove this integration?')) {
                          setIntegrations(prev => prev.filter(i => i.id !== integration.id));
                        }
                      }}
                      className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredIntegrations.length === 0 && (
          <div className="p-12 text-center">
            <Zap className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No integrations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedCategory === 'all' 
                ? 'Get started by adding your first integration.'
                : `No integrations found in the ${categories.find(c => c.id === selectedCategory)?.name} category.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Available Integrations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Integrations</h3>
          <p className="text-sm text-gray-600">Connect with these popular services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredAvailableIntegrations.map((integration) => {
            const Icon = integration.icon;
            const isAlreadyIntegrated = integrations.some(i => i.id === integration.id);
            
            return (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${integration.color}-100`}>
                    <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                  </div>
                  {integration.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                
                <h4 className="text-lg font-medium text-gray-900 mb-2">{integration.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                <p className="text-xs text-gray-500 mb-4">{integration.type}</p>
                
                <button
                  onClick={() => {
                    if (isAlreadyIntegrated) {
                      alert('This integration is already configured.');
                    } else {
                      setModalMode('add');
                      setSelectedIntegration(integration);
                      setShowIntegrationModal(true);
                    }
                  }}
                  disabled={isAlreadyIntegrated}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium ${
                    isAlreadyIntegrated
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isAlreadyIntegrated ? 'Already Added' : 'Add Integration'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Modal */}
      {showIntegrationModal && (
        <IntegrationModal
          mode={modalMode}
          integration={selectedIntegration}
          onClose={() => setShowIntegrationModal(false)}
          onSave={handleSaveIntegration}
          saving={saving}
        />
      )}
    </div>
  );
};

// Integration Modal Component
const IntegrationModal = ({ mode, integration, onClose, onSave, saving }) => {
  const [formData, setFormData] = useState({
    name: integration?.name || '',
    type: integration?.type || '',
    description: integration?.description || '',
    category: integration?.category || 'academic',
    config: integration?.config || {}
  });

  const [showSecrets, setShowSecrets] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateConfig = (key, value) => {
    setFormData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value
      }
    }));
  };

  const toggleSecretVisibility = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderConfigFields = () => {
    if (!integration) return null;

    // Render different config fields based on integration type
    switch (integration.id) {
      case 'CANVAS_LMS':
      case 'BLACKBOARD_LMS':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API URL *
              </label>
              <input
                type="url"
                value={formData.config.apiUrl || ''}
                onChange={(e) => updateConfig('apiUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://canvas.university.edu"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showSecrets.apiKey ? 'text' : 'password'}
                  value={formData.config.apiKey || ''}
                  onChange={(e) => updateConfig('apiKey', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter API key"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleSecretVisibility('apiKey')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showSecrets.apiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sync Interval
              </label>
              <select
                value={formData.config.syncInterval || 'hourly'}
                onChange={(e) => updateConfig('syncInterval', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        );

      case 'STRIPE_PAYMENTS':
      case 'PAYPAL_PAYMENTS':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Public Key *
              </label>
              <input
                type="text"
                value={formData.config.publicKey || ''}
                onChange={(e) => updateConfig('publicKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="pk_live_..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key *
              </label>
              <div className="relative">
                <input
                  type={showSecrets.secretKey ? 'text' : 'password'}
                  value={formData.config.secretKey || ''}
                  onChange={(e) => updateConfig('secretKey', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="sk_live_..."
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleSecretVisibility('secretKey')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showSecrets.secretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.config.currency || 'USD'}
                onChange={(e) => updateConfig('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Endpoint *
              </label>
              <input
                type="url"
                value={formData.config.apiEndpoint || ''}
                onChange={(e) => updateConfig('apiEndpoint', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://api.service.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showSecrets.apiKey ? 'text' : 'password'}
                  value={formData.config.apiKey || ''}
                  onChange={(e) => updateConfig('apiKey', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter API key"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleSecretVisibility('apiKey')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showSecrets.apiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add Integration' : 
             mode === 'edit' ? 'Edit Integration' : 'Configure Integration'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Integration Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={mode === 'configure'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={mode === 'configure'}
              >
                <option value="academic">Academic</option>
                <option value="financial">Financial</option>
                <option value="identity">Identity & Access</option>
                <option value="communication">Communication</option>
                <option value="crm">CRM & Marketing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={mode === 'configure'}
            />
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Configuration</h4>
            {renderConfigFields()}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <div className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  {mode === 'add' ? 'Add' : 'Save'} Integration
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemIntegrations;