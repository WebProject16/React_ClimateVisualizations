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
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== password_rpt){
            return setErrMsg("Salasanat eivät täsmää")
        }

        let validate = checkInput(user, password)

        if(validate !== "")
            return setErrMsg(validate)

        Post("/user/register",{username:user,password:password,password_rpt:password_rpt},
        (res) => {
            if(res.status === 200){
                setErrMsg('')
                setPassword('')
                setUser('')
                setSuccess(true)
            }else if(res.response.status === 400){
                setErrMsg(res.response.data.msg)
            }else{
                errRef.current.focus();
                setErrMsg("Jotain meni vikaan, yritä myöhemmin uudelleen")
            }
        })
    }
    
    return (
        <div className="d-flex justify-content-center">

            {success ? (
                    <div className="alert alert-success p-4 pb-2">
                        <h2 className="alert-heading">Käyttäjä luotiin onnistuneesti</h2>
                        <h4>
                        Ole hyvä ja 
                        <Link className="btn btn-success m-2 fs-5 pl-2 pr-2 text-decoration-none"to='/Login'>kirjaudu sisään!</Link>
                        </h4>
                    </div>
                ) : (           
            <form onSubmit={handleSubmit}>
            <h1>Rekisteröidy</h1>
            <div className='form-group pb-2 pt-4 w-750'>
                <label htmlFor="username">Käyttäjänimi:</label>
                <input type="text" placeholder="Käyttäjänimi" id="username" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password'>Salasana:</label>
                <input type="password" placeholder="Salasana" className="form-control" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password_rpt'>Toista salasana:</label>
                <input type="password" placeholder="Toista salasana" id="password_rpt" className="form-control" autoComplete="off" onChange={(e) => setPassword_rpt(e.target.value)} value={password_rpt} />
            </div>
            <p ref={errRef} data-testid="errMsg" className={errMsg ? "alert alert-danger" : "offscreen"} >{errMsg}</p>
            <button type="submit" data-testid="registerBtn" className="btn btn-outline-primary">Rekisteröidy!</button>
            </form>
            )}
        </div>
    )
}

export default Register