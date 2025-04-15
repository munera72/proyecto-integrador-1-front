import React, {useState} from 'react';
import Navbar from '../components/navbar';
import '../styles/imgUploader.css'
import { Link } from 'react-router-dom';


const ImgUploader = () => {

    const [file, setFile] = useState()
    const getFile = (event) => {
        try{
            console.log(event.target.files)
            setFile(URL.createObjectURL(event.target.files[0]))
        } catch {
            setFile(file)
        }
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
                            <img style={{width: 'inherit'}} src={file} alt="" />
                        </div>
                        <div class="image-buttons-box">
                            <div style={{display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#8dc63f', padding: '5px 15px', fontFamily: 'Roboto, sans-serif', color: 'white'}}>
                                <label htmlFor='upload-images'>Seleccionar imágenes</label>
                                <input id='upload-images' type='file' accept='image/png' multiple onChange={getFile} className='img-input'/>
                            </div>
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
