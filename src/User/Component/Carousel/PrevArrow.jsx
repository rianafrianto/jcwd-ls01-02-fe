import React from "react";
import lArrow from "../../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick, height, scroll, setScroll, setFirstScroll } = props;
  return (
    <button
      className={`button-general rounded-full h-10 aspect-square absolute z-10 -left-4 translate-x-20 opacity-0 border shadow-custom bg-white group-hover:translate-x-0 group-hover:opacity-100 hover:shadow-primary/50 ${height}`}
      onClick={() => {
        if (scroll) {
          setScroll((prev) => prev - 1);
          scroll === 2 && setFirstScroll(true);
          return onClick();
        }
        onClick();
      }}
    >
      <img src={lArrow} alt="" className="h-8" />
    </button>
  );
}

export default PrevArrow;
