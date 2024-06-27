import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Componets/Login_&_Signup/Login/Login";
import Dashboard from "./Componets/Dashooard/Dashboard";
import Board from "./Componets/Dasboardpages/board/Board";
import Anylactics from "./Componets/Dasboardpages/anylacticspage/Anylactics";
import Settings from "./Componets/Dasboardpages/setting/Settings"
import Signup from "./Componets/Login_&_Signup/Signup/Signup";
import LoginHome from "./Componets/Login_&_Signup/LoginHome/LoginHome";
import Task from "./Componets/SharedTask/Task";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginHome/>} >
      <Route index element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      </Route>
      <Route path="/task/:taskid/readonly" element={<Task/>}/>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Board />} />
        {/* <Route path="/tasks/:taskId" element={<Task/>} /> */}
        <Route path="anylactics" element={<Anylactics/>} />
        <Route path="setting" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
