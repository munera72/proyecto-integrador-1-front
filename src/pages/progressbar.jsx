import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import '../styles/progressbar.css';
import { formData } from "./imgUploader"; 

export let file_name;

async function uploadImages(formData) {
  const response = await fetch("http://localhost:8000/images/upload/", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error uploading images:", errorText);
    throw new Error("Error uploading images: " + errorText);
  }
  const data = await response.json();
  file_name = data.file_name;
  return data;
}

const ProgressBar = () => {
  const [status, setStatus] = useState("Iniciando");
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    uploadImages(formData)
      .then(() => {
        
        const interval = setInterval(async () => {
          try {
            const res = await fetch("http://localhost:8000/images/progress/");
            const data = await res.json();
            setStatus(data.status);
            setProgress(data.progress);

            if (data.progress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                navigate("/results");
              }, 1000);
            }
          } catch (error) {
            console.error("❌ Error fetching progress:", error);
          }
        }, 1000); 

        return () => clearInterval(interval);
      })
      .catch(err => {
        console.error("❌ Error uploading images:", err);
      });
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCancelConfirm = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleAccept = () => {
    setCancelled(true);
    setShowConfirm(false);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container">
      <Navbar />
      <hr />
      <div className="main">
        <h2 className="text-xl mb-4">Análisis en progreso</h2>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {status}
          </div>
        </div>
        <p className="mt-2 text-gray-600">Tiempo transcurrido: {seconds} segundos</p>

        <button className="start-btn mt-6" onClick={handleCancelConfirm}>
          Detener análisis
        </button>

        {cancelled && (
          <div style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
            ⚠️ Análisis cancelado. Redirigiendo a inicio...
          </div>
        )}

        {showConfirm && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>¿Estás seguro?</h3>
              <p>¿Deseas cancelar el análisis actual?</p>
              <div className="modal-actions">
                <button onClick={handleCancel} className="btn cancel">Cancelar</button>
                <button onClick={handleAccept} className="btn confirm">Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
