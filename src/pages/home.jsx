import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <Navbar></Navbar>
            <hr/>
                <div className="main">
                    <h1>Bienvenido al sistema de<br/>detección de nanomateriales</h1>
                    <Link className='link' to={'/upload-img'}>
                        <button className="btn primary-btn">Iniciar proceso</button>
                    </Link>
                </div>
        </div>
    );
}

export default Home;
