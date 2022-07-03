import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import uploadResep from "../Assets/upload-resep.png";
import kejarDiskon from "../Assets/kejar-diskon.png";
import programHamil from "../Assets/program-hamil.png";
import idulFitri from "../Assets/idul-fitri.png";
import PromoCarousel from "../Component/Carousel/Carousels/PromoCarousel";
import CategoryCarousel from "../Component/Carousel/Carousels/CategoryCarousel";
import CardMiniJumbotron from "../Component/CardMiniJumbotron";

function Home() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            className="button-primary h-12 w-72 text-sm"
            onClick={() => {
              isLogin ? navigate("/prescription") : navigate("/login");
            }}
          >
            Unggah Resep
          </button>
        </div>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">Kategori</div>

            <Link
              className="text-sm text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua Produk
            </Link>
          </div>
          {/* <div className="flex gap-x-4 "> */}
          <CategoryCarousel />
          {/* </div> */}
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-[460px] flex flex-col gap-y-7">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">
              Kejar Diskon Hari Ini
            </div>
            <Link
              className="text-sm text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua
            </Link>
          </div>

          <div className="h-full flex relative">
            <div className="h-full w-80 bg-gradient-to-t from-[#7FB4C3] to-[#B0E7E8] rounded-2xl absolute overflow-hidden">
              <img
                src={kejarDiskon}
                alt=""
                className="absolute top-24 right-20 w-72"
              />
              <p className="text-xl font-bold text-secondary-light w-36 text-center absolute top-6 left-7">
                Yuk Buruan Ikutan!
              </p>
            </div>
            <div className="z-10 w-full h-full pl-60 pt-7">
              <PromoCarousel />
            </div>
          </div>
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-[212px] grid grid-cols-2 gap-x-4">
          <CardMiniJumbotron
            parentClass="bg-danger cursor-pointer"
            imgClass="h-[450px] absolute -left-14 -bottom-20"
            img={programHamil}
            header="Program Hamil"
            paragraph="Wujudkan rumah tanggamu dengan si buah hati"
          />
          <CardMiniJumbotron
            parentClass="bg-primary-light cursor-pointer"
            imgClass="h-[350px] absolute left-0 -bottom-9"
            img={idulFitri}
            header="Kebutuhan Untuk Idul Fitri"
            paragraph={`Lengkapi kebutuhan gizi & asupan saat puasa`}
          />
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-[400px] border border-black flex flex-col">
          <div className="flex justify-between h-1/6">
            <div>Title</div>
            <div>
              <button>Lihat Semua</button>
            </div>
          </div>
          <div className="h-5/6 bg-white">Cards</div>
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-40 border border-black">
          Jaminan Untuk Anda
        </div>
        <div className="w-full h-40 border border-black mt-14">Metode</div>
      </div>
    </div>
  );
}

export default Home;
