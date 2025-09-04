// src/data/mockData.js

// ==========================================
// STUDENTS DATA
// ==========================================
export const studentsData = [
  {
    id: 'STU001',
    studentId: '2023001',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    phone: '+1-555-0123',
    dateOfBirth: '2001-03-15',
    gender: 'Male',
    program: 'Computer Science',
    degree: 'Bachelor of Science',
    year: '3rd Year',
    semester: 'Fall 2025',
    gpa: 3.85,
    totalCredits: 89,
    status: 'Active',
    enrollmentDate: '2022-09-15',
    expectedGraduation: '2026-05-15',
    address: {
      street: '123 Student Ave',
      city: 'University City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Mary Smith',
      relationship: 'Mother',
      phone: '+1-555-0124',
      email: 'mary.smith@email.com'
    },
    financialInfo: {
      tuitionBalance: 2500.00,
      scholarships: ['Merit Scholarship', 'Dean\'s List Award'],
      paymentPlan: 'Monthly',
      financialAid: 5000.00
    },
    academicHistory: [
      { semester: 'Fall 2024', gpa: 3.9, credits: 18, status: 'Completed' },
      { semester: 'Spring 2024', gpa: 3.8, credits: 15, status: 'Completed' },
      { semester: 'Fall 2023', gpa: 3.7, credits: 16, status: 'Completed' }
    ],
    currentCourses: ['CS-301', 'MATH-205', 'ENG-201', 'PHYS-101'],
    documents: ['transcript.pdf', 'enrollment_letter.pdf'],
    profileImage: null
  },
  {
    id: 'STU002',
    studentId: '2023002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1-555-0125',
    dateOfBirth: '2002-07-22',
    gender: 'Female',
    program: 'Business Administration',
    degree: 'Bachelor of Business Administration',
    year: '2nd Year',
    semester: 'Fall 2025',
    gpa: 3.92,
    totalCredits: 56,
    status: 'Active',
    enrollmentDate: '2023-09-15',
    expectedGraduation: '2027-05-15',
    address: {
      street: '456 Campus Rd',
      city: 'University City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Robert Johnson',
      relationship: 'Father',
      phone: '+1-555-0126',
      email: 'robert.johnson@email.com'
    },
    financialInfo: {
      tuitionBalance: 0.00,
      scholarships: ['Presidential Scholarship', 'Business Excellence Award'],
      paymentPlan: 'Semester',
      financialAid: 8000.00
    },
    academicHistory: [
      { semester: 'Fall 2024', gpa: 4.0, credits: 17, status: 'Completed' },
      { semester: 'Spring 2024', gpa: 3.85, credits: 15, status: 'Completed' }
    ],
    currentCourses: ['BUS-201', 'ECON-101', 'MATH-120', 'ENG-102'],
    documents: ['transcript.pdf', 'scholarship_letter.pdf'],
    profileImage: null
  },
  {
    id: 'STU003',
    studentId: '2024001',
    name: 'Michael Davis',
    email: 'michael.davis@university.edu',
    phone: '+1-555-0127',
    dateOfBirth: '2003-11-08',
    gender: 'Male',
    program: 'Engineering',
    degree: 'Bachelor of Engineering',
    year: '1st Year',
    semester: 'Fall 2025',
    gpa: 3.45,
    totalCredits: 28,
    status: 'Active',
    enrollmentDate: '2024-09-15',
    expectedGraduation: '2028-05-15',
    address: {
      street: '789 Dorm Hall',
      city: 'University City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Lisa Davis',
      relationship: 'Mother',
      phone: '+1-555-0128',
      email: 'lisa.davis@email.com'
    },
    financialInfo: {
      tuitionBalance: 1200.00,
      scholarships: [],
      paymentPlan: 'Monthly',
      financialAid: 3000.00
    },
    academicHistory: [
      { semester: 'Spring 2025', gpa: 3.45, credits: 16, status: 'Completed' }
    ],
    currentCourses: ['ENG-101', 'MATH-201', 'PHYS-201', 'CHEM-101'],
    documents: ['transcript.pdf', 'admission_letter.pdf'],
    profileImage: null
  }
];

