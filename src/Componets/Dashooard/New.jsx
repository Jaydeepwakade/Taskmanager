// import React, { useState } from "react";
// import './New.css'
// // function New() {
// //   const [tasks, setTasks] = useState([
// //     {
// //       id: 1,
// //       title: "Hero section",
// //       priority: "HIGH",
// //       status: "BACKLOG",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 2,
// //       title: "Hero section",
// //       priority: "LOW",
// //       status: "TO-DO",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 3,
// //       title: "Typography change in the First two screens of th...",
// //       priority: "MODERATE",
// //       status: "BACKLOG",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 4,
// //       title: "Hero section",
// //       priority: "LOW",
// //       status: "TO-DO",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 5,
// //       title: "Hero section",
// //       priority: "HIGH",
// //       status: "TO-DO",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 6,
// //       title: "Hero section",
// //       priority: "HIGH",
// //       status: "TO-DO",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //     {
// //       id: 7,
// //       title: "Hero section",
// //       priority: "HIGH",
// //       status: "BACKLOG",
// //       checklist: [
// //         { id: 1, task: "Task to be done", completed: false },
// //         { id: 2, task: "Task to be done", completed: false },
// //         {
// //           id: 3,
// //           task: "Task to be done ede lorem Ipsum is a Dummy text t",
// //           completed: false,
// //         },
// //       ],
// //     },
// //   ]);

// //   const handleStatusChange = (taskId, newStatus) => {
// //     setTasks((prevTasks) =>
// //       prevTasks.map((task) =>
// //         task.id === taskId ? { ...task, status: newStatus } : task
// //       )
// //     );
// //   };

// //   const handleChecklistChange = (taskId, checklistItemId, completed) => {
// //     setTasks((prevTasks) =>
// //       prevTasks.map((task) =>
// //         task.id === taskId
// //           ? {
// //               ...task,
// //               checklist: task.checklist.map((item) =>
// //                 item.id === checklistItemId ? { ...item, completed } : item
// //               ),
// //             }
// //           : task
// //       )
// //     );
// //   };

// //   return (
// //     <div className="app-container">
// //       <div className="sidebar">
// //         <div className="sidebar-header">
// //           <div className="logo">
// //             <img src="https://via.placeholder.com/50" alt="Logo" />
// //           </div>
// //           <h2>Pro Manage</h2>
// //         </div>
// //         <ul className="sidebar-nav">
// //           <li>
// //             <a href="#">
// //               <i className="fas fa-clipboard-list"></i> Board
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#">
// //               <i className="fas fa-chart-bar"></i> Analytics
// //             </a>
// //           </li>
// //           <li>
// //             <a href="#">
// //               <i className="fas fa-cog"></i> Settings
// //             </a>
// //           </li>
// //         </ul>
// //         <div className="sidebar-footer">
// //           <button className="logout-btn">
// //             <i className="fas fa-sign-out-alt"></i> Log out
// //           </button>
// //         </div>
// //       </div>


// //       <div className="main-content">
// //         <div className="header">
// //           <h1>Welcome! Kumar</h1>
// //           <div className="add-people">
// //             <button className="add-people-btn">
// //               <i className="fas fa-user-plus"></i> Add People
// //             </button>
// //           </div>
// //         </div>


// //         <div className="kanban-board">
// //           {['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'].map((status) => (
// //             <div key={status} className={`kanban-column ${status.toLowerCase()}`}>
// //               <h2>{status.replace('-', ' ')}</h2>
// //               <ul className="task-list">
// //                 {tasks.filter((task) => task.status === status).map((task) => (
// //                   <li key={task.id}>
// //                     <div className="task-card">
// //                       <div className="task-header">
// //                         <span className={`priority-${task.priority}`}>
// //                           {task.priority}
// //                         </span>
// //                         <span className="title">{task.title}</span>
// //                         <i className="fas fa-ellipsis-v"></i>
// //                       </div>
// //                       <div className="checklist">
// //                         <p>
// //                           Checklist (
// //                           {
// //                             task.checklist.filter((item) => item.completed)
// //                               .length
// //                           }
// //                           /{task.checklist.length})
// //                         </p>
// //                         {task.checklist.map((item) => (
// //                           <div key={item.id} className="checklist-item">
// //                             <input
// //                               type="checkbox"
// //                               checked={item.completed}
// //                               onChange={() =>
// //                                 handleChecklistChange(
// //                                   task.id,
// //                                   item.id,
// //                                   !item.completed
// //                                 )
// //                               }
// //                             />
// //                             <label>{item.task}</label>
// //                           </div>
// //                         ))}
// //                       </div>
// //                       <div className="task-actions">
// //                         {['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'].map((s) => (
// //                           s !== task.status && (
// //                             <button
// //                               key={s}
// //                               className={`btn-${s.toLowerCase()}`}
// //                               onClick={() => handleStatusChange(task.id, s)}
// //                             >
// //                               {s.replace('-', ' ')}
// //                             </button>
// //                           )
// //                         ))}
// //                       </div>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <div className="link-copied">
// //         <button className="link-copied-btn">Link Copied</button>
// //         <div className="dropdown">
// //           <button className="dropdown-btn">This week</button>
// //           <div className="dropdown-content">
// //             <a href="#">Today</a>
// //             <a href="#">This Week</a>
// //             <a href="#">This Month</a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default New;

// function New(){
//   return(
//     <div class="container">
//     <div class="box"></div>
//     <div class="box"></div>
//     <div class="box"></div>
//     <div class="box"></div>
//   </div>
//   )
// }

// export default New