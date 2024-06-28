import React, { useEffect, useState } from "react";
import { useNavigate,Outlet } from "react-router-dom";

import style from "./Login.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import Vector from "../../../assets/Vector.svg";
import { url } from "../../../redux/action";


function Login() {
   const[hideview ,sethideview] = useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [passwordVisible,setPasswordVisible]=useState(false)
  const navigate = useNavigate();
  const [user, setuser] = useState(true);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(()=>{
    const taskId=localStorage.getItem('token')
    console.log(taskId)
    if(!taskId){
      return
    }else{
      navigate('/dashboard')
    }
  },[])

  const handleLogin = async() => {
    // user ? navigate("/dashboard") : "";
    const data={
      email:email,
      password:password
    }
    const response=await fetch(`${url}/login`,{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

    const result=await response.json()
    console.log(result)
    alert("succes")

    if(result.message){
      localStorage.setItem("token",result.data)
      localStorage.setItem("id",result.id)
      localStorage.setItem("name",result.name)
      console.log("Logged in")
      setEmail("")
      setPassword("")
      navigate("/dashboard")
    }
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
              <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className={style.inputDiv}>
              <span>
                <img src={Group} alt="lock" />
              </span>
              <input placeholder="Password" type={hideview?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
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










//   return (
//     <div className={style.container}>

//       <div className={style.loginDiv}>
//         <h2>Login</h2>
//         <form action="">
//           <div className={style.mainDiv}>
//             <div className={style.inputDiv}>
//               <span>
//                 <img src={icon} alt="icon" />
//               </span>
//               <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//             </div>
//             <div className={style.inputDiv}>
//               <span>
//                 <img src={Group} alt="lock" />
//               </span>
//               
//              
//              </div>
//           </div>
//         </form>
//         <div className={style.btndiv}>
//             <button onClick={handleLogin}>Login</button>
//             <p>Have no account yet ?</p>
//             <button onClick={handlesignup}>signup</button>
//           </div>
//       </div>
//       <Outlet/>
//     </div>
//   );
// }

// export default Login;