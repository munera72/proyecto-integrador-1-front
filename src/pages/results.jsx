import Navbar from '../components/navbar';
import { file_name } from './progressbar';


function Results(){
    
     const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/images/download/" + file_name, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file_name + ".zip"; // Optionally get this dynamically
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
    
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
                <button className='btn primary-btn' onClick={handleDownload}>Descargar imagenes .zip</button>
            </div>
        </div>
        )
    }

export default Results;