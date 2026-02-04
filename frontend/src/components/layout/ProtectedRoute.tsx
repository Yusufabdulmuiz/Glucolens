import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If not logged in, redirect to Login
  // We save the current location so we can send them back after they login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};