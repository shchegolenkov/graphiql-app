import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { fetchUser } from '../firebase';

import { RouteLinks } from '../utils/types';

import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { Welcome, SignIn, SignUp, Main, NotFound } from '../pages';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

function App() {
  const { isAuth } = useAuth();
  useEffect(() => {
    fetchUser();
  }, [isAuth]);
  return (
    <>
      <Header />
      <Routes>
        <Route path={RouteLinks.Welcome} element={<Welcome />} />
        <Route path={RouteLinks.SignIn} element={<SignIn />} />
        <Route path={RouteLinks.SignUp} element={<SignUp />} />
        <Route
          path={RouteLinks.Main}
          element={
            <ProtectedRoute user={isAuth}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path={RouteLinks.NotFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
