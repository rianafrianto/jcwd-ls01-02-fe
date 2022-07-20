import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddDetails1 from "./AddDetails1";
import AddDetails2 from "./AddDetails2";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { XIcon } from "@heroicons/react/outline";

function ModalEditProduct(props) {
  const { modalEdit, closeModalEdit, editId } = props;
  const initialState1 = {
    name: "",
    NIE: "",
    category: "",
    golongan: "",
    tgl_kadaluarsa: "",
    indikasi: "",
    komposisi: "",
    cara_penyimpanan: "",
    principal: "",
    cara_pakai: "",
    peringatan: "",
  };
  const initialState2 = {
    stock: "",
    satuan: "",
    kemasan: "",
    price: "",
    modal: "",
    promo: "",
    berat: "",
  };

  const [modalState, setmodalState] = useState(1);
  const [details1, setDetails1] = useState(initialState1);
  const [details2, setDetails2] = useState(initialState2);

  const cancelEdit = () => {
    closeModalEdit();
    setmodalState(1);
  };
  const cancelAdd = () => {
    closeModalEdit();
    setmodalState(1);
  };

  const getDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/product-details`, {
        params: { id: editId },
      });
      const {
        name,
        NIE,
        category,
        golongan,
        tgl_kadaluarsa,
        indikasi,
        komposisi,
        cara_penyimpanan,
        principal,
        cara_pakai,
        peringatan,
        stock,
        satuan,
        kemasan,
        price,
        modal,
        promo,
        berat,
      } = res.data.data;
      setDetails1({
        name,
        NIE,
        category,
        golongan,
        tgl_kadaluarsa,
        indikasi,
        komposisi,
        cara_penyimpanan,
        principal,
        cara_pakai,
        peringatan,
      });
      setDetails2({ stock, satuan, kemasan, price, modal, promo, berat });
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const finalSubmit = async () => {
    console.log(details1);
    console.log(details2);
    try {
      const insertData = {
        ...details1,
        ...details2,
        photo: null,
        id: editId,
      };
      await axios.patch(`${API_URL}/admin/edit-product`, insertData);
      cancelEdit();
      setDetails1(initialState1);
      setDetails2(initialState2);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubmit = async () => {
    try {
    } catch (error) {}
  };

  const printForm = (state) => {
    switch (state) {
      case 1:
        return (
          <AddDetails1
            details1={details1}
            cancelAdd={cancelAdd}
            setmodalState={setmodalState}
            setDetails1={setDetails1}
          />
        );
      case 2:
        return (
          <AddDetails2
            details2={details2}
            cancelAdd={cancelAdd}
            setmodalState={setmodalState}
            setDetails2={setDetails2}
          />
        );

      case 3:
        return (
          <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
            <div
              className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
              // disabled={!isValid}
              onClick={() => setmodalState(2)}
            >
              Kembali
            </div>
            <button
              type="button"
              className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
              onClick={finalSubmit}
            >
              Lanjutkan
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (editId) getDetails();
  }, [editId]);

  return (
    <Transition appear show={modalEdit} as={Fragment}>
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
                  <h1 className="font-bold">Edit Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-2 py-2 absolute right-0"
                    onClick={cancelEdit}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                {printForm(modalState)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalEditProduct;
