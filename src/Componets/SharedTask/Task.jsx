import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Task(){
    const {taskid}=useParams()
    const [task,setTask]=useState([])
    useEffect(()=>{
        const fetchTask=async()=>{
            const result=await fetch(`http://192.168.0.105:3200/fetchTaskById/${taskid}`,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const response=await result.json()
            console.log(response)
    }

    fetchTask()
},[])
    return(
        <div>
            <button>Done</button>
        </div>
    )
}

export default Task