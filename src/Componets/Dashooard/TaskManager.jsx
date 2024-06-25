// import React, { useState } from "react";
// import "./TaskManager.css";

// const [newSubtaskchecked, setNewSubtaskchecked] = useState(false);

// const TaskManager = () => {
//   const [tasks, setTasks] = useState({
//     backlog: [],
//     todo: [],
//     progress: [],
//     done: [],
//   });

//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [newTaskPriority, setNewTaskPriority] = useState("medium");
//   const [newTaskChecklist, setNewTaskChecklist] = useState([]);
//   const [newTaskDueDate, setNewTaskDueDate] = useState("");
//   const [showAddSubtaskInput, setShowAddSubtaskInput] = useState(false);
//   const [newSubtaskTitle, setNewSubtaskTitle] = useState("");


//   const handleAddTask = () => {
//     setShowAddTaskModal(true);
//   };

//   const handleSaveTask = () => {
//     const newTask = {
//       id: tasks.todo.length + 1, // Generate unique ID (in real app, use UUID or backend-generated ID)
//       title: newTaskTitle,
//       priority: newTaskPriority,
//       checklist: newTaskChecklist.map((item, index) => ({
//         id: index + 1,
//         task: item.title,
//         completed: item.checked,
//       })),
//       dueDate: newTaskDueDate,
//     };

//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       todo: [...prevTasks.todo, newTask],
//     }));

//     // Reset form state
//     setNewTaskTitle("");
//     setNewTaskPriority("medium");
//     setNewTaskChecklist([]);
//     setNewTaskDueDate("");
//     setShowAddTaskModal(false);
//   };


//   const handleSaveSubtask = async () => {
//     if (newSubtaskTitle.trim() !== "") {
//         const newSubtask = {
//             title: newSubtaskTitle,
//             checked: newSubtaskchecked,
//           };
//       await new Promise((resolve) => {
//         setNewTaskChecklist([...newTaskChecklist, newSubtask], resolve);
//       });
//       setShowAddSubtaskInput(false);
//       setNewSubtaskTitle("");
//     }
//   };

//   const handleChecklistItemChange = (index, value) => {
//     const updatedChecklist = [...newTaskChecklist];
//     updatedChecklist[index] = value;
//     setNewTaskChecklist(updatedChecklist);
//   };

//   const handleMoveTask = (taskId, targetSection) => {
//     const updatedTasks = { ...tasks };
//     const taskToMove = updatedTasks[targetSection].find(
//       (task) => task.id === taskId
//     );
//     if (taskToMove) {
//       updatedTasks[targetSection] = updatedTasks[targetSection].filter(
//         (task) => task.id !== taskId
//       );
//       updatedTasks[taskToMove.status] = [
//         ...updatedTasks[taskToMove.status],
//         taskToMove,
//       ];
//       setTasks(updatedTasks);
//     }
//   };

