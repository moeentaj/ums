// src/components/graduation/AlumniRelations.jsx - Alumni Relations Management Component

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  UsersIcon,
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  CalendarIcon,
  TrophyIcon,
  HeartIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AlumniRelations = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterEmployment, setFilterEmployment] = useState('all');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [activeTab, setActiveTab] = useState('directory');

  // Mock data for alumni
  const mockAlumni = [
    {
      id: 'ALU001',
      studentId: 'STU2020001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0123',
      graduationYear: 2020,
      degree: 'Bachelor of Science',
      program: 'Computer Science',
      gpa: 3.85,
      currentEmployer: 'Google Inc.',
      currentPosition: 'Software Engineer',
      industry: 'Technology',
      location: 'Mountain View, CA',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      personalWebsite: 'https://sarahjohnson.dev',
      homeAddress: '123 Tech Street, Mountain View, CA 94041',
      emergencyContact: 'Robert Johnson (Father) - 555-0124',
      achievements: ['Dean\'s List 2019-2020', 'Outstanding CS Student Award'],
      involvement: ['Alumni Mentorship Program', 'Annual Giving Donor'],
      donations: [
        { year: 2021, amount: 500, campaign: 'Annual Fund' },
        { year: 2022, amount: 750, campaign: 'Scholarship Fund' },
        { year: 2023, amount: 1000, campaign: 'Computer Science Lab Renovation' }
      ],
      events: [
        { name: 'Alumni Homecoming 2023', date: '2023-10-15', attended: true },
        { name: 'Tech Industry Panel 2023', date: '2023-09-20', attended: true, role: 'Panelist' }
      ],
      lastContact: '2024-02-15',
      contactNotes: 'Interested in guest lecturing. Very engaged alumni.',
      status: 'active',
      privacy: 'public'
    },
    {
      id: 'ALU002',
      studentId: 'STU2019045',
      firstName: 'Michael',
      lastName: 'Chen',
      fullName: 'Michael Chen',
      email: 'michael.chen@healthcare.org',
      phone: '+1-555-0234',
      graduationYear: 2019,
      degree: 'Master of Business Administration',
      program: 'Business Administration',
      gpa: 3.92,
      currentEmployer: 'City General Hospital',
      currentPosition: 'Healthcare Administrator',
      industry: 'Healthcare',
      location: 'Chicago, IL',
      linkedinUrl: 'https://linkedin.com/in/michaelchen',
      personalWebsite: null,
      homeAddress: '456 Health Ave, Chicago, IL 60601',
      emergencyContact: 'Lisa Chen (Spouse) - 555-0235',
      achievements: ['MBA Valedictorian', 'Healthcare Innovation Award 2022'],
      involvement: ['Board of Trustees', 'Alumni Career Services'],
      donations: [
        { year: 2020, amount: 1500, campaign: 'MBA Program Enhancement' },
        { year: 2021, amount: 2000, campaign: 'Annual Fund' },
        { year: 2022, amount: 2500, campaign: 'Student Scholarship' },
        { year: 2023, amount: 3000, campaign: 'Healthcare Leadership Program' }
      ],
      events: [
        { name: 'MBA Alumni Reunion 2023', date: '2023-11-10', attended: true, role: 'Organizer' },
        { name: 'Healthcare Leadership Summit', date: '2023-08-15', attended: true, role: 'Keynote Speaker' }
      ],
      lastContact: '2024-03-01',
      contactNotes: 'Major donor. Very supportive of healthcare programs.',
      status: 'active',
      privacy: 'public'
    },
    {
      id: 'ALU003',
      studentId: 'STU2021078',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      fullName: 'Emily Rodriguez',
      email: 'emily.rodriguez@startup.com',
      phone: '+1-555-0345',
      graduationYear: 2021,
      degree: 'Bachelor of Science',
      program: 'Biology',
      gpa: 3.67,
      currentEmployer: 'BioTech Innovations',
      currentPosition: 'Research Scientist',
      industry: 'Biotechnology',
      location: 'San Francisco, CA',
      linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
      personalWebsite: 'https://emilyresearch.com',
      homeAddress: '789 Innovation Dr, San Francisco, CA 94103',
      emergencyContact: 'Carlos Rodriguez (Father) - 555-0346',
      achievements: ['Undergraduate Research Excellence Award', 'Biology Department Honor Society'],
      involvement: ['Young Alumni Council', 'Science Mentorship Program'],
      donations: [
        { year: 2022, amount: 250, campaign: 'Recent Graduates Fund' },
        { year: 2023, amount: 500, campaign: 'Biology Lab Equipment' }
      ],
      events: [
        { name: 'Young Alumni Mixer 2023', date: '2023-12-01', attended: true },
        { name: 'Science Career Fair 2023', date: '2023-10-20', attended: true, role: 'Career Advisor' }
      ],
      lastContact: '2024-01-20',
      contactNotes: 'Recent graduate. Very enthusiastic about mentoring current students.',
      status: 'active',
      privacy: 'public'
    },
    {
      id: 'ALU004',
      studentId: 'STU2018112',
      firstName: 'David',
      lastName: 'Kim',
      fullName: 'David Kim',
      email: 'david.kim@consulting.com',
      phone: '+1-555-0456',
      graduationYear: 2018,
      degree: 'Bachelor of Engineering',
      program: 'Mechanical Engineering',
      gpa: 3.73,
      currentEmployer: 'McKinsey & Company',
      currentPosition: 'Senior Consultant',
      industry: 'Consulting',
      location: 'New York, NY',
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      personalWebsite: null,
      homeAddress: '321 Consulting Plaza, New York, NY 10001',
      emergencyContact: 'Jennifer Kim (Spouse) - 555-0457',
      achievements: ['Engineering Excellence Award', 'Phi Beta Kappa'],
      involvement: ['Alumni Interview Committee', 'Engineering Advisory Board'],
      donations: [
        { year: 2019, amount: 800, campaign: 'Engineering Scholarship' },
        { year: 2021, amount: 1200, campaign: 'Annual Fund' },
        { year: 2023, amount: 1500, campaign: 'Engineering Lab Upgrade' }
      ],
      events: [
        { name: 'Engineering Alumni Conference 2023', date: '2023-09-25', attended: true },
        { name: 'Alumni Networking Night NYC', date: '2023-11-18', attended: false }
      ],
      lastContact: '2023-12-10',
      contactNotes: 'Busy schedule but very supportive. Prefers email communication.',
      status: 'active',
      privacy: 'limited'
    }
  ]

  const programs = ['all', 'Computer Science', 'Business Administration', 'Biology', 'Mechanical Engineering'];
  const years = ['all', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  const employmentStatuses = ['all', 'employed', 'unemployed', 'student', 'retired', 'entrepreneur'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Consulting', 'Biotechnology', 'Manufacturing', 'Other'];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAlumni(mockAlumni);
        setFilteredAlumni(mockAlumni);
      } catch (error) {
        console.error('Error loading alumni data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = alumni.filter(alumnus => {
      const matchesSearch = alumnus.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumnus.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumnus.currentEmployer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alumnus.currentPosition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = filterProgram === 'all' || alumnus.program === filterProgram;
      const matchesYear = filterYear === 'all' || alumnus.graduationYear.toString() === filterYear;
      const matchesEmployment = filterEmployment === 'all' || 
        (filterEmployment === 'employed' && alumnus.currentEmployer) ||
        (filterEmployment === 'unemployed' && !alumnus.currentEmployer);

      return matchesSearch && matchesProgram && matchesYear && matchesEmployment;
    });

    setFilteredAlumni(filtered);
  }, [alumni, searchQuery, filterProgram, filterYear, filterEmployment]);

  const getInvolvementColor = (involvement) => {
    if (involvement.includes('Board') || involvement.includes('Trustee')) return 'bg-purple-100 text-purple-800';
    if (involvement.includes('Donor')) return 'bg-green-100 text-green-800';
    if (involvement.includes('Mentor')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const calculateTotalDonations = (donations) => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };

  const AlumnusProfileModal = ({ isOpen, onClose, alumnus }) => {
    if (!isOpen || !alumnus) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{alumnus.fullName}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{alumnus.fullName}</h2>
                <p className="text-gray-600">{alumnus.currentPosition} at {alumnus.currentEmployer}</p>
                <p className="text-gray-500">{alumnus.degree} in {alumnus.program} • Class of {alumnus.graduationYear}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {alumnus.location}
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 mr-1" />
                    {alumnus.email}
                  </div>
                  {alumnus.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      {alumnus.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Professional Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Current Employer:</span> {alumnus.currentEmployer}</div>
                  <div><span className="font-medium">Position:</span> {alumnus.currentPosition}</div>
                  <div><span className="font-medium">Industry:</span> {alumnus.industry}</div>
                  {alumnus.linkedinUrl && (
                    <div><span className="font-medium">LinkedIn:</span> 
                      <a href={alumnus.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                        View Profile
                      </a>
                    </div>
                  )}
                  {alumnus.personalWebsite && (
                    <div><span className="font-medium">Website:</span> 
                      <a href={alumnus.personalWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Academic Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Student ID:</span> {alumnus.studentId}</div>
                  <div><span className="font-medium">Graduation Year:</span> {alumnus.graduationYear}</div>
                  <div><span className="font-medium">Degree:</span> {alumnus.degree}</div>
                  <div><span className="font-medium">Program:</span> {alumnus.program}</div>
                  <div><span className="font-medium">GPA:</span> {alumnus.gpa}</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {alumnus.achievements && alumnus.achievements.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Achievements & Awards</h4>
                <div className="space-y-1">
                  {alumnus.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <TrophyIcon className="h-4 w-4 text-yellow-500 mr-2" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alumni Involvement */}
            {alumnus.involvement && alumnus.involvement.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Alumni Involvement</h4>
                <div className="flex flex-wrap gap-2">
                  {alumnus.involvement.map((activity, index) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${getInvolvementColor(activity)}`}>
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Donation History */}
            {alumnus.donations && alumnus.donations.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Donation History (Total: ${calculateTotalDonations(alumnus.donations).toLocaleString()})
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {alumnus.donations.map((donation, index) => (
                        <tr key={index} className="text-sm">
                          <td className="px-4 py-2">{donation.year}</td>
                          <td className="px-4 py-2 font-medium">${donation.amount.toLocaleString()}</td>
                          <td className="px-4 py-2">{donation.campaign}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Event Participation */}
            {alumnus.events && alumnus.events.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Event Participation</h4>
                <div className="space-y-2">
                  {alumnus.events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.name}</div>
                        <div className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.role && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{event.role}</span>
                        )}
                        {event.attended ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Notes */}
            {alumnus.contactNotes && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Notes</h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                  {alumnus.contactNotes}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last Contact: {new Date(alumnus.lastContact).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
            {hasPermission('graduation.write') && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 text-${color}-600 mr-3`} />
        <div>
          <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const summaryStats = {
    totalAlumni: filteredAlumni.length,
    totalDonations: filteredAlumni.reduce((sum, alumnus) => sum + calculateTotalDonations(alumnus.donations), 0),
    activeInvolvement: filteredAlumni.filter(a => a.involvement && a.involvement.length > 0).length,
    recentGraduates: filteredAlumni.filter(a => a.graduationYear >= 2020).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Alumni Relations</h2>
          <p className="text-gray-600">Track and engage with the alumni network</p>
        </div>
        {hasPermission('graduation.write') && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Alumni</span>
          </button>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={UsersIcon}
          title="Total Alumni"
          value={summaryStats.totalAlumni.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={HeartIcon}
          title="Total Donations"
          value={`${summaryStats.totalDonations.toLocaleString()}`}
          color="green"
        />
        <StatCard
          icon={TrophyIcon}
          title="Active Involvement"
          value={summaryStats.activeInvolvement}
          subtitle="engaged alumni"
          color="purple"
        />
        <StatCard
          icon={AcademicCapIcon}
          title="Recent Graduates"
          value={summaryStats.recentGraduates}
          subtitle="since 2020"
          color="yellow"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 p-6">
            {[
              { id: 'directory', name: 'Alumni Directory', icon: UsersIcon },
              { id: 'analytics', name: 'Analytics', icon: TrophyIcon },
              { id: 'engagement', name: 'Engagement', icon: HeartIcon }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'directory' && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search alumni..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <select
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {programs.map(program => (
                      <option key={program} value={program}>
                        {program === 'all' ? 'All Programs' : program}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0 flex-1">
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year === 'all' ? 'All Years' : `Class of ${year}`}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    const csvContent = [
                      ['Name', 'Email', 'Program', 'Graduation Year', 'Current Employer', 'Current Position', 'Location'],
                      ...filteredAlumni.map(alumnus => [
                        alumnus.fullName,
                        alumnus.email,
                        alumnus.program,
                        alumnus.graduationYear,
                        alumnus.currentEmployer,
                        alumnus.currentPosition,
                        alumnus.location
                      ])
                    ].map(row => row.join(',')).join('\n');
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'alumni-directory.csv';
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>

              {/* Alumni Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alumnus) => (
                  <div key={alumnus.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-150">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{alumnus.fullName}</h3>
                          <p className="text-sm text-gray-600">Class of {alumnus.graduationYear}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedAlumnus(alumnus);
                          setShowProfileModal(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                        <span>{alumnus.program}</span>
                      </div>
                      <div className="flex items-center">
                        <BriefcaseIcon className="h-4 w-4 mr-2" />
                        <span className="truncate">{alumnus.currentPosition} at {alumnus.currentEmployer}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span>{alumnus.location}</span>
                      </div>
                    </div>

                    {alumnus.involvement && alumnus.involvement.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {alumnus.involvement.slice(0, 2).map((activity, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getInvolvementColor(activity)}`}>
                            {activity}
                          </span>
                        ))}
                        {alumnus.involvement.length > 2 && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{alumnus.involvement.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-500">
                        Total donated: ${calculateTotalDonations(alumnus.donations).toLocaleString()}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <EnvelopeIcon className="h-4 w-4" />
                        </button>
                        {alumnus.linkedinUrl && (
                          <a href={alumnus.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <GlobeAltIcon className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAlumni.length === 0 && (
                <div className="text-center py-12">
                  <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Alumni Analytics</h3>
              
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Employment Rate</h4>
                  <div className="text-3xl font-bold text-blue-600">96%</div>
                  <div className="text-sm text-blue-600">of recent graduates employed</div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Average Donation</h4>
                  <div className="text-3xl font-bold text-green-600">$1,247</div>
                  <div className="text-sm text-green-600">per active donor</div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                  <h4 className="text-sm font-medium text-purple-800 mb-2">Engagement Rate</h4>
                  <div className="text-3xl font-bold text-purple-600">73%</div>
                  <div className="text-sm text-purple-600">alumni actively engaged</div>
                </div>
              </div>

              {/* Program Distribution */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Alumni by Program</h4>
                <div className="space-y-3">
                  {programs.slice(1).map(program => {
                    const count = filteredAlumni.filter(a => a.program === program).length;
                    const percentage = filteredAlumni.length > 0 ? (count / filteredAlumni.length) * 100 : 0;
                    return (
                      <div key={program} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{program}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Industry Distribution */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Alumni by Industry</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {industries.map(industry => {
                    const count = filteredAlumni.filter(a => a.industry === industry).length;
                    return (
                      <div key={industry} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">{industry}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Alumni Engagement</h3>
              
              {/* Engagement Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Top Donors</h4>
                  <div className="space-y-3">
                    {filteredAlumni
                      .sort((a, b) => calculateTotalDonations(b.donations) - calculateTotalDonations(a.donations))
                      .slice(0, 5)
                      .map(alumnus => (
                        <div key={alumnus.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{alumnus.fullName}</div>
                            <div className="text-sm text-gray-600">Class of {alumnus.graduationYear}</div>
                          </div>
                          <div className="font-bold text-green-600">
                            ${calculateTotalDonations(alumnus.donations).toLocaleString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Most Active Alumni</h4>
                  <div className="space-y-3">
                    {filteredAlumni
                      .sort((a, b) => (b.involvement?.length || 0) - (a.involvement?.length || 0))
                      .slice(0, 5)
                      .map(alumnus => (
                        <div key={alumnus.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{alumnus.fullName}</div>
                            <div className="text-sm text-gray-600">{alumnus.program}</div>
                          </div>
                          <div className="text-sm font-medium text-blue-600">
                            {alumnus.involvement?.length || 0} activities
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Recent Contacts */}
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Contacts</h4>
                <div className="space-y-4">
                  {filteredAlumni
                    .sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact))
                    .slice(0, 8)
                    .map(alumnus => (
                      <div key={alumnus.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{alumnus.fullName}</div>
                            <div className="text-sm text-gray-600">{alumnus.currentEmployer}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">{new Date(alumnus.lastContact).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">Last contact</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Engagement Actions */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Engagement Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span>Send Newsletter</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Plan Event</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
                    <HeartIcon className="h-5 w-5" />
                    <span>Launch Campaign</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alumni Profile Modal */}
      <AlumnusProfileModal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedAlumnus(null);
        }}
        alumnus={selectedAlumnus}
      />

      {/* Add Alumni Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Alumni Profile</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="text-center py-12">
              <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Add Alumni Form</h4>
              <p className="text-gray-600 mb-4">
                This form would allow you to add new alumni profiles with all their information.
              </p>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Implementation Coming Soon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniRelations;