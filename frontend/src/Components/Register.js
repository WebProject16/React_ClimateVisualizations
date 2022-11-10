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
        e.preventDefault();
        console.log(user, password, password_rpt)
    }
    
    return (
        <>
            <h1>Register a new user</h1>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input type="password" className="form-control" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='form-group'>
                <label htmlFor='password_rpt'>Please reapeat above password:</label>
                <input type="password" id="password_rpt" className="form-control" autoComplete="off" onChange={(e) => setPassword_rpt(e.target.value)} value={password_rpt} />
            </div>
            <p></p>
            <button type="submit" className="btn btn-outline-primary">Sign up!</button>
            </form>
        </>
    )
}

export default Register