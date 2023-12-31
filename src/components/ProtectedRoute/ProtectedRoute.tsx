import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteLinks } from '../../utils/types';

interface ProtectedRouteProps {
  children: ReactNode;
  user: boolean;
  route: 'welcome' | 'main';
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  user,
  route,
}) => {
  const getRedirectPath = () => {
    switch (route) {
      case 'main':
        return RouteLinks.Main;
      case 'welcome':
        return RouteLinks.Welcome;
      default:
        return RouteLinks.Welcome;
    }
  };
  return user ? children : <Navigate to={getRedirectPath()} />;
};
