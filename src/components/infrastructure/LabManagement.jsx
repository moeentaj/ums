// src/components/infrastructure/LabManagement.jsx - Laboratory Management
import React, { useState, useEffect } from 'react';
import { 
  School, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Clock,
  Users,
  Monitor,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  Beaker,
  Microscope,
  Cpu,
  Camera,
  Zap,
  ChevronDown,
  Settings,
  Phone,
  Mail
} from 'lucide-react';

const LabManagement = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedLab, setSelectedLab] = useState(null);

  // Mock laboratory data
  const mockLabs = [
    {
      id: 'LAB001',
      name: 'Computer Science Lab 1',
      type: 'Computer Lab',
      building: 'IT Block',
      floor: 2,
      capacity: 40,
      status: 'active',
      supervisor: 'Dr. Sarah Wilson',
      equipment: [
        { name: 'Desktop Computers', quantity: 40, status: 'working', lastMaintenance: '2025-08-20' },
        { name: 'Projector', quantity: 1, status: 'working', lastMaintenance: '2025-08-15' },
        { name: 'Network Switch', quantity: 2, status: 'working', lastMaintenance: '2025-08-10' },
        { name: 'Air Conditioning', quantity: 2, status: 'maintenance', lastMaintenance: '2025-09-01' }
      ],
      software: ['Visual Studio', 'Python', 'Java IDE', 'MySQL', 'Git'],
      schedule: [
        { time: '09:00-11:00', course: 'Programming Fundamentals', instructor: 'Prof. Smith' },
        { time: '14:00-16:00', course: 'Database Design', instructor: 'Dr. Johnson' }
      ],
      utilizationRate: 85,
      safety: {
        lastInspection: '2025-08-25',
        certifications: ['Fire Safety', 'Electrical Safety'],
        incidents: 0
      }
    },
    {
      id: 'LAB002',
      name: 'Chemistry Laboratory',
      type: 'Science Lab',
      building: 'Science Block',
      floor: 1,
      capacity: 30,
      status: 'active',
      supervisor: 'Dr. Michael Chen',
      equipment: [
        { name: 'Fume Hoods', quantity: 6, status: 'working', lastMaintenance: '2025-08-18' },
        { name: 'Analytical Balance', quantity: 4, status: 'working', lastMaintenance: '2025-08-22' },
        { name: 'Centrifuge', quantity: 2, status: 'repair', lastMaintenance: '2025-07-30' },
        { name: 'Microscopes', quantity: 15, status: 'working', lastMaintenance: '2025-08-12' }
      ],
      chemicals: ['Sodium Chloride', 'Hydrochloric Acid', 'Distilled Water'],
      schedule: [
        { time: '10:00-12:00', course: 'Organic Chemistry', instructor: 'Dr. Chen' },
        { time: '15:00-17:00', course: 'Analytical Chemistry', instructor: 'Prof. Lee' }
      ],
      utilizationRate: 78,
      safety: {
        lastInspection: '2025-09-01',
        certifications: ['Chemical Safety', 'Emergency Response', 'Waste Management'],
        incidents: 1
      }
    },
    {
      id: 'LAB003',
      name: 'Physics Research Lab',
      type: 'Research Lab',
      building: 'Science Block',
      floor: 3,
      capacity: 20,
      status: 'maintenance',
      supervisor: 'Dr. Robert Taylor',
      equipment: [
        { name: 'Laser Equipment', quantity: 3, status: 'calibration', lastMaintenance: '2025-08-28' },
        { name: 'Oscilloscopes', quantity: 8, status: 'working', lastMaintenance: '2025-08-20' },
        { name: 'Spectrometers', quantity: 2, status: 'working', lastMaintenance: '2025-08-15' },
        { name: 'Clean Room Setup', quantity: 1, status: 'maintenance', lastMaintenance: '2025-09-02' }
      ],
      software: ['LabVIEW', 'MATLAB', 'Origin Pro'],
      schedule: [
        { time: '09:00-17:00', course: 'Research Project', instructor: 'Dr. Taylor' }
      ],
      utilizationRate: 45,
      safety: {
        lastInspection: '2025-08-30',
        certifications: ['Laser Safety', 'Radiation Safety'],
        incidents: 0
      }
    }
  ];

  const labTypes = ['all', 'Computer Lab', 'Science Lab', 'Research Lab', 'Engineering Lab'];
  const statuses = ['all', 'active', 'maintenance', 'inactive', 'renovation'];

  useEffect(() => {
    const loadLabs = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLabs(mockLabs);
      } catch (error) {
        console.error('Failed to load labs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLabs();
  }, []);

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || lab.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || lab.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance': return <Wrench className="h-5 w-5 text-yellow-500" />;
      case 'inactive': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'renovation': return <Settings className="h-5 w-5 text-blue-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'renovation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEquipmentStatusColor = (status) => {
    switch (status) {
      case 'working': return 'text-green-600';
      case 'maintenance': return 'text-yellow-600';
      case 'repair': return 'text-red-600';
      case 'calibration': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getLabTypeIcon = (type) => {
    switch (type) {
      case 'Computer Lab': return <Monitor className="h-5 w-5" />;
      case 'Science Lab': return <Beaker className="h-5 w-5" />;
      case 'Research Lab': return <Microscope className="h-5 w-5" />;
      case 'Engineering Lab': return <Cpu className="h-5 w-5" />;
      default: return <School className="h-5 w-5" />;
    }
  };

  const handleAddLab = () => {
    setModalMode('add');
    setSelectedLab(null);
    setShowModal(true);
  };

  const handleEditLab = (lab) => {
    setModalMode('edit');
    setSelectedLab(lab);
    setShowModal(true);
  };

  const handleViewLab = (lab) => {
    setModalMode('view');
    setSelectedLab(lab);
    setShowModal(true);
  };

  const handleDeleteLab = (labId) => {
    if (window.confirm('Are you sure you want to delete this laboratory?')) {
      setLabs(labs.filter(l => l.id !== labId));
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
          <h2 className="text-2xl font-bold text-gray-900">Laboratory Management</h2>
          <p className="text-gray-600">Manage laboratory facilities, equipment, and schedules</p>
        </div>
        
        <button
          onClick={handleAddLab}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Laboratory
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search laboratories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {labTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
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
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <School className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Labs</p>
              <p className="text-2xl font-bold">{labs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Labs</p>
              <p className="text-2xl font-bold">{labs.filter(l => l.status === 'active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold">{labs.reduce((sum, l) => sum + l.capacity, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Under Maintenance</p>
              <p className="text-2xl font-bold">{labs.filter(l => l.status === 'maintenance').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLabs.map((lab) => (
          <div key={lab.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Lab Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {getLabTypeIcon(lab.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{lab.name}</h3>
                    <p className="text-sm text-gray-600">{lab.building} - Floor {lab.floor}</p>
                    <p className="text-sm text-gray-600">Supervisor: {lab.supervisor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(lab.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lab.status)}`}>
                    {lab.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Lab Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{lab.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <span className="ml-2 font-medium">{lab.capacity} people</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Utilization:</span>
                    <span className="ml-2 font-medium">{lab.utilizationRate}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Equipment:</span>
                    <span className="ml-2 font-medium">{lab.equipment.length} items</span>
                  </div>
                </div>

                {/* Equipment Status */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Equipment Status:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {lab.equipment.slice(0, 4).map((equipment, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 truncate">{equipment.name}</span>
                        <span className={`font-medium ${getEquipmentStatusColor(equipment.status)}`}>
                          {equipment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Today's Schedule:</p>
                  {lab.schedule.length > 0 ? (
                    <div className="space-y-1">
                      {lab.schedule.map((session, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <Clock className="h-3 w-3 text-gray-400 mr-2" />
                          <span className="text-gray-600">{session.time}</span>
                          <span className="mx-2">-</span>
                          <span className="text-blue-600">{session.course}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">No classes scheduled</p>
                  )}
                </div>

                {/* Safety Status */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-700">Safety Status</p>
                      <p className="text-xs text-gray-600">
                        Last inspection: {new Date(lab.safety.lastInspection).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Incidents: {lab.safety.incidents}</p>
                      <p className="text-xs text-green-600">{lab.safety.certifications.length} certifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Actions */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleViewLab(lab)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditLab(lab)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600">
                    <Calendar className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLab(lab.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLabs.length === 0 && (
        <div className="text-center py-12">
          <School className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No laboratories found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new laboratory.
          </p>
          <button
            onClick={handleAddLab}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Laboratory
          </button>
        </div>
      )}

      {/* Lab Modal */}
      {showModal && (
        <LabModal
          mode={modalMode}
          lab={selectedLab}
          onClose={() => setShowModal(false)}
          onSave={(labData) => {
            if (modalMode === 'add') {
              const newLab = {
                ...labData,
                id: 'LAB' + String(labs.length + 1).padStart(3, '0'),
                utilizationRate: 0,
                schedule: [],
                safety: {
                  lastInspection: new Date().toISOString().split('T')[0],
                  certifications: [],
                  incidents: 0
                }
              };
              setLabs([...labs, newLab]);
            } else if (modalMode === 'edit') {
              setLabs(labs.map(l => l.id === selectedLab.id ? { ...l, ...labData } : l));
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

// Lab Modal Component
const LabModal = ({ mode, lab, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: lab?.name || '',
    type: lab?.type || 'Computer Lab',
    building: lab?.building || '',
    floor: lab?.floor || 1,
    capacity: lab?.capacity || '',
    status: lab?.status || 'active',
    supervisor: lab?.supervisor || '',
    equipment: lab?.equipment || [],
    software: lab?.software || [],
    chemicals: lab?.chemicals || []
  });

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    quantity: 1,
    status: 'working',
    lastMaintenance: new Date().toISOString().split('T')[0]
  });

  const addEquipment = () => {
    if (newEquipment.name) {
      setFormData({
        ...formData,
        equipment: [...formData.equipment, { ...newEquipment }]
      });
      setNewEquipment({
        name: '',
        quantity: 1,
        status: 'working',
        lastMaintenance: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeEquipment = (index) => {
    setFormData({
      ...formData,
      equipment: formData.equipment.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add New Laboratory' : 
                mode === 'edit' ? 'Edit Laboratory' : 'Laboratory Details';

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: School },
    { id: 'equipment', name: 'Equipment', icon: Monitor },
    { id: 'safety', name: 'Safety', icon: AlertTriangle },
    { id: 'schedule', name: 'Schedule', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Laboratory Name *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isViewMode}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Laboratory Type *
                    </label>
                    <select
                      required
                      disabled={isViewMode}
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="Computer Lab">Computer Lab</option>
                      <option value="Science Lab">Science Lab</option>
                      <option value="Research Lab">Research Lab</option>
                      <option value="Engineering Lab">Engineering Lab</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Building *
                    </label>
                    <select
                      required
                      disabled={isViewMode}
                      value={formData.building}
                      onChange={(e) => setFormData({...formData, building: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="">Select Building</option>
                      <option value="IT Block">IT Block</option>
                      <option value="Science Block">Science Block</option>
                      <option value="Engineering Block">Engineering Block</option>
                      <option value="Research Center">Research Center</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      disabled={isViewMode}
                      value={formData.floor}
                      onChange={(e) => setFormData({...formData, floor: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      disabled={isViewMode}
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      required
                      disabled={isViewMode}
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                      <option value="renovation">Renovation</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lab Supervisor
                    </label>
                    <input
                      type="text"
                      disabled={isViewMode}
                      value={formData.supervisor}
                      onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Equipment Tab */}
            {activeTab === 'equipment' && (
              <div className="space-y-6">
                {!isViewMode && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Add Equipment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        placeholder="Equipment name"
                        value={newEquipment.name}
                        onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={newEquipment.quantity}
                        onChange={(e) => setNewEquipment({...newEquipment, quantity: parseInt(e.target.value)})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={newEquipment.status}
                        onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="working">Working</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="repair">Needs Repair</option>
                        <option value="calibration">Calibration</option>
                      </select>
                      <button
                        type="button"
                        onClick={addEquipment}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Equipment List</h4>
                  {formData.equipment.length > 0 ? (
                    <div className="space-y-3">
                      {formData.equipment.map((equipment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-900">{equipment.name}</h5>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                equipment.status === 'working' ? 'bg-green-100 text-green-800' :
                                equipment.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                equipment.status === 'repair' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {equipment.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>Quantity: {equipment.quantity}</span>
                              <span>Last Maintenance: {new Date(equipment.lastMaintenance).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {!isViewMode && (
                            <button
                              type="button"
                              onClick={() => removeEquipment(index)}
                              className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No equipment added yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Safety Tab */}
            {activeTab === 'safety' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Safety Information</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Ensure all safety protocols and certifications are up to date.
                      </p>
                    </div>
                  </div>
                </div>

                {lab?.safety && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Safety Inspection
                      </label>
                      <input
                        type="date"
                        disabled={isViewMode}
                        defaultValue={lab.safety.lastInspection}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Safety Incidents (This Year)
                      </label>
                      <input
                        type="number"
                        min="0"
                        disabled={isViewMode}
                        defaultValue={lab.safety.incidents}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Safety Certifications
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {lab.safety.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Current Schedule</h4>
                  {lab?.schedule && lab.schedule.length > 0 ? (
                    <div className="space-y-3">
                      {lab.schedule.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">{session.course}</p>
                              <p className="text-sm text-gray-600">{session.time} - {session.instructor}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No classes scheduled</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isViewMode && (
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
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
                {mode === 'add' ? 'Add Laboratory' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LabManagement;