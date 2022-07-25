import React from "react";
import rArrow from "../../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick, height, setFirstScroll, scroll, setScroll } = props;
  return (
    <button
      className={`button-general rounded-full h-10 aspect-square absolute z-10 -right-4 -translate-x-20 opacity-0 border shadow-custom bg-white group-hover:translate-x-0 group-hover:opacity-100 hover:shadow-primary/50 ${height}`}
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
