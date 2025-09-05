// src/components/settings/NotificationSettings.jsx - System Notification Management
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Phone, 
  Settings, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  Trash2,
  Send,
  Clock,
  Users,
  BookOpen,
  DollarSign,
  Building,
  Shield,
  GraduationCap
} from 'lucide-react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({});
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock notification settings
  const mockSettings = {
    general: {
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      enablePushNotifications: true,
      enableInAppNotifications: true,
      defaultFromEmail: 'noreply@metropolitanuniversity.edu',
      defaultFromName: 'Metropolitan University',
      smtpServer: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'notifications@metropolitanuniversity.edu',
      smtpPassword: '********',
      smsProvider: 'twilio',
      smsApiKey: '********',
      quietHours: {
        enabled: true,
        startTime: '22:00',
        endTime: '07:00'
      }
    },
    categories: {
      academic: {
        enabled: true,
        email: true,
        sms: false,
        push: true,
        inApp: true,
        description: 'Course updates, grades, assignments'
      },
      financial: {
        enabled: true,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        description: 'Payment reminders, fee updates'
      },
      administrative: {
        enabled: true,
        email: true,
        sms: false,
        push: false,
        inApp: true,
        description: 'System updates, maintenance'
      },
      emergency: {
        enabled: true,
        email: true,
        sms: true,
        push: true,
        inApp: true,
        description: 'Emergency alerts and critical updates'
      },
      graduation: {
        enabled: true,
        email: true,
        sms: false,
        push: true,
        inApp: true,
        description: 'Graduation requirements, ceremonies'
      }
    },
    preferences: {
      batchNotifications: true,
      digestFrequency: 'daily', // daily, weekly, immediate
      maxNotificationsPerHour: 10,
      enableReadReceipts: true,
      enableClickTracking: true,
      allowUnsubscribe: true,
      retryFailedNotifications: true,
      maxRetryAttempts: 3
    }
  };

  // Mock email templates
  const mockTemplates = [
    {
      id: 'WELCOME_STUDENT',
      name: 'Welcome Student',
      category: 'academic',
      type: 'email',
      subject: 'Welcome to {{university_name}}!',
      content: `Dear {{student_name}},

Welcome to {{university_name}}! We're excited to have you join our academic community.

Your student ID is: {{student_id}}
Your login credentials have been sent to this email address.

Next steps:
1. Log into the student portal
2. Review your course schedule
3. Complete registration requirements

If you have any questions, please contact our support team.

Best regards,
{{university_name}} Team`,
      variables: ['student_name', 'student_id', 'university_name'],
      lastModified: '2025-08-15',
      status: 'active'
    },
    {
      id: 'PAYMENT_REMINDER',
      name: 'Payment Reminder',
      category: 'financial',
      type: 'email',
      subject: 'Payment Reminder - {{amount}} Due',
      content: `Dear {{student_name}},

This is a reminder that your payment of {{amount}} is due on {{due_date}}.

Amount Due: {{amount}}
Due Date: {{due_date}}
Description: {{description}}

To make a payment, please log into your student portal and navigate to the billing section.

Thank you,
{{university_name}} Financial Services`,
      variables: ['student_name', 'amount', 'due_date', 'description', 'university_name'],
      lastModified: '2025-08-10',
      status: 'active'
    },
    {
      id: 'GRADE_POSTED',
      name: 'Grade Posted',
      category: 'academic',
      type: 'email',
      subject: 'New Grade Posted for {{course_name}}',
      content: `Dear {{student_name}},

A new grade has been posted for {{course_name}}.

Assignment: {{assignment_name}}
Grade: {{grade}}
Points: {{points_earned}}/{{points_total}}

You can view detailed feedback in the student portal.

Best regards,
{{instructor_name}}`,
      variables: ['student_name', 'course_name', 'assignment_name', 'grade', 'points_earned', 'points_total', 'instructor_name'],
      lastModified: '2025-08-12',
      status: 'active'
    }
  ];

  const tabs = [
    {
      id: 'general',
      name: 'General Settings',
      icon: Settings,
      description: 'Basic notification configuration'
    },
    {
      id: 'categories',
      name: 'Notification Categories',
      icon: Bell,
      description: 'Configure notifications by category'
    },
    {
      id: 'templates',
      name: 'Email Templates',
      icon: Mail,
      description: 'Manage notification templates'
    },
    {
      id: 'preferences',
      name: 'Advanced Preferences',
      icon: Settings,
      description: 'Advanced notification settings'
    }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSettings(mockSettings);
        setTemplates(mockTemplates);
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Notification settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateCategorySetting = (category, type, value) => {
    setSettings(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          [type]: value
        }
      }
    }));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return <BookOpen className="h-5 w-5" />;
      case 'financial': return <DollarSign className="h-5 w-5" />;
      case 'administrative': return <Building className="h-5 w-5" />;
      case 'emergency': return <AlertTriangle className="h-5 w-5" />;
      case 'graduation': return <GraduationCap className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'financial': return 'text-green-600 bg-green-100';
      case 'administrative': return 'text-gray-600 bg-gray-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      case 'graduation': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Notification Channels</h4>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h5 className="text-sm font-medium text-gray-900">Email Notifications</h5>
              <p className="text-sm text-gray-600">Send notifications via email</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.enableEmailNotifications}
              onChange={(e) => updateSetting('general', 'enableEmailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h5 className="text-sm font-medium text-gray-900">SMS Notifications</h5>
              <p className="text-sm text-gray-600">Send notifications via SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.enableSMSNotifications}
              onChange={(e) => updateSetting('general', 'enableSMSNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-purple-600 mr-3" />
            <div>
              <h5 className="text-sm font-medium text-gray-900">Push Notifications</h5>
              <p className="text-sm text-gray-600">Send browser push notifications</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.enablePushNotifications}
              onChange={(e) => updateSetting('general', 'enablePushNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Email Configuration</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default From Email
            </label>
            <input
              type="email"
              value={settings.general.defaultFromEmail}
              onChange={(e) => updateSetting('general', 'defaultFromEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default From Name
            </label>
            <input
              type="text"
              value={settings.general.defaultFromName}
              onChange={(e) => updateSetting('general', 'defaultFromName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Server
            </label>
            <input
              type="text"
              value={settings.general.smtpServer}
              onChange={(e) => updateSetting('general', 'smtpServer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Port
            </label>
            <input
              type="number"
              value={settings.general.smtpPort}
              onChange={(e) => updateSetting('general', 'smtpPort', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Quiet Hours</h4>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Enable Quiet Hours</h5>
            <p className="text-sm text-gray-600">Suppress non-urgent notifications during specified hours</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.quietHours.enabled}
              onChange={(e) => updateSetting('general', 'quietHours', {...settings.general.quietHours, enabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {settings.general.quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={settings.general.quietHours.startTime}
                onChange={(e) => updateSetting('general', 'quietHours', {...settings.general.quietHours, startTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={settings.general.quietHours.endTime}
                onChange={(e) => updateSetting('general', 'quietHours', {...settings.general.quietHours, endTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCategorySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Categories</h4>
        <p className="text-sm text-gray-600 mb-6">Configure how different types of notifications are delivered.</p>
      </div>
      
      <div className="space-y-4">
        {Object.entries(settings.categories).map(([categoryKey, category]) => (
          <div key={categoryKey} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${getCategoryColor(categoryKey)} mr-4`}>
                  {getCategoryIcon(categoryKey)}
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900 capitalize">{categoryKey}</h5>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={category.enabled}
                  onChange={(e) => updateCategorySetting(categoryKey, 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {category.enabled && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${categoryKey}-inApp`}
                    checked={category.inApp}
                    onChange={(e) => updateCategorySetting(categoryKey, 'inApp', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`${categoryKey}-inApp`} className="ml-2 text-sm text-gray-700">In-App</label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplateSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-medium text-gray-900">Email Templates</h4>
          <p className="text-sm text-gray-600">Manage notification email templates</p>
        </div>
        <button
          onClick={() => {
            setSelectedTemplate(null);
            setShowTemplateModal(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Template
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {templates.map((template) => (
              <tr key={template.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.subject}</div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`p-1 rounded ${getCategoryColor(template.category)} mr-2`}>
                      {getCategoryIcon(template.category)}
                    </div>
                    <span className="text-sm text-gray-900 capitalize">{template.category}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {template.type}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(template.lastModified).toLocaleDateString()}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowTemplateModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowTemplateModal(true);
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this template?')) {
                          setTemplates(prev => prev.filter(t => t.id !== template.id));
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
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
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Advanced Preferences</h4>
        <p className="text-sm text-gray-600 mb-6">Configure advanced notification behavior and delivery preferences.</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Batch Notifications</h5>
            <p className="text-sm text-gray-600">Group similar notifications together</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.preferences.batchNotifications}
              onChange={(e) => updateSetting('preferences', 'batchNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digest Frequency
            </label>
            <select
              value={settings.preferences.digestFrequency}
              onChange={(e) => updateSetting('preferences', 'digestFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Notifications Per Hour
            </label>
            <input
              type="number"
              value={settings.preferences.maxNotificationsPerHour}
              onChange={(e) => updateSetting('preferences', 'maxNotificationsPerHour', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Enable Read Receipts</h5>
              <p className="text-sm text-gray-600">Track when notifications are read</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.preferences.enableReadReceipts}
                onChange={(e) => updateSetting('preferences', 'enableReadReceipts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Enable Click Tracking</h5>
              <p className="text-sm text-gray-600">Track clicks on notification links</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.preferences.enableClickTracking}
                onChange={(e) => updateSetting('preferences', 'enableClickTracking', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Allow Unsubscribe</h5>
              <p className="text-sm text-gray-600">Include unsubscribe links in emails</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.preferences.allowUnsubscribe}
                onChange={(e) => updateSetting('preferences', 'allowUnsubscribe', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Retry Failed Notifications</h5>
              <p className="text-sm text-gray-600">Automatically retry failed notification delivery</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.preferences.retryFailedNotifications}
                onChange={(e) => updateSetting('preferences', 'retryFailedNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        {settings.preferences.retryFailedNotifications && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Retry Attempts
            </label>
            <input
              type="number"
              value={settings.preferences.maxRetryAttempts}
              onChange={(e) => updateSetting('preferences', 'maxRetryAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="10"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'categories':
        return renderCategorySettings();
      case 'templates':
        return renderTemplateSettings();
      case 'preferences':
        return renderPreferences();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          <p className="text-gray-600">Configure system notifications and communication preferences</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Send className="mr-2 h-4 w-4" />
            Test Notification
          </button>
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

      {/* Template Modal */}
      {showTemplateModal && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setShowTemplateModal(false)}
          onSave={(templateData) => {
            if (selectedTemplate) {
              setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? {...t, ...templateData} : t));
            } else {
              const newTemplate = {
                ...templateData,
                id: `TEMPLATE_${Date.now()}`,
                lastModified: new Date().toISOString().split('T')[0],
                status: 'active'
              };
              setTemplates(prev => [...prev, newTemplate]);
            }
            setShowTemplateModal(false);
          }}
        />
      )}
    </div>
  );
};

// Template Modal Component
const TemplateModal = ({ template, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    category: template?.category || 'academic',
    type: template?.type || 'email',
    subject: template?.subject || '',
    content: template?.content || '',
    variables: template?.variables || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {template ? 'Edit Template' : 'Add Template'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
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
              >
                <option value="academic">Academic</option>
                <option value="financial">Financial</option>
                <option value="administrative">Administrative</option>
                <option value="emergency">Emergency</option>
                <option value="graduation">Graduation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Line *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Use {{variable_name}} for dynamic content"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Use {{variable_name}} for dynamic content"
              required
            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {template ? 'Update' : 'Create'} Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettings;