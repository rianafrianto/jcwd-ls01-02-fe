import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import useProductsSearch from "../../Helpers/useProductsSearch";
import Cropper from "react-easy-crop";
import plusIcon from "../../Assets/plus-icon.png";
import minusIcon from "../../Assets/minus-icon.png";
import trashIcon from "../../Assets/trash-icon.png";
import editIcon from "../../Assets/edit-icon.png";
import API_URL from "../../Helpers/API_URL";
import { dateGenerator } from "../../Helpers/dateGenerator";

function PrescriptionServiceModal(props) {
  const { isOpen, closeModal, data } = props;
  const initialTerms = "";
  const initialQty = 1;
  const [terms, setTerms] = useState(initialTerms);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const [qty, setQty] = useState(initialQty);
  const [dosis, setDosis] = useState("");
  const [namaPasien, setNamaPasien] = useState("");
  const [namaDokter, setNamaDokter] = useState("");
  const [cartOrder, setCartOrder] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const objectFit = "vertical-cover";
  const aspect = 1;
  const shape = "rect";
  const cropSize = { width: 293, height: 427 };
  const insertData = { cartOrder, namaPasien, namaDokter };

  const { loading, error, products, hasMore } = useProductsSearch(terms, page);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const handleSearch = (e) => {
    setTerms(e.target.value);
    setPage(0);
  };

  const cancelService = () => {
    closeModal();
    setTimeout(() => {
      setZoom(1);
      setQty(initialQty);
      setDosis("");
      setSelectedProduct(null);
      setTerms(initialTerms);
      setSelected(false);
      setCartOrder([]);
    }, 500);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const addToCartOrder = () => {
    const insertData = {
      name: selectedProduct.name,
      golongan: selectedProduct.golongan,
      satuan: selectedProduct.satuan,
      qty,
      dosis,
      id: selectedProduct.id,
    };
    setCartOrder((prev) => {
      let edit = false;
      let result = prev.map((val) => {
        if (insertData.id === val.id) {
          edit = true;
          return insertData;
        }
        return val;
      });
      if (prev.length === result.length && prev[0] && edit) return result;
      return [...prev, insertData];
    });
    setQty(initialQty);
    setDosis("");
    setSelectedProduct(null);
    setTerms(initialTerms);
    setSelected(false);
  };

  const editCartOrder = (i) => {
    console.log(cartOrder);
    setSelectedProduct(cartOrder[i]);
    setSelected(true);
    setTerms(cartOrder[i].name);
    setDosis(cartOrder[i].dosis);
    setQty(cartOrder[i].qty);
  };

  const deleteCartOrder = (i) => {
    setCartOrder((prev) => {
      console.log(prev);
      let result = [...prev];
      result.splice(i, 1);
      return result;
    });
  };

  const printProducts = (data, loading) => {
    if (loading) {
      return (
        <div className="w-full flex justify-center items-center button-loading">
          Loading ...
        </div>
      );
    }
    if (!data.length) {
      return (
        <div className="w-full flex justify-center items-center">
          Produk tidak ditemukan
        </div>
      );
    }
    return data.map((val, i) => {
      return (
        <button
          className="btn-plain w-full text-left border-b hover:bg-gray-300 cursor-pointer px-2"
          key={i}
          tabIndex={0}
          onClick={() => {
            setTerms(val.name);
            setSelectedProduct(val);
            setSelected(true);
          }}
        >
          {val.name}
        </button>
      );
    });
  };

  const printRow = (data) => {
    return data.map((val, i) => {
      return (
        <tr key={i} className="w-full h-full text-center border-b">
          <th>{i + 1}</th>
          <td>{val.name}</td>
          <td>{val.golongan}</td>
          <td>{val.qty}</td>
          <td>{val.satuan}</td>
          <td className="px-2 break-words">{val.dosis}</td>
          <td>
            <div className="h-full flex justify-center items-center gap-x-2 px-2">
              <button
                className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                onClick={() => editCartOrder(i)}
              >
                <img src={editIcon} alt="" className="h-4" />
              </button>
              <button
                className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                onClick={() => deleteCartOrder(i)}
              >
                <img src={trashIcon} alt="" className="h-5" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Buat Salinan Resep</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-3 py-1 absolute right-0"
                    onClick={cancelService}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <div className="w-full h-[427px] flex">
                  <div className="w-2/5 h-full border-2 relative bg-neutral-gray">
                    <div className="w-1/3 flex justify-center items-center bg-primary/10 rounded-lg overflow-hidden absolute h-6 bottom-2 right-2 z-20">
                      <button
                        type="button"
                        className="btn-plain h-full rounded-l-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-l-lg"
                        onClick={() =>
                          zoom === 1 ? null : setZoom((prev) => prev - 0.25)
                        }
                      >
                        <img src={minusIcon} alt="" className="h-full" />
                      </button>
                      <span className="w-1/3 text-center h-full bg-white">
                        {zoom}
                      </span>
                      <button
                        type="button"
                        className="btn-plain h-full rounded-r-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-r-lg"
                        onClick={() =>
                          zoom === 3 ? null : setZoom((prev) => prev + 0.25)
                        }
                      >
                        <img src={plusIcon} alt="" className="h-full" />
                      </button>
                    </div>
                    <figure className="w-full h-full relative">
                      <Cropper
                        cropShape={shape}
                        image={API_URL + data.prescription_photo}
                        zoom={zoom}
                        crop={crop}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        objectFit={objectFit}
                        cropSize={cropSize}
                      />
                    </figure>
                  </div>
                  <div className="w-3/5 p-5">
                    <div className="w-full flex flex-col gap-y-4">
                      <div className="w-full flex gap-x-4">
                        <div className="w-1/2 flex flex-col gap-y-2">
                          No. Pemesanan
                          <input
                            disabled
                            type="text"
                            className="field-input h-6 pl-2"
                            defaultValue={data.transaction_code}
                          />
                        </div>
                        <div className="w-1/2 flex flex-col gap-y-2">
                          Tgl. Pemesanan
                          <input
                            disabled
                            type="text"
                            className="field-input h-6 pl-2"
                            defaultValue={dateGenerator(
                              `${data.date_requested} UTC`
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        Nama Pasien{" "}
                        <input
                          type="text"
                          className="field-input h-6"
                          onChange={(e) => setNamaPasien(e.target.value)}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        Nama Dokter{" "}
                        <input
                          type="text"
                          className="field-input h-6"
                          onChange={(e) => setNamaDokter(e.target.value)}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2 relative">
                        Nama Obat{" "}
                        <input
                          type="text"
                          className="field-input h-6"
                          onChange={handleSearch}
                          value={terms}
                        />
                        {terms && !selected ? (
                          <div className="dropdown dropdown-content absolute top-14 bg-white border w-full max-h-28 overflow-y-scroll overflow-x-hidden">
                            {printProducts(products, loading)}
                          </div>
                        ) : null}
                      </div>
                      {selectedProduct ? (
                        <>
                          <div className="w-full flex gap-x-4">
                            <div className="w-1/5 flex flex-col gap-y-2">
                              Kuantitas
                              <div className="w-full flex justify-center items-center bg-primary/10 rounded-lg overflow-hidden">
                                <button
                                  type="button"
                                  className="button-general h-full rounded-l-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-l-lg"
                                  onClick={() =>
                                    qty === 1
                                      ? null
                                      : setQty((prev) => prev - 1)
                                  }
                                >
                                  <img
                                    src={minusIcon}
                                    alt=""
                                    className="h-full"
                                  />
                                </button>
                                <input
                                  type="text"
                                  className="w-1/3 text-center"
                                  value={qty}
                                  onChange={(e) =>
                                    setQty(Number(e.target.value))
                                  }
                                />
                                <button
                                  type="button"
                                  className="button-general h-full rounded-r-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-r-lg"
                                  onClick={() =>
                                    qty === selectedProduct.stock
                                      ? null
                                      : setQty((prev) => prev + 1)
                                  }
                                >
                                  <img
                                    src={plusIcon}
                                    alt=""
                                    className="h-full"
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="w-2/5 flex flex-col gap-y-2">
                              Satuan
                              <input
                                type="text"
                                className="field-input h-6"
                                defaultValue={selectedProduct.satuan}
                                disabled
                              />
                            </div>
                            <div className="w-2/5 flex flex-col gap-y-2">
                              Dosis
                              <input
                                type="text"
                                className="field-input h-6"
                                value={dosis}
                                onChange={(e) => setDosis(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="w-full flex justify-end">
                            <button
                              className="button-primary px-2 text-xs"
                              onClick={addToCartOrder}
                            >
                              Tambahkan Obat
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <span className="font-bold">Ringkasan Obat</span>
                  <table className="w-full rounded-lg overflow-hidden table-fixed table-zebra">
                    <thead className="rounded-t-lg ">
                      <tr className="text-center font-normal bg-secondary rounded-t-lg">
                        <th className="font-medium text-white w-10">No</th>
                        <th className="font-medium text-white w-40">
                          Nama Obat
                        </th>
                        <th className="font-medium text-white">Golongan</th>
                        <th className="font-medium text-white w-20">
                          Kuantitas
                        </th>
                        <th className="font-medium text-white w-20">Satuan</th>
                        <th className="font-medium text-white">Dosis</th>
                        <th className="font-medium text-white w-20">Atur</th>
                      </tr>
                    </thead>
                    <tbody>{printRow(cartOrder)}</tbody>
                  </table>
                </div>

                <div className="w-full flex justify-end">
                  <button
                    disabled={!cartOrder[0]}
                    type="submit"
                    className="button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => {
                      console.log(insertData);
                      cancelService();
                    }}
                  >
                    Selesai
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PrescriptionServiceModal;
