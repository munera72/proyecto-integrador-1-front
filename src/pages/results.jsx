import React from 'react';
import Navbar from '../components/navbar';


function Results(){
    return(
        <div className="container">
            <Navbar/>
            <hr/>
            <div className='navbar'>
                <div className="logo">Resultados del analisis</div>
            </div>
            <hr />
            <embed src="/Prueba.pdf" width="auto" height="4000" type="application/pdf" />
                <div className='main'>
                <button className='btn primary-btn'>Descargar imagenes .zip</button>
            </div>
        </div>
        )
    }

export default Results;