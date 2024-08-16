import React from "react";
import "./styles/Modal.css";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">{children}</div>
    </>
  );
};

export default Modal;
