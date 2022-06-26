import React from "react";
import lArrow from "../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="h-10 aspect-square rounded-full shadow-xl absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-10 hover:bg-white flex justify-center items-center"
      onClick={onClick}
    >
      <img src={lArrow} alt="" className="h-8" />
    </button>
  );
}

export default PrevArrow;
