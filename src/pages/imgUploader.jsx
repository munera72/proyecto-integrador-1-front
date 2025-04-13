import React from 'react';
import Navbar from '../components/navbar';
import '../styles/imgUploader.css'
import { Link } from 'react-router-dom';

const ImgUploader = () => {
    return (
        <div className="container">
            <Navbar/>
            <hr/>
            <div className='main-container '>
                <div class="info-box">
                    <div class="info-content">
                        <h3>Recuerda que</h3>
                        <ul>
                            <li>La imagen no debe ser mayor a 5MB</li>
                            <li>La imagen debe estar en formato PNG</li>
                            <li>Las proporciones deben ser 512x512</li>
                            <li>La resolución aceptada es de 300dpi</li>
                            <li>Sólo puedes subir hasta 10 imágenes</li>
                        </ul>
                    </div>
                </div>
                <div class="upload-box">
                    <div class="upload-content">
                        <div class="image-placeholder">🖼️</div>
                        <div class="upload-buttons">
                            <button className='secondary-btn'>Cargar imagen</button>
                            <button className='secondary-btn'>Preprocesar imagen</button>
                        </div>
                        <Link to='/progressBar'>
                            <button class="analyze-button primary-btn">Analizar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgUploader;