// ==========================================
// FACULTY DATA
// ==========================================
export const facultyData = [
  {
    id: 'FAC001',
    employeeId: 'EMP2019001',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    phone: '+1-555-1001',
    title: 'Professor',
    department: 'Computer Science',
    specialization: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    office: 'CS Building 301',
    officeHours: 'MWF 2:00-4:00 PM',
    education: [
      'Ph.D. in Computer Science - Stanford University (2015)',
      'M.S. in Computer Science - MIT (2010)',
      'B.S. in Computer Science - UC Berkeley (2008)'
    ],
    experience: '12 years',
    hireDate: '2019-08-15',
    status: 'Active',
    salary: 95000,
    currentCourses: ['CS-301', 'CS-401', 'CS-501'],
    pastCourses: ['CS-101', 'CS-201', 'CS-350'],
    researchAreas: ['Machine Learning', 'Natural Language Processing'],
    publications: 23,
    awards: ['Excellence in Teaching Award 2023', 'Research Grant 2022'],
    advisingStudents: ['STU001', 'STU015', 'STU028'],
    profileImage: null
  },
  {
    id: 'FAC002',
    employeeId: 'EMP2020005',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@university.edu',
    phone: '+1-555-1002',
    title: 'Associate Professor',
    department: 'Business Administration',
    specialization: ['Finance', 'Investment Analysis', 'Corporate Strategy'],
    office: 'Business Building 205',
    officeHours: 'TTh 1:00-3:00 PM',
    education: [
      'Ph.D. in Finance - Wharton School (2018)',
      'MBA - Harvard Business School (2014)',
      'B.A. in Economics - Yale University (2012)'
    ],
    experience: '8 years',
    hireDate: '2020-01-10',
    status: 'Active',
    salary: 88000,
    currentCourses: ['BUS-201', 'FIN-301', 'BUS-401'],
    pastCourses: ['BUS-101', 'ECON-201'],
    researchAreas: ['Corporate Finance', 'Investment Banking'],
    publications: 15,
    awards: ['Outstanding Faculty Award 2024'],
    advisingStudents: ['STU002', 'STU012', 'STU025'],
    profileImage: null
  },
  {
    id: 'FAC003',
    employeeId: 'EMP2021012',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@university.edu',
    phone: '+1-555-1003',
    title: 'Assistant Professor',
    department: 'Engineering',
    specialization: ['Mechanical Engineering', 'Robotics', 'Automation'],
    office: 'Engineering Building 150',
    officeHours: 'MW 10:00-12:00 PM',
    education: [
      'Ph.D. in Mechanical Engineering - MIT (2021)',
      'M.S. in Robotics - Carnegie Mellon (2018)',
      'B.S. in Mechanical Engineering - UC Berkeley (2016)'
    ],
    experience: '4 years',
    hireDate: '2021-09-01',
    status: 'Active',
    salary: 82000,
    currentCourses: ['ENG-201', 'MECH-301', 'ROB-101'],
    pastCourses: ['ENG-101', 'PHYS-201'],
    researchAreas: ['Autonomous Systems', 'Industrial Robotics'],
    publications: 8,
    awards: ['Early Career Research Award 2023'],
    advisingStudents: ['STU003', 'STU018'],
    profileImage: null
  }
];

