// src/data/navigationItems.js - Complete Navigation Configuration
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Building, 
  Shield, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Settings,
  BarChart3,
  UserCheck,
  ClipboardList,
  Home,
  School,
  CreditCard,
  MapPin,
  Lock,
  Clock,
  Award
} from 'lucide-react';

export const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: BarChart3,
    roles: ['admin', 'faculty', 'student'],
    description: 'Overview and key metrics',
    badge: null,
    subItems: []
  },
  {
    id: 'students',
    name: 'Student Management',
    path: '/students',
    icon: Users,
    roles: ['admin', 'faculty'],
    description: 'Manage student information and records',
    badge: 'new',
    subItems: [
      { 
        id: 'student-list', 
        name: 'Student Directory', 
        path: '/students/list',
        icon: Users,
        description: 'View and manage all students'
      },
      { 
        id: 'admissions', 
        name: 'Admissions', 
        path: '/students/admissions',
        icon: UserCheck,
        description: 'Handle student applications and enrollment'
      },
      { 
        id: 'enrollment', 
        name: 'Course Enrollment', 
        path: '/students/enrollment',
        icon: ClipboardList,
        description: 'Manage course registrations'
      },
      { 
        id: 'attendance', 
        name: 'Attendance Tracking', 
        path: '/students/attendance',
        icon: Clock,
        description: 'Monitor student attendance'
      },
      { 
        id: 'student-records', 
        name: 'Academic Records', 
        path: '/students/records',
        icon: FileText,
        description: 'View academic history and transcripts'
      }
    ]
  },
  {
    id: 'academics',
    name: 'Academic Management',
    path: '/academics',
    icon: BookOpen,
    roles: ['admin', 'faculty'],
    description: 'Manage courses, curriculum, and grading',
    badge: null,
    subItems: [
      { 
        id: 'courses', 
        name: 'Course Management', 
        path: '/academics/courses',
        icon: BookOpen,
        description: 'Create and manage courses'
      },
      { 
        id: 'curriculum', 
        name: 'Curriculum Planning', 
        path: '/academics/curriculum',
        icon: School,
        description: 'Design academic programs'
      },
      { 
        id: 'faculty-workload', 
        name: 'Faculty Workload', 
        path: '/academics/faculty',
        icon: Users,
        description: 'Distribute teaching assignments'
      },
      { 
        id: 'grading', 
        name: 'Grading System', 
        path: '/academics/grading',
        icon: Award,
        description: 'Manage grades and assessments'
      },
      { 
        id: 'timetable', 
        name: 'Class Timetable', 
        path: '/academics/timetable',
        icon: Calendar,
        description: 'Schedule classes and manage conflicts'
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Management',
    path: '/financial',
    icon: DollarSign,
    roles: ['admin'],
    description: 'Handle tuition, payments, and financial aid',
    badge: 'important',
    subItems: [
      { 
        id: 'financial-overview', 
        name: 'Financial Dashboard', 
        path: '/financial/overview',
        icon: BarChart3,
        description: 'Revenue and payment analytics'
      },
      { 
        id: 'tuition', 
        name: 'Tuition & Fee Structure', 
        path: '/financial/tuition',
        icon: CreditCard,
        description: 'Manage tuition rates and fees'
      },
      { 
        id: 'payments', 
        name: 'Payment Processing', 
        path: '/financial/payments',
        icon: DollarSign,
        description: 'Handle student payments'
      },
      { 
        id: 'scholarships', 
        name: 'Financial Aid', 
        path: '/financial/scholarships',
        icon: Award,
        description: 'Manage scholarships and grants'
      },
      { 
        id: 'financial-reports', 
        name: 'Financial Reports', 
        path: '/financial/reports',
        icon: FileText,
        description: 'Generate financial analytics'
      },
      { 
        id: 'budgeting', 
        name: 'Budget Management', 
        path: '/financial/budgeting',
        icon: BarChart3,
        description: 'University budget planning'
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Campus Infrastructure',
    path: '/infrastructure',
    icon: Building,
    roles: ['admin'],
    description: 'Manage facilities and resources',
    badge: 'ai',
    subItems: [
      { 
        id: 'classrooms', 
        name: 'Classroom Management', 
        path: '/infrastructure/classrooms',
        icon: Home,
        description: 'Manage classroom facilities'
      },
      { 
        id: 'ai-allocation', 
        name: 'AI Room Allocation', 
        path: '/infrastructure/ai-allocation',
        icon: BarChart3,
        description: 'Smart room assignment system'
      },
      { 
        id: 'labs', 
        name: 'Laboratory Management', 
        path: '/infrastructure/labs',
        icon: School,
        description: 'Manage lab equipment and scheduling'
      },
      { 
        id: 'transport', 
        name: 'Transport Services', 
        path: '/infrastructure/transport',
        icon: MapPin,
        description: 'Campus transportation management'
      },
      { 
        id: 'maintenance', 
        name: 'Maintenance System', 
        path: '/infrastructure/maintenance',
        icon: Settings,
        description: 'Facility maintenance tracking'
      },
      { 
        id: 'assets', 
        name: 'Asset Management', 
        path: '/infrastructure/assets',
        icon: Building,
        description: 'University asset inventory'
      }
    ]
  },
  {
    id: 'security',
    name: 'Security & Access',
    path: '/security',
    icon: Shield,
    roles: ['admin'],
    description: 'User access control and security',
    badge: 'secure',
    subItems: [
      { 
        id: 'access-control', 
        name: 'Access Control', 
        path: '/security/access',
        icon: Lock,
        description: 'Manage user permissions'
      },
      { 
        id: 'user-management', 
        name: 'User Management', 
        path: '/security/users',
        icon: Users,
        description: 'Create and manage user accounts'
      },
      { 
        id: 'roles', 
        name: 'Role Management', 
        path: '/security/roles',
        icon: Shield,
        description: 'Define user roles and permissions'
      },
      { 
        id: 'audit-logs', 
        name: 'System Audit', 
        path: '/security/audit',
        icon: FileText,
        description: 'Monitor system activities'
      },
      { 
        id: 'security-settings', 
        name: 'Security Settings', 
        path: '/security/settings',
        icon: Settings,
        description: 'Configure security policies'
      }
    ]
  },
  {
    id: 'schedule',
    name: 'Schedule Management',
    path: '/schedule',
    icon: Calendar,
    roles: ['admin', 'faculty', 'student'],
    description: 'Class schedules and appointments',
    badge: null,
    subItems: [
      { 
        id: 'class-schedule', 
        name: 'Class Schedule', 
        path: '/schedule/classes',
        icon: Calendar,
        description: 'View and manage class schedules'
      },
      { 
        id: 'exam-schedule', 
        name: 'Examination Schedule', 
        path: '/schedule/exams',
        icon: ClipboardList,
        description: 'Exam timetables and arrangements'
      },
      { 
        id: 'events', 
        name: 'Campus Events', 
        path: '/schedule/events',
        icon: Calendar,
        description: 'University events and activities'
      },
      { 
        id: 'academic-calendar', 
        name: 'Academic Calendar', 
        path: '/schedule/calendar',
        icon: Calendar,
        description: 'Important academic dates'
      },
      { 
        id: 'room-booking', 
        name: 'Room Booking', 
        path: '/schedule/booking',
        icon: Home,
        description: 'Reserve rooms and facilities'
      }
    ]
  },
  {
    id: 'graduation',
    name: 'Graduation Tracking',
    path: '/graduation',
    icon: GraduationCap,
    roles: ['admin', 'faculty'],
    description: 'Track student progress and graduation requirements',
    badge: null,
    subItems: [
      { 
        id: 'student-progress', 
        name: 'Student Progress', 
        path: '/graduation/progress',
        icon: BarChart3,
        description: 'Monitor academic progress'
      },
      { 
        id: 'graduation-requirements', 
        name: 'Graduation Requirements', 
        path: '/graduation/requirements',
        icon: ClipboardList,
        description: 'Manage degree requirements'
      },
      { 
        id: 'graduation-ceremonies', 
        name: 'Ceremonies', 
        path: '/graduation/ceremonies',
        icon: GraduationCap,
        description: 'Plan graduation ceremonies'
      },
      { 
        id: 'transcript-management', 
        name: 'Transcript Services', 
        path: '/graduation/transcripts',
        icon: FileText,
        description: 'Manage official transcripts'
      },
      { 
        id: 'alumni-tracking', 
        name: 'Alumni Relations', 
        path: '/graduation/alumni',
        icon: Users,
        description: 'Track and engage alumni'
      }
    ]
  },
  {
    id: 'settings',
    name: 'System Settings',
    path: '/settings',
    icon: Settings,
    roles: ['admin'],
    description: 'System configuration and preferences',
    badge: null,
    subItems: [
      { 
        id: 'general-settings', 
        name: 'General Settings', 
        path: '/settings/general',
        icon: Settings,
        description: 'Basic system configuration'
      },
      { 
        id: 'academic-year', 
        name: 'Academic Year Setup', 
        path: '/settings/academic-year',
        icon: Calendar,
        description: 'Configure academic periods'
      },
      { 
        id: 'notification-settings', 
        name: 'Notifications', 
        path: '/settings/notifications',
        icon: FileText,
        description: 'Manage system notifications'
      },
      { 
        id: 'integrations', 
        name: 'System Integrations', 
        path: '/settings/integrations',
        icon: Settings,
        description: 'Third-party integrations'
      },
      { 
        id: 'backup-restore', 
        name: 'Backup & Restore', 
        path: '/settings/backup',
        icon: Shield,
        description: 'Data backup management'
      }
    ]
  }
];

// Helper functions for navigation management
export const getNavigationForRole = (role) => {
  if (!role) return [];
  return navigationItems.filter(item => item.roles.includes(role));
};

export const getNavigationItem = (id) => {
  return navigationItems.find(item => item.id === id);
};

export const getSubNavigationItem = (parentId, subId) => {
  const parent = getNavigationItem(parentId);
  return parent?.subItems?.find(item => item.id === subId);
};

export const hasNavigationAccess = (itemId, userRole) => {
  const item = getNavigationItem(itemId);
  return item ? item.roles.includes(userRole) : false;
};

export const getNavigationByPath = (path) => {
  for (const item of navigationItems) {
    if (item.path === path) return item;
    if (item.subItems) {
      const subItem = item.subItems.find(sub => sub.path === path);
      if (subItem) return { ...subItem, parent: item };
    }
  }
  return null;
};

export const getBreadcrumbs = (path) => {
  const breadcrumbs = [{ name: 'Dashboard', path: '/dashboard' }];
  
  for (const item of navigationItems) {
    if (path.startsWith(item.path) && item.path !== '/dashboard') {
      breadcrumbs.push({ name: item.name, path: item.path });
      
      if (item.subItems) {
        const subItem = item.subItems.find(sub => sub.path === path);
        if (subItem) {
          breadcrumbs.push({ name: subItem.name, path: subItem.path });
        }
      }
      break;
    }
  }
  
  return breadcrumbs;
};

// Navigation statistics for admin dashboard
export const getNavigationStats = () => {
  return {
    totalModules: navigationItems.length,
    adminOnly: navigationItems.filter(item => item.roles.includes('admin') && !item.roles.includes('faculty')).length,
    facultyAccess: navigationItems.filter(item => item.roles.includes('faculty')).length,
    studentAccess: navigationItems.filter(item => item.roles.includes('student')).length,
    totalSubItems: navigationItems.reduce((sum, item) => sum + (item.subItems?.length || 0), 0)
  };
};