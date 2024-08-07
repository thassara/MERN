import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../style/Comman css/Header.css';

function Header() {
    return (
        <div className="hed">
            <header>
                <h1 className="com_name">Ruchi Package</h1>
                <form className="search-form" action="">
                    <input className="in" type="search" placeholder="Search here ..." />
                    <i className="fa fa-search"></i>
                </form>
                <nav>
                    <ul className="nav_links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Packages</a></li>
                        <li><a href="#">Admin</a></li>
                    </ul>
                </nav>
                <a className="cta" href="#"><button>Login</button></a>
            </header>
        </div>
    );
}

export default Header;
