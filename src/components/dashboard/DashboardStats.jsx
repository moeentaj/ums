// src/components/dashboard/DashboardStats.jsx - Fixed with Lucide Icons
import React from 'react';
import { Users, BookOpen, DollarSign, GraduationCap, Calendar, Building } from 'lucide-react';

const DashboardStats = ({ userRole }) => {
  // Different stats based on user role
  const getStatsForRole = (role) => {
    switch (role) {
      case 'admin':
        return [
          { 
            label: 'Total Students', 
            value: '2,845', 
            change: '+12%', 
            color: 'bg-blue-500',
            icon: Users
          },
          { 
            label: 'Active Courses', 
            value: '156', 
            change: '+5%', 
            color: 'bg-green-500',
            icon: BookOpen
          },
          { 
            label: 'Faculty Members', 
            value: '89', 
            change: '+2%', 
            color: 'bg-purple-500',
            icon: Users
          },
          { 
            label: 'Revenue This Month', 
            value: '$245K', 
            change: '+18%', 
            color: 'bg-yellow-500',
            icon: DollarSign
          }
        ];
      
      case 'faculty':
        return [
          { 
            label: 'My Courses', 
            value: '4', 
            change: 'This Semester', 
            color: 'bg-blue-500',
            icon: BookOpen
          },
          { 
            label: 'Total Students', 
            value: '186', 
            change: 'Enrolled', 
            color: 'bg-green-500',
            icon: Users
          },
          { 
            label: 'Pending Grades', 
            value: '23', 
            change: 'To Submit', 
            color: 'bg-yellow-500',
            icon: GraduationCap
          },
          { 
            label: 'Office Hours', 
            value: '12', 
            change: 'This Week', 
            color: 'bg-purple-500',
            icon: Calendar
          }
        ];
      
      case 'student':
        return [
          { 
            label: 'Current Courses', 
            value: '5', 
            change: 'This Semester', 
            color: 'bg-blue-500',
            icon: BookOpen
          },
          { 
            label: 'Current GPA', 
            value: '3.85', 
            change: '+0.12 from last semester', 
            color: 'bg-green-500',
            icon: GraduationCap
          },
          { 
            label: 'Credits Completed', 
            value: '89', 
            change: '31 remaining', 
            color: 'bg-purple-500',
            icon: Calendar
          },
          { 
            label: 'Upcoming Exams', 
            value: '3', 
            change: 'Next 2 weeks', 
            color: 'bg-yellow-500',
            icon: Calendar
          }
        ];
      
      default:
        return [];
    }
  };

  const stats = getStatsForRole(userRole);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mr-4`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                <p className={`text-sm ${
                  stat.change.includes('+') ? 'text-green-600' : 
                  stat.change.includes('-') ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;