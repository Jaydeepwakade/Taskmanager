import React, { useState } from "react";
import Style from "./Board.module.css";
import collapse from "../../../assets/collapse.svg";
import add from "../../../assets/add.svg";
import dots from "../../../assets/dots.svg";
import Arrow1 from "../../../assets/Arrow1.svg";
import Arrow2 from "../../../assets/Arrow2.svg";

function Board() {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Hero section",
      priority: "HIGH",
      status: "BACKLOG",
      checklist: [
        { id: 1, task: "Task to be done", completed: false },
        { id: 2, task: "Task to be done", completed: false },
        {
          id: 3,
          task: "Task to be done ede lorem Ipsum is a Dummy text t",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "Hero section",
      priority: "LOW",
      status: "TO-DO",
      checklist: [
        { id: 1, task: "Task to be done", completed: false },
        { id: 2, task: "Task to be done", completed: false },
        {
          id: 3,
          task: "Task to be done ede lorem Ipsum is a Dummy text t",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Typography change in the First two screens of th...",
      priority: "MODERATE",
      status: "BACKLOG",
      checklist: [
        { id: 1, task: "Task to be done", completed: false },
        { id: 2, task: "Task to be done", completed: false },
        {
          id: 3,
          task: "Task to be done ede lorem Ipsum is a Dummy text t",
          completed: false,
        },
      ],
    },
    {
      id: 4,
      title: "Hero section",
      priority: "LOW",
      status: "TO-DO",
      checklist: [
        { id: 1, task: "Task to be done", completed: false },
        { id: 2, task: "Task to be done", completed: true },
      ],
    },
    {
      id: 5,
      title: "Hero section",
      priority: "HIGH",
      status: "TO-DO",
      checklist: [
        { id: 1, task: "Task to be done", completed: false },
        { id: 2, task: "Task to be done", completed: false },
        {
          id: 3,
          task: "Task to be done ede lorem Ipsum is a Dummy text t",
          completed: false,
        },
      ],
    },
  ]);
  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null); 
    } else {
      setOpenDropdownId(id); 
    }
  };

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
            {tasks.map((ele) => {
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
                    {openDropdownId === ele.id && (
                     
                      ele.checklist.map((item) => (
                        <div key={item.id} className={Style.dropdown}>
                          <input  type="checkbox" />
                          <h3>{item.task}</h3>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>To Do</h3>

            <div>
              <img src={add} alt="" />
              <img src={collapse} alt="" />
            </div>
          </div>
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>in Progress</h3>
            <img src={collapse} alt="" />
          </div>
        </div>
        <div className={Style.taskcontainer}>
          <div>
            <h3>Done</h3>
            <img src={collapse} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
