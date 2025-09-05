// src/components/graduation/GraduationRequirements.jsx - Graduation Requirements Management Component

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ClipboardListIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const GraduationRequirements = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data for programs and requirements
  const mockPrograms = [
    {
      id: 'CS_BS',
      name: 'Computer Science',
      degree: 'Bachelor of Science',
      department: 'Computer Science',
      totalCredits: 120,
      minimumGPA: 2.0,
      residencyRequirement: 30,
      lastUpdated: '2024-01-15',
      status: 'active'
    },
    {
      id: 'BUS_BBA',
      name: 'Business Administration',
      degree: 'Bachelor of Business Administration',
      department: 'Business',
      totalCredits: 120,
      minimumGPA: 2.5,
      residencyRequirement: 30,
      lastUpdated: '2024-01-10',
      status: 'active'
    },
    {
      id: 'BIO_BS',
      name: 'Biology',
      degree: 'Bachelor of Science',
      department: 'Biology',
      totalCredits: 120,
      minimumGPA: 2.0,
      residencyRequirement: 30,
      lastUpdated: '2024-01-12',
      status: 'active'
    }
  ];

  const mockRequirements = {
    'CS_BS': [
      {
        id: 'REQ001',
        category: 'Core Courses',
        title: 'Programming Fundamentals',
        description: 'Complete CS 101, CS 201, CS 301',
        courses: ['CS 101: Introduction to Programming', 'CS 201: Data Structures', 'CS 301: Algorithms'],
        credits: 12,
        type: 'course-specific',
        mandatory: true,
        prerequisites: [],
        status: 'active'
      },
      {
        id: 'REQ002',
        category: 'Core Courses',
        title: 'Mathematics Requirements',
        description: 'Complete required mathematics courses',
        courses: ['MATH 201: Calculus I', 'MATH 202: Calculus II', 'MATH 301: Discrete Mathematics'],
        credits: 12,
        type: 'course-specific',
        mandatory: true,
        prerequisites: [],
        status: 'active'
      },
      {
        id: 'REQ003',
        category: 'General Education',
        title: 'Liberal Arts Electives',
        description: 'Complete 18 credits from approved liberal arts courses',
        courses: [],
        credits: 18,
        type: 'credit-based',
        mandatory: true,
        prerequisites: [],
        status: 'active'
      },
      {
        id: 'REQ004',
        category: 'Major Electives',
        title: 'Computer Science Electives',
        description: 'Complete 15 credits of upper-level CS courses',
        courses: [],
        credits: 15,
        type: 'credit-based',
        mandatory: true,
        prerequisites: ['REQ001'],
        status: 'active'
      },
      {
        id: 'REQ005',
        category: 'Capstone',
        title: 'Senior Capstone Project',
        description: 'Complete CS 495: Senior Capstone',
        courses: ['CS 495: Senior Capstone Project'],
        credits: 3,
        type: 'course-specific',
        mandatory: true,
        prerequisites: ['REQ001', 'REQ004'],
        status: 'active'
      }
    ]
  };

  const categories = ['all', 'Core Courses', 'General Education', 'Major Electives', 'Capstone', 'Other'];
  const requirementTypes = ['course-specific', 'credit-based', 'gpa-based', 'other'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPrograms(mockPrograms);
        setSelectedProgram(mockPrograms[0]);
        setRequirements(mockRequirements[mockPrograms[0].id] || []);
      } catch (error) {
        console.error('Error loading graduation requirements:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedProgram) {
      setRequirements(mockRequirements[selectedProgram.id] || []);
    }
  }, [selectedProgram]);

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || req.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddRequirement = (newRequirement) => {
    const requirement = {
      id: `REQ${Date.now()}`,
      ...newRequirement,
      status: 'active'
    };
    setRequirements([...requirements, requirement]);
    setShowAddModal(false);
  };

  const handleEditRequirement = (updatedRequirement) => {
    setRequirements(requirements.map(req => 
      req.id === updatedRequirement.id ? updatedRequirement : req
    ));
    setShowEditModal(false);
    setEditingRequirement(null);
  };

  const handleDeleteRequirement = (requirementId) => {
    if (window.confirm('Are you sure you want to delete this requirement?')) {
      setRequirements(requirements.filter(req => req.id !== requirementId));
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Core Courses': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'General Education': return 'bg-green-100 text-green-800 border-green-200';
      case 'Major Electives': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Capstone': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course-specific': return <BookOpenIcon className="h-4 w-4" />;
      case 'credit-based': return <AcademicCapIcon className="h-4 w-4" />;
      case 'gpa-based': return <CheckCircleIcon className="h-4 w-4" />;
      default: return <ClipboardListIcon className="h-4 w-4" />;
    }
  };

  const RequirementModal = ({ isOpen, onClose, onSave, requirement = null, isEdit = false }) => {
    const [formData, setFormData] = useState({
      category: '',
      title: '',
      description: '',
      courses: [],
      credits: 0,
      type: 'course-specific',
      mandatory: true,
      prerequisites: [],
      newCourse: ''
    });

    useEffect(() => {
      if (requirement && isEdit) {
        setFormData({
          ...requirement,
          newCourse: ''
        });
      } else {
        setFormData({
          category: '',
          title: '',
          description: '',
          courses: [],
          credits: 0,
          type: 'course-specific',
          mandatory: true,
          prerequisites: [],
          newCourse: ''
        });
      }
    }, [requirement, isEdit, isOpen]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const { newCourse, ...dataToSave } = formData;
      onSave(dataToSave);
    };

    const addCourse = () => {
      if (formData.newCourse.trim()) {
        setFormData({
          ...formData,
          courses: [...formData.courses, formData.newCourse.trim()],
          newCourse: ''
        });
      }
    };

    const removeCourse = (index) => {
      setFormData({
        ...formData,
        courses: formData.courses.filter((_, i) => i !== index)
      });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? 'Edit Requirement' : 'Add New Requirement'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {requirementTypes.map(type => (
                    <option key={type} value={type}>
                      {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter requirement title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter requirement description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credits Required</label>
              <input
                type="number"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                min="0"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter credit hours"
              />
            </div>

            {formData.type === 'course-specific' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Courses</label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.newCourse}
                      onChange={(e) => setFormData({ ...formData, newCourse: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter course code and name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCourse())}
                    />
                    <button
                      type="button"
                      onClick={addCourse}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {formData.courses.length > 0 && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm">{course}</span>
                          <button
                            type="button"
                            onClick={() => removeCourse(index)}
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
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="mandatory"
                checked={formData.mandatory}
                onChange={(e) => setFormData({ ...formData, mandatory: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="mandatory" className="ml-2 text-sm text-gray-700">
                This is a mandatory requirement
              </label>
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
                {isEdit ? 'Update Requirement' : 'Add Requirement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Graduation Requirements</h2>
          <p className="text-gray-600">Manage degree requirements and academic standards</p>
        </div>
        {hasPermission('graduation.write') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Requirement</span>
          </button>
        )}
      </div>

      {/* Program Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Program</h3>
          <div className="text-sm text-gray-500">
            Last updated: {selectedProgram?.lastUpdated && new Date(selectedProgram.lastUpdated).toLocaleDateString()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setSelectedProgram(program)}
              className={`p-4 border rounded-lg text-left transition-colors duration-150 ${
                selectedProgram?.id === program.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{program.name}</h4>
                  <p className="text-sm text-gray-600">{program.degree}</p>
                  <p className="text-sm text-gray-500">{program.totalCredits} credits • Min GPA: {program.minimumGPA}</p>
                </div>
                <AcademicCapIcon className={`h-6 w-6 ${
                  selectedProgram?.id === program.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProgram && (
        <>
          {/* Program Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedProgram.name} - {selectedProgram.degree}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Total Credits:</span>
                <span className="ml-2 text-gray-900">{selectedProgram.totalCredits}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Minimum GPA:</span>
                <span className="ml-2 text-gray-900">{selectedProgram.minimumGPA}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Residency Requirement:</span>
                <span className="ml-2 text-gray-900">{selectedProgram.residencyRequirement} credits</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Department:</span>
                <span className="ml-2 text-gray-900">{selectedProgram.department}</span>
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
                    placeholder="Search requirements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Requirements List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Requirements ({filteredRequirements.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredRequirements.map((requirement) => (
                <div key={requirement.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(requirement.category)}`}>
                          {requirement.category}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          {getTypeIcon(requirement.type)}
                          <span className="ml-1">{requirement.type.replace('-', ' ')}</span>
                        </span>
                        {requirement.mandatory && (
                          <span className="inline-flex items-center text-xs text-red-600">
                            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                            Mandatory
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{requirement.title}</h4>
                      <p className="text-gray-600 mb-3">{requirement.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Credits Required:</span>
                          <span className="ml-2 text-gray-900">{requirement.credits}</span>
                        </div>
                        {requirement.courses && requirement.courses.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-700">Required Courses:</span>
                            <div className="mt-1">
                              {requirement.courses.slice(0, 2).map((course, index) => (
                                <div key={index} className="text-gray-900">• {course}</div>
                              ))}
                              {requirement.courses.length > 2 && (
                                <div className="text-gray-500">• +{requirement.courses.length - 2} more courses</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {hasPermission('graduation.write') && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setEditingRequirement(requirement);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRequirement(requirement.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredRequirements.length === 0 && (
              <div className="text-center py-12">
                <ClipboardListIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requirements found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or add a new requirement.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Requirement Modal */}
      <RequirementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddRequirement}
      />

      {/* Edit Requirement Modal */}
      <RequirementModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingRequirement(null);
        }}
        onSave={handleEditRequirement}
        requirement={editingRequirement}
        isEdit={true}
      />
    </div>
  );
};

export default GraduationRequirements;