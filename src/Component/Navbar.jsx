import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "./DropdownProfile";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const { username, isLogin, verified, email } = useSelector(
    (state) => state.user
  );
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="bg-white w-full h-20 flex justify-center items-center">
      {dropdown && <Dropdown dropdown={dropdown} setDropdown={setDropdown} />}
      <div className="container h-full flex justify-between items-center px-20 gap-x-6 lg:gap-x-16">
        <div className="w-5/6 h-11 flex items-center gap-x-9">
          <i
            className="hidden lg:block w-1/6 h-full border border-neutral-gray border-1 hover:bg-white cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Logo
          </i>
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Cari Obat, Suplemen, Vitamin, Produk Kesehatan"
              className="w-full h-full px-5 outline outline-neutral-gray outline-1 rounded-lg overflow-hidden focus:outline focus:outline-1 focus:outline-primary :"
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
            <li className="w-full h-full">
              <button
                className="w-full h-11 border border-white hover:bg-white"
                onClick={() => {}}
              >
                Notif
              </button>
            </li>
            <li className="hidden lg:block w-full h-full">
              <button
                className="w-full h-11 border border-white hover:bg-white"
                onClick={() => setDropdown(true)}
              >
                {username}
              </button>
            </li>
          </ul>
        ) : (
          <ul className="w-1/6 h-11 flex gap-x-6">
            <li className="w-1/2 h-full">
              <Button
                type="button"
                buttonContent="Masuk"
                className="outline-primary text-primary text-xs"
                onClick={() => navigate("/login")}
              />
            </li>
            <li className="w-1/2 h-full">
              <Button
                type="button"
                buttonContent="Daftar"
                className="bg-primary text-white text-xs"
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
