import { Routes, Route } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RouteLinks } from '../utils/types';
import { Welcome, SignIn, SignUp, Main, NotFound } from '../pages';

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
