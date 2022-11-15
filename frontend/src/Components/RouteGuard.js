import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthGet } from '../API/request'

const RouteGuard = ({children}) => {

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // check before token validity before loading the actual component 
    useEffect(() => {

        AuthGet("/user/token", (res) => {
            if(res.status === 200){
                setTokenIsValid(true)
            }else if(res.response.status === 400){
                setTokenIsValid(false)
            }
      
            setIsLoaded(true)
        })
    }, [])

    if(!tokenIsValid && isLoaded){
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
    }else if(tokenIsValid && isLoaded){

        return children
    }
}

export default RouteGuard