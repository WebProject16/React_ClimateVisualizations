import React from 'react'
import {useRef, useState, useEffect} from 'react'
import {Post} from '../API/request';
import { Link } from 'react-router-dom';
import { checkInput } from './sanitizeInput';

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

        if(password !== password_rpt){
            return setErrMsg("Passwords must match")
        }

        let validate = checkInput(user, password)

        if(validate !== "")
            return setErrMsg(validate)

        await Post("/user/register",{username:user,password:password,password_rpt:password_rpt},
        (res) => {
            if(res.status === 200){
                setSuccess(true)
            }else if(res.response.status === 400){
                setErrMsg(res.response.data.msg)
            }
        })
    }
    
    return (
        <div className="d-flex justify-content-center">

            {success ? (
                    <div className="alert alert-success p-4 pb-2">
                        <h2 className="alert-heading">User successfully created</h2>
                        <h4>
                        Please
                        <Link className="btn btn-success m-2 fs-5 pl-2 pr-2 text-decoration-none"to='/Login'>login</Link>
                        to authenticate
                        </h4>
                    </div>
                ) : (           
            <form onSubmit={handleSubmit}>
            <h1>Register a new user</h1>
            <div className='form-group pb-2 pt-4 w-750'>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password'>Password:</label>
                <input type="password" className="form-control" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password_rpt'>Please repeat the password:</label>
                <input type="password" id="password_rpt" className="form-control" autoComplete="off" onChange={(e) => setPassword_rpt(e.target.value)} value={password_rpt} />
            </div>
            <p ref={errRef} className={errMsg ? "alert alert-danger" : "offscreen"} >{errMsg}</p>
            <button type="submit" className="btn btn-outline-primary">Sign up!</button>
            </form>
            )}
        </div>
    )
}

export default Register