// ==========================================
// COURSES DATA
// ==========================================
export const coursesData = [
  {
    id: 'CS-101',
    code: 'CS-101',
    name: 'Introduction to Computer Science',
    description: 'Fundamental concepts of computer science including programming basics, algorithms, and problem-solving techniques.',
    credits: 4,
    department: 'Computer Science',
    level: 'Undergraduate',
    prerequisites: [],
    corequisites: [],
    instructor: 'Dr. Sarah Wilson',
    instructorId: 'FAC001',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM - 11:00 AM',
      duration: 60
    },
    classroom: 'CS Building 101',
    capacity: 150,
    enrolled: 142,
    waitlist: 8,
    semester: 'Fall 2025',
    status: 'Active',
    syllabus: 'cs101_syllabus.pdf',
    textbooks: [
      'Introduction to Computer Science - 5th Edition',
      'Python Programming Fundamentals'
    ],
    assignments: [
      { name: 'Programming Assignment 1', dueDate: '2025-09-15', weight: 15 },
      { name: 'Midterm Exam', dueDate: '2025-10-15', weight: 30 },
      { name: 'Final Project', dueDate: '2025-12-10', weight: 25 }
    ],
    gradingScale: {
      'A+': 97, 'A': 93, 'A-': 90,
      'B+': 87, 'B': 83, 'B-': 80,
      'C+': 77, 'C': 73, 'C-': 70,
      'D+': 67, 'D': 63, 'D-': 60,
      'F': 0
    }
  },
  {
    id: 'CS-301',
    code: 'CS-301',
    name: 'Data Structures and Algorithms',
    description: 'Advanced study of data structures, algorithm design, analysis, and implementation.',
    credits: 3,
    department: 'Computer Science',
    level: 'Undergraduate',
    prerequisites: ['CS-101', 'MATH-201'],
    corequisites: [],
    instructor: 'Dr. Sarah Wilson',
    instructorId: 'FAC001',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 3:30 PM',
      duration: 90
    },
    classroom: 'CS Building 205',
    capacity: 80,
    enrolled: 75,
    waitlist: 12,
    semester: 'Fall 2025',
    status: 'Active',
    syllabus: 'cs301_syllabus.pdf',
    textbooks: ['Algorithms - 4th Edition', 'Data Structures in Python'],
    assignments: [
      { name: 'Algorithm Analysis', dueDate: '2025-09-20', weight: 20 },
      { name: 'Data Structure Implementation', dueDate: '2025-10-25', weight: 25 },
      { name: 'Final Exam', dueDate: '2025-12-15', weight: 35 }
    ],
    gradingScale: {
      'A+': 97, 'A': 93, 'A-': 90,
      'B+': 87, 'B': 83, 'B-': 80,
      'C+': 77, 'C': 73, 'C-': 70,
      'D+': 67, 'D': 63, 'D-': 60,
      'F': 0
    }
  },
  {
    id: 'BUS-201',
    code: 'BUS-201',
    name: 'Business Management Fundamentals',
    description: 'Core principles of business management, organizational behavior, and strategic planning.',
    credits: 3,
    department: 'Business Administration',
    level: 'Undergraduate',
    prerequisites: ['BUS-101'],
    corequisites: [],
    instructor: 'Prof. Michael Brown',
    instructorId: 'FAC002',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '1:00 PM - 2:30 PM',
      duration: 90
    },
    classroom: 'Business Building 150',
    capacity: 120,
    enrolled: 108,
    waitlist: 5,
    semester: 'Fall 2025',
    status: 'Active',
    syllabus: 'bus201_syllabus.pdf',
    textbooks: ['Management Principles - 12th Edition'],
    assignments: [
      { name: 'Case Study Analysis', dueDate: '2025-09-25', weight: 20 },
      { name: 'Group Project', dueDate: '2025-11-15', weight: 30 },
      { name: 'Final Examination', dueDate: '2025-12-12', weight: 30 }
    ],
    gradingScale: {
      'A+': 97, 'A': 93, 'A-': 90,
      'B+': 87, 'B': 83, 'B-': 80,
      'C+': 77, 'C': 73, 'C-': 70,
      'D+': 67, 'D': 63, 'D-': 60,
      'F': 0
    }
  }
];

