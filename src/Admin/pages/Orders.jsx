import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchIcon from "../../Assets/search-icon.png";
import Loading from "../../User/Component/Loading";
import API_URL from "../../Helpers/API_URL";
import CardOrderAdmin from "../components/CardOrderAdmin";
import { SearchIcon } from "@heroicons/react/outline";

function Orders() {
  const params = useParams();
  const { status } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [terms, setTerms] = useState("");
  const [sinceDate, setSinceDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getOrders = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${API_URL}/admin/orders/${status}`, {
        params: { terms, sinceDate, toDate },
      });
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
    setSinceDate("");
    setToDate("");
    setTerms("");
    getOrders();
    return () => {};
  }, [status, limit, page]);

  useEffect(() => {
    if (sinceDate || toDate) getOrders();
  }, [sinceDate, toDate]);

  console.log(sinceDate);
  return (
    <div className="min-h-screen w-full flex bg-[#f1f5fc]">
      <div className="w-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex h-12 w-full mb-16">
            <div className="w-36 h-12 pt-3 text-center bg-green-500 border">
              {`${
                status === "all" ? "Semua" : status.split("-").join(" ")
              } Transaksi`}
            </div>
            <div className="flex w-full justify-end">
              <button className="w-24 h-12 bg-green-500 border">PDF</button>
              <button className="w-24 h-12 bg-green-500 border">EXCEL</button>
            </div>
          </div>
          <div className="flex h-full mb-9 items-end gap-x-5">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="terms">Cari Nama Pelanggan / No. Transaksi</label>
              <div className="w-80 flex h-10 rounded-lg overflow-hidden border bg-white">
                <input
                  type="text"
                  name="terms"
                  id="terms"
                  className="w-full h-full pl-5 rounded-l-lg focus:border-primary focus:border-2 focus:outline-none"
                  placeholder="Nama Pelanggan / No. Transaksi"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                />
                <button
                  className="btn-plain h-full object-cover flex rounded-r-lg bg-primary border border-primary"
                  onClick={() => {
                    if (terms !== "") {
                      // setPage(0);
                      getOrders();
                    }
                  }}
                >
                  <SearchIcon className="h-full scale-50 text-white" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-2 w-1/6">
              <label htmlFor="sinceDate">Dari Tanggal</label>
              <input
                name="sinceDate"
                type="date"
                placeholder="calender"
                className={`field-input h-10`}
                value={sinceDate}
                onChange={(e) => setSinceDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2 w-1/6">
              <label htmlFor="toDate">Sampai Tanggal</label>
              <input
                name="toDate"
                type="date"
                placeholder="calender"
                className={`field-input h-10`}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
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
