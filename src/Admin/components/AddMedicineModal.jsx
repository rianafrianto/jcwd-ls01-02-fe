import React, { useState } from "react";
import AddMedicineModalNext from "./AddMedicineModalNext";

function AddMedicineModal({ addMedicineModal, setAddMedicineModal }) {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div
      className="h-screen w-screen top-0 fixed bg-black/30 flex justify-center items-center"
      onClick={(e) => {
        setAddMedicineModal(false);
        console.log("bg close");
      }}
    >
      <div
        className="h-96 aspect-square bg-white flex flex-col p-7 gap-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/6 flex items-center border-black border">
          <div className="flex w-full justify-between">
            <div className="h-6 border-gray-700 flex items-center justify-center w-28">
              Tambah Obat
            </div>
            <button
              className="aspect-square w-5 flex justify-center"
              onClick={() => setAddMedicineModal(false)}
            >
              x
            </button>
          </div>
        </div>
        <div className="h-4/6 border-black border">content</div>
        <div className="h-1/6 border-black border flex justify-end">
          <button
            className="border border-green-500 hover:bg-green-500 w-32"
            onClick={() => setIsToggled(!isToggled)}
          >
            Lanjutkan
            {isToggled && <AddMedicineModalNext />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMedicineModal;
