import React from "react";
import rArrow from "../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="btn btn-circle h-10 aspect-square absolute z-10 top-1/3 -right-6 shadow-lg bg-white border-white hover:bg-white hover:border-white"
      onClick={onClick}
    >
      <img src={rArrow} alt="" className="h-8" />
    </button>
  );
}

export default NextArrow;
