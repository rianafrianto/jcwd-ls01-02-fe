import React from "react";
import lArrow from "../../../Assets/l-arrow.png";

function PrevArrow(props) {
  const { onClick, height, scroll, setScroll, setFirstScroll } = props;
  return (
    <button
      className={`${height} translate-x-20 opacity-0  group-hover:translate-x-0 border group-hover:opacity-100 button-general rounded-full outline-0 h-10 aspect-square absolute z-10 -left-4 shadow-custom hover:shadow-primary/50 bg-white`}
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
