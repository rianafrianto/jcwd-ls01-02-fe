import React, { useEffect, useState } from "react";
import searchIcon from "../../Assets/search-icon.png";
import { ChevronDownIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import formatToCurrency from "../../Helpers/formatToCurrency";
import Loading from "../../User/Component/Loading";
import ModalAddProduct from "../components/ModalAddProduct";

function Products() {
  const [loading, setLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [golongan, setGolongan] = useState("all");
  const [terms, setTerms] = useState("");
  const [order, setOrder] = useState("ORDER BY p.id ASC");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  function closeModalAdd() {
    setModalAdd(false);
  }

  function openModalAdd() {
    setModalAdd(true);
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/products`, {
        params: { terms, category, golongan, page, limit, order },
      });
      setProducts(res.data.data.products);
      setTotal(res.data.data.total);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printRow = (data) => {
    if (!loading)
      return data.map((val, i) => {
        return (
          <tr key={i} className="w-full h-full text-center border-b">
            <th>{page * limit + i + 1}</th>
            <td>{val.name}</td>
            <td>{val.product_code}</td>
            <td>{val.NIE}</td>
            <td>{val.category}</td>
            <td>{val.golongan}</td>
            <td>{val.stock}</td>
            <td>{val.satuan}</td>
            <td>{formatToCurrency(val.price)}</td>
            <td>{formatToCurrency(val.modal)}</td>
            <td>
              <div className="h-full flex justify-center items-center gap-x-2 px-2">
                <button
                  className="button-primary h-8 w-full"
                  onClick={() => {}}
                >
                  Lihat Detail
                </button>
                <button
                  className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                  onClick={() => {}}
                >
                  <DotsVerticalIcon className="h-5" />
                </button>
              </div>
            </td>
          </tr>
        );
      });
  };

  const printButtons = () => {
    let pages = [];
    let totalPages = Math.ceil(total / limit);
    console.log(totalPages);
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
            }
          }}
        >
          {i + 1}
        </button>
      );
    });
  };

  useEffect(() => {
    getProducts();
    return () => {};
  }, [limit, page]);

  return (
    <>
      <ModalAddProduct modalAdd={modalAdd} closeModalAdd={closeModalAdd} />
      <div className="bg-admin h-full w-full justify-center flex">
        <div className="w-full pt-16 pl-64">
          <div className="w-full px-12 py-8 flex flex-col gap-y-9">
            <div className="w-full h-8 flex justify-between">
              <h1 className="text-xl font-bold">Daftar Obat</h1>
              <div className="flex gap-4">
                <button className="button-outline w-32 h-full">
                  Unduh PDF
                </button>
                <button className="button-outline w-32 h-full">Excel</button>
              </div>
            </div>
            <div className="w-full h-[800px] border shadow-lg rounded-lg overflow-hidden shadow-black/20 p-8 flex flex-col gap-y-9">
              <div className="h-11 w-full flex justify-between">
                <div className="w-full flex gap-x-4">
                  <div className="w-80 flex rounded-lg overflow-hidden border bg-white">
                    <input
                      type="text"
                      className="w-full h-full pl-5 rounded-l-lg focus:border-primary focus:border-2 focus:outline-none"
                      placeholder="Cari nama obat"
                    />
                    <button className="btn-plain h-full object-cover flex rounded-r-lg bg-primary border border-primary">
                      <img
                        src={searchIcon}
                        alt=""
                        className="h-full scale-50"
                      />
                    </button>
                  </div>
                  <select
                    className="h-full w-44 border border-neutral-gray p-2 rounded-lg focus:outline-primary"
                    onChange={(e) => {}}
                  >
                    <option
                      value="ORDER BY name ASC"
                      className="hover:bg-primary"
                    >
                      A-Z
                    </option>
                    <option value="ORDER BY name DESC">Z-A</option>
                    <option value="ORDER BY price ASC">Harga Terendah</option>
                    <option value="ORDER BY price DESC">Harga Tertinggi</option>
                  </select>
                  <select
                    className="h-full w-44 border border-neutral-gray p-2 rounded-lg focus:outline-primary"
                    onChange={(e) => {}}
                  >
                    <option
                      value="ORDER BY name ASC"
                      className="hover:bg-primary"
                    >
                      A-Z
                    </option>
                    <option value="ORDER BY name DESC">Z-A</option>
                    <option value="ORDER BY price ASC">Harga Terendah</option>
                    <option value="ORDER BY price DESC">Harga Tertinggi</option>
                  </select>
                </div>
                <button
                  className="button-primary w-40 h-full"
                  onClick={openModalAdd}
                >
                  Tambah Produk
                </button>
              </div>
              <div className="border w-full" />
              <div className="w-full h-[628px] border flex flex-col">
                <div className="h-[572px] overflow-scroll relative">
                  {loading && (
                    <div className="w-full absolute flex items-center h-full">
                      <Loading className="" />
                    </div>
                  )}
                  <table className="w-full rounded-t-lg overflow-hidden table-fixed table-zebra">
                    <thead className="rounded-t-lg h-12">
                      <tr className="text-center font-normal bg-secondary rounded-t-lg">
                        <th className="font-medium text-white w-12">No</th>
                        <th className="font-medium text-white w-44">
                          Nama Produk
                        </th>
                        <th className="font-medium text-white w-36">
                          No. Produk
                        </th>
                        <th className="font-medium text-white w-36">
                          No. BPOM
                        </th>
                        <th className="font-medium text-white w-32">
                          Kategori
                        </th>
                        <th className="font-medium text-white w-32">
                          Golongan
                        </th>
                        <th className="font-medium text-white w-28">Stok</th>
                        <th className="font-medium text-white w-24">Satuan</th>
                        <th className="font-medium text-white w-40">
                          Nilai Barang
                        </th>
                        <th className="font-medium text-white w-36">
                          Nilai Jual
                        </th>
                        <th className="font-medium text-white w-36">Atur</th>
                      </tr>
                    </thead>
                    <tbody>{printRow(products)}</tbody>
                  </table>
                </div>
                <div className="w-full h-14  flex justify-between items-center px-4 py-3">
                  <span className="">
                    Menampilkan {limit} dari {total} produk
                  </span>
                  <div className="w-56 flex  h-full items-center gap-x-2">
                    Baris per halaman
                    <div className="dropdown dropdown-top dropdown-end">
                      <label
                        tabIndex="0"
                        className="h-full w-20 border border-neutral-gray p-1 rounded-lg focus:outline-primary flex gap-x-5 cursor-pointer"
                      >
                        {limit} <ChevronDownIcon className={`h-5`} />
                      </label>
                      <ul
                        tabIndex="0"
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
                      >
                        <li>
                          <button onClick={() => setLimit(10)}>10</button>
                        </li>
                        <li>
                          <button onClick={() => setLimit(20)}>20</button>
                        </li>
                        <li>
                          <button onClick={() => setLimit(30)}>30</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="min-w-min h-full border">
                    <div className="bg-primary/20 rounded-lg overflow-hidden">
                      {loading ? "" : printButtons()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
