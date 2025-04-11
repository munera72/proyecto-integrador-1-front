import React from 'react';
import Navbar from '../components/navbar';
import ContentBlock from '../components/contentblock';
import diamante from '../assets/Diamond_Ore.png';
import titanio from '../assets/Titanio.png'


function Results(){
    return(
        <div className="container">
            <Navbar/>
            <hr/>
            <div className='navbar'>
                <div className="logo">Resultados del analisis</div>
            </div>
            <div className='content-row'>
                <ContentBlock imageSrc={diamante}/>
                <ContentBlock imageSrc={titanio}/>
                <ContentBlock text="Resutados del analisis"/>
            </div>
            <div className='main-block'>
                    <button className="btn primary-btn">Descargar resultados</button>
            </div>
        </div>
        )
    }

export default Results;