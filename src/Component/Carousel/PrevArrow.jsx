import React from "react";
import lArrow from "../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="btn btn-circle h-10 aspect-square absolute z-10 top-1/3 -left-5 shadow-lg bg-white border-white hover:bg-white hover:border-white"
      onClick={onClick}
    >
      <img src={lArrow} alt="" className="h-8" />
    </button>
  );
}

export default PrevArrow;