// ==========================================
// FINANCIAL DATA
// ==========================================
export const financialData = {
  transactions: [
    {
      id: 'TXN001',
      studentId: 'STU001',
      studentName: 'John Smith',
      type: 'Tuition Payment',
      category: 'Tuition',
      amount: 2500.00,
      status: 'Completed',
      date: '2025-08-15',
      dueDate: '2025-08-20',
      semester: 'Fall 2025',
      paymentMethod: 'Credit Card',
      reference: 'CC-2025-001',
      description: 'Fall 2025 Tuition Payment'
    },
    {
      id: 'TXN002',
      studentId: 'STU002',
      studentName: 'Sarah Johnson',
      type: 'Scholarship Credit',
      category: 'Financial Aid',
      amount: -4000.00,
      status: 'Applied',
      date: '2025-08-10',
      dueDate: null,
      semester: 'Fall 2025',
      paymentMethod: 'Scholarship',
      reference: 'SCH-2025-002',
      description: 'Presidential Scholarship - Fall 2025'
    },
    {
      id: 'TXN003',
      studentId: 'STU003',
      studentName: 'Michael Davis',
      type: 'Housing Fee',
      category: 'Housing',
      amount: 1200.00,
      status: 'Pending',
      date: '2025-08-25',
      dueDate: '2025-09-01',
      semester: 'Fall 2025',
      paymentMethod: 'Bank Transfer',
      reference: 'HSG-2025-003',
      description: 'Dormitory Housing - Fall 2025'
    }
  ],
  scholarships: [
    {
      id: 'SCH001',
      name: 'Merit Scholarship',
      type: 'Academic Merit',
      amount: 2500.00,
      duration: '4 years',
      criteria: 'GPA above 3.7',
      recipients: ['STU001'],
      status: 'Active',
      renewable: true,
      sponsor: 'University Foundation'
    },
    {
      id: 'SCH002',
      name: 'Presidential Scholarship',
      type: 'Full Tuition',
      amount: 8000.00,
      duration: '4 years',
      criteria: 'GPA above 3.9 and Leadership',
      recipients: ['STU002'],
      status: 'Active',
      renewable: true,
      sponsor: 'University Board'
    }
  ],
  budgets: [
    {
      department: 'Computer Science',
      allocated: 500000,
      spent: 320000,
      remaining: 180000,
      categories: {
        personnel: 300000,
        equipment: 100000,
        supplies: 50000,
        travel: 30000,
        other: 20000
      }
    },
    {
      department: 'Business Administration',
      allocated: 400000,
      spent: 280000,
      remaining: 120000,
      categories: {
        personnel: 250000,
        equipment: 75000,
        supplies: 40000,
        travel: 25000,
        other: 10000
      }
    }
  ]
};

// ==========================================
// ACADEMIC DATA
// ==========================================
export const academicData = {
  grades: [
    {
      id: 'GRD001',
      studentId: 'STU001',
      studentName: 'John Smith',
      courseId: 'CS-301',
      courseName: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Wilson',
      semester: 'Spring 2025',
      assignments: [
        { name: 'Assignment 1', score: 92, maxScore: 100, weight: 20, date: '2025-02-15' },
        { name: 'Midterm Exam', score: 88, maxScore: 100, weight: 30, date: '2025-03-15' },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 25, date: '2025-05-10' },
        { name: 'Final Exam', score: 90, maxScore: 100, weight: 25, date: '2025-05-20' }
      ],
      finalGrade: 'A-',
      gpa: 3.7,
      credits: 3,
      status: 'Completed'
    },
    {
      id: 'GRD002',
      studentId: 'STU002',
      studentName: 'Sarah Johnson',
      courseId: 'BUS-201',
      courseName: 'Business Management Fundamentals',
      instructor: 'Prof. Michael Brown',
      semester: 'Spring 2025',
      assignments: [
        { name: 'Case Study', score: 98, maxScore: 100, weight: 20, date: '2025-02-20' },
        { name: 'Group Project', score: 96, maxScore: 100, weight: 30, date: '2025-04-15' },
        { name: 'Final Exam', score: 94, maxScore: 100, weight: 30, date: '2025-05-18' },
        { name: 'Participation', score: 100, maxScore: 100, weight: 20, date: '2025-05-20' }
      ],
      finalGrade: 'A+',
      gpa: 4.0,
      credits: 3,
      status: 'Completed'
    }
  ],
  schedules: [
    {
      studentId: 'STU001',
      semester: 'Fall 2025',
      courses: [
        {
          courseId: 'CS-301',
          courseName: 'Data Structures and Algorithms',
          instructor: 'Dr. Sarah Wilson',
          schedule: 'TTh 2:00-3:30 PM',
          classroom: 'CS Building 205',
          credits: 3
        },
        {
          courseId: 'MATH-205',
          courseName: 'Discrete Mathematics',
          instructor: 'Dr. Robert Taylor',
          schedule: 'MWF 9:00-10:00 AM',
          classroom: 'Math Building 101',
          credits: 3
        },
        {
          courseId: 'ENG-201',
          courseName: 'Technical Writing',
          instructor: 'Prof. Jennifer Lee',
          schedule: 'MW 1:00-2:30 PM',
          classroom: 'English Building 150',
          credits: 3
        }
      ]
    }
  ],
  transcripts: [
    {
      studentId: 'STU001',
      studentName: 'John Smith',
      program: 'Computer Science',
      semesters: [
        {
          term: 'Fall 2022',
          courses: [
            { code: 'CS-101', name: 'Intro to Computer Science', credits: 4, grade: 'A-', gpa: 3.7 },
            { code: 'MATH-101', name: 'Calculus I', credits: 4, grade: 'B+', gpa: 3.3 },
            { code: 'ENG-101', name: 'English Composition', credits: 3, grade: 'A', gpa: 4.0 }
          ],
          semesterGPA: 3.6,
          semesterCredits: 11
        },
        {
          term: 'Spring 2023',
          courses: [
            { code: 'CS-201', name: 'Programming II', credits: 4, grade: 'A', gpa: 4.0 },
            { code: 'MATH-201', name: 'Calculus II', credits: 4, grade: 'B', gpa: 3.0 },
            { code: 'PHYS-101', name: 'Physics I', credits: 4, grade: 'B+', gpa: 3.3 }
          ],
          semesterGPA: 3.4,
          semesterCredits: 12
        }
      ],
      cumulativeGPA: 3.5,
      totalCredits: 23,
      academicStanding: 'Good Standing'
    }
  ]
};

