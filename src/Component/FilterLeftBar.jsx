import React from "react";

function FilterLeftBar() {
  return (
    <div className="hidden xl:flex flex-col w-72 gap-y-8">
      <div className="h-72 w-full bg-white py-6 px-7 rounded-xl">
        <div className="text-xl font-semibold pb-3">Katagori</div>
        <div className="flex-col flex">
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Obat Obatan
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Nutrisi
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Herbal
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Vitamin & Suplemen
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Alat Kesehatan
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Perawatan Tubuh
          </button>
          <button className="text-left w-48 mb-1 hover:text-teal-500 hover:font-semibold">
            Ibu & Anak
          </button>
        </div>
      </div>
      <div className="h-[1415px] bg-white border border-orange-700 py-6 rounded-xl">
        <div className="flex justify-center mb-5">
          <button className="w-48 h-12 rounded-md bg-gray-400 text-white font-bold text-sm hover:bg-gray-500">
            Hapus Semua Filter
          </button>
        </div>
        <div className="outline outline-gray-400"></div>
        <div className="pt-7 pb-4 text-xl font-semibold px-7">Keluhan</div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Flu & Batuk</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Demam</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Imun Booster</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Seksual</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Mata & Mulut</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Obat Diare</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Pelancar BAB</div>
        </div>
        <div className="flex w-full px-7 pb-3">
          <input type="checkbox" />
          <div className="px-3">Sakit Gigi</div>
        </div>
        <button className="px-7 text-sm text-teal-500 pb-7 hover:text-teal-800">
          Lihat Lebih Lengkap
        </button>
        <div className="outline outline-gray-400"></div>
      </div>
    </div>
  );
}

export default FilterLeftBar;
