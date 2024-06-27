import React, { useEffect, useState } from "react";
import Style from "./Board.module.css";
import collapse from "../../../assets/collapse.svg";
import add from "../../../assets/add.svg";
import dots from "../../../assets/dots.svg";
import Arrow1 from "../../../assets/Arrow1.svg";
import Arrow2 from "../../../assets/Arrow2.svg";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchdata, updateTaskStatus, url } from "../../../redux/action";
function Board() {


  const [name,setName]=useState("")
  const [id,setId]=useState("")

  const [optionsDropdownid, setOptionsDropdownId] = useState(null);

  useEffect(()=>{
    const name=localStorage.getItem('name')
    setName(name)
    const id=localStorage.getItem("id")
    setId(id)
  },[])


  const [openDropdownId, setOpenDropdownId] = useState(null);


  const dispatch= useDispatch()
  const tasks = useSelector((state)=>state.tasks)

  useEffect(() => {
    dispatch(fetchdata(id));
  }, [dispatch]); 
  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      console.log("id",id)
    } else {
      setOpenDropdownId(id);
    }
  };
  const toggleoptionsDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id)); 
  };
  const toggleOptionsDropdown = (id) => {
    setOptionsDropdownId((prevId) => (prevId === id ? null : id)); 
  };
 
  const moveTask = (taskId, newStatus) => {
    console.log("Passing Id: ",taskId)
    dispatch(updateTaskStatus(taskId, newStatus));
    console.log(taskId,newStatus)
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

  const [checked,setChecked]=useState()
  const [taskId,setTaskid]=useState("")
  const [itemId,setchecklistid]=useState("")
 

  const handleDelete=async(taskid)=>{
    const result=await fetch(`${url}/deleteTask/${id}/${taskid}`,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json"
      }
    })

    const response=await result.json()
    console.log(response)
  }

  const handleShare=async(taskid)=>{
    const result=await fetch(`${url}/generateShareLink/${taskid}`,{
      method:'GET',
      headers:{
        "Content-Type":"application/json"
      }
    })
    const {shareLink}=await result.json()
    await navigator.clipboard.writeText(shareLink)
    console.log("Link copied to clipboard successfully")
  }

  useEffect(()=>{
    const changeTickStatus=async()=>{
      const result=await fetch(`${url}/updateChecklistItem/${taskId}/${itemId}`,{
        method:'PUT',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({checked})
      })
      const response=await result.json()
      console.log(response)
    }

    changeTickStatus()
  },[checked])

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <h1>welcome {name}</h1>

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
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img onClick={()=>toggleOptionsDropdown(ele._id)} src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                  <div className={Style.optionsDropdown}>
                    <button>Edit</button>
                    <button onClick={()=>handleDelete(ele._id)}>Delete</button>
                    <button onClick={()=>handleShare(ele._id)}>Share</button>
                  </div>
                )}
 
                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownId === ele._id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele._id &&
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
                      <button onClick={()=>moveTask(ele._id,"inProgress")} >PROGRESS</button>
                      <button onClick={()=>moveTask(ele._id,"TO-DO")} >TODO</button>
                      <button onClick={()=>moveTask(ele._id,"done")} >DONE</button>
                    </div>
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
              <img onClick={openModal} src={add} alt="" />
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} />
              <img src={collapse} alt="" />
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
                    <p>{ele.priority}</p>
                    <img onClick={()=>toggleOptionsDropdown(ele._id)} src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                  <div className={Style.optionsDropdown}>
                    <button>Edit</button>
                    <button onClick={()=>handleDelete(ele._id)}>Delete</button>
                    <button>Share</button>
                  </div>
                )}
                   

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownId === ele._id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele._id &&
                      ele.checklist.map((item) => (
                        <div key={item._id} className={Style.dropdown}>
                          <input type="checkbox" onChange={(e)=>{
                            setChecked(e.target.checked)
                            setTaskid(ele._id)
                            setchecklistid(item._id)
                          }} />
                          <h3>{item.task}</h3>
                        </div>
                      ))}
                  </div>
                  <div className={Style.divbuttons}>
                    <div className={Style.date}>date</div>
                    <div className={Style.btns}>
                      <button onClick={()=> moveTask(ele._id,"inProgress")}>PROGRESS</button>
                      <button onClick={()=>moveTask(ele._id,"BACKLOG")}>BACKLOG</button>
                      <button onClick={()=> moveTask(ele._id,"done")}>DONE</button>
                    </div>
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
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img onClick={()=>toggleOptionsDropdown(ele._id)} src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>
                  {
                   optionsDropdownid===ele._id && (
                      <div>
                            <button>Edit</button>
                            <button onClick={()=>handleDelete(ele._id)}>Delete</button>
                      <button>Share</button>
                      </div>
                    )
                  }

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownId === ele._id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele._id &&
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
                  
                      <button onClick={()=>moveTask(ele._id,"TO-DO")} >TODO</button>
                      <button onClick={()=>moveTask(ele._id,"BACKLOG")} >BACKLOG</button>
                      <button onClick={()=>moveTask(ele._id,"done")} >DONE</button>
                    </div>
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
            {doneTasks.map((ele) => {
              const completedCount = ele.checklist.filter(
                (item) => item.completed
              ).length;
              return (
                <div key={ele._id} className={Style.todos}>
                  <div>
                    <p>{ele.priority}</p>
                    <img onClick={()=>toggleOptionsDropdown(ele._id)} src={dots} alt="" />
                  </div>
                  <h2>{ele.title}</h2>
                  {optionsDropdownid === ele._id && (
                  <div className={Style.optionsDropdown}>
                    <button>Edit</button>
                    <button onClick={()=>handleDelete(ele._id)}>Delete</button>
                    <button>Share</button>
                  </div>
                )}

                  <div>
                    <h3>
                      Checklist (<span>{completedCount}</span>/{" "}
                      <span>{ele.checklist.length}</span>)
                    </h3>
                    <img
                      onClick={() => toggleDropdown(ele._id)}
                      src={openDropdownId === ele._id ? Arrow1 : Arrow2}
                      alt=""
                    />
                  </div>
                  <div className={Style.dropdowndiv}>
                    {openDropdownId === ele._id &&
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
                      <button onClick={()=>moveTask(ele._id,"TO-DO")} >TO-DO</button>
                      <button onClick={()=>moveTask(ele._id,"inProgress")} >IN PROGRESS</button>
                      <button onClick={()=>moveTask(ele._id,"BACKLOG")} >BACKLOG</button>
                      
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