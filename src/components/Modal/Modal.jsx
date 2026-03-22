import { useState, useEffect, useRef, useCallback } from "react";
import "./modal.scss";
import { useDarkMode } from "../../hooks/useDarkMode";
import { gsap } from "gsap";
import { X } from "lucide-react";

function Modal({
  titleModal,
  subtitleModal,
  contentModal,
  isOpenModal,
  closeModal,
}) {
  const modalRef = useRef();
  const overlayRef = useRef();
  const contentRef = useRef();
  const headerRef = useRef();
  const [isDarkMode] = useDarkMode();
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    document.body.style.overflow = "hidden";

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contentRef.current, {
      scale: 0.5,
      opacity: 0,
      rotationY: -15,
      y: 100,
    });
    gsap.set(headerRef.current?.children || [], {
      y: 30,
      opacity: 0,
    });

    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power2.out",
    })
      .to(
        contentRef.current,
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.1"
      )
      .to(
        headerRef.current?.children || [],
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
  };

  const handleCloseModal = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsClosing(false);
        closeModal();
      },
    });

    tl.to(headerRef.current?.children || [], {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "back.in(1.2)",
    })
      .to(
        contentRef.current,
        {
          scale: 0.4,
          opacity: 0,
          rotationY: 15,
          y: -50,
          duration: 0.4,
          ease: "back.in(1.2)",
        },
        "-=0.1"
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2"
      );
  }, [closeModal, isClosing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isOpenModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      openModal();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [handleCloseModal, isOpenModal]);

  if (!isOpenModal) {
    return null;
  }

  return (
    <div className="modal-overlay" ref={overlayRef}>
      <div className="modal-backdrop"></div>
      <div className="modal-wrapper">
        <div
          className={`modal-container ${isDarkMode ? "dark" : "light"}`}
          ref={contentRef}
        >
          <div className="modal-content" ref={modalRef}>
            <button
              className="close-modal"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="modal-header" ref={headerRef}>
              <h2 className="title-modal">{titleModal}</h2>
              <p className="subtitle-modal">{subtitleModal}</p>
            </div>

            <div className="modal-body">{contentModal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
