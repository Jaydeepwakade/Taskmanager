import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import layout from "../../assets/layout.svg";
import database from "../../assets/database.svg";
import settings from "../../assets/settings.svg";
import sandbox from "../../assets/sandbox.svg";
import Logout from "../../assets/Logout.svg";
import ConfirmationModal from "../usepopup/Confarmation";

function Navbar() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleLogout = () => {
        setShowPopup(true); 
    };

    const confirmLogout = () => {
        localStorage.clear()
        navigate("/"); 
    };

    const cancelLogout = () => {
        setShowPopup(false);
        
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.header}>
                <span><img src={sandbox} alt="sandbox" /></span>
                <h3>ProManager</h3>
            </div>
            <div className={styles.NavDiv}>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.activeNav : styles.navlink
                        }
                        to=""
                        end
                    >
                        <span>
                            <img src={layout} alt="" />
                        </span>{" "}
                        <p>Board</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? styles.activeNav : styles.navlink}`
                        }
                        to="anylactics"
                    >
                        <span>
                            {" "}
                            <img src={database} alt="" />
                        </span>
                        <p> Anyalitics</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? styles.activeNav : styles.navlink}`
                        }
                        to="setting"
                    >
                        <span>
                            {" "}
                            <img src={settings} alt="" />
                        </span>{" "}
                        <p>Setting</p>
                    </NavLink>
                </li>
            </div>
            <button className={styles.btn} onClick={handleLogout}>
                <img src={Logout} alt="" /> <h2>Logout</h2>
            </button>
           
            <ConfirmationModal
             isOpen={showPopup}
             message="Are you sure you want to logout?"
             onClose={cancelLogout}
             buttontxt={"Yes, Logout"}
             onConfirm={confirmLogout}
             />
        </div>
    );
}

export default Navbar;

