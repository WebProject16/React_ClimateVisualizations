import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const LogoutHandler = () => {
    const nav = useNavigate()

    function Logout(){
        console.log("logouthandler")
        localStorage.removeItem('token')
        nav('/')
        return <Navbar isLoggedIn={false}/>
    }

  return (
    <div className="alert alert-success p-4 pb-2">
        <h2 className="alert-heading">By logging out you lose some functionality</h2>
        <button type="submit" className="btn btn-warning" onClick={Logout}>Log out</button>
    </div>
  )
}

export default LogoutHandler