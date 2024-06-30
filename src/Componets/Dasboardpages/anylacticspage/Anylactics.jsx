import React, { useEffect } from "react";
import Style from "./anyalis.module.css";
import Ellipse3 from "../../../assets/Ellipse3.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchdata } from "../../../redux/action";

function Anylactics() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);

  if (!tasks.tasks) {
    return <h1>Loading...</h1>;
  }

  const backlogTasks = tasks.tasks.filter((task) => task.status === "BACKLOG");
  const todoTasks = tasks.tasks.filter((task) => task.status === "TO-DO");
  const inProgressTasks = tasks.tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );
  const doneTasks = tasks.tasks.filter((task) => task.status === "done");

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h1>Anylactics</h1>
      </div>
      <div className={Style.maindiv}>
        <div className={Style.column}>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> Backlog
              Tasks
            </h4>
            <span>{backlogTasks.length}</span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> To-do
              Tasks
            </h4>
            <span>{todoTasks.length}</span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> In-Progress
              Tasks
            </h4>
            <span>{inProgressTasks.length}</span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> Completed
              Tasks
            </h4>
            <span>{doneTasks.length}</span>
          </div>
        </div>

        <div className={`${Style.column} ${Style.rightColumn}`}>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> Low
              Priority
            </h4>
            <span>
              {tasks.tasks.filter((task) => task.priority === "LOW").length}
            </span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> Moderate
              Priority
            </h4>
            <span>
              {tasks.tasks.filter((task) => task.priority === "MODERATE").length}
            </span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> High
              Priority
            </h4>
            <span>
              {tasks.tasks.filter((task) => task.priority === "HIGH").length}
            </span>
          </div>
          <div className={Style.taskItem}>
            <h4>
              <img src={Ellipse3} alt="icon" className={Style.icon} /> Due Date
              Tasks
            </h4>
            <span>{tasks.tasks.filter((task) => task.duedate).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Anylactics;
