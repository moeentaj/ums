// src/pages/FinancialModule.jsx - Complete Financial Management System
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  DollarSign,
  CreditCard,
  Award,
  FileText,
  BarChart3,
  Download,
  Plus,
  AlertCircle,
  PieChart
} from 'lucide-react';

// Import financial subcomponents
import FinancialOverview from '../components/financial/FinancialOverview';
import PaymentProcessing from '../components/financial/PaymentProcessing';
import ScholarshipManagement from '../components/financial/ScholarshipManagement';
import BudgetManagement from '../components/financial/BudgetManagement';
import FinancialReports from '../components/financial/FinancialReports';

// Main Financial Module Component
const FinancialModule = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Tab configuration
  const tabs = [
    { id: 'overview', name: 'Financial Overview', icon: BarChart3, component: FinancialOverview },
    { id: 'payments', name: 'Payment Processing', icon: CreditCard, component: PaymentProcessing },
    { id: 'scholarships', name: 'Financial Aid', icon: Award, component: ScholarshipManagement },
    { id: 'budgeting', name: 'Budget Management', icon: PieChart, component: BudgetManagement },
    { id: 'reports', name: 'Financial Reports', icon: FileText, component: FinancialReports }
  ];

  // Permission check - Admin only
  if (!hasPermission('all') && user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600 mb-6">
            Financial management is restricted to administrators only.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
          <nav className="text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 font-medium">Financial Management</span>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Quick Entry
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {tabs.find(tab => tab.id === activeTab) && 
            React.createElement(tabs.find(tab => tab.id === activeTab).component)
          }
        </div>
      </div>
    </div>
  );
};

export default FinancialModule;