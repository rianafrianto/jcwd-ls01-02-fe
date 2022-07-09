import React, { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import API_URL from "../Helpers/API_URL";
import axios from "axios";
import Cookies from "js-cookie";

function CardCart({ data }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const deleteCart = async () => {
    try {
      let token = Cookies.get("token");
      setLoadingProducts(true);
      let res = await axios.delete(
        `${API_URL}/transaction/deleteproduct`,
        {
          productId: data.id,
        },
        { headers: { authorization: token } }
      );
      console.log(res, ">>>>>>RESPON DELETE PRODUCT");
      // console.log(data, ">>>>>>>>>>>> CONSOLEEE LOGGGG DATAAA");
      // const { data } = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    deleteCart();
  }, []);

  // const printProducts = () => {
  //   if (loadingProducts) {
  //     return <Loading className="pt-28 h-full" />;
  //   }
  //   return (
  //     <div className="">
  //       {products.map((val, i) => {
  //         return <CardCart key={i} data={val} />;
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div className="h-47 w-full border border-green-900 flex gap-x-6">
      <div className="flex-col w-full">
        <div className="flex h-1/2 w-full justify-between">
          <input type="checkbox" className="" />
          <img
            className="aspect-square border w-1/4"
            src={API_URL + data.photo}
            alt=""
          />
          <div className="w-1/4 border">{data.name}</div>
          <div className="w-1/4 border">{data.price}</div>
        </div>
        <div className="flex h-1/2 w-full justify-between">
          <button className="w-1/3 text-xs h-9 mt-9 text-center text text-teal-600 hover:text-teal-700">
            Pindah ke Wishlist
          </button>
          <button className="w-10 h-8 justify-center flex mt-9 pt-2">
            <RiDeleteBin5Fill
              className="text-teal-600 text-lg hover:text-teal-700"
              onClick={deleteCart}
            />
          </button>
          <div className="flex w-1/3 justify-center pt-10">
            <button className="w-10 h-6 text-teal-600 border rounded-sm bg-gray-100 font-bold hover:text-teal-700">
              -
            </button>
            <div className="w-10 h-6 text-teal-600 text-center border rounded-sm bg-gray-100 text-sm">
              {data.qty}
            </div>
            <button className="w-10 h-6 text-teal-600 border rounded-sm bg-gray-100 font-bold hover:text-teal-700">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
