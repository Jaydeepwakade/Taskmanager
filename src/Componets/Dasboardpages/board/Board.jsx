import React, { useEffect, useState, useRef } from "react";
import Style from "./Board.module.css";
import collapse from "../../../assets/collapse.svg";
import add from "../../../assets/add.svg";
import dots from "../../../assets/dots.svg";
import Arrow1 from "../../../assets/Arrow1.svg";
import Arrow2 from "../../../assets/Arrow2.svg";
import Modal from "../../Modal/addtaskmodal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchdata, updateTaskStatus, url } from "../../../redux/action";
import Toast from "../../toasts/Toast";
import usePopup from "../../usepopup/Popup";
import ConfirmationModal from "../../usepopup/Confarmation";
import { useNavigate } from "react-router-dom";
import Editmodal from "../../Modal/editdatamodal/Editmodal";
import people from "../../../assets/people.svg";
import AddEmailpopup from "../../emailpopup/Addemailpopup";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 

function Board() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [openDropdownIds, setOpenDropdownIds] = useState([]);
  const [openDropdownIdstodo, setOpenDropdownIdstodo] = useState([]);
  const [openDropdownIddone, setOpenDropdownIdsdone] = useState([]);

  const [openDropdownIdsprogress, setOpenDropdownIdsprogress] = useState([]);
  const [showtoast, setShowtoast] = useState(false);
  const [optionsDropdownId, setOptionsDropdownId] = useState(null);

  const [toastmessage, setToastmessage] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [itemId, setItemId] = useState("");
  const [filter, setFilter] = useState("next-week");
  const [editModalTaskId, setEditModalTaskId] = useState(null);
  const optionsDropdownRef = useRef(null);
  const formatedDate = (dateObj) => {
    const day = String(dateObj.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const dateObj = new Date();

  const formattedDate = formatedDate(dateObj);

  const editModalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const taskId = localStorage.getItem("token");
    if (!taskId) {
      navigate("/");
      return;
    }
  }, [navigate]);
  useEffect(() => {
    dispatch(fetchdata("next-week"));
  }, []);
  const tasks = useSelector((state) => state.tasks);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        optionsDropdownRef.current &&
        !optionsDropdownRef.current.contains(event.target)
      ) {
        setOptionsDropdownId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsDropdownRef]);
  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("id");
      setName(storedName);
      setId(storedId);
      dispatch(fetchdata("next-week"));
    };
    fetchDataFromLocalStorage();
  }, []);

  useEffect(() => {
    dispatch(fetchdata(filter));
  }, [filter]);

  const toggleDropdownbacklog = (id) => {
    setOpenDropdownIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((dropdownId) => dropdownId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const toggleDropdowntodo = (id) => {
    setOpenDropdownIdstodo((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((dropdownId) => dropdownId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const toggleDropdownprogress = (id) => {
    setOpenDropdownIdsprogress((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((dropdownId) => dropdownId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  const toggleDropdowndone = (id) => {
    setOpenDropdownIdsdone((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((dropdownId) => dropdownId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const moveTask = (taskId, newStatus) => {
    dispatch(updateTaskStatus(taskId, newStatus));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const backlogTasks = tasks.tasks.filter((task) => task.status === "BACKLOG");
  const todoTasks = tasks.tasks.filter((task) => task.status === "TO-DO");
  const inProgressTasks = tasks.tasks.filter(
    (task) => task.status === "inProgress"
  );
  const doneTasks = tasks.tasks.filter((task) => task.status === "done");

  const handleCloseToast = () => {
    setShowtoast(false);
  };

  const { isOpen, popupType, openPopup, closePopup } = usePopup();

  const handleaddemail = () => {
    openPopup("ADDEMAIL");
  };
  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    openPopup("DELETE");
  };

  const handleShowToast = (message) => {
    setShowtoast(true);
    setToastmessage(message);
  };

  const handleDelete = async (taskIdToDelete) => {
    if (!taskIdToDelete) return;

    try {
      const result = await fetch(`${url}/deleteTask/${id}/${taskIdToDelete}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        handleShowToast("Task deleted successfully");
        closePopup();
        dispatch(fetchdata("next-week"));
      } else {
        handleShowToast("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      handleShowToast("Error deleting task");
    }
  };

  const handleShare = async (taskId) => {
    try {
      const result = await fetch(`${url}/generateShareLink/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        handleShowToast("Link copied to clipboard");
        const { shareLink } = await result.json();
        await navigator.clipboard.writeText(shareLink);
      } else {
        handleShowToast("Failed to generate share link");
      }
    } catch (error) {
      console.error("Error fetching or copying link:", error);
      handleShowToast("Error generating share link");
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    switch (value) {
      case "today":
        // dispatch(fetchdata(filter));
        break;
      case "next-week":
        // dispatch(fetchdata(filter));
        break;
      case "next-month":
        // dispatch(fetchdata(filter));
        break;
      default:
        break;
    }
  };
  const renderAvatar = (ele) => {
    return (
      <div className={ele.name ? Style.avatar : ""}>
        <h4>
          {typeof ele.name === "string" && ele.name.length >= 2
            ? ele.name.substring(0, 2).toUpperCase()
            : ""}
        </h4>
      </div>
    );
  };
  useEffect(() => {
    const changeTickStatus = async () => {
      try {
        const result = await fetch(
          `${url}/updateChecklistItem/${taskId}/${itemId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ checked }),
          }
        );

        if (result.ok) {
          const response = await result.json();
          console.log(response);
          dispatch(fetchdata("next-week"));
        } else {
        }
      } catch (error) {
        console.error("Error updating checklist item:", error);
      }
    };

    changeTickStatus();
  }, [checked, dispatch, taskId, itemId]);

  const handleAddEmail = () => {
    console.log("hello jaydeep");
  };

  const renderPriorityCircle = (tasks, msg) => {
    let circleColor = "";
    switch (tasks.priority) {
      case "HIGH PRIORITY":
        circleColor = "red";
        break;
      case "MODERATE PRIORITY":
        circleColor = "blue";
        break;
      case "LOW PRIORITY":
        circleColor = "green";
        break;
      default:
        circleColor = "black";
        break;
    }
    return (
      <div className={Style.prioritydiv}>
        {" "}
        <div
          className={Style.priorityCircle}
          style={{ backgroundColor: circleColor }}
        ></div>
        <p>{msg}</p>
      </div>
    );
  };
  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  if (tasks.loading) {
    return (
      <div className={Style.loaderContainer}>
        <div className={Style.loader}></div>
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div>
          <h2>Welcome! {name}</h2>

          <div className={Style.addpeople}>
            <div className={Style.boarding}>
              <h2>Board</h2>
              <button style={{ cursor: "pointer" }} onClick={handleaddemail}>
                {" "}
                <img src={people} alt="" /> Add people
              </button>
            </div>
            <Toast
              message={toastmessage}
              show={showtoast}
              duration={3000}
              onClose={handleCloseToast}
            />

            <div className={Style.filtering}>
              <h2 className={Style.datenew}>{formattedDate}</h2>
              <select value={filter} onChange={handleFilterChange}>
                <option value="next-week">This Week</option>
                <option value="today">Today</option>
                <option value="next-month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isOpen && popupType === "DELETE"}
        onClose={closePopup}
        buttontxt={"Yes, Delete"}
        onConfirm={() => handleDelete(taskToDelete)}
        message="Are you sure you want to delete ?"
      />
      <AddEmailpopup
        isOpen={isOpen && popupType === "ADDEMAIL"}
        onClose={closePopup}
        onConfirm={handleAddEmail}
      />

      <div className={Style.main}>
        <div className={Style.taskcontainer}>
          <div>
            <h3>Backlog</h3>
            <img
              style={{ cursor: "pointer" }}
              src={collapse}
              onClick={() => setOpenDropdownIds([])}
              alt=""
            />
          </div>

          <div className={Style.taskshow}>
            {backlogTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;

              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div className={Style.subheader}>
                      {renderPriorityCircle(ele, ele.priority)}
                      <div className={ele.name ? Style.avatar : ""}>
                        <h4>
                          {typeof ele.name === "string" && ele.name.length >= 2
                            ? ele.name.substring(0, 2).toUpperCase()
                            : ""}
                        </h4>
                      </div>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                  <Tippy  className={Style.customTooltip} content={ele.title}>
         
         <h2 className={Style.title} key={ele._id}>
            {ele.title}
          </h2>
       
        </Tippy>
                  {optionsDropdownId === ele._id && (
                    <div
                      ref={optionsDropdownRef}
                      className={Style.optionsDropdown}
                    >
                      <button
                        onClick={() => {
                          setOptionsDropdownId(null);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleShare(ele._id)}>
                        Share
                      </button>
                      <button
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClick(ele._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {editModalTaskId === ele._id && (
                    <Editmodal
                      isOpen={true}
                      onRequestClose={() => setEditModalTaskId(null)}
                      task={ele}
                    />
                  )}

                  <div className={Style.checklist}>
                    <h3>
                      Checklist{"  "}({completedCount}/{ele.checklist.length})
                    </h3>
                    <img
                      onClick={() => toggleDropdownbacklog(ele._id)}
                      src={openDropdownIds.includes(ele._id) ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIds.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setTaskId(ele._id);
                              setItemId(item._id);
                            }}
                          />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    {ele.dueDate ? (
                      <div className={Style.date}>
                        {formatDate(ele.dueDate)}
                      </div>
                    ) : (
                      <div className={Style.duedate2}></div>
                    )}
                    <div className={Style.btns}>
                      <button onClick={() => moveTask(ele._id, "inProgress")}>
                        PROGRESS
                      </button>
                      <button onClick={() => moveTask(ele._id, "TO-DO")}>
                        TODO
                      </button>
                      <button onClick={() => moveTask(ele._id, "done")}>
                        DONE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* To Do Tasks */}
        <div className={Style.taskcontainer}>
          <div>
            <h3>To Do</h3>
            <div>
              <img
                className={Style.addmodal}
                onClick={openModal}
                src={add}
                alt=""
              />
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />

              <img
                style={{ cursor: "pointer" }}
                onClick={() => setOpenDropdownIdstodo([])}
                src={collapse}
                alt=""
              />
            </div>
          </div>
          <div className={Style.taskshow}>
            {todoTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div className={Style.subheader}>
                      {renderPriorityCircle(ele, ele.priority)}
                      <div className={ele.name ? Style.avatar : ""}>
                        <h4>
                          {typeof ele.name === "string" && ele.name.length >= 2
                            ? ele.name.substring(0, 2).toUpperCase()
                            : ""}
                        </h4>
                      </div>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                
                <Tippy  className={Style.customTooltip} content={ele.title}>
         
                 <h2 className={Style.title} key={ele._id}>
                    {ele.title}
                  </h2>
               
                </Tippy>
                

                  {optionsDropdownId === ele._id && (
                    <div
                      ref={optionsDropdownRef}
                      className={Style.optionsDropdown}
                    >
                      <button
                        onClick={() => {
                          setOptionsDropdownId(null);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleShare(ele._id)}>
                        Share
                      </button>
                      <button
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClick(ele._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {editModalTaskId === ele._id && (
                    <Editmodal
                      isOpen={true}
                      onRequestClose={() => setEditModalTaskId(null)}
                      task={ele}
                    />
                  )}
                  <div className={Style.checklist}>
                    <h3>
                      Checklist ({completedCount}/{ele.checklist.length})
                    </h3>
                    <img
                      onClick={() => toggleDropdowntodo(ele._id)}
                      src={
                        openDropdownIdstodo.includes(ele._id) ? Arrow1 : Arrow2
                      }
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIdstodo.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setTaskId(ele._id);
                              setItemId(item._id);
                            }}
                          />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    {ele.dueDate ? (
                      <div className={Style.date}>
                        {formatDate(ele.dueDate)}
                      </div>
                    ) : (
                      <div className={Style.duedate2}></div>
                    )}
                    <div className={Style.btns}>
                      <button onClick={() => moveTask(ele._id, "inProgress")}>
                        PROGRESS
                      </button>
                      <button onClick={() => moveTask(ele._id, "BACKLOG")}>
                        BACKLOG
                      </button>
                      <button onClick={() => moveTask(ele._id, "done")}>
                        DONE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={Style.taskcontainer}>
          <div>
            <h3>In Progress</h3>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setOpenDropdownIdsprogress([])}
              src={collapse}
              alt=""
            />
          </div>
          <div className={Style.taskshow}>
            {inProgressTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div className={Style.subheader}>
                      {renderPriorityCircle(ele, ele.priority)}
                      <div className={ele.name ? Style.avatar : ""}>
                        <h4>
                          {typeof ele.name === "string" && ele.name.length >= 2
                            ? ele.name.substring(0, 2).toUpperCase()
                            : ""}
                        </h4>
                      </div>
                    </div>
                    <img
                      onClick={() =>
                        setOptionsDropdownId(
                          optionsDropdownId === ele._id ? null : ele._id
                        )
                      }
                      src={dots}
                      alt=""
                    />
                  </div>
                  <Tippy  className={Style.customTooltip} content={ele.title}>
         
         <h2 className={Style.title} key={ele._id}>
            {ele.title}
          </h2>
       
        </Tippy>
                  {optionsDropdownId === ele._id && (
                    <div
                      ref={optionsDropdownRef}
                      className={Style.optionsDropdown}
                    >
                      <button
                        onClick={() => {
                          setOptionsDropdownId(null);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleShare(ele._id)}>
                        Share
                      </button>
                      <button
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClick(ele._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {editModalTaskId === ele._id && (
                    <Editmodal
                      isOpen={true}
                      onRequestClose={() => setEditModalTaskId(null)}
                      task={ele}
                    />
                  )}

                  <div className={Style.checklist}>
                    <h3>
                      Checklist ({completedCount}/{ele.checklist.length})
                    </h3>
                    <img
                      onClick={() => toggleDropdownprogress(ele._id)}
                      src={
                        openDropdownIdsprogress.includes(ele._id)
                          ? Arrow1
                          : Arrow2
                      }
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIdsprogress.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setTaskId(ele._id);
                              setItemId(item._id);
                            }}
                          />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    {ele.dueDate ? (
                      <div className={Style.date}>
                        {formatDate(ele.dueDate)}
                      </div>
                    ) : (
                      <div className={Style.duedate2}></div>
                    )}
                    <div className={Style.btns}>
                      <button onClick={() => moveTask(ele._id, "TO-DO")}>
                        TODO
                      </button>
                      <button onClick={() => moveTask(ele._id, "BACKLOG")}>
                        BACKLOG
                      </button>
                      <button onClick={() => moveTask(ele._id, "done")}>
                        DONE
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Done Tasks */}
        <div className={Style.taskcontainer}>
          <div>
            <h3>Done</h3>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setOpenDropdownIdsdone([])}
              src={collapse}
              alt=""
            />
          </div>
          <div className={Style.taskshow}>
            {doneTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div className={Style.subheader}>
                      {renderPriorityCircle(ele, ele.priority)}
                      <div className={ele.name ? Style.avatar : ""}>
                        <h4>
                          {typeof ele.name === "string" && ele.name.length >= 2
                            ? ele.name.substring(0, 2).toUpperCase()
                            : ""}
                        </h4>
                      </div>
                    </div>
                    <img
                      onClick={() =>
                        setOptionsDropdownId(
                          optionsDropdownId === ele._id ? null : ele._id
                        )
                      }
                      src={dots}
                      alt=""
                    />
                  </div>
                  <Tippy  className={Style.customTooltip} content={ele.title}>
         
         <h2 className={Style.title} key={ele._id}>
            {ele.title}
          </h2>
       
        </Tippy>
                  {optionsDropdownId === ele._id && (
                    <div
                      ref={optionsDropdownRef}
                      className={Style.optionsDropdown}
                    >
                      <button
                        onClick={() => {
                          setOptionsDropdownId(null);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={() => handleShare(ele._id)}>
                        Share
                      </button>
                      <button
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClick(ele._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {editModalTaskId === ele._id && (
                    <Editmodal
                      isOpen={true}
                      onRequestClose={() => setEditModalTaskId(null)}
                      task={ele}
                    />
                  )}
                  <div>
                    <h3>
                      Checklist ({completedCount} / {ele.checklist.length})
                    </h3>
                    <img
                      onClick={() => toggleDropdowndone(ele._id)}
                      src={
                        openDropdownIddone.includes(ele._id) ? Arrow1 : Arrow2
                      }
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIddone.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setTaskId(ele._id);
                              setItemId(item._id);
                            }}
                          />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    {ele.dueDate ? (
                      <div className={Style.donebtn}>
                        {formatDate(ele.dueDate)}
                      </div>
                    ) : (
                      <div className={Style.duedate2}></div>
                    )}
                    <div className={Style.btns}>
                      <button onClick={() => moveTask(ele._id, "TO-DO")}>
                        TODO
                      </button>
                      <button onClick={() => moveTask(ele._id, "inProgress")}>
                        PROGRESS
                      </button>
                      <button onClick={() => moveTask(ele._id, "BACKLOG")}>
                        BACKLOG
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
