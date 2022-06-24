import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../Admin/pages/Dashboard";
import Login from "../Admin/pages/Login";
import Orders from "../Admin/pages/Orders";
import Products from "../Admin/pages/Products";
import Report from "../Admin/pages/Report";
import Sales from "../Admin/pages/Sales";
import LeftbarAdmin from "../Admin/components/Leftbar";
import NavbarAdmin from "../Admin/components/Navbar";

function Admin() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ? null : <NavbarAdmin />}
      {location.pathname === "/login" ? null : <LeftbarAdmin />}
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="orders/:status" element={<Orders />} />
        <Route path="report" element={<Report />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
    </>
  );
}

export default Admin;
