// src/components/infrastructure/AssetManagement.jsx - University Asset Inventory
import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Monitor,
  Laptop,
  Printer,
  Camera,
  Microscope,
  Car,
  Calendar,
  DollarSign,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Package,
  Settings,
  Download,
  QrCode
} from 'lucide-react';

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock asset data
  const mockAssets = [
    {
      id: 'AST001',
      name: 'Dell OptiPlex 7090',
      category: 'Computer',
      subcategory: 'Desktop',
      brand: 'Dell',
      model: 'OptiPlex 7090',
      serialNumber: 'DL789123456',
      status: 'active',
      condition: 'good',
      location: 'Computer Lab 1',
      building: 'IT Block',
      room: 'CL001',
      purchaseDate: '2024-03-15',
      purchasePrice: 1200,
      currentValue: 900,
      warranty: {
        provider: 'Dell Inc.',
        expiryDate: '2027-03-15',
        type: 'Standard Warranty'
      },
      assignedTo: 'Computer Science Dept',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2026-02-01',
      specifications: {
        processor: 'Intel Core i7-11700',
        ram: '16GB DDR4',
        storage: '512GB SSD',
        os: 'Windows 11 Pro'
      }
    },
    {
      id: 'AST002',
      name: 'Epson EcoTank L3250',
      category: 'Office Equipment',
      subcategory: 'Printer',
      brand: 'Epson',
      model: 'EcoTank L3250',
      serialNumber: 'EP456789123',
      status: 'maintenance',
      condition: 'fair',
      location: 'Administrative Office',
      building: 'Admin Block',
      room: 'AO201',
      purchaseDate: '2023-09-20',
      purchasePrice: 300,
      currentValue: 180,
      warranty: {
        provider: 'Epson',
        expiryDate: '2025-09-20',
        type: 'Extended Warranty'
      },
      assignedTo: 'Administration',
      lastMaintenance: '2025-08-25',
      nextMaintenance: '2025-11-25',
      specifications: {
        type: 'Inkjet',
        connectivity: 'Wi-Fi, USB',
        functions: 'Print, Scan, Copy'
      }
    },
    {
      id: 'AST003',
      name: 'Nikon D850',
      category: 'Electronics',
      subcategory: 'Camera',
      brand: 'Nikon',
      model: 'D850',
      serialNumber: 'NK987654321',
      status: 'active',
      condition: 'excellent',
      location: 'Media Lab',
      building: 'Arts Block',
      room: 'ML101',
      purchaseDate: '2024-01-10',
      purchasePrice: 3000,
      currentValue: 2400,
      warranty: {
        provider: 'Nikon',
        expiryDate: '2026-01-10',
        type: 'International Warranty'
      },
      assignedTo: 'Media Studies Dept',
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2026-01-15',
      specifications: {
        resolution: '45.7 MP',
        sensor: 'Full Frame CMOS',
        iso: '64-25600',
        video: '4K UHD'
      }
    },
    {
      id: 'AST004',
      name: 'Honda Civic 2023',
      category: 'Vehicle',
      subcategory: 'Car',
      brand: 'Honda',
      model: 'Civic',
      serialNumber: 'HC2023001',
      status: 'active',
      condition: 'excellent',
      location: 'Main Parking',
      building: 'Campus Grounds',
      room: 'P001',
      purchaseDate: '2023-05-15',
      purchasePrice: 25000,
      currentValue: 22000,
      warranty: {
        provider: 'Honda',
        expiryDate: '2026-05-15',
        type: 'Manufacturer Warranty'
      },
      assignedTo: 'Administration',
      lastMaintenance: '2025-08-10',
      nextMaintenance: '2025-11-10',
      specifications: {
        engine: '2.0L 4-Cylinder',
        fuel: 'Gasoline',
        transmission: 'CVT',
        mileage: '15,420 km'
      }
    }
  ];

  const categories = ['all', 'Computer', 'Office Equipment', 'Electronics', 'Vehicle', 'Furniture', 'Laboratory Equipment'];
  const statuses = ['all', 'active', 'maintenance', 'retired', 'disposed', 'missing'];
  const locations = ['all', 'Computer Lab 1', 'Administrative Office', 'Media Lab', 'Main Parking', 'Chemistry Lab'];
  const conditions = ['excellent', 'good', 'fair', 'poor'];

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAssets(mockAssets);
      } catch (error) {
        console.error('Failed to load assets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || asset.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-yellow-500" />;
      case 'retired': return <Clock className="h-5 w-5 text-gray-500" />;
      case 'disposed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'missing': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      case 'disposed': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Computer': return <Monitor className="h-5 w-5" />;
      case 'Office Equipment': return <Printer className="h-5 w-5" />;
      case 'Electronics': return <Camera className="h-5 w-5" />;
      case 'Vehicle': return <Car className="h-5 w-5" />;
      case 'Laboratory Equipment': return <Microscope className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const calculateDepreciation = (purchasePrice, purchaseDate, currentValue) => {
    const years = (new Date() - new Date(purchaseDate)) / (1000 * 60 * 60 * 24 * 365);
    const totalDepreciation = purchasePrice - currentValue;
    const depreciationRate = (totalDepreciation / purchasePrice) * 100;
    return { totalDepreciation, depreciationRate: depreciationRate.toFixed(1) };
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
          <h2 className="text-2xl font-bold text-gray-900">Asset Management</h2>
          <p className="text-gray-600">Track and manage university assets and inventory</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <QrCode className="mr-2 h-4 w-4" />
            Scan Asset
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button
            onClick={() => { setModalMode('add'); setSelectedAsset(null); setShowModal(true); }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets by name, serial number, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
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

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Asset Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold">{assets.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Across {categories.length - 1} categories</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Assets</p>
              <p className="text-2xl font-bold">{assets.filter(a => a.status === 'active').length}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">{((assets.filter(a => a.status === 'active').length / assets.length) * 100).toFixed(1)}% of total</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">
                ${assets.reduce((sum, a) => sum + a.currentValue, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-purple-600">Current market value</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Maintenance Due</p>
              <p className="text-2xl font-bold">
                {assets.filter(a => new Date(a.nextMaintenance) <= new Date(Date.now() + 30*24*60*60*1000)).length}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-yellow-600">Next 30 days</span>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const depreciation = calculateDepreciation(asset.purchasePrice, asset.purchaseDate, asset.currentValue);
          
          return (
            <div key={asset.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Asset Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {getCategoryIcon(asset.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{asset.name}</h3>
                      <p className="text-sm text-gray-600">{asset.brand} {asset.model}</p>
                      <p className="text-xs text-gray-500">ID: {asset.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(asset.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(asset.condition)}`}>
                      {asset.condition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Asset Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{asset.location}, {asset.building}</span>
                  </div>

                  {/* Value Information */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Purchase Price</p>
                        <p className="font-semibold">${asset.purchasePrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Value</p>
                        <p className="font-semibold">${asset.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Depreciation</p>
                        <p className="font-semibold text-red-600">-{depreciation.depreciationRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Age</p>
                        <p className="font-semibold">
                          {Math.floor((new Date() - new Date(asset.purchaseDate)) / (1000 * 60 * 60 * 24 / 365 * 12))} months
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warranty & Maintenance */}
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty:</span>
                      <span className={`font-medium ${
                        new Date(asset.warranty.expiryDate) > new Date() ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {new Date(asset.warranty.expiryDate) > new Date() ? 'Valid' : 'Expired'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Maintenance:</span>
                      <span className={`font-medium ${
                        new Date(asset.nextMaintenance) <= new Date(Date.now() + 30*24*60*60*1000) ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {new Date(asset.nextMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Serial Number */}
                  <div className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
                    S/N: {asset.serialNumber}
                  </div>

                  {/* Assigned To */}
                  <div className="text-sm">
                    <span className="text-gray-600">Assigned to:</span>
                    <span className="ml-2 font-medium text-blue-600">{asset.assignedTo}</span>
                  </div>
                </div>
              </div>

              {/* Asset Actions */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { setModalMode('view'); setSelectedAsset(asset); setShowModal(true); }}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <QrCode className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => { setModalMode('edit'); setSelectedAsset(asset); setShowModal(true); }}
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
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No assets found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new asset.
          </p>
          <button
            onClick={() => { setModalMode('add'); setSelectedAsset(null); setShowModal(true); }}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Asset
          </button>
        </div>
      )}

      {/* Asset Modal would go here - simplified for this example */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {modalMode === 'add' ? 'Add New Asset' : 
                 modalMode === 'edit' ? 'Edit Asset' : 'Asset Details'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Asset management form would be implemented here...</p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                {modalMode !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalMode === 'add' ? 'Add Asset' : 'Save Changes'}
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

export default AssetManagement;