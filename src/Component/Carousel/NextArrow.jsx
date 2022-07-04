import React from "react";
import rArrow from "../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick, height } = props;
  return (
    <button
      className={`button-general rounded-full outline-0 h-10 aspect-square absolute z-10 -right-4 shadow-lg bg-white ${height}`}
      onClick={onClick}
    >
      <img src={rArrow} alt="" className="h-8" />
    </button>
  );
}

export default NextArrow;
