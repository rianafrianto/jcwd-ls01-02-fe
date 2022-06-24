import React from "react";

function Dashboard() {
  return (
    <div className="bg-red-500 h-screen w-full justify-center flex">
      <div className="bg-green-400 h-full w-screen pt-16 pl-64">
        <div className="py-8 px-12 h-full w-full">
          <div className="mb-8">
            <div className="border w-full mb-4">
              <div className="border w-56">Analisis Produk Toko</div>
              <div className="border w-56">Update</div>
            </div>
            <div className="flex justify-between h-32">
              <div className="w-64 bg-green-600 border">PROFIT</div>
              <div className="w-64 bg-green-600 border">TOTAL PEMESANAN</div>
              <div className="w-64 bg-green-600 border">SISA STOCK</div>
            </div>
          </div>
          <div className="flex mb-8">
            <div className="w-1/2 h-54">
              <div className="mb-4">
                <div className="border">PENTING HARI INI</div>
                <div className="border">TEXT</div>
              </div>
              <div className="flex justify-between h-24 border">
                <div className="w-40 bg-green-600 border">PESANAN BARU</div>
                <div className="w-40 bg-green-600 border">SIAP DIKIRIM</div>
                <div className="w-40 bg-green-600 border">SEDANG DIKIRIM</div>
              </div>
              <div className="flex justify-between h-24 mt-4 border">
                <div className="w-40 bg-green-600 border">SELESAI</div>
                <div className="w-40 bg-green-600 border">DIBATALKAN</div>
                <div className="w-40 bg-green-600 border">CHAT BARU</div>
              </div>
            </div>
            <div className="w-1/2 h-54">
              <div className="mb-4">
                <div className="border">KADALUWARSA OBAT</div>
                <div className="border">TEXT</div>
              </div>
              <div className="w-full">
                <div className="h-52 bg-green-600 border">
                  BORDER KADALUWARSA
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="bg-green-600 w-96 h-[283px] border">GRAFIK</div>
            <div className="bg-green-600 w-96 h-[283px] border">GRAFIK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
