import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../redux/action";
import style from "./sharetask.module.css"
function Task(){
    const {taskid}=useParams()
    const [task,setTask]=useState([])
    const chekedcount = task.checklist ? task.checklist.filter(item=>item.completed).length:0
    const totalCount = task.checklist ? task.checklist.length : 0;
    useEffect(()=>{
        const fetchTask=async()=>{
            const result=await fetch(`${url}/fetchTaskById/${taskid}`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            })
       
            const response=await result.json()
            setTask(response.data)
            console.log(response)
    }

    fetchTask()
},[taskid]);




    return(
        <div className={style.container}>
      <div className={style.maindiv}>
      <p>{task.priority}</p>
       <h2>{task.title}</h2>
       <p>checklist({chekedcount}/{totalCount})`</p>
      </div>
        </div>
    )
}

export default Task