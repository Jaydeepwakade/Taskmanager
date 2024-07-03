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
import { addTask, fetchdata, url } from "../../../redux/action";
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
  const [allEmails,setAllEmails]=useState([])
  const [payloadnew, setPayloadnew] = useState([]);
  const [userid, setUserid] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("id");
    setUserid(id);
    dispatch(fetchdata("next-week"));
  }, []);

  useEffect(() => {
    const temp = localStorage.getItem('id');
    const fetchAllEmails = async () => {
        try {
            const result = await fetch(`${url}/fetchAllEmails/${temp}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await result.json();
            const data = response.data;
            setAllEmails(data);
        } catch (error) {
            console.error('Error fetching emails:', error);
            
        }
    };
    fetchAllEmails();
}, []);

useEffect(() => {
  if (isOpen) {
    const fetchAllEmails = async () => {
      const temp = localStorage.getItem("id");
      try {
        const result = await fetch(`${url}/fetchAllEmails/${temp}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const response = await result.json();
        const data = response.data;
        setAllEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchAllEmails();
  }
}, [isOpen]);

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
    // Validate the checklist items
    if (!inputValue || !prior || checklist.length === 0 || checklist.some(item => item.task === "")) {
      const newErrors = {};
      if (!inputValue) newErrors.inputValue = "Please enter a title";
      if (!prior) newErrors.priority = "Please select a priority";
      if (checklist.length === 0) newErrors.checklist = "Enter at least one task";
      if (checklist.some(item => item.task === "")) newErrors.checklist = "Please enter data in all checklist items";
      setErrors(newErrors);
      return;
    }

    console.log("Assignne:",assignee)
    const payload = {
      title: inputValue,
      priority: prior,
      status: "TO-DO",
      checklist: checklist,
      assignee: assignee ? assignee.value : null,
      duedate: selectedDate ? new Date(selectedDate).toLocaleDateString() : null,
    };

    console.log("Payload:", payload);

    setPayloadnew(payload);
    dispatch(addTask(payload, userid));
    dispatch(fetchdata("next-week"));
    handleCloseModal();
  };

  const customOption = ({ data, innerRef, innerProps }) => (
    <div {...innerProps} ref={innerRef} className={style.selectOption}>
      <div className={style.avatar}>
        {data.value.substring(0, 2).toUpperCase()}
      </div>
      <div className={style.emaildiv}>
        <span className={style.email}>{data.label}</span>
      </div>
      <button
        className={style.assignButton}
        onClick={(e) => {
          e.stopPropagation();
          console.log(data)
          setAssignee(data);
        }}
      >
        Assign
      </button>
    </div>
  );

  const emailOptions = allEmails.map((email) => ({
    value: email,
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
            onChange={(e)=>setAssignee(e)}
            placeholder="Select Assigne"
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
                value={item.task}
                onChange={(e) => handleChecklistTaskChange(item.id, e.target.value)}
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
