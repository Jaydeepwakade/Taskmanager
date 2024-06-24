import React, { useState } from "react";
import "./Board.css";

function New() {
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
        { id: 2, task: "Task to be done", completed: false },
        {
          id: 3,
          task: "Task to be done ede lorem Ipsum is a Dummy text t",
          completed: false,
        },
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
    {
      id: 6,
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
    {
      id: 7,
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
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleChecklistChange = (taskId, checklistItemId, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map((item) =>
                item.id === checklistItemId ? { ...item, completed } : item
              ),
            }
          : task
      )
    );
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <h1>Welcome! Kumar</h1>
          <div className="add-people">
            <button className="add-people-btn">
              <i className="fas fa-user-plus"></i> Add People
            </button>
          </div>
        </div>
        <div className="kanban-board">
          <div className="kanban-column backlog">
            <h2>Backlog</h2>
            <ul className="task-list">
              {tasks
                .filter((task) => task.status === "BACKLOG")
                .map((task) => (
                  <li key={task.id} onClick={() => handleTaskClick(task)}>
                    <div className="task-card">
                      <div className="task-header">
                        <span className={`priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span className="title">{task.title}</span>
                        <i className="fas fa-ellipsis-v"></i>
                      </div>
                      <div className="checklist">
                        <p>
                          Checklist (
                          {
                            task.checklist.filter((item) => item.completed)
                              .length
                          }
                          /{task.checklist.length})
                        </p>
                        {task.checklist.map((item) => (
                          <div key={item.id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() =>
                                handleChecklistChange(
                                  task.id,
                                  item.id,
                                  !item.completed
                                )
                              }
                            />
                            <label>{item.task}</label>
                          </div>
                        ))}
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-failed"
                          onClick={() => handleStatusChange(task.id, "FAILED")}
                        >
                          Failed
                        </button>
                        <button
                          className="btn-progress"
                          onClick={() =>
                            handleStatusChange(task.id, "PROGRESS")
                          }
                        >
                          Progress
                        </button>
                        <button
                          className="btn-to-do"
                          onClick={() => handleStatusChange(task.id, "TO-DO")}
                        >
                          To-Do
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => handleStatusChange(task.id, "DONE")}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="kanban-column to-do">
            <h2>To do</h2>
            <ul className="task-list">
              {tasks
                .filter((task) => task.status === "TO-DO")
                .map((task) => (
                  <li key={task.id} onClick={() => handleTaskClick(task)}>
                    <div className="task-card">
                      <div className="task-header">
                        <span className={`priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span className="title">{task.title}</span>
                        <i className="fas fa-ellipsis-v"></i>
                      </div>
                      <div className="checklist">
                        <p>
                          Checklist (
                          {
                            task.checklist.filter((item) => item.completed)
                              .length
                          }
                          /{task.checklist.length})
                        </p>
                        {task.checklist.map((item) => (
                          <div key={item.id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() =>
                                handleChecklistChange(
                                  task.id,
                                  item.id,
                                  !item.completed
                                )
                              }
                            />
                            <label>{item.task}</label>
                          </div>
                        ))}
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-failed"
                          onClick={() => handleStatusChange(task.id, "FAILED")}
                        >
                          Failed
                        </button>
                        <button
                          className="btn-progress"
                          onClick={() =>
                            handleStatusChange(task.id, "PROGRESS")
                          }
                        >
                          Progress
                        </button>
                        <button
                          className="btn-to-do"
                          onClick={() => handleStatusChange(task.id, "TO-DO")}
                        >
                          To-Do
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => handleStatusChange(task.id, "DONE")}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="kanban-column in-progress">
            <h2>In progress</h2>
            <ul className="task-list">
              {tasks
                .filter((task) => task.status === "PROGRESS")
                .map((task) => (
                  <li key={task.id} onClick={() => handleTaskClick(task)}>
                    <div className="task-card">
                      <div className="task-header">
                        <span className={`priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span className="title">{task.title}</span>
                        <i className="fas fa-ellipsis-v"></i>
                      </div>
                      <div className="checklist">
                        <p>
                          Checklist (
                          {
                            task.checklist.filter((item) => item.completed)
                              .length
                          }
                          /{task.checklist.length})
                        </p>
                        {task.checklist.map((item) => (
                          <div key={item.id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() =>
                                handleChecklistChange(
                                  task.id,
                                  item.id,
                                  !item.completed
                                )
                              }
                            />
                            <label>{item.task}</label>
                          </div>
                        ))}
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-failed"
                          onClick={() => handleStatusChange(task.id, "FAILED")}
                        >
                          Failed
                        </button>
                        <button
                          className="btn-progress"
                          onClick={() =>
                            handleStatusChange(task.id, "PROGRESS")
                          }
                        >
                          Progress
                        </button>
                        <button
                          className="btn-to-do"
                          onClick={() => handleStatusChange(task.id, "TO-DO")}
                        >
                          To-Do
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => handleStatusChange(task.id, "DONE")}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="kanban-column done">
            <h2>Done</h2>
            <ul className="task-list">
              {tasks
                .filter((task) => task.status === "DONE")
                .map((task) => (
                  <li key={task.id} onClick={() => handleTaskClick(task)}>
                    <div className="task-card">
                      <div className="task-header">
                        <span className={`priority-${task.priority}`}>
                          {task.priority}
                        </span>
                        <span className="title">{task.title}</span>
                        <i className="fas fa-ellipsis-v"></i>
                      </div>
                      <div className="checklist">
                        <p>
                          Checklist (
                          {
                            task.checklist.filter((item) => item.completed)
                              .length
                          }
                          /{task.checklist.length})
                        </p>
                        {task.checklist.map((item) => (
                          <div key={item.id} className="checklist-item">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() =>
                                handleChecklistChange(
                                  task.id,
                                  item.id,
                                  !item.completed
                                )
                              }
                            />
                            <label>{item.task}</label>
                          </div>
                        ))}
                      </div>
                      <div className="task-actions">
                        <button
                          className="btn-failed"
                          onClick={() => handleStatusChange(task.id, "FAILED")}
                        >
                          Failed
                        </button>
                        <button
                          className="btn-progress"
                          onClick={() =>
                            handleStatusChange(task.id, "PROGRESS")
                          }
                        >
                          Progress
                        </button>
                        <button
                          className="btn-to-do"
                          onClick={() => handleStatusChange(task.id, "TO-DO")}
                        >
                          To-Do
                        </button>
                        <button
                          className="btn-done"
                          onClick={() => handleStatusChange(task.id, "DONE")}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {selectedTask && (
          <div className="task-details">
            <h2>{selectedTask.title}</h2>
            <span className={`priority-${selectedTask.priority}`}>
              {selectedTask.priority}
            </span>
            <div className="status-buttons">
              <button
                className={`status-btn ${
                  selectedTask.status === "BACKLOG" ? "active" : ""
                }`}
                onClick={() => handleStatusChange(selectedTask.id, "BACKLOG")}
              >
                Backlog
              </button>
              <button
                className={`status-btn ${
                  selectedTask.status === "TO-DO" ? "active" : ""
                }`}
                onClick={() => handleStatusChange(selectedTask.id, "TO-DO")}
              >
                To Do
              </button>
              <button
                className={`status-btn ${
                  selectedTask.status === "PROGRESS" ? "active" : ""
                }`}
                onClick={() => handleStatusChange(selectedTask.id, "PROGRESS")}
              >
                In Progress
              </button>
              <button
                className={`status-btn ${
                  selectedTask.status === "DONE" ? "active" : ""
                }`}
                onClick={() => handleStatusChange(selectedTask.id, "DONE")}
              >
                Done
              </button>
            </div>
            <div className="checklist">
              <p>Checklist</p>
              {selectedTask.checklist.map((item) => (
                <div key={item.id} className="checklist-item">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() =>
                      handleChecklistChange(
                        selectedTask.id,
                        item.id,
                        !item.completed
                      )
                    }
                  />
                  <label>{item.task}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="link-copied">
        <button className="link-copied-btn">Link Copied</button>
        <div className="dropdown">
          <button className="dropdown-btn">This week</button>
          <div className="dropdown-content">
            <a href="#">Today</a>
            <a href="#">This Week</a>
            <a href="#">This Month</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
