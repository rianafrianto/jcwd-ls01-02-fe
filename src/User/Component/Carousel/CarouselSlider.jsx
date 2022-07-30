import React from "react";
import Slider from "react-slick";

function CarouselSlider(props) {
  let { settings, printFunc, className } = props;

  return (
    <Slider {...settings} className={`${className} group `}>
      {printFunc()}
    </Slider>
  );
}

export default CarouselSlider;
