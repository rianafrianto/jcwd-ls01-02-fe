import React from "react";
import lArrow from "../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick, height } = props;
  return (
    <button
      className={`button-general rounded-full outline-0 h-10 aspect-square absolute z-10 -left-4 shadow-lg bg-white ${height}`}
      onClick={onClick}
    >
      <img src={lArrow} alt="" className="h-8" />
    </button>
  );
}

export default PrevArrow;
