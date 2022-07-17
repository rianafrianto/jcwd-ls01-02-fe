import axios from "axios";
import React, { useEffect } from "react";
import API_URL from "../../Helpers/API_URL";

function Statistics() {
  // const data = [
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 1,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 9,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas",
  //     id: 14,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas",
  //     id: 19,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 116,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 117,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 118,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 119,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 120,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 121,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 122,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Keras",
  //     id: 123,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Medical Device & Consumable",
  //     id: 124,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Medical Device & Consumable",
  //     id: 125,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Medical Device & Consumable",
  //     id: 126,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 127,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 128,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 129,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 130,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 131,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 132,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 133,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 134,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 135,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 136,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 137,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 138,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 139,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 140,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 141,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 142,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 143,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 144,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 145,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 146,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 147,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 148,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 149,
  //   },
  //   {
  //     category: "Alat Kesehatan",
  //     golongan: "Lain-lain",
  //     id: 150,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 151,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 152,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 153,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 154,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 155,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 156,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 157,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 158,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 159,
  //   },
  //   {
  //     category: "Perawatan Tubuh",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 160,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 161,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 162,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 163,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 164,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 165,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 166,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 167,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 168,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 169,
  //   },
  //   {
  //     category: "Ibu & Anak",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 170,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 171,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 172,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 173,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 174,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 175,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 176,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 177,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 178,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 179,
  //   },
  //   {
  //     category: "Vitamin & Suplemen",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 180,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 181,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 182,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 183,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 184,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 185,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 186,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 187,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 188,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 189,
  //   },
  //   {
  //     category: "Herbal",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 190,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 191,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 192,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 193,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 194,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 195,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 196,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 197,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 198,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 199,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 200,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 201,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 202,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 203,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 204,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 205,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 206,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 207,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas Terbatas",
  //     id: 208,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas",
  //     id: 211,
  //   },
  //   {
  //     category: "Obat-Obatan",
  //     golongan: "Obat Bebas",
  //     id: 212,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas",
  //     id: 213,
  //   },
  //   {
  //     category: "Nutrisi",
  //     golongan: "Obat Bebas",
  //     id: 218,
  //   },
  // ];

  // const sementara = async () => {
  //   try {
  //     let res = await axios.patch(`${API_URL}/admin/kode`, data);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // sementara();
  }, []);

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
