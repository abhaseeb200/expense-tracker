import React, { useEffect } from "react";

const ImageModal = ({ imageUrl, isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div className="modal show d-block" tabIndex="-1" onClick={onClose}>
      <div
        className="modal-dialog modal-fullscreen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-center align-items-center">
            <img src={imageUrl} alt="full-screen" className="img-fluid h-100 object-fit-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
