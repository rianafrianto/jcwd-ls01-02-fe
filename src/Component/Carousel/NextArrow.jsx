import React from "react";
import rArrow from "../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="h-10 aspect-square rounded-full shadow-xl absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white z-10 hover:bg-white flex justify-center items-center"
      onClick={onClick}
    >
      <img src={rArrow} alt="" className="h-8" />
    </button>
  );
}

export default NextArrow;
