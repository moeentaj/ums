// src/components/graduation/GraduationCeremonies.jsx - Graduation Ceremonies Management Component

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const GraduationCeremonies = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [ceremonies, setCeremonies] = useState([]);
  const [filteredCeremonies, setFilteredCeremonies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCeremony, setSelectedCeremony] = useState(null);
  const [editingCeremony, setEditingCeremony] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');

  // Mock data for graduation ceremonies
  const mockCeremonies = [
    {
      id: 'GRAD001',
      title: 'Spring 2024 Commencement',
      date: '2024-05-18',
      time: '10:00',
      duration: '3 hours',
      location: 'University Stadium',
      capacity: 5000,
      registeredStudents: 847,
      description: 'Spring semester graduation ceremony for all undergraduate and graduate programs.',
      semester: 'Spring 2024',
      status: 'scheduled',
      programs: ['All Undergraduate', 'All Graduate'],
      speakers: ['Dr. Jane Smith - Keynote Speaker', 'Prof. Michael Johnson - Faculty Speaker'],
      organizingCommittee: ['Sarah Wilson', 'Robert Chen', 'Emily Davis'],
      budget: 75000,
      expenses: 45000,
      requirements: ['Academic regalia', 'Photography services', 'Audio/Visual equipment'],
      rehearsalDate: '2024-05-17',
      rehearsalTime: '14:00',
      liveStream: true,
      ticketsPerStudent: 6,
      createdDate: '2024-01-15',
      lastUpdated: '2024-03-10'
    },
    {
      id: 'GRAD002',
      title: 'Fall 2024 Commencement',
      date: '2024-12-15',
      time: '14:00',
      duration: '3 hours',
      location: 'Memorial Hall',
      capacity: 2500,
      registeredStudents: 423,
      description: 'Fall semester graduation ceremony.',
      semester: 'Fall 2024',
      status: 'planning',
      programs: ['All Undergraduate', 'Graduate - Masters Only'],
      speakers: ['TBD - Keynote Speaker'],
      organizingCommittee: ['Sarah Wilson', 'David Kim'],
      budget: 50000,
      expenses: 12000,
      requirements: ['Venue booking', 'Catering services', 'Security'],
      rehearsalDate: '2024-12-14',
      rehearsalTime: '16:00',
      liveStream: true,
      ticketsPerStudent: 4,
      createdDate: '2024-02-20',
      lastUpdated: '2024-03-05'
    },
    {
      id: 'GRAD003',
      title: 'Medical School Graduation',
      date: '2024-06-08',
      time: '15:00',
      duration: '2 hours',
      location: 'Medical Center Auditorium',
      capacity: 800,
      registeredStudents: 156,
      description: 'Special ceremony for Medical School graduates.',
      semester: 'Spring 2024',
      status: 'completed',
      programs: ['Medical School - MD', 'Medical School - PhD'],
      speakers: ['Dr. Patricia Adams - Dean of Medicine', 'Dr. James Mitchell - Alumni Speaker'],
      organizingCommittee: ['Lisa Thompson', 'Mark Rodriguez'],
      budget: 35000,
      expenses: 32000,
      requirements: ['White coat ceremony', 'Hippocratic oath recitation'],
      rehearsalDate: '2024-06-07',
      rehearsalTime: '17:00',
      liveStream: true,
      ticketsPerStudent: 8,
      createdDate: '2024-01-10',
      lastUpdated: '2024-06-09'
    }
  ];

  const statuses = ['all', 'planning', 'scheduled', 'completed', 'cancelled'];
  const semesters = ['all', 'Spring 2024', 'Fall 2024', 'Spring 2025'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCeremonies(mockCeremonies);
        setFilteredCeremonies(mockCeremonies);
      } catch (error) {
        console.error('Error loading ceremony data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = ceremonies.filter(ceremony => {
      const matchesSearch = ceremony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ceremony.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ceremony.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || ceremony.status === filterStatus;
      const matchesSemester = filterSemester === 'all' || ceremony.semester === filterSemester;

      return matchesSearch && matchesStatus && matchesSemester;
    });

    setFilteredCeremonies(filtered);
  }, [ceremonies, searchQuery, filterStatus, filterSemester]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planning': return <ClockIcon className="h-4 w-4" />;
      case 'scheduled': return <CalendarIcon className="h-4 w-4" />;
      case 'completed': return <CheckCircleIcon className="h-4 w-4" />;
      case 'cancelled': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleAddCeremony = (newCeremony) => {
    const ceremony = {
      id: `GRAD${Date.now()}`,
      ...newCeremony,
      registeredStudents: 0,
      expenses: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCeremonies([...ceremonies, ceremony]);
    setShowAddModal(false);
  };

  const handleEditCeremony = (updatedCeremony) => {
    setCeremonies(ceremonies.map(ceremony => 
      ceremony.id === updatedCeremony.id 
        ? { ...updatedCeremony, lastUpdated: new Date().toISOString().split('T')[0] }
        : ceremony
    ));
    setShowEditModal(false);
    setEditingCeremony(null);
  };

  const handleDeleteCeremony = (ceremonyId) => {
    if (window.confirm('Are you sure you want to delete this ceremony?')) {
      setCeremonies(ceremonies.filter(ceremony => ceremony.id !== ceremonyId));
    }
  };

  const CeremonyModal = ({ isOpen, onClose, onSave, ceremony = null, isEdit = false }) => {
    const [formData, setFormData] = useState({
      title: '',
      date: '',
      time: '',
      duration: '',
      location: '',
      capacity: 0,
      description: '',
      semester: '',
      status: 'planning',
      programs: [],
      speakers: [],
      organizingCommittee: [],
      budget: 0,
      requirements: [],
      rehearsalDate: '',
      rehearsalTime: '',
      liveStream: false,
      ticketsPerStudent: 4,
      newProgram: '',
      newSpeaker: '',
      newCommitteeMember: '',
      newRequirement: ''
    });

    useEffect(() => {
      if (ceremony && isEdit) {
        setFormData({
          ...ceremony,
          newProgram: '',
          newSpeaker: '',
          newCommitteeMember: '',
          newRequirement: ''
        });
      } else {
        setFormData({
          title: '',
          date: '',
          time: '',
          duration: '',
          location: '',
          capacity: 0,
          description: '',
          semester: '',
          status: 'planning',
          programs: [],
          speakers: [],
          organizingCommittee: [],
          budget: 0,
          requirements: [],
          rehearsalDate: '',
          rehearsalTime: '',
          liveStream: false,
          ticketsPerStudent: 4,
          newProgram: '',
          newSpeaker: '',
          newCommitteeMember: '',
          newRequirement: ''
        });
      }
    }, [ceremony, isEdit, isOpen]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const { newProgram, newSpeaker, newCommitteeMember, newRequirement, ...dataToSave } = formData;
      onSave(dataToSave);
    };

    const addToList = (listName, newItemField) => {
      const newItem = formData[newItemField].trim();
      if (newItem) {
        setFormData({
          ...formData,
          [listName]: [...formData[listName], newItem],
          [newItemField]: ''
        });
      }
    };

    const removeFromList = (listName, index) => {
      setFormData({
        ...formData,
        [listName]: formData[listName].filter((_, i) => i !== index)
      });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? 'Edit Ceremony' : 'Add New Ceremony'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ceremony Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ceremony title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Semester</option>
                  {semesters.slice(1).map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3 hours"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter venue location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum attendees"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter ceremony description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Programs</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.newProgram}
                      onChange={(e) => setFormData({ ...formData, newProgram: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add program"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('programs', 'newProgram'))}
                    />
                    <button
                      type="button"
                      onClick={() => addToList('programs', 'newProgram')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {formData.programs.length > 0 && (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {formData.programs.map((program, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <span>{program}</span>
                          <button
                            type="button"
                            onClick={() => removeFromList('programs', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Speakers</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.newSpeaker}
                      onChange={(e) => setFormData({ ...formData, newSpeaker: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add speaker"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('speakers', 'newSpeaker'))}
                    />
                    <button
                      type="button"
                      onClick={() => addToList('speakers', 'newSpeaker')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {formData.speakers.length > 0 && (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {formData.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <span>{speaker}</span>
                          <button
                            type="button"
                            onClick={() => removeFromList('speakers', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Total budget"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tickets Per Student</label>
                <input
                  type="number"
                  value={formData.ticketsPerStudent}
                  onChange={(e) => setFormData({ ...formData, ticketsPerStudent: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rehearsal Date</label>
                <input
                  type="date"
                  value={formData.rehearsalDate}
                  onChange={(e) => setFormData({ ...formData, rehearsalDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rehearsal Time</label>
                <input
                  type="time"
                  value={formData.rehearsalTime}
                  onChange={(e) => setFormData({ ...formData, rehearsalTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="liveStream"
                  checked={formData.liveStream}
                  onChange={(e) => setFormData({ ...formData, liveStream: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="liveStream" className="ml-2 text-sm text-gray-700">
                  Enable Live Streaming
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.slice(1).map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
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
                {isEdit ? 'Update Ceremony' : 'Create Ceremony'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CeremonyDetailsModal = ({ isOpen, onClose, ceremony }) => {
    if (!isOpen || !ceremony) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{ceremony.title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Programs</h4>
                <div className="space-y-1">
                  {ceremony.programs.map((program, index) => (
                    <div key={index} className="text-sm text-gray-600">• {program}</div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Speakers</h4>
                <div className="space-y-1">
                  {ceremony.speakers.map((speaker, index) => (
                    <div key={index} className="text-sm text-gray-600">• {speaker}</div>
                  ))}
                </div>
              </div>
            </div>

            {ceremony.organizingCommittee && ceremony.organizingCommittee.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Organizing Committee</h4>
                <div className="flex flex-wrap gap-2">
                  {ceremony.organizingCommittee.map((member, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ceremony.requirements && ceremony.requirements.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Requirements</h4>
                <div className="space-y-1">
                  {ceremony.requirements.map((requirement, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      {requirement}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
              <div>Created: {new Date(ceremony.createdDate).toLocaleDateString()}</div>
              <div>Last Updated: {new Date(ceremony.lastUpdated).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PrinterIcon className="h-4 w-4" />
              <span>Print Details</span>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const summaryStats = {
    totalCeremonies: filteredCeremonies.length,
    scheduled: filteredCeremonies.filter(c => c.status === 'scheduled').length,
    planning: filteredCeremonies.filter(c => c.status === 'planning').length,
    completed: filteredCeremonies.filter(c => c.status === 'completed').length,
    totalStudents: filteredCeremonies.reduce((sum, c) => sum + c.registeredStudents, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Graduation Ceremonies</h2>
          <p className="text-gray-600">Plan and manage graduation ceremonies and events</p>
        </div>
        {hasPermission('graduation.write') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Ceremony</span>
          </button>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{summaryStats.totalCeremonies}</div>
              <div className="text-sm text-gray-600">Total Ceremonies</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-green-600">{summaryStats.scheduled}</div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{summaryStats.planning}</div>
              <div className="text-sm text-gray-600">In Planning</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-purple-600">{summaryStats.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Students</div>
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
                placeholder="Search ceremonies..."
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
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {semesters.map(semester => (
                <option key={semester} value={semester}>
                  {semester === 'all' ? 'All Semesters' : semester}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ceremonies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCeremonies.map((ceremony) => (
          <div key={ceremony.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ceremony.status)}`}>
                  {getStatusIcon(ceremony.status)}
                  <span className="ml-1 capitalize">{ceremony.status}</span>
                </span>
                <span className="text-sm text-gray-500">{ceremony.semester}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{ceremony.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ceremony.description}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{new Date(ceremony.date).toLocaleDateString()} at {ceremony.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{ceremony.location}</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  <span>{ceremony.registeredStudents.toLocaleString()} / {ceremony.capacity.toLocaleString()} students</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Registration Progress</span>
                  <span>{Math.round((ceremony.registeredStudents / ceremony.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((ceremony.registeredStudents / ceremony.capacity) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Budget: ${ceremony.budget.toLocaleString()}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCeremony(ceremony);
                      setShowDetailsModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="View Details"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {hasPermission('graduation.write') && (
                    <>
                      <button
                        onClick={() => {
                          setEditingCeremony(ceremony);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600"
                        title="Edit Ceremony"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCeremony(ceremony.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                        title="Delete Ceremony"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCeremonies.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ceremonies found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new ceremony.</p>
        </div>
      )}

      {/* Add Ceremony Modal */}
      <CeremonyModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCeremony}
      />

      {/* Edit Ceremony Modal */}
      <CeremonyModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCeremony(null);
        }}
        onSave={handleEditCeremony}
        ceremony={editingCeremony}
        isEdit={true}
      />

      {/* Ceremony Details Modal */}
      <CeremonyDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedCeremony(null);
        }}
        ceremony={selectedCeremony}
      />
    </div>
  );
};

export default GraduationCeremonies;