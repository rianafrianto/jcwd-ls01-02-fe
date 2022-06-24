import React from "react";

function Sales() {
  return (
    <div className="bg-red-500 h-full w-full flex">
      <div className="bg-green-400 w-full h-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex">
            <div>
              <div className="w-60">Laporan Laba dan Rugi</div>
              <div className="w-60">Update</div>
            </div>
            <div className="flex justify-end w-full">
              <div className="w-40">PDF</div>
              <div className="w-40">EXCEL</div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-40">Periode</div>
            <div className="w-40">Bulan</div>
            <div className="w-40">Tahun</div>
          </div>
          <div className="flex w-full">
            <div className="w-40">Dropdown</div>
            <div className="w-40">Dropdown</div>
            <div className="w-40">Dropdown</div>
          </div>
          <div className="bg-blue-400 w-[full] h-[1800px]">
            <div className="w-full text-center">Laporan Laba Dan Rugi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
