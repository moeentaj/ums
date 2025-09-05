// src/components/graduation/StudentProgress.jsx - Student Progress Tracking Component

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const StudentProgress = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [expandedStudent, setExpandedStudent] = useState(null);

  // Mock data for student progress
  const mockStudents = [
    {
      id: 'STU001',
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      program: 'Computer Science',
      degree: 'Bachelor of Science',
      year: 4,
      expectedGraduation: '2024-05-15',
      gpa: 3.85,
      totalCredits: 118,
      requiredCredits: 120,
      completedRequirements: 14,
      totalRequirements: 16,
      status: 'on-track',
      progressPercentage: 94,
      remainingCourses: ['CS 495: Senior Capstone', 'ELEC 400: Technical Elective'],
      completedCourses: ['CS 101', 'CS 201', 'CS 301', 'MATH 201', 'PHYS 101'],
      advisor: 'Dr. Sarah Chen'
    },
    {
      id: 'STU002',
      name: 'Robert Martinez',
      email: 'robert.martinez@student.edu',
      program: 'Business Administration',
      degree: 'Bachelor of Business Administration',
      year: 4,
      expectedGraduation: '2024-05-15',
      gpa: 3.42,
      totalCredits: 112,
      requiredCredits: 120,
      completedRequirements: 12,
      totalRequirements: 15,
      status: 'at-risk',
      progressPercentage: 78,
      remainingCourses: ['BUS 495: Capstone', 'BUS 420: Strategic Management', 'ELEC 300: Elective'],
      completedCourses: ['BUS 101', 'BUS 201', 'ECON 101', 'MATH 101', 'ENG 101'],
      advisor: 'Dr. Michael Thompson',
      alerts: ['GPA below 3.5 requirement', 'Missing prerequisite for BUS 495']
    },
    {
      id: 'STU003',
      name: 'Emily Davis',
      email: 'emily.davis@student.edu',
      program: 'Biology',
      degree: 'Bachelor of Science',
      year: 3,
      expectedGraduation: '2025-05-15',
      gpa: 3.91,
      totalCredits: 95,
      requiredCredits: 120,
      completedRequirements: 11,
      totalRequirements: 16,
      status: 'on-track',
      progressPercentage: 69,
      remainingCourses: ['BIO 401: Advanced Biology', 'BIO 495: Research Project', 'CHEM 301'],
      completedCourses: ['BIO 101', 'BIO 201', 'CHEM 101', 'CHEM 201', 'MATH 201'],
      advisor: 'Dr. Jennifer Adams'
    },
    {
      id: 'STU004',
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      program: 'Engineering',
      degree: 'Bachelor of Engineering',
      year: 4,
      expectedGraduation: '2024-12-15',
      gpa: 2.95,
      totalCredits: 108,
      requiredCredits: 128,
      completedRequirements: 10,
      totalRequirements: 18,
      status: 'critical',
      progressPercentage: 65,
      remainingCourses: ['ENG 401', 'ENG 402', 'ENG 495', 'MATH 401'],
      completedCourses: ['ENG 101', 'ENG 201', 'MATH 201', 'PHYS 201', 'CHEM 101'],
      advisor: 'Dr. Robert Kim',
      alerts: ['GPA below minimum requirement', 'Behind on credit hours', 'May need additional semester']
    }
  ];

  const programs = ['all', 'Computer Science', 'Business Administration', 'Biology', 'Engineering'];
  const statuses = ['all', 'on-track', 'at-risk', 'critical', 'completed'];
  const years = ['all', '1', '2', '3', '4', '5+'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
      } catch (error) {
        console.error('Error loading student progress data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.program.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = selectedProgram === 'all' || student.program === selectedProgram;
      const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
      const matchesYear = selectedYear === 'all' || student.year.toString() === selectedYear;

      return matchesSearch && matchesProgram && matchesStatus && matchesYear;
    });

    setFilteredStudents(filtered);
  }, [students, searchQuery, selectedProgram, selectedStatus, selectedYear]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 border-green-200';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <CheckCircleIcon className="h-4 w-4" />;
      case 'at-risk': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'critical': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'completed': return <AcademicCapIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getProgressBarColor = (percentage, status) => {
    if (status === 'critical') return 'bg-red-500';
    if (status === 'at-risk') return 'bg-yellow-500';
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const exportData = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Program', 'Year', 'GPA', 'Progress %', 'Status', 'Expected Graduation'],
      ...filteredStudents.map(student => [
        student.id,
        student.name,
        student.program,
        student.year,
        student.gpa,
        student.progressPercentage,
        student.status,
        student.expectedGraduation
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student-progress-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const summaryStats = {
    totalStudents: filteredStudents.length,
    onTrack: filteredStudents.filter(s => s.status === 'on-track').length,
    atRisk: filteredStudents.filter(s => s.status === 'at-risk').length,
    critical: filteredStudents.filter(s => s.status === 'critical').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Student Progress Tracking</h2>
          <p className="text-gray-600">Monitor academic progress towards graduation requirements</p>
        </div>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{summaryStats.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-600">{summaryStats.onTrack}</div>
              <div className="text-sm text-gray-600">On Track</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{summaryStats.atRisk}</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-red-600">{summaryStats.critical}</div>
              <div className="text-sm text-gray-600">Critical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
          </div>

          {/* Program Filter */}
          <div className="min-w-0 flex-1">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {programs.map(program => (
                <option key={program} value={program}>
                  {program === 'all' ? 'All Programs' : program}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="min-w-0 flex-1">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="min-w-0 flex-1">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : `Year ${year}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Progress List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Student Progress ({filteredStudents.length} students)
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedStudent === student.id ? 
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" /> :
                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                      }
                    </button>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.program} • Year {student.year} • GPA: {student.gpa}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Overall Progress</span>
                        <span>{student.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressBarColor(student.progressPercentage, student.status)}`}
                          style={{ width: `${student.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Credits */}
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Credits</div>
                      <div className="text-lg font-medium text-gray-900">
                        {student.totalCredits} / {student.requiredCredits}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Requirements</div>
                      <div className="text-lg font-medium text-gray-900">
                        {student.completedRequirements} / {student.totalRequirements}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(student.status)}`}>
                    {getStatusIcon(student.status)}
                    <span className="ml-1 capitalize">{student.status.replace('-', ' ')}</span>
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedStudent === student.id && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Academic Details</h5>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Degree:</span> {student.degree}</div>
                        <div><span className="font-medium">Expected Graduation:</span> {new Date(student.expectedGraduation).toLocaleDateString()}</div>
                        <div><span className="font-medium">Advisor:</span> {student.advisor}</div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Remaining Courses</h5>
                      <div className="space-y-1 text-sm">
                        {student.remainingCourses.map((course, index) => (
                          <div key={index} className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-yellow-500 mr-2" />
                            <span>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {student.alerts && student.alerts.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-red-900 mb-3">Alerts</h5>
                      <div className="space-y-2">
                        {student.alerts.map((alert, index) => (
                          <div key={index} className="flex items-center text-sm text-red-700 bg-red-50 p-2 rounded">
                            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                            <span>{alert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;