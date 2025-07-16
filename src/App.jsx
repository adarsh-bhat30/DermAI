import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Diagnosis from './pages/Diagnosis/Diagnosis';
import Report from './pages/Report/Report';
import Login from './pages/Login/Login'; 
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const App = () => {
  const location = useLocation();

  // Hide Navbar and Footer only on /login page
  const hideNavFooter = location.pathname === '/login';

  return (
    <div className='app'>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/diagnosis' element={<Diagnosis />} />
        <Route path='/report' element={<Report />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default App;





