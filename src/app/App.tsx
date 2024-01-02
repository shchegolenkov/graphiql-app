import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '../hooks/useAuth';
import { fetchUser } from '../firebase';

import { RouteLinks } from '../utils/types';

import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { Welcome, SignIn, SignUp, Main, NotFound } from '../pages';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuth } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path={RouteLinks.Welcome} element={<Welcome />} />
        <Route
          path={RouteLinks.SignIn}
          element={
            <ProtectedRoute user={!isAuth} route="main">
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteLinks.SignUp}
          element={
            <ProtectedRoute user={!isAuth} route="main">
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteLinks.Main}
          element={
            <ProtectedRoute user={isAuth} route="welcome">
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path={RouteLinks.NotFound} element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        draggable={false}
      />
    </>
  );
}

export default App;
