import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./DropdownProfile";
import Button from "./Button";
import searchIcon from "../../Assets/search-icon.png";
import logo from "../../Assets/logo.png";
import cartNavbar from "../../Assets/cart-navbar.png";
import notifNavbar from "../../Assets/notif-navbar.png";
import Cookies from "js-cookie";
import { ChevronLeftIcon } from "@heroicons/react/outline";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, isLogin, verified, email } = useSelector(
    (state) => state.user
  );
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="bg-white w-full h-20 hidden sm:flex justify-center items-center fixed z-50 shadow-custom-lg">
      {dropdown && <Dropdown dropdown={dropdown} setDropdown={setDropdown} />}
      <div className="container h-full flex justify-between items-center px-5 sm:px-10 lg:px-20 gap-x-2 lg:gap-x-16">
        <div className="w-5/6 h-11 flex items-center gap-x-9">
          <button
            className="hidden lg:block btn-plain object-cover w-44"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" className="w-full" />
          </button>
          <div className="w-full h-full relative outline outline-neutral-gray outline-1 rounded-lg overflow-hidden flex">
            <input
              type="text"
              placeholder="Cari Obat, Suplemen, Vitamin, Produk Kesehatan"
              className="w-full h-full px-2 lg:px-5 focus:outline-none placeholder:text-sm lg:placeholder:text-base"
            />
            <button className="btn-plain h-full aspect-square flex items-center justify-center">
              <img src={searchIcon} alt="" className="h-6" />
            </button>
          </div>
        </div>
        {isLogin ? (
          <ul className="w-1/6 h-11 flex gap-x-2 lg:gap-x-6">
            <li className="w-full h-full flex items-center justify-center">
              <button
                className="btn-plain h-8 aspect-square border border-white hover:bg-white"
                onClick={() => navigate("/cart")}
              >
                <img src={cartNavbar} alt="" className="h-8" />
              </button>
            </li>
            <li className="w-full h-full hidden lg:flex items-center justify-center">
              <button
                tabIndex="0"
                className="btn-plain h-8 aspect-square border border-white hover:bg-white"
                onClick={() => {}}
              >
                <img src={notifNavbar} alt="" className="h-8" />
              </button>
            </li>
            <li className="hidden lg:block w-full h-full dropdown dropdown-end">
              <button
                className="btn-plain h-11"
                // onClick={() => setDropdown(true)}
              >
                {username}
              </button>
              <div
                tabIndex="0"
                className="menu dropdown-content p-2 shadow bg-white rounded-box w-52 mt-4 z-60 flex-col gap-y-2"
              >
                <button
                  className="btn-plain border border-primary px-5 py-2 flex items-center justify-center hover:bg-primary hover:text-white rounded-lg duration-300"
                  onClick={() => {
                    setDropdown(false);
                    navigate("/myaccount/profile");
                  }}
                >
                  My Account
                </button>
                <button
                  className="btn-plain border border-red-700 px-5 py-2 flex items-center justify-center hover:bg-red-700 hover:text-white rounded-lg duration-300"
                  onClick={() => {
                    setDropdown(false);
                    Cookies.remove("token");
                    dispatch({ type: "LOGOUT" });
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="w-1/6 h-11 flex gap-x-6">
            <li className="w-1/2 h-full">
              <Button
                type="button"
                buttonContent="Masuk"
                className="button-outline h-full w-full text-xs"
                onClick={() => navigate("/login")}
              />
            </li>
            <li className="w-1/2 h-full">
              <Button
                type="button"
                buttonContent="Daftar"
                className="button-primary h-full w-full text-xs"
                onClick={() => navigate("/register")}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
