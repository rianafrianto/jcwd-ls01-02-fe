import React from "react";

function Statistics() {
  return (
    <div className="bg-red-500 h-full w-full flex">
      <div className="bg-green-400 w-full h-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex h-8 w-full">
            <div className="w-60 pt-1 text-center border mb-1">
              Ringkasan Statistik
            </div>
            <div className="flex justify-end w-full">
              <div className="w-40 pt-1 text-center border">Filter</div>
            </div>
          </div>
          <div className="border w-52 h-8 mb-4">Update Terakhir</div>
          <div className="flex h-32">
            <div className="flex text-center justify-between w-full mb-8">
              <div className="w-40 pt-8 border">Pesanan Baru</div>
              <div className="w-40 pt-8 border">Siap Dikirim</div>
              <div className="w-40 pt-8 border">Sedang Dikirim</div>
              <div className="w-40 pt-8 border">Selesai</div>
              <div className="w-40 pt-8 border">Dibatalkan</div>
              <div className="w-40 pt-8 border">Chat Baru</div>
            </div>
          </div>
          <div className="bg-red-300 h-full w-full">
            <div className="bg-green-600 h-full w-full mt-8 mb-8">
              <div className="flex justify-between pt-8">
                <div className="w-full flex justify-between">
                  <div className="w-40 h-10 pt-2 text-center border">
                    Penjualan Obat
                  </div>
                  <div className="w-40 h-10 pt-2 text-center border">
                    Filter
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-full h-80 border">Grafik</div>
                <div className="flex flex-col">
                  <div className="h-1/2 w-96 pt-12 text-center border">
                    Rata Rata
                  </div>
                  <div className="h-1/2 w-96 pt-12 text-center border">
                    Keterangan
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2 h-[283px] border pt-32 text-center">
              Tren Pendapatan
            </div>
            <div className="w-1/2 h-[283px] border pt-32 text-center">
              Tren Pembatalan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
