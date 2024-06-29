// ConfirmEmailAddedPopup.js
import React from 'react';
import styles from './succespopup.module.css';


function Succesfullpopup({isOpen,onClose,email}) {
    return (
        <>
          {isOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <p>{email} added to board</p>
                <button onClick={onClose} className={styles.confirmButton}>
                  Okay,got it!
                </button>
              </div>
            </div>
          )}
        </>
      );
    };


export default Succesfullpopup
