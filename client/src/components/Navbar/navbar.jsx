import React from "react";
import { Link } from "react-router-dom";
import "./navbar.modules.css";

function Navbar() {
    return (
      <nav className="nav">
        <ul>
          <li><Link to="/videogames/form">Create New game </Link></li>
          <li><Link to="/videogames/search"><button>Search game by name...</button></Link></li>
        </ul>
       
      </nav>
    );
  }
  
  export default Navbar;