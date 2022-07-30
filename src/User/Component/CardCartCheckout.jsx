import React from "react";
import API_URL from "../../Helpers/API_URL";
import formatToCurrency from "../../Helpers/formatToCurrency";

function CardCartCheckout(props) {
  const { product_id, init_price, name, photo, price, qty, satuan } =
    props.data;
  return (
    <div className="h-32 w-full flex gap-x-6 mt-4">
      <div className="flex h-full w-full justify-between">
        <figure className="w-1/5 object-cover flex justify-center">
          <img className="aspect-square h-full" src={API_URL + photo} alt="" />
        </figure>
        <div className="w-4/5 flex flex-col">
          <div className="w-full h-2/3 flex">
            <div className="w-1/2 flex flex-col">
              <h3 className="font-semibold text-secondary">{name}</h3>
              <h4>
                {qty} {satuan}
              </h4>
            </div>
            <div className="w-1/2 flex justify-end gap-x-5 px-5">
              <h3 className="text-neutral-gray line-through">
                {formatToCurrency(init_price)}
              </h3>
              <h3 className="font-bold text-secondary">
                {formatToCurrency(price)}
              </h3>
            </div>
          </div>
          <div className="w-full h-1/3 flex border-t pr-5 justify-between items-center">
            <h3>Sub Total</h3>
            <h3 className="font-bold text-secondary">
              {formatToCurrency(price * qty)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCartCheckout;
