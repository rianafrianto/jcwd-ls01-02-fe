import React from "react";
import { useNavigate } from "react-router-dom";

function Card() {
  const navigate = useNavigate();
  return (
    <div
      className="h-60 lg:h-80 w-full border border-green-600 hover:bg-green-600 cursor-pointer"
      onClick={() => navigate("/products/obat/1")}
    >
      Card
    </div>
  );
}

export default Card;
