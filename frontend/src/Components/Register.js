import React from 'react'
import {useRef, useState, useEffect} from 'react'

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password_rpt, setPassword_rpt] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
      userRef.current.focus();
    }, [])
    
    useEffect(() => {
      setErrMsg('');
    }, [user, password, password_rpt])
    
    const handleSubmit = async (e) => {
        console.log(user)
    }
    
    return (
        <>
            <h1>Register a new user</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />

            </form>
        </>
    )
}

export default Register