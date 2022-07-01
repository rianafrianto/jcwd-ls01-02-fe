import React from "react";
import { useNavigate } from "react-router-dom";

function CardCategory({ className, cardText, cardPic, cardPath }) {
  const navigate = useNavigate();
  return (
    <div
      className={`h-28 w-48 hover:border hover:border-primary shadow-xl my-5 flex flex-col justify-center items-center rounded-2xl text-secondary font-bold cursor-pointer duration-300 ${className}`}
      onClick={() => navigate(`/products/${cardPath}`)}
    >
      <img src={cardPic} alt="" className="h-16 aspect-square" />
      {cardText}
    </div>
  );
}

export default CardCategory;
