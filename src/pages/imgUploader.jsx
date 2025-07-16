import React, {useState} from 'react';
import Navbar from '../components/navbar';
import '../styles/imgUploader.css'
import { useNavigate } from 'react-router-dom';

let uploadedImages = []
let imgIndex = 0

export let formData;

// Store image info with filename and selected method
let imageProcessingList = [];

export function createFormData() {
    const formData = new FormData();
    const files = document.getElementById('upload-images').files;
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    // Add processing_data as a JSON string
    formData.append('processing_data', JSON.stringify({ methods: imageProcessingList }));
    return formData;
}

const ImgUploader = () => {

    const [displayedImage, setDisplayedImage] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [isAnalyzeDisabled, setIsAnalyzeDisabled] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [_, forceUpdate] = useState(0); // for re-rendering
    const navigate = useNavigate();

    const getFiles = (event) => {
        const files = event.target.files;

        imgIndex = 0
        uploadedImages = []
        imageProcessingList = []

        try {
            URL.createObjectURL(files[0])
        } catch (e) {
            if (files.length === 0) {
                setIsAnalyzeDisabled(true);
            }
            return
        }

        if (files.length > 10) {
            setErrorMsg('⚠️ Sólo puedes subir hasta 10 imágenes.');
            setDisplayedImage('')
            setIsAnalyzeDisabled(true);
            return;
        } else {
            setErrorMsg('');
            setIsAnalyzeDisabled(false);
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                uploadedImages.push(URL.createObjectURL(file));
                // Add to processing list with empty method
                imageProcessingList.push({
                    image: file.name,
                    method: ""
                });
            } catch {
                console.log("No images uploaded")
            }
        }

        setDisplayedImage(uploadedImages[imgIndex]);
        setSelectedMethod(""); // reset method selection
        forceUpdate(n => n + 1); // re-render
    }

    const nextImage = () => {
        if (imgIndex >= uploadedImages.length - 1) {
            imgIndex = 0
        } else {
            imgIndex++
        }
        setDisplayedImage(uploadedImages[imgIndex]);
        setSelectedMethod(imageProcessingList[imgIndex]?.method || "");
        forceUpdate(n => n + 1);
    }

    const lastImage = () => {
        if (imgIndex === 0) {
            imgIndex = uploadedImages.length - 1
        } else {
            imgIndex--
        }
        setDisplayedImage(uploadedImages[imgIndex]);
        setSelectedMethod(imageProcessingList[imgIndex]?.method || "");
        forceUpdate(n => n + 1);
    }

    // When user selects a method for the current image
    const setProcessingMethodSelection = () => {
        if (!isAnalyzeDisabled) {
            return
        }

        const method = document.getElementById('processing-methods-select').value;
        imageProcessingList[imgIndex].method = method;
        setSelectedMethod(method);
        forceUpdate(n => n + 1);
    }

    // Keep select in sync with current image's method
    const handleMethodChange = (e) => {
        const method = e.target.value;
        imageProcessingList[imgIndex].method = method;
        setSelectedMethod(method);
        forceUpdate(n => n + 1);
    }

    // Send images and processing_data to backend
    const handleAnalyzeClick = async (e) => {
        if (uploadedImages.length === 0) {
            setErrorMsg('⚠️ No se ha subido ninguna imagen.');
            e.preventDefault(); // prevent navigation
        } else {
            formData = createFormData();
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
                                <input name="images" id='upload-images' type='file' accept='image/png' multiple onChange={getFiles} className='img-input'/>
                            </div>
                            <button disabled={isAnalyzeDisabled} onClick={setProcessingMethodSelection} id='filter-btn' className='secondary-btn'>Usar filtro</button>
                            <select
                                name='methods'
                                id='processing-methods-select'
                                value={imageProcessingList[imgIndex]?.method || ""}
                                onChange={handleMethodChange}
                            >
                                <option value=''>Selecciona un método</option>
                                <option value='gaussian_noise'>Ruido Gaussiano</option>
                                <option value='gaussian_filter'>Desenfoque Gaussiano</option>
                                <option value='random_brightness_contrast'>Brillo aleatorio</option>
                                <option value='random_rotation'>Rotación aleatoria</option>
                                <option value='horizontal_flip'>Reflección Horizontal</option>
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
