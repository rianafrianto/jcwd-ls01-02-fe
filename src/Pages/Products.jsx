import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Component/Card";
import API_URL from "../Helpers/API_URL";

function Products() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [order, setOrder] = useState("ORDER BY name ASC");
  const [page, setPage] = useState(0);
  const params = useParams();
  let { category } = params;

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      category = category.split("_").join(" ");
      let res = await axios.get(
        `${API_URL}/product/products/${category}?order=${order}&page=${page}`
      );
      console.log(res.data);
      const { data } = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [order, page]);

  const printProducts = () => {
    if (loadingProducts) {
      return (
        <div className="h-96 w-full flex items-center justify-center text-3xl">
          LOADING...
        </div>
      );
    }
    return (
      <div className="w-full h-full container grid grid-cols-2 2xl:grid-cols-4 md:grid-cols-3  gap-3 lg:gap-x-4 lg:gap-y-6">
        {products.map((val, i) => {
          return <Card key={i} data={val} />;
        })}
      </div>
    );
  };

  const printButton = () => {
    const limit = 24;
    let pages = [];
    let totalPages = Math.ceil(products[0]?.total / limit);
    for (let i = 0; i < totalPages; i++) {
      pages.push("");
    }
    return pages.map((val, i) => {
      return (
        <button
          key={i}
          className={`btn ${page === i ? "btn-active bg-primary" : ""}`}
          onClick={async () => {
            if (page !== i) {
              setPage(i);
              window.scrollTo(0, 0);
            }
          }}
        >
          {i + 1}
        </button>
      );
    });
  };
  return (
    <div className="h-full w-full pt-20">
      <div className="h-10 w-60 lg:hidden border border-green-800 fixed flex bottom-20 left-1/2 -translate-x-1/2 z-50 rounded-lg overflow-hidden">
        <button className="h-full w-1/2 bg-primary">sort</button>
        <button className="h-full w-1/2 bg-primary">filter</button>
      </div>
      <div className="h-full w-ful bg-white flex justify-center relative">
        <div className="container h-full flex flex-col px-6 lg:px-24 py-11">
          Products
          <div className="w-full mt-9 border border-white flex gap-x-12">
            <div className="hidden lg:flex flex-col w-72 gap-y-8">
              <div className="h-72 w-full bg-white py-6 px-7 rounded-xl">
                <div className="text-xl font-semibold pb-3">Katagori</div>
                <div className="flex-col flex">
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Obat Obatan
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Nutrisi
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Herbal
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Vitamin & Suplemen
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Alat Kesehatan
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Perawatan Tubuh
                  </button>
                  <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
                    Ibu & Anak
                  </button>
                </div>
              </div>
              <div className="h-[1415px] bg-white border border-orange-700 py-6 rounded-xl">
                <div className="flex justify-center mb-5">
                  <button className="w-48 h-12 rounded-md bg-gray-400 text-white font-bold text-sm hover:bg-gray-500">
                    Hapus Semua Filter
                  </button>
                </div>
                <div className="outline outline-gray-400"></div>
                <div className="pt-7 pb-4 text-xl font-semibold px-7">
                  Keluhan
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Flu & Batuk</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Demam</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Imun Booster</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Seksual</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Mata & Mulut</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Obat Diare</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Pelancar BAB</div>
                </div>
                <div className="flex w-full px-7 pb-3">
                  <input type="checkbox" />
                  <div className="px-3">Sakit Gigi</div>
                </div>
                <button className="px-7 text-sm text-teal-500 pb-7 hover:text-teal-800">
                  Lihat Lebih Lengkap
                </button>
                <div className="outline outline-gray-400"></div>
              </div>
            </div>
            <div className="w-full h-full border border-white flex flex-col">
          <div className="w-full mt-9 border border-primary flex gap-x-12">
            <div className="hidden xl:flex flex-col w-72 gap-y-8">
              <div className="h-72 w-full bg-primary">kategori</div>
              <div className="h-[1415px] w-full bg-primary">filter</div>
            </div>
            <div className="w-full h-full border border-putih flex flex-col gap-y-5">
              <div className="h-11">Obat</div>
              <div className="w-full border border-black" />
              <div className="w-full h-9 mt-6 mb-9 flex justify-between items-center">
                <div>Total {products[0]?.total} items</div>
                <div className="hidden lg:flex gap-x-4">
                  <div>Urutkan</div>
                  <select
                    className="h-full w-36 border border-white"
                    value={order}
                    onChange={(e) => {
                      setOrder(e.target.value);
                      setPage(0);
                    }}
                  >
                    <option value="ORDER BY name ASC">A-Z</option>
                    <option value="ORDER BY name DESC">Z-A</option>
                    <option value="ORDER BY price ASC">Harga Terendah</option>
                    <option value="ORDER BY price DESC">Harga Tertinggi</option>
                  </select>
                </div>
              </div>
              <div className="w-full h-full bg-white">{printProducts()}</div>
              <div className="flex justify-end px-7">
                <div className="btn-group">{printButton()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
