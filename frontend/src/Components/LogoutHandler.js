import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './LoginContext'

export const LogoutHandler = () => {
    const nav = useNavigate()
    const { setIsLoggedIn } = useContext(LoginContext)

    function Logout(){
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        nav('/')
    }

  return (
    <div className="alert alert-success p-4 pb-2">
        <h2 className="alert-heading">By logging out you lose some functionality</h2>
        <button type="submit" className="btn btn-warning" onClick={Logout}>Log out</button>
    </div>
  )
}

