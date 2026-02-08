import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

// Page Imports 
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import DashboardOverview from '@/pages/dashboard/Overview';
import AssessmentManager from '@/pages/assessment/AssessmentManager';
import Settings from '@/pages/settings/Settings';

const App = () => {
  // NO loading state here. The app loads instantly.
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
