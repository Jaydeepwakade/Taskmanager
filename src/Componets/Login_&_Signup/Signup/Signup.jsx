import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Style from "./signup.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import namelogo from "../../../assets/namelogo.svg";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible,setPasswordVisible]=useState(false)
  const [confimrPasswordVisible,setConfirmPasswordVisible]=useState(false)
  
  const togglePasswordVisibility=(value)=>{
    if(value==1){
      setPasswordVisible(!passwordVisible)
    }else{
      setConfirmPasswordVisible(!confimrPasswordVisible)
    }
  }

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleLogin = () => {
        navigate("/") 
  };
  const handleSignup = async () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Add your signup logic here
      console.log("Signup clicked", { name, email, password, confirmPassword });
      const user = {
        name: name,
        email: email,
        password: password,
      };
      const response = await fetch("http://192.168.0.105:3100/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.loginDiv}>
        <h1>Register</h1>
        <form action="">
          <div className={Style.mainDiv}>
            <div className={Style.inputDiv}>
              <span>
                <img src={namelogo} alt="name" />
              </span>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
             
            </div>
            {errors.name && <p className={Style.signupform}>{errors.name}</p>}
            <div className={Style.inputDiv}>
              <span>
                <img src={icon} alt="icon" />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type={passwordVisible?'text':'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={()=>togglePasswordVisibility(1)}>
                <img src={view} alt="" />
              </span>
  
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type={confimrPasswordVisible?'text':'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility}>
                <img src={view} alt="" />
              </span>

             
            </div>
            {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
          </div>
        </form>

        <div className={Style.btndiv}>
        <button onClick={handleSignup}>Sign Up</button>
            <p>Have a account ?</p>
       
            
            <button onClick={handleLogin}>Login</button>
          </div>
      </div>
    </div>
  );
}

export default Signup;
