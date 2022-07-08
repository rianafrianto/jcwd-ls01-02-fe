import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function PrescriptionServiceModal(props) {
  const { isOpen, closeModal } = props;
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-[800px] h-[560px] transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-6 w-full flex justify-between text-xl"
                >
                  <h1 className="font-bold">Buat Salinan Resep</h1>
                  <button
                    className="btn-plain h-full text-xl hover:text-primary"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <div className="w-full h-[427px] flex mt-4">
                  <div className="w-2/5 h-full overflow-y-scroll"></div>
                  <div className="w-3/5 p-5 overflow-y-scroll">
                    <form
                      action="submit"
                      className="w-full flex flex-col gap-y-4"
                    >
                      <div className="w-full flex gap-x-4">
                        <div className="w-1/2 flex flex-col gap-y-2">
                          No. Pemesanan
                          <input type="text" className="field-input h-6" />
                        </div>
                        <div className="w-1/2 flex flex-col gap-y-2">
                          No. Pemesanan
                          <input type="text" className="field-input h-6" />
                        </div>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        Nama Pasien{" "}
                        <input type="text" className="field-input h-6" />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        Nama Dokter{" "}
                        <input type="text" className="field-input h-6" />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        Nama Obat{" "}
                        <input type="text" className="field-input h-6" />
                      </div>
                      <div className="w-full flex gap-x-4">
                        <div className="w-1/5 flex flex-col gap-y-2">
                          Kuantitas
                          <input type="text" className="field-input h-6" />
                        </div>
                        <div className="w-2/5 flex flex-col gap-y-2">
                          Satuan
                          <input type="text" className="field-input h-6" />
                        </div>
                        <div className="w-2/5 flex flex-col gap-y-2">
                          Dosis
                          <input type="text" className="field-input h-6" />
                        </div>
                      </div>
                      <div className="w-full flex justify-end">
                        <button className="button-primary px-2">
                          Tambahkan Obat
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="mt-4 w-full flex justify-end">
                  <button
                    type="submit"
                    className="button-primary px-10 text-lg"
                    onClick={closeModal}
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
