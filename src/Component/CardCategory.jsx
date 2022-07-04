import React from "react";
import { useNavigate } from "react-router-dom";

function CardCategory({ className, cardText, cardPic, cardPath }) {
  const navigate = useNavigate();
  return (
    <div
      className={`h-28 button-general outline-0 bg-white shadow-md hover:shadow-primary/50 my-5 flex flex-col justify-center items-center rounded-2xl text-secondary font-bold cursor-pointer duration-300 ${className}`}
      onClick={() => navigate(`/category/${cardPath}`)}
    >
      <img src={cardPic} alt="" className="h-16 aspect-square" />
      {cardText}
    </div>
  );
}

export default CardCategory;
