import React from "react";

function AddMedicineModalNext() {
  return (
    <div
      className="h-screen w-screen top-0 fixed bg-black/30 flex justify-center items-center"
      onClick={(e) => {
        console.log("bg close");
      }}
    >
      <div
        className="h-96 aspect-square bg-white flex flex-col p-7 gap-y-7 justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/6 flex items-center border-black border">
          <div className="flex w-full justify-between">
            <div className="h-6 border-gray-700 flex items-center justify-center w-28">
              Tambah Obat
            </div>
            <div className="aspect-square w-5 flex justify-center">x</div>
          </div>
        </div>
        <div className="h-4/6 border-black border">content</div>
        <div className="h-1/6 border-black border flex justify-end">
          <button className="border border-green-500 hover:bg-green-500 w-32">
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMedicineModalNext;
