import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Contact from './components/Contact.js';
import Create from './components/Create.js';
import Login from './components/Login.js';
import Footer from './components/Footer.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
