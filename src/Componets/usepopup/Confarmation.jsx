import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ isOpen, message, onClose, onConfirm,buttontxt}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>{message}</p>
            <div className={styles.buttons}>
            <button onClick={onConfirm} className={styles.confirmButton}>
                {buttontxt}
              </button>
              <button onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
