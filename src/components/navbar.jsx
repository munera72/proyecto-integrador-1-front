import React from 'react';
import logo from '../assets/escudo-udea.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className='navbar-brand'>
                <img className='logo' src={logo} alt='Universidad de Antioquia Logo'/>
                <div className="logo">Universidad de Antioquia</div>
            </div>
            <div className='navbar-btns'>
                <button className='btn secondary-btn'>
                    Inicio
                </button>
                <button className="btn secondary-btn">Acerca de</button>
            </div>
        </div>
    );
}

export default Navbar;
