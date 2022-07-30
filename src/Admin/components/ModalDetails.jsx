import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DetailsPreview from "./DetailsPreview";
import {
  categoryList,
  golonganList,
  satuanList,
} from "../../Helpers/categoryList";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Loading from "../../User/Component/Loading";
import { XIcon } from "@heroicons/react/solid";

function ModalDetails(props) {
  const { modalDetails, closeModalDetails, detailsId, setDetailsId } = props;
  const [details1, setDetails1] = useState(null);
  const [details2, setDetails2] = useState(null);
  const [detailImage, setDetailImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const onClose = () => {
    closeModalDetails();
    setTimeout(() => {
      setDetailsId(null);
    }, 500);
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/product-details`, {
        params: { id: detailsId },
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
        stock,
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (detailsId) getDetails();
  }, [detailsId]);

  return (
    <Transition appear show={modalDetails} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
              <Dialog.Panel className="w-[800px] h-full flex flex-col  transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative mb-2"
                >
                  <h1 className="font-bold">Detail Produk</h1>

                  <button
                    type="button"
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                {/* <div className="w-full h-[800px] overflow-scroll flex flex-col border-t"> */}
                {loading ? (
                  <Loading className="" />
                ) : (
                  <DetailsPreview
                    details1={details1}
                    details2={details2}
                    detailImage={detailImage}
                    detailsId={detailsId}
                  />
                )}
                {/* </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalDetails;
