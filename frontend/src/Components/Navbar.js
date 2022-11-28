import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from './LoginContext';

export default function Navbar() {
    const { isLoggedIn } = useContext(LoginContext)

    //Elements to render to everyone
    const navItems = [
        { route: '/contact', text: 'Contact'},
    ];

    //elements to render for authenticated
    if(isLoggedIn){
        navItems.push({ route: '/create', text: 'Create visualizations'})
        navItems.push({route: '/profile', text: 'Profile'})
        navItems.push({ route: '/logout', text: 'Logout'})
    }else{
        //elemements to render for unauthenticated
        navItems.push({ route: '/login', text: 'Login'})
        navItems.push({ route: '/register', text: 'Register'})
    }

    //Visualizations menu drop down, text can be changed to something more descriptive
    const visualizationData = [
        {route: "/v1", text:"v1 page"},
        {route: "/v2", text:"v2 page"},
        {route: "/v3", text:"v3 page"},
        {route: "/v4", text:"v4 page"},
        {route: "/vostok", text:"Ilmakehän hiilidioksidipitoisuudet (Vostok asema)"},
        {route: "/v6", text:"v6 page"},
        {route: "/v7", text:"v7 page"},
        {route: "/co2EmissionsPerCountry", text:"Hiilidioksidipäästöt maittain"},
    ]

    const visualizations = visualizationData.map((nav) =>
        <Link key={nav.route} className="dropdown-item" to={nav.route}>{nav.text}</Link>
    )
    

   const items = navItems.map((item)=>
   <li key={item.route} className="nav-item">
        <Link className="nav-link" to={item.route}>{item.text}</Link>
    </li>
    )

    return (
        <nav id="nav" className="navbar-expand-md navbar-dark bg-dark mb-4 pt-2 pb-1">
          <div className="container-fluid">

            <Link to="/"><img src="icon.png" className="m-2" alt="Logo."/></Link> 
            <Link className="navbar-brand" to='/'>Global climate</Link>

            <button className="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" id="navbarToggle">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                            Visualizations
                        </Link>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {visualizations}
                        </div>
                    </li>  
                    {items}
                </ul>
            </div>
          </div>
        </nav>
    );
}