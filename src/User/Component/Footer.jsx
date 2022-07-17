import React from "react";

function Footer() {
  return (
    <div className="h-[500px] w-full hidden sm:flex justify-center bg-green-700">
      <div className="container h-full flex flex-col justify-center items-center">
        <div className="w-full h-5/6 bg-slate-400 px-24 py-16">
          <div className="h-full w-full bg-white flex"></div>
        </div>
        <div className="w-full h-1/6 bg-gray-600"></div>
      </div>
    </div>
  );
}

export default Footer;
