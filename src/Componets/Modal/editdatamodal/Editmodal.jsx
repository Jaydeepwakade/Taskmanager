import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Delete from "../../../assets/Delete.svg";
import add from "../../../assets/add.svg";
import style from "./editmodal.module.css";
import { edittasks, fetchdata } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import useAllEmails from "../Allmails/useAllEmails";
import Ellipse2 from "../../../assets/Ellipse2.svg";
import blue from "../../../assets/blue.svg";
import green from "../../../assets/green.svg";
ReactModal.setAppElement("#root");

const Editmodal = ({ isOpen, onRequestClose, task }) => {
  const [inputValue, setInputValue] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [prior, setPrior] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const allEmails = useAllEmails();
  const [assignee, setAssignee] = useState(null);
  const [errors, setError] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setInputValue(task.title || "");
      setChecklist(task.checklist || []);
      setPrior(task.priority || "");
      setSelectedDate(task.dueDate ? new Date(task.dueDate) : null);
      setAssignee(task.name);
    }
  }, [task]);

  useEffect(() => {
    dispatch(fetchdata("today"));
  }, [dispatch]);

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
      prevChecklist.filter((item) => item._id !== id)
    );
  };

  let formattedDueDate = selectedDate?.toLocaleDateString();

  const handleSubmit = async () => {
    if (!inputValue || !prior || checklist.length === 0) {
      const newErrors = {};
      if (!inputValue) newErrors.inputValue = "Please enter a title";
      if (!prior) newErrors.priority = "Please select a priority";
      if (checklist.length === 0) newErrors.checklist = "Enter at least one task";
      setError(newErrors);
      return;
    }
    if(!formattedDueDate){
      setSelectedDate(null)
      formattedDueDate=null
      console.log(formattedDueDate)
    }
    const payload = {
      _id: task._id,
      title: inputValue,
      priority: prior,
      status: task.status,
      checklist: checklist,
      duedate: formattedDueDate,
      assignee: assignee ? assignee : null,
    };
    console.log(assignee);

    dispatch(edittasks(task._id, payload));
    onRequestClose();
    dispatch(fetchdata("today"));
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
          <h3>
            Select Priority <span>*</span>
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
        {errors.prior && <p className="error">{errors.prior}</p>}
        <div className={style.assigndiv}>
          <h4>Assign to</h4>
          <Select
            options={emailOptions}
            components={{ Option: customOption }}
            value={assignee}
            onChange={(text) => {
              setAssignee(text.value);
            }}
            placeholder={assignee}
            isClearable
            className={style.select}
          />
        </div>

        <h3>
          <h3 className={style.check}>
            Checklist <span>{`(${checkedListCount}/${checklist.length})`}</span>
          </h3>
        </h3>

        <div className={style.scrolldiv}>
          {checklist.map((item) => (
            <div className={style.inputdiv} key={item._id}>
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
                onClick={() =>{
                  console.log("Item",item._id)
                  handleDeleteChecklistItem(item._id)
                } }
                src={Delete}
                alt=""
              />
            </div>
          ))}
        </div>
        {errors.checklist && <p className={style.error}>{errors.checklist}</p>}
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
              value={selectedDate}
            />
          </div>
          <div>
            <button onClick={onRequestClose}>Close</button>
            <button className={style.savebtn} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Editmodal;
