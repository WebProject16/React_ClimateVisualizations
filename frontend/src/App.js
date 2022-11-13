import React, { useState, useMemo, useEffect } from 'react';
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
import { LogoutHandler} from './Components/LogoutHandler';
import { LogContext } from './Components/LoginContext'


function App() {
  const [ logState, setLogState ] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token') === null){
      setLogState(false);
    }else{
      setLogState(true);
    }
  }, [])
  


  const log = useMemo(() => ({ logState, setLogState }), [logState, setLogState]);

  return (
    <>
      <LogContext.Provider value={log}>
        <Navbar />
      </LogContext.Provider>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={ <LogContext.Provider value={log}>
                                            <LogoutHandler />
                                          </LogContext.Provider>} />
          <Route path="/Create" element={<RouteGuard> <Create /> </RouteGuard>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<LogContext.Provider value={log}> <Login /> </LogContext.Provider>} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
