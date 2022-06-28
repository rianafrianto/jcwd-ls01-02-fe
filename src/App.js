import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";
import Address from "./Pages/Address";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";
import Prescription from "./Pages/Prescription";
import Profile from "./Pages/Profile";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "./Pages/Verification";
import ResetPassword from "./Pages/ResetPassword";

import Admin from "./Pages/Admin";
import Unverified from "./Pages/Unverified";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

function App() {
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.user);
  let noConnectionToast = useRef(null);
  const statusOnline = () => {
    toast.dismiss(noConnectionToast);
    toast.success("You are back online!", {
      theme: "colored",
      style: { backgroundColor: "#009B90" },
    });
  };

  const statusOffline = () => {
    noConnectionToast = toast.error(
      "Where are you? Please check your internet connection!",
      {
        className: "bg-red-500",
        theme: "colored",
        autoClose: false,
        closeButton: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };
  window.addEventListener("offline", statusOffline);
  window.addEventListener("online", statusOnline);
  //
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/unverified" ||
      location.pathname.match("/verification/") ||
      location.pathname.match("/admin") ||
      location.pathname.match("/reset-password/") ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/register" element={isLogin ? <Home /> : <SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route
          path="/products/:category/:product_id"
          element={<ProductDetail />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/myaccount" element={<Profile />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/unverified" element={<Unverified />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Admin */}
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/unverified" ||
      location.pathname.match("/verification/") ||
      location.pathname.match("/admin") ||
      location.pathname.match("/reset-password/") ? null : (
        <Footer />
      )}
      <ToastContainer
        pauseOnFocusLoss={false}
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    </>
  );
}

export default App;
