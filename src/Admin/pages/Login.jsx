import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen justify-center flex bg-green-400">
      <div className="container flex">
        <div className="w-1/2 h-full border flex border-red-600">
          <div className="bg-white m-auto h-[650px] w-[580px]">LOGO</div>
        </div>
        <div className="w-1/2 h-full border flex border-red-600">
          <div className="bg-white m-auto border border-red-600 h-[650px] w-[580px]">
            <button className="w-full text-right">Bahasa</button>
            <div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div className="w-full flex justify-center">
                <button
                  className="border border-red-600 bg-green-400"
                  onClick={() => navigate("/")}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
