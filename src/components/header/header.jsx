import React from 'react';
import './style.css';
import logo from "../../assets/logo.svg";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="logo" className="logo-icon" />
                <h1 className="number-text">NUMBERS</h1>
            </div>
        </header>
    );
}

export default Header;
