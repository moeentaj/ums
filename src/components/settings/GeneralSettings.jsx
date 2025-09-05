// src/components/settings/GeneralSettings.jsx - Basic System Configuration
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Globe, 
  Clock, 
  MapPin, 
  Building, 
  Mail, 
  Phone, 
  Upload,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Edit,
  Image
} from 'lucide-react';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('university');

  // Mock general settings data
  const mockSettings = {
    university: {
      name: 'Metropolitan University',
      shortName: 'MetroU',
      establishedYear: 1985,
      motto: 'Excellence in Education and Innovation',
      description: 'A leading institution dedicated to providing quality education and fostering innovation in research and development.',
      website: 'https://www.metropolitanuniversity.edu',
      email: 'info@metropolitanuniversity.edu',
      phone: '+1-555-123-4567',
      fax: '+1-555-123-4568',
      logo: '/university-logo.png',
      address: {
        street: '123 University Avenue',
        city: 'Metropolitan City',
        state: 'State',
        zipCode: '12345',
        country: 'United States'
      }
    },
    system: {
      systemName: 'University Management System',
      version: '2.1.0',
      environment: 'production',
      maintenanceMode: false,
      debugMode: false,
      sessionTimeout: 480, // minutes
      maxFileUploadSize: 50, // MB
      allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'gif'],
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'es', 'fr', 'de', 'zh'],
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12',
      currency: 'USD',
      currencySymbol: '$'
    },
    regional: {
      timezone: 'America/New_York',
      locale: 'en-US',
      firstDayOfWeek: 0, // 0 = Sunday, 1 = Monday
      academicYearStart: 'August',
      gradeScale: 'letter', // letter, percentage, gpa
      weightingSystem: 'percentage'
    },
    security: {
      forceHttps: true,
      enableCaptcha: true,
      allowRegistration: false,
      requireEmailVerification: true,
      passwordComplexity: 'high',
      maxLoginAttempts: 5,
      lockoutDuration: 15, // minutes
      enableTwoFactor: false
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      logo: '/university-logo.png',
      favicon: '/favicon.ico',
      loginBackground: '/login-bg.jpg',
      showWelcomeMessage: true,
      welcomeMessage: 'Welcome to Metropolitan University Management System',
      footerText: '© 2025 Metropolitan University. All rights reserved.'
    }
  };

  const sections = [
    {
      id: 'university',
      name: 'University Information',
      icon: Building,
      description: 'Basic university details and contact information'
    },
    {
      id: 'system',
      name: 'System Configuration',
      icon: Settings,
      description: 'Core system settings and preferences'
    },
    {
      id: 'regional',
      name: 'Regional & Localization',
      icon: Globe,
      description: 'Language, timezone, and regional settings'
    },
    {
      id: 'security',
      name: 'Security Preferences',
      icon: Settings,
      description: 'Basic security and access settings'
    },
    {
      id: 'appearance',
      name: 'Appearance & Branding',
      icon: Image,
      description: 'Visual customization and branding'
    }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSettings(mockSettings);
      } catch (error) {
        console.error('Failed to load general settings:', error);
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
      // Save settings logic would go here
      alert('General settings saved successfully!');
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

  const updateNestedSetting = (section, subsection, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderUniversitySection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University Name *
          </label>
          <input
            type="text"
            value={settings.university.name}
            onChange={(e) => updateSetting('university', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Name *
          </label>
          <input
            type="text"
            value={settings.university.shortName}
            onChange={(e) => updateSetting('university', 'shortName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <input
            type="number"
            value={settings.university.establishedYear}
            onChange={(e) => updateSetting('university', 'establishedYear', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={settings.university.website}
            onChange={(e) => updateSetting('university', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University Motto
        </label>
        <input
          type="text"
          value={settings.university.motto}
          onChange={(e) => updateSetting('university', 'motto', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={settings.university.description}
          onChange={(e) => updateSetting('university', 'description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={settings.university.email}
            onChange={(e) => updateSetting('university', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={settings.university.phone}
            onChange={(e) => updateSetting('university', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* Address Section */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={settings.university.address.street}
              onChange={(e) => updateNestedSetting('university', 'address', 'street', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={settings.university.address.city}
              onChange={(e) => updateNestedSetting('university', 'address', 'city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province
            </label>
            <input
              type="text"
              value={settings.university.address.state}
              onChange={(e) => updateNestedSetting('university', 'address', 'state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              value={settings.university.address.zipCode}
              onChange={(e) => updateNestedSetting('university', 'address', 'zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={settings.university.address.country}
              onChange={(e) => updateNestedSetting('university', 'address', 'country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Name
          </label>
          <input
            type="text"
            value={settings.system.systemName}
            onChange={(e) => updateSetting('system', 'systemName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Version
          </label>
          <input
            type="text"
            value={settings.system.version}
            onChange={(e) => updateSetting('system', 'version', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Environment
          </label>
          <select
            value={settings.system.environment}
            onChange={(e) => updateSetting('system', 'environment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.system.sessionTimeout}
            onChange={(e) => updateSetting('system', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max File Upload Size (MB)
          </label>
          <input
            type="number"
            value={settings.system.maxFileUploadSize}
            onChange={(e) => updateSetting('system', 'maxFileUploadSize', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Language
          </label>
          <select
            value={settings.system.defaultLanguage}
            onChange={(e) => updateSetting('system', 'defaultLanguage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">System Toggles</h4>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Maintenance Mode</h5>
            <p className="text-sm text-gray-600">Put system in maintenance mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.maintenanceMode}
              onChange={(e) => updateSetting('system', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h5 className="text-sm font-medium text-gray-900">Debug Mode</h5>
            <p className="text-sm text-gray-600">Enable detailed error logging</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.system.debugMode}
              onChange={(e) => updateSetting('system', 'debugMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderRegionalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.regional.timezone}
            onChange={(e) => updateSetting('regional', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
            <option value="Europe/Paris">Central European Time (CET)</option>
            <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Locale
          </label>
          <select
            value={settings.regional.locale}
            onChange={(e) => updateSetting('regional', 'locale', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="en-US">English (United States)</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German (Germany)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Day of Week
          </label>
          <select
            value={settings.regional.firstDayOfWeek}
            onChange={(e) => updateSetting('regional', 'firstDayOfWeek', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Year Start
          </label>
          <select
            value={settings.regional.academicYearStart}
            onChange={(e) => updateSetting('regional', 'academicYearStart', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="August">August</option>
            <option value="September">September</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={settings.system.dateFormat}
            onChange={(e) => updateSetting('system', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <select
            value={settings.system.timeFormat}
            onChange={(e) => updateSetting('system', 'timeFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="12">12-hour (AM/PM)</option>
            <option value="24">24-hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'university':
        return renderUniversitySection();
      case 'system':
        return renderSystemSection();
      case 'regional':
        return renderRegionalSection();
      case 'security':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
              <p className="text-blue-800">
                Security settings are managed in the Security Module. 
                <a href="/security/settings" className="underline ml-1">Go to Security Settings</a>
              </p>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.appearance.primaryColor}
                  onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                  className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Welcome Message
              </label>
              <textarea
                rows={3}
                value={settings.appearance.welcomeMessage}
                onChange={(e) => updateSetting('appearance', 'welcomeMessage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h5 className="text-sm font-medium text-gray-900">Show Welcome Message</h5>
                <p className="text-sm text-gray-600">Display welcome message on login page</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance.showWelcomeMessage}
                  onChange={(e) => updateSetting('appearance', 'showWelcomeMessage', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        );
      default:
        return renderUniversitySection();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
          <p className="text-gray-600">Configure basic system information and preferences</p>
        </div>
        
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

      {/* Section Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {sections.find(s => s.id === activeSection)?.name}
            </h3>
            <p className="text-sm text-gray-600">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
          
          {renderCurrentSection()}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;