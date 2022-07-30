import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { categoryList, printCategory } from "../../Helpers/categoryList";

function FilterLeftBar(props) {
  const { category, setPage, setOrder, setOrderShow } = props;
  const navigate = useNavigate();
  const [catDisclosure, setCatDisclosure] = useState(true);
  const catList = [
    { cardText: "Semua Produk", cardPath: "all" },
    ...categoryList,
  ];
  return (
    <div className="hidden xl:flex flex-col w-72 gap-y-8">
      <div
        className={`${
          catDisclosure ? "h-[308px]" : "h-[84px]"
        } duration-300 relative w-full bg-white p-5 rounded-xl shadow-custom border cursor-pointer`}
        onClick={() => {
          setCatDisclosure(!catDisclosure);
        }}
      >
        <div className="w-full text-xl font-semibold p-2 flex justify-between items-center">
          Kategori
          <ChevronDownIcon
            className={`h-5 duration-300 ${catDisclosure ? "rotate-180" : ""}`}
          />
        </div>
        <div
          className={`w-[186px] flex flex-col duration-300 absolute ${
            catDisclosure ? "z-0" : "-translate-y-full -z-10"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {catList.map((val, i) => {
            return (
              <button
                className={`button-general w-full h-6 justify-start outline-0 mb-1 hover:text-primary hover:font-semibold ${
                  printCategory(category) === val.cardText
                    ? "font-semibold text-primary"
                    : ""
                } ${
                  category === val.cardPath ? "font-semibold text-primary" : ""
                }`}
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setPage(0);
                  setOrder("ORDER BY name ASC");
                  setOrderShow("A-Z");
                  navigate(`/category/${val.cardPath}`);
                }}
              >
                {val.cardText}
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-[1415px] bg-white border shadow-custom py-6 rounded-xl">
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
