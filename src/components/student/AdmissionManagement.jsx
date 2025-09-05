// src/components/student/AdmissionsManagement.jsx - Complete Admissions Management Component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Calendar,
  User,
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Send
} from 'lucide-react';

const AdmissionsManagement = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter states
  const [filters, setFilters] = useState({
    status: 'all',
    program: 'all',
    applicationDate: 'all',
    priority: 'all'
  });

  // Mock applications data
  const mockApplications = [
    {
      id: 'APP001',
      applicationId: 'ADM2025001',
      applicantName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '2006-03-15',
      program: 'Computer Science',
      applicationDate: '2025-08-15',
      status: 'under_review',
      priority: 'high',
      previousEducation: {
        institution: 'Central High School',
        gpa: '3.85',
        graduationYear: '2025'
      },
      documents: [
        { name: 'Transcript', status: 'submitted', url: '#' },
        { name: 'Letters of Recommendation', status: 'submitted', url: '#' },
        { name: 'Personal Statement', status: 'submitted', url: '#' },
        { name: 'SAT Scores', status: 'pending', url: '#' }
      ],
      testScores: {
        sat: '1520',
        act: '',
        gre: ''
      },
      personalStatement: 'I am passionate about technology and its potential to solve real-world problems...',
      extracurriculars: ['Robotics Club President', 'Math Olympiad', 'Volunteer Tutor'],
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701'
      },
      emergencyContact: {
        name: 'Michael Johnson',
        relationship: 'Father',
        phone: '(555) 987-6543'
      },
      notes: '',
      reviewedBy: null,
      reviewDate: null,
      decision: null,
      decisionDate: null,
      decisionNotes: ''
    },
    {
      id: 'APP002',
      applicationId: 'ADM2025002',
      applicantName: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      dateOfBirth: '2006-07-22',
      program: 'Business Administration',
      applicationDate: '2025-08-18',
      status: 'accepted',
      priority: 'medium',
      previousEducation: {
        institution: 'Lincoln Academy',
        gpa: '3.92',
        graduationYear: '2025'
      },
      documents: [
        { name: 'Transcript', status: 'submitted', url: '#' },
        { name: 'Letters of Recommendation', status: 'submitted', url: '#' },
        { name: 'Personal Statement', status: 'submitted', url: '#' },
        { name: 'SAT Scores', status: 'submitted', url: '#' }
      ],
      testScores: {
        sat: '1450',
        act: '32',
        gre: ''
      },
      personalStatement: 'My goal is to become an entrepreneur and create innovative business solutions...',
      extracurriculars: ['Student Government', 'Debate Team', 'Young Entrepreneurs Club'],
      address: {
        street: '456 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601'
      },
      emergencyContact: {
        name: 'Lisa Chen',
        relationship: 'Mother',
        phone: '(555) 876-5432'
      },
      notes: 'Excellent leadership qualities demonstrated.',
      reviewedBy: 'Dr. Smith',
      reviewDate: '2025-08-25',
      decision: 'accepted',
      decisionDate: '2025-08-26',
      decisionNotes: 'Strong academic performance and leadership experience.'
    },
    {
      id: 'APP003',
      applicationId: 'ADM2025003',
      applicantName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '(555) 345-6789',
      dateOfBirth: '2006-11-08',
      program: 'Biology',
      applicationDate: '2025-08-20',
      status: 'rejected',
      priority: 'low',
      previousEducation: {
        institution: 'Westfield High School',
        gpa: '3.45',
        graduationYear: '2025'
      },
      documents: [
        { name: 'Transcript', status: 'submitted', url: '#' },
        { name: 'Letters of Recommendation', status: 'submitted', url: '#' },
        { name: 'Personal Statement', status: 'submitted', url: '#' },
        { name: 'SAT Scores', status: 'submitted', url: '#' }
      ],
      testScores: {
        sat: '1280',
        act: '',
        gre: ''
      },
      personalStatement: 'I have always been fascinated by the natural world and want to pursue research...',
      extracurriculars: ['Science Club', 'Environmental Club', 'Community Garden'],
      address: {
        street: '789 Pine St',
        city: 'Aurora',
        state: 'IL',
        zipCode: '60502'
      },
      emergencyContact: {
        name: 'Carlos Rodriguez',
        relationship: 'Father',
        phone: '(555) 765-4321'
      },
      notes: '',
      reviewedBy: 'Dr. Johnson',
      reviewDate: '2025-08-28',
      decision: 'rejected',
      decisionDate: '2025-08-29',
      decisionNotes: 'GPA below minimum requirements for program.'
    },
    {
      id: 'APP004',
      applicationId: 'ADM2025004',
      applicantName: 'David Kim',
      email: 'david.kim@email.com',
      phone: '(555) 456-7890',
      dateOfBirth: '2006-01-30',
      program: 'Engineering',
      applicationDate: '2025-08-22',
      status: 'pending',
      priority: 'high',
      previousEducation: {
        institution: 'North Shore Academy',
        gpa: '3.98',
        graduationYear: '2025'
      },
      documents: [
        { name: 'Transcript', status: 'submitted', url: '#' },
        { name: 'Letters of Recommendation', status: 'submitted', url: '#' },
        { name: 'Personal Statement', status: 'submitted', url: '#' },
        { name: 'SAT Scores', status: 'pending', url: '#' }
      ],
      testScores: {
        sat: '',
        act: '35',
        gre: ''
      },
      personalStatement: 'Engineering represents the perfect intersection of creativity and problem-solving...',
      extracurriculars: ['Engineering Club', 'Math Team Captain', 'NASA Internship'],
      address: {
        street: '321 Elm Dr',
        city: 'Evanston',
        state: 'IL',
        zipCode: '60201'
      },
      emergencyContact: {
        name: 'Grace Kim',
        relationship: 'Mother',
        phone: '(555) 654-3210'
      },
      notes: 'Outstanding academic record and relevant experience.',
      reviewedBy: null,
      reviewDate: null,
      decision: null,
      decisionDate: null,
      decisionNotes: ''
    }
  ];

  // Permission checks
  const canManageAdmissions = hasPermission('students.write') || user?.role === 'admin' || user?.role === 'admissions';
  const canViewApplications = hasPermission('students.read') || canManageAdmissions;

  // Load applications data
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setApplications(mockApplications);
        setFilteredApplications(mockApplications);
      } catch (error) {
        console.error('Error loading applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Filter applications
  useEffect(() => {
    let filtered = applications.filter(app => {
      const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.program.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || app.status === filters.status;
      const matchesProgram = filters.program === 'all' || app.program === filters.program;
      const matchesPriority = filters.priority === 'all' || app.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesProgram && matchesPriority;
    });

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, applications]);

  // Get paginated applications
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  // Handle application decision
  const handleDecision = async (applicationId, decision, notes) => {
    try {
      const updatedApplications = applications.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: decision,
            decision,
            decisionDate: new Date().toISOString().split('T')[0],
            decisionNotes: notes,
            reviewedBy: user?.name || 'Current User',
            reviewDate: new Date().toISOString().split('T')[0]
          };
        }
        return app;
      });

      setApplications(updatedApplications);
      setShowDecisionModal(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'under_review':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'accepted':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'rejected':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'waitlisted':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'pending':
          return <Clock className="h-4 w-4" />;
        case 'under_review':
          return <Eye className="h-4 w-4" />;
        case 'accepted':
          return <CheckCircle className="h-4 w-4" />;
        case 'rejected':
          return <XCircle className="h-4 w-4" />;
        case 'waitlisted':
          return <AlertCircle className="h-4 w-4" />;
        default:
          return <Clock className="h-4 w-4" />;
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status.replace('_', ' ')}</span>
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const getPriorityStyle = (priority) => {
      switch (priority) {
        case 'high':
          return 'bg-red-100 text-red-800';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'low':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(priority)}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Application Details Modal
  const ApplicationModal = ({ application, onClose }) => {
    const [activeTab, setActiveTab] = useState('details');

    if (!application) return null;

    const tabs = [
      { id: 'details', name: 'Application Details', icon: User },
      { id: 'documents', name: 'Documents', icon: FileText },
      { id: 'review', name: 'Review & Decision', icon: CheckCircle }
    ];

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div className="bg-white">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Application #{application.applicationId}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {application.applicantName} - {application.program}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={application.status} />
                    <PriorityBadge priority={application.priority} />
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                      >
                        <TabIcon className="h-4 w-4" />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="px-6 py-6 max-h-96 overflow-y-auto">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Personal Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Full Name:</span>
                          <span className="ml-2 text-gray-900">{application.applicantName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date of Birth:</span>
                          <span className="ml-2 text-gray-900">{application.dateOfBirth}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <span className="ml-2 text-gray-900">{application.email}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>
                          <span className="ml-2 text-gray-900">{application.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Academic Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Previous Institution:</span>
                          <span className="ml-2 text-gray-900">{application.previousEducation.institution}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">GPA:</span>
                          <span className="ml-2 text-gray-900">{application.previousEducation.gpa}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Graduation Year:</span>
                          <span className="ml-2 text-gray-900">{application.previousEducation.graduationYear}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Test Scores:</span>
                          <span className="ml-2 text-gray-900">
                            {application.testScores.sat && `SAT: ${application.testScores.sat}`}
                            {application.testScores.act && ` ACT: ${application.testScores.act}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Statement */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Personal Statement</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        {application.personalStatement}
                      </p>
                    </div>

                    {/* Extracurricular Activities */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Extracurricular Activities</h4>
                      <ul className="text-sm text-gray-700 list-disc list-inside">
                        {application.extracurriculars.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Required Documents</h4>
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            doc.status === 'submitted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                          {doc.status === 'submitted' && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'review' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Application Status</h4>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Current Status:</span>
                          <StatusBadge status={application.status} />
                        </div>
                        {application.reviewedBy && (
                          <div>
                            <span className="font-medium text-gray-700">Reviewed By:</span>
                            <span className="ml-2 text-gray-900">{application.reviewedBy}</span>
                          </div>
                        )}
                        {application.reviewDate && (
                          <div>
                            <span className="font-medium text-gray-700">Review Date:</span>
                            <span className="ml-2 text-gray-900">{application.reviewDate}</span>
                          </div>
                        )}
                        {application.decisionNotes && (
                          <div>
                            <span className="font-medium text-gray-700">Decision Notes:</span>
                            <p className="mt-1 text-gray-900 bg-gray-50 p-2 rounded-md text-sm">
                              {application.decisionNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {canManageAdmissions && (
                      <div className="border-t pt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Actions</h4>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowDecisionModal(true);
                              onClose();
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Make Decision
                          </button>
                          <button
                            onClick={() => {
                              // Handle contact applicant
                              window.open(`mailto:${application.email}`);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Decision Modal
  const DecisionModal = ({ application, onClose, onDecision }) => {
    const [decision, setDecision] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (decision && notes.trim()) {
        onDecision(application.id, decision, notes);
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Make Admission Decision
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Application for {application?.applicantName}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Decision
                    </label>
                    <select
                      value={decision}
                      onChange={(e) => setDecision(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select decision</option>
                      <option value="accepted">Accept</option>
                      <option value="rejected">Reject</option>
                      <option value="waitlisted">Waitlist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Decision Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide reasoning for the decision..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Decision
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (!canViewApplications) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to view applications.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admissions Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Review and process student applications
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {filteredApplications.length} of {applications.length} applications
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Applications',
            value: applications.length,
            icon: FileText,
            color: 'blue'
          },
          {
            title: 'Under Review',
            value: applications.filter(app => app.status === 'under_review' || app.status === 'pending').length,
            icon: Clock,
            color: 'yellow'
          },
          {
            title: 'Accepted',
            value: applications.filter(app => app.status === 'accepted').length,
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Rejected',
            value: applications.filter(app => app.status === 'rejected').length,
            icon: XCircle,
            color: 'red'
          }
        ].map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-2 bg-${stat.color}-100 rounded-md`}>
                  <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Export */}
          <button
            onClick={() => {
              // Handle export functionality
              console.log('Exporting applications...');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                <select
                  value={filters.applicationDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, applicationDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Dates</option>
                  <option value="last_week">Last Week</option>
                  <option value="last_month">Last Month</option>
                  <option value="last_quarter">Last Quarter</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading applications...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GPA
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.applicationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={application.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PriorityBadge priority={application.priority} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.previousEducation.gpa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowApplicationModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {canManageAdmissions && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setShowDecisionModal(true);
                                }}
                                className="text-green-600 hover:text-green-900"
                                title="Make Decision"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  window.open(`mailto:${application.email}`);
                                }}
                                className="text-gray-600 hover:text-gray-900"
                                title="Contact Applicant"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, filteredApplications.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredApplications.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showApplicationModal && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {showDecisionModal && (
        <DecisionModal
          application={selectedApplication}
          onClose={() => {
            setShowDecisionModal(false);
            setSelectedApplication(null);
          }}
          onDecision={handleDecision}
        />
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Admissions Management Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800">Application Review</h4>
            <p className="text-blue-700">Review application details, documents, and academic records</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Decision Making</h4>
            <p className="text-blue-700">Accept, reject, or waitlist applications with detailed notes</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">Communication</h4>
            <p className="text-blue-700">Contact applicants directly through email integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsManagement;