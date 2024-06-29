import React, { useEffect, useState } from "react";
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
import Ellipse2 from "../../../assets/Ellipse2.svg";
import blue from "../../../assets/blue.svg";
import green from "../../../assets/green.svg";
import people from "../../../assets/people.svg";
import AddEmailpopup from "../../emailpopup/Addemailpopup";

function Board() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [openDropdownIds, setOpenDropdownIds] = useState([]);
  const [showtoast, setShowtoast] = useState(false);
  const [optionsDropdownid, setOptionsDropdownId] = useState(null);
  const [toastmessage, setToastmessage] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [itemId, setItemId] = useState("");
  const [filter, setFilter] = useState("today");
  const [editmodal, setditmodal] = useState(false);
  const [editModalTaskId, setEditModalTaskId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const taskId = localStorage.getItem("token");
    if (!taskId) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const storedName = localStorage.getItem("name");
      const storedId = localStorage.getItem("id");
      setName(storedName);
      setId(storedId);
      dispatch(fetchdata());
    };
    fetchDataFromLocalStorage();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownIds((prevIds) => {
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

  const editmodalisopen = () => {
    setditmodal(true);
  };
  const editmodalclose = () => {
    setditmodal(false);
  };

  const backlogTasks = tasks.tasks.filter((task) => task.status === "BACKLOG");
  const todoTasks = tasks.tasks.filter((task) => task.status === "TO-DO");
  const inProgressTasks = tasks.tasks.filter(
    (task) => task.status === "inProgress"
  );
  const doneTasks = tasks.tasks.filter((task) => task.status === "done");

  console.log;
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
        dispatch(fetchdata(id));
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
          dispatch(fetchdata());
        } else {
          console.error("Failed to update checklist item");
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

  const renderPriorityCircle = (tasks) => {
    let circleColor = "";
    switch (tasks.priority) {
      case "HIGH":
        circleColor = "red";
        break;
      case "MODERATE":
        circleColor = "blue";
        break;
      case "LOW":
        circleColor = "green";
        break;
      default:
        circleColor = "black";
        break;
    }
    return (
      <div
        className={Style.priorityCircle}
        style={{ backgroundColor: circleColor }}
      />
    );
  };

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div>
          <h2>Welcome! {name}</h2>

          <div className={Style.addpeople}>
            <h2>Board</h2>
            <button onClick={handleaddemail}>
              {" "}
              <img src={people} alt="" /> Add people
            </button>
            <Toast
              message={toastmessage}
              show={showtoast}
              duration={3000}
              onClose={handleCloseToast}
            />
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


<div>
        <select>
          <option value="today">Today</option>
          <option value="next-week">Next Week</option>
          <option value="next-month">Next Month</option>
        </select>
      </div>

      <div className={Style.main}>
        <div className={Style.taskcontainer}>
          <div>
            <h3>Backlog</h3>
            <img src={collapse} onClick={() => setOpenDropdownIds([])} alt="" />
          </div>

          <div className={Style.taskshow}>
            {backlogTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;

              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div>
                      {renderPriorityCircle(ele)}
                      <p>{ele.priority}</p>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                    <div className={Style.optionsDropdown}>
                      <button
                        onClick={() => {
                          setOptionsDropdownId([]);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit        
                      </button>
                      <button onClick={() => handleDeleteClick(ele._id)}>
                        Delete
                      </button>
                      <button onClick={() => handleShare(ele._id)}>
                        Share
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
                      onClick={() => toggleDropdown(ele._id)}
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
                    <div className={Style.date}>date</div>
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
              <img onClick={openModal} src={add} alt="" />
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />
            
              <img
                onClick={() => setOpenDropdownIds([])}
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
                    <div>
                      {renderPriorityCircle(ele)}
                      <p>{ele.priority}</p>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                    <div className={Style.optionsDropdown}>
                      <button
                        onClick={() => {
                          setOptionsDropdownId([]);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit        
                      </button>
                      <button onClick={() => handleDeleteClick(ele._id)}>
                        Delete
                      </button>
                      <button onClick={() => handleShare(ele._id)}>
                        Share
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
                      onClick={() => toggleDropdown(ele._id)}
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
                    <div className={Style.date}>date</div>
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
            <img onClick={() => setOpenDropdownIds([])} src={collapse} alt="" />
          </div>
          <div className={Style.taskshow}>
            {inProgressTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div>
                      {renderPriorityCircle(ele)}
                      <p>{ele.priority}</p>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                    <div className={Style.optionsDropdown}>
                      <button
                        onClick={() => {
                          setOptionsDropdownId([]);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit        
                      </button>
                      <button onClick={() => handleDeleteClick(ele._id)}>
                        Delete
                      </button>
                      <button onClick={() => handleShare(ele._id)}>
                        Share
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
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownIds.includes(ele._id) ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIds.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setTaskId(ele._id);
                              setItemId(item._id);
                            }}
                            type="checkbox"
                          />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    <div className={Style.date}>date</div>
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
            <img onClick={() => setOpenDropdownIds([])} src={collapse} alt="" />
          </div>
          <div className={Style.taskshow}>
            {doneTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <div>
                      {renderPriorityCircle(ele)}
                      <p>{ele.priority}</p>
                    </div>
                    <img
                      onClick={() => setOptionsDropdownId(ele._id)}
                      src={dots}
                      alt=""
                    />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                    <div className={Style.optionsDropdown}>
                      <button
                        onClick={() => {
                          setOptionsDropdownId([]);
                          setEditModalTaskId(ele._id);
                        }}
                      >
                        Edit        
                      </button>
                      <button onClick={() => handleDeleteClick(ele._id)}>
                        Delete
                      </button>
                      <button onClick={() => handleShare(ele._id)}>
                        Share
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
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownIds.includes(ele._id) ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownIds.includes(ele._id) &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    <div className={Style.date}>date</div>
                    <div className={Style.btns}>
                      <button onClick={() => moveTask(ele._id, "TO-DO")}>
                        TO-DO
                      </button>
                      <button onClick={() => moveTask(ele._id, "inProgress")}>
                        IN PROGRESS
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
