// src/components/graduation/TranscriptServices.jsx - Transcript Services Management Component

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  DocumentTextIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PrinterIcon,
  EnvelopeIcon,
  XMarkIcon,
  CalendarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

const TranscriptServices = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [transcriptRequests, setTranscriptRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data for transcript requests
  const mockTranscriptRequests = [
    {
      id: 'TR001',
      studentId: 'STU001',
      studentName: 'Alice Johnson',
      studentEmail: 'alice.johnson@student.edu',
      requestDate: '2024-03-15',
      type: 'official',
      status: 'completed',
      deliveryMethod: 'mail',
      recipientName: 'Harvard Graduate School',
      recipientAddress: '1350 Massachusetts Ave, Cambridge, MA 02138',
      recipientEmail: 'admissions@harvard.edu',
      purpose: 'Graduate School Application',
      copies: 1,
      rushOrder: false,
      fee: 15.00,
      paymentStatus: 'paid',
      completedDate: '2024-03-18',
      trackingNumber: 'TR12345678',
      notes: 'Sent to Harvard Graduate School Admissions Office'
    },
    {
      id: 'TR002',
      studentId: 'STU002',
      studentName: 'Robert Martinez',
      studentEmail: 'robert.martinez@student.edu',
      requestDate: '2024-03-20',
      type: 'unofficial',
      status: 'processing',
      deliveryMethod: 'email',
      recipientName: 'Robert Martinez',
      recipientAddress: '',
      recipientEmail: 'robert.martinez@email.com',
      purpose: 'Personal Records',
      copies: 1,
      rushOrder: false,
      fee: 0.00,
      paymentStatus: 'free',
      completedDate: null,
      trackingNumber: null,
      notes: 'Student copy for personal records'
    },
    {
      id: 'TR003',
      studentId: 'STU003',
      studentName: 'Emily Davis',
      studentEmail: 'emily.davis@student.edu',
      requestDate: '2024-03-22',
      type: 'official',
      status: 'pending',
      deliveryMethod: 'pickup',
      recipientName: 'Emily Davis',
      recipientAddress: '',
      recipientEmail: '',
      purpose: 'Job Application',
      copies: 3,
      rushOrder: true,
      fee: 60.00,
      paymentStatus: 'pending',
      completedDate: null,
      trackingNumber: null,
      notes: 'Rush order - needed by March 25th'
    },
    {
      id: 'TR004',
      studentId: 'STU004',
      studentName: 'David Wilson',
      studentEmail: 'david.wilson@student.edu',
      requestDate: '2024-03-18',
      type: 'official',
      status: 'rejected',
      deliveryMethod: 'mail',
      recipientName: 'MIT Admissions',
      recipientAddress: '77 Massachusetts Ave, Cambridge, MA 02139',
      recipientEmail: '',
      purpose: 'Graduate School Application',
      copies: 1,
      rushOrder: false,
      fee: 15.00,
      paymentStatus: 'refunded',
      completedDate: null,
      trackingNumber: null,
      notes: 'Rejected due to outstanding student account balance'
    }
  ];

  const statuses = ['all', 'pending', 'processing', 'completed', 'rejected', 'cancelled'];
  const types = ['all', 'official', 'unofficial'];
  const deliveryMethods = ['mail', 'email', 'pickup'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTranscriptRequests(mockTranscriptRequests);
        setFilteredRequests(mockTranscriptRequests);
      } catch (error) {
        console.error('Error loading transcript requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = transcriptRequests.filter(request => {
      const matchesSearch = request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           request.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           request.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           request.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
      const matchesType = filterType === 'all' || request.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });

    setFilteredRequests(filtered);
  }, [transcriptRequests, searchQuery, filterStatus, filterType]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockIcon className="h-4 w-4" />;
      case 'processing': return <ClockIcon className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'cancelled': return <XMarkIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'refunded': return 'text-blue-600';
      case 'free': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    setTranscriptRequests(transcriptRequests.map(request =>
      request.id === requestId
        ? { 
            ...request, 
            status: newStatus,
            completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null,
            trackingNumber: newStatus === 'completed' && request.deliveryMethod === 'mail' ? `TR${Date.now()}` : null
          }
        : request
    ));
  };

  const handleNewRequest = (newRequest) => {
    const request = {
      id: `TR${Date.now()}`,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentStatus: newRequest.type === 'unofficial' ? 'free' : 'pending',
      completedDate: null,
      trackingNumber: null,
      ...newRequest
    };
    setTranscriptRequests([...transcriptRequests, request]);
    setShowNewRequestModal(false);
  };

  const NewRequestModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      studentId: '',
      studentName: '',
      studentEmail: '',
      type: 'official',
      deliveryMethod: 'mail',
      recipientName: '',
      recipientAddress: '',
      recipientEmail: '',
      purpose: '',
      copies: 1,
      rushOrder: false,
      notes: ''
    });

    useEffect(() => {
      if (!isOpen) {
        setFormData({
          studentId: '',
          studentName: '',
          studentEmail: '',
          type: 'official',
          deliveryMethod: 'mail',
          recipientName: '',
          recipientAddress: '',
          recipientEmail: '',
          purpose: '',
          copies: 1,
          rushOrder: false,
          notes: ''
        });
      }
    }, [isOpen]);

    const calculateFee = () => {
      if (formData.type === 'unofficial') return 0;
      let baseFee = 15;
      let totalFee = baseFee * formData.copies;
      if (formData.rushOrder) totalFee *= 2;
      return totalFee;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const fee = calculateFee();
      onSave({ ...formData, fee });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">New Transcript Request</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Email</label>
              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter student email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transcript Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="official">Official Transcript</option>
                  <option value="unofficial">Unofficial Transcript</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Method</label>
                <select
                  value={formData.deliveryMethod}
                  onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {deliveryMethods.map(method => (
                    <option key={method} value={method}>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter recipient name"
              />
            </div>

            {formData.deliveryMethod === 'mail' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <textarea
                  value={formData.recipientAddress}
                  onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter complete mailing address"
                />
              </div>
            )}

            {formData.deliveryMethod === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                <input
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter recipient email"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Purpose</option>
                <option value="Graduate School Application">Graduate School Application</option>
                <option value="Job Application">Job Application</option>
                <option value="Personal Records">Personal Records</option>
                <option value="Transfer Credits">Transfer Credits</option>
                <option value="Professional Licensing">Professional Licensing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Copies</label>
                <input
                  type="number"
                  value={formData.copies}
                  onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.rushOrder}
                    onChange={(e) => setFormData({ ...formData, rushOrder: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Rush Order (2x fee)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes or instructions"
              />
            </div>

            {/* Fee Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total Fee:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${calculateFee().toFixed(2)}
                  {formData.type === 'unofficial' && <span className="text-sm text-green-600 ml-2">(Free)</span>}
                </span>
              </div>
              {formData.rushOrder && formData.type === 'official' && (
                <div className="text-sm text-yellow-600 mt-1">
                  Rush order fee applied (2x base rate)
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RequestDetailsModal = ({ isOpen, onClose, request }) => {
    if (!isOpen || !request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Transcript Request Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Request Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Request ID:</span> {request.id}</div>
                  <div><span className="font-medium">Request Date:</span> {new Date(request.requestDate).toLocaleDateString()}</div>
                  <div><span className="font-medium">Type:</span> {request.type.charAt(0).toUpperCase() + request.type.slice(1)}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                    </span>
                  </div>
                  <div><span className="font-medium">Copies:</span> {request.copies}</div>
                  {request.rushOrder && <div><span className="font-medium text-yellow-600">Rush Order</span></div>}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Student Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Student ID:</span> {request.studentId}</div>
                  <div><span className="font-medium">Name:</span> {request.studentName}</div>
                  <div><span className="font-medium">Email:</span> {request.studentEmail}</div>
                  <div><span className="font-medium">Purpose:</span> {request.purpose}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Method:</span> {request.deliveryMethod.charAt(0).toUpperCase() + request.deliveryMethod.slice(1)}</div>
                <div><span className="font-medium">Recipient:</span> {request.recipientName}</div>
                {request.recipientAddress && (
                  <div><span className="font-medium">Address:</span> {request.recipientAddress}</div>
                )}
                {request.recipientEmail && (
                  <div><span className="font-medium">Email:</span> {request.recipientEmail}</div>
                )}
                {request.trackingNumber && (
                  <div><span className="font-medium">Tracking:</span> {request.trackingNumber}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Payment Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Fee:</span> ${request.fee.toFixed(2)}</div>
                  <div><span className="font-medium">Payment Status:</span> 
                    <span className={`ml-2 font-medium ${getPaymentStatusColor(request.paymentStatus)}`}>
                      {request.paymentStatus.charAt(0).toUpperCase() + request.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Requested:</span> {new Date(request.requestDate).toLocaleDateString()}</div>
                  {request.completedDate && (
                    <div><span className="font-medium">Completed:</span> {new Date(request.completedDate).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
            </div>

            {request.notes && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {request.notes}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            {hasPermission('graduation.write') && request.status !== 'completed' && request.status !== 'rejected' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    handleStatusUpdate(request.id, 'processing');
                    onClose();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Mark Processing
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(request.id, 'completed');
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(request.id, 'rejected');
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
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
      </div>
    );
  }

  const summaryStats = {
    totalRequests: filteredRequests.length,
    pending: filteredRequests.filter(r => r.status === 'pending').length,
    processing: filteredRequests.filter(r => r.status === 'processing').length,
    completed: filteredRequests.filter(r => r.status === 'completed').length,
    totalRevenue: filteredRequests
      .filter(r => r.paymentStatus === 'paid')
      .reduce((sum, r) => sum + r.fee, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Transcript Services</h2>
          <p className="text-gray-600">Manage official transcripts and academic records</p>
        </div>
        {hasPermission('graduation.write') && (
          <button
            onClick={() => setShowNewRequestModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Request</span>
          </button>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{summaryStats.totalRequests}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{summaryStats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-blue-600 mr-3 animate-spin" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.processing}</div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-600">{summaryStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CreditCardIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-purple-600">${summaryStats.totalRevenue.toFixed(0)}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0 flex-1">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transcript Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Transcript Requests ({filteredRequests.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{request.id}</div>
                      <div className="text-sm text-gray-500">{new Date(request.requestDate).toLocaleDateString()}</div>
                      {request.rushOrder && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          Rush Order
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.studentName}</div>
                        <div className="text-sm text-gray-500">{request.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{request.type.charAt(0).toUpperCase() + request.type.slice(1)}</div>
                      <div className="text-sm text-gray-500">{request.deliveryMethod.charAt(0).toUpperCase() + request.deliveryMethod.slice(1)}</div>
                      <div className="text-sm text-gray-500">{request.copies} {request.copies === 1 ? 'copy' : 'copies'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">${request.fee.toFixed(2)}</div>
                      <div className={`text-sm font-medium ${getPaymentStatusColor(request.paymentStatus)}`}>
                        {request.paymentStatus.charAt(0).toUpperCase() + request.paymentStatus.slice(1)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    {request.status === 'completed' && (
                      <button className="text-green-600 hover:text-green-900">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transcript requests found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or create a new request.</p>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      <NewRequestModal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onSave={handleNewRequest}
      />

      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />
    </div>
  );
};

export default TranscriptServices;