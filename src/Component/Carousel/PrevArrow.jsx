import React from "react";
import lArrow from "../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick, height } = props;
  return (
    <button
      className={`translate-x-20 opacity-0  group-hover:translate-x-0 border shadow-black/20 group-hover:opacity-100 button-general rounded-full outline-0 h-10 aspect-square absolute z-10 -left-4 shadow-lg bg-white ${height}`}
      onClick={onClick}
    >
      <img src={lArrow} alt="" className="h-8" />
    </button>
  );
}

export default PrevArrow;
