import axios from "axios";
import React, { useEffect, useState } from "react";
import API_URL from "../../../../Helpers/API_URL";
import Card from "../../Card";
import CarouselSlider from "../CarouselSlider";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

function PromoCarousel(props) {
  const { firstScroll, setFirstScroll } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scroll, setScroll] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product/promo-products`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: (
      <NextArrow
        height={`top-40 ${scroll === 3 && "hidden"}`}
        setFirstScroll={setFirstScroll}
        firstScroll={firstScroll}
        scroll={scroll}
        setScroll={setScroll}
      />
    ),
    prevArrow: (
      <PrevArrow
        height={`top-40 ${firstScroll ? "hidden" : ""}`}
        setFirstScroll={setFirstScroll}
        firstScroll={firstScroll}
        scroll={scroll}
        setScroll={setScroll}
      />
    ),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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

  const printProducts = () => {
    return data.map((val, i) => {
      if (i === 0) {
        return <div key={i} className="w-full h-full flex px-3 py-4"></div>;
      }
      return (
        <div key={i} className="w-full h-full flex px-3 py-4">
          <Card key={i} data={val} />
        </div>
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <>Loading....</>;
  }
  return (
    <CarouselSlider
      settings={settings}
      printFunc={printProducts}
      className=""
    />
  );
}

export default PromoCarousel;
