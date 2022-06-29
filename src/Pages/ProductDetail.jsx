import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Component/Card";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import formatToCurrency from "../Helpers/formatToCurrency";
import plusIcon from "../Assets/plus-icon.png";
import minusIcon from "../Assets/minus-icon.png";

function ProductDetail() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let [tab, setTab] = useState("DESKRIPSI");

  const [qty, setQty] = useState(1);
  const { isLogin } = useSelector((state) => state.user);

  const params = useParams();
  let { product_name } = params;
  const fetchProductDetails = async () => {
    try {
      product_name = product_name.split("-").join(" ");
      let res = await axios.get(
        `${API_URL}/product/product-details/${product_name}`
      );
      console.log(res);
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
              <div className="h-full w-1/2 font-bold">Dosis</div>
              <div className="h-full w-1/2">{data.dosis}</div>
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
              <div className="h-full w-1/2 font-bold">
                Kontradiksi / Jangan digunakan oleh
              </div>
              <div className="h-full w-1/2">
                {data.peringatan ? data.peringatan : "-"}
              </div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Efek Samping</div>
              <div className="h-full w-1/2">{data.efek_samping}</div>
            </div>
            <div className="w-full flex">
              <div className="h-full w-1/2 font-bold">Perhatian Khusus</div>
              <div className="h-full w-1/2">{data.perhatian}</div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="h-full w-screen flex justify-center pt-20">
      <div className="container h-full flex flex-col px-24 py-11">
        Products/1
        <div className="w-full mt-9 grid grid-cols-1 lg:grid-cols-2 gap-x-28">
          <div className="flex flex-col w-full gap-y-6 items-center">
            <figure className="h-[300px] w-[400px] bg-white p-20 flex justify-center items-center shadow-lg shadow-black/20 rounded-xl">
              <img src={API_URL + data.photo} alt="" />
            </figure>
            <div className="hidden lg:flex justify-center gap-x-2 ">
              <button className="btn rounded-full bg-primary border-0 text-white w-36 h-12 ">
                chat admin
              </button>
              <button className="btn rounded-full bg-primary border-0 text-white w-36 h-12 ">
                Bagikan
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col mr-28">
            <div className="h-[300px] w-full bg-white flex flex-col">
              <div className="text-sm mb-1">{data.principal}</div>
              <div className="text-2xl mb-5">{data.name}</div>
              <div className="text-2xl mb-3">
                {formatToCurrency(data.price)}
              </div>
              <div className="text-base mb-6">
                <span className="text-danger font-semibold border-2 border-danger text-xs rounded p-1">{`${data.promo}%`}</span>{" "}
                <span className="line-through text-neutral-gray text-sm">
                  {formatToCurrency(data.initPrice)}
                </span>
              </div>
              <div className="h-10 mb-11 flex items-center gap-x-4">
                <div className="w-40 h-full flex justify-center items-center">
                  <button
                    className="btn border-0 w-1/3 px-0 bg-white flex justify-center items-center hover:bg-transparent"
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
                    className="btn border-0 w-1/3 px-0 py-0 bg-white flex justify-center items-center hover:bg-transparent"
                    onClick={() =>
                      qty === data.stock ? null : setQty((prev) => prev + 1)
                    }
                  >
                    <img src={plusIcon} alt="" className="h-full" />
                  </button>
                </div>
                <div>
                  Sisa {data.stock} {data.satuan}
                </div>
              </div>
              <div className="flex gap-x-4 h-12 mb-20">
                <button
                  className="h-full w-40 border border-green-600 hover:bg-green-600"
                  onClick={() => {
                    isLogin ? navigate("/cart") : navigate("/login");
                  }}
                >
                  Keranjang
                </button>
                <button
                  className="h-full w-40 border border-green-600 hover:bg-green-600"
                  onClick={() => {
                    isLogin ? navigate("/cart") : navigate("/login");
                  }}
                >
                  Beli
                </button>
                <button className="h-full w-40 border border-green-600">
                  fav
                </button>
              </div>
            </div>
            <div className="w-full h-14 flex tabs">
              <button
                className={`tab tab-bordered h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "DESKRIPSI" ? "tab-active" : null
                }`}
                onClick={() => setTab("DESKRIPSI")}
              >
                Deskripsi
              </button>
              <button
                className={`tab tab-bordered h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "CARAPAKAI" ? "tab-active" : null
                }`}
                onClick={() => setTab("CARAPAKAI")}
              >
                Cara Pakai
              </button>
              <button
                className={`tab tab-bordered h-full w-1/3 flex justify-center items-center z-10 text-base ${
                  tab === "PERINGATAN" ? "tab-active" : null
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
        <div className="w-full border-t-[.5px] border-blackh-20 bg-white flex py-28 relative">
          <div className="absolute left-3 top-10 text-2xl">
            Lorem, ipsum dolor.
          </div>
          {/* <Card /> */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
