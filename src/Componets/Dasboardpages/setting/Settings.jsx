import React, { useEffect, useState } from "react";
import Style from "./setting.module.css";
import Group from "../../../assets/Group.svg";
import icon from "../../../assets/icon.svg";
import view from "../../../assets/view.svg";
import namelogo from "../../../assets/namelogo.svg";
import { url } from "../../../redux/action";
import { useNavigate } from "react-router-dom";
import Vector from "../../../assets/Vector.svg";
import Toast from "../../toasts/Toast";

function Settings() {
  const [hideview, sethideview] = useState(false);
  const [hideview2, sethideview2] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    const id2 = localStorage.getItem("id");
    const fetchDetails = async () => {
      const result = await fetch(`${url}/getDetails/${id2}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (response.data) {
        setName(response.data.name);
        setEmail(response.data.email);
      }
    };

    fetchDetails();
  }, []);

  const handleupdate = async () => {
    const newErrors = {};
    if (!name || !email) {
      setErrors(newErrors);
      return;
    }
    const id = localStorage.getItem("id");
    const data = {
      name: name,
      email: email,
      password: password,
      newPassword: newPassword,
      id: id,
    };
    const result = await fetch(`${url}/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.message) {
      displayToast("Password changed succesfully")
      localStorage.clear();
      navigate("/");
    } else if (response.errorPass) {
      displayToast("Invalid password")
      newErrors.text = response.errorPass;
      setErrors(newErrors);
      return
    } else if (response.nameChanged) {
      localStorage.setItem("name",response.name)
      displayToast("Profile Details updated successfully")
      
      return
    }else if(response.emailChanged){
      displayToast("Profile Details updated successfully")
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.loginDiv}>
        <Toast
          message={toastMessage}
          show={showToast}
          duration={4000}
          onClose={() => setShowToast(false)}
        />
        <h1 className={Style.heading}>Settings</h1>
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
            {errors.name && <p className="error">{errors.name}</p>}
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
                type={hideview ? "text" : "password"}
                placeholder="Old password"
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
            {errors.password && <p className="error">{errors.password}</p>}
            <div className={Style.inputDiv}>
              <span>
                <img src={Group} alt="icon" />
              </span>
              <input
                type={hideview2 ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span onClick={() => sethideview2(!hideview2)}>
                {!hideview2 ? (
                  <img src={view} alt="view" />
                ) : (
                  <img src={Vector} alt="view" />
                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className="error">{errors.newPassword}</p>
            )}
          </div>
        </form>
        {errors.text && (
          <p className="error">
            {errors.samePass
              ? "Old and new password cannot be same"
              : errors.text}
          </p>
        )}
        <div className={Style.btndiv}>
          <button onClick={handleupdate}>UPDATE</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
