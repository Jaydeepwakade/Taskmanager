import React, { useEffect, useState } from 'react';
import styles from './addpopup.module.css';
import { url } from '../../redux/action';
import Succesfullpopup from './Succesfullpopup';

const AddEmailpopup = ({ isOpen, onClose}) => {
const [email,setEmail]=useState('')
const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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

  if(result.ok){
   setIsConfirmOpen(true)
  }

  onClose()
  
 }

 const handleconfirmclose=()=>{
    setIsConfirmOpen(false)
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

      <Succesfullpopup isOpen={isConfirmOpen} onClose={handleconfirmclose} email={email}/>
    </>
  );
};

export default AddEmailpopup;