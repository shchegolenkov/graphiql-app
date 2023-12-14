import { Routes, Route } from 'react-router-dom';

import { Main } from '../pages/Main';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Welcome } from '../pages/Welcome';
import { NotFound } from '../pages/404';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import './App.scss';
import { RouteLinks } from '../utils/types';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={RouteLinks.Welcome} element={<Welcome />} />
        <Route path={RouteLinks.SignIn} element={<SignIn />} />
        <Route path={RouteLinks.SignUp} element={<SignUp />} />
        <Route path={RouteLinks.Main} element={<Main />} />
        <Route path={RouteLinks.NotFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
