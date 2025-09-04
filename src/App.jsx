// App.jsx - Complete Main Application File
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import page components
import Dashboard from './pages/Dashboard';
import StudentModule from './pages/StudentModule';
import AcademicModule from './pages/AcademicModule';
import FinancialModule from './pages/FinancialModule';
import InfrastructureModule from './pages/InfrastructureModule';
import SecurityModule from './pages/SecurityModule';
import ScheduleModule from './pages/ScheduleModule';
import GraduationModule from './pages/GraduationModule';
import SettingsModule from './pages/SettingsModule';

// Import common components
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

// Import context providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Import utilities
import { getNavigationForRole } from './data/navigationItems';

console.log({
  Dashboard, StudentModule, AcademicModule, FinancialModule,
  InfrastructureModule, SecurityModule, ScheduleModule, GraduationModule,
  SettingsModule, Sidebar, Header
});

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-50">
            <AppContent />
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading University Management System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navigationItems = getNavigationForRole(user.role);

  return (
    <div className="flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        navigationItems={navigationItems}
        user={user}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students/*" element={<StudentModule />} />
            <Route path="/academics/*" element={<AcademicModule />} />
            <Route path="/financial/*" element={<FinancialModule />} />
            <Route path="/infrastructure/*" element={<InfrastructureModule />} />
            <Route path="/security/*" element={<SecurityModule />} />
            <Route path="/schedule/*" element={<ScheduleModule />} />
            <Route path="/graduation/*" element={<GraduationModule />} />
            <Route path="/settings/*" element={<SettingsModule />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;