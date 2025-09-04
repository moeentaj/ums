// src/components/financial/BudgetManagement.jsx - Budget Tracking Component
import React, { useState, useEffect } from 'react';
import { mockData } from '../../data/mockData';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download
} from 'lucide-react';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-2025');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const loadBudgets = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBudgets(mockData.financial.budgets);
      setLoading(false);
    };
    loadBudgets();
  }, []);

  const getTotalBudget = () => budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const getTotalSpent = () => budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const getTotalRemaining = () => budgets.reduce((sum, budget) => sum + budget.remaining, 0);

  const getUtilizationColor = (rate) => {
    if (rate > 90) return { bg: 'bg-red-100', text: 'text-red-800', bar: 'bg-red-600' };
    if (rate > 70) return { bg: 'bg-yellow-100', text: 'text-yellow-800', bar: 'bg-yellow-600' };
    return { bg: 'bg-green-100', text: 'text-green-800', bar: 'bg-green-600' };
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
          <p className="text-sm text-gray-600">Track departmental budgets and expenses</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024-2025">Academic Year 2024-2025</option>
            <option value="2023-2024">Academic Year 2023-2024</option>
            <option value="2022-2023">Academic Year 2022-2023</option>
          </select>
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 text-sm rounded-l-lg ${
                viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 text-sm rounded-r-lg ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Table
            </button>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Budget
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Allocated</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalBudget().toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalSpent().toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">
                  {((getTotalSpent() / getTotalBudget()) * 100).toFixed(1)}% of budget
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Remaining</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalRemaining().toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {((getTotalRemaining() / getTotalBudget()) * 100).toFixed(1)}% available
                </span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgets.map((budget) => {
            const utilizationRate = (budget.spent / budget.allocated) * 100;
            const colors = getUtilizationColor(utilizationRate);
            
            return (
              <div key={budget.department} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{budget.department}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-sm font-medium ${colors.bg} ${colors.text}`}>
                      {utilizationRate.toFixed(1)}% used
                    </div>
                    {utilizationRate > 85 && (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" title="Budget Alert" />
                    )}
                  </div>
                </div>

                {/* Budget Overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-gray-900">${budget.allocated.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Allocated</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-blue-600">${budget.spent.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Spent</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-green-600">${budget.remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Remaining</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Budget Utilization</span>
                    <span>{utilizationRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${colors.bar}`}
                      style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Expense Categories</h4>
                  <div className="space-y-2">
                    {Object.entries(budget.categories).map(([category, amount]) => {
                      const categoryPercentage = (amount / budget.allocated) * 100;
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-700 capitalize">{category}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-gray-900">
                              ${amount.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({categoryPercentage.toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium">
                    <Download className="h-4 w-4 mr-1" />
                    Export Report
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Table View
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {budgets.map((budget) => {
                  const utilizationRate = (budget.spent / budget.allocated) * 100;
                  const colors = getUtilizationColor(utilizationRate);
                  
                  return (
                    <tr key={budget.department} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-900">{budget.department}</div>
                          {utilizationRate > 85 && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${budget.allocated.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${budget.spent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${budget.remaining.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className={`h-2 rounded-full ${colors.bar}`}
                              style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${colors.text}`}>
                            {utilizationRate.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Budget Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New Budget</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
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
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter department name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget Allocation ($) *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Breakdown
                  </label>
                  <div className="space-y-3">
                    {['Personnel', 'Equipment', 'Supplies', 'Operations'].map((category) => (
                      <div key={category} className="flex items-center space-x-3">
                        <label className="w-24 text-sm text-gray-700">{category}</label>
                        <input
                          type="number"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Budget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;