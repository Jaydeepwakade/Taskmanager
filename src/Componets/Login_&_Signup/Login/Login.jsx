import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Art from "../../../assets/Art.png";
import Back from "../../../assets/Back.png";
import style from "./Login.module.css";

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
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handlesignup}>signup</button>
      </div>
    </div>
  );
}

export default Login;
