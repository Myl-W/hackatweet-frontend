import React from "react";
import styles from "../styles/Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.btn_modal_content}>
          <button className={styles.btn_modal} onClick={onClose}>
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
