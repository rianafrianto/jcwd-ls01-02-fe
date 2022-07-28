import React from "react";
import CarouselSlider from "../CarouselSlider";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";
import jumbotron from "../../../../Assets/jumbotron.png";
import logo from "../../../../Assets/logo.png";

function JumbotronCarousel() {
  const settings = {
    infinite: true,
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const printJumbotron = () => {
    return ["", "", ""].map((val, i) => {
      return (
        <div key={i}>
          <div className="w-full h-full lg:h-60 bg-jumbotron flex justify-end sm:pl-20">
            <div className="sm:w-1/2 my-auto flex flex-col sm:gap-y-3 z-20">
              <h2 className="flex items-center gap-x-2">
                <span className="hidden sm:block text-lg font-bold text-secondary">
                  Selamat Datang Di
                </span>{" "}
                <img src={logo} alt="" className="h-5 sm:h-10" />
              </h2>
              <h1 className="sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#000C36] to-[#6472A8]">
                APOTEK ONLINE TERPERCAYA
              </h1>
              <h3 className="text-xs sm:text-lg font-bold text-secondary w-24 sm:w-auto">
                100% Asli, Produk BPOM, Uang Dijamin Kembali
              </h3>
            </div>
            <img src={jumbotron} alt="" className="h-full z-10" />
            <div className="h-full absolute w-40 bg-jbiru z-0" />
          </div>
        </div>
      );
    });
  };

  return (
    <CarouselSlider
      settings={settings}
      printFunc={printJumbotron}
      className=""
    />
  );
}

export default JumbotronCarousel;
