import React from "react";
import { useNavigate } from "react-router-dom";

function CardCategory({
  className,
  cardText,
  cardPic,
  cardPath,
  cardStyle,
  imageStyle,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`${cardStyle} button-general border bg-white shadow-custom hover:shadow-primary/50 flex flex-col justify-center items-center rounded-2xl text-secondary font-bold cursor-pointer duration-300 ${className}`}
      onClick={() => navigate(`/category/${cardPath}`)}
    >
      <img src={cardPic} alt="" className={`${imageStyle} aspect-square`} />
      {cardText}
    </div>
  );
}

export default CardCategory;
