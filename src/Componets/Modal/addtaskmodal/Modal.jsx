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
import Select from "react-select";
import useAllEmails from "../Allmails/useAllEmails";

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
  const [payloadnew, setPayloadnew] = useState([]);
  const [userid, setUserid] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserid(id);
    dispatch(fetchdata("today"));
  }, [payloadnew]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChecklistTaskChange = (id, value) => {
    console.log(value)
    if (value==='') {
      setChecklist(null)
      return;
    }
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

  const handleHighPriorityClick = () => {
    setPrior("HIGH PRIORITY");
  };

  const handleModeratePriorityClick = () => {
    setPrior("MODERATE PRIORITY");
  };

  const handleLowPriorityClick = () => {
    setPrior("LOW PRIORITY");
  };

  const handleSubmit = async () => {
    console.log(checklist.task==='')
    console.log("c",checklist)
    if (!inputValue || !prior || checklist.length == 0 || checklist.task===null) {
      const newErrors = {};
      console.log(checklist)
      if (!inputValue) newErrors.inputValue = "Please enter a title";
      if (!prior) newErrors.priority = "Please select a priority";
      if (checklist.length === 0)
        newErrors.checklist = "Enter at least one task";
      if(checklist.task===null){
        newErrors.checklist="Please enter data in checklist"
      }
      setErrors(newErrors);
      console.log(newErrors);
      return;
    }

    const payload = {
      title: inputValue,
      priority: prior,
      status: "TO-DO",
      checklist: checklist,
      assignee: assignee ? assignee : null,
    };

    if (selectedDate) {
      payload.duedate = new Date(selectedDate).toLocaleDateString();
    }
    console.log(payload)

    setPayloadnew(payload);
    console.log(payloadnew)
    dispatch(addTask(payload, userid));
    dispatch(fetchdata("today"));
    handleCloseModal();
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

  const emailOptions = allEmails.map((email) => ({
    value: { value: email, label: email },
    label: email,
  }));

  const checkedListCount = checklist.filter((task) => task.completed).length;

  const handleCloseModal = () => {
    setErrors({});
    setDateError("");
    onRequestClose();
  };

  return (
    <div className={style.container}>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        className={style.modal}
        overlayClassName="overlay"
      >
        <div className={style.titlediv}>
          <h2>
            Title<span>*</span>
          </h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
          {errors.inputValue && (
            <p className={style.error}>{errors.inputValue}</p>
          )}
        </div>
        <div className={style.prioritydiv}>
          <h3>
            Select Priority<span>*</span>
          </h3>
          <button
            className={`${style.priorityButton} ${
              prior === "HIGH PRIORITY" ? style.selected : ""
            }`}
            onClick={handleHighPriorityClick}
          >
            <img src={Ellipse2} alt="" />
            HIGH PRIORITY
          </button>
          <button
            className={`${style.priorityButton} ${
              prior === "MODERATE PRIORITY" ? style.selected : ""
            }`}
            onClick={handleModeratePriorityClick}
          >
            <img src={blue} alt="" />
            MODERATE PRIORITY
          </button>
          <button
            className={`${style.priorityButton} ${
              prior === "LOW PRIORITY" ? style.selected : ""
            }`}
            onClick={handleLowPriorityClick}
          >
            <img src={green} alt="" />
            LOW PRIORITY
          </button>
        </div>
        {errors.priority && <p className={style.error}>{errors.priority}</p>}
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
        <h3 className={style.check}>
          Checklist <span>{`(${checkedListCount}/${checklist.length})`}</span>
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
                value={item.task?item.task:''}
                onChange={(e) => {
                  handleChecklistTaskChange(item.id, e.target.value);
                }}
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
        {errors.checklist && <p className={style.error}>{errors.checklist}</p>}
        <h2 onClick={handleAddChecklistItem} className={style.check}>
          <img src={add} alt="Add new" /> Add
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
            <button onClick={handleCloseModal}>Close</button>
            <button className={style.savebtn} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
