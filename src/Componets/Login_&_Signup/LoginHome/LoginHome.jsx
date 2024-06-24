import React from 'react'
import {Outlet} from "react-router-dom"
import Art from "../../../assets/Art.png";
import Back from "../../../assets/Back.png";
import style from "./loginhome.module.css"

function LoginHome() {
  return (
    <div className={style.container}>
           <div className={style.leftDiv}>
        <div className={style.imagecontainer}>
          <img className={style.backImage} src={Back} alt="" />
          <img className={style.artImage} src={Art} alt="Art" />
        </div>
        <h2>Welcome aboard my friend</h2>
        <p>just a couple of clicks and we start</p>
        </div>
          <div className={style.RightDiv}>
          <Outlet/>
          </div>
    </div>
  )
}

export default LoginHome