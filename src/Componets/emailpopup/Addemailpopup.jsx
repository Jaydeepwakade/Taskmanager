import React, { useState } from 'react';
import styles from './addpopup.module.css';

const AddEmailpopup = ({ isOpen, message, onClose, onConfirm,buttontxt}) => {
const [email,setEmail]=useState('')


const handleaddEmail=(e)=>{
    setEmail(e)
    console.log(email)
    onClose()
}
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>Add people to the Board</p>

            <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter the email' />
            <div className={styles.buttons}>
            <button onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
            <button onClick={handleaddEmail} className={styles.confirmButton}>
               Add Email
              </button>
             
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmailpopup;