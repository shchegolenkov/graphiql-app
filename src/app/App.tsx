import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { selectModalActive } from '../store/modal/selectors';
import { useAppSelector } from '../hooks/redux-hook';
import { useAuth } from '../hooks/useAuth';
import { fetchUser } from '../firebase';

import { RouteLinks } from '../utils/types';

import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { Welcome, SignIn, SignUp, Main, NotFound } from '../pages';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import Modal from '../components/Modal/Modal';

function App() {
  const { isAuth } = useAuth();
  const { isModalActive } = useAppSelector(selectModalActive);

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
      {isModalActive && <Modal />}
      <Footer />
    </>
  );
}

export default App;