//   return (
//     <div className="task-manager">
//       <div className="section backlog">
//         <h2>Backlog</h2>
//         {tasks.backlog.map((task) => (
//           <Task key={task.id} task={task} onMoveTask={handleMoveTask} />
//         ))}
//         <div className="section-actions">
//           <button onClick={() => handleMoveTask(task.id, "todo")}>To-Do</button>
//           <button onClick={() => handleMoveTask(task.id, "progress")}>
//             Progress
//           </button>
//           <button onClick={() => handleMoveTask(task.id, "done")}>Done</button>
//         </div>
//       </div>
//       <div className="section todo">
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <h2>To-Do</h2>
//           <button className="add-task-btn" onClick={handleAddTask}>
//             +
//           </button>
//         </div>
//         {tasks.todo.map((task) => (
//           <Task key={task.id} task={task} onMoveTask={handleMoveTask} />
//         ))}
//         <div className="section-actions">
//           <button onClick={() => handleMoveTask(task.id, "backlog")}>
//             Backlog
//           </button>
//           <button onClick={() => handleMoveTask(task.id, "progress")}>
//             Progress
//           </button>
//           <button onClick={() => handleMoveTask(task.id, "done")}>Done</button>
//         </div>
//       </div>
//       <div className="section progress">
//         <h2>Progress</h2>
//         {tasks.progress.map((task) => (
//           <Task key={task.id} task={task} onMoveTask={handleMoveTask} />
//         ))}
//         <div className="section-actions">
//           <button onClick={() => handleMoveTask(task.id, "backlog")}>
//             Backlog
//           </button>
//           <button onClick={() => handleMoveTask(task.id, "todo")}>To-Do</button>
//           <button onClick={() => handleMoveTask(task.id, "done")}>Done</button>
//         </div>
//       </div>
//       <div className="section done">
//         <h2>Done</h2>
//         {tasks.done.map((task) => (
//           <Task key={task.id} task={task} onMoveTask={handleMoveTask} />
//         ))}
//         <div className="section-actions">
//           <button onClick={() => handleMoveTask(task.id, "backlog")}>
//             Backlog
//           </button>
//           <button onClick={() => handleMoveTask(task.id, "todo")}>To-Do</button>
//           <button onClick={() => handleMoveTask(task.id, "progress")}>
//             Progress
//           </button>
//         </div>
//       </div>
//       {showAddTaskModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowAddTaskModal(false)}>
//               &times;
//             </span>
//             <h2>Add New Task</h2>
//             <input
//               type="text"
//               placeholder="Enter task title"
//               value={newTaskTitle}
//               onChange={(e) => setNewTaskTitle(e.target.value)}
//             />
//             <div className="priority-options">
//               <span>Select Priority: </span>
//               <button
//                 className={`priority-btn ${
//                   newTaskPriority === "high" ? "selected" : ""
//                 }`}
//                 onClick={() => setNewTaskPriority("high")}
//               >
//                 High
//               </button>
//               <button
//                 className={`priority-btn ${
//                   newTaskPriority === "medium" ? "selected" : ""
//                 }`}
//                 onClick={() => setNewTaskPriority("medium")}
//               >
//                 Medium
//               </button>
//               <button
//                 className={`priority-btn ${
//                   newTaskPriority === "low" ? "selected" : ""
//                 }`}
//                 onClick={() => setNewTaskPriority("low")}
//               >
//                 Low
//               </button>
//             </div>
//             <div className="checklist-options">
//               <h3>Checklist</h3>
//               {newTaskChecklist.map((item, index) => (
//                 <div key={index}>
//                   <input
//                     type="checkbox"
//                     checked={item.checked}
//                     value={item}
//                   />
//                   <label>{item.title}</label>
//                 </div>
//               ))}
//               {showAddSubtaskInput ? (
//                 <div>
//                   <input
//                     type="checkbox"
//                     checked={newSubtaskchecked}
//                     onChange={(e) => setNewSubtaskchecked(e.target.checked)}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter subtask"
//                     value={newSubtaskTitle}
//                     onChange={(e) => setNewSubtaskTitle(e.target.value)}
//                   />
//                   <button onClick={handleSaveSubtask}>Add</button>
//                 </div>
//               ) : (
//                 <button onClick={() => setShowAddSubtaskInput(true)}>
//                   Add Subtask
//                 </button>
//               )}
//             </div>
//             <input
//               type="date"
//               value={newTaskDueDate}
//               onChange={(e) => setNewTaskDueDate(e.target.value)}
//             />
//             <button onClick={handleSaveTask}>Save Task</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Task = ({ task, onMoveTask }) => {
//   const handleMoveTask = (targetSection) => {
//     onMoveTask(task.id, targetSection);
//   };

//   return (
//     <div className="task">
//       <div className="task-header">
//         <span className={`priority-${task.priority}`}>{task.priority}</span>
//         <span>{task.title}</span>
//       </div>
//       <ul className="checklist">
//         {task.checklist.map((item) => (
//           <li key={item.id}>
//             <input type="checkbox" checked={item.completed} onChange={(e)=>setNewSubtaskchecked(e.target.checked)} />
//             <label>{item.task}</label>
//           </li>
//         ))}
//       </ul>
//       <span>Due Date: {task.dueDate}</span>
//       <div className="task-actions">
//         <button onClick={() => handleMoveTask("backlog")}>Backlog</button>
//         <button onClick={() => handleMoveTask("todo")}>To-Do</button>
//         <button onClick={() => handleMoveTask("progress")}>Progress</button>
//         <button onClick={() => handleMoveTask("done")}>Done</button>
//       </div>
//     </div>
//   );
// };

// export default TaskManager;
