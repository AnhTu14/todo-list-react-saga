import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import cityApi from "api/cityApi";
import { Route, Routes } from "react-router-dom";

import LoginPages from "features/auth/pages/LoginPage";
import { AdminLayout } from "componnents/layout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLayout />}></Route>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route path="/admin/*" element={<AdminLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
