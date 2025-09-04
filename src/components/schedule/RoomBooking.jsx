// src/components/schedule/RoomBooking.jsx - Room Booking Management Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home,
  Clock, 
  MapPin,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Monitor,
  Wifi,
  Volume2,
  Coffee,
  Car,
  Settings,
  Download
} from 'lucide-react';

const RoomBooking = () => {
  const { user, hasPermission } = useAuth();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('available'); // available, booked, calendar
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [filterCapacity, setFilterCapacity] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // view, book, edit
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsData, setRoomsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [buildingsData, setBuildingsData] = useState([]);
  const [stats, setStats] = useState({});

  // Mock room and booking data
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockRooms = [
        {
          id: 'ROOM001',
          name: 'Lecture Hall A',
          building: 'Academic Building',
          floor: 1,
          roomNumber: '101',
          capacity: 150,
          type: 'Lecture Hall',
          amenities: ['Projector', 'Sound System', 'Microphone', 'Whiteboard', 'WiFi', 'Air Conditioning'],
          equipment: ['Computer', 'Document Camera', 'Recording Equipment'],
          hourlyRate: 50,
          availability: 'Available',
          bookable: true,
          description: 'Large lecture hall with tiered seating perfect for presentations and large classes.',
          image: null,
          contact: 'facilities@university.edu'
        },
        {
          id: 'ROOM002',
          name: 'Conference Room B',
          building: 'Administration Building',
          floor: 2,
          roomNumber: '205',
          capacity: 20,
          type: 'Conference Room',
          amenities: ['TV Screen', 'Conference Table', 'WiFi', 'Coffee Machine', 'Whiteboard'],
          equipment: ['Video Conferencing', 'Phone System'],
          hourlyRate: 25,
          availability: 'Available',
          bookable: true,
          description: 'Professional conference room ideal for meetings and small presentations.',
          image: null,
          contact: 'admin@university.edu'
        },
        {
          id: 'ROOM003',
          name: 'Computer Lab C',
          building: 'CS Building',
          floor: 3,
          roomNumber: '301',
          capacity: 30,
          type: 'Computer Lab',
          amenities: ['30 Computers', 'Projector', 'WiFi', 'Software Suite', 'Air Conditioning'],
          equipment: ['High-Speed Internet', 'Specialized Software'],
          hourlyRate: 75,
          availability: 'Occupied',
          bookable: true,
          description: 'Modern computer lab with latest hardware and software for programming and research.',
          image: null,
          contact: 'cs-facilities@university.edu'
        },
        {
          id: 'ROOM004',
          name: 'Study Room D',
          building: 'Library',
          floor: 2,
          roomNumber: '201',
          capacity: 8,
          type: 'Study Room',
          amenities: ['Table', 'Chairs', 'Whiteboard', 'WiFi', 'Quiet Environment'],
          equipment: ['Power Outlets', 'USB Charging'],
          hourlyRate: 15,
          availability: 'Available',
          bookable: true,
          description: 'Quiet study space perfect for group work and collaborative projects.',
          image: null,
          contact: 'library@university.edu'
        },
        {
          id: 'ROOM005',
          name: 'Auditorium E',
          building: 'Arts Building',
          floor: 1,
          roomNumber: '100',
          capacity: 300,
          type: 'Auditorium',
          amenities: ['Stage', 'Sound System', 'Lighting', 'Projector', 'Seating'],
          equipment: ['Professional Audio/Visual', 'Stage Lighting', 'Recording Capability'],
          hourlyRate: 150,
          availability: 'Maintenance',
          bookable: false,
          description: 'Grand auditorium for large events, performances, and presentations.',
          image: null,
          contact: 'arts@university.edu'
        },
        {
          id: 'ROOM006',
          name: 'Workshop Room F',
          building: 'Engineering Building',
          floor: 1,
          roomNumber: '105',
          capacity: 25,
          type: 'Workshop',
          amenities: ['Work Benches', 'Tools', 'Safety Equipment', 'Storage'],
          equipment: ['3D Printer', 'CNC Machine', 'Hand Tools'],
          hourlyRate: 60,
          availability: 'Available',
          bookable: true,
          description: 'Hands-on workshop space with tools and equipment for engineering projects.',
          image: null,
          contact: 'engineering@university.edu'
        }
      ];

      const mockBookings = [
        {
          id: 'BOOK001',
          roomId: 'ROOM001',
          roomName: 'Lecture Hall A',
          title: 'CS-301 Data Structures Lecture',
          bookedBy: 'Dr. Sarah Wilson',
          bookedById: 'FAC001',
          date: '2025-09-03',
          startTime: '10:00',
          endTime: '11:00',
          duration: 60,
          purpose: 'Class Lecture',
          status: 'Confirmed',
          attendees: 75,
          contactEmail: 'sarah.wilson@university.edu',
          contactPhone: '+1-555-1001',
          notes: 'Regular weekly lecture for Data Structures course',
          createdDate: '2025-08-15',
          cost: 50
        },
        {
          id: 'BOOK002',
          roomId: 'ROOM002',
          roomName: 'Conference Room B',
          title: 'Faculty Meeting',
          bookedBy: 'Academic Dean',
          bookedById: 'ADM001',
          date: '2025-09-05',
          startTime: '14:00',
          endTime: '16:00',
          duration: 120,
          purpose: 'Faculty Meeting',
          status: 'Confirmed',
          attendees: 15,
          contactEmail: 'dean@university.edu',
          contactPhone: '+1-555-1002',
          notes: 'Monthly faculty meeting - coffee and materials provided',
          createdDate: '2025-08-20',
          cost: 50
        },
        {
          id: 'BOOK003',
          roomId: 'ROOM003',
          roomName: 'Computer Lab C',
          title: 'Programming Workshop',
          bookedBy: 'Student Club',
          bookedById: 'CLUB001',
          date: '2025-09-07',
          startTime: '13:00',
          endTime: '15:00',
          duration: 120,
          purpose: 'Workshop',
          status: 'Pending',
          attendees: 20,
          contactEmail: 'programming.club@university.edu',
          contactPhone: '+1-555-1003',
          notes: 'Python programming workshop for beginners',
          createdDate: '2025-09-01',
          cost: 150
        },
        {
          id: 'BOOK004',
          roomId: 'ROOM004',
          roomName: 'Study Room D',
          title: 'Group Study Session',
          bookedBy: 'John Smith',
          bookedById: 'STU001',
          date: '2025-09-04',
          startTime: '16:00',
          endTime: '18:00',
          duration: 120,
          purpose: 'Study Session',
          status: 'Confirmed',
          attendees: 6,
          contactEmail: 'john.smith@university.edu',
          contactPhone: '+1-555-0123',
          notes: 'Final exam preparation for CS-301',
          createdDate: '2025-09-02',
          cost: 30
        }
      ];

      const mockBuildings = [
        'Academic Building', 'Administration Building', 'CS Building', 
        'Library', 'Arts Building', 'Engineering Building'
      ];

      // Filter based on user role
      let filteredBookings = mockBookings;
      if (user?.role === 'faculty') {
        filteredBookings = mockBookings.filter(booking => booking.bookedById === user.id);
      } else if (user?.role === 'student') {
        filteredBookings = mockBookings.filter(booking => booking.bookedById === user.id);
      }

      setRoomsData(mockRooms);
      setBookingsData(filteredBookings);
      setBuildingsData(mockBuildings);

      // Calculate stats
      const availableRooms = mockRooms.filter(room => room.availability === 'Available').length;
      const occupiedRooms = mockRooms.filter(room => room.availability === 'Occupied').length;
      const myBookings = filteredBookings.filter(booking => booking.bookedById === user?.id).length;
      const todayBookings = filteredBookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]).length;

      setStats({ availableRooms, occupiedRooms, myBookings, todayBookings });
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user]);

  const filteredRooms = roomsData.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBuilding = filterBuilding === 'all' || room.building === filterBuilding;
    
    const matchesCapacity = filterCapacity === 'all' || 
                          (filterCapacity === 'small' && room.capacity <= 20) ||
                          (filterCapacity === 'medium' && room.capacity > 20 && room.capacity <= 100) ||
                          (filterCapacity === 'large' && room.capacity > 100);
    
    return matchesSearch && matchesBuilding && matchesCapacity;
  });

  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setModalMode('view');
    setShowModal(true);
  };

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setModalMode('book');
    setShowModal(true);
  };

  const handleEditBooking = (booking) => {
    const room = roomsData.find(r => r.id === booking.roomId);
    setSelectedRoom({ ...room, booking });
    setModalMode('edit');
    setShowModal(true);
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Occupied':
        return 'bg-red-100 text-red-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'Projector': Monitor,
      'WiFi': Wifi,
      'Sound System': Volume2,
      'Coffee Machine': Coffee,
      'Parking': Car,
      'Air Conditioning': Settings
    };
    return iconMap[amenity] || Settings;
  };

  const renderAvailableRooms = () => {
    const availableRooms = filteredRooms.filter(room => room.bookable);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{room.building} - Room {room.roomNumber}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{room.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(room.availability)}`}>
                  {room.availability}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={14} className="mr-2 text-gray-400" />
                  <span>Capacity: {room.capacity} people</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Home size={14} className="mr-2 text-gray-400" />
                  <span>{room.type}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-2 text-gray-400" />
                  <span>${room.hourlyRate}/hour</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Key Amenities:</p>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleViewRoom(room)}
                  className="px-3 py-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <Eye size={14} className="inline mr-1" />
                  Details
                </button>
                
                {room.availability === 'Available' && (
                  <button
                    onClick={() => handleBookRoom(room)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBookings = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Room & Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Booked By</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{booking.roomName}</div>
                      <div className="text-sm text-gray-600">{booking.title}</div>
                      <div className="text-xs text-gray-500">{booking.purpose}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.date)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.duration} minutes
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">{booking.bookedBy}</div>
                    <div className="text-xs text-gray-500">{booking.attendees} attendees</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-900">${booking.cost}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="View/Edit Booking"
                      >
                        <Eye size={16} />
                      </button>
                      {(hasPermission('schedule') || booking.bookedById === user?.id) && (
                        <button
                          className="p-1 text-gray-600 hover:text-green-600 transition-colors"
                          title="Edit Booking"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No bookings found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Room Booking</h2>
          <p className="text-gray-600 mt-1">
            Reserve rooms and facilities for your events
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleBookRoom(null)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>New Booking</span>
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Rooms</p>
              <p className="text-2xl font-bold text-green-600">{stats.availableRooms}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Ready to book</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupied Rooms</p>
              <p className="text-2xl font-bold text-red-600">{stats.occupiedRooms}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="text-red-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Currently in use</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Bookings</p>
              <p className="text-2xl font-bold text-blue-600">{stats.myBookings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Your reservations</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-bold text-purple-600">{stats.todayBookings}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Scheduled today</span>
          </div>
        </div>
      </div>

      {/* Quick Booking */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
              <option value={180}>3 hours</option>
              <option value={240}>4 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <select
              value={filterCapacity}
              onChange={(e) => setFilterCapacity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any Size</option>
              <option value="small">Small (1-20)</option>
              <option value="medium">Medium (21-100)</option>
              <option value="large">Large (100+)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Search Available
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search rooms or bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Buildings</option>
              {buildingsData.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('available')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'available' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setViewMode('booked')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'booked' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'available' ? renderAvailableRooms() : renderBookings()}

      {/* Room Details/Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalMode === 'book' ? 'Book Room' : 
                   modalMode === 'edit' ? 'Edit Booking' : 'Room Details'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {selectedRoom && modalMode === 'view' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRoom.name}</h2>
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-1" />
                          {selectedRoom.building} - Floor {selectedRoom.floor}, Room {selectedRoom.roomNumber}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(selectedRoom.availability)}`}>
                          {selectedRoom.availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700">{selectedRoom.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users size={14} className="mr-2" />
                          <span>Capacity: {selectedRoom.capacity} people</span>
                        </div>
                        <div className="flex items-center">
                          <Home size={14} className="mr-2" />
                          <span>Type: {selectedRoom.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          <span>Rate: ${selectedRoom.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoom.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center"
                          >
                            {React.createElement(getAmenityIcon(amenity), { size: 12, className: "mr-1" })}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Equipment</h4>
                      <div className="space-y-1">
                        {selectedRoom.equipment.map((item, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle size={12} className="mr-2 text-green-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <p className="text-sm text-gray-600">
                      For questions or special requests: {selectedRoom.contact}
                    </p>
                  </div>
                </div>
              )}

              {selectedRoom && modalMode === 'book' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{selectedRoom.name}</h4>
                    <p className="text-sm text-gray-600">{selectedRoom.building} - Capacity: {selectedRoom.capacity}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter event title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select purpose</option>
                        <option value="meeting">Meeting</option>
                        <option value="class">Class</option>
                        <option value="workshop">Workshop</option>
                        <option value="event">Event</option>
                        <option value="study">Study Session</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                        <option value={180}>3 hours</option>
                        <option value={240}>4 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Attendees
                      </label>
                      <input
                        type="number"
                        placeholder="Number of attendees"
                        max={selectedRoom.capacity}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="Your contact number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any special requirements or notes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Estimated Cost:</span>
                      <span className="text-lg font-semibold text-blue-600">
                        ${selectedRoom.hourlyRate * (duration / 60)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                {modalMode === 'view' && selectedRoom?.availability === 'Available' && (
                  <button
                    onClick={() => setModalMode('book')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Book This Room
                  </button>
                )}
                {modalMode === 'book' && (
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;