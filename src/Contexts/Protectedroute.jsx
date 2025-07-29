import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext';
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-lg font-bold text-purple-700">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
