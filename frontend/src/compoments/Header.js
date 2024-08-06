import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Ruchi Package</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/jj">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Regi">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Regi">
                            Services</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admins
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/Add">General Manager</a></li>
                                <li><a className="dropdown-item" href="/delete">Deputy Manager </a></li>
                                <li><a className="dropdown-item" href="/delete">Plant Manager </a></li>
                                <li><a className="dropdown-item" href="/delete">Stock Manager </a></li>
                                
                            
                            </ul>
                        </li>
                      
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <script>
                
            
            </script>
        </nav>
       
    );
}

export default Header;
