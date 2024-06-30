import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import style from "./Login.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import Vector from "../../../assets/Vector.svg";
import { url } from "../../../redux/action";
import Toast from "../../toasts/Toast";

function Login() {
  const [hideview, sethideview] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const showToast = (message) => {
    setShowToast(true);
    setToastMessage(message);
  };

  const [errors, setErrors] = useState({});
  useEffect(() => {
    const taskId = localStorage.getItem("token");
    if (!taskId) {
      return;
    } else {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    if(!email || !password){
      const newErrors = {};
      if (!email) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
      setErrors(newErrors);
      return
    }
    const data = {
      email: email,
      password: password,
    };
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.message) {
      setErrors({});
      localStorage.setItem("token", result.data);
      localStorage.setItem("id", result.id);
      localStorage.setItem("name", result.name);
      setEmail("");
      setPassword("");
      showToast("Logged in successfully");
      navigate("/dashboard");
    }
  };
  const handlesignup = () => {
    navigate("/signup");
  };

  return (
    <div className={style.container}>
      <Toast
        message={toastMessage}
        show={ShowToast}
        duration={3000}
        onClose={() => ShowToast(false)}
      />
      <div className={style.loginDiv}>
        <h2>Login</h2>
        <form action="">
          <div className={style.mainDiv}>
            <div className={style.inputDiv}>
              <span className={style.spanimg}>
                <img src={icon} alt="icon" />
              </span>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className={style.error}>{errors.email}</p>}
            <div className={style.inputDiv}>
              <span className={style.spanimg}>
                <img src={Group} alt="lock" />
              </span>
              <input
                placeholder="Password"
                type={hideview ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => sethideview(!hideview)}>
                {!hideview ? (
                  <img src={view} alt="view" />
                ) : (
                  <img src={Vector} alt="view" />
                )}
              </span>
            </div>
          </div>
          {errors.password && <p className={style.error}>{errors.password}</p>}
        </form>
        <div className={style.btndiv}>
          <button className={style.loginbtn} onClick={handleLogin}>
            Log in
          </button>
          <p>Have no account yet ?</p>
          <button className={style.regbtn} onClick={handlesignup}>
            Register
          </button>
        </div>
      </div>
      <Outlet />
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
