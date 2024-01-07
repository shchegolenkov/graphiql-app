import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteLinks } from '../../utils/types';

interface ProtectedRouteProps {
  children: ReactNode;
  user: boolean;
  route: 'welcome' | 'main';
}

const getRedirectPath = (route: string) => {
  return route === RouteLinks.Main ? RouteLinks.Main : RouteLinks.Welcome;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  user,
  route,
}) => {
  return user ? children : <Navigate to={getRedirectPath(route)} />;
};
