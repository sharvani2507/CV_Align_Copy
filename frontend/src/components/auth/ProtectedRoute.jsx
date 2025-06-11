import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      case 'hiring_manager':
        return <Navigate to="/hiring-manager/dashboard" />;
      case 'recruiter':
        return <Navigate to="/recruiter/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
} 