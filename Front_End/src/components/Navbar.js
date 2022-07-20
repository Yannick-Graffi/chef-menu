import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return ( <nav className="navbar" >
        <div className="Title">
            <h2>Chef Menu</h2>
        </div>
        
        <div className="pages">
        
            <Link to="/"style={{marginRight:"10px"}}>Homepage</Link> 
            <Link to="/Register" style={{marginRight:"10px"}}>Création de compte</Link>
            <Link to="/Connexion" >Connexion au compte restaurateur</Link>
        </div>
      </nav>
);
}
export default Navbar;