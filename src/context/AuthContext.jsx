// src/context/AuthContext.jsx - Complete Authentication Context
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const MOCK_USERS = {
  'admin@university.edu': {
    id: 'admin001',
    name: 'John Administrator',
    email: 'admin@university.edu',
    role: 'admin',
    avatar: null,
    permissions: ['all'],
    department: 'Administration',
    lastLogin: new Date().toISOString()
  },
  'faculty@university.edu': {
    id: 'faculty001',
    name: 'Dr. Sarah Wilson',
    email: 'faculty@university.edu',
    role: 'faculty',
    avatar: null,
    permissions: ['students', 'academics', 'schedule', 'graduation'],
    department: 'Computer Science',
    lastLogin: new Date().toISOString()
  },
  'student@university.edu': {
    id: 'student001',
    name: 'Jane Student',
    email: 'student@university.edu',
    role: 'student',
    avatar: null,
    permissions: ['schedule', 'grades'],
    department: 'Computer Science',
    year: '3rd Year',
    studentId: 'STU001',
    lastLogin: new Date().toISOString()
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage or set default
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('university_user');
        const savedToken = localStorage.getItem('university_token');
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          // Validate token (in real app, verify with backend)
          if (isValidToken(savedToken)) {
            setUser(parsedUser);
          } else {
            // Token expired, clear storage
            localStorage.removeItem('university_user');
            localStorage.removeItem('university_token');
          }
        } else {
          // Set default admin user for demo
          const defaultUser = MOCK_USERS['admin@university.edu'];
          const mockToken = generateMockToken(defaultUser);
          
          setUser(defaultUser);
          localStorage.setItem('university_user', JSON.stringify(defaultUser));
          localStorage.setItem('university_token', mockToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in mock data
      const mockUser = MOCK_USERS[email.toLowerCase()];
      if (!mockUser) {
        return { 
          success: false, 
          error: 'User not found. Use admin@university.edu, faculty@university.edu, or student@university.edu' 
        };
      }
      
      // In real app, validate password with backend
      if (password !== 'password123') {
        return { 
          success: false, 
          error: 'Invalid password. Use "password123" for demo.' 
        };
      }

      // Generate mock token
      const token = generateMockToken(mockUser);
      const updatedUser = {
        ...mockUser,
        lastLogin: new Date().toISOString()
      };

      setUser(updatedUser);
      localStorage.setItem('university_user', JSON.stringify(updatedUser));
      localStorage.setItem('university_token', token);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('university_user');
    localStorage.removeItem('university_token');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('university_user', JSON.stringify(updatedUser));
  };

  const switchRole = (newRole) => {
    if (!user || user.role !== 'admin') {
      console.warn('Only admin can switch roles');
      return false;
    }

    const roleUser = Object.values(MOCK_USERS).find(u => u.role === newRole);
    if (roleUser) {
      const switchedUser = {
        ...roleUser,
        switchedFrom: user.role,
        lastLogin: new Date().toISOString()
      };
      
      setUser(switchedUser);
      localStorage.setItem('university_user', JSON.stringify(switchedUser));
      return true;
    }
    
    return false;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const isAdmin = () => hasRole('admin');
  const isFaculty = () => hasRole('faculty');
  const isStudent = () => hasRole('student');

  // Mock token utilities
  function generateMockToken(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }

  function isValidToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      return Date.now() < payload.exp;
    } catch {
      return false;
    }
  }

  const value = {
    user,
    login,
    logout,
    updateUser,
    switchRole,
    hasPermission,
    hasRole,
    isAdmin,
    isFaculty,
    isStudent,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};