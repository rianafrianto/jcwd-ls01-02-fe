import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Component/Card";
import API_URL from "../Helpers/API_URL";

function Products() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      let res = await axios.get(`${API_URL}/product/products/obat`);
      console.log(res);
      const { data } = res.data;
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // setTimeout(() => {
    //   let fetchedProducts = [];
    //   for (let i = 0; i < 20; i++) {
    //     fetchedProducts.push("");
    //   }

    //   setProducts(fetchedProducts);
    //   setLoadingProducts(false);
    // }, 1000);
  }, []);

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
  return (
    <div className="h-full w-full pt-20">
      <div className="h-10 w-60 border border-green-800 fixed flex bottom-20 left-1/2 -translate-x-1/2 z-50 rounded-lg overflow-hidden">
        <button className="h-full w-1/2 bg-green-600">sort</button>
        <button className="h-full w-1/2 bg-green-600">filter</button>
      </div>
      <div className="h-full w-ful bg-green-200 flex justify-center relative">
        <div className="container h-full flex flex-col px-6 lg:px-24 py-11">
          Products
          <div className="w-full mt-9 border border-white flex gap-x-12">
            <div className="hidden lg:flex flex-col w-72 gap-y-8">
              <div className="h-72 w-full bg-white">kategori</div>
              <div className="h-[1415px] w-full bg-white">filter</div>
            </div>
            <div className="w-full h-full border border-putih flex flex-col">
              <div className="h-11">Obat</div>
              <div className="w-full border border-black" />
              <div className="w-full h-9 mt-6 mb-9 flex justify-between items-center">
                <div>Total items</div>
                <div className="hidden lg:flex gap-x-4">
                  <div>Urutkan</div>
                  <select className="h-full w-36 border border-white" />
                </div>
              </div>
              <div className="w-full h-full bg-white">{printProducts()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
