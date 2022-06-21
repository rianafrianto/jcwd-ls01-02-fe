import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Dropdown({ dropdown, setDropdown }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="h-full w-screen top-0 absolute "
      onClick={(e) => {
        setDropdown(false);
        console.log("bg close");
      }}
    >
      <div
        className=" bg-white flex flex-col p-2 absolute top-20 right-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="border border-red-700 px-5 py-2 flex items-center justify-center hover:bg-red-700"
          onClick={() => {
            setDropdown(false);
            navigate("/myaccount");
          }}
        >
          My Account
        </button>
        <button
          className="border border-red-700 px-5 py-2 flex items-center justify-center hover:bg-red-700"
          onClick={() => {
            setDropdown(false);
            dispatch({ type: "LOGOUT" });
            localStorage.removeItem("user");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
