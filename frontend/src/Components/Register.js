import React from 'react'
import {useRef, useState, useEffect} from 'react'
import {Post} from '../API/request';
import { Link } from 'react-router-dom';

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password_rpt, setPassword_rpt] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(() => {
      userRef.current.focus();
    }, [])
    
    useEffect(() => {
      setErrMsg('');
    }, [user, password, password_rpt])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user || !password || !password_rpt) {
            errRef.current.focus();
            return setErrMsg('Please fill all fields!');
        }
        await Post("/user/register",{username:user,password:password,password_rpt:password_rpt},
        function(res){
            if(res.status === 200){
                setSuccess(true)
            }else if(res.response.status === 400){
                setErrMsg(res.response.data.msg)
            }
        })
        
    }
    
    return (
        <>
            {success ? (
                    <div className="alert alert-success">
                        <h2 className="alert-heading">User successfully created!</h2>
                        <h4>
                        Please<Link className="badge badge-primary"to='/Login'> login </Link>to authenticate!
                        </h4>
                    </div>
                ) : (           
            <form onSubmit={handleSubmit}>
            <h1>Register a new user</h1>
            <div className='form-group'>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input type="password" className="form-control" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='form-group'>
                <label htmlFor='password_rpt'>Please repeat the password:</label>
                <input type="password" id="password_rpt" className="form-control" autoComplete="off" onChange={(e) => setPassword_rpt(e.target.value)} value={password_rpt} />
            </div>
            <br />
            <p ref={errRef} className={errMsg ? "alert alert-danger" : "offscreen"} >{errMsg}</p><br />
            <button type="submit" className="btn btn-outline-primary">Sign up!</button>
            </form>
            )}
        </>
    )
}

export default Register