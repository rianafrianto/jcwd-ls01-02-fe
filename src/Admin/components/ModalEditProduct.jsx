import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddDetails1 from "./AddDetails1";
import AddDetails2 from "./AddDetails2";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import AddImage from "./AddImage";
import DetailsPreview from "./DetailsPreview";
import {
  categoryList,
  golonganList,
  satuanList,
} from "../../Helpers/categoryList";

function ModalEditProduct(props) {
  const { modalEdit, closeModalEdit, editId, setEditId } = props;
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
    stock: 0,
    satuan: "",
    kemasan: "",
    price: "",
    modal: "",
    promo: "",
    berat: "",
  };
  const initialState3 = {
    photo: { file: null, filePreview: null },
  };

  const [modalState, setModalState] = useState(1);
  const [details1, setDetails1] = useState(initialState1);
  const [details2, setDetails2] = useState(initialState2);
  const [detailImage, setDetailImage] = useState(initialState3);

  const cancel = () => {
    closeModalEdit();
    setModalState(1);
    setDetails1(initialState1);
    setDetails2(initialState2);
    setDetailImage(initialState3);
    setEditId(null);
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
        photo,
      } = res.data.data;
      let catList = categoryList.map((val, i) => {
        return { name: val.cardText, value: i + 1 };
      });
      setDetails1({
        name,
        NIE,
        category: (() => {
          for (const cat of catList) {
            if (category === cat.name) return cat.value;
          }
        })(),
        golongan: (() => {
          for (const gol of golonganList) {
            if (golongan === gol.content) return gol.value;
          }
        })(),
        tgl_kadaluarsa,
        indikasi,
        komposisi,
        cara_penyimpanan,
        principal,
        cara_pakai,
        peringatan,
      });
      setDetails2({
        satuan: (() => {
          for (const sat of satuanList) {
            if (satuan === sat.content) return sat.value;
          }
        })(),
        kemasan,
        price,
        modal,
        promo,
        berat,
      });
      setDetailImage({
        photo: {
          file: null,
          filePreview: photo ? `${API_URL}/${photo}` : null,
        },
      });
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const finalSubmit = async () => {
    try {
      const insertData = {
        ...details1,
        ...details2,
        id: editId,
      };
      console.log(insertData);
      let formData = new FormData();
      if (detailImage.photo.file) {
        formData.append("product_photo", detailImage.photo.file);
      }
      formData.append("data", JSON.stringify(insertData));

      await axios.patch(`${API_URL}/admin/edit-product`, formData);
      toast.success(`Produk berhasil diubah`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      cancel();
      setDetails1(initialState1);
      setDetails2(initialState2);
    } catch (error) {
      console.log(error);
    }
  };

  const printForm = (state) => {
    switch (state) {
      case 1:
        return (
          <AddDetails1
            details1={details1}
            setDetails1={setDetails1}
            setModalState={setModalState}
          />
        );
      case 2:
        return (
          <AddDetails2
            details2={details2}
            setDetails2={setDetails2}
            setModalState={setModalState}
            editId={editId}
          />
        );
      case 3:
        return (
          <AddImage
            detailImage={detailImage}
            setDetailImage={setDetailImage}
            setModalState={setModalState}
            editId={editId}
          />
        );
      case 4:
        return (
          <DetailsPreview
            details1={details1}
            details2={details2}
            detailImage={detailImage}
            setModalState={setModalState}
            finalSubmit={finalSubmit}
            editId={editId}
          />
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
                    onClick={cancel}
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
