import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  user: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  user,
}) => {
  return user ? children : <Navigate to="/"></Navigate>;
};