// ==========================================
// INFRASTRUCTURE DATA
// ==========================================
export const infrastructureData = {
  buildings: [
    {
      id: 'BLD001',
      name: 'Computer Science Building',
      code: 'CS',
      floors: 4,
      totalRooms: 45,
      capacity: 1200,
      yearBuilt: 2018,
      lastRenovation: 2023,
      status: 'Active',
      facilities: ['WiFi', 'Air Conditioning', 'Elevator', 'Emergency Systems'],
      maintenanceSchedule: 'Monthly',
      coordinator: 'John Maintenance',
      contact: '+1-555-2001'
    },
    {
      id: 'BLD002',
      name: 'Business Administration Building',
      code: 'BUS',
      floors: 3,
      totalRooms: 32,
      capacity: 800,
      yearBuilt: 2015,
      lastRenovation: 2022,
      status: 'Active',
      facilities: ['WiFi', 'Air Conditioning', 'Conference Rooms', 'Presentation Equipment'],
      maintenanceSchedule: 'Monthly',
      coordinator: 'Jane Facilities',
      contact: '+1-555-2002'
    }
  ],
  classrooms: [
    {
      id: 'ROOM001',
      buildingId: 'BLD001',
      building: 'Computer Science Building',
      roomNumber: '101',
      floor: 1,
      capacity: 150,
      type: 'Lecture Hall',
      equipment: ['Projector', 'Sound System', 'Whiteboard', 'Computer'],
      features: ['Tiered Seating', 'Recording Capability'],
      status: 'Available',
      bookings: [
        { date: '2025-09-02', time: '10:00-11:00', course: 'CS-101', instructor: 'Dr. Sarah Wilson' },
        { date: '2025-09-04', time: '10:00-11:00', course: 'CS-101', instructor: 'Dr. Sarah Wilson' }
      ]
    },
    {
      id: 'ROOM002',
      buildingId: 'BLD001',
      building: 'Computer Science Building',
      roomNumber: '205',
      floor: 2,
      capacity: 80,
      type: 'Computer Lab',
      equipment: ['30 Computers', 'Projector', 'Whiteboard', 'Network Access'],
      features: ['High-Speed Internet', 'Software Suite'],
      status: 'Available',
      bookings: [
        { date: '2025-09-03', time: '14:00-15:30', course: 'CS-301', instructor: 'Dr. Sarah Wilson' },
        { date: '2025-09-05', time: '14:00-15:30', course: 'CS-301', instructor: 'Dr. Sarah Wilson' }
      ]
    }
  ],
  maintenance: [
    {
      id: 'MAINT001',
      type: 'Preventive',
      priority: 'Medium',
      location: 'CS Building 205',
      description: 'Monthly computer lab maintenance and software updates',
      reportedBy: 'Dr. Sarah Wilson',
      reportDate: '2025-08-25',
      assignedTo: 'IT Team',
      status: 'Scheduled',
      scheduledDate: '2025-09-15',
      estimatedCost: 500.00,
      category: 'IT Equipment'
    },
    {
      id: 'MAINT002',
      type: 'Emergency',
      priority: 'High',
      location: 'Business Building HVAC',
      description: 'Air conditioning system malfunction in east wing',
      reportedBy: 'Prof. Michael Brown',
      reportDate: '2025-09-01',
      assignedTo: 'HVAC Team',
      status: 'In Progress',
      scheduledDate: '2025-09-02',
      estimatedCost: 1200.00,
      category: 'HVAC'
    }
  ]
};

