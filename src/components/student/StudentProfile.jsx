// src/components/students/StudentProfile.jsx - Complete Student Profile Component

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockData, getStudentById, getTransactionsByStudent, getCourseById } from '../../data/mockData';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  DocumentTextIcon,
  UserIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const StudentProfile = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { user, hasPermission } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [studentTransactions, setStudentTransactions] = useState([]);
  const [studentGrades, setStudentGrades] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Permission checks
  const canEdit = hasPermission('all') || user?.role === 'admin' || user?.role === 'registrar';
  const canDelete = hasPermission('all') || user?.role === 'admin';
  const canViewFinancial = hasPermission('all') || user?.role === 'admin' || 
    (user?.role === 'student' && user?.studentId === studentId);
  const canViewGrades = hasPermission('all') || user?.role === 'admin' || user?.role === 'faculty' ||
    (user?.role === 'student' && user?.studentId === studentId);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Get student data
        const studentData = getStudentById(studentId);
        if (!studentData) {
          navigate('/students', { replace: true });
          return;
        }

        setStudent(studentData);

        // Load financial transactions
        if (canViewFinancial) {
          const transactions = getTransactionsByStudent(studentId);
          setStudentTransactions(transactions);
        }

        // Load academic records
        if (canViewGrades) {
          const grades = mockData.academic.grades.filter(grade => grade.studentId === studentId);
          setStudentGrades(grades);
        }

      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      loadStudentData();
    }
  }, [studentId, navigate, canViewFinancial, canViewGrades]);

  // Tab configuration
  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'academic', name: 'Academic Records', icon: AcademicCapIcon, visible: canViewGrades },
    { id: 'financial', name: 'Financial', icon: CreditCardIcon, visible: canViewFinancial },
    { id: 'documents', name: 'Documents', icon: DocumentTextIcon }
  ].filter(tab => tab.visible !== false);

  // Handle delete student
  const handleDeleteStudent = () => {
    // In real app, this would make API call
    console.log('Deleting student:', student.id);
    setShowDeleteModal(false);
    navigate('/students');
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase()) {
        case 'active':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'inactive':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'probation':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'graduated':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const getStatusIcon = (status) => {
      switch (status.toLowerCase()) {
        case 'active':
          return <CheckCircleIcon className="h-4 w-4" />;
        case 'inactive':
          return <ExclamationTriangleIcon className="h-4 w-4" />;
        case 'probation':
          return <ClockIcon className="h-4 w-4" />;
        case 'graduated':
          return <AcademicCapIcon className="h-4 w-4" />;
        default:
          return <UserIcon className="h-4 w-4" />;
      }
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
        {getStatusIcon(status)}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  // GPA indicator component
  const GPAIndicator = ({ gpa }) => {
    const getGPAColor = (gpa) => {
      if (gpa >= 3.7) return 'text-green-600 bg-green-50';
      if (gpa >= 3.0) return 'text-blue-600 bg-blue-50';
      if (gpa >= 2.5) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
    };

    const getPerformanceLevel = (gpa) => {
      if (gpa >= 3.7) return 'Excellent';
      if (gpa >= 3.0) return 'Good';
      if (gpa >= 2.5) return 'Satisfactory';
      return 'Needs Improvement';
    };

    return (
      <div className={`p-4 rounded-lg ${getGPAColor(gpa)} border`}>
        <div className="text-2xl font-bold">{gpa.toFixed(2)}</div>
        <div className="text-sm font-medium">{getPerformanceLevel(gpa)}</div>
        <div className="text-xs opacity-75">Current GPA</div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        </div>

        {/* Profile card skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 text-center">
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Not Found</h2>
          <p className="text-gray-600 mb-6">The requested student profile could not be found.</p>
          <button
            onClick={() => navigate('/students')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            Back to Student List
          </button>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal Information */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <p className="text-gray-900">{student.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
              <p className="text-gray-900">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
              <p className="text-gray-900">{student.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
              <p className="text-gray-900 font-mono">{student.studentId}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-900">{student.email}</span>
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-900">{student.phone}</span>
            </div>
            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
              <div className="text-gray-900">
                <p>{student.address.street}</p>
                <p>{student.address.city}, {student.address.state} {student.address.zipCode}</p>
                <p>{student.address.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-gray-900">{student.emergencyContact.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Relationship</label>
              <p className="text-gray-900">{student.emergencyContact.relationship}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
              <p className="text-gray-900">{student.emergencyContact.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900">{student.emergencyContact.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Overview</h3>
          <div className="space-y-4">
            <GPAIndicator gpa={student.gpa} />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{student.totalCredits}</div>
                <div className="text-sm text-blue-600">Credits Earned</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{student.currentCourses.length}</div>
                <div className="text-sm text-purple-600">Current Courses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Program</label>
              <p className="text-gray-900">{student.program}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Degree</label>
              <p className="text-gray-900">{student.degree}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Current Year</label>
              <p className="text-gray-900">{student.year}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Enrollment Date</label>
              <p className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Expected Graduation</label>
              <p className="text-gray-900">{new Date(student.expectedGraduation).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Current Courses */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Courses</h3>
          <div className="space-y-2">
            {student.currentCourses.map((courseCode, index) => {
              const course = getCourseById(courseCode) || { name: `Course ${courseCode}`, instructor: 'TBA' };
              return (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{courseCode}</div>
                  <div className="text-sm text-gray-600">{course.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicTab = () => (
    <div className="space-y-6">
      {/* Academic History */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Semester</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Credits</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">GPA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {student.academicHistory.map((semester, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{semester.semester}</td>
                  <td className="py-3 px-4 text-gray-900">{semester.credits}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      semester.gpa >= 3.5 ? 'bg-green-100 text-green-800' :
                      semester.gpa >= 3.0 ? 'bg-blue-100 text-blue-800' :
                      semester.gpa >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {semester.gpa.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {semester.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Current Grades */}
      {studentGrades.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
          {studentGrades.map((grade, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{grade.courseName}</h4>
                  <p className="text-sm text-gray-600">{grade.courseId} • {grade.instructor}</p>
                  <p className="text-sm text-gray-500">{grade.semester}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    grade.finalGrade.startsWith('A') ? 'text-green-600' :
                    grade.finalGrade.startsWith('B') ? 'text-blue-600' :
                    grade.finalGrade.startsWith('C') ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {grade.finalGrade}
                  </div>
                  <div className="text-sm text-gray-500">{grade.credits} credits</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {grade.assignments.map((assignment, assignmentIndex) => (
                  <div key={assignmentIndex} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm font-medium text-gray-900">{assignment.name}</div>
                    <div className="text-lg font-bold text-gray-700">
                      {assignment.score}/{assignment.maxScore}
                    </div>
                    <div className="text-xs text-gray-500">{assignment.weight}% weight</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderFinancialTab = () => (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <CreditCardIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-bold text-red-600">
                ${student.financialInfo.tuitionBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <AcademicCapIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Financial Aid</p>
              <p className="text-2xl font-bold text-green-600">
                ${student.financialInfo.financialAid.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Plan</p>
              <p className="text-lg font-semibold text-blue-600">
                {student.financialInfo.paymentPlan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarships */}
      {student.financialInfo.scholarships.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scholarships & Awards</h3>
          <div className="space-y-3">
            {student.financialInfo.scholarships.map((scholarship, index) => (
              <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <AcademicCapIcon className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-green-800">{scholarship}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      {studentTransactions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {studentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{transaction.description}</td>
                    <td className={`py-3 px-4 font-medium ${
                      transaction.amount > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Documents</h3>
      <div className="space-y-3">
        {student.documents.map((document, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-900">{document}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Download
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/students')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Students
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <nav className="text-sm text-gray-500">
              <span>Students</span>
              <span className="mx-2">/</span>
              <span className="text-blue-600 font-medium">Profile</span>
            </nav>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <ShareIcon className="h-4 w-4 mr-2" />
            Share
          </button>
          {canEdit && (
            <button
              onClick={() => navigate(`/students/edit/${student.id}`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </button>
          )}
          {canDelete && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-blue-100 text-lg">{student.program}</p>
              <p className="text-blue-200">Student ID: {student.studentId}</p>
              <div className="mt-2">
                <StatusBadge status={student.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
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
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'academic' && renderAcademicTab()}
          {activeTab === 'financial' && renderFinancialTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Student Record
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Are you sure you want to delete <strong>{student.name}</strong>? 
                  This action cannot be undone and will permanently remove all student data including:
                </p>
                <ul className="text-sm text-gray-500 mb-4 list-disc list-inside text-left">
                  <li>Personal and contact information</li>
                  <li>Academic records and grades</li>
                  <li>Financial transaction history</li>
                  <li>All uploaded documents</li>
                </ul>
              </div>
              <div className="flex space-x-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteStudent}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;