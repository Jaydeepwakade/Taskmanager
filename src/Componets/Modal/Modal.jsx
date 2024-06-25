import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';
import add from "../../assets/add.svg";
import Delete from "../../assets/Delete.svg";
import style from "./modal.module.css";
import { url } from '../../redux/action';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [dueDate, setDueDate] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleChecklistTaskChange = (id, value) => {
        setChecklist((prevChecklist) =>
            prevChecklist.map(item => item.id === id ? { ...item, task: value } : item)
        );
    };

    const handleAddChecklistItem = () => {
        setChecklist((prevChecklist) => [
            ...prevChecklist,
            { id: prevChecklist.length + 1, task: '', completed: false }
        ]);
    };

    const handleDeleteChecklistItem = (id) => {
        setChecklist((prevChecklist) => prevChecklist.filter(item => item.id !== id));
    };

    const handleSubmit = () => {
        const payload = {
            title: inputValue,
            priority: '',
            status: "BACKLOG",
            checklist: checklist,
            duedate: dueDate
        };

        // Perform your submit logic with payload here

        onRequestClose();
    };

    return (
       <div className={style.container}>
         <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={style.modal}
            overlayClassName="overlay"
        >
            <h2>Title</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Task title"
            />
            <div className={style.prioritydiv}>
                <h3>Select Priority</h3>
                <button >HIGH PRIORITY</button>
                <button>MODERATE PRIORITY</button>
                <button>LOW PRIORITY</button>
            </div>
            <div>
                <h3>Checklist <span>{`(${checklist.length})`}</span></h3>
                {checklist.map(item => (
                    <div className={style.inputdiv} key={item.id}>
                        <input
                            className={style.inputdiv1}
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => setChecklist(prevChecklist =>
                                prevChecklist.map(chk =>
                                    chk.id === item.id ? { ...chk, completed: !chk.completed } : chk
                                )
                            )}
                        />
                        <input
                            className={style.inputdiv2}
                            type="text"
                            value={item.task}
                            onChange={(e) => handleChecklistTaskChange(item.id, e.target.value)}
                            placeholder="Enter task"
                        />
                        <img  className={style.deleteButton} onClick={() => handleDeleteChecklistItem(item.id)} src={Delete} alt="" />
                    </div>
                ))}
                <h2 onClick={handleAddChecklistItem} className={style.addNew}>
                    <img src={add} alt="Add new" /> Add new
                </h2>
            </div>
            <div>
                <div>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        placeholder="Select due date"
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onRequestClose}>Close</button>
                </div>
            </div>
        </ReactModal>
       </div>
    );
};

export default Modal;
