import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Art from "../../../assets/Art.png";
import Back from "../../../assets/Back.png";
import style from "./Login.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";


function Login() {
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
      <div className={style.leftDiv}>
        <div className={style.imagecontainer}>
          <img className={style.backImage} src={Back} alt="" />
          <img className={style.artImage} src={Art} alt="Art" />
        </div>
        <h2>Welcome aboard my friend</h2>
        <p>just a couple of clicks and we start</p>
      </div>

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
             <span><img src={view} alt="view" /></span> </div>
          </div>
        </form>
        <div className={style.btndiv}>
            <button onClick={handleLogin}>Login</button>
            <p>Have no account yet ?</p>
            <button onClick={handlesignup}>signup</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
