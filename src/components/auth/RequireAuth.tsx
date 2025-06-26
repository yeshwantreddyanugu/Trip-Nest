// src/components/auth/RequireAuth.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
