import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../redux/action";
import Style from "./sharetask.module.css";
import sandbox from "../../assets/sandbox.svg";

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
    console.log("Priority:", task.priority); // Log priority value
    return <div className={Style.priorityCircle} style={{ backgroundColor: circleColor }} />;
  };
  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className={Style.container}>
       <div className={Style.header}>
                <span><img src={sandbox} alt="sandbox" /></span>
                <h3> Pro Manage</h3>
            </div>
      <div className={Style.todos}>
        <div>
          <p>
            {renderPriorityCircle()}
            
            {task.priority}
          </p>
        </div>
        <h2>{task.title}</h2>

        
        {task.checklist && (
          <>
            <div className={Style.checklist}>
              <h3 className={Style.checklisth3}>
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

{task.dueDate && (
          <div className={Style.dueDate}>
            <p>Due Date <span>{formatDate(task.dueDate)}</span></p>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default Task;
