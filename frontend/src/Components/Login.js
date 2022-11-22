import React, { useContext } from 'react'
import {useRef, useState, useEffect} from 'react'
import { Post, AuthGet } from '../API/request'
import { LoginContext } from './LoginContext'

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user || !password) {
            errRef.current.focus();
            return setErrMsg('Please fill all fields!');
        }
        await Post("/user/login",{username:user,password:password},
        (res) => {
            if(res.status === 200){
                localStorage.setItem('token', res.data.token)
                setIsLoggedIn(true)
                setSuccess(true)
            }else if(res.response.status === 400){
                errRef.current.focus();
                setErrMsg(res.response.data.msg)
            }
        })
        
    }
    
    return (
        <div className="d-flex justify-content-center">
            {success ? (
                    <div className="alert alert-success p-4 pb-2">
                        <h2 className="alert-heading">Sisäänkirjautuminen onnistui!</h2>
                        <h4>Voit nyt käyttää sivun eri ominaisuuksia.</h4>
                    </div>
                ) : (           
            <form onSubmit={handleSubmit}>
            <h1>Kirjaudu sisään</h1>
            <div className='form-group pb-2 pt-4 w-750'>
                <label htmlFor="username">Käyttäjänimi:</label>
                <input type="text" id="username" className="form-control" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} />
            </div>
            <div className='form-group pb-2 w-750'>
                <label htmlFor='password'>Salasana:</label>
                <input type="password" className="form-control" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <p ref={errRef} className={errMsg ? "alert alert-danger" : "offscreen"} >{errMsg}</p>
            <button type="submit" className="btn btn-outline-primary">Kirjaudu sisään!</button>
            </form>
            )}
        </div>
    )
}

export default Login