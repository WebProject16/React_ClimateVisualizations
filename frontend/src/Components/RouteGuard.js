import React from 'react'
import { Link } from 'react-router-dom'

const RouteGuard = ({children}) => {

    if(localStorage.getItem('token') === null){
        return (
            <div className="alert alert-danger p-4 pb-2">
                <h2 className="alert-heading">You need to login to view this page</h2>
                <h4>
                Please
                <Link className="btn btn-success m-2 fs-5 pl-2 pr-2 text-decoration-none"to='/Login'>login</Link>
                to authenticate
                </h4>
            </div>
        )
    }

  return children
}

export default RouteGuard