import { SiderBar } from "componnents/common";
import * as React from "react";
import Header from "../common/Header";
import DashBoard from "../../features/dashbord";
import Student from "features/student";
import { Route, Routes } from "react-router-dom";
// t đang cài theo phiên bản 4.10.1 như video , vừa xem bản mới thấy nó viết khac
// kệ n đi, cứ cái mới mà vã, xong t vào xem
export function AdminLayout() {
  return (
    <div className="admin">
      <div className="header">
        <Header></Header>
      </div>

      <div className="main">
        <div className="sider-bar">
          <SiderBar></SiderBar>
        </div>
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<DashBoard />}></Route>
            <Route path="/student/*" element={<Student />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
