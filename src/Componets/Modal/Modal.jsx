import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';
import add from "../../assets/add.svg";
import Delete from "../../assets/Delete.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import blue from "../../assets/blue.svg";
import green from "../../assets/green.svg";

import style from "./modal.module.css";
import { addTask, addTaskRequest, fetchdata} from '../../redux/action';
import { useDispatch } from 'react-redux';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, onAddTask }) => {
    const [inputValue, setInputValue] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [id, setId] = useState('');
    const [prior,setprior]=useState('')
    const [payload,setpayload]=useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const id = localStorage.getItem("id");
        setId(id);
        setpayload(id)
    }, []);


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
            priority: prior,
            status: "TO-DO",
            checklist: checklist,
            duedate: dueDate,
        };
     dispatch(addTask(payload, id));


   
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
                <h2>Title <span>*</span></h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Task title"
                />
                <div className={style.prioritydiv}>
                    <h3>Select Priority</h3>
                    <button onClick={()=>{setprior("HIGH")}} > <img src={Ellipse2} alt="" />                       HIGH PRIORITY</button>
                    <button onClick={()=>{setprior("MODERATE")}} > <img src={blue} alt="" />                 MODERATE PRIORITY</button>
                    <button onClick={()=>{setprior("LOW")}} > <img src={green}alt="" />                   LOW PRIORITY</button>
                </div>
                <div className={style.assigndiv}>
                    <h4>Assign to</h4>
                    <input type="text" placeholder='Add assigne' />
                </div>
                <h3>Checklist <span>{`(${checklist.length})`}</span></h3>
                <div className={style.scrolldiv}>
                   
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
                            <img className={style.deleteButton} onClick={() => handleDeleteChecklistItem(item.id)} src={Delete} alt="" />
                        </div>
                    ))}
                    
                </div>
                <h2 onClick={handleAddChecklistItem} className={style.addNew}>
                        <img src={add} alt="Add new" /> Add new
                    </h2>
                <div  className={style.button}>
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
