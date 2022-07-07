import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API_URL from "../Helpers/API_URL";
import { HeartIcon } from "@heroicons/react/solid";
import formatToCurrency from "../Helpers/formatToCurrency";
import { toast } from "react-toastify";

function Card({ data }) {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const link = data.name.split(" ").join("_");
  return (
    <div
      className="h-full relative bg-white p-5 flex flex-col rounded-xl shadow-lg shadow-black/20 items-center gap-y-3 cursor-pointer hover:-translate-y-2 hover:shadow-primary/50 duration-300"
      onClick={() => navigate(`/category/${data.category}/${link}`)}
    >
      <button
        className="btn btn-circle border-0 flex justify-center items-center bg-white absolute right-3 shadow-md hover:shadow-primary/50 hover:bg-white"
        onClick={(e) => {
          e.stopPropagation();
          if (isLogin) {
            console.log("liked");
          } else {
            toast.error("Silahkan Log In terlebih dahulu!", {
              theme: "colored",
            });
            navigate("/login");
          }
        }}
      >
        <HeartIcon className="text-neutral-gray h-8" />
      </button>
      <div className="flex flex-col items-start w-full">
        <figure className="w-full flex justify-center">
          <img
            src={API_URL + data.photo}
            alt=""
            className="h-36 aspect-square"
          />
        </figure>
        <div className="flex flex-col gap-y-2 text-secondary w-full">
          <h2 className="text-left font-bold text-sm h-10 overflow-hidden">
            {data.name}
          </h2>
          <h3 className="flex flex-col w-full gap-y-1">
            <span className="flex gap-x-5 items-center">
              <span className="text-danger font-semibold border-2 border-danger text-xs rounded p-1">{`${data.promo}%`}</span>{" "}
              <span className="line-through text-neutral-gray text-sm">
                {formatToCurrency(data.initPrice)}
              </span>
            </span>
            <span className="flex justify-between">
              {formatToCurrency(data.price)}
              <span>/Strip</span>
            </span>
          </h3>
        </div>
      </div>
      <button
        className="btn-plain border-2 text-sm border-primary rounded-lg text-primary font-bold w-full py-1 hover:bg-primary/20"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLogin) {
            navigate("/login");
          }
        }}
      >
        Keranjang
      </button>
    </div>
  );
}

export default Card;
