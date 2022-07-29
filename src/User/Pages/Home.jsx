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
import resepMobile from "../../Assets/resep-mobile.png";
import ovoIcon from "../../Assets/ovo-icon.png";
import gopayIcon from "../../Assets/gopay-icon.png";
import shopeepayIcon from "../../Assets/shopeepay-icon.png";
import PromoCarousel from "../Component/Carousel/Carousels/PromoCarousel";
import CategoryCarousel from "../Component/Carousel/Carousels/CategoryCarousel";
import CardMiniJumbotron from "../Component/CardMiniJumbotron";
import ProdCatCarousel from "../Component/Carousel/Carousels/ProdCatCarousel";
import { ChevronRightIcon } from "@heroicons/react/outline";
import CategoryCarouselMobile from "../Component/Carousel/Carousels/CategoryCarouselMobile";
import NavbarHomeMobile from "../Component/NavbarHomeMobile";
import NavbarMobile from "../Component/NavbarMobile";
import PromoCarMobile from "../Component/Carousel/Carousels/PromoCarMobile";
import ProdCatCarMobile from "../Component/Carousel/Carousels/ProdCatCarMobile";
import JumbotronCarousel from "../Component/Carousel/Carousels/JumbotronCarousel";

function Home() {
  const navigate = useNavigate();
  const { isLogin, verified } = useSelector((state) => state.user);
  const [firstScroll, setFirstScroll] = useState(true);

  useEffect(() => {
    if (isLogin && !verified) return navigate("/unverified");
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-full w-full bg-white flex justify-center pb-14 lg:pb-0 pt-20 scrollbar-hide sm:scrollbar-default overflow-x-hidden">
      <NavbarHomeMobile />
      <NavbarMobile />
      <div className="container h-full flex flex-col px-5 sm:px-10 lg:px-24 py-11 gap-y-6 lg:gap-y-14">
        <div className="w-full h-32 lg:h-60 rounded-2xl overflow-hidden">
          <JumbotronCarousel />
        </div>
        {/* mobile */}
        <div className="flex lg:hidden w-full bg-white flex-col gap-y-4">
          <h3 className="text-sm font-bold text-secondary">
            Punya Resep Dokter?
          </h3>
          <div
            className="btn-plain h-20 w-full relative border overflow-hidden flex justify-between items-center rounded-lg shadow-custom pr-3"
            onClick={() => {
              isLogin ? navigate("/prescription") : navigate("/login");
            }}
          >
            <img src={resepMobile} alt="" className="h-full scale-[130%]" />
            <p className="min-w-min text-xs font-semibold">
              Unggah resep doktermu disini!
            </p>
            <ChevronRightIcon className="w-7 aspect-square" />
          </div>
        </div>

        {/* desktop */}
        <div className="hidden lg:flex w-full h-40 bg-white rounded-xl shadow-custom-lg border px-7 justify-end items-center relative overflow-hidden">
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

        {/* mobile */}
        <div className="w-full h-full flex lg:hidden flex-col justify-between gap-y-4">
          <div className="flex justify-between items-end">
            <div className="text-sm text-secondary font-bold">Kategori</div>
            <Link
              className="text-xs text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua
            </Link>
          </div>
          <div className="h-24 flex items-center w-full overflow-x-scroll scrollbar-hide">
            <CategoryCarouselMobile />
          </div>
        </div>
        {/* desktop */}
        <div className="w-full h-full hidden lg:flex flex-col justify-between gap-y-5">
          <div className="flex justify-between items-end">
            <div className="text-2xl text-secondary font-bold">Kategori</div>

            <Link
              className="text-sm text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua Produk
            </Link>
          </div>
          <CategoryCarousel className="" />
        </div>
        <div className="hidden sm:block w-full border-t border-neutral-gray" />

        {/* mobile */}
        <div className="flex lg:hidden w-full h-[350px] flex-col gap-y-4 ">
          <div className="flex justify-between items-end">
            <div className="text-sm text-secondary font-bold">
              Kejar Diskon Hari Ini
            </div>
            <Link
              className="text-xs text-primary font-bold"
              to={`/category/all`}
            >
              `` Lihat Semua
            </Link>
          </div>
          <div className="h-[300px] flex relative -mx-5">
            <div
              className={`h-full w-full bg-gradient-to-t from-[#7FB4C3] to-[#B0E7E8] absolute overflow-hidden duration-1000 ${
                !firstScroll ? "-translate-x-full opacity-0" : ""
              }`}
            >
              <img
                src={kejarDiskon}
                alt=""
                className="absolute top-10 -left-9 w-52"
              />
              <p className="text-sm font-bold text-secondary-light w-28 text-center absolute top-4 left-6">
                Yuk Buruan Ikutan!
              </p>
            </div>
            <div className="h-full flex items-center w-full overflow-x-scroll scrollbar-hide z-10 py-5">
              <PromoCarMobile />
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="w-full h-[460px] hidden lg:flex flex-col gap-y-7">
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
        <div className="hidden sm:block w-full border-t border-neutral-gray" />
        {/* both */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CardMiniJumbotron
            parentClass="bg-peach"
            imgClass="h-[250px] lg:h-[450px] absolute -left-12 -bottom-14 lg:-left-14 lg:-bottom-20"
            img={programHamil}
            header="Program Hamil"
            paragraph="Wujudkan rumah tanggamu dengan si buah hati"
          />
          <CardMiniJumbotron
            parentClass="bg-primary-light"
            imgClass="h-[210px] lg:h-[350px] absolute -left-5 -bottom-5 lg:left-0 lg:-bottom-9"
            img={idulFitri}
            header="Kebutuhan Untuk Idul Fitri"
            paragraph={`Lengkapi kebutuhan gizi & asupan saat puasa`}
          />
        </div>
        <div className="hidden sm:block w-full border-t border-neutral-gray" />
        <div className="w-full bg-white flex flex-col gap-y-7">
          <div className="flex justify-between items-end">
            <div className="text-sm sm:text-2xl text-secondary font-bold">
              Produk Lainnya
            </div>
            <Link
              className="text-xs sm:text-sm text-primary font-bold"
              to={`/category/all`}
            >
              Lihat Semua
            </Link>
          </div>
          <div className="hidden sm:block z-10 w-full h-full">
            <ProdCatCarousel category={"semua"} />
          </div>
          <div className="h-full flex sm:hidden items-center w-screen overflow-x-scroll scrollbar-hide z-10 p-5 -mx-5">
            <ProdCatCarMobile category={"semua"} />
          </div>
        </div>
        <div className="hidden sm:block w-full border-t border-neutral-gray" />
        <div className="w-full bg-white flex flex-col gap-y-7">
          <div className="flex justify-between items-end">
            <div className="text-sm lg:text-2xl text-secondary font-bold">
              Jaminan Untuk Anda
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="mini-jumbotron">
              <img src={obatAsli} alt="" className="h-14 lg:h-20" />
              <div className="h-14 lg:h-24 w-52 lg:w-52 flex flex-col gap-y-2 text-secondary">
                <h3 className="font-bold  text-sm lg:text-xl">
                  100% Obat Asli
                </h3>
                <p className="text-xs lg:text-sm">
                  Semua produk yang kami jual dijamin asli & kualitas terbaik
                  untuk anda.
                </p>
              </div>
            </div>
            <div className="mini-jumbotron">
              <img src={dijaminHemat} alt="" className="h-14 lg:h-24" />
              <div className="h-14 lg:h-24 w-52 lg:w-44 flex flex-col gap-y-2 text-secondary">
                <h3 className="font-bold text-sm lg:text-xl">Dijamin Hemat</h3>
                <p className="text-xs lg:text-sm">
                  Kami menjamin akan mengembalikan uang dari selisih perbedaan
                  harga.
                </p>
              </div>
            </div>
            <div className="mini-jumbotron">
              <img src={gratisOngkir} alt="" className="h-8 lg:h-14" />
              <div className="h-14 lg:h-24 w-52 lg:w-48 flex flex-col gap-y-2 text-secondary">
                <h3 className="font-bold text-sm lg:text-xl">Gratis Ongkir</h3>
                <p className="text-xs lg:text-sm">
                  Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos
                  kirim!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-40 mt-14 hidden lg:flex flex-col justify-center items-center">
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
