// src/components/infrastructure/AIRoomAllocation.jsx - AI-Powered Room Allocation
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Brain, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Zap,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Download,
  Play
} from 'lucide-react';

const AIRoomAllocation = () => {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [optimizationMetrics, setOptimizationMetrics] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [aiMode, setAiMode] = useState('optimization'); // optimization, prediction, analysis

  // Mock AI recommendations
  const mockRecommendations = [
    {
      id: 1,
      type: 'optimization',
      title: 'Optimize Computer Lab 1 Schedule',
      description: 'Move Programming Fundamentals to Computer Lab 2 to reduce conflicts',
      impact: 'High',
      savings: '15% efficiency gain',
      confidence: 92,
      affected_classes: ['CS101', 'CS201'],
      suggested_action: 'Reschedule CS101 from 10:00 AM to 2:00 PM in Lab 2',
      reasoning: 'Lab 1 has higher utilization conflicts during morning hours'
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Predicted High Demand Period',
      description: 'Expected 40% increase in room bookings next week',
      impact: 'Medium',
      savings: 'Prevent 8 scheduling conflicts',
      confidence: 87,
      affected_classes: ['Multiple'],
      suggested_action: 'Pre-allocate backup rooms for high-demand timeslots',
      reasoning: 'Historical data shows similar patterns during exam preparation'
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Maintenance Window Optimization',
      description: 'Schedule Seminar Room B maintenance during low-usage period',
      impact: 'Low',
      savings: 'Minimize disruption',
      confidence: 95,
      affected_classes: ['None'],
      suggested_action: 'Schedule maintenance on Friday 6:00 PM - 8:00 PM',
      reasoning: 'Room has 0% utilization during suggested timeframe'
    }
  ];

  const mockConflicts = [
    {
      id: 1,
      severity: 'high',
      time: '10:00 AM - 12:00 PM',
      date: '2025-09-05',
      room: 'Main Hall A',
      conflict: 'Double booking',
      classes: ['Physics 101 (60 students)', 'Chemistry 201 (45 students)'],
      suggested_solution: 'Move Chemistry 201 to Science Lab B'
    },
    {
      id: 2,
      severity: 'medium',
      time: '2:00 PM - 4:00 PM',
      date: '2025-09-06',
      room: 'Computer Lab 1',
      conflict: 'Capacity overflow',
      classes: ['Programming Workshop (50 students)'],
      suggested_solution: 'Split session between Lab 1 and Lab 2'
    }
  ];

  const mockMetrics = {
    overall_efficiency: 87,
    room_utilization: 92,
    conflict_reduction: 34,
    student_satisfaction: 4.2,
    energy_savings: 12,
    cost_optimization: 8.5,
    predictions_accuracy: 89,
    automated_decisions: 156
  };

  useEffect(() => {
    const loadAIData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRecommendations(mockRecommendations);
        setConflicts(mockConflicts);
        setOptimizationMetrics(mockMetrics);
      } catch (error) {
        console.error('Failed to load AI data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAIData();
  }, [aiMode, selectedTimeframe]);

  const runOptimization = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate new recommendations
      setRecommendations([...mockRecommendations]);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading && !recommendations.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">AI is analyzing room allocation patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Room Allocation</h2>
              <p className="text-gray-600">Smart room assignment and optimization system</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 lg:mt-0 flex flex-wrap items-center gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>

          <select
            value={aiMode}
            onChange={(e) => setAiMode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="optimization">Optimization</option>
            <option value="prediction">Prediction</option>
            <option value="analysis">Analysis</option>
          </select>

          <button
            onClick={runOptimization}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Play className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Run AI Analysis
          </button>
        </div>
      </div>

      {/* AI Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Overall Efficiency</p>
              <p className="text-3xl font-bold">{optimizationMetrics.overall_efficiency}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-200" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-100">+5% from last week</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Room Utilization</p>
              <p className="text-3xl font-bold">{optimizationMetrics.room_utilization}%</p>
            </div>
            <Target className="h-8 w-8 text-blue-200" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-100">Optimal range achieved</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Conflicts Resolved</p>
              <p className="text-3xl font-bold">{optimizationMetrics.conflict_reduction}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-100">This month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Predictions Accuracy</p>
              <p className="text-3xl font-bold">{optimizationMetrics.predictions_accuracy}%</p>
            </div>
            <Zap className="h-8 w-8 text-orange-200" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-orange-100">Last 30 predictions</span>
          </div>
        </div>
      </div>

      {/* Active Conflicts Alert */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                {conflicts.length} Active Scheduling Conflicts Detected
              </h3>
              <p className="mt-1 text-sm text-red-700">
                AI has identified conflicts that need immediate attention.
              </p>
              <button className="mt-2 text-sm text-red-800 underline hover:text-red-900">
                View Details →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="h-5 w-5 text-purple-600 mr-2" />
              AI Recommendations
            </h3>
            <span className="text-sm text-gray-500">{recommendations.length} active recommendations</span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(rec.impact)}`}>
                        {rec.impact} Impact
                      </span>
                      <span className="text-xs text-gray-500">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">Suggested Action:</p>
                      <p className="text-sm text-gray-700">{rec.suggested_action}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 font-medium">{rec.savings}</span>
                      <span className="text-gray-500">Affects: {rec.affected_classes.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                      Apply
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Dismiss
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">AI Reasoning:</span> {rec.reasoning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conflict Resolution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            Scheduling Conflicts
          </h3>
        </div>

        <div className="p-6">
          {conflicts.length > 0 ? (
            <div className="space-y-4">
              {conflicts.map((conflict) => (
                <div key={conflict.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(conflict.severity)}`}>
                          {conflict.severity.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-gray-900">{conflict.room}</span>
                        <span className="text-sm text-gray-600">{conflict.time}</span>
                      </div>
                      
                      <p className="text-sm text-red-800 font-medium mb-2">{conflict.conflict}</p>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-1">Affected Classes:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {conflict.classes.map((cls, index) => (
                            <li key={index}>{cls}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded p-3 border border-green-200">
                        <p className="text-xs text-gray-600 mb-1">AI Suggested Solution:</p>
                        <p className="text-sm text-green-800">{conflict.suggested_solution}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200">
                        Auto-Resolve
                      </button>
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                        Manual
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Conflicts</h3>
              <p className="mt-1 text-sm text-gray-500">
                AI has successfully optimized all room allocations.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Room Utilization Trends</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { room: 'Main Hall A', utilization: 95, trend: '+5%' },
                { room: 'Computer Lab 1', utilization: 87, trend: '+12%' },
                { room: 'Seminar Room B', utilization: 65, trend: '-8%' },
                { room: 'Chemistry Lab', utilization: 78, trend: '+3%' }
              ].map((room) => (
                <div key={room.room} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{room.room}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${room.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{room.utilization}%</span>
                    <span className={`text-sm font-medium w-12 ${
                      room.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {room.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">AI Performance Metrics</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Automated Decisions</span>
                <span className="text-lg font-bold text-gray-900">{optimizationMetrics.automated_decisions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Energy Savings</span>
                <span className="text-lg font-bold text-green-600">{optimizationMetrics.energy_savings}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cost Optimization</span>
                <span className="text-lg font-bold text-blue-600">${optimizationMetrics.cost_optimization}K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Student Satisfaction</span>
                <span className="text-lg font-bold text-purple-600">{optimizationMetrics.student_satisfaction}/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              AI Configuration
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Advanced Settings
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Optimization Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="utilization">Maximize Utilization</option>
                <option value="satisfaction">Student Satisfaction</option>
                <option value="efficiency">Energy Efficiency</option>
                <option value="cost">Cost Reduction</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prediction Horizon
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                <option value="1day">1 Day</option>
                <option value="1week">1 Week</option>
                <option value="1month">1 Month</option>
                <option value="1semester">1 Semester</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-Resolution
              </label>
              <div className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Enable automatic conflict resolution</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">AI Learning Status</h4>
                <p className="text-sm text-gray-600">System is continuously learning from usage patterns</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">Active Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
          <Brain className="h-8 w-8 text-purple-600 mr-3" />
          <div className="text-left">
            <p className="font-semibold text-purple-900">Train AI Model</p>
            <p className="text-sm text-purple-600">Update with latest data</p>
          </div>
        </button>

        <button className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
          <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
          <div className="text-left">
            <p className="font-semibold text-blue-900">Generate Report</p>
            <p className="text-sm text-blue-600">AI insights summary</p>
          </div>
        </button>

        <button className="flex items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
          <Download className="h-8 w-8 text-green-600 mr-3" />
          <div className="text-left">
            <p className="font-semibold text-green-900">Export Data</p>
            <p className="text-sm text-green-600">Download optimization results</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AIRoomAllocation;