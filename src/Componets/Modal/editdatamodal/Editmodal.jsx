import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Delete from "../../../assets/Delete.svg";
import add from "../../../assets/add.svg";
import style from "./editmodal.module.css";
import { edittasks, fetchdata } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import useAllEmails from '../Allmails/useAllEmails';

ReactModal.setAppElement('#root');

const Editmodal = ({ isOpen, onRequestClose, task }) => {
    const [inputValue, setInputValue] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [prior, setPrior] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const allEmails = useAllEmails();
    const [assignee, setAssignee] = useState(null);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setInputValue(task.title || '');
            setChecklist(task.checklist || []);
            setPrior(task.priority || '');
            setSelectedDate(task.duedate ? new Date(task.duedate) : null);
            setAssignee(task.assignee ? { value: task.assignee, label: task.assignee } : null);
        }
    }, [task]);

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

    const formattedDueDate = selectedDate?.toLocaleDateString();

    const handleSubmit = async () => {
        if(!inputValue || !prior){
            const newErrors = {};
            if(!inputValue) newErrors.inputValue="Please Enter Title"
            if(!prior) newErrors.priority="Please Select Priority"
            setErrors(newErrors)
            return
        }
        const payload = {
            _id: task._id,
            title: inputValue,
            priority: prior,
            status: task.status,
            checklist: checklist,
            duedate: formattedDueDate,
            assignee: assignee ? assignee.value : null
        };
        
        await dispatch(edittasks(task._id, payload));
        await dispatch(fetchdata());
        
        onRequestClose();
    };

    const customOption = ({ data, innerRef, innerProps }) => (
        <div {...innerProps} ref={innerRef} className={style.selectOption}>
            <div className={style.avatar}>
                {data.value.label.substring(0, 2).toUpperCase()}
            </div>
            <div className={style.emaildiv}>
                <span className={style.email}>{data.label}</span>
            </div>
            <button
                className={style.assignButton}
                onClick={(e) => {
                    e.stopPropagation();
                    setAssignee(data.value);
                }}
            >
                Assign
            </button>
        </div>
    );

    const emailOptions = allEmails.map(email => ({
        value: { value: email, label: email },
        label: email
    }));

    return (
        <div className={style.container}>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={style.modal}
                overlayClassName="overlay"
            >
                <div className={style.titlediv}>
                    <h2>
                        Title <span>*</span>
                    </h2>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter Task title"
                    />
                </div>
                {errors.inputValue && <p className="error">{errors.inputValue}</p>}
                <div className={style.prioritydiv}>
                    <h3>Select Priority</h3>
                    <button onClick={() => setPrior("HIGH")}>
                        HIGH PRIORITY
                    </button>
                    <button onClick={() => setPrior("MODERATE")}>
                        MODERATE PRIORITY
                    </button>
                    <button onClick={() => setPrior("LOW")}>
                        LOW PRIORITY
                    </button>
                </div>
                {errors.prior && <p className="error">{errors.prior}</p>}
                <div className={style.assigndiv}>
                    <h4>Assign to</h4>
                    <Select
                        options={emailOptions}
                        components={{ Option: customOption }}
                        value={assignee}
                        onChange={setAssignee}
                        placeholder="Select assignee"
                        isClearable
                        className={style.select}
                    />
                </div>

                <h3>
                    Checklist <span>{`(${checklist.length})`}</span>
                </h3>

                <div className={style.scrolldiv}>
                    {checklist.map((item) => (
                        <div className={style.inputdiv} key={item.id}>
                            <input
                                className={style.inputdiv1}
                                type="checkbox"
                                checked={item.completed}
                                onChange={() =>
                                    setChecklist((prevChecklist) =>
                                        prevChecklist.map((chk) =>
                                            chk.id === item.id ? { ...chk, completed: !chk.completed } : chk
                                        )
                                    )
                                }
                            />
                            <input
                                className={style.inputdiv2}
                                type="text"
                                value={item.task}
                                onChange={(e) =>
                                    handleChecklistTaskChange(item.id, e.target.value)
                                }
                                placeholder="Enter task"
                            />
                            <img
                                className={style.deleteButton}
                                onClick={() => handleDeleteChecklistItem(item.id)}
                                src={Delete}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
                <h2 onClick={handleAddChecklistItem} className={style.addNew}>
                    <img src={add} alt="Add new" /> Add new
                </h2>
                <div className={style.buttons}>
                    <div>
                        <DatePicker
                            className={style.datepicker}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select due date"
                        />
                    </div>
                    <div>
                        <button onClick={onRequestClose}>Close</button>
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default Editmodal;
