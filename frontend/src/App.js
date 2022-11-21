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
import Profile from './Components/Profile'
import V1 from './Components/visualizations/V1';
import { Routes, Route } from 'react-router-dom';
import RouteGuard from './Components/RouteGuard';
import { LogoutHandler} from './Components/LogoutHandler';
import { LoginContext } from './Components/LoginContext'
import { AuthGet } from './API/request'


function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  // check if token is valid and user is logged in before showing btns in nav bar
  useEffect(() => {
    AuthGet("/user/token", (res) => {
      if(res.status === 200){
        setIsLoggedIn(true)
      }else if(res.response.status === 400){
        setIsLoggedIn(false)
      }
  })
  }, [])
  
  const isLogged = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);

  return (
    <div className='layout'>
      <LoginContext.Provider value={isLogged}>
        <Navbar />
      </LoginContext.Provider>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={ <LoginContext.Provider value={isLogged}><LogoutHandler /> </LoginContext.Provider>} />
          <Route path="/Create" element={<RouteGuard> <Create /> </RouteGuard>} />
          <Route path="/Profile" element={<RouteGuard> <Profile/> </RouteGuard>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<LoginContext.Provider value={isLogged}> <Login /> </LoginContext.Provider>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/v1" element={<V1 />} />
        </Routes>
      </div>
      <Footer />
      </div>
  );
}

export default App;
