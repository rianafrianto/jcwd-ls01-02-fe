import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API_URL from "../../Helpers/API_URL";
import CardAddress from "./CardAddress";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { Dialog, Transition } from "@headlessui/react";
import EditAddress from "./EditAddress";

function ModalZoomImage(props) {
  const { photo, isOpen, closeModal } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel
                className="w-fit h-full flex flex-col gap-y-2 transform overflow-hidden align-middle shadow-xl transition-all"
                onClick={closeModal}
              >
                <figure className="h-[800px]">
                  <img src={API_URL + photo} alt="" className="h-full" />
                </figure>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalZoomImage;
