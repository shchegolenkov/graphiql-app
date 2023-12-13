import { Routes, Route } from 'react-router-dom';

import { Main } from '../pages/Main';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Welcome } from '../pages/Welcome';
import { NotFound } from '../pages/404';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import './App.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
