import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import formatToCurrency from "../../Helpers/formatToCurrency";
import Loading from "../../User/Component/Loading";
import ModalAddProduct from "../components/ModalAddProduct";
import { categoryList, golonganList } from "../../Helpers/categoryList";
import PopoverProduct from "../components/PopoverProduct";
import ModalEditProduct from "../components/ModalEditProduct";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

function Products() {
  const [loading, setLoading] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [golongan, setGolongan] = useState("all");
  const [terms, setTerms] = useState("");
  const [order, setOrder] = useState("ORDER BY p.id ASC");
  let [page, setPage] = useState(0);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  console.log({ page });
  function closeModalAdd() {
    setModalAdd(false);
  }
  console.log({ editId });

  function openModalAdd() {
    setModalAdd(true);
  }
  function closeModalEdit() {
    setModalEdit(false);
  }

  function openModalEdit() {
    setModalEdit(true);
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/products`, {
        params: { terms, category, golongan, page, limit, order },
      });
      console.log(res.data.data.products[0]);
      setProducts(res.data.data.products);
      setTotal(res.data.data.total);
      setTotalPages(() => Math.ceil(res.data.data.total / limit));
      setMinPage(0);
      setMaxPage(() => {
        if (totalPages > 5) return 4;
        return totalPages - 1;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setTerms("");
    setCategory("all");
    setGolongan("all");
  };
  let newListCat = categoryList.map((val, i) => {
    return { content: val.cardText, value: `${i + 1}` };
  });
  const listCat = [{ content: "Semua", value: "all" }, ...newListCat];
  const listGol = [{ content: "Semua", value: "all" }, ...golonganList];

  const printRow = (data) => {
    if (!loading)
      return data.map((val, i) => {
        return (
          <tr key={i} className="w-full h-full text-center">
            <th>{page * limit + i + 1}</th>
            <td>{val.name}</td>
            <td>{val.no_produk}</td>
            <td>{val.NIE}</td>
            <td>{val.category}</td>
            <td>{val.golongan}</td>
            <td>{val.stock}</td>
            <td>{val.satuan}</td>
            <td>{formatToCurrency(val.price)}</td>
            <td>{formatToCurrency(val.modal)}</td>
            <td>
              <div className="h-full flex justify-center items-center gap-x-2 px-2 py-2">
                <button
                  className="button-primary h-8 w-full"
                  onClick={() => {}}
                >
                  Lihat Detail
                </button>
                <PopoverProduct
                  openModalEdit={openModalEdit}
                  id={val.id}
                  setEditId={setEditId}
                />
              </div>
            </td>
          </tr>
        );
      });
  };

  const printButtons = () => {
    let pages = [];
    let buttonsTotal = totalPages;
    for (let i = 0; i < buttonsTotal; i++) {
      pages.push("");
    }
    console.log({ buttonsTotal });
    // let startIndex;
    // if (total - maxPage - page + 1 >= 0) {
    //   startIndex = page;
    //   startIndex--;
    // } else {
    //   startIndex = totalPages - 5;
    // }

    return pages.map((val, i) => {
      // startIndex++;
      return (
        <button
          key={i}
          className={`btn-plain h-8 aspect-square rounded-full ${
            page === i ? "bg-primary text-white" : ""
          }`}
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
  }, [limit, page, category, golongan]);

  return (
    <>
      <ModalAddProduct modalAdd={modalAdd} closeModalAdd={closeModalAdd} />
      <ModalEditProduct
        modalEdit={modalEdit}
        closeModalEdit={closeModalEdit}
        editId={editId}
      />
      <div className="bg-admin h-full w-full justify-center flex">
        <div className="w-full pt-16 pl-64">
          <div className="w-full px-12 py-8 flex flex-col gap-y-9">
            <div className="w-full h-8 flex justify-between">
              <h1 className="text-xl font-bold text-secondary">Daftar Obat</h1>
              <div className="flex gap-4">
                <button className="button-outline w-32 h-full">
                  Unduh PDF
                </button>
                <button className="button-outline w-32 h-full">Excel</button>
              </div>
            </div>
            <div className="w-full h-[800px] border shadow-lg rounded-lg overflow-hidden shadow-black/20 p-8 flex flex-col gap-y-5">
              <div className="h-20 w-full flex justify-between items-end">
                <div className="w-full flex gap-x-4 items-end">
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="terms">Cari Nama Obat</label>
                    <div className="w-80 flex h-10 rounded-lg overflow-hidden border bg-white">
                      <input
                        type="text"
                        name="terms"
                        id="terms"
                        className="w-full h-full pl-5 rounded-l-lg focus:border-primary focus:border-2 focus:outline-none"
                        placeholder="Masukkan Nama Obat"
                        value={terms}
                        onChange={(e) => setTerms(e.target.value)}
                      />
                      <button
                        className="btn-plain h-full object-cover flex rounded-r-lg bg-primary border border-primary"
                        onClick={() => {
                          if (terms !== "") {
                            setPage(0);
                            getProducts();
                          }
                        }}
                      >
                        <SearchIcon className="h-full scale-50 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="category">Kategori</label>
                    <select
                      className="h-full w-44 border border-neutral-gray p-2 rounded-lg focus:outline-primary cursor-pointer"
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setPage(0);
                      }}
                    >
                      {listCat.map((val, i) => {
                        return (
                          <option
                            key={i}
                            value={val.value}
                            defaultValue={i === 0}
                          >
                            {val.content}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label htmlFor="golongan">Golongan</label>
                    <select
                      className="h-full w-44 border border-neutral-gray p-2 rounded-lg focus:outline-primary cursor-pointer"
                      name="golongan"
                      id="golongan"
                      value={golongan}
                      onChange={(e) => {
                        setGolongan(e.target.value);
                        setPage(0);
                      }}
                    >
                      {listGol.map((val, i) => {
                        return (
                          <option
                            key={i}
                            value={val.value}
                            defaultValue={i === 0}
                          >
                            {val.content}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    className="button-outline px-3 h-9"
                    onClick={resetFilter}
                  >
                    Reset
                  </button>
                </div>
                <button
                  className="button-primary w-40 h-9"
                  onClick={openModalAdd}
                >
                  Tambah Produk
                </button>
              </div>
              <div className="w-full" />
              <div className="w-full h-[628px] flex flex-col">
                <div className="h-[572px] border-l overflow-scroll relative">
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
                    <Popover className="relative">
                      {({ open, close }) => (
                        <>
                          <Popover.Button className="h-full w-20 border border-neutral-gray p-1 rounded-lg focus:outline-primary flex gap-x-5 cursor-pointer">
                            {limit} <ChevronDownIcon className={`h-5`} />
                          </Popover.Button>
                          <AnimatePresence>
                            {open && (
                              <Popover.Panel
                                as={motion.div}
                                static
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="absolute bottom-9 z-10 bg-putih rounded focus:outline-none shadow-xl shadow-black/20 bg-white overflow-hidden flex flex-col w-20"
                              >
                                <button
                                  className="btn-plain py-2 hover:bg-neutral-gray"
                                  onClick={() => {
                                    setPage(0);
                                    setLimit(30);
                                    close();
                                  }}
                                >
                                  30
                                </button>
                                <button
                                  className="btn-plain py-2 hover:bg-neutral-gray"
                                  onClick={() => {
                                    setPage(0);
                                    setLimit(20);
                                    close();
                                  }}
                                >
                                  20
                                </button>
                                <button
                                  className="btn-plain py-2 hover:bg-neutral-gray"
                                  onClick={() => {
                                    setPage(0);
                                    setLimit(10);
                                    close();
                                  }}
                                >
                                  10
                                </button>
                              </Popover.Panel>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </Popover>
                  </div>
                  <div className="h-8 min-w-min flex items-center gap-x-2">
                    <button
                      className="button-outline h-7 aspect-square rounded-full"
                      onClick={() => setPage(0)}
                    >
                      <ChevronDoubleLeftIcon className="h-5" />
                    </button>
                    <button
                      className="button-primary h-full aspect-square rounded-full"
                      disabled={page === minPage}
                      onClick={() => setPage((prev) => prev - 1)}
                    >
                      <ChevronLeftIcon className="h-7" />
                    </button>
                    <div className="h-full w-full flex gap-x-2">
                      {loading && !total ? (
                        <div className="w-[250px] h-full rounded-lg bg-neutral-gray button-loading flex justify-center items-center">
                          Loading ...
                        </div>
                      ) : (
                        printButtons()
                      )}
                    </div>

                    <button
                      className="button-primary h-full aspect-square rounded-full"
                      disabled={page === totalPages - 1}
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      <ChevronRightIcon className="h-7" />
                    </button>
                    <button
                      className="button-outline h-7 aspect-square rounded-full"
                      onClick={() => setPage(totalPages - 1)}
                    >
                      <ChevronDoubleRightIcon className="h-5" />
                    </button>
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
