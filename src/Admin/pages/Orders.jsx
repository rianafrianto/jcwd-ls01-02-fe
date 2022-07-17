import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchIcon from "../../Assets/search-icon.png";
import Loading from "../../User/Component/Loading";
import API_URL from "../../Helpers/API_URL";
import CardOrderAdmin from "../components/CardOrderAdmin";

function Orders() {
  const params = useParams();
  const { status } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const getOrders = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${API_URL}/admin/orders/${status}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printOrders = (data) => {
    return data.map((val, i) => {
      return <CardOrderAdmin data={val} key={i} />;
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
    getOrders();
    return () => {};
  }, [status, limit, page]);

  return (
    <div className="min-h-screen w-full flex bg-[#f1f5fc]">
      <div className="w-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex h-12 w-full mb-16">
            <div className="w-36 h-12 pt-3 text-center bg-green-500 border">
              Semua Pesanan
            </div>
            <div className="flex w-full justify-end">
              <button className="w-24 h-12 bg-green-500 border">PDF</button>
              <button className="w-24 h-12 bg-green-500 border">EXCEL</button>
            </div>
          </div>
          <div className="flex h-12 mb-9">
            <div className=" w-1/3 h-full ">
              <input
                type="text"
                placeholder="Cari Nama Obat"
                className=" w-full h-full outline outline-neutral-gray outline-1 rounded-lg overflow-hidden focus:outline focus:outline-1 focus:outline-primary :"
              />
            </div>
            <div className="ml-10 w-1/5">
              <input
                name=""
                type="date"
                placeholder="calender"
                className={`field-input h-full `}
              />
            </div>
            <div className="w-1/5 ml-10">
              <select className="select select-primary h-full bg-white rounded-lg">
                <option value="">Urutkan</option>
                <option value="">Terbaru</option>
                <option value="">Sebelumnya</option>
              </select>
            </div>
          </div>
          <div className="flex w-full h-12 mb-9">
            <div className="w-40 pt-3 text-center bg-green-500 border">
              Pilih Semua
            </div>

            {/* <div className="w-32 pt-3 text-center bg-green-500 border">
                Kartu
              </div> */}
            <div className="w-1/5 ml-56 ">
              <select className="field-input w-2/4 h-full bg-white rounded-lg">
                <option value="">5</option>
                <option value="">10</option>
                <option value="">15</option>
              </select>
            </div>
            {/* <div className="w-60 pt-3 text-center bg-green-500 border">
              Paginate
            </div> */}
            <div className="min-w-min h-full border">
              <div className="bg-primary/20 rounded-lg overflow-hidden">
                {loading ? "" : printButtons()}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            {loading ? <Loading className="pt-56" /> : printOrders(data)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
