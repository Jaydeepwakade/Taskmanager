import React, { useState } from "react";
import { useNavigate,Outlet } from "react-router-dom";

import style from "./Login.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";


function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [passwordVisible,setPasswordVisible]=useState(false)
  const navigate = useNavigate();
  const [user, setuser] = useState(true);
  const handleLogin = async() => {
    // user ? navigate("/dashboard") : "";
    const data={
      email:email,
      password:password
    }
    const response=await fetch('http://192.168.0.105:3100/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

    const result=await response.json()

    if(result.message){
      localStorage.setItem("token",result.data)
      console.log("Logged in")
      setEmail("")
      setPassword("")
      navigate("/dashboard2")
    }
  };
  const handlesignup = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility=()=>{
    setPasswordVisible(!passwordVisible)
  }

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
              <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className={style.inputDiv}>
              <span>
                <img src={Group} alt="lock" />
              </span>
              <input placeholder="Password" type={passwordVisible?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
             <span onClick={togglePasswordVisibility}><img src={view} alt="view" /></span> 
             </div>
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
