// Toast.js
import React, { useEffect } from 'react';
import style from "./toast.module.css"

const Toast = ({ message, show, duration, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className={style.toast}>
    <h4>{message}</h4>
    </div>
  );
};

export default Toast;
