import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogContext } from './LoginContext'

export const LogoutHandler = () => {
    const nav = useNavigate()
    const { setLogState } = useContext(LogContext)

    function Logout(){
        localStorage.removeItem('token')
        setLogState(false)
        nav('/')
    }

  return (
    <div className="alert alert-success p-4 pb-2">
        <h2 className="alert-heading">By logging out you lose some functionality</h2>
        <button type="submit" className="btn btn-warning" onClick={Logout}>Log out</button>
    </div>
  )
}

