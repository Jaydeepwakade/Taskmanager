import React, { useEffect, useState } from "react";
import Style from "./Board.module.css";
import collapse from "../../../assets/collapse.svg";
import add from "../../../assets/add.svg";
import dots from "../../../assets/dots.svg";
import Arrow1 from "../../../assets/Arrow1.svg";
import Arrow2 from "../../../assets/Arrow2.svg";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchdata } from "../../../redux/action";
function Board() {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const dispatch= useDispatch()
   const tasks = useSelector((state)=>state.tasks)
   useEffect(()=>{
    dispatch( fetchdata())
   },[dispatch])

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const backlogTasks = tasks.tasks.filter((task) => task.status === "BACKLOG");
  const todoTasks =tasks.tasks.filter((task) => task.status === "TO-DO");
  const inProgressTasks = tasks.tasks.filter((task) => task.status === "inProgress");
  const doneTasks = tasks.tasks.filter((task) => task.status === "done");

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h1>welcome jaydeep</h1>

        <h2>Board</h2>
      </div>

      <div className={Style.main}>
        <div className={Style.taskcontainer}>
          <div>
            <h3>Backlog</h3>
            <img src={collapse} alt="" />
          </div>
          <div className={Style.taskshow}>
            {backlogTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele.id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele.id)}
                      src={openDropdownId === ele.id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele.id &&
                      ele.checklist.map((item) => (
                        <div key={item.id} className={Style.dropdown}>
                          <input type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>To Do</h3>
              <img onClick={openModal} src={add} alt="" />
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />
              <img src={collapse} alt="" />
            </div>
            
            <div className={Style.taskshow}>
            {backlogTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele.id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele.id)}
                      src={openDropdownId === ele.id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele.id &&
                      ele.checklist.map((item) => (
                        <div key={item.id} className={Style.dropdown}>
                          <input type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
        
          
          </div>
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>in Progress</h3>
            <img src={collapse} alt="" />
          </div>

          
          <div className={Style.taskshow}>
            {inProgressTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele.id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele.id)}
                      src={openDropdownId === ele.id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele.id &&
                      ele.checklist.map((item) => (
                        <div key={item.id} className={Style.dropdown}>
                          <input type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>Done</h3>
            <img src={collapse} alt="" />
          </div>
          <div className={Style.taskshow}>
            {inProgressTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele.id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele.id)}
                      src={openDropdownId === ele.id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele.id &&
                      ele.checklist.map((item) => (
                        <div key={item.id} className={Style.dropdown}>
                          <input type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
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
