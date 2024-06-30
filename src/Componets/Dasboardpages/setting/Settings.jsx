import React, { useEffect, useState } from 'react'
import  Style from "./setting.module.css"
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import namelogo from "../../../assets/namelogo.svg";
import { url } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';

function Settings() {

  const [email,setEmail]=useState("")
  const [name,setName]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
  const [toggleVisibility,setToggleVisibility]=useState(false)
  const [toggleVisibility2,setToggleVisibility2]=useState(false)

  useEffect(()=>{
    const id2=localStorage.getItem("id")
    const fetchDetails=async()=>{
      const result=await fetch(`${url}/getDetails/${id2}`,{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
      })
      const response=await result.json()
      if(response.data){
        setName(response.data.name)
        setEmail(response.data.email)
      }
    }

    fetchDetails()
  },[])


  const handleupdate=async()=>{
    const id=localStorage.getItem("id")
    const data={
      name:name,
      email:email,
      password:password,
      newPassword:newPassword,
      id:id
    }
     const result=await fetch(`${url}/updateProfile`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
     })

     const response=await result.json()
     if(response.message){
      localStorage.clear()
      navigate("/")
     }
     console.log(response)
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             
            </div>
            {/* {errors.email && <p className="error">{errors.email}</p>} */}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type={toggleVisibility?'text':'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <img src={view} alt="" onClick={()=>setToggleVisibility(!toggleVisibility)}  />
              </span>
  
            </div>
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type={toggleVisibility2?'text':'password'}
                placeholder="Confirm Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span>
                <img src={view} alt=""   onClick={()=>setToggleVisibility2(!toggleVisibility2)}/>
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