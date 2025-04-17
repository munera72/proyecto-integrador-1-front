import React, {useState} from 'react';
import Navbar from '../components/navbar';
import '../styles/imgUploader.css'
import { Link } from 'react-router-dom';


let uploadedImages = []
let imgIndex = 0

const ImgUploader = () => {

    const [displayedImage, setDisplayedImage] = useState()

    const getFiles = (event) => {

        imgIndex = 0
        uploadedImages = []

        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try{
                uploadedImages.push(URL.createObjectURL(file))
            } catch {
                console.log("")
            }
        }

        setDisplayedImage(uploadedImages[imgIndex])
        
    }

    const nextImage = () => {
        if (imgIndex >= uploadedImages.length - 1) {
            imgIndex = 0
        } else {
            imgIndex++
        }
        setDisplayedImage(uploadedImages[imgIndex])
    }

    const lastImage = () => {
        if (imgIndex === 0) {
            imgIndex = uploadedImages.length - 1
        } else {
            imgIndex--
        }

        setDisplayedImage(uploadedImages[imgIndex])
    }

    const displayProcessingMethodSelection = () => {
        console.log(document.getElementById('processing-methods-select').value)
    }


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
                        <div class="image-placeholder">
                            <img style={{width: 'inherit', height: 'inherit'}} src={displayedImage} alt="" />
                        </div>
                        <div className='control-box'>
                            <button className='secondary-btn btn' onClick={lastImage}>
                                Anterior
                            </button>
                            <button className='secondary-btn btn' onClick={nextImage}>
                                Siguiente
                            </button>
                        </div>
                        <div class="image-buttons-box">
                            <div style={{display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#8dc63f', padding: '5px 15px', fontFamily: 'Roboto, sans-serif', color: 'white'}}>
                                <label >Seleccionar imágenes</label>
                                <input id='upload-images' type='file' accept='image/png' multiple onChange={getFiles} className='img-input'/>
                            </div>
                            <button onClick={displayProcessingMethodSelection} className='secondary-btn'>Procesar imagen</button>
                            <select name='methods' id='processing-methods-select'>
                                <option value='gauss'>Filtro Gaussiano</option>
                                <option value='mediana'>Filtro de Mediana</option>
                                <option value='contorno'>Mejora de Contorno</option>
                                <option value='segmentar'>Segmentación</option>
                            </select>
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
