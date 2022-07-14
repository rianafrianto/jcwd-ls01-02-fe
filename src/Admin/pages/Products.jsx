import React, { useState } from "react";
import AddMedicineModal from "../components/AddMedicineModal";
import searchIcon from "../../Assets/search-icon.png";

function Products() {
  const [addMedicineModal, setAddMedicineModal] = useState(false);
  return (
    <>
      {addMedicineModal && (
        <AddMedicineModal
          addMedicineModal={addMedicineModal}
          setAddMedicineModal={setAddMedicineModal}
        />
      )}

      <div className="bg-admin h-full w-full justify-center flex">
        <div className="w-full pt-16 pl-64">
          <div className="w-full px-12 py-8 flex flex-col gap-y-9">
            <div className="w-full h-8 flex justify-between">
              <h1 className="text-xl font-bold">Daftar Obat</h1>
              <div className="flex gap-4">
                <button className="button-outline w-32 h-full">
                  Unduh PDF
                </button>
                <button className="button-outline w-32 h-full">Excel</button>
              </div>
            </div>
            <div className="w-full h-[800px] border shadow-lg rounded-lg overflow-hidden shadow-black/20 p-8 flex flex-col gap-y-9">
              <div className="h-11 w-full flex justify-between">
                <div className="w-full flex gap-x-4">
                  <div className="w-80 flex rounded-lg overflow-hidden border bg-white">
                    <input
                      type="text"
                      className="w-full h-full pl-5 rounded-l-lg focus:border-primary focus:border-2 focus:outline-none"
                      placeholder="Cari nama obat"
                    />
                    <button className="btn-plain h-full object-cover flex rounded-r-lg bg-primary border border-primary">
                      <img
                        src={searchIcon}
                        alt=""
                        className="h-full scale-50"
                      />
                    </button>
                  </div>
                  <select
                    className="h-full w-44 border border-neutral-gray p-2 rounded-lg focus:outline-primary"
                    onChange={(e) => {}}
                  >
                    <option
                      value="ORDER BY name ASC"
                      className="hover:bg-primary"
                    >
                      A-Z
                    </option>
                    <option value="ORDER BY name DESC">Z-A</option>
                    <option value="ORDER BY price ASC">Harga Terendah</option>
                    <option value="ORDER BY price DESC">Harga Tertinggi</option>
                  </select>
                </div>
                <button
                  className="button-primary w-40 h-full"
                  onClick={() => {
                    setAddMedicineModal(true);
                  }}
                >
                  Tambah obat
                </button>
              </div>
              <div className="border w-full" />
              <div className="w-full h-[628px] border flex flex-col">
                <div className="flex-grow">Table</div>
                <div className="w-full h-16 border flex justify-between items-center px-4">
                  <span className="w-full">
                    Lorem ipsum dolor sit amet consectetur.
                  </span>
                  <div className="w-56"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
