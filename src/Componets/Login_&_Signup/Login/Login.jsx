import React, { useState } from "react";
import { useNavigate,Outlet } from "react-router-dom";

import style from "./Login.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import Vector from "../../../assets/Vector.svg";


function Login() {
   const[hideview ,sethideview] = useState(false)
  const navigate = useNavigate();
  const [user, setuser] = useState(true);
  const handleLogin = () => {
    user ? navigate("/dashboard") : "";
  };
  const handlesignup = () => {
    navigate("/signup");
  };

  return (
    <div className={style.container}>
   

      <div className={style.loginDiv}>
        <h2>Login</h2>
        <form action="">
          <div className={style.mainDiv}>
            <div className={style.inputDiv}>
              <span>
                <img src={icon} alt="icon" />
              </span>
              <input placeholder="Email" type="email" />
            </div>
            <div className={style.inputDiv}>
              <span>
                <img src={Group} alt="lock" />
              </span>
              <input placeholder="Password" type="password" />
             <span onClick={()=>sethideview(!hideview)}>{!hideview?<img src={view} alt="view" />:<img src={Vector} alt="view" />}</span></div>
          </div>
        </form>
        <div className={style.btndiv}>
            <button onClick={handleLogin}>Login</button>
            <p>Have no account yet ?</p>
            <button onClick={handlesignup}>signup</button>
          </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default Login;
