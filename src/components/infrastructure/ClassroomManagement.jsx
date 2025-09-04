// src/components/infrastructure/ClassroomManagement.jsx - Classroom Management
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Users,
  Monitor,
  Wifi,
  Volume2,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const ClassroomManagement = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit, view
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  // Mock classroom data
  const mockClassrooms = [
    {
      id: 'CR001',
      name: 'Main Hall A',
      building: 'Academic Block A',
      floor: 1,
      capacity: 150,
      type: 'Lecture Hall',
      status: 'available',
      equipment: ['Projector', 'Audio System', 'WiFi', 'Air Conditioning'],
      currentBooking: null,
      nextBooking: 'CS101 - 2:00 PM',
      utilizationRate: 85,
      lastMaintenance: '2025-08-15',
      features: {
        hasProjector: true,
        hasAudio: true,
        hasWifi: true,
        hasAirCon: true,
        hasWhiteboard: true,
        isAccessible: true
      }
    },
    {
      id: 'CR002',
      name: 'Computer Lab 1',
      building: 'IT Block',
      floor: 2,
      capacity: 40,
      type: 'Computer Lab',
      status: 'occupied',
      equipment: ['40 Computers', 'Projector', 'WiFi', 'Software License'],
      currentBooking: 'Programming Fundamentals - Prof. Smith',
      nextBooking: 'Database Design - 4:00 PM',
      utilizationRate: 92,
      lastMaintenance: '2025-08-20',
      features: {
        hasProjector: true,
        hasAudio: false,
        hasWifi: true,
        hasAirCon: true,
        hasWhiteboard: false,
        isAccessible: true
      }
    },
    {
      id: 'CR003',
      name: 'Seminar Room B',
      building: 'Academic Block B',
      floor: 3,
      capacity: 25,
      type: 'Seminar Room',
      status: 'maintenance',
      equipment: ['Interactive Board', 'Video Conferencing', 'WiFi'],
      currentBooking: null,
      nextBooking: null,
      utilizationRate: 65,
      lastMaintenance: '2025-09-01',
      features: {
        hasProjector: true,
        hasAudio: true,
        hasWifi: true,
        hasAirCon: false,
        hasWhiteboard: true,
        isAccessible: false
      }
    },
    {
      id: 'CR004',
      name: 'Chemistry Lab',
      building: 'Science Block',
      floor: 1,
      capacity: 30,
      type: 'Laboratory',
      status: 'available',
      equipment: ['Lab Equipment', 'Safety Systems', 'Ventilation'],
      currentBooking: null,
      nextBooking: 'Organic Chemistry - 10:00 AM',
      utilizationRate: 78,
      lastMaintenance: '2025-08-10',
      features: {
        hasProjector: false,
        hasAudio: false,
        hasWifi: true,
        hasAirCon: false,
        hasWhiteboard: true,
        isAccessible: true
      }
    }
  ];

  const buildings = ['all', 'Academic Block A', 'Academic Block B', 'IT Block', 'Science Block', 'Admin Block'];
  const statuses = ['all', 'available', 'occupied', 'maintenance', 'reserved'];

  useEffect(() => {
    const loadClassrooms = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setClassrooms(mockClassrooms);
      } catch (error) {
        console.error('Failed to load classrooms:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClassrooms();
  }, []);

  // Filter classrooms based on search and filters
  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBuilding = selectedBuilding === 'all' || classroom.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'all' || classroom.status === selectedStatus;
    
    return matchesSearch && matchesBuilding && matchesStatus;
  });

  const handleAddClassroom = () => {
    setModalMode('add');
    setSelectedClassroom(null);
    setShowModal(true);
  };

  const handleEditClassroom = (classroom) => {
    setModalMode('edit');
    setSelectedClassroom(classroom);
    setShowModal(true);
  };

  const handleViewClassroom = (classroom) => {
    setModalMode('view');
    setSelectedClassroom(classroom);
    setShowModal(true);
  };

  const handleDeleteClassroom = (classroomId) => {
    if (window.confirm('Are you sure you want to delete this classroom?')) {
      setClassrooms(classrooms.filter(c => c.id !== classroomId));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'occupied': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'maintenance': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'reserved': return <Clock className="h-5 w-5 text-blue-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classroom Management</h2>
          <p className="text-gray-600">Manage classroom facilities and resources</p>
        </div>
        
        <button
          onClick={handleAddClassroom}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Classroom
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search classrooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {buildings.map(building => (
                <option key={building} value={building}>
                  {building === 'all' ? 'All Buildings' : building}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity Range</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-20 px-2 py-1 border rounded" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-20 px-2 py-1 border rounded" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">All Types</option>
                  <option value="Lecture Hall">Lecture Hall</option>
                  <option value="Computer Lab">Computer Lab</option>
                  <option value="Seminar Room">Seminar Room</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" /> Projector
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" /> WiFi
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-1" /> A/C
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Classrooms</p>
              <p className="text-2xl font-bold">{classrooms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold">{classrooms.filter(c => c.status === 'available').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Use</p>
              <p className="text-2xl font-bold">{classrooms.filter(c => c.status === 'occupied').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Utilization</p>
              <p className="text-2xl font-bold">
                {Math.round(classrooms.reduce((sum, c) => sum + c.utilizationRate, 0) / classrooms.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <div key={classroom.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {classroom.building} - Floor {classroom.floor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(classroom.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(classroom.status)}`}>
                    {classroom.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Basic Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{classroom.type}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {classroom.capacity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Utilization:</span>
                  <span className="font-medium">{classroom.utilizationRate}%</span>
                </div>

                {/* Equipment */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {classroom.features.hasProjector && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        <Monitor className="h-3 w-3 mr-1" />
                        Projector
                      </span>
                    )}
                    {classroom.features.hasWifi && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        <Wifi className="h-3 w-3 mr-1" />
                        WiFi
                      </span>
                    )}
                    {classroom.features.hasAudio && (
                      <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        <Volume2 className="h-3 w-3 mr-1" />
                        Audio
                      </span>
                    )}
                  </div>
                </div>

                {/* Current Status */}
                <div className="border-t pt-4">
                  {classroom.currentBooking ? (
                    <div>
                      <p className="text-xs text-gray-600">Current:</p>
                      <p className="text-sm font-medium text-red-600">{classroom.currentBooking}</p>
                    </div>
                  ) : classroom.nextBooking ? (
                    <div>
                      <p className="text-xs text-gray-600">Next:</p>
                      <p className="text-sm font-medium text-blue-600">{classroom.nextBooking}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-green-600">Available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleViewClassroom(classroom)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClassroom(classroom)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClassroom(classroom.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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
      {filteredClassrooms.length === 0 && (
        <div className="text-center py-12">
          <Home className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classrooms found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new classroom.
          </p>
          <button
            onClick={handleAddClassroom}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Classroom
          </button>
        </div>
      )}

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <ClassroomModal
          mode={modalMode}
          classroom={selectedClassroom}
          onClose={() => setShowModal(false)}
          onSave={(classroomData) => {
            if (modalMode === 'add') {
              const newClassroom = {
                ...classroomData,
                id: 'CR' + String(classrooms.length + 1).padStart(3, '0'),
                utilizationRate: 0,
                status: 'available',
                currentBooking: null,
                nextBooking: null
              };
              setClassrooms([...classrooms, newClassroom]);
            } else if (modalMode === 'edit') {
              setClassrooms(classrooms.map(c => 
                c.id === selectedClassroom.id ? { ...c, ...classroomData } : c
              ));
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

// Classroom Modal Component
const ClassroomModal = ({ mode, classroom, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: classroom?.name || '',
    building: classroom?.building || '',
    floor: classroom?.floor || 1,
    capacity: classroom?.capacity || '',
    type: classroom?.type || 'Classroom',
    features: classroom?.features || {
      hasProjector: false,
      hasAudio: false,
      hasWifi: true,
      hasAirCon: false,
      hasWhiteboard: true,
      isAccessible: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'Add New Classroom' : 
                mode === 'edit' ? 'Edit Classroom' : 'Classroom Details';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom Name *
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
                <option value="Academic Block A">Academic Block A</option>
                <option value="Academic Block B">Academic Block B</option>
                <option value="IT Block">IT Block</option>
                <option value="Science Block">Science Block</option>
                <option value="Admin Block">Admin Block</option>
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type *
              </label>
              <select
                required
                disabled={isViewMode}
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="Classroom">Classroom</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Computer Lab">Computer Lab</option>
                <option value="Seminar Room">Seminar Room</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Conference Room">Conference Room</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Features & Equipment
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries({
                hasProjector: 'Projector',
                hasAudio: 'Audio System',
                hasWifi: 'WiFi',
                hasAirCon: 'Air Conditioning',
                hasWhiteboard: 'Whiteboard',
                isAccessible: 'Wheelchair Accessible'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    disabled={isViewMode}
                    checked={formData.features[key]}
                    onChange={(e) => setFormData({
                      ...formData,
                      features: {
                        ...formData.features,
                        [key]: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          {!isViewMode && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === 'add' ? 'Add Classroom' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClassroomManagement;