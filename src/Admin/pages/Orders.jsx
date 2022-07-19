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

  useEffect(() => {
    setSinceDate("");
    setToDate("");
    setTerms("");
    getOrders();
  }, [status]);

  useEffect(() => {
    if (sinceDate || toDate) getOrders();
  }, [sinceDate, toDate]);

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
                  className="filter-search-bar"
                  placeholder="Nama Pelanggan / No. Transaksi"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") getOrders();
                  }}
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
            <div className="w-60 pt-3 text-center bg-green-500 border">
              Paginate
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
