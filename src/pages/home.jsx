import React from 'react';
import Navbar from '../components/navbar';

const Home = () => {
    return (
        <div class="container">
            <Navbar></Navbar>
                <div class="main">
                    <h1>Bienvenido al sistema de<br/>detección de nanomateriales</h1>
                    <button class="start-btn">Iniciar proceso</button>
                </div>
        </div>
    );
}

export default Home;
