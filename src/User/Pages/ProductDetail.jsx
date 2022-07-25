import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Component/Card";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import formatToCurrency from "../../Helpers/formatToCurrency";
import plusIcon from "../../Assets/plus-icon.png";
import minusIcon from "../../Assets/minus-icon.png";
import chatDetailIcon from "../../Assets/chat-detail-icon.png";
import bagikanIcon from "../../Assets/bagikan-icon.png";
import tambahKeranjangIcon from "../../Assets/tambah-keranjang-icon.png";
import { HeartIcon } from "@heroicons/react/outline";
import { printCategory, printCategoryParams } from "../../Helpers/categoryList";
import ProdCatCarousel from "../Component/Carousel/Carousels/ProdCatCarousel";
import Loading from "../Component/Loading";
import defaultProduct from "../../Assets/default-product.png";

function ProductDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let [tab, setTab] = useState("DESKRIPSI");

  const [qty, setQty] = useState(1);
  const { isLogin } = useSelector((state) => state.user);

  const params = useParams();
  let { product_name, category } = params;

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      product_name = product_name.split("_").join(" ");
      let res = await axios.get(
        `${API_URL}/product/product-details/${product_name}`
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tabPrint = (tab) => {
    switch (tab) {
      case "DESKRIPSI":
        return (
          <>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Indikasi / Kegunaan</div>
              <div className="h-full w-1/2">{data.indikasi}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">
                Kandungan / Komposisi
              </div>
              <div className="h-full w-1/2">{data.komposisi}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Golongan</div>
              <div className="h-full w-1/2">{data.golongan}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Kemasan</div>
              <div className="h-full w-1/2">{data.kemasan}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Principal</div>
              <div className="h-full w-1/2">{data.principal}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">NIE</div>
              <div className="h-full w-1/2">{data.NIE}</div>
            </div>
          </>
        );
      case "CARAPAKAI":
        return (
          <>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Cara Pakai</div>
              <div className="h-full w-1/2">{data.cara_pakai}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Cara Penyimpanan</div>
              <div className="h-full w-1/2">{data.cara_penyimpanan}</div>
            </div>
          </>
        );
      case "PERINGATAN":
        return (
          <>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Peringatn</div>
              <div className="h-full w-1/2">{data.peringatan}</div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetails();
  }, []);

  if (loading) {
    return <Loading className="h-screen" />;
  }

  return (
    <div className="h-full w-full flex justify-center pt-20">
      <div className="container h-full flex flex-col px-24 py-11">
        <div className="text-md breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/category/${printCategoryParams(category)}`}>
                {printCategory(category)}
              </Link>
            </li>
            <li className="text-primary font-bold">
              {product_name.split("_").join(" ")}
            </li>
          </ul>
        </div>
        <div className="w-full mt-9 grid grid-cols-1 lg:grid-cols-2 gap-x-28">
          <div className="flex flex-col w-full items-center">
            <div className="w-[400px] flex flex-col items-center gap-5">
              <figure className="h-[300px] w-full bg-white p-20 flex justify-center items-center shadow-lg shadow-black/20 rounded-xl">
                <img
                  src={data.photo ? API_URL + data.photo : defaultProduct}
                  alt=""
                />
              </figure>
              <div className="hidden lg:flex gap-x-2 w-full px-5 h-11">
                <button className="button-primary rounded-full text-white w-1/2 flex gap-x-1 text-sm">
                  <img src={chatDetailIcon} alt="" className="h-full " />
                  <span>Chat Admin</span>
                </button>
                <button className="button-primary rounded-full text-white w-1/2 flex gap-x-1 text-sm">
                  <img src={bagikanIcon} alt="" className="h-full " />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col mr-28">
            <div className="h-[300px] w-full bg-white flex flex-col mb-20">
              <div className="text-sm mb-1">{data.principal}</div>
              <div className="text-2xl mb-5">{data.name}</div>
              <div className="text-2xl font-bold text-secondary mb-3">
                {formatToCurrency(data.price)}{" "}
                <span className="font-normal text-lg">
                  / {data.satuan.toLowerCase()}
                </span>
              </div>
              <div className="text-base mb-6 flex gap-x-5 items-center">
                <span className="line-through text-neutral-gray">
                  {formatToCurrency(data.initPrice)}
                </span>
                <span className="text-danger font-semibold border-2 border-danger text-xs rounded p-1">{`${data.promo}%`}</span>{" "}
              </div>
              <div className="h-10 mb-11 flex items-center gap-x-4">
                <div className="w-40 h-full flex justify-center items-center bg-primary/10 rounded-lg overflow-hidden">
                  <button
                    className="btn-plain h-full w-1/3 px-0 flex justify-center items-center hover:bg-primary/20"
                    onClick={() =>
                      qty === 1 ? null : setQty((prev) => prev - 1)
                    }
                  >
                    <img src={minusIcon} alt="" className="h-full" />
                  </button>
                  <span className="w-1/3 h-full text-lg flex justify-center items-center font-bold text-primary">
                    {qty}
                  </span>
                  <button
                    className="btn-plain h-full w-1/3 px-0 flex justify-center items-center hover:bg-primary/20"
                    onClick={() =>
                      qty === data.stock ? null : setQty((prev) => prev + 1)
                    }
                  >
                    <img src={plusIcon} alt="" className="h-full" />
                  </button>
                </div>
                <div>
                  Sisa {data.stock} {data.satuan.toLowerCase()}
                </div>
              </div>
              <div className="flex gap-x-4 h-11">
                <button
                  className="button-outline w-40 text-sm flex gap-x-2"
                  onClick={() => {
                    isLogin
                      ? console.log(`tambah ke keranjang sebanyak ${qty}`)
                      : navigate("/login");
                  }}
                >
                  <img
                    src={tambahKeranjangIcon}
                    alt=""
                    className="h-full scale-75"
                  />{" "}
                  Keranjang
                </button>
                <button
                  className="button-primary w-40 text-sm"
                  onClick={() => {
                    isLogin ? navigate("/cart") : navigate("/login");
                  }}
                >
                  Beli
                </button>
                <button className="button-outline aspect-square group">
                  <HeartIcon className="h-2/3 text-primary group-hover:text-pink-500 duration-300" />
                </button>
              </div>
            </div>
            <div className="w-full border-t border-neutral-gray" />

            <div className="w-full h-14 flex tabs">
              <button
                className={`tab h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "DESKRIPSI"
                    ? "border-b-2 border-primary text-primary font-bold"
                    : "border-b border-neutral-gray"
                }`}
                onClick={() => setTab("DESKRIPSI")}
              >
                Deskripsi
              </button>
              <button
                className={`tab h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "CARAPAKAI"
                    ? "border-b-2 border-primary text-primary font-bold"
                    : "border-b border-neutral-gray"
                }`}
                onClick={() => setTab("CARAPAKAI")}
              >
                Cara Pakai
              </button>
              <button
                className={`tab h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "PERINGATAN"
                    ? "border-b-2 border-primary text-primary font-bold"
                    : "border-b border-neutral-gray"
                }`}
                onClick={() => setTab("PERINGATAN")}
              >
                Peringatan
              </button>
            </div>
            <div className="w-full py-5 mb-12 flex flex-col gap-y-5 text-sm">
              {tabPrint(tab)}
            </div>
          </div>
        </div>
        <div className="w-full border-t-[.5px] border-blackh-20 bg-white flex pt-28 relative">
          <h1 className="absolute left-3 top-10 text-2xl text-secondary font-bold">
            Produk Terkait
          </h1>
          <div className="z-10 w-full h-full">
            <ProdCatCarousel category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
