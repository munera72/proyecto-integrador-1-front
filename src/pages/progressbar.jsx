import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import '../styles/progressbar.css';


const ProgressBar = () => {
    const [step, setStep] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const navigate = useNavigate();
  
    const steps = ["Iniciando", "Analizando", "Finalizado"];
    const progress = [20, 60, 100];
  
    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length - 1) {
          i++;
          setStep(i);
        } else {
          clearInterval(interval);
        }
      }, 2000);
      return () => clearInterval(interval);
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
        <div className="main">
          <h2 className="text-xl mb-4">Análisis en progreso</h2>
  
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress[step]}%` }}
            >
              {steps[step]}
            </div>
          </div>
  
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