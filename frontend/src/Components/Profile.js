import { Delete, AuthGet } from '../API/request';
import React, { useState,  useEffect, useRef, useContext } from 'react';
import { LoginContext } from './LoginContext'
import { useNavigate } from 'react-router-dom';
import { checkInput } from './sanitizeInput';
import { Link } from 'react-router-dom';

export default function Profile() {

    const { setIsLoggedIn } = useContext(LoginContext)
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [viewData, setViewData] = useState([]);
    const [displayUsername, setDisplayUsername] = useState("");
    
    const nav = useNavigate()

    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      
        AuthGet("/views/users/all", res => {
            if(res.status === 200){
                setViewData(res.data.views);
                setDisplayUsername(res.data.username);
            }else{
                setDisplayUsername(res.response.data.username);
            }
        })

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

    const DeleteView = (url) => {
        Delete("/views/" + url, "", res => {
            if(res.status === 200){
                setViewData(viewData.filter(view => view.url !== url))
            }
        })
    }

    const views = viewData.map((view, i)=> 
        <li key={view.url} className="list-group-item list-group-item-action align-items-start">
            <div className="p-2">
                <h5 className="mb-3">{view.title}</h5>
                <Link className="btn btn-outline-success text-decoration-none"to={"/view/" + view.url}>Avaa</Link>
                <button onClick={() => DeleteView(view.url)} type="button" className="btn btn-outline-danger m-2">Poista</button>
            </div>
        </li>  
    )

    return (
        <div>
            <div>
                <h2>Tervetuloa {displayUsername}!</h2>
            </div>
            <div className="p-4 mt-4 card">
                <h3 className="card-title">Näkymät:</h3>
                {
                    viewData.length > 0 ? views : 
                    <div>
                        <p>Näkymiä ei löytynyt</p>
                    </div>
                }
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