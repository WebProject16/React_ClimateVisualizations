import React from 'react';
import './App.css';
import Navbar from './Components/Navbar.js';
import Header from './Components/Header.js';
import Home from './Components/Home.js';
import Contact from './Components/Contact.js';
import Create from './Components/Create.js';
import Login from './Components/Login.js';
import Footer from './Components/Footer.js';
import Register from './Components/Register';
import { Routes, Route } from 'react-router-dom';
import RouteGuard from './Components/RouteGuard';
import LogoutHandler from './Components/LogoutHandler';

function App() {

  return (
    <>
      <Navbar />
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<LogoutHandler />} />
          <Route path="/Create" element={<RouteGuard> <Create /> </RouteGuard>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
