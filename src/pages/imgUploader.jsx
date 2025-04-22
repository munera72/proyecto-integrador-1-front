import React, {useState} from 'react';
import Navbar from '../components/navbar';
import '../styles/imgUploader.css'
import { useNavigate } from 'react-router-dom';

let uploadedImages = []
let imgIndex = 0

const ImgUploader = () => {
    const [displayedImage, setDisplayedImage] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [isAnalyzeDisabled, setIsAnalyzeDisabled] = useState(false);
    const navigate = useNavigate();

    const getFiles = (event) => {
        imgIndex = 0
        uploadedImages = []

        const files = event.target.files;

        if (files.length > 10) {
            setErrorMsg('⚠️ Sólo puedes subir hasta 10 imágenes.');
            setIsAnalyzeDisabled(true);
            return;
        } else {
            setErrorMsg('');
            setIsAnalyzeDisabled(false);
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
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

    const handleAnalyzeClick = (e) => {
        if (uploadedImages.length === 0) {
            setErrorMsg('⚠️ No se ha subido ninguna imagen.');
            e.preventDefault(); // prevent navigation
        } else {
            navigate('/progressBar');
        }
    }

    return (
        <div className="container">
            <Navbar/>
            <hr/>
            <div className='main-container '>
                <div className="info-box">
                    <div className="info-content">
                        <h3>Recuerda que</h3>
                        <ul>
                            <li>La imagen no debe ser mayor a 5MB</li>
                            <li>La imagen debe estar en formato PNG</li>
                            <li>Las proporciones deben ser 512x512</li>
                            <li>La resolución aceptada es de 300dpi</li>
                            <li>Sólo puedes subir hasta 10 imágenes</li>
                        </ul>
                        {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}
                    </div>
                </div>
                <div className="upload-box">
                    <div className="upload-content">
                        <div className="image-placeholder">
                            <img style={{maxWidth: '512px', maxHeight: '512px'}} src={displayedImage} alt="" />
                        </div>
                        <div className='control-box'>
                            <button className='secondary-btn btn' onClick={lastImage}>
                                Anterior
                            </button>
                            <button className='secondary-btn btn' onClick={nextImage}>
                                Siguiente
                            </button>
                        </div>
                        <div className="image-buttons-box">
                            <div style={{display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#8dc63f', padding: '5px 15px', fontFamily: 'Roboto, sans-serif', color: 'white'}}>
                                <label>Seleccionar imágenes</label>
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
                        <button className="analyze-button primary-btn" disabled={isAnalyzeDisabled} onClick={handleAnalyzeClick}>
                            Analizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgUploader;
