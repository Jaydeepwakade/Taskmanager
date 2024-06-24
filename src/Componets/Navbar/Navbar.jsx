import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <h1>ProManage</h1>
      <NavLink to="" >Board</NavLink>
      <NavLink to="anylactics" >Anylactics</NavLink>
      <NavLink to="setting" >Settings</NavLink>
      <button className={styles.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;

