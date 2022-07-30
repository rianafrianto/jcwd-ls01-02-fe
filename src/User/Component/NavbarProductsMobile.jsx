import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../Assets/search-icon.png";
import cartNavbar from "../../Assets/cart-navbar.png";
import notifNavbar from "../../Assets/notif-navbar.png";
import Button from "./Button";
import { ChevronLeftIcon } from "@heroicons/react/outline";

function NavbarProductsMobile() {
  const navigate = useNavigate();
  const { username, isLogin, verified, email } = useSelector(
    (state) => state.user
  );
  return (
    <div className="bg-white w-full h-24 md:h-20 flex sm:hidden justify-center items-center fixed z-50 top-0 shadow-custom-lg">
      <div className="container h-full flex justify-between items-end pb-3 md:pb-0 md:items-center px-5 sm:px-10 lg:px-20 gap-x-2 lg:gap-x-16">
        <div className="w-5/6 h-11 flex items-center gap-x-2">
          <button
            className="btn-plain h-10 aspect-square flex"
            onClick={() => navigate("/")}
          >
            <ChevronLeftIcon className="h-full scale-75" />
          </button>
          <div className="w-full h-full relative outline outline-neutral-gray outline-1 rounded-lg overflow-hidden flex">
            <input
              type="text"
              placeholder="Cari Obat dan lainnya"
              className="w-full h-full px-2 lg:px-5 focus:outline-none placeholder:text-sm lg:placeholder:text-base"
            />
            <button className="btn-plain h-full aspect-square flex items-center justify-center">
              <img src={searchIcon} alt="" className="h-4" />
            </button>
          </div>
        </div>
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
        </ul>
      </div>
    </div>
  );
}

export default NavbarProductsMobile;
