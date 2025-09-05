// src/components/settings/AcademicYear.jsx - Academic Calendar Configuration
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  BookOpen,
  GraduationCap,
  Users,
  Eye,
  Copy
} from 'lucide-react';

const AcademicYear = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit, view
  const [selectedYear, setSelectedYear] = useState(null);

  // Mock academic year data
  const mockAcademicYears = [
    {
      id: 'AY2024-2025',
      name: '2024-2025',
      startDate: '2024-08-15',
      endDate: '2025-05-15',
      status: 'current',
      semesters: [
        {
          id: 'FALL2024',
          name: 'Fall 2024',
          startDate: '2024-08-15',
          endDate: '2024-12-15',
          type: 'regular',
          status: 'completed'
        },
        {
          id: 'SPRING2025',
          name: 'Spring 2025',
          startDate: '2025-01-15',
          endDate: '2025-05-15',
          type: 'regular',
          status: 'active'
        },
        {
          id: 'SUMMER2025',
          name: 'Summer 2025',
          startDate: '2025-06-01',
          endDate: '2025-08-10',
          type: 'summer',
          status: 'upcoming'
        }
      ],
      holidays: [
        {
          id: 'THANKSGIVING2024',
          name: 'Thanksgiving Break',
          startDate: '2024-11-28',
          endDate: '2024-11-29',
          type: 'holiday'
        },
        {
          id: 'WINTER2024',
          name: 'Winter Break',
          startDate: '2024-12-16',
          endDate: '2025-01-14',
          type: 'break'
        },
        {
          id: 'SPRING_BREAK2025',
          name: 'Spring Break',
          startDate: '2025-03-10',
          endDate: '2025-03-14',
          type: 'break'
        }
      ],
      importantDates: [
        {
          id: 'REG_DEADLINE_FALL2024',
          name: 'Fall Registration Deadline',
          date: '2024-08-01',
          type: 'registration'
        },
        {
          id: 'GRADUATION2025',
          name: 'Graduation Ceremony',
          date: '2025-05-20',
          type: 'ceremony'
        }
      ]
    },
    {
      id: 'AY2025-2026',
      name: '2025-2026',
      startDate: '2025-08-20',
      endDate: '2026-05-20',
      status: 'upcoming',
      semesters: [
        {
          id: 'FALL2025',
          name: 'Fall 2025',
          startDate: '2025-08-20',
          endDate: '2025-12-20',
          type: 'regular',
          status: 'upcoming'
        },
        {
          id: 'SPRING2026',
          name: 'Spring 2026',
          startDate: '2026-01-20',
          endDate: '2026-05-20',
          type: 'regular',
          status: 'upcoming'
        }
      ],
      holidays: [],
      importantDates: []
    }
  ];

  useEffect(() => {
    const loadAcademicYears = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAcademicYears(mockAcademicYears);
        setCurrentYear(mockAcademicYears.find(year => year.status === 'current'));
      } catch (error) {
        console.error('Failed to load academic years:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAcademicYears();
  }, []);

  const handleSaveYear = async (yearData) => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (modalMode === 'add') {
        const newYear = {
          ...yearData,
          id: `AY${yearData.name}`,
          semesters: [],
          holidays: [],
          importantDates: []
        };
        setAcademicYears(prev => [...prev, newYear]);
      } else {
        setAcademicYears(prev => 
          prev.map(year => 
            year.id === selectedYear.id ? { ...year, ...yearData } : year
          )
        );
      }
      
      setShowYearModal(false);
      alert('Academic year saved successfully!');
    } catch (error) {
      console.error('Failed to save academic year:', error);
      alert('Failed to save academic year. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'upcoming': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-gray-500" />;
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      default: return 'bg-yellow-100 text-yellow-800';
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
          <h2 className="text-xl font-semibold text-gray-900">Academic Year Setup</h2>
          <p className="text-gray-600">Configure academic calendars and important dates</p>
        </div>
        
        <button
          onClick={() => {
            setModalMode('add');
            setSelectedYear(null);
            setShowYearModal(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Academic Year
        </button>
      </div>

      {/* Current Academic Year Overview */}
      {currentYear && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Current Academic Year</h3>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              {currentYear.name}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{new Date(currentYear.startDate).toLocaleDateString()} - {new Date(currentYear.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Semesters</p>
                  <p className="font-semibold">{currentYear.semesters.length} semesters</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Holidays</p>
                  <p className="font-semibold">{currentYear.holidays.length} holidays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Years List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Academic Years</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Academic Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semesters
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {academicYears.map((year) => (
                <tr key={year.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{year.name}</div>
                        <div className="text-sm text-gray-500">ID: {year.id}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(year.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {new Date(year.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(year.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(year.status)}`}>
                        {year.status}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{year.semesters.length} semesters</div>
                    <div className="text-sm text-gray-500">{year.holidays.length} holidays</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setModalMode('view');
                          setSelectedYear(year);
                          setShowYearModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setModalMode('edit');
                          setSelectedYear(year);
                          setShowYearModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this academic year?')) {
                            setAcademicYears(prev => prev.filter(y => y.id !== year.id));
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Year Modal */}
      {showYearModal && (
        <AcademicYearModal
          mode={modalMode}
          year={selectedYear}
          onClose={() => setShowYearModal(false)}
          onSave={handleSaveYear}
          saving={saving}
        />
      )}
    </div>
  );
};

// Academic Year Modal Component
const AcademicYearModal = ({ mode, year, onClose, onSave, saving }) => {
  const [formData, setFormData] = useState({
    name: year?.name || '',
    startDate: year?.startDate || '',
    endDate: year?.endDate || '',
    status: year?.status || 'upcoming'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === 'view';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add Academic Year' : 
             mode === 'edit' ? 'Edit Academic Year' : 'Academic Year Details'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Year Name *
              </label>
              <input
                type="text"
                disabled={isViewMode}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., 2025-2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                disabled={isViewMode}
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="upcoming">Upcoming</option>
                <option value="current">Current</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                disabled={isViewMode}
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                disabled={isViewMode}
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Semester Details (View Mode Only) */}
          {isViewMode && year?.semesters && year.semesters.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Semesters</h4>
              <div className="space-y-2">
                {year.semesters.map((semester) => (
                  <div key={semester.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{semester.name}</span>
                      <span className="ml-2 text-sm text-gray-600">
                        ({new Date(semester.startDate).toLocaleDateString()} - {new Date(semester.endDate).toLocaleDateString()})
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      semester.status === 'active' ? 'bg-green-100 text-green-800' :
                      semester.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {semester.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Holiday Details (View Mode Only) */}
          {isViewMode && year?.holidays && year.holidays.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Holidays & Breaks</h4>
              <div className="space-y-2">
                {year.holidays.map((holiday) => (
                  <div key={holiday.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">{holiday.name}</span>
                      <span className="ml-2 text-sm text-gray-600">
                        ({new Date(holiday.startDate).toLocaleDateString()} - {new Date(holiday.endDate).toLocaleDateString()})
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      holiday.type === 'holiday' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {holiday.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              {isViewMode ? 'Close' : 'Cancel'}
            </button>
            
            {!isViewMode && (
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <div className="flex items-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    {mode === 'add' ? 'Create' : 'Update'}
                  </div>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AcademicYear;