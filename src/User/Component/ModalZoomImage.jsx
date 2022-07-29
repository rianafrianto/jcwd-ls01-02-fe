import React, { Fragment } from "react";
import API_URL from "../../Helpers/API_URL";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

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
                className="w-fit h-full flex flex-col gap-y-2 transform align-middle shadow-xl transition-all"
                onClick={closeModal}
              >
                <div className="absolute w-fit bg-primary z-50 -top-16 left-1/2 -translate-x-1/2 text-white py-2 px-5 rounded-lg">
                  Klik dimana saja untuk keluar
                </div>
                <button
                  className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute top-5 right-5"
                  onClick={closeModal}
                >
                  <XIcon className="h-5" />
                </button>
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
