import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';
import add from "../../../assets/add.svg";
import Delete from "../../../assets/Delete.svg";
import Ellipse2 from "../../../assets/Ellipse2.svg";
import blue from "../../../assets/blue.svg";
import green from "../../../assets/green.svg";
import DatePicker from 'react-datepicker'; // Import date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

import style from "./modal.module.css";
import { addTask, fetchdata } from '../../../redux/action';
import { useDispatch } from 'react-redux';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose }) => {
    const [inputValue, setInputValue] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [id, setId] = useState('');
    const [prior, setPrior] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // Track selected date
    const [dateError, setDateError] = useState('');
    const[payload ,setpayload]= useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        const id = localStorage.getItem("id");
        setId(id);
    }, []);

    useEffect(()=>{
        dispatch(fetchdata())
    },[payload])



    const handleInputChange = (e) => {
        setInputValue(e.target.value);
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
    const formattedDueDate = new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
    const handleSubmit = async () => {
        if (!selectedDate) {
            setDateError('Please select a due date.');
            return;
        }

        const payload = {
            title: inputValue,
            priority: prior,
            status: "TO-DO",
            checklist: checklist,
            duedate: formattedDueDate
        };

        try {
            await dispatch(addTask(payload, id));
            await dispatch(fetchdata());
            onRequestClose(); // Close modal after successful submission
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error state or display a message to the user
        }
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
                    <button onClick={() => { setPrior("HIGH") }} > <img src={Ellipse2} alt="" />HIGH PRIORITY</button>
                    <button onClick={() => { setPrior("MODERATE") }} > <img src={blue} alt="" />MODERATE PRIORITY</button>
                    <button onClick={() => { setPrior("LOW") }} > <img src={green} alt="" />LOW PRIORITY</button>
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
                <div className={style.buttons}>
                    <div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            placeholderText="Select due date"
                        />
                        {dateError && <p className={style.error}>{dateError}</p>}
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
