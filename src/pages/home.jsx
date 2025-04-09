import React from 'react';
import Navbar from '../components/navbar';

const Home = () => {
    return (
        <div className="container">
            <Navbar></Navbar>
                <div className="main">
                    <h1>Bienvenido al sistema de<br/>detección de nanomateriales</h1>
                    <button className="start-btn">Iniciar proceso</button>
                </div>
        </div>
    );
}

export default Home;
