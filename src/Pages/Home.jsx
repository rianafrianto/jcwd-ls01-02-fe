import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Obat from "../Assets/Obat.png";
import uploadResep from "../Assets/upload-resep.png";

function Home() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  return (
    <div className="h-full w-full bg-green-200 flex justify-center">
      <div className="container h-full flex flex-col px-24 py-11 gap-y-14">
        <div className="w-full h-60 border border-black">Jumbotron</div>
        <div className="w-full h-40 bg-white rounded-xl shadow-md px-7 flex justify-end items-center relative overflow-hidden ">
          <img src={uploadResep} alt="" className="absolute left-0 top-0" />
          <button
            className="h-12 w-72 border rounded-lg duration-500 border-primary-green hover:bg-primary-green hover:text-white text-sm"
            onClick={() => {
              isLogin ? navigate("/prescription") : navigate("/login");
            }}
          >
            Unggah Resep
          </button>
        </div>
        <div className="w-full h-40 border border-black flex items-center">
          Kategori
          <button
            className="h-32 w-32 border border-white hover:bg-white flex flex-col justify-center items-center"
            onClick={() => navigate("/products")}
          >
            <img src={Obat} alt="" />
            obat-obatan
          </button>
        </div>
        <div className="w-full border border-black" />
        <div className="w-full h-[450px] border border-black">
          Diskon hari ini
        </div>
        <div className="w-full border border-black" />
        <div className="w-full h-56 border border-black flex gap-x-4">
          <div className="w-1/2 h-full bg-green-900">left</div>
          <div className="w-1/2 h-full bg-green-900">right</div>
        </div>
        <div className="w-full border border-black" />
        <div className="w-full h-[400px] border border-black flex flex-col">
          <div className="flex justify-between h-1/6">
            <div>Title</div>
            <div>
              <button>Lihat Semua</button>
            </div>
          </div>
          <div className="h-5/6 bg-white">Cards</div>
        </div>
        <div className="w-full border border-black" />
        <div className="w-full h-40 border border-black">
          Jaminan Untuk Anda
        </div>
        <div className="w-full h-40 border border-black mt-14">Metode</div>
      </div>
    </div>
  );
}

export default Home;