// ==========================================
// USER DATA
// ==========================================
export const userData = [
  {
    id: 'USR001',
    username: 'admin',
    email: 'admin@university.edu',
    name: 'System Administrator',
    role: 'admin',
    department: 'IT Services',
    status: 'Active',
    lastLogin: '2025-09-02T08:00:00Z',
    permissions: ['all'],
    profileImage: null
  },
  {
    id: 'USR002',
    username: 'sarah.wilson',
    email: 'sarah.wilson@university.edu',
    name: 'Dr. Sarah Wilson',
    role: 'faculty',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '2025-09-01T14:30:00Z',
    permissions: ['courses', 'grades', 'students'],
    profileImage: null
  },
  {
    id: 'USR003',
    username: 'john.smith',
    email: 'john.smith@university.edu',
    name: 'John Smith',
    role: 'student',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '2025-09-01T16:45:00Z',
    permissions: ['profile', 'grades', 'courses'],
    profileImage: null
  }
];

// ==========================================
// DASHBOARD DATA
// ==========================================
export const dashboardData = {
  recentActivities: [
    {
      id: 'ACT001',
      type: 'enrollment',
      title: 'New Student Enrollment',
      description: 'Michael Davis enrolled in Fall 2025 semester',
      user: 'System',
      timestamp: '2025-09-01T10:30:00Z',
      status: 'completed'
    },
    {
      id: 'ACT002',
      type: 'grade',
      title: 'Grades Updated',
      description: 'Dr. Sarah Wilson updated CS-301 final grades',
      user: 'Dr. Sarah Wilson',
      timestamp: '2025-09-01T15:20:00Z',
      status: 'completed'
    },
    {
      id: 'ACT003',
      type: 'payment',
      title: 'Payment Received',
      description: 'John Smith paid Fall 2025 tuition',
      user: 'John Smith',
      timestamp: '2025-09-01T09:15:00Z',
      status: 'completed'
    },
    {
      id: 'ACT004',
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'HVAC repair requested for Business Building',
      user: 'Prof. Michael Brown',
      timestamp: '2025-09-01T11:45:00Z',
      status: 'pending'
    }
  ],
  announcements: [
    {
      id: 'ANN001',
      title: 'Fall 2025 Registration Extended',
      content: 'Registration deadline extended to September 15, 2025',
      priority: 'high',
      targetAudience: ['students'],
      author: 'Academic Office',
      publishDate: '2025-08-30T09:00:00Z',
      expiryDate: '2025-09-15T23:59:59Z',
      status: 'active'
    },
    {
      id: 'ANN002',
      title: 'Campus WiFi Maintenance',
      content: 'WiFi will be temporarily unavailable on September 3, 2025 from 2:00 AM to 4:00 AM for maintenance',
      priority: 'medium',
      targetAudience: ['all'],
      author: 'IT Services',
      publishDate: '2025-09-01T12:00:00Z',
      expiryDate: '2025-09-04T00:00:00Z',
      status: 'active'
    },
    {
      id: 'ANN003',
      title: 'New Scholarship Applications Open',
      content: 'Applications for Merit-Based Scholarships are now open for Spring 2026 semester',
      priority: 'medium',
      targetAudience: ['students'],
      author: 'Financial Aid Office',
      publishDate: '2025-08-28T08:00:00Z',
      expiryDate: '2025-10-31T23:59:59Z',
      status: 'active'
    }
  ]
};

