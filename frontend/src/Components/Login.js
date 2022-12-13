import React, { useContext } from 'react'
import {useRef, useState, useEffect} from 'react'
import { Post, AuthGet } from '../API/request'
import { LoginContext } from './LoginContext'
import { checkInput } from './sanitizeInput'

function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const { setIsLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        userRef.current.focus();

        AuthGet("/user/token", (res) => {
            if(res.status === 200){
              setSuccess(true)
            }else if(res.response.status === 400){
              setSuccess(false)
            }
        })
    }, [])
    
    useEffect(() => {
      setErrMsg('');
    }, [user, password])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let validate = checkInput(user, password)

        if(validate !== "")
            return setErrMsg(validate)
        
        Post("/user/login",{username:user,password:password},
        (res) => {
            if(res.status === 200){
                localStorage.setItem('token', res.data.token)
                setErrMsg('')
                setPassword('')
                setUser('')
                setIsLoggedIn(true)
                setSuccess(true)
            }else if(res.response.status === 400){
                errRef.current.focus();
                setErrMsg(res.response.data.msg)
            }else{
                errRef.current.focus();
                setErrMsg("Jotain meni vikaan yritä myöhemmin uudelleen")
            }
        })
        
    }
    
    return (
        <div className="d-flex justify-content-center">
            {success ? (
                    <div className="alert alert-success p-4 pb-2">
                        <h2 className="alert-heading">Sisään kirjautuminen onnistui</h2>
                        <h4>Voit nyt luoda omia visualisaatiota</h4>
                    </div>
                ) : (           
            <form onSubmit={handleSubmit}>
            <h1>Kirjaudu sisään</h1>
            <div className='form-group pb-2 pt-4 w-750'>
                <label htmlFor="username">Käyttäjänimi:</label>
                <input type="text" id="username" placeholder="Käyttäjänimi" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password'>Salasana:</label>
                <input type="password" className="form-control" placeholder="Salasana" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <p ref={errRef} data-testid="errMsg" className={errMsg ? "alert alert-danger" : "offscreen"} >{errMsg}</p>
            <button type="submit" data-testid='loginBtn' className="btn btn-outline-primary">Kirjaudu sisään!</button>
            </form>
            )}
        </div>
    )
}

export default Login