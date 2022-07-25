import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Component/Card";
import FilterLeftBar from "../Component/FilterLeftBar";
import Loading from "../Component/Loading";
import API_URL from "../Helpers/API_URL";
import { printCategory } from "../Helpers/categoryList";

function Search() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [order, setOrder] = useState("ORDER BY name ASC");
  const [page, setPage] = useState(0);
  const params = useParams();
  let { category } = params;
  const limit = 24;

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      category = category.split("_").join(" ");
      if (category === "all") {
        category = "semua";
      }
      let res = await axios.get(
        `${API_URL}/product/products/${category}?order=${order}&page=${page}&limit=${limit}`
      );
      const { data } = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [order, page, category]);

  const printProducts = () => {
    if (loadingProducts) {
      return <Loading className="pt-28 h-full" />;
    }
    return (
      <div className="w-full h-full container grid grid-cols-2 2xl:grid-cols-4 md:grid-cols-3  gap-3 lg:gap-x-10 lg:gap-y-6">
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
          className={`btn-plain px-5 py-2 ${page === i ? "bg-primary" : ""}`}
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
          <div className="text-md breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="text-primary font-bold">
                {printCategory(category)}
              </li>
            </ul>
          </div>
          <div className="w-full mt-9 flex gap-x-12">
            <div className="w-full h-fullflex flex-col">
              <div className="w-full mt-9 flex gap-x-12">
                <FilterLeftBar category={category} />
                <div className="w-full h-full flex flex-col gap-y-5">
                  <div className="h-11 text-3xl font-bold text-secondary">
                    {category && category === "all"
                      ? `${printCategory(category)} Kategori`
                      : printCategory(category)}
                  </div>
                  <div className="w-full border-b border-neutral-gray" />
                  <div className="w-full h-9 mt-2 mb-2 flex justify-between items-center">
                    <div>
                      {products[0]?.total} Produk{" "}
                      {category && category === "all"
                        ? ""
                        : `di ${printCategory(category)}`}
                    </div>
                    <div className="hidden lg:flex gap-x-4 items-center">
                      <div>Urutkan</div>
                      <select
                        className="select select-primary h-full w-44 border border-neutral-gray p-2 rounded-lg"
                        value={order}
                        onChange={(e) => {
                          setOrder(e.target.value);
                          setPage(0);
                        }}
                      >
                        <option
                          value="ORDER BY name ASC"
                          className="hover:bg-primary"
                        >
                          A-Z
                        </option>
                        <option value="ORDER BY name DESC">Z-A</option>
                        <option value="ORDER BY price ASC">
                          Harga Terendah
                        </option>
                        <option value="ORDER BY price DESC">
                          Harga Tertinggi
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full h-full bg-white">
                    {printProducts()}
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary/20 rounded-lg overflow-hidden">
                      {printButton()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
