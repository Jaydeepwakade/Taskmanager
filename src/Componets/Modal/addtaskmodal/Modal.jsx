import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./Modal.css";
import add from "../../../assets/add.svg";
import Delete from "../../../assets/Delete.svg";
import Ellipse2 from "../../../assets/Ellipse2.svg";
import blue from "../../../assets/blue.svg";
import green from "../../../assets/green.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./modal.module.css";
import { addTask, fetchdata } from "../../../redux/action";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import useAllEmails from '../Allmails/useAllEmails';

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onRequestClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [prior, setPrior] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [assignee, setAssignee] = useState(null);
  const dispatch = useDispatch();
  const allEmails = useAllEmails();
   const [payloadnew,setpayloadnew]=useState([])
  const [userid,setuserid]=useState("")
   console.log(payloadnew)

  useEffect(() => {
    const id = localStorage.getItem("id")
    setuserid(id)
    dispatch(fetchdata("today"));
  }, [payloadnew]);

  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChecklistTaskChange = (id, value) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, task: value } : item
      )
    );
  };

  const handleAddChecklistItem = () => {
    setChecklist((prevChecklist) => [
      ...prevChecklist,
      { id: prevChecklist.length + 1, task: "", completed: false },
    ]);
  };

  const handleDeleteChecklistItem = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.filter((item) => item.id !== id)
    );
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      setDateError("Please select a due date.");
      return;
    }

    const formattedDueDate = new Date(selectedDate).toLocaleDateString(
      // "en-US",
      // {
      //   month: "short",
      //   day: "numeric",
      // }  
    );

    const payload = {
      title: inputValue,
      priority: prior,
      status: "TO-DO",
      checklist: checklist,
      duedate: formattedDueDate,
      assignee: assignee ? assignee.value : null
    };
        // console.log("payload:",payload)
    // const response = dispatch(addTask(payload, id))
    // dispatch(fetchdata()) 
    // setTaskList([...taskList, response.payload]); 
    // onRequestClose(); 
     setpayloadnew(payload)
    dispatch(addTask(payload,userid));
    dispatch(fetchdata("today"));
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
        <div className={style.prioritydiv}>
          <h3>Select Priority</h3>
          <button onClick={() => setPrior("HIGH PRIORITY")}>
            <img src={Ellipse2} alt="" />
            HIGH PRIORITY
          </button>
          <button onClick={() => setPrior("MODERATE PRIORITY")}>
            <img src={blue} alt="" />
            MODERATE PRIORITY
          </button>
          <button onClick={() => setPrior("LOW PRIORITY")}>
            <img src={green} alt="" />
            LOW PRIORITY
          </button>
        </div>
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
                      chk.id === item.id
                        ? { ...chk, completed: !chk.completed }
                        : chk
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
          <div className={style.datediv}>
            <DatePicker
              className={style.datepicker}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select due date"
            />
            {dateError && <p className={style.error}>{dateError}</p>}
          </div>
          <div>
            <button onClick={onRequestClose}>Close</button>
            <button className={style.savebtn} onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
