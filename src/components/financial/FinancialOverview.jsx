// src/components/financial/FinancialOverview.jsx - Financial Dashboard Component
import React, { useState, useEffect } from 'react';
import { mockData } from '../../data/mockData';
import {
  DollarSign,
  Award,
  FileText,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  Receipt,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const FinancialOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netIncome: 0,
    pendingPayments: 0,
    scholarshipsAwarded: 0,
    collectionRate: 0
  });

  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFinancialData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const transactions = mockData.financial.transactions;
      const scholarships = mockData.financial.scholarships;
      
      const revenue = transactions
        .filter(t => t.amount > 0 && t.status === 'Completed')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = mockData.financial.budgets
        .reduce((sum, budget) => sum + budget.spent, 0);
      
      const pending = transactions
        .filter(t => t.status === 'Pending')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const scholarshipAmount = scholarships
        .reduce((sum, s) => sum + s.amount, 0);

      setStats({
        totalRevenue: revenue,
        totalExpenses: expenses,
        netIncome: revenue - expenses,
        pendingPayments: pending,
        scholarshipsAwarded: scholarshipAmount,
        collectionRate: 94.2
      });

      // Mock monthly revenue data
      setRevenueData([
        { month: 'Jan', amount: 180000 },
        { month: 'Feb', amount: 190000 },
        { month: 'Mar', amount: 170000 },
        { month: 'Apr', amount: 200000 },
        { month: 'May', amount: 220000 },
        { month: 'Jun', amount: 195000 },
      ]);

      setLoading(false);
    };

    loadFinancialData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalExpenses.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">+5.2% from last month</span>
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
              <p className="text-sm font-medium text-gray-600">Net Income</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.netIncome.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+18.7% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.pendingPayments.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-600">23 transactions</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scholarships Awarded</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.scholarshipsAwarded.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <Award className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">12 active scholarships</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.collectionRate}%</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Above target</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>Last 2 years</option>
          </select>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {revenueData.map((data, index) => {
            const maxAmount = Math.max(...revenueData.map(d => d.amount));
            const height = (data.amount / maxAmount) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center mb-2">
                  <div className="text-xs font-medium text-gray-600">
                    ${(data.amount / 1000).toFixed(0)}k
                  </div>
                </div>
                <div 
                  className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${data.month}: $${data.amount.toLocaleString()}`}
                ></div>
                <div className="text-sm text-gray-500 mt-2">{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <Plus className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-600">Record Payment</div>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <Award className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-600">Award Scholarship</div>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-600">Generate Report</div>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
              <div className="text-center">
                <Receipt className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-600">Bulk Invoice</div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {mockData.financial.transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{transaction.studentName}</div>
                    <div className="text-sm text-gray-500">{transaction.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;