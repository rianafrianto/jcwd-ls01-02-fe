import React from "react";

function CardCart() {
  return (
    <div className="h-47 w-full border border-green-900 flex gap-x-6">
      <div className="mx-4 h-32 aspect-square border border-black">image</div>
      <div className="h-full w-full border border-black flex flex-col justify-between">
        <div>keterangan</div>
        <div>Sub Total</div>
      </div>
    </div>
  );
}

export default CardCart;
