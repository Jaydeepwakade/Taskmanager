import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../redux/action";
import Style from "./sharetask.module.css";

function Task() {
  const { taskid } = useParams();
  const [task, setTask] = useState({ checklist: [] });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await fetch(`${url}/fetchTaskById/${taskid}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });

        const response = await result.json();
        setTask(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskid]);

  const renderPriorityCircle = () => {
    let circleColor = "";
    switch (task.priority) {
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
    console.log("Priority:", task.priority); // Log priority value
    return <div className={Style.priorityCircle} style={{ backgroundColor: circleColor }} />;
  };

  return (
    <div className={Style.container}>
      <div className={Style.todos}>
        <div>
          <p>
            {renderPriorityCircle()}
            
            {task.priority}
          </p>
        </div>
        <h2>{task.title}</h2>

        {/* Render Checklist if exists */}
        {task.checklist && (
          <>
            <div className={Style.checklist}>
              <h3>
                Checklist ({task.checklist.filter(item => item.completed).length}/{task.checklist.length})
              </h3>
            </div>
            <div className={Style.dropdowndiv}>
              {task.checklist.map((item) => (
                <div key={item._id} className={Style.dropdown}>
                  <input type="checkbox" checked={item.completed} />
                  <h3>{item.task}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Due Date */}
        <div className={Style.dueDate}>
          <p>Due Date: <span>{task.dueDate}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Task;
