import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from './LoginContext';

export default function Navbar() {
    const { isLoggedIn } = useContext(LoginContext)

    //Elements to render to everyone
    const navItems = [];

    //elements to render for authenticated
    if(isLoggedIn){
        navItems.push({ route: '/create', text: 'Luo visualisaatiota'})
        navItems.push({route: '/profile', text: 'Profiili'})
        navItems.push({ route: '/logout', text: 'Kirjaudu ulos'})
    }else{
        //elemements to render for unauthenticated
        navItems.push({ route: '/login', text: 'Kirjaudu sisään'})
        navItems.push({ route: '/register', text: 'Rekisteröidy'})
    }

    //Visualizations menu drop down, text can be changed to something more descriptive
    const visualizationData = [
        {route: "/v1", text:"1850-2022 lämpötilan poikkeamat"},
        {route: "/v3", text:"Mauna Loa sekä Law Dome hiilidioksidipitoisuudet"},
        {route: "/v5", text:"Ilmakehän hiilidioksidipitoisuudet (400 000 vuotta)"},
        {route: "/v6", text:"Ilmakehän hiilidioksidipitoisuudet (800 000 vuotta)"},
        {route: "/v7", text:"Lämpötilan evoluutio"},
        {route: "/v8", text:"Hiilidioksidipäästöt maittain"},
        {route: "/v9", text:"Hiilidioksidipäästöt toimialoittain"},
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

            <Link to="/"><img src="/icon.png" className="m-2" alt="Logo."/></Link>
            <Link className="navbar-brand" to='/'>Mailmanlaajuinen ilmasto</Link>

            <button className="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" id="navbarToggle">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
                            Visualisaatiot
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