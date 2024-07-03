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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      const newErrors = {};
      if (!email) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Set loading to true when login process starts

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      setLoading(false); // Set loading to false when login process ends

      if (result.message) {
        setErrors({});
        localStorage.setItem("token", result.data);
        localStorage.setItem("id", result.id);
        localStorage.setItem("name", result.name);
        displayToast("Logged in successfully");
        setEmail("");
        setPassword("");

        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        // Handle login failure here, show toast or set errors accordingly
        displayToast("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoading(false);
      displayToast("An error occurred. Please try again.");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={style.container}>
      <div className={style.loginDiv}>
        <div className={style.toast}>
          <Toast
            message={toastMessage}
            show={showToast}
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        </div>
        <h2>Login</h2>
        <form>
          <div className={style.mainDiv}>
            <div className={`${style.inputDiv} ${errors.email && style.errorBorder}`}>
              <span className={style.spanimg}>
                <img src={icon} alt="icon" />
              </span>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? style.error : ""}
              />
            </div>
            {errors.email && <p className={style.error}>{errors.email}</p>}
            <div className={`${style.inputDiv} ${errors.password && style.errorBorder}`}>
              <span className={style.spanimg}>
                <img src={Group} alt="lock" />
              </span>
              <input
                placeholder="Password"
                type={hideview ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? style.error : ""}
              />
              <span onClick={() => sethideview(!hideview)}>
                {!hideview ? <img src={view} alt="view" /> : <img src={Vector} alt="view" />}
              </span>
            </div>
            {errors.password && <p className={style.error}>{errors.password}</p>}
          </div>
        </form>
        <div className={style.btndiv}>
          <button className={style.loginbtn} onClick={handleLogin} disabled={loading}>
            {loading ? (
              <div className={style.loader}></div> // Add loader here
            ) : (
              "Log in"
            )}
          </button>
          <p className={style.accounthave}>Have no account yet ?</p>
          <button className={style.regbtn} onClick={handleSignup}>
            Register
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
