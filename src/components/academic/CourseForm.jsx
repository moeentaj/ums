// src/components/academic/CourseForm.jsx - Complete Add/Edit Course Form
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockData, getCourseById } from '../../data/mockData';
import {
  Save,
  X,
  ArrowLeft,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  Check,
  Plus,
  Trash2,
  FileText,
  Award
} from 'lucide-react';

const CourseForm = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user, hasPermission } = useAuth();
  const isEditMode = !!courseId;

  // Form state
  const [formData, setFormData] = useState({
    // Basic Course Information
    code: '',
    name: '',
    description: '',
    department: '',
    level: 'Undergraduate',
    credits: 3,
    semester: 'Fall 2025',
    status: 'Active',
    
    // Instructor Information
    instructor: '',
    instructorId: '',
    instructorEmail: '',
    
    // Schedule Information
    schedule: {
      days: [],
      time: '',
      duration: 60
    },
    
    // Location and Capacity
    classroom: '',
    capacity: 30,
    enrolled: 0,
    waitlist: 0,
    
    // Course Requirements
    prerequisites: [],
    corequisites: [],
    
    // Course Materials
    textbooks: [],
    syllabus: '',
    
    // Assessment Structure
    assignments: [
      { name: 'Participation', weight: 10, description: 'Class participation and attendance' },
      { name: 'Assignments', weight: 30, description: 'Homework and projects' },
      { name: 'Midterm Exam', weight: 25, description: 'Midterm examination' },
      { name: 'Final Exam', weight: 35, description: 'Final examination' }
    ],
    
    // Grading Scale
    gradingScale: {
      'A+': 97, 'A': 93, 'A-': 90,
      'B+': 87, 'B': 83, 'B-': 80,
      'C+': 77, 'C': 73, 'C-': 70,
      'D+': 67, 'D': 63, 'D-': 60,
      'F': 0
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Configuration data
  const departments = [
    'Computer Science',
    'Business Administration', 
    'Engineering',
    'Mathematics',
    'Sciences',
    'Liberal Arts',
    'Medicine',
    'Law'
  ];

  const levels = ['Undergraduate', 'Graduate', 'Doctoral'];
  const semesters = ['Fall 2025', 'Spring 2026', 'Summer 2026'];
  const statusOptions = ['Active', 'Inactive', 'Cancelled', 'Planning'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Available instructors (from faculty data)
  const availableInstructors = mockData.faculty.map(faculty => ({
    id: faculty.id,
    name: faculty.name,
    email: faculty.email,
    department: faculty.department
  }));

  // Tab configuration
  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: BookOpen },
    { id: 'schedule', name: 'Schedule & Location', icon: Calendar },
    { id: 'requirements', name: 'Requirements', icon: FileText },
    { id: 'assessment', name: 'Assessment', icon: Award },
    { id: 'materials', name: 'Materials', icon: FileText }
  ];

  // Load course data for edit mode
  useEffect(() => {
    if (isEditMode) {
      loadCourseData(courseId);
    }
  }, [isEditMode, courseId]);

  const loadCourseData = async (id) => {
    try {
      setLoading(true);
      const courseData = getCourseById(id);
      
      if (!courseData) {
        navigate('/academics/courses');
        return;
      }

      // Map course data to form structure
      setFormData({
        code: courseData.code,
        name: courseData.name,
        description: courseData.description,
        department: courseData.department,
        level: courseData.level,
        credits: courseData.credits,
        semester: courseData.semester,
        status: courseData.status,
        
        instructor: courseData.instructor,
        instructorId: courseData.instructorId,
        instructorEmail: '',
        
        schedule: courseData.schedule || { days: [], time: '', duration: 60 },
        
        classroom: courseData.classroom,
        capacity: courseData.capacity,
        enrolled: courseData.enrolled,
        waitlist: courseData.waitlist || 0,
        
        prerequisites: courseData.prerequisites || [],
        corequisites: courseData.corequisites || [],
        
        textbooks: courseData.textbooks || [],
        syllabus: courseData.syllabus || '',
        
        assignments: courseData.assignments || [
          { name: 'Participation', weight: 10, description: 'Class participation and attendance' },
          { name: 'Assignments', weight: 30, description: 'Homework and projects' },
          { name: 'Midterm Exam', weight: 25, description: 'Midterm examination' },
          { name: 'Final Exam', weight: 35, description: 'Final examination' }
        ],
        
        gradingScale: courseData.gradingScale || {
          'A+': 97, 'A': 93, 'A-': 90,
          'B+': 87, 'B': 83, 'B-': 80,
          'C+': 77, 'C': 73, 'C-': 70,
          'D+': 67, 'D': 63, 'D-': 60,
          'F': 0
        }
      });
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle instructor selection
  const handleInstructorChange = (instructorId) => {
    const instructor = availableInstructors.find(i => i.id === instructorId);
    if (instructor) {
      setFormData(prev => ({
        ...prev,
        instructorId: instructor.id,
        instructor: instructor.name,
        instructorEmail: instructor.email
      }));
    }
  };

  // Handle schedule days change
  const handleScheduleDaysChange = (day, isChecked) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        days: isChecked 
          ? [...prev.schedule.days, day]
          : prev.schedule.days.filter(d => d !== day)
      }
    }));
  };

  // Handle prerequisites/corequisites
  const addPrerequisite = () => {
    setFormData(prev => ({
      ...prev,
      prerequisites: [...prev.prerequisites, '']
    }));
  };

  const removePrerequisite = (index) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }));
  };

  const updatePrerequisite = (index, value) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.map((prereq, i) => i === index ? value : prereq)
    }));
  };

  // Handle assignments
  const addAssignment = () => {
    setFormData(prev => ({
      ...prev,
      assignments: [...prev.assignments, { name: '', weight: 0, description: '' }]
    }));
  };

  const removeAssignment = (index) => {
    setFormData(prev => ({
      ...prev,
      assignments: prev.assignments.filter((_, i) => i !== index)
    }));
  };

  const updateAssignment = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      assignments: prev.assignments.map((assignment, i) => 
        i === index ? { ...assignment, [field]: value } : assignment
      )
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.code.trim()) newErrors.code = 'Course code is required';
    if (!formData.name.trim()) newErrors.name = 'Course name is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.instructor) newErrors.instructor = 'Instructor is required';
    if (!formData.classroom.trim()) newErrors.classroom = 'Classroom is required';
    
    // Schedule validation
    if (formData.schedule.days.length === 0) newErrors.scheduleDays = 'At least one day must be selected';
    if (!formData.schedule.time.trim()) newErrors.scheduleTime = 'Schedule time is required';
    
    // Capacity validation
    if (formData.capacity < 1) newErrors.capacity = 'Capacity must be at least 1';
    
    // Assignment weights validation
    const totalWeight = formData.assignments.reduce((sum, assignment) => sum + assignment.weight, 0);
    if (Math.abs(totalWeight - 100) > 0.1) {
      newErrors.assignments = 'Assignment weights must total 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSaveSuccess(false);
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving course:', formData);
      
      setSaveSuccess(true);
      setTimeout(() => {
        navigate('/academics/courses');
      }, 1000);

    } catch (error) {
      console.error('Error saving course:', error);
      setErrors({ submit: 'Failed to save course. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Render form sections
  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.code ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., CS-101"
          />
          {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credits
          </label>
          <select
            value={formData.credits}
            onChange={(e) => handleInputChange('credits', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6].map(credit => (
              <option key={credit} value={credit}>{credit} Credit{credit > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="e.g., Introduction to Computer Science"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the course objectives, topics covered, and learning outcomes..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.department ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            value={formData.level}
            onChange={(e) => handleInputChange('level', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semester
          </label>
          <select
            value={formData.semester}
            onChange={(e) => handleInputChange('semester', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructor <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.instructorId}
            onChange={(e) => handleInstructorChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.instructor ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Instructor</option>
            {availableInstructors
              .filter(instructor => instructor.department === formData.department || formData.department === '')
              .map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name} ({instructor.department})
                </option>
              ))
            }
          </select>
          {errors.instructor && <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>}
        </div>
      </div>
    </div>
  );

  const renderScheduleLocation = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Class Days <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-5 gap-3">
          {weekDays.map(day => (
            <label key={day} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.schedule.days.includes(day)}
                onChange={(e) => handleScheduleDaysChange(day, e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{day.slice(0, 3)}</span>
            </label>
          ))}
        </div>
        {errors.scheduleDays && <p className="mt-1 text-sm text-red-600">{errors.scheduleDays}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.schedule.time}
            onChange={(e) => handleInputChange('schedule.time', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.scheduleTime ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., 10:00 AM - 11:00 AM"
          />
          {errors.scheduleTime && <p className="mt-1 text-sm text-red-600">{errors.scheduleTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.schedule.duration}
            onChange={(e) => handleInputChange('schedule.duration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="30"
            max="240"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Classroom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.classroom}
            onChange={(e) => handleInputChange('classroom', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.classroom ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., CS Building 101"
          />
          {errors.classroom && <p className="mt-1 text-sm text-red-600">{errors.classroom}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacity
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.capacity ? 'border-red-300' : 'border-gray-300'
            }`}
            min="1"
            max="500"
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>
      </div>

      {isEditMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currently Enrolled
            </label>
            <input
              type="number"
              value={formData.enrolled}
              onChange={(e) => handleInputChange('enrolled', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waitlist Count
            </label>
            <input
              type="number"
              value={formData.waitlist}
              onChange={(e) => handleInputChange('waitlist', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">Prerequisites</label>
          <button
            type="button"
            onClick={addPrerequisite}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {formData.prerequisites.map((prereq, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={prereq}
                onChange={(e) => updatePrerequisite(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CS-100"
              />
              <button
                type="button"
                onClick={() => removePrerequisite(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {formData.prerequisites.length === 0 && (
            <p className="text-sm text-gray-500 italic">No prerequisites required</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Assessment Structure</label>
          <button
            type="button"
            onClick={addAssignment}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Assignment
          </button>
        </div>
        
        <div className="space-y-3">
          {formData.assignments.map((assignment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => updateAssignment(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Assignment name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Weight (%)</label>
                  <input
                    type="number"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(index, 'weight', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeAssignment(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  value={assignment.description}
                  onChange={(e) => updateAssignment(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Assignment description"
                />
              </div>
            </div>
          ))}
        </div>

        {errors.assignments && <p className="mt-2 text-sm text-red-600">{errors.assignments}</p>}

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700">
            Total Weight: {formData.assignments.reduce((sum, a) => sum + a.weight, 0)}%
            {formData.assignments.reduce((sum, a) => sum + a.weight, 0) !== 100 && (
              <span className="text-red-600 ml-2">(Must equal 100%)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Syllabus File
        </label>
        <input
          type="text"
          value={formData.syllabus}
          onChange={(e) => handleInputChange('syllabus', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="syllabus.pdf"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Required Textbooks
        </label>
        <textarea
          value={formData.textbooks.join('\n')}
          onChange={(e) => handleInputChange('textbooks', e.target.value.split('\n').filter(book => book.trim()))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter each textbook on a new line&#10;e.g., Introduction to Computer Science - 5th Edition&#10;Programming Fundamentals by Smith"
        />
      </div>
    </div>
  );

  // Loading state
  if (loading && isEditMode) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/academics/courses')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Course' : 'Add New Course'}
            </h1>
            <nav className="text-sm text-gray-500">
              <span>Academics</span>
              <span className="mx-2">/</span>
              <span>Courses</span>
              <span className="mx-2">/</span>
              <span className="text-blue-600 font-medium">
                {isEditMode ? 'Edit' : 'Add New'}
              </span>
            </nav>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-lg text-green-800">
            <Check className="h-4 w-4 mr-2" />
            Course saved successfully!
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 flex items-center`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'schedule' && renderScheduleLocation()}
            {activeTab === 'requirements' && renderRequirements()}
            {activeTab === 'assessment' && renderAssessment()}
            {activeTab === 'materials' && renderMaterials()}
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {errors.submit && (
            <div className="mb-4 flex items-center px-4 py-3 bg-red-100 border border-red-200 rounded-lg text-red-800">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {errors.submit}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/academics/courses')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 flex items-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditMode ? 'Update Course' : 'Create Course'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;