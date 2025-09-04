// src/components/dashboard/QuickActions.jsx - Fixed with Lucide Icons
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  BarChart3,
  Settings,
  Wrench,
  GraduationCap,
  BookOpen,
  User,
  Clock,
  Eye,
  CreditCard,
  Edit,
  Calendar
} from 'lucide-react';

const QuickActions = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleActionClick = (path, action) => {
    // Log the action for now (in real app, this would navigate)
    console.log(`Action clicked: ${action}, Path: ${path}`);
    
    // In a real implementation, you would use:
    // navigate(path);
    
    // For demo purposes, show an alert
    alert(`Would navigate to: ${path}\nAction: ${action}`);
  };

  // Define actions based on user role
  const getActionsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          {
            id: 'add-student',
            title: 'Add Student',
            description: 'Register new student',
            icon: UserPlus,
            color: 'blue',
            path: '/students/add',
            permission: 'students'
          },
          {
            id: 'view-reports',
            title: 'View Reports',
            description: 'System analytics & reports',
            icon: BarChart3,
            color: 'green',
            path: '/reports',
            permission: 'reports'
          },
          {
            id: 'system-settings',
            title: 'System Settings',
            description: 'Configure system',
            icon: Settings,
            color: 'gray',
            path: '/settings',
            permission: 'settings'
          },
          {
            id: 'maintenance',
            title: 'Maintenance',
            description: 'Facility management',
            icon: Wrench,
            color: 'orange',
            path: '/maintenance',
            permission: 'infrastructure'
          },
          {
            id: 'financial-overview',
            title: 'Financial Overview',
            description: 'View financial summary',
            icon: CreditCard,
            color: 'purple',
            path: '/financial',
            permission: 'financial'
          },
          {
            id: 'academic-calendar',
            title: 'Academic Calendar',
            description: 'Manage academic events',
            icon: Calendar,
            color: 'indigo',
            path: '/schedule/calendar',
            permission: 'schedule'
          }
        ];

      case 'faculty':
        return [
          {
            id: 'grade-students',
            title: 'Grade Students',
            description: 'Update student grades',
            icon: GraduationCap,
            color: 'green',
            path: '/academics/grading',
            permission: 'academics'
          },
          {
            id: 'my-courses',
            title: 'My Courses',
            description: 'View assigned courses',
            icon: BookOpen,
            color: 'blue',
            path: '/academics/courses',
            permission: 'academics'
          },
          {
            id: 'update-profile',
            title: 'Update Profile',
            description: 'Edit faculty information',
            icon: User,
            color: 'gray',
            path: '/profile',
            permission: 'profile'
          },
          {
            id: 'class-schedule',
            title: 'Class Schedule',
            description: 'Manage class schedule',
            icon: Clock,
            color: 'purple',
            path: '/schedule/classes',
            permission: 'schedule'
          },
          {
            id: 'student-roster',
            title: 'Student Roster',
            description: 'View enrolled students',
            icon: Eye,
            color: 'indigo',
            path: '/students/list',
            permission: 'students'
          },
          {
            id: 'exam-schedule',
            title: 'Schedule Exam',
            description: 'Create exam schedule',
            icon: Edit,
            color: 'orange',
            path: '/schedule/exams',
            permission: 'schedule'
          }
        ];

      case 'student':
        return [
          {
            id: 'view-grades',
            title: 'View Grades',
            description: 'Check academic progress',
            icon: GraduationCap,
            color: 'green',
            path: '/academics/grading',
            permission: 'grades'
          },
          {
            id: 'course-registration',
            title: 'Course Registration',
            description: 'Register for courses',
            icon: BookOpen,
            color: 'blue',
            path: '/students/enrollment',
            permission: 'schedule'
          },
          {
            id: 'pay-tuition',
            title: 'Pay Tuition',
            description: 'Make payments',
            icon: CreditCard,
            color: 'purple',
            path: '/financial/payments',
            permission: 'financial'
          },
          {
            id: 'update-profile',
            title: 'Update Profile',
            description: 'Edit personal information',
            icon: User,
            color: 'gray',
            path: '/profile',
            permission: 'profile'
          },
          {
            id: 'class-schedule',
            title: 'Class Schedule',
            description: 'View timetable',
            icon: Calendar,
            color: 'indigo',
            path: '/schedule/classes',
            permission: 'schedule'
          },
          {
            id: 'upcoming-exams',
            title: 'Upcoming Exams',
            description: 'View exam schedule',
            icon: Eye,
            color: 'orange',
            path: '/schedule/exams',
            permission: 'schedule'
          }
        ];

      default:
        return [];
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300',
      gray: 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300',
      indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300'
    };
    return colorMap[color] || colorMap.gray;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      gray: 'text-gray-600',
      indigo: 'text-indigo-600'
    };
    return colorMap[color] || colorMap.gray;
  };

  const availableActions = getActionsForRole().filter(action => 
    !action.permission || hasPermission(action.permission)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <span className="text-sm text-gray-500 capitalize">
            {user?.role} Dashboard
          </span>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="p-6">
        {availableActions.length === 0 ? (
          <div className="text-center py-8">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h4 className="mt-2 text-sm font-medium text-gray-900">No actions available</h4>
            <p className="mt-1 text-sm text-gray-500">
              Contact your administrator for access.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableActions.map((action) => {
              const IconComponent = action.icon;
              const colorClasses = getColorClasses(action.color);
              const iconColorClasses = getIconColorClasses(action.color);

              return (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action.path, action.title)}
                  className={`${colorClasses} p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-left group`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${iconColorClasses} group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-500 transition-colors duration-200">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer with Role Info */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-600">
              Logged in as <span className="font-medium capitalize">{user?.role}</span>
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {availableActions.length} action{availableActions.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;