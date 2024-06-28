import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import add from "../../../assets/add.svg";
import Delete from "../../../assets/Delete.svg";
import Ellipse2 from "../../../assets/Ellipse2.svg";
import blue from "../../../assets/blue.svg";
import green from "../../../assets/green.svg";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import style from "./editmodal.module.css";
import { edittasks, fetchdata } from '../../../redux/action'; // Import updateTask action
import { useDispatch } from 'react-redux';

ReactModal.setAppElement('#root');

const Editmodal = ({ isOpen, onRequestClose, task }) => {
    const [inputValue, setInputValue] = useState(task?.title || '');
    const [checklist, setChecklist] = useState(task?.checklist || []);
    const [id, setId] = useState(task?._id || '');
    const [prior, setPrior] = useState(task?.priority || '');
    const [selectedDate, setSelectedDate] = useState(task && task.duedate ? new Date(task.duedate) : null);
    const [dateError, setDateError] = useState('');
    const [payload, setPayload] = useState({});
    const [titleError, setTitleError] = useState("");
    const [priorityError, setPriorityError] = useState("");
   
    const dispatch = useDispatch();

    useEffect(() => {
        const id = localStorage.getItem("id");
        setId(id);
    }, []);

    useEffect(() => {
        dispatch(fetchdata());
    }, [payload, dispatch]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (titleError) setTitleError(""); // Clear error on input change
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

    const formattedDueDate = selectedDate?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });

    const handleSubmit = async () => {
        let valid = true;

        if (!inputValue) {
            setTitleError("Please add the title");
            valid = false;
        }

        if (!selectedDate) {
            setDateError('Please select a due date.');
            valid = false;
        }

        if (!prior) {
            setPriorityError('Please select a priority.');
            valid = false;
        }

        if (!valid) return;

        const payload = {
             
            title: inputValue,
            priority: prior,
            status:"",
            checklist: checklist,
            duedate: formattedDueDate
        };
   console.log(payload)
        try {
            await dispatch(edittasks(id,payload)); 
            await dispatch(fetchdata());
            onRequestClose(); 
        } catch (error) {
            console.error('Error updating task:', error);
           
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
                {titleError && <p className={style.error}>{titleError}</p>}
                <div className={style.prioritydiv}>
                    <h3>Select Priority</h3>
                    <button onClick={() => { setPrior("HIGH"); setPriorityError(''); }} > <img src={Ellipse2} alt="" />HIGH PRIORITY</button>
                    <button onClick={() => { setPrior("MODERATE"); setPriorityError(''); }} > <img src={blue} alt="" />MODERATE PRIORITY</button>
                    <button onClick={() => { setPrior("LOW"); setPriorityError(''); }} > <img src={green} alt="" />LOW PRIORITY</button>
                </div>
                {priorityError && <p className={style.error}>{priorityError}</p>}
                <div className={style.assigndiv}>
                    <h4>Assign to</h4>
                    <input type="text" placeholder='Add assignee'  />
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
                            onChange={date => { setSelectedDate(date); setDateError(''); }}
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

export default Editmodal;
