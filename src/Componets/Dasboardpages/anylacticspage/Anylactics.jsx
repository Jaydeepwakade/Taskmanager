import React, { useState } from "react";
import Style from "./anyalis.module.css";
import Ellipse3 from "../../../assets/Ellipse3.svg"


function Anylactics() {
  const [taskcountlist, settaskcountlist] = useState([
    "Backlog Tasks",
    "Low Priority",
    "To-do Tasks",
    "Moderate Priority",
    "in-Progress Tasks",
    "High Priority",
    "Completed tasks",
    "Due Date Tasks",
  ]);
  return (
    <div className={Style.container}>
      <div className={Style.maindiv}>

        {taskcountlist.map((ele)=><div><img src={Ellipse3} alt="" /> {ele}</div>)}
      </div>
    </div>
  );
}

export default Anylactics;
