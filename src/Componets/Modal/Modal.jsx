import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose }) => {
    const [inputValue, setInputValue] = useState({});
    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const payload=
            {
                title: '',
                priority: '',
                status: "BACKLOG",
                checklist: [
                  { id: 1, "task": "Task to be done", "completed": false },
                  { id: 2, "task": "Task to be done", "completed": false },
                  {
                    id: 3,
                    task: "Task to be done ede lorem Ipsum is a Dummy text t",
                    completed: false
                  }]
            }
        
      
        
        onRequestClose();
    }
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2>task</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter some text"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onRequestClose}>Close</button>
        </ReactModal>
    );
};

export default Modal;
