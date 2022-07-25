import React from "react";
import Slider from "react-slick";

function CarouselSlider(props) {
  let { settings, printFunc } = props;

  return (
    <Slider {...settings} className="group">
      {printFunc()}
    </Slider>
  );
}

export default CarouselSlider;
