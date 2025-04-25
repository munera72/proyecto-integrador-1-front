import React from 'react';
import { useModal } from '../components/modalcontext';
import ContentBlock from '../components/contentblock';
import logo from '../assets/escudo-udea-verde.png';
import logomack from '../assets/escudo-mackenzie.png';
import '../styles/About.css';


const About = () => {
    const { isAboutOpen, closeAbout } = useModal();
    if (!isAboutOpen) return null;
    return(
        <div className="about-overlay">
            <div className='about-content'>
                <div className='content-row'>
                    <ContentBlock imageSrc={logo}/>
                    <ContentBlock text="La Universidad de Antioquia (U. de A.) es una institución de educación superior colombiana, ubicada en el departamento de Antioquia. Fundada en 1803 como una institución pública, la Universidad de Antioquia es reconocida como la segunda mejor universidad pública del país. Su facultad de Medicina es reconocida como la mejor del país."/>
                </div>
                <hr />
                <div className='content-row'>
                    <ContentBlock imageSrc={logomack}/>
                    <ContentBlock text="La Universidad Presbiteriana Mackenzie es una universidad privada y confesional brasileña. La universidad está mantenida por el Instituto Presbiteriano Mackenzie, una asociación civil de derecho privado sin fines lucrativos y de finalidad educacional."/>
                </div>
                <div className='main'>
                <button className="btn primary-btn" onClick={closeAbout}>Cerrar</button>
                </div>
            </div>
        </div>
        )
    }

export default About;