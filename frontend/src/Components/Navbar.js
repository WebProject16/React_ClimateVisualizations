import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav id="nav" className="navbar-expand-md navbar-dark bg-dark mb-4 pt-2 pb-1">
          <div className="container-fluid">

            <img src="icon.png" className="m-2"/>
            <Link className="navbar-brand" to='/'>Global climate</Link>

            <button className="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" id="navbarToggle">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Create visualizations</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>

                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            </div>
          </div>
        </nav>
    );
}