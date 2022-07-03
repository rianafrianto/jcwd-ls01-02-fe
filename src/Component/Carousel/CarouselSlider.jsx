import React from "react";
import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

function CarouselSlider(props) {
  let { settings, printFunc } = props;

  return (
    <Slider {...settings} className="">
      {printFunc()}
    </Slider>
  );
}

export default CarouselSlider;
