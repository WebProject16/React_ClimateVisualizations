import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav id="nav" className="navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>Global climate</Link>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link className="nav-link"  to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/Create">Create Visualizations</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/Login">Login </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/Register">Register </Link>
                    </li>
                </ul>
            </div>
          </div>
        </nav>
    );
}