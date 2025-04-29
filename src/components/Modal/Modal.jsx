import { React } from "react";
import "./modal.scss";

function Modal({ titleModal, contentModal, isOpenModal, closeModal }) {
  if (!isOpenModal) {
    return null;
  }

  return (
    <div className="modal-container">
      <button className="close-modal" onClick={closeModal}>
        ❌
      </button>
      <h3>{titleModal}</h3>
      <div className="contentModal">{contentModal}</div>
    </div>
  );
}

export default Modal;
