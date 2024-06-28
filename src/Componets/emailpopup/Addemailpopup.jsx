import React, { useEffect, useState } from 'react';
import styles from '../usepopup/ConfirmationModal.module.css';
import { url } from '../../redux/action';

const AddEmailpopup = ({ isOpen, message, onClose,buttontxt}) => {
const [email,setEmail]=useState('')
const id=localStorage.getItem('id')

 const onConfirm=async()=>{
  console.log(id)
  const result=await fetch(`${url}/addEmails/${id}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email})
  })
  const response=await result.json()
  alert(response)
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
            <button onClick={onConfirm} className={styles.confirmButton}>
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