// ==========================================
// REPORTS DATA
// ==========================================
export const reportsData = {
  enrollment: {
    total: 2847,
    byProgram: {
      'Computer Science': 892,
      'Business Administration': 756,
      'Engineering': 634,
      'Liberal Arts': 345,
      'Sciences': 220
    },
    byYear: {
      '1st Year': 712,
      '2nd Year': 689,
      '3rd Year': 723,
      '4th Year': 698,
      'Graduate': 25
    },
    byGender: {
      'Male': 1456,
      'Female': 1391
    },
    trends: [
      { period: '2021', total: 2234 },
      { period: '2022', total: 2456 },
      { period: '2023', total: 2678 },
      { period: '2024', total: 2734 },
      { period: '2025', total: 2847 }
    ]
  },
  financial: {
    revenue: {
      total: 1200000,
      tuition: 980000,
      fees: 150000,
      housing: 70000
    },
    expenses: {
      total: 950000,
      salaries: 600000,
      facilities: 200000,
      equipment: 100000,
      other: 50000
    },
    scholarships: {
      total: 125000,
      distributed: 98000,
      pending: 27000
    }
  },
  academic: {
    gpaDistribution: {
      '4.0': 234,
      '3.5-3.99': 867,
      '3.0-3.49': 1023,
      '2.5-2.99': 512,
      '2.0-2.49': 156,
      'Below 2.0': 55
    },
    courseCompletion: 94.2,
    graduationRate: 87.5
  }
};

// ==========================================
// NOTIFICATION TEMPLATES
// ==========================================
export const notificationTemplates = {
  payment_due: {
    title: 'Payment Due Reminder',
    template: 'Dear {studentName}, your payment of ${amount} for {semester} is due on {dueDate}.',
    channels: ['email', 'sms'],
    priority: 'high'
  },
  grade_posted: {
    title: 'New Grade Posted',
    template: 'Your grade for {courseName} has been posted: {grade}',
    channels: ['email', 'portal'],
    priority: 'medium'
  },
  maintenance_scheduled: {
    title: 'Maintenance Scheduled',
    template: 'Scheduled maintenance for {location} on {date} from {startTime} to {endTime}',
    channels: ['email'],
    priority: 'low'
  }
};

// ==========================================
// EXPORT ALL DATA
// ==========================================
export const mockData = {
  students: studentsData,
  faculty: facultyData,
  courses: coursesData,
  financial: financialData,
  academic: academicData,
  infrastructure: infrastructureData,
  users: userData,
  dashboard: dashboardData,
  reports: reportsData,
  notifications: notificationTemplates
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Get student by ID
export const getStudentById = (id) => {
  return studentsData.find(student => student.id === id);
};

// Get faculty by ID
export const getFacultyById = (id) => {
  return facultyData.find(faculty => faculty.id === id);
};

// Get course by ID
export const getCourseById = (id) => {
  return coursesData.find(course => course.id === id);
};

// Get students by program
export const getStudentsByProgram = (program) => {
  return studentsData.filter(student => student.program === program);
};

// Get courses by instructor
export const getCoursesByInstructor = (instructorId) => {
  return coursesData.filter(course => course.instructorId === instructorId);
};

// Get financial transactions by student
export const getTransactionsByStudent = (studentId) => {
  return financialData.transactions.filter(transaction => transaction.studentId === studentId);
};

// Get maintenance requests by status
export const getMaintenanceByStatus = (status) => {
  return infrastructureData.maintenance.filter(request => request.status === status);
};

// Calculate total enrollment
export const getTotalEnrollment = () => {
  return studentsData.length;
};

// Calculate total revenue
export const getTotalRevenue = () => {
  return financialData.transactions
    .filter(transaction => transaction.amount > 0 && transaction.status === 'Completed')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Get students by status
export const getStudentsByStatus = (status) => {
  return studentsData.filter(student => student.status === status);
};

// Get upcoming due dates
export const getUpcomingDueDates = (days = 7) => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return financialData.transactions.filter(transaction => {
    if (!transaction.dueDate) return false;
    const dueDate = new Date(transaction.dueDate);
    return dueDate >= now && dueDate <= futureDate && transaction.status === 'Pending';
  });
};

// Get course statistics
export const getCourseStats = () => {
  return {
    totalCourses: coursesData.length,
    averageEnrollment: coursesData.reduce((sum, course) => sum + course.enrolled, 0) / coursesData.length,
    totalCapacity: coursesData.reduce((sum, course) => sum + course.capacity, 0),
    utilizationRate: (coursesData.reduce((sum, course) => sum + course.enrolled, 0) / 
                     coursesData.reduce((sum, course) => sum + course.capacity, 0)) * 100
  };
};

export default mockData;