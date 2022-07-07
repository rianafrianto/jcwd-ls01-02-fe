import React from "react";

function CardCart() {
  return (
    <div className="h-47 w-full border border-green-900 flex gap-x-6">
      <input type="checkbox" />
      <div className="h-32 aspect-square border border-black">image</div>
      <div className="flex-col w-full">
        <div className="h-2/4 w-full border border-black flex justify-between">
          <div className="w-40">Nama Obat</div>
          <div className="w-40">Harga</div>
        </div>
        <div className="h-2/4 w-full border border-black flex px-10">
          <div className="text-xs w-48 h-full flex pt-5">
            Pindahkan ke Wishlist
          </div>
          <div className="w-full flex">
            <button className="">delete</button>
            <div className="flex justify-center w-full">
              <button className="w-8 h-6 mt-5 bg-gray-100 text-teal-500">
                -
              </button>
              <div className="w-8 h-6 mt-5 text-center bg-gray-100">1</div>
              <button className="w-8 h-6 mt-5 bg-gray-100">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
