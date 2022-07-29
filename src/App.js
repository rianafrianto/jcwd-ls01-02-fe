import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignUp from "./User/Pages/SignUp";
import LogIn from "./User/Pages/LogIn";
import Home from "./User/Pages/Home";
import Category from "./User/Pages/Category";
import ProductDetail from "./User/Pages/ProductDetail";
import Checkout from "./User/Pages/Checkout";
import Address from "./User/Pages/Address";
import Cart from "./User/Pages/Cart";
import Prescription from "./User/Pages/Prescription";
import Profile from "./User/Pages/Profile";
import Navbar from "./User/Component/Navbar";
import Footer from "./User/Component/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verification from "./User/Pages/Verification";
import ResetPassword from "./User/Pages/ResetPassword";
import Admin from "./User/Pages/Admin";
import Unverified from "./User/Pages/Unverified";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import gradientBg from "./Assets/gradient-bg.png";
import NavbarMobile from "./User/Component/NavbarMobile";
import Order from "./User/Pages/Order";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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
  useEffect(() => {
    if (
      location.pathname === "/myaccount" ||
      location.pathname === "/myaccount/"
    ) {
      navigate("/myaccount/profile");
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* <div className="fixed">
        <img src={gradientBg} />{" "}
      </div> */}

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
        <Route path="/category/:category" element={<Category />} />
        <Route
          path="/category/:category/:product_name"
          element={<ProductDetail />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/myaccount/:tab" element={<Profile />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/unverified" element={<Unverified />} />
        {/* <Route path="/search/:category" element={<Search />} /> */}
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
    </div>
  );
}

export default App;
