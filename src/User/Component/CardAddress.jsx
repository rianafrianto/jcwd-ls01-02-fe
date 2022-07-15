import React from "react";

function CardAddress({ data, className }) {
  const {
    nama_belakang,
    nama_depan,
    nomor_hp,
    label,
    alamat,
    kota,
    provinsi,
    kode_pos,
    destination,
  } = data;
  return (
    <div
      className={`w-full h-full flex flex-col items-start border-neutral-gray text-sm gap-y-3 p-2 ${className}`}
    >
      <h1 className="font-bold text-secondary">{`${nama_depan} ${nama_belakang}, +62${nomor_hp}`}</h1>
      <div>
        <p>{label}</p>
        <p>{alamat}</p>
        <p>{`${kota}, ${provinsi}, ${kode_pos}`}</p>
      </div>
    </div>
  );
}

export default CardAddress;
