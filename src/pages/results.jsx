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
            <embed src="/Prueba.pdf" width="1535" height="1000" type="application/pdf" />
        </div>
        )
    }

export default Results;