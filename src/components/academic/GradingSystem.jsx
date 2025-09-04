// src/components/academic/GradingSystem.jsx - Complete Grading System Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockData, getStudentById, getCourseById } from '../../data/mockData';
import {
  Award,
  BookOpen,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Edit,
  Save,
  X,
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye
} from 'lucide-react';

const GradingSystem = () => {
  const { user, hasPermission } = useAuth();
  
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrade, setEditingGrade] = useState(null);
  const [showBulkEntry, setShowBulkEntry] = useState(false);
  const [gradeStats, setGradeStats] = useState({});

  useEffect(() => {
    const loadGrades = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      const gradesData = mockData.academic?.grades || [];
      setGrades(gradesData);
      calculateGradeStats(gradesData);
      setLoading(false);
    };
    loadGrades();
  }, []);

  // Calculate grade statistics
  const calculateGradeStats = (gradesData) => {
    const stats = {
      totalStudents: gradesData.length,
      averageGPA: 0,
      gradeDistribution: {},
      completionRate: 0,
      pendingGrades: 0
    };

    if (gradesData.length > 0) {
      // Calculate average GPA
      const totalGPA = gradesData.reduce((sum, grade) => sum + grade.gpa, 0);
      stats.averageGPA = (totalGPA / gradesData.length).toFixed(2);

      // Grade distribution
      const distribution = {};
      gradesData.forEach(grade => {
        distribution[grade.finalGrade] = (distribution[grade.finalGrade] || 0) + 1;
      });
      stats.gradeDistribution = distribution;

      // Completion rate
      const completedGrades = gradesData.filter(g => g.status === 'Completed').length;
      stats.completionRate = ((completedGrades / gradesData.length) * 100).toFixed(1);

      // Pending grades
      stats.pendingGrades = gradesData.filter(g => g.status === 'In Progress').length;
    }

    setGradeStats(stats);
  };

  // Get unique courses and semesters for filtering
  const courses = [...new Set(grades.map(g => g.courseName))];
  const semesters = [...new Set(grades.map(g => g.semester))];

  // Filter grades based on selection
  const filteredGrades = grades.filter(grade => {
    const matchesCourse = selectedCourse === 'all' || grade.courseName === selectedCourse;
    const matchesSemester = selectedSemester === 'current' || grade.semester === selectedSemester;
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCourse && matchesSemester && matchesSearch;
  });

  // Grade color mapping
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  // Handle grade editing
  const handleEditGrade = (gradeId) => {
    const grade = grades.find(g => g.id === gradeId);
    setEditingGrade({ ...grade });
  };

  const saveGradeEdit = () => {
    if (editingGrade) {
      setGrades(prev => prev.map(g => 
        g.id === editingGrade.id ? editingGrade : g
      ));
      setEditingGrade(null);
    }
  };

  const cancelGradeEdit = () => {
    setEditingGrade(null);
  };

  // Grade Distribution Chart Component
  const GradeDistributionChart = () => {
    const distribution = gradeStats.gradeDistribution;
    const maxCount = Math.max(...Object.values(distribution));
    
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
        <div className="space-y-3">
          {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map(grade => {
            const count = distribution[grade] || 0;
            const percentage = filteredGrades.length > 0 ? (count / filteredGrades.length * 100) : 0;
            const widthPercentage = maxCount > 0 ? (count / maxCount * 100) : 0;
            
            return (
              <div key={grade} className="flex items-center space-x-3">
                <div className="w-8 text-sm font-medium text-gray-700">{grade}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className={`h-6 rounded-full transition-all duration-500 ${getGradeColor(grade).replace('text-', 'bg-').replace('-600', '-500')}`}
                    style={{ width: `${widthPercentage}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {count} ({percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
          ))}
        </div>
        <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average GPA</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.averageGPA}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grades</p>
              <p className="text-2xl font-bold text-gray-900">{gradeStats.pendingGrades}</p>
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current Semester</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBulkEntry(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Bulk Entry
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export Grades
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution Chart */}
        <div className="lg:col-span-1">
          <GradeDistributionChart />
        </div>

        {/* Grades Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Student Grades</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                          <div className="text-sm text-gray-500">{grade.studentId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{grade.courseName}</div>
                          <div className="text-sm text-gray-500">{grade.courseId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {grade.assignments.slice(0, 3).map((assignment, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              title={assignment.name}
                            >
                              {assignment.score}/{assignment.maxScore}
                            </span>
                          ))}
                          {grade.assignments.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                              +{grade.assignments.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getGradeColor(grade.finalGrade)}`}>
                            {grade.finalGrade}
                          </span>
                          <div className="text-xs text-gray-500">
                            GPA: {grade.gpa.toFixed(2)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          grade.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {grade.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEditGrade(grade.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit Grade"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Grade Entry */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Grade Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Select Student</option>
            {/* Would be populated with students from selected course */}
          </select>
          <input
            type="text"
            placeholder="Assignment Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Score"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Grade
          </button>
        </div>
      </div>

      {/* Grade Edit Modal */}
      {editingGrade && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Grade</h2>
                <button onClick={cancelGradeEdit} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                    <input 
                      type="text" 
                      value={editingGrade.studentName}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                    <input 
                      type="text" 
                      value={editingGrade.courseName}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Grade</label>
                  <select
                    value={editingGrade.finalGrade}
                    onChange={(e) => setEditingGrade(prev => ({...prev, finalGrade: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'].map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignments</label>
                  <div className="space-y-2">
                    {editingGrade.assignments.map((assignment, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2">
                        <input
                          type="text"
                          value={assignment.name}
                          onChange={(e) => {
                            const newAssignments = [...editingGrade.assignments];
                            newAssignments[index].name = e.target.value;
                            setEditingGrade(prev => ({...prev, assignments: newAssignments}));
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Assignment name"
                        />
                        <input
                          type="number"
                          value={assignment.score}
                          onChange={(e) => {
                            const newAssignments = [...editingGrade.assignments];
                            newAssignments[index].score = parseInt(e.target.value);
                            setEditingGrade(prev => ({...prev, assignments: newAssignments}));
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Score"
                        />
                        <input
                          type="number"
                          value={assignment.maxScore}
                          onChange={(e) => {
                            const newAssignments = [...editingGrade.assignments];
                            newAssignments[index].maxScore = parseInt(e.target.value);
                            setEditingGrade(prev => ({...prev, assignments: newAssignments}));
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Max score"
                        />
                        <input
                          type="number"
                          value={assignment.weight}
                          onChange={(e) => {
                            const newAssignments = [...editingGrade.assignments];
                            newAssignments[index].weight = parseInt(e.target.value);
                            setEditingGrade(prev => ({...prev, assignments: newAssignments}));
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Weight %"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={cancelGradeEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGradeEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredGrades.length === 0 && (
        <div className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No grades found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or add grades for students.
          </p>
        </div>
      )}
    </div>
  );
};

export default GradingSystem;