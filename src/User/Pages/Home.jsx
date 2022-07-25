import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import uploadResep from "../../Assets/upload-resep.png";
import kejarDiskon from "../../Assets/kejar-diskon.png";
import programHamil from "../../Assets/program-hamil.png";
import idulFitri from "../../Assets/idul-fitri.png";
import dijaminHemat from "../../Assets/dijamin-hemat.png";
import obatAsli from "../../Assets/obat-asli.png";
import gratisOngkir from "../../Assets/gratis-ongkir.png";
import bcaIcon from "../../Assets/bca-icon.png";
import mandiriIcon from "../../Assets/mandiri-icon.png";
import permataIcon from "../../Assets/permata-icon.png";
import ovoIcon from "../../Assets/ovo-icon.png";
import gopayIcon from "../../Assets/gopay-icon.png";
import shopeepayIcon from "../../Assets/shopeepay-icon.png";
import PromoCarousel from "../Component/Carousel/Carousels/PromoCarousel";
import CategoryCarousel from "../Component/Carousel/Carousels/CategoryCarousel";
import CardMiniJumbotron from "../Component/CardMiniJumbotron";
import ProdCatCarousel from "../Component/Carousel/Carousels/ProdCatCarousel";

function Home() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  const [firstScroll, setFirstScroll] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full w-full bg-white flex justify-center pt-20">
      <div className="container h-full flex flex-col px-10 lg:px-24 py-11 gap-y-14">
        <div className="w-full h-60 border border-black">Jumbotron</div>
        <div className="w-full h-40 bg-white rounded-xl shadow-custom-lg border px-7 flex justify-end items-center relative overflow-hidden">
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
            className="button-primary h-12 w-72 text-sm z-10"
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
            <div
              className={`h-full w-80 bg-gradient-to-t from-[#7FB4C3] to-[#B0E7E8] rounded-2xl absolute overflow-hidden duration-1000 ${
                !firstScroll ? "-translate-x-full opacity-0" : ""
              }`}
            >
              <img
                src={kejarDiskon}
                alt=""
                className="absolute top-24 right-20 w-72"
              />
              <p className="text-xl font-bold text-secondary-light w-36 text-center absolute top-6 left-7">
                Yuk Buruan Ikutan!
              </p>
            </div>
            <div className="z-10 w-full h-full pt-7">
              <PromoCarousel
                firstScroll={firstScroll}
                setFirstScroll={setFirstScroll}
              />
            </div>
          </div>
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full h-[212px] grid grid-cols-2 gap-x-4">
          <CardMiniJumbotron
            parentClass="bg-peach cursor-pointer"
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
        <div className="w-full bg-white flex flex-col gap-y-7">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">
              Produk Lainnya
            </div>
            <Link
              className="text-sm text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua
            </Link>
          </div>
          <div className="z-10 w-full h-full">
            <ProdCatCarousel category={"semua"} />
          </div>
        </div>
        <div className="w-full border-t border-neutral-gray" />
        <div className="w-full bg-white flex flex-col gap-y-7">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">
              Jaminan Untuk Anda
            </div>
          </div>
          <div className="w-full h-full flex gap-x-4">
            <div className="w-1/3 h-48 rounded-2xl shadow-custom-lg border flex justify-center items-center gap-x-9">
              <img src={obatAsli} alt="" className="h-20" />
              <div className="h-24 w-52 flex flex-col gap-y-2">
                <h3 className="font-bold text-secondary text-xl">
                  100% Obat Asli
                </h3>
                <p className="text-sm">
                  Semua produk yang kami jual dijamin asli & kualitas terbaik
                  untuk anda.
                </p>
              </div>
            </div>
            <div className="w-1/3 h-48 rounded-2xl shadow-custom-lg border flex justify-center items-center gap-x-9">
              <img src={dijaminHemat} alt="" className="h-24" />
              <div className="h-24 w-44 flex flex-col gap-y-2">
                <h3 className="font-bold text-secondary text-xl">
                  Dijamin Hemat
                </h3>
                <p className="text-sm">
                  Kami menjamin akan mengembalikan uang dari selisih perbedaan
                  harga.
                </p>
              </div>
            </div>
            <div className="w-1/3 h-48 rounded-2xl shadow-custom-lg border flex justify-center items-center gap-x-9">
              <img src={gratisOngkir} alt="" className="h-14" />
              <div className="h-24 w-48 flex flex-col gap-y-2">
                <h3 className="font-bold text-secondary text-xl">
                  Gratis Ongkir
                </h3>
                <p className="text-sm">
                  Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos
                  kirim!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-40 mt-14 flex flex-col justify-center items-center">
          <h3 className="font-bold text-secondary">Metode Pembayaran</h3>
          <div className="h-16 flex items-center gap-x-10">
            <img src={bcaIcon} alt="" className="h-9" />
            <img src={mandiriIcon} alt="" className="h-9" />
            <img src={permataIcon} alt="" className="h-11" />
            <img src={ovoIcon} alt="" className="h-14" />
            <img src={gopayIcon} alt="" className="h-9" />
            <img src={shopeepayIcon} alt="" className="h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
