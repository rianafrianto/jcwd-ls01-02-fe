import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import useProductsSearch from "../../Helpers/useProductsSearch";
import Cropper from "react-easy-crop";
import plusIcon from "../../Assets/plus-icon.png";
import minusIcon from "../../Assets/minus-icon.png";
import trashIcon from "../../Assets/trash-icon.png";
import editIcon from "../../Assets/edit-icon.png";
import API_URL from "../../Helpers/API_URL";
import { Formik, Field, Form } from "formik";
import { dateGenerator } from "../../Helpers/dateGenerator";
import axios from "axios";
import * as Yup from "yup";
import FormikControl from "../../User/Component/Formik/FormikControl";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";

function ModalPrescriptionService(props) {
  const { isOpen, closeModal, data, getOrders } = props;
  const initialTerms = "";
  const initialQty = 0;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [terms, setTerms] = useState(initialTerms);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const [qty, setQty] = useState(initialQty);
  const [dosis, setDosis] = useState("");
  const [cartOrder, setCartOrder] = useState([]);
  const [dosisKlik, setDosisKlik] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const { loading, error, products, hasMore } = useProductsSearch(
    terms,
    page,
    isOpen
  );

  const objectFit = "vertical-cover";
  const aspect = 1;
  const shape = "rect";
  const cropSize = { width: 293, height: 427 };
  const initialValues = {
    namaPasien: "",
    namaDokter: "",
    qty,
  };

  const validationSchema = Yup.object({
    namaPasien: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    namaDokter: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z .]*$/, "Hanya menggunakan huruf"),
  });

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const handleSearch = (e) => {
    setTerms(e.target.value);
    setPage(0);
    setSelected(false);
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
  const submitProcess = async (values) => {
    try {
      let dosis = "";
      for (const order of cartOrder) {
        dosis
          ? (dosis += `| ${order.name} : ${order.dosis}`)
          : (dosis = `${order.name} : ${order.dosis} `);
      }
      setLoadingSubmit(true);
      const insertData = {
        cart_checkout: cartOrder.map((val) => {
          return {
            id: val.id,
            qty: val.qty,
            price: val.price,
          };
        }),
        namaPasien: values.namaPasien,
        namaDokter: values.namaDokter,
        id: data.id,
        dosis,
      };

      await axios.post(`${API_URL}/admin/order/valid-prescription`, insertData);
      toast.success(`Pesanan berhasil diproses`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      cancelService();
      getOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onSubmit = () => {
    setDosisKlik(true);
    if (dosis === "") return;
    if (qty === 0) return;
    const insertData = {
      name: selectedProduct.name,
      golongan: selectedProduct.golongan,
      satuan: selectedProduct.satuan,
      qty,
      dosis,
      id: selectedProduct.id,
      stock: selectedProduct.stock,
      price: selectedProduct.price,
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
    setDosisKlik(false);
  };

  const editCartOrder = (i) => {
    setSelectedProduct(cartOrder[i]);
    setSelected(true);
    setTerms(cartOrder[i].name);
    setDosis(cartOrder[i].dosis);
    setQty(cartOrder[i].qty);
  };

  const deleteCartOrder = (i) => {
    setCartOrder((prev) => {
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
          type="button"
          tabIndex={0}
          onClick={() => {
            setTerms(val.name);
            setSelectedProduct(val);
            setSelected(true);
            setQty(initialQty);
            setDosis("");
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
                type="button"
                className="btn-plain rounded-full h-8 aspect-square border flex justify-center items-center border-primary/20 hover:bg-primary/20"
                onClick={() => editCartOrder(i)}
              >
                <img src={editIcon} alt="" className="h-4" />
              </button>
              <button
                type="button"
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
                    type="button"
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={cancelService}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitProcess}
                >
                  {(formik) => {
                    const {
                      handleChange,
                      isSubmitting,
                      isValid,
                      handleBlur,
                      errors,
                      touched,
                    } = formik;
                    return (
                      <Form
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            e.preventDefault();
                          }
                        }}
                      >
                        <div className="w-full h-[427px] flex">
                          <div className="w-2/5 h-full border-2 relative bg-neutral-gray">
                            <div className="w-1/3 flex justify-center items-center bg-primary/10 rounded-lg overflow-hidden absolute h-6 bottom-2 right-2 z-20">
                              <button
                                type="button"
                                className="btn-plain h-full rounded-l-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-l-lg"
                                onClick={() =>
                                  zoom <= 1
                                    ? null
                                    : setZoom((prev) => prev - 0.25)
                                }
                              >
                                <img
                                  src={minusIcon}
                                  alt=""
                                  className="h-full"
                                />
                              </button>
                              <span className="w-1/3 text-center h-full bg-white">
                                {zoom}
                              </span>
                              <button
                                type="button"
                                className="btn-plain h-full rounded-r-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-r-lg"
                                onClick={() =>
                                  zoom >= 3
                                    ? null
                                    : setZoom((prev) => prev + 0.25)
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
                              <div className="w-full relative flex flex-col justify-between gap-y-2">
                                <FormikControl
                                  control="INPUT"
                                  label="Nama Pasien"
                                  name="namaPasien"
                                  placeholder="Masukkan nama pasien"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  type="text"
                                  className={`h-6 ${
                                    errors.namaPasien && touched.namaPasien
                                      ? "outline-red-700"
                                      : null
                                  }`}
                                />
                              </div>
                              <div className="w-full relative flex flex-col justify-between gap-y-2">
                                <FormikControl
                                  control="INPUT"
                                  label="Nama Dokter"
                                  name="namaDokter"
                                  placeholder="Masukkan nama dokter"
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                  onBlur={handleBlur}
                                  type="text"
                                  className={`h-6 ${
                                    errors.namaDokter && touched.namaDokter
                                      ? "outline-red-700"
                                      : null
                                  }`}
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
                                  <div className="dropdown dropdown-content absolute top-14 bg-white border w-full max-h-28 overflow-y-scroll overflow-x-hidden z-10">
                                    {printProducts(products, loading)}
                                  </div>
                                ) : null}
                              </div>
                              {selectedProduct ? (
                                <>
                                  <div className="w-full flex gap-x-4">
                                    <div className="w-1/5 flex flex-col gap-y-2 relative z-0">
                                      Kuantitas
                                      {qty === 0 && dosisKlik && (
                                        <div className="absolute text-red-600 -bottom-5 right-0 text-sm">
                                          Min. 1
                                        </div>
                                      )}
                                      <div
                                        className={`w-full flex justify-center items-center outline-1 bg-primary/10 rounded-lg overflow-hidden outline ${
                                          errors.qty && touched.qty
                                            ? "outline-red-700"
                                            : "outline-primary"
                                        }`}
                                      >
                                        <button
                                          type="button"
                                          className="button-general h-full rounded-l-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-l-lg"
                                          onClick={() =>
                                            qty === 0
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

                                        <span className={`w-1/3 text-center`}>
                                          {qty}
                                        </span>
                                        <button
                                          type="button"
                                          className="button-general h-full rounded-r-lg w-1/3 p-0 overflow-hidden flex justify-center items-center hover:bg-primary/20 focus:rounded-r-lg"
                                          onClick={() => {
                                            return qty ===
                                              Number(selectedProduct.stock)
                                              ? null
                                              : setQty((prev) => prev + 1);
                                          }}
                                        >
                                          <img
                                            src={plusIcon}
                                            alt=""
                                            className="h-full"
                                          />
                                        </button>
                                        {errors.qty && touched.qty && (
                                          <div className="absolute text-red-600 -bottom-5 right-0 text-sm">
                                            {errors.qty}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="w-2/5 flex flex-col gap-y-2">
                                      Satuan
                                      <span className="field-input h-6">
                                        {selectedProduct.satuan}
                                      </span>
                                    </div>
                                    <div className="w-2/5 flex flex-col gap-y-2 relative">
                                      Dosis
                                      <input
                                        type="text"
                                        className={`field-input h-6 ${
                                          dosis === "" && dosisKlik
                                            ? "outline-red-700"
                                            : null
                                        }`}
                                        value={dosis}
                                        onChange={(e) => {
                                          setDosis(e.target.value);
                                          setDosisKlik(false);
                                        }}
                                      />
                                      {dosis === "" && dosisKlik && (
                                        <div className="absolute text-red-600 -bottom-5 right-0 text-sm">
                                          Wajib diisi
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-full flex justify-between items-center mt-2">
                                    <span>
                                      {selectedProduct.stock == 0
                                        ? "Stok habis"
                                        : `Sisa ${selectedProduct.stock} ${selectedProduct.satuan}`}
                                    </span>
                                    <button
                                      type="button"
                                      className={`button-primary px-2 text-xs ${
                                        !dosis &&
                                        "bg-gray-600 hover:bg-gray-600"
                                      }`}
                                      onClick={onSubmit}
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
                          <table className="w-full rounded-t-lg overflow-hidden table-fixed table-zebra">
                            <thead className="rounded-t-lg ">
                              <tr className="text-center font-normal bg-secondary rounded-t-lg">
                                <th className="font-medium text-white w-10">
                                  No
                                </th>
                                <th className="font-medium text-white w-40">
                                  Nama Obat
                                </th>
                                <th className="font-medium text-white">
                                  Golongan
                                </th>
                                <th className="font-medium text-white w-20">
                                  Kuantitas
                                </th>
                                <th className="font-medium text-white w-20">
                                  Satuan
                                </th>
                                <th className="font-medium text-white">
                                  Dosis
                                </th>
                                <th className="font-medium text-white w-20">
                                  Atur
                                </th>
                              </tr>
                            </thead>
                            <tbody>{printRow(cartOrder)}</tbody>
                          </table>
                        </div>
                        <div className="w-full flex justify-end mt-2">
                          <button
                            disabled={
                              !cartOrder[0] || !isValid || loadingSubmit
                            }
                            type="submit"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${
                              loadingSubmit ? "button-loading" : ""
                            }`}
                          >
                            {loadingSubmit ? "Memproses..." : "Selesai"}
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalPrescriptionService;
