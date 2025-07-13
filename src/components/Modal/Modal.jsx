import { useState, useEffect, useRef } from "react";
import "./modal.scss";

function Modal({
  titleModal,
  subtitleModal,
  contentModal,
  isOpenModal,
  closeModal,
}) {
  const modalRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    const body = document.body;
    const observer = new MutationObserver(() => {
      setIsDarkMode(body.classList.contains("dark-mode"));
    });
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenModal, closeModal]);

  if (!isOpenModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div
        className={`modal-container ${isDarkMode ? "dark" : "light"}`}
        ref={modalRef}
      >
        <button className="close-modal" onClick={closeModal}>
          ❌
        </button>
        <h3 className="title-modal">{titleModal}</h3>
        <h5 className="subtitle-modal">{subtitleModal}</h5>

        <div className="content-modal">{contentModal}</div>
      </div>
    </div>
  );
}

export default Modal;
