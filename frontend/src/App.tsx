import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Import Pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
// Placeholder for now
const Dashboard = () => <div className="p-8"><h1>Welcome to Dashboard</h1><button onClick={() => window.location.reload()}>Logout (Reload to clear)</button></div>;

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Protected Routes (We will add the Guard in the next step) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirect Root */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;