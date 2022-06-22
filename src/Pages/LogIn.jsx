import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const loginFunction = async () => {
    try {
      let res = { username };
      console.log(username);
      dispatch({ type: "LOGIN", payload: res });
      localStorage.setItem("user", res.username);
      toast.success(`Hello, ${res.username}`, {
        theme: "colored",
        position: "top-center",
      });
      setTimeout(() => {
        return navigate(-1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex bg-green-500">
      <div className="w-1/2 h-full border border-black">LOG IN</div>
      <div className="w-1/2 h-full border flex border-black">
        <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-between py-10">
          INPUT CONTAINER
          <button
            className="w-44 border border-green-500 hover:bg-green-500 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            HOME
          </button>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              className="border border-green-500"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <button
            className="w-44 border border-green-500 hover:bg-green-500 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
            onClick={loginFunction}
            disabled={username === ""}
          >
            LOG IN FOR USER
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
