import React from "react";

function Orders() {
  return (
    <div className="bg-red-500 h-full w-full flex">
      <div className="bg-green-400 w-full h-full pt-16 pl-64">
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
          <div className="flex w-full h-12 mb-9">
            <div className="w-56 pt-3 text-center bg-green-500 border">
              Cari Nama Obat
            </div>
            <div className="w-32 pt-3 text-center bg-green-500 border">
              Filter
            </div>
            <div className="w-32 pt-3 text-center bg-green-500 border">
              Urutkan
            </div>
          </div>
          <div className="flex w-full h-12 mb-9">
            <div className="w-40 pt-3 text-center bg-green-500 border">
              Pilih Semua
            </div>
            <div className="flex justify-end w-full">
              <div className="w-32 pt-3 text-center bg-green-500 border">
                Kartu
              </div>
              <div className="w-60 pt-3 text-center bg-green-500 border">
                Paginate
              </div>
            </div>
          </div>
          <div className="w-full h-full border bg-white mb-6">
            <div className="flex h-16 pl-6 mb-4 mt-4">
              <div className="w-36 text-center border bg-green-500 pt-4">
                Pesanan selesai
              </div>
              <div className="w-36 text-center border bg-green-500 pt-4">
                Kode Obat
              </div>
              <div className="w-36 text-center border bg-green-500 pt-4">
                Date Time
              </div>
            </div>
            <div className="text-center border bg-red-300 mb-5">Baris</div>
            <div className="flex pl-6 mb-4">
              <div className="w-64 h-36 border pt-14 text-center bg-green-500">
                Obat
              </div>
              <div className="w-64 h-36 border pt-14 text-center bg-green-500">
                Pembeli
              </div>
              <div className="w-64 h-36 border pt-14 text-center bg-green-500">
                Alamat
              </div>
              <div className="w-64 h-36 border pt-14 text-center bg-green-500">
                Kurir
              </div>
            </div>
            <div className="flex justify-between h-12 bg-red-300 pl-6 mb-7">
              <div className="w-52 border pt-3 text-center bg-green-500">
                Total Harga
              </div>
              <div className="w-52 border pt-3 text-center mr-6 bg-green-500">
                Price
              </div>
            </div>
            <div className="flex h-12 pl-6 mb-7">
              <div className="w-44 border pt-3 text-center bg-green-500">
                Chat Pembeli
              </div>
              <div className="w-44 border pt-3 text-center ml-8 bg-green-500">
                Detail Pesanan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
