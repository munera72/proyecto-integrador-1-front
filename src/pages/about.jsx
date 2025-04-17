import React from 'react';
import Navbar from '../components/navbar';
import ContentBlock from '../components/contentblock';
import logo from '../assets/escudo-udea-verde.png';
import logomack from '../assets/escudo-mackenzie.png';


function About(){
    return(
        <div className="container">
            <Navbar/>
            <hr/>
            <div className='content-row'>
                 <ContentBlock imageSrc={logo}/>
                 <ContentBlock text="La Universidad de Antioquia (U. de A.) es una institución de educación superior colombiana, ubicada en el departamento de Antioquia. Fundada en 1803 como una institución pública, la Universidad de Antioquia es reconocida como la segunda mejor universidad pública del país. Su facultad de Medicina es reconocida como la mejor del país."/>
             </div>
             <hr />
             <div className='content-row'>
                 <ContentBlock text="La Universidad Presbiteriana Mackenzie es una universidad privada y confesional brasileña. La universidad está mantenida por el Instituto Presbiteriano Mackenzie, una asociación civil de derecho privado sin fines lucrativos y de finalidad educacional."/>
                 <ContentBlock imageSrc={logomack}/>
             </div>
        </div>
        )
    }

export default About;