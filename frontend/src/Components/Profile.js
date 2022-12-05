import {Delete} from '../API/request';
import React, { useState,  useEffect, useRef, useContext } from 'react';
import { LoginContext } from './LoginContext'
import { useNavigate } from 'react-router-dom';
import { checkInput } from './sanitizeInput';

export default function Profile() {

    const { setIsLoggedIn } = useContext(LoginContext)
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    
    const nav = useNavigate()

    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
      setIsDeleting(false)
    }, [])

    useEffect(() => {
        setErrMsg('');
      }, [username, password])
    
    const DelProfile = async (e) => {
        e.preventDefault()

        let validate = checkInput(username, password)

        if(validate !== "")
            return setErrMsg(validate)

        await Delete ("/user/deleteUser", 
        {username:username, password:password},
        (res) => {
            if (res.status === 200){
                setErrMsg('')
                setPassword('')
                setUsername('')
                localStorage.removeItem("token")
                setIsLoggedIn(false);
                nav("/")
            }else if (res.response.status === 400){
                errRef.current.focus();
                setErrMsg(res.response.data.msg)
            }else {
                errRef.current.focus();
                setErrMsg("Unexpected error, try again later")
            }
        })
    }

    const post = [
        {id: 1, title: 'Hello world', content: 'Welcome'},
        {id: 2, title: 'Hello world', content: 'Welcome'},
        {id: 3, title: 'Hello world', content: 'Welcome'},
        {id: 4, title: 'Hello world', content: 'Welcome'},
        {id: 5, title: 'Hello world', content: 'Welcome'},

    ];

    const views = post.map((view)=> 
        <li key={view.id} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{view.title}</h5>
            </div>
            <p className="mb-1">{view.content}</p>
        </li>  
    )

    return (
        <div>
            <div>
                <h2>
                Tervetuloa!
                </h2>
            </div>
            <div className="list-group">
                {views}
            </div>
                {isDeleting ? (
                <form onSubmit={DelProfile}>
                    <h3 className='mt-4'>Varmista käyttäjän poistaminen</h3>
                    <div>
                        <label htmlFor="username">Käyttäjänimi:</label>
                        <input onChange={(e)=>setUsername(e.target.value)} type="text" id="username" className="form-control"/>
                    </div>
                    <div>
                        <label htmlFor='password'>Salasana:</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className="form-control"/>                
                    </div>
                    <button type="submit" className="btn btn-outline-danger mt-2">Poista käyttäjä?</button>
                </form>
                ) : (   
                <div className='pb-2 pt-4'>
                    <button onClick={()=> setIsDeleting(true)} type="button" className="btn btn-outline-danger mt-2">Poista käyttäjä</button>
                </div>
                ) }
                <p ref={errRef} className={errMsg ? "alert alert-danger mt-2" : "offscreen"} >{errMsg}</p>
        </div>
    )
}