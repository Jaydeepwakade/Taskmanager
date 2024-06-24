import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Login_&_Signup/Login/Login";
import Dashboard from "./Componets/Dashooard/Dashboard";
import Board from "./Componets/Dasboardpages/Board";
import Anylactics from "./Componets/Dasboardpages/Anylactics";
import Setting from "./Componets/Dasboardpages/Setting";
import Signup from "./Componets/Login_&_Signup/Signup/Signup";
import LoginHome from "./Componets/Login_&_Signup/LoginHome/LoginHome";
import New from "./Componets/Dashooard/New";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginHome/>} >
      <Route index element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      </Route>
      
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Board />} />
        <Route path="anylactics" element={<Anylactics/>} />
        <Route path="setting" element={<Setting />} />
      </Route>
      <Route path="/dashboard2" element={<New />}>
        <Route index element={<Board />} />
        <Route path="anylactics" element={<Anylactics/>} />
        <Route path="setting" element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default App;
