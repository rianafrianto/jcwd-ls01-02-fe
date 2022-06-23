import React from "react";

function Kas() {
  return (
    <div className="bg-red-500 h-full w-full flex">
      <div className="bg-green-400 w-full h-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex mb-14">
            <div className="w-40">Buku Kas</div>
            <div className="flex justify-end w-full">
              <div className="w-40">PDF</div>
              <div className="w-40">EXCEL</div>
            </div>
          </div>
          <div className="bg-white w-full h-[800px]">
            <div className="flex">
              <div className="w-40">Akun Kas</div>
              <div className="w-40">Tanggal</div>
            </div>
            <div className="flex">
              <div className="w-40">No Rekening</div>
              <div className="w-40">Dropdown</div>
              <div className="w-72">Search</div>
            </div>
            <div className="w-full bg-red-500 h-[728px]">GRAFIK</div>
            <div className="flex justify-between">
              <div className="w-40">Total Data</div>
              <div className="w-40">Baris</div>
              <div className="w-40">Paginate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kas;
