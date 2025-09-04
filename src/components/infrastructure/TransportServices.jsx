// src/components/infrastructure/TransportServices.jsx - Campus Transportation Management
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Bus,
  Car,
  Truck,
  Clock,
  Users,
  Map,
  Fuel,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Navigation,
  Settings,
  Phone,
  Wrench,
  TrendingUp
} from 'lucide-react';

const TransportServices = () => {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('vehicles');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock vehicle data
  const mockVehicles = [
    {
      id: 'VH001',
      name: 'Campus Shuttle 1',
      type: 'Bus',
      plateNumber: 'UNI-001',
      capacity: 40,
      status: 'active',
      driver: 'John Smith',
      driverPhone: '+1-555-0101',
      route: 'Main Campus Loop',
      fuelLevel: 85,
      mileage: 45250,
      lastMaintenance: '2025-08-20',
      nextMaintenance: '2025-09-20',
      insurance: {
        provider: 'Campus Insurance Co.',
        expiryDate: '2025-12-31',
        policyNumber: 'POL-001-2025'
      },
      schedule: [
        { time: '07:30', location: 'Main Gate', passengers: 15 },
        { time: '08:00', location: 'Library', passengers: 22 },
        { time: '08:30', location: 'Science Block', passengers: 18 }
      ]
    },
    {
      id: 'VH002',
      name: 'Staff Vehicle 1',
      type: 'Car',
      plateNumber: 'UNI-002',
      capacity: 5,
      status: 'maintenance',
      driver: 'Sarah Wilson',
      driverPhone: '+1-555-0102',
      route: 'Administrative',
      fuelLevel: 60,
      mileage: 32100,
      lastMaintenance: '2025-09-01',
      nextMaintenance: '2025-10-01',
      insurance: {
        provider: 'Campus Insurance Co.',
        expiryDate: '2025-11-30',
        policyNumber: 'POL-002-2025'
      },
      schedule: []
    },
    {
      id: 'VH003',
      name: 'Maintenance Truck',
      type: 'Truck',
      plateNumber: 'UNI-003',
      capacity: 3,
      status: 'active',
      driver: 'Mike Johnson',
      driverPhone: '+1-555-0103',
      route: 'Campus Maintenance',
      fuelLevel: 40,
      mileage: 67890,
      lastMaintenance: '2025-08-15',
      nextMaintenance: '2025-09-15',
      insurance: {
        provider: 'Campus Insurance Co.',
        expiryDate: '2026-01-15',
        policyNumber: 'POL-003-2025'
      },
      schedule: [
        { time: '09:00', location: 'Facilities Depot', passengers: 2 }
      ]
    }
  ];

  // Mock route data
  const mockRoutes = [
    {
      id: 'RT001',
      name: 'Main Campus Loop',
      type: 'Shuttle',
      status: 'active',
      distance: '3.2 km',
      duration: '15 minutes',
      frequency: '15 minutes',
      stops: [
        { name: 'Main Gate', time: '07:30', coordinates: { lat: 40.7128, lng: -74.0060 } },
        { name: 'Library', time: '07:37', coordinates: { lat: 40.7135, lng: -74.0055 } },
        { name: 'Science Block', time: '07:42', coordinates: { lat: 40.7140, lng: -74.0050 } },
        { name: 'Cafeteria', time: '07:45', coordinates: { lat: 40.7145, lng: -74.0045 } }
      ],
      operatingHours: '07:00 - 22:00',
      assignedVehicles: ['VH001'],
      ridership: {
        daily: 320,
        weekly: 1850,
        monthly: 7200
      }
    },
    {
      id: 'RT002',
      name: 'Dormitory Express',
      type: 'Shuttle',
      status: 'active',
      distance: '2.1 km',
      duration: '8 minutes',
      frequency: '20 minutes',
      stops: [
        { name: 'Dormitory A', time: '07:00', coordinates: { lat: 40.7120, lng: -74.0070 } },
        { name: 'Dormitory B', time: '07:03', coordinates: { lat: 40.7125, lng: -74.0065 } },
        { name: 'Main Campus', time: '07:08', coordinates: { lat: 40.7130, lng: -74.0060 } }
      ],
      operatingHours: '06:30 - 23:00',
      assignedVehicles: ['VH001'],
      ridership: {
        daily: 180,
        weekly: 1260,
        monthly: 5040
      }
    }
  ];

  const vehicleTypes = ['all', 'Bus', 'Car', 'Truck', 'Van'];
  const statuses = ['all', 'active', 'maintenance', 'inactive', 'repair'];

  useEffect(() => {
    const loadTransportData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setVehicles(mockVehicles);
        setRoutes(mockRoutes);
      } catch (error) {
        console.error('Failed to load transport data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransportData();
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || vehicle.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance': return <Wrench className="h-5 w-5 text-yellow-500" />;
      case 'inactive': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'repair': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'repair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Bus': return <Bus className="h-5 w-5" />;
      case 'Car': return <Car className="h-5 w-5" />;
      case 'Truck': return <Truck className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  const getFuelLevelColor = (level) => {
    if (level >= 70) return 'text-green-600 bg-green-100';
    if (level >= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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
          <h2 className="text-2xl font-bold text-gray-900">Transport Services</h2>
          <p className="text-gray-600">Manage campus transportation and vehicle fleet</p>
        </div>
        
        <button
          onClick={() => { setModalMode('add'); setSelectedItem(null); setShowModal(true); }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab === 'vehicles' ? 'Vehicle' : 'Route'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'vehicles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Car className="mr-2 h-4 w-4" />
              Vehicles ({vehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'routes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Map className="mr-2 h-4 w-4" />
              Routes ({routes.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
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
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {activeTab === 'vehicles' && (
              <div className="flex items-center gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {vehicleTypes.map(type => (
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
            )}
          </div>

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              {/* Fleet Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Car className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-blue-600">Total Vehicles</p>
                      <p className="text-2xl font-bold text-blue-900">{vehicles.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm text-green-600">Active</p>
                      <p className="text-2xl font-bold text-green-900">{vehicles.filter(v => v.status === 'active').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Wrench className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm text-yellow-600">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-900">{vehicles.filter(v => v.status === 'maintenance').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm text-purple-600">Total Capacity</p>
                      <p className="text-2xl font-bold text-purple-900">{vehicles.reduce((sum, v) => sum + v.capacity, 0)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicles List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    {/* Vehicle Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          {getVehicleIcon(vehicle.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                          <p className="text-sm text-gray-600">{vehicle.plateNumber} • {vehicle.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(vehicle.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Capacity:</span>
                          <span className="ml-2 font-medium">{vehicle.capacity} people</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Mileage:</span>
                          <span className="ml-2 font-medium">{vehicle.mileage.toLocaleString()} km</span>
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{vehicle.driver}</p>
                            <p className="text-xs text-gray-600">Driver</p>
                          </div>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Phone className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Fuel Level */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fuel Level:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                vehicle.fuelLevel >= 70 ? 'bg-green-500' :
                                vehicle.fuelLevel >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium px-2 py-1 rounded ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                            {vehicle.fuelLevel}%
                          </span>
                        </div>
                      </div>

                      {/* Maintenance */}
                      <div className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Maintenance:</span>
                          <span className="font-medium">{new Date(vehicle.nextMaintenance).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Current Route */}
                      <div className="border-t pt-3">
                        <p className="text-xs text-gray-600">Current Route:</p>
                        <p className="text-sm font-medium text-blue-600">{vehicle.route}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <button
                        onClick={() => { setModalMode('view'); setSelectedItem(vehicle); setShowModal(true); }}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <Navigation className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => { setModalMode('edit'); setSelectedItem(vehicle); setShowModal(true); }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div className="space-y-6">
              {/* Route Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Map className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm text-blue-600">Active Routes</p>
                      <p className="text-2xl font-bold text-blue-900">{routes.filter(r => r.status === 'active').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm text-green-600">Daily Riders</p>
                      <p className="text-2xl font-bold text-green-900">
                        {routes.reduce((sum, r) => sum + r.ridership.daily, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm text-purple-600">Total Stops</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {routes.reduce((sum, r) => sum + r.stops.length, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Routes List */}
              <div className="space-y-4">
                {filteredRoutes.map((route) => (
                  <div key={route.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                        <p className="text-sm text-gray-600">{route.type} • {route.distance} • {route.duration}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Route Details */}
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-gray-600">Operating Hours:</span>
                          <span className="ml-2 font-medium">{route.operatingHours}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Frequency:</span>
                          <span className="ml-2 font-medium">Every {route.frequency}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Assigned Vehicles:</span>
                          <span className="ml-2 font-medium">{route.assignedVehicles.length}</span>
                        </div>
                      </div>

                      {/* Ridership Stats */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">Ridership</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-blue-50 rounded-lg p-2">
                            <p className="text-xs text-blue-600">Daily</p>
                            <p className="font-bold text-blue-900">{route.ridership.daily}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-2">
                            <p className="text-xs text-green-600">Weekly</p>
                            <p className="font-bold text-green-900">{route.ridership.weekly}</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-2">
                            <p className="text-xs text-purple-600">Monthly</p>
                            <p className="font-bold text-purple-900">{route.ridership.monthly}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stops */}
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Stops ({route.stops.length})</h4>
                      <div className="flex items-center gap-4 overflow-x-auto pb-2">
                        {route.stops.map((stop, index) => (
                          <div key={index} className="flex-shrink-0 bg-gray-50 rounded-lg p-3 min-w-[120px]">
                            <div className="flex items-center mb-1">
                              <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs font-medium text-gray-900">{stop.name}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-600">{stop.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View Route Map
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <Settings className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
                      <p className="text-blue-100">Fleet Utilization</p>
                      <p className="text-3xl font-bold">87%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-200" />
                  </div>
                  <p className="text-sm text-blue-100 mt-2">+5% from last month</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Fuel Efficiency</p>
                      <p className="text-3xl font-bold">12.5L</p>
                    </div>
                    <Fuel className="h-8 w-8 text-green-200" />
                  </div>
                  <p className="text-sm text-green-100 mt-2">Per 100km average</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">On-Time Rate</p>
                      <p className="text-3xl font-bold">94%</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-200" />
                  </div>
                  <p className="text-sm text-purple-100 mt-2">Punctuality score</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Maintenance Cost</p>
                      <p className="text-3xl font-bold">$2.1K</p>
                    </div>
                    <Wrench className="h-8 w-8 text-orange-200" />
                  </div>
                  <p className="text-sm text-orange-100 mt-2">This month</p>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Ridership Trend</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Performance</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Performance metrics chart</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { time: '2 hours ago', event: 'Campus Shuttle 1 completed maintenance check', type: 'maintenance' },
                    { time: '4 hours ago', event: 'New route "Evening Express" added to schedule', type: 'route' },
                    { time: '1 day ago', event: 'Staff Vehicle 1 fuel level below 30%', type: 'alert' },
                    { time: '2 days ago', event: 'Monthly ridership report generated', type: 'report' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          activity.type === 'maintenance' ? 'bg-yellow-500' :
                          activity.type === 'route' ? 'bg-green-500' :
                          activity.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
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

      {/* Transport Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'add' ? `Add New ${activeTab === 'vehicles' ? 'Vehicle' : 'Route'}` : 
                 modalMode === 'edit' ? `Edit ${activeTab === 'vehicles' ? 'Vehicle' : 'Route'}` : 
                 `${activeTab === 'vehicles' ? 'Vehicle' : 'Route'} Details`}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-500">
                {activeTab === 'vehicles' ? 'Vehicle' : 'Route'} management form would be implemented here...
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                {modalMode !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalMode === 'add' ? `Add ${activeTab === 'vehicles' ? 'Vehicle' : 'Route'}` : 'Save Changes'}
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

export default TransportServices;