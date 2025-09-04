// src/components/academic/FacultyWorkload.jsx - Complete Faculty Workload Management
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData } from '../../data/mockData';
import {
  Users,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  GraduationCap
} from 'lucide-react';

const FacultyWorkload = () => {
  const { user, hasPermission } = useAuth();
  
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [workloadFilter, setWorkloadFilter] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const loadFaculty = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Enhance faculty data with calculated workload metrics
      const enhancedFaculty = mockData.faculty.map(member => {
        const courseCount = member.currentCourses?.length || 0;
        const studentCount = member.advisingStudents?.length || 0;
        const totalLoad = courseCount + Math.floor(studentCount / 5); // 5 advisees = 1 course equivalent
        
        let workloadLevel;
        if (totalLoad >= 6) workloadLevel = 'High';
        else if (totalLoad >= 4) workloadLevel = 'Normal';
        else workloadLevel = 'Low';

        return {
          ...member,
          courseCount,
          studentCount,
          totalLoad,
          workloadLevel,
          utilizationRate: Math.min((totalLoad / 6) * 100, 100) // Assuming 6 is max recommended load
        };
      });
      
      setFaculty(enhancedFaculty);
      setLoading(false);
    };
    loadFaculty();
  }, []);

  // Filter faculty based on search and filters
  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesWorkload = workloadFilter === 'all' || member.workloadLevel === workloadFilter;
    
    return matchesSearch && matchesDepartment && matchesWorkload;
  });

  // Get unique departments
  const departments = [...new Set(faculty.map(f => f.department))];

  // Calculate overall statistics
  const overallStats = {
    totalFaculty: faculty.length,
    averageLoad: faculty.length > 0 ? (faculty.reduce((sum, f) => sum + f.totalLoad, 0) / faculty.length).toFixed(1) : 0,
    highWorkload: faculty.filter(f => f.workloadLevel === 'High').length,
    underutilized: faculty.filter(f => f.workloadLevel === 'Low').length,
    averageStudentsPerFaculty: faculty.length > 0 ? Math.round(faculty.reduce((sum, f) => sum + f.studentCount, 0) / faculty.length) : 0
  };

  // Workload color coding
  const getWorkloadColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'Low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Utilization bar component
  const UtilizationBar = ({ rate }) => {
    const color = rate >= 80 ? 'bg-red-500' : rate >= 60 ? 'bg-yellow-500' : 'bg-green-500';
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(rate, 100)}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          ))}
        </div>
        <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Faculty Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Faculty</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.totalFaculty}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Load</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageLoad}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">High Workload</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.highWorkload}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Underutilized</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.underutilized}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Advisees</p>
              <p className="text-2xl font-bold text-gray-900">{overallStats.averageStudentsPerFaculty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={workloadFilter}
            onChange={(e) => setWorkloadFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Workloads</option>
            <option value="High">High Load</option>
            <option value="Normal">Normal Load</option>
            <option value="Low">Low Load</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setShowAssignModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Assign Course
          </button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Load</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFaculty.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.title}</div>
                        <div className="text-xs text-gray-400">{member.experience} experience</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.department}</div>
                    <div className="text-sm text-gray-500">Office: {member.office}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{member.courseCount}</div>
                          <div className="text-xs text-gray-500">Courses</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{member.studentCount}</div>
                          <div className="text-xs text-gray-500">Advisees</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-purple-600">{member.totalLoad}</div>
                          <div className="text-xs text-gray-500">Total Load</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24">
                      <UtilizationBar rate={member.utilizationRate} />
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {member.utilizationRate.toFixed(0)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getWorkloadColor(member.workloadLevel)}`}>
                      {member.workloadLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedFaculty(member)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Edit Assignment">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="View Schedule">
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workload Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workload Distribution by Department</h3>
          <div className="space-y-4">
            {departments.map(dept => {
              const deptFaculty = faculty.filter(f => f.department === dept);
              const avgLoad = deptFaculty.length > 0 ? 
                (deptFaculty.reduce((sum, f) => sum + f.totalLoad, 0) / deptFaculty.length) : 0;
              
              return (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{dept}</span>
                      <span className="text-gray-500">{avgLoad.toFixed(1)} avg load</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((avgLoad / 6) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-500">
                    {deptFaculty.length} faculty
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {overallStats.highWorkload > 0 && (
              <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium text-red-800">High Workload Alert</div>
                  <div className="text-sm text-red-700">
                    {overallStats.highWorkload} faculty members have high workloads. Consider redistributing courses.
                  </div>
                </div>
              </div>
            )}
            
            {overallStats.underutilized > 0 && (
              <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800">Capacity Available</div>
                  <div className="text-sm text-yellow-700">
                    {overallStats.underutilized} faculty members could take on additional courses or advisees.
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">Balanced Distribution</div>
                <div className="text-sm text-blue-700">
                  Maintain current load distribution for optimal faculty performance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Detail Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedFaculty.name}</h2>
                  <p className="text-gray-600">{selectedFaculty.title} • {selectedFaculty.department}</p>
                </div>
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedFaculty.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedFaculty.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedFaculty.office}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedFaculty.officeHours}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Academic Background</h3>
                  <div className="space-y-1 text-sm">
                    {selectedFaculty.education.map((edu, index) => (
                      <div key={index} className="text-gray-700">{edu}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Courses</h3>
                  <div className="space-y-1">
                    {selectedFaculty.currentCourses?.map(course => (
                      <div key={course} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Research Areas</h3>
                  <div className="space-y-1">
                    {selectedFaculty.researchAreas?.map(area => (
                      <div key={area} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No faculty found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyWorkload;