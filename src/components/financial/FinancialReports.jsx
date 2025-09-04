// src/components/financial/FinancialReports.jsx - Report Generation Component
import React, { useState, useEffect } from 'react';
import {
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  BarChart3,
  Wallet,
  Eye,
  Download,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

const FinancialReports = () => {
  const [reports, setReports] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock report data
      setReports([
        {
          id: 'revenue-report',
          name: 'Revenue Report',
          description: 'Comprehensive revenue analysis by source and time period',
          type: 'Revenue',
          lastGenerated: '2025-09-01',
          icon: TrendingUp,
          color: 'green',
          frequency: 'Monthly',
          fileSize: '2.1 MB'
        },
        {
          id: 'expense-report',
          name: 'Expense Report', 
          description: 'Detailed breakdown of expenses by department and category',
          type: 'Expenses',
          lastGenerated: '2025-09-01',
          icon: TrendingDown,
          color: 'red',
          frequency: 'Monthly',
          fileSize: '1.8 MB'
        },
        {
          id: 'student-accounts',
          name: 'Student Accounts Report',
          description: 'Individual student account balances and payment history',
          type: 'Accounts',
          lastGenerated: '2025-08-31',
          icon: Users,
          color: 'blue',
          frequency: 'Weekly',
          fileSize: '3.2 MB'
        },
        {
          id: 'scholarship-report',
          name: 'Scholarship Report',
          description: 'Analysis of scholarship distribution and effectiveness',
          type: 'Scholarships',
          lastGenerated: '2025-08-30',
          icon: Award,
          color: 'purple',
          frequency: 'Quarterly',
          fileSize: '1.5 MB'
        },
        {
          id: 'budget-variance',
          name: 'Budget Variance Report',
          description: 'Comparison of actual vs budgeted amounts by department',
          type: 'Budget',
          lastGenerated: '2025-08-29',
          icon: BarChart3,
          color: 'yellow',
          frequency: 'Monthly',
          fileSize: '2.7 MB'
        },
        {
          id: 'cash-flow',
          name: 'Cash Flow Statement',
          description: 'Monthly cash flow analysis and projections',
          type: 'Cash Flow',
          lastGenerated: '2025-08-28',
          icon: Wallet,
          color: 'indigo',
          frequency: 'Monthly',
          fileSize: '1.9 MB'
        }
      ]);

      setRecentFiles([
        { 
          id: 1,
          name: 'Monthly Revenue Report - August 2025', 
          type: 'PDF', 
          size: '2.4 MB', 
          date: '2025-09-01',
          status: 'completed'
        },
        { 
          id: 2,
          name: 'Student Accounts Summary - Q2 2025', 
          type: 'Excel', 
          size: '1.8 MB', 
          date: '2025-08-30',
          status: 'completed'
        },
        { 
          id: 3,
          name: 'Budget Variance Analysis - August', 
          type: 'PDF', 
          size: '3.1 MB', 
          date: '2025-08-29',
          status: 'completed'
        },
        { 
          id: 4,
          name: 'Scholarship Distribution Report', 
          type: 'PDF', 
          size: '1.2 MB', 
          date: '2025-08-28',
          status: 'processing'
        },
        { 
          id: 5,
          name: 'Cash Flow Analysis - July 2025', 
          type: 'Excel', 
          size: '2.8 MB', 
          date: '2025-08-27',
          status: 'completed'
        }
      ]);
      
      setLoading(false);
    };
    loadReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.type === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  const handleGenerateReport = (reportId) => {
    // Mock report generation
    console.log(`Generating report: ${reportId}`);
    // In a real app, this would trigger the report generation API
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Financial Reports</h2>
          <p className="text-sm text-gray-600">Generate and access financial reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current Period</option>
            <option value="previous">Previous Period</option>
            <option value="ytd">Year to Date</option>
            <option value="custom">Custom Range</option>
          </select>
          <button 
            onClick={() => setShowCustomReportModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg shadow-sm border p-4">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="Revenue">Revenue</option>
          <option value="Expenses">Expenses</option>
          <option value="Accounts">Accounts</option>
          <option value="Scholarships">Scholarships</option>
          <option value="Budget">Budget</option>
          <option value="Cash Flow">Cash Flow</option>
        </select>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          const colorClasses = getColorClasses(report.color);
          
          return (
            <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${report.color}-600`} />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${colorClasses}`}>
                  {report.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.description}</p>
              
              <div className="space-y-2 mb-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Last generated:</span>
                  <span>{new Date(report.lastGenerated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span>{report.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>File size:</span>
                  <span>{report.fileSize}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleGenerateReport(report.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                >
                  Generate
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentFiles.map((file) => (
            <div key={file.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">{file.type} • {file.size}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{new Date(file.date).toLocaleDateString()}</div>
                    <div className={`text-xs ${
                      file.status === 'completed' ? 'text-green-600' : 
                      file.status === 'processing' ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      {file.status}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Report Modal */}
      {showCustomReportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Custom Report</h3>
                <button
                  onClick={() => setShowCustomReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter report name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">Select type</option>
                      <option value="financial-summary">Financial Summary</option>
                      <option value="revenue-analysis">Revenue Analysis</option>
                      <option value="expense-breakdown">Expense Breakdown</option>
                      <option value="budget-comparison">Budget Comparison</option>
                      <option value="student-accounts">Student Accounts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Include Sections
                  </label>
                  <div className="space-y-2">
                    {['Revenue Summary', 'Expense Breakdown', 'Budget Analysis', 'Payment History', 'Outstanding Balances'].map((section) => (
                      <label key={section} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700">{section}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Filter
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Departments</option>
                    <option value="academic">Academic Affairs</option>
                    <option value="admin">Administration</option>
                    <option value="student">Student Services</option>
                    <option value="facilities">Facilities</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCustomReportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReports;