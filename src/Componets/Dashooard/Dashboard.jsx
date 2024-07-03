import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Anylactics from '../Dasboardpages/anylacticspage/Anylactics'
import style from "./Dasboard.module.css"
import {Outlet} from "react-router-dom"

function Dashboard() {
 
  return (
    <div  className={style.board}>
      <Navbar/>
      <Outlet/>
    </div>
  
  )
}

export default Dashboard