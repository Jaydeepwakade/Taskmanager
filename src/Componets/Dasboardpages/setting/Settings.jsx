import React from 'react'
import  Style from "./setting.module.css"
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import namelogo from "../../../assets/namelogo.svg";

function Settings() {

  const handleupdate=()=>{
     alert("ho gaya update ja abh")
  }
  return (
    
      <div className={Style.container}>

      <div className={Style.loginDiv}>
        <h1>settings</h1>
        <form action="">
          <div className={Style.mainDiv}>
            <div className={Style.inputDiv}>
              <span>
                <img src={namelogo} alt="name" />
              </span>
              <input
                type="text"
                placeholder="Name"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
             
            </div>
            {/* {errors.name && <p className={Style.signupform}>{errors.name}</p>} */}
            <div className={Style.inputDiv}>
              <span>
                <img src={icon} alt="icon" />
              </span>
              <input
                type="email"
                placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
             
            </div>
            {/* {errors.email && <p className="error">{errors.email}</p>} */}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <img src={view} alt="" />
              </span>
  
            </div>
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span>
                <img src={view} alt="" />
              </span>

             
            </div>
            {/* {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )} */}
          </div>
        </form>

        <div className={Style.btndiv}>
        <button onClick={handleupdate}>UPDATE</button>
          
          </div>
      </div>
    </div>
   
  )
}

export default Settings