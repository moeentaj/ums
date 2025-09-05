// src/components/student/StudentReports.jsx - Complete Student Reports & Analytics Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Award,
  BookOpen,
  DollarSign,
  MapPin,
  Eye,
  Settings
} from 'lucide-react';

const StudentReports = () => {
  const { user, hasPermission } = useAuth();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState({});
  const [selectedReportType, setSelectedReportType] = useState('enrollment');
  const [selectedTimeframe, setSelectedTimeframe] = useState('current_semester');
  const [filters, setFilters] = useState({
    program: 'all',
    year: 'all',
    status: 'all',
    startDate: '',
    endDate: ''
  });

  // Permission check
  const canViewReports = hasPermission('reports.read') || user?.role === 'admin' || user?.role === 'faculty';

  // Load report data
  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock report data
        const data = generateReportData();
        setReportData(data);
      } catch (error) {
        console.error('Error loading report data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [selectedReportType, selectedTimeframe, filters]);

  // Generate mock report data
  const generateReportData = () => {
    const students = mockData.students;
    
    return {
      enrollment: {
        total: students.length,
        byProgram: {
          'Computer Science': students.filter(s => s.program === 'Computer Science').length,
          'Business Administration': students.filter(s => s.program === 'Business Administration').length,
          'Engineering': students.filter(s => s.program === 'Engineering').length,
          'Biology': students.filter(s => s.program === 'Biology').length,
          'Mathematics': students.filter(s => s.program === 'Mathematics').length
        },
        byYear: {
          '1st Year': students.filter(s => s.year === '1st Year').length,
          '2nd Year': students.filter(s => s.year === '2nd Year').length,
          '3rd Year': students.filter(s => s.year === '3rd Year').length,
          '4th Year': students.filter(s => s.year === '4th Year').length
        },
        byStatus: {
          'Active': students.filter(s => s.status === 'Active').length,
          'Inactive': students.filter(s => s.status === 'Inactive').length,
          'Probation': students.filter(s => s.status === 'Probation').length,
          'Graduated': students.filter(s => s.status === 'Graduated').length
        },
        trend: [
          { month: 'Jan', value: 1450 },
          { month: 'Feb', value: 1520 },
          { month: 'Mar', value: 1580 },
          { month: 'Apr', value: 1620 },
          { month: 'May', value: 1650 },
          { month: 'Jun', value: 1680 },
          { month: 'Jul', value: 1700 },
          { month: 'Aug', value: students.length }
        ]
      },
      academic: {
        averageGPA: (students.reduce((sum, s) => sum + (s.gpa || 0), 0) / students.length).toFixed(2),
        gpaDistribution: {
          'A (3.7-4.0)': students.filter(s => s.gpa >= 3.7).length,
          'B (3.0-3.6)': students.filter(s => s.gpa >= 3.0 && s.gpa < 3.7).length,
          'C (2.0-2.9)': students.filter(s => s.gpa >= 2.0 && s.gpa < 3.0).length,
          'D (1.0-1.9)': students.filter(s => s.gpa >= 1.0 && s.gpa < 2.0).length,
          'F (0.0-0.9)': students.filter(s => s.gpa < 1.0).length
        },
        honorRoll: students.filter(s => s.gpa >= 3.5).length,
        probation: students.filter(s => s.gpa < 2.0).length,
        retentionRate: 94.5,
        graduationRate: 87.2
      },
      demographics: {
        ageDistribution: {
          '18-20': Math.floor(students.length * 0.4),
          '21-23': Math.floor(students.length * 0.35),
          '24-26': Math.floor(students.length * 0.15),
          '27+': Math.floor(students.length * 0.1)
        },
        genderDistribution: {
          'Male': Math.floor(students.length * 0.52),
          'Female': Math.floor(students.length * 0.46),
          'Other': Math.floor(students.length * 0.02)
        },
        geographicDistribution: {
          'In-State': Math.floor(students.length * 0.65),
          'Out-of-State': Math.floor(students.length * 0.25),
          'International': Math.floor(students.length * 0.1)
        }
      },
      financial: {
        totalTuitionRevenue: students.length * 25000,
        scholarshipDistribution: Math.floor(students.length * 0.3),
        averageDebt: 28500,
        paymentStatus: {
          'Paid in Full': Math.floor(students.length * 0.6),
          'Payment Plan': Math.floor(students.length * 0.3),
          'Outstanding': Math.floor(students.length * 0.1)
        }
      }
    };
  };

  // Report types configuration
  const reportTypes = [
    {
      id: 'enrollment',
      name: 'Enrollment Analytics',
      description: 'Student enrollment trends and distribution',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'academic',
      name: 'Academic Performance',
      description: 'GPA trends, graduation rates, and academic standing',
      icon: GraduationCap,
      color: 'green'
    },
    {
      id: 'demographics',
      name: 'Student Demographics',
      description: 'Age, gender, and geographic distribution',
      icon: BarChart3,
      color: 'purple'
    },
    {
      id: 'financial',
      name: 'Financial Analysis',
      description: 'Tuition revenue, scholarships, and payment status',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  // Chart components
  const EnrollmentChart = ({ data }) => (
    <div className="space-y-6">
      {/* Total Enrollment Card */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Total Enrollment</h3>
            <p className="text-3xl font-bold text-blue-600">{data.total}</p>
          </div>
          <Users className="h-12 w-12 text-blue-600" />
        </div>
      </div>

      {/* Program Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Enrollment by Program</h4>
        <div className="space-y-3">
          {Object.entries(data.byProgram).map(([program, count]) => (
            <div key={program} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{program}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(count / data.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Year Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Enrollment by Year</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.byYear).map(([year, count]) => (
            <div key={year} className="text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">{year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AcademicChart = ({ data }) => (
    <div className="space-y-6">
      {/* Academic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-green-900">Average GPA</h3>
              <p className="text-2xl font-bold text-green-600">{data.averageGPA}</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900">Honor Roll</h3>
              <p className="text-2xl font-bold text-blue-600">{data.honorRoll}</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-yellow-900">At Risk</h3>
              <p className="text-2xl font-bold text-yellow-600">{data.probation}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* GPA Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">GPA Distribution</h4>
        <div className="space-y-3">
          {Object.entries(data.gpaDistribution).map(([grade, count]) => (
            <div key={grade} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{grade}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(count / reportData.enrollment?.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention & Graduation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Retention Rate</h4>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full flex items-center justify-center"
                  style={{ width: `${data.retentionRate}%` }}
                >
                  <span className="text-xs font-medium text-white">{data.retentionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Graduation Rate</h4>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-600 h-4 rounded-full flex items-center justify-center"
                  style={{ width: `${data.graduationRate}%` }}
                >
                  <span className="text-xs font-medium text-white">{data.graduationRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DemographicsChart = ({ data }) => (
    <div className="space-y-6">
      {/* Age Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Age Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(data.ageDistribution).map(([age, count]) => (
            <div key={age} className="text-center">
              <div className="bg-purple-100 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-900">{count}</p>
                <p className="text-sm text-purple-700">{age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Gender Distribution</h4>
        <div className="space-y-3">
          {Object.entries(data.genderDistribution).map(([gender, count]) => (
            <div key={gender} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{gender}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(count / reportData.enrollment?.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Geographic Distribution</h4>
        <div className="space-y-3">
          {Object.entries(data.geographicDistribution).map(([location, count]) => (
            <div key={location} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{location}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(count / reportData.enrollment?.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FinancialChart = ({ data }) => (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-yellow-900">Total Revenue</h3>
              <p className="text-xl font-bold text-yellow-600">
                ${(data.totalTuitionRevenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-green-900">Scholarships</h3>
              <p className="text-xl font-bold text-green-600">{data.scholarshipDistribution}</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-900">Avg. Debt</h3>
              <p className="text-xl font-bold text-red-600">
                ${(data.averageDebt / 1000).toFixed(0)}K
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Payment Status</h4>
        <div className="space-y-3">
          {Object.entries(data.paymentStatus).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{status}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      status === 'Paid in Full' ? 'bg-green-600' :
                      status === 'Payment Plan' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${(count / reportData.enrollment?.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render chart based on selected report type
  const renderChart = () => {
    if (!reportData[selectedReportType]) return null;

    switch (selectedReportType) {
      case 'enrollment':
        return <EnrollmentChart data={reportData.enrollment} />;
      case 'academic':
        return <AcademicChart data={reportData.academic} />;
      case 'demographics':
        return <DemographicsChart data={reportData.demographics} />;
      case 'financial':
        return <FinancialChart data={reportData.financial} />;
      default:
        return null;
    }
  };

  if (!canViewReports) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to view reports.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Reports & Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">
              Generate insights and reports on student enrollment, performance, and demographics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                // Handle export report
                console.log('Exporting report:', selectedReportType);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Report Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReportType(report.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedReportType === report.id
                    ? `border-${report.color}-500 bg-${report.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`h-6 w-6 ${
                    selectedReportType === report.id 
                      ? `text-${report.color}-600` 
                      : 'text-gray-400'
                  }`} />
                  <div>
                    <h4 className={`text-sm font-medium ${
                      selectedReportType === report.id 
                        ? `text-${report.color}-900` 
                        : 'text-gray-900'
                    }`}>
                      {report.name}
                    </h4>
                    <p className={`text-xs ${
                      selectedReportType === report.id 
                        ? `text-${report.color}-700` 
                        : 'text-gray-500'
                    }`}>
                      {report.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Report Filters</h3>
          <button
            onClick={() => {
              setFilters({
                program: 'all',
                year: 'all',
                status: 'all',
                startDate: '',
                endDate: ''
              });
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current_semester">Current Semester</option>
              <option value="academic_year">Academic Year</option>
              <option value="last_semester">Last Semester</option>
              <option value="last_year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
            <select
              value={filters.program}
              onChange={(e) => setFilters(prev => ({ ...prev, program: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Programs</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Engineering">Engineering</option>
              <option value="Biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Probation">Probation</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 800);
              }}
              className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Custom Date Range */}
        {selectedTimeframe === 'custom' && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Report Content */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {reportTypes.find(r => r.id === selectedReportType)?.name} Report
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Generated on {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-500">Generating report...</p>
            </div>
          </div>
        ) : (
          <div>
            {renderChart()}
          </div>
        )}
      </div>

      {/* Report Summary */}
      {!loading && reportData[selectedReportType] && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedReportType === 'enrollment' && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Enrollment Growth</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Enrollment has increased by 8.5% compared to last semester
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Most Popular Program</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Computer Science leads with {reportData.enrollment.byProgram['Computer Science']} students
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Year Distribution</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Balanced distribution across all year levels
                  </p>
                </div>
              </>
            )}

            {selectedReportType === 'academic' && (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Academic Excellence</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {reportData.academic.honorRoll} students on honor roll (GPA 3.5+)
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Retention Rate</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {reportData.academic.retentionRate}% student retention rate
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">At-Risk Students</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    {reportData.academic.probation} students need academic support
                  </p>
                </div>
              </>
            )}

            {selectedReportType === 'demographics' && (
              <>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Age Distribution</span>
                  </div>
                  <p className="text-sm text-purple-700 mt-1">
                    Majority of students (75%) are between 18-23 years old
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-pink-600" />
                    <span className="text-sm font-medium text-pink-900">Gender Balance</span>
                  </div>
                  <p className="text-sm text-pink-700 mt-1">
                    Nearly balanced gender distribution across campus
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-900">Geographic Reach</span>
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    Students from 35+ states and 15+ countries
                  </p>
                </div>
              </>
            )}

            {selectedReportType === 'financial' && (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Revenue Growth</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Tuition revenue up 12% from previous academic year
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Financial Aid</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {reportData.financial.scholarshipDistribution} students receive scholarships
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Payment Status</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    90% of students have current payment status
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              console.log('Export as PDF');
            }}
            className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileText className="h-5 w-5 mr-2" />
            Export as PDF
          </button>
          <button
            onClick={() => {
              console.log('Export as Excel');
            }}
            className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-5 w-5 mr-2" />
            Export as Excel
          </button>
          <button
            onClick={() => {
              console.log('Schedule report');
            }}
            className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-orange-900 mb-3">Student Reports Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-orange-800">Enrollment Analytics</h4>
            <p className="text-orange-700">Track student enrollment trends and program distribution</p>
          </div>
          <div>
            <h4 className="font-medium text-orange-800">Academic Performance</h4>
            <p className="text-orange-700">Monitor GPA trends, retention, and graduation rates</p>
          </div>
          <div>
            <h4 className="font-medium text-orange-800">Demographics</h4>
            <p className="text-orange-700">Analyze student demographics and diversity metrics</p>
          </div>
          <div>
            <h4 className="font-medium text-orange-800">Financial Analysis</h4>
            <p className="text-orange-700">Review tuition revenue and financial aid distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReports;