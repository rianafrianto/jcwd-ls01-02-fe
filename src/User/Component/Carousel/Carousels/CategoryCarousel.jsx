import React from "react";
import { categoryList } from "../../../../Helpers/categoryList";
import CardCategory from "../../CardCategory";
import CarouselSlider from "../CarouselSlider";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

function CategoryCarousel() {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow height="top-1/3" />,
    prevArrow: <PrevArrow height="top-1/3" />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      //   {
      //     breakpoint: 640,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
    ],
  };

  const printCat = () => {
    return categoryList.map((val, index) => {
      const { cardText, cardPic, cardPath } = val;
      return (
        <div key={index} className="w-full h-full flex px-2">
          <CardCategory
            cardText={cardText}
            cardPath={cardPath}
            cardPic={cardPic}
            cardStyle="h-28 my-5 "
            imageStyle=" h-16"
          />
        </div>
      );
    });
  };

  return (
    <CarouselSlider settings={settings} printFunc={printCat} className="" />
  );
}

export default CategoryCarousel;
