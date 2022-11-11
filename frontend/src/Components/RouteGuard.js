import React from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({children}) => {

    //todo implement authentication


    if(localStorage.getItem('token') === null){
        return <Navigate to="/Login" replace={true} />
    }

  return children
}

export default RouteGuard