import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

// Page Imports
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import DashboardOverview from '@/pages/dashboard/Overview';
import AssessmentManager from '@/pages/assessment/AssessmentManager';
import Settings from '@/pages/settings/Settings';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force the loader to show for 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen fullScreen={true} message="Initializing Glucolens..." />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardOverview />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <AssessmentManager />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
