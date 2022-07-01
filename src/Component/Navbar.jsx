import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./DropdownProfile";
import Button from "./Button";
import searchIcon from "../Assets/search-icon.png";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, isLogin, verified, email } = useSelector(
    (state) => state.user
  );
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="bg-white w-full h-20 flex justify-center items-center fixed z-10 shadow-lg">
      {dropdown && <Dropdown dropdown={dropdown} setDropdown={setDropdown} />}
      <div className="container h-full flex justify-between items-center px-20 gap-x-6 lg:gap-x-16">
        <div className="w-5/6 h-11 flex items-center gap-x-9">
          <i
            className="hidden lg:block w-1/6 h-full border border-neutral-gray border-1 hover:bg-white cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Logo
          </i>
          <div className="w-full h-full relative">
            <input
              type="text"
              placeholder="Cari Obat, Suplemen, Vitamin, Produk Kesehatan"
              className="w-full h-full px-5 outline outline-neutral-gray outline-1 rounded-lg overflow-hidden focus:outline focus:outline-1 focus:outline-primary :"
            />
            <img
              src={searchIcon}
              alt=""
              className="h-6 aspect-square absolute right-6 top-2"
            />
          </div>
        </div>
        {isLogin ? (
          <ul className="w-1/6 h-11 flex gap-x-6">
            <li className="w-full h-full">
              <button
                className="w-full h-11 border border-white hover:bg-white"
                onClick={() => navigate("/cart")}
              >
                Cart
              </button>
            </li>
            <li className="w-full h-full dropdown">
              <button
                tabIndex="0"
                className="w-full h-11 border border-white hover:bg-white"
                onClick={() => {}}
              >
                Notif
              </button>
            </li>
            <li className="hidden lg:block w-full h-full dropdown dropdown-end">
              <button
                className="btn rounded-btn btn-ghost border-primary hover:bg-primary"
                // onClick={() => setDropdown(true)}
              >
                {username}
              </button>
              <div
                tabIndex="0"
                className="menu dropdown-content p-2 shadow bg-white rounded-box w-52 mt-4 z-60 flex-col gap-y-2"
              >
                <button
                  className="border border-primary px-5 py-2 flex items-center justify-center hover:bg-primary rounded-lg duration-300"
                  onClick={() => {
                    setDropdown(false);
                    navigate("/myaccount");
                  }}
                >
                  My Account
                </button>
                <button
                  className="border border-red-700 px-5 py-2 flex items-center justify-center hover:bg-red-700 rounded-lg duration-300"
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
                className="button-outline w-full text-xs"
                onClick={() => navigate("/login")}
              />
            </li>
            <li className="w-1/2 h-full">
              <Button
                type="button"
                buttonContent="Daftar"
                className="button-primary w-full text-xs"
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
