// src/components/infrastructure/MaintenanceSystem.jsx - Facility Maintenance Tracking
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Wrench,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  DollarSign,
  FileText,
  Phone,
  Mail,
  Star,
  TrendingUp,
  PieChart,
  BarChart3
} from 'lucide-react';

const MaintenanceSystem = () => {
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('requests');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock maintenance request data
  const mockRequests = [
    {
      id: 'MR001',
      title: 'Air Conditioning Repair - Main Hall A',
      description: 'AC unit not cooling properly. Temperature reading shows 28°C instead of expected 22°C.',
      category: 'HVAC',
      priority: 'high',
      status: 'in_progress',
      location: 'Main Hall A',
      building: 'Academic Block A',
      floor: 1,
      requester: {
        name: 'Dr. Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        phone: '+1-555-0101',
        department: 'Computer Science'
      },
      assignedTo: 'Tech001',
      createdDate: '2025-09-01',
      dueDate: '2025-09-03',
      estimatedCost: 500,
      actualCost: null,
      workLog: [
        { date: '2025-09-01', technician: 'John Smith', hours: 2, notes: 'Initial assessment completed. Need to order replacement parts.' },
        { date: '2025-09-02', technician: 'John Smith', hours: 1, notes: 'Parts arrived. Beginning replacement work.' }
      ]
    },
    {
      id: 'MR002',
      title: 'Projector Installation - Computer Lab 2',
      description: 'Install new projector and configure with existing AV system.',
      category: 'Electronics',
      priority: 'medium',
      status: 'pending',
      location: 'Computer Lab 2',
      building: 'IT Block',
      floor: 2,
      requester: {
        name: 'Prof. Michael Chen',
        email: 'michael.chen@university.edu',
        phone: '+1-555-0102',
        department: 'Information Technology'
      },
      assignedTo: null,
      createdDate: '2025-09-02',
      dueDate: '2025-09-05',
      estimatedCost: 300,
      actualCost: null,
      workLog: []
    },
    {
      id: 'MR003',
      title: 'Plumbing Leak - Chemistry Lab',
      description: 'Water leak detected under the main sink. Immediate attention required.',
      category: 'Plumbing',
      priority: 'urgent',
      status: 'completed',
      location: 'Chemistry Lab',
      building: 'Science Block',
      floor: 1,
      requester: {
        name: 'Dr. Robert Taylor',
        email: 'robert.taylor@university.edu',
        phone: '+1-555-0103',
        department: 'Chemistry'
      },
      assignedTo: 'Tech002',
      createdDate: '2025-08-30',
      dueDate: '2025-08-31',
      estimatedCost: 200,
      actualCost: 180,
      workLog: [
        { date: '2025-08-30', technician: 'Mike Johnson', hours: 3, notes: 'Located leak source and replaced faulty pipe section.' },
        { date: '2025-08-31', technician: 'Mike Johnson', hours: 1, notes: 'Tested repair and cleaned up work area.' }
      ]
    }
  ];

  // Mock technician data
  const mockTechnicians = [
    {
      id: 'Tech001',
      name: 'John Smith',
      email: 'john.smith@maintenance.edu',
      phone: '+1-555-0201',
      specialties: ['HVAC', 'Electronics'],
      status: 'active',
      currentWorkload: 3,
      maxCapacity: 5,
      rating: 4.8,
      completedJobs: 156,
      averageResolutionTime: '2.3 days',
      certification: ['HVAC Certified', 'Electrical License']
    },
    {
      id: 'Tech002',
      name: 'Mike Johnson',
      email: 'mike.johnson@maintenance.edu',
      phone: '+1-555-0202',
      specialties: ['Plumbing', 'General Maintenance'],
      status: 'active',
      currentWorkload: 2,
      maxCapacity: 4,
      rating: 4.6,
      completedJobs: 203,
      averageResolutionTime: '1.8 days',
      certification: ['Plumbing License', 'Safety Certified']
    },
    {
      id: 'Tech003',
      name: 'Sarah Davis',
      email: 'sarah.davis@maintenance.edu',
      phone: '+1-555-0203',
      specialties: ['Carpentry', 'Painting'],
      status: 'on_leave',
      currentWorkload: 0,
      maxCapacity: 4,
      rating: 4.9,
      completedJobs: 89,
      averageResolutionTime: '3.1 days',
      certification: ['Carpentry Certified']
    }
  ];

  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];
  const statuses = ['all', 'pending', 'in_progress', 'completed', 'cancelled'];
  const categories = ['all', 'HVAC', 'Plumbing', 'Electronics', 'Carpentry', 'Painting', 'General Maintenance'];

  useEffect(() => {
    const loadMaintenanceData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setRequests(mockRequests);
        setTechnicians(mockTechnicians);
      } catch (error) {
        console.error('Failed to load maintenance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaintenanceData();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress': return <Wrench className="h-5 w-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTechnicianStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'busy': return 'text-orange-600';
      case 'on_leave': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Maintenance System</h2>
          <p className="text-gray-600">Track and manage facility maintenance requests</p>
        </div>
        
        <button
          onClick={() => { setModalMode('add'); setSelectedItem(null); setShowModal(true); }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="mr-2 h-4 w-4" />
              Requests ({requests.length})
            </button>
            <button
              onClick={() => setActiveTab('technicians')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'technicians'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="mr-2 h-4 w-4" />
              Technicians ({technicians.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {activeTab === 'requests' && (
              <div className="flex items-center gap-4">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-900">{requests.filter(r => r.status === 'pending').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Wrench className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-blue-600">In Progress</p>
                      <p className="text-2xl font-bold text-blue-900">{requests.filter(r => r.status === 'in_progress').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm text-green-600">Completed</p>
                      <p className="text-2xl font-bold text-green-900">{requests.filter(r => r.status === 'completed').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm text-red-600">Urgent</p>
                      <p className="text-2xl font-bold text-red-900">{requests.filter(r => r.priority === 'urgent').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    {/* Request Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                            {request.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.location}, {request.building}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Due: {new Date(request.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {/* Requester */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Requested By</p>
                        <p className="font-medium text-gray-900">{request.requester.name}</p>
                        <p className="text-sm text-gray-600">{request.requester.department}</p>
                      </div>

                      {/* Assignment */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Assigned To</p>
                        <p className="font-medium text-gray-900">
                          {request.assignedTo ? 
                            technicians.find(t => t.id === request.assignedTo)?.name || 'Unknown' : 
                            'Unassigned'
                          }
                        </p>
                        <p className="text-sm text-gray-600">{request.category}</p>
                      </div>

                      {/* Cost */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Cost</p>
                        <p className="font-medium text-gray-900">
                          ${request.actualCost || request.estimatedCost}
                          {!request.actualCost && ' (est.)'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {request.workLog.reduce((total, log) => total + log.hours, 0)} hours logged
                        </p>
                      </div>
                    </div>

                    {/* Work Log */}
                    {request.workLog.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900 mb-2">Recent Work Log</p>
                        <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                          {request.workLog.slice(-2).map((log, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between items-start">
                                <span className="font-medium">{log.technician}</span>
                                <span className="text-gray-500">{new Date(log.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-600">{log.notes}</p>
                              <p className="text-gray-500 text-xs">{log.hours}h worked</p>
                              {index < request.workLog.slice(-2).length - 1 && <hr className="my-2" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => { setModalMode('view'); setSelectedItem(request); setShowModal(true); }}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        
                        <button className="text-sm text-green-600 hover:text-green-800 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact Requester
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setModalMode('edit'); setSelectedItem(request); setShowModal(true); }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search criteria or create a new request.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Technicians Tab */}
          {activeTab === 'technicians' && (
            <div className="space-y-6">
              {/* Technicians Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicians.map((tech) => (
                  <div key={tech.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    {/* Technician Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                          <p className={`text-sm ${getTechnicianStatusColor(tech.status)}`}>
                            {tech.status.replace('_', ' ').toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{tech.rating}</span>
                      </div>
                    </div>

                    {/* Workload */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Current Workload</span>
                        <span className="text-sm font-medium">
                          {tech.currentWorkload}/{tech.maxCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            tech.currentWorkload / tech.maxCapacity >= 0.8 ? 'bg-red-500' :
                            tech.currentWorkload / tech.maxCapacity >= 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(tech.currentWorkload / tech.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {tech.specialties.map((specialty, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Completed Jobs</p>
                        <p className="font-semibold">{tech.completedJobs}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Resolution</p>
                        <p className="font-semibold">{tech.averageResolutionTime}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Avg Resolution Time</p>
                      <p className="text-3xl font-bold">2.1 days</p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-200" />
                  </div>
                  <p className="text-sm text-blue-100 mt-2">-0.3 days from last month</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Completion Rate</p>
                      <p className="text-3xl font-bold">94%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-200" />
                  </div>
                  <p className="text-sm text-green-100 mt-2">+2% from last month</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Cost</p>
                      <p className="text-3xl font-bold">$12.5K</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-200" />
                  </div>
                  <p className="text-sm text-purple-100 mt-2">This month</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Customer Satisfaction</p>
                      <p className="text-3xl font-bold">4.7/5</p>
                    </div>
                    <Star className="h-8 w-8 text-orange-200" />
                  </div>
                  <p className="text-sm text-orange-100 mt-2">Based on 152 reviews</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Categories</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Pie chart showing request distribution by category</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Line chart showing monthly maintenance trends</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { time: '2 hours ago', event: 'MR003 marked as completed by Mike Johnson', type: 'completed' },
                    { time: '4 hours ago', event: 'New maintenance request MR004 submitted', type: 'new' },
                    { time: '1 day ago', event: 'MR001 assigned to John Smith', type: 'assigned' },
                    { time: '2 days ago', event: 'Weekly maintenance report generated', type: 'report' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          activity.type === 'completed' ? 'bg-green-500' :
                          activity.type === 'new' ? 'bg-blue-500' :
                          activity.type === 'assigned' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-sm text-gray-900">{activity.event}</span>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'add' ? 'New Maintenance Request' : 
                 modalMode === 'edit' ? 'Edit Request' : 'Request Details'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Maintenance request form would be implemented here...</p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                {modalMode !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalMode === 'add' ? 'Create Request' : 'Save Changes'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceSystem;