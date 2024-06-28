// ConfirmationModal.js
import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ isOpen, message, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={onConfirm} className={styles.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
