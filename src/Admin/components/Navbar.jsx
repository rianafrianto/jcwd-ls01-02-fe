import React from "react";
import notifAdmin from "../../Assets/notification-admin.png";
import profileIcon from "../../Assets/profile-icon.png";

function Navbar() {
  return (
    <div className="bg-white flex w-screen h-16 justify-end fixed top-0 z-10 items-center pr-12 gap-x-8 shadow-lg shadow-black/20">
      <button className="h-6 object-cover">
        <img src={notifAdmin} alt="" className="h-full" />
      </button>
      <button className="h-6 object-cover">
        <img src={profileIcon} alt="" className="h-full" />
      </button>
    </div>
  );
}

export default Navbar;
