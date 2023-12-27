import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteLinks } from '../../utils/types';

interface ProtectedRouteProps {
  children: ReactNode;
  user: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, user }) => {
  return user ? children : <Navigate to={RouteLinks.Welcome}></Navigate>;
};
