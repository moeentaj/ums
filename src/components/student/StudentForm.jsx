// src/components/student/StudentForm.jsx - Complete Add/Edit Student Form
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  AlertCircle,
  Check,
  ArrowLeft,
  Camera,
  Users,
  CreditCard,
  GraduationCap,
  Heart,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockData, getStudentById } from '../../data/mockData';

const StudentForm = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { user, hasPermission } = useAuth();
  const isEditMode = !!studentId;

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: 'USA',
    religion: '',
    bloodGroup: '',
    profilePhoto: null,
    
    // Contact Information
    email: '',
    phoneNumber: '',
    alternatePhone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    
    // Academic Information
    studentId: '',
    program: '',
    department: '',
    year: '1st Year',
    semester: 'Fall 2025',
    admissionDate: '',
    enrollmentStatus: 'Active',
    expectedGraduation: '',
    previousEducation: {
      institution: '',
      degree: '',
      year: '',
      percentage: ''
    },
    
    // Emergency Contacts
    emergencyContacts: [
      {
        id: 1,
        name: '',
        relationship: '',
        phone: '',
        email: '',
        address: ''
      }
    ],
    
    // Financial Information
    tuitionBalance: 0,
    scholarships: [],
    paymentPlan: 'Semester',
    financialAid: 0,
    
    // Additional Information
    medicalConditions: '',
    allergies: '',
    specialNeeds: '',
    hobbies: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);

  // Configuration data
  const programs = [
    { id: 'computer-science', name: 'Computer Science', department: 'Engineering' },
    { id: 'business-administration', name: 'Business Administration', department: 'Business' },
    { id: 'engineering', name: 'Engineering', department: 'Engineering' },
    { id: 'liberal-arts', name: 'Liberal Arts', department: 'Arts' },
    { id: 'sciences', name: 'Sciences', department: 'Sciences' },
    { id: 'mathematics', name: 'Mathematics', department: 'Sciences' },
    { id: 'biology', name: 'Biology', department: 'Sciences' },
    { id: 'chemistry', name: 'Chemistry', department: 'Sciences' }
  ];

  const departments = ['Engineering', 'Business', 'Arts', 'Sciences', 'Medicine', 'Law'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const relationships = ['Father', 'Mother', 'Guardian', 'Spouse', 'Sibling', 'Other'];
  const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];
  const semesters = ['Fall 2025', 'Spring 2026', 'Summer 2026'];
  const paymentPlans = ['Semester', 'Monthly', 'Annual'];
  const statusOptions = ['Active', 'Inactive', 'Probation', 'Graduated'];

  // Tab configuration
  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'contact', name: 'Contact Details', icon: Phone },
    { id: 'academic', name: 'Academic Info', icon: BookOpen },
    { id: 'emergency', name: 'Emergency Contacts', icon: Users },
    { id: 'financial', name: 'Financial Info', icon: CreditCard },
    { id: 'additional', name: 'Additional Info', icon: Heart }
  ];

  // Load student data for edit mode
  useEffect(() => {
    if (isEditMode) {
      loadStudentData(studentId);
    } else {
      generateStudentId();
    }
  }, [isEditMode, studentId]);

  // Load existing student data
  const loadStudentData = async (id) => {
    try {
      setLoading(true);
      const studentData = getStudentById(id);
      
      if (!studentData) {
        navigate('/students');
        return;
      }

      // Map student data to form structure
      const [firstName, ...lastNameParts] = studentData.name.split(' ');
      const lastName = lastNameParts.pop() || '';
      const middleName = lastNameParts.join(' ');

      setFormData({
        firstName,
        middleName,
        lastName,
        dateOfBirth: studentData.dateOfBirth,
        gender: studentData.gender,
        nationality: 'USA',
        religion: '',
        bloodGroup: '',
        profilePhoto: studentData.profileImage,
        
        email: studentData.email,
        phoneNumber: studentData.phone,
        alternatePhone: '',
        address: studentData.address,
        
        studentId: studentData.studentId,
        program: studentData.program,
        department: getDepartmentForProgram(studentData.program),
        year: studentData.year,
        semester: studentData.semester,
        admissionDate: studentData.enrollmentDate,
        enrollmentStatus: studentData.status,
        expectedGraduation: studentData.expectedGraduation,
        previousEducation: {
          institution: '',
          degree: '',
          year: '',
          percentage: ''
        },
        
        emergencyContacts: [{
          id: 1,
          name: studentData.emergencyContact.name,
          relationship: studentData.emergencyContact.relationship,
          phone: studentData.emergencyContact.phone,
          email: studentData.emergencyContact.email,
          address: ''
        }],
        
        tuitionBalance: studentData.financialInfo.tuitionBalance,
        scholarships: studentData.financialInfo.scholarships || [],
        paymentPlan: studentData.financialInfo.paymentPlan,
        financialAid: studentData.financialInfo.financialAid,
        
        medicalConditions: '',
        allergies: '',
        specialNeeds: '',
        hobbies: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error loading student:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate new student ID
  const generateStudentId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    setFormData(prev => ({
      ...prev,
      studentId: `${year}${randomNum}`
    }));
  };

  // Get department for program
  const getDepartmentForProgram = (programName) => {
    const program = programs.find(p => p.name === programName);
    return program ? program.department : 'General';
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

  // Handle program change
  const handleProgramChange = (programName) => {
    const department = getDepartmentForProgram(programName);
    setFormData(prev => ({
      ...prev,
      program: programName,
      department: department
    }));
  };

  // Handle emergency contact changes
  const handleEmergencyContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  // Add emergency contact
  const addEmergencyContact = () => {
    const newId = Math.max(...formData.emergencyContacts.map(c => c.id)) + 1;
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, {
        id: newId,
        name: '',
        relationship: '',
        phone: '',
        email: '',
        address: ''
      }]
    }));
  };

  // Remove emergency contact
  const removeEmergencyContact = (index) => {
    if (formData.emergencyContacts.length > 1) {
      setFormData(prev => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Personal Information
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Contact Information
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'Zip code is required';

    // Academic Information
    if (!formData.program) newErrors.program = 'Program is required';
    if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';

    // Emergency Contact
    const primaryContact = formData.emergencyContacts[0];
    if (!primaryContact.name.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!primaryContact.relationship) newErrors.emergencyContactRelationship = 'Emergency contact relationship is required';
    if (!primaryContact.phone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';

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
      
      // Prepare student data
      const studentData = {
        id: isEditMode ? studentId : `STU${formData.studentId}`,
        studentId: formData.studentId,
        name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ').trim(),
        email: formData.email,
        phone: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        program: formData.program,
        degree: `Bachelor of ${formData.program}`,
        year: formData.year,
        semester: formData.semester,
        gpa: isEditMode ? getStudentById(studentId)?.gpa || 0 : 0,
        totalCredits: isEditMode ? getStudentById(studentId)?.totalCredits || 0 : 0,
        status: formData.enrollmentStatus,
        enrollmentDate: formData.admissionDate,
        expectedGraduation: formData.expectedGraduation || calculateGraduationDate(formData.admissionDate),
        address: formData.address,
        emergencyContact: {
          name: formData.emergencyContacts[0].name,
          relationship: formData.emergencyContacts[0].relationship,
          phone: formData.emergencyContacts[0].phone,
          email: formData.emergencyContacts[0].email
        },
        financialInfo: {
          tuitionBalance: formData.tuitionBalance,
          scholarships: formData.scholarships,
          paymentPlan: formData.paymentPlan,
          financialAid: formData.financialAid
        },
        academicHistory: isEditMode ? getStudentById(studentId)?.academicHistory || [] : [],
        currentCourses: isEditMode ? getStudentById(studentId)?.currentCourses || [] : [],
        documents: isEditMode ? getStudentById(studentId)?.documents || [] : ['enrollment_letter.pdf'],
        profileImage: formData.profilePhoto
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would be an API call
      console.log('Saving student:', studentData);
      
      setSaveSuccess(true);
      setTimeout(() => {
        navigate(`/students/profile/${studentData.id}`);
      }, 1000);

    } catch (error) {
      console.error('Error saving student:', error);
      setErrors({ submit: 'Failed to save student. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate expected graduation date
  const calculateGraduationDate = (admissionDate) => {
    if (!admissionDate) return '';
    const admission = new Date(admissionDate);
    admission.setFullYear(admission.getFullYear() + 4); // Assume 4-year program
    return admission.toISOString().split('T')[0];
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In real app, would upload to server
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Render Personal Info section
  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {formData.profilePhoto ? (
              <img 
                src={formData.profilePhoto} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4" />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Profile Photo</h3>
          <p className="text-xs text-gray-500">Upload a clear photo for identification purposes.</p>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter middle name (optional)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.gender ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => handleInputChange('nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter nationality"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
        <input
          type="text"
          value={formData.religion}
          onChange={(e) => handleInputChange('religion', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter religion (optional)"
        />
      </div>
    </div>
  );

  // Render Contact Info section
  const renderContactInfo = () => (
    <div className="space-y-6">
      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="student@university.edu"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+1-555-0123"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            value={formData.alternatePhone}
            onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1-555-0124 (optional)"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Address Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors['address.street'] ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="123 Main Street"
            />
            {errors['address.street'] && (
              <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['address.city'] ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="City"
              />
              {errors['address.city'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address.state}
                onChange={(e) => handleInputChange('address.state', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['address.state'] ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="State"
              />
              {errors['address.state'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors['address.zipCode'] ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="12345"
              />
              {errors['address.zipCode'] && (
                <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                type="text"
                value={formData.address.country}
                onChange={(e) => handleInputChange('address.country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Academic Info section
  const renderAcademicInfo = () => (
    <div className="space-y-6">
      {/* Student ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.studentId}
            onChange={(e) => handleInputChange('studentId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="2025001"
            readOnly={isEditMode}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admission Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.admissionDate}
            onChange={(e) => handleInputChange('admissionDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.admissionDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.admissionDate && (
            <p className="mt-1 text-sm text-red-600">{errors.admissionDate}</p>
          )}
        </div>
      </div>

      {/* Program and Department */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.program}
            onChange={(e) => handleProgramChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.program ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Program</option>
            {programs.map(program => (
              <option key={program.id} value={program.name}>{program.name}</option>
            ))}
          </select>
          {errors.program && (
            <p className="mt-1 text-sm text-red-600">{errors.program}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            type="text"
            value={formData.department}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
      </div>

      {/* Year and Semester */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
          <select
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {yearLevels.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
          <select
            value={formData.semester}
            onChange={(e) => handleInputChange('semester', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Status</label>
          <select
            value={formData.enrollmentStatus}
            onChange={(e) => handleInputChange('enrollmentStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation Date</label>
        <input
          type="date"
          value={formData.expectedGraduation}
          onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Previous Education */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Previous Education
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
            <input
              type="text"
              value={formData.previousEducation.institution}
              onChange={(e) => handleInputChange('previousEducation.institution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Previous school/college name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Degree/Qualification</label>
            <input
              type="text"
              value={formData.previousEducation.degree}
              onChange={(e) => handleInputChange('previousEducation.degree', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="High School Diploma, Associate Degree, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year of Completion</label>
            <input
              type="number"
              value={formData.previousEducation.year}
              onChange={(e) => handleInputChange('previousEducation.year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2023"
              min="1950"
              max={new Date().getFullYear()}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Percentage</label>
            <input
              type="text"
              value={formData.previousEducation.percentage}
              onChange={(e) => handleInputChange('previousEducation.percentage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="85%, 3.5 GPA, etc."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render Emergency Contacts section
  const renderEmergencyContacts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Emergency Contacts
        </h3>
        <button
          type="button"
          onClick={addEmergencyContact}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Contact
        </button>
      </div>

      {formData.emergencyContacts.map((contact, index) => (
        <div key={contact.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">
              Contact {index + 1} {index === 0 && <span className="text-red-500 text-sm">(Primary)</span>}
            </h4>
            {formData.emergencyContacts.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={contact.name}
                onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  index === 0 && errors.emergencyContactName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Contact name"
              />
              {index === 0 && errors.emergencyContactName && (
                <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <select
                value={contact.relationship}
                onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  index === 0 && errors.emergencyContactRelationship ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Relationship</option>
                {relationships.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
              {index === 0 && errors.emergencyContactRelationship && (
                <p className="mt-1 text-sm text-red-600">{errors.emergencyContactRelationship}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  index === 0 && errors.emergencyContactPhone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="+1-555-0123"
              />
              {index === 0 && errors.emergencyContactPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => handleEmergencyContactChange(index, 'email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@email.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={contact.address}
              onChange={(e) => handleEmergencyContactChange(index, 'address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Contact address"
            />
          </div>
        </div>
      ))}
    </div>
  );

  // Render Financial Info section
  const renderFinancialInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <CreditCard className="w-5 h-5 mr-2" />
        Financial Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Initial Tuition Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={formData.tuitionBalance}
              onChange={(e) => handleInputChange('tuitionBalance', parseFloat(e.target.value) || 0)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Financial Aid Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={formData.financialAid}
              onChange={(e) => handleInputChange('financialAid', parseFloat(e.target.value) || 0)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Plan</label>
        <select
          value={formData.paymentPlan}
          onChange={(e) => handleInputChange('paymentPlan', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {paymentPlans.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Scholarships</label>
        <textarea
          value={formData.scholarships.join(', ')}
          onChange={(e) => handleInputChange('scholarships', e.target.value.split(', ').filter(s => s.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Enter scholarships separated by commas (e.g., Merit Scholarship, Dean's List Award)"
        />
        <p className="mt-1 text-xs text-gray-500">Separate multiple scholarships with commas</p>
      </div>
    </div>
  );

  // Render Additional Info section
  const renderAdditionalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <Heart className="w-5 h-5 mr-2" />
        Additional Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
          <textarea
            value={formData.medicalConditions}
            onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Any medical conditions or ongoing treatments"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
          <textarea
            value={formData.allergies}
            onChange={(e) => handleInputChange('allergies', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Food allergies, medication allergies, etc."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Accommodations</label>
        <textarea
          value={formData.specialNeeds}
          onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Any special accommodations required for learning or accessibility"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies and Interests</label>
        <textarea
          value={formData.hobbies}
          onChange={(e) => handleInputChange('hobbies', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Sports, music, reading, volunteer work, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Any additional information relevant to the student's enrollment"
        />
      </div>
    </div>
  );

  // Loading state
  if (loading && isEditMode) {
    return (
      <div className="max-w-5xl mx-auto p-6">
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
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Students
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? 'Edit Student' : 'Add New Student'}
            </h1>
            <nav className="text-sm text-gray-500">
              <span>Students</span>
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
            Student saved successfully!
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
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'contact' && renderContactInfo()}
            {activeTab === 'academic' && renderAcademicInfo()}
            {activeTab === 'emergency' && renderEmergencyContacts()}
            {activeTab === 'financial' && renderFinancialInfo()}
            {activeTab === 'additional' && renderAdditionalInfo()}
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
                onClick={() => navigate('/students')}
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
                    {isEditMode ? 'Update Student' : 'Create Student'}
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

export default StudentForm;