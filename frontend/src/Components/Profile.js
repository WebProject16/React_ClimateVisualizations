import {Delete} from '../API/request';
import React, { useState,  useEffect } from 'react';

export default function Profile() {

    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
      setIsDeleting(false)
    }, [])
    

    const DelProfile = async () => {
        await Delete ("/user/deleteUser", 
        (res) => {
            console.log(res.request.status)
        })
        console.log("todo: delete profile")
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
                Welcome user!
                </h2>
            </div>
        <div className="list-group">
            {views}
        </div>
            {isDeleting ? (
            <form onSubmit={DelProfile}>
                <h3>Confirm deleting user</h3>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" className="form-control"/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type="text" id="password" className="form-control"/>                
                </div>
                <button type="submit" className="btn btn-outline-danger">Delete user?</button>
            </form>
            ) : (   
            <div className='pb-2 pt-4'>
                 <button onClick={()=> setIsDeleting(true)} type="button" className="btn btn-outline-danger">Delete user</button>
            </div>
            ) }
        </div>
    )
}