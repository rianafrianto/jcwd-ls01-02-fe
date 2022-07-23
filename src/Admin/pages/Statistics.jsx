import axios from "axios";
import React, { useEffect } from "react";
import API_URL from "../../Helpers/API_URL";

function Statistics() {
  // const data = [
  //   {
  //     product_id: 9,
  //     tgl_kadaluarsa: "2023-02-15",
  //     stock: 30,
  //   },
  //   {
  //     product_id: 14,
  //     tgl_kadaluarsa: "2023-06-20",
  //     stock: 30,
  //   },
  //   {
  //     product_id: 19,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 30,
  //   },
  //   {
  //     product_id: 116,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 117,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 118,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 119,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 120,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 121,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 122,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 123,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 124,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 125,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 126,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 127,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 128,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 129,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 130,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 131,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 132,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 133,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 134,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 135,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 136,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 137,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 138,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 139,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 140,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 141,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 142,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 143,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 144,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 145,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 146,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 147,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 148,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 149,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 150,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 151,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 152,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 153,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 154,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 155,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 156,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 157,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 158,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 159,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 160,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 161,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 162,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 163,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 164,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 165,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 166,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 167,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 168,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 169,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 170,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 171,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 172,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 173,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 174,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 175,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 176,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 177,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 178,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 179,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 180,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 181,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 182,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 183,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 184,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 185,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 186,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 187,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 188,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 189,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 190,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 191,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 192,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 193,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 194,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 195,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 196,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 197,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 198,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 199,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 200,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 201,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 202,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 203,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 204,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 205,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 206,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 207,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 208,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 100,
  //   },
  //   {
  //     product_id: 211,
  //     tgl_kadaluarsa: "2023-02-01",
  //     stock: 123,
  //   },
  //   {
  //     product_id: 212,
  //     tgl_kadaluarsa: "2024-03-06",
  //     stock: 123,
  //   },
  //   {
  //     product_id: 213,
  //     tgl_kadaluarsa: "2023-10-17",
  //     stock: 123,
  //   },
  //   {
  //     product_id: 218,
  //     tgl_kadaluarsa: "2024-07-10",
  //     stock: 99999,
  //   },
  //   {
  //     product_id: 226,
  //     tgl_kadaluarsa: "2023-06-08",
  //     stock: 100,
  //   },
  // ];

  // const sementara = async () => {
  //   try {
  //     let res = await axios.post(`${API_URL}/admin/stok`, data);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   sementara();
  // }, []);

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
