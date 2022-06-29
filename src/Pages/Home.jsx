import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import uploadResep from "../Assets/upload-resep.png";
import categoryList from "../Helpers/categoryList";
import CardCategory from "../Component/CardCategory";
import kejarDiskon from "../Assets/kejar-diskon.png";
import CarouselSlider from "../Component/Carousel/CarouselSlider";

function Home() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  const printCat = () => {
    return categoryList.map((val, index) => {
      const { cardText, cardPic, cardPath } = val;
      return (
        <div key={index}>
          <CardCategory
            cardText={cardText}
            cardPath={cardPath}
            cardPic={cardPic}
          />
        </div>
      );
    });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // initialSlide: 5,
  };

  return (
    <div className="h-full w-full bg-white flex justify-center pt-20">
      <div className="container h-full flex flex-col px-10 lg:px-24 py-11 gap-y-14">
        <div className="w-full h-60 border border-black">Jumbotron</div>
        <div className="w-full h-40 bg-white rounded-xl shadow-md px-7 flex justify-end items-center relative overflow-hidden">
          <img src={uploadResep} alt="" className="absolute left-0 top-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 flex flex-col gap-y-3">
            <h3 className="text-xl font-bold text-secondary">
              Punya Resep Dokter?
            </h3>
            <p>
              Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Unggah
              resep anda sekarang!
            </p>
          </div>
          <button
            className="btn h-12 w-72 border-0 duration-500 bg-primary hover:bg-primary text-white text-sm"
            onClick={() => {
              isLogin ? navigate("/prescription") : navigate("/login");
            }}
          >
            Unggah Resep
          </button>
        </div>
        <div className="w-full h-44 flex flex-col justify-between">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">Kategori</div>
            <div
              className="text-sm text-primary font-bold"
              onClick={() => console.log("navigate to all categories")}
            >
              Lihat Semua
            </div>
          </div>
          {/* <div className="flex gap-x-4 "> */}
          <CarouselSlider settings={settings} printFunc={printCat} />
          {/* </div> */}
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-[460px] flex flex-col gap-y-7 border border-black">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">
              Kejar Diskon Hari Ini
            </div>
          </div>
          <div className="h-full flex relative">
            <div className="h-full w-80 bg-gradient-to-t from-[#7FB4C3] to-[#B0E7E8] rounded-2xl absolute overflow-hidden">
              <img
                src={kejarDiskon}
                alt=""
                className="absolute top-14 right-12"
              />
            </div>
          </div>
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
