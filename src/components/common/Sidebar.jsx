// src/components/common/Sidebar.jsx - Complete Navigation Sidebar
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  User,
  Settings,
  Bell,
  Search,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen, navigationItems, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, switchRole, hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);

  // Auto-expand current section
  useEffect(() => {
    const currentItem = navigationItems.find(item => 
      location.pathname.startsWith(item.path)
    );
    if (currentItem && currentItem.subItems?.length > 0) {
      setExpandedItems(prev => ({ ...prev, [currentItem.id]: true }));
    }
  }, [location.pathname, navigationItems]);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const handleRoleSwitch = (newRole) => {
    if (switchRole(newRole)) {
      navigate('/dashboard');
    }
  };

  // Filter navigation items based on search
  const filteredNavigationItems = navigationItems.filter(item => {
    if (!searchTerm) return true;
    
    const matchesMain = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSub = item.subItems?.some(subItem => 
      subItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return matchesMain || matchesSub;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'new': return 'bg-green-500';
      case 'important': return 'bg-red-500';
      case 'ai': return 'bg-purple-500';
      case 'secure': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
      {/* Header */}
      <div className="p-4 border-b border-blue-800 flex items-center justify-between">
        <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
            <Home className="text-blue-900" size={20} />
          </div>
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
            UniMS
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-blue-800 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Search Bar */}
      {sidebarOpen && (
        <div className="p-4 border-b border-blue-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={16} />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-blue-800 text-white placeholder-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {filteredNavigationItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems[item.id];
            const isItemActive = isActive(item.path);

            return (
              <div key={item.id}>
                {/* Main Navigation Item */}
                <div className="relative">
                  <Link
                    to={item.path}
                    className={`w-full flex items-center p-3 rounded-lg mb-2 transition-colors group ${
                      isItemActive 
                        ? 'bg-blue-700 text-white shadow-lg' 
                        : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className={`ml-3 flex-1 ${!sidebarOpen && 'hidden'}`}>
                      {item.name}
                    </span>
                    
                    {/* Badge */}
                    {item.badge && sidebarOpen && (
                      <span className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(item.badge)} text-white ml-2`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Expand/Collapse Button */}
                    {hasSubItems && sidebarOpen && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleExpanded(item.id);
                        }}
                        className="ml-2 p-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    )}
                  </Link>

                  {/* Tooltip for collapsed sidebar */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Sub Navigation Items */}
                {hasSubItems && sidebarOpen && isExpanded && (
                  <div className="ml-6 mb-2 space-y-1 border-l-2 border-blue-700 pl-4">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`flex items-center p-2 rounded text-sm transition-colors group ${
                            location.pathname === subItem.path
                              ? 'bg-blue-700 text-white'
                              : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                          }`}
                        >
                          {SubIcon && <SubIcon size={16} className="mr-2" />}
                          <span className="flex-1">{subItem.name}</span>
                          
                          {/* Sub-item tooltip */}
                          {subItem.description && (
                            <div className="absolute left-full ml-2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                              {subItem.description}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Quick Actions */}
      {sidebarOpen && (
        <div className="p-4 border-t border-blue-800">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => navigate('/settings')}
              className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center"
              title="Settings"
            >
              <Settings size={16} />
            </button>
            <button
              className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center relative"
              title="Notifications"
            >
              <Bell size={16} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* User Info & Role Switcher */}
      <div className="p-4 border-t border-blue-800">
        <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
          </div>
          <div className={`ml-3 flex-1 ${!sidebarOpen && 'hidden'}`}>
            <p className="font-medium text-sm">{user?.name || 'User'}</p>
            <p className="text-xs text-blue-300 capitalize">{user?.role || 'Guest'}</p>
            {user?.department && (
              <p className="text-xs text-blue-400">{user.department}</p>
            )}
          </div>
        </div>

        {/* Role Switcher (Admin Only) */}
        {user?.role === 'admin' && sidebarOpen && (
          <div className="mt-3 space-y-1">
            <p className="text-xs text-blue-300 mb-2">Switch Role:</p>
            <div className="grid grid-cols-3 gap-1">
              {['admin', 'faculty', 'student'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    user.role === role 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-800 hover:bg-blue-700 text-blue-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Logout Button */}
        {sidebarOpen && (
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        )}

        {/* Collapsed Logout */}
        {!sidebarOpen && (
          <button
            onClick={handleLogout}
            className="w-full mt-3 p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;