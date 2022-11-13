import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from './LoginContext';

export default function Navbar() {
    const { logState } = useContext(LogContext)

    //Elements to render to everyone
    const navItems = [
        {id: 1, route: '/', text: 'Home'},
        {id: 2, route: '/create', text: 'Create visualizations'},
        {id: 3, route: '/contact', text: 'Contact'},
    ];

    //elements to render for authenticated
    if(logState){
        navItems.push({id: 4, route: '/logout', text: 'Logout'})
    }else{
        //elemements to render for unauthenticated
        navItems.push({id: 4, route: '/login', text: 'Login'})
        navItems.push({id: 5, route: '/register', text: 'Register'})
    }

    const items = navItems.map((item)=>
    <li key={item.id} className="nav-item">
        <Link className="nav-link" to={item.route}>{item.text}</Link>
    </li>
    )

    return (
        <nav id="nav" className="navbar-expand-md navbar-dark bg-dark mb-4 pt-2 pb-1">
          <div className="container-fluid">

            <img src="icon.png" className="m-2" alt="Logo."/>
            <Link className="navbar-brand" to='/'>Global climate</Link>

            <button className="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" id="navbarToggle">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">  
                    {items}
                </ul>
            </div>
          </div>
        </nav>
    );
}