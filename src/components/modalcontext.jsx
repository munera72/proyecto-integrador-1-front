// src/context/ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  function openAbout() {
    setIsAboutOpen(true);
  }

  function closeAbout() {
    setIsAboutOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isAboutOpen, openAbout, closeAbout }}>
      {children}
    </ModalContext.Provider>
  );
}
