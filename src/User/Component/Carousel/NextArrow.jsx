import React from "react";
import rArrow from "../../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick, height, setFirstScroll, scroll, setScroll } = props;
  return (
    <button
      className={`-translate-x-20 opacity-0  group-hover:translate-x-0 border shadow-black/20 group-hover:opacity-100 button-general rounded-full h-10 aspect-square absolute z-10 -right-4 shadow-lg bg-white ${height}`}
      onClick={() => {
        if (scroll) {
          scroll === 1 && setFirstScroll(false);
          setScroll((prev) => prev + 1);
          return onClick();
        }
        return onClick();
      }}
    >
      <img src={rArrow} alt="" className="h-8" />
    </button>
  );
}

export default NextArrow;
