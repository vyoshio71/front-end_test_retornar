import React from "react";

import "../../css/components/modal.css";

import { IModal } from "../../interfaces/interfaces";

/**
 * Modal Component.
 * @param {Boolean} isModalOpen - Indicates whether the modal is open.
 * @param {Function} onClose - Function to handle closing the modal.
 * @param {ReactNode} children - The content to be displayed inside the modal.
 */

const Modal: React.FC<IModal> = ({ isModalOpen, onClose, children }) => {
  if (!isModalOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
