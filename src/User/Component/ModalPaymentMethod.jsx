import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import formatToCurrency from "../../Helpers/formatToCurrency";

function ModalPaymentMethod(props) {
  const {
    modalPaymentMethod,
    setModalPaymentMethod,
    totalPrice,
    cart,
    dataAddress,
    selectedMethod,
  } = props;
  const navigate = useNavigate();
  const onClose = () => {
    setModalPaymentMethod(false);
  };

  const submitOrder = () => {
    let insertData = {
      cart,
      payment_method: "BCA",
      selected_address: dataAddress,
      total_price: totalPrice,
      shipping_method: `${selectedMethod.kurir} ${selectedMethod.jenis}`,
    };
    console.log(insertData);
  };
  return (
    <Transition appear show={modalPaymentMethod} as={Fragment}>
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
              <Dialog.Panel className="w-[500px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 pt-4 pb-8 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Metode Pembayaran</h1>
                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-3 py-1 absolute right-0"
                    onClick={onClose}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <div
                  className={`h-[500px] w-full flex flex-col gap-y-5 duration-500`}
                >
                  <div className="w-full h-1/6 border shadow-custom rounded-lg flex justify-between px-5 items-center">
                    <h2 className="font-bold text-secondary">Total Tagihan</h2>
                    <h2 className="font-bold text-secondary">
                      {formatToCurrency(totalPrice)}
                    </h2>
                  </div>
                  <div className="w-full h-4/6 flex flex-col">
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      BCA
                    </button>
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      Mandiri
                    </button>
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      Permata Bank
                    </button>
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      OVO
                    </button>
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      Gopay
                    </button>
                    <button className="btn-plain h-16 w-full flex items-center border px-5">
                      ShopeePay
                    </button>
                  </div>
                  <div className="w-full h-1/6 flex pt-6">
                    <button
                      className={`button-primary w-full`}
                      onClick={submitOrder}
                    >
                      Pilih Metode Pembayaran
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
  return (
    // <input
    //               type="checkbox"
    //               id="my-modal-4"
    //               className="modal-toggle"
    //             />
    //             <label htmlFor="my-modal-4" className="modal cursor-pointer">
    //               <label className="modal-box relative" htmlFor="">
    //                 <label
    //                   htmlFor="my-modal-4"
    //                   className="btn btn-sm btn-circle absolute right-2 top-2"
    //                 >
    //                   ✕
    //                 </label>
    //                 <div className="h-4/6 border-black border">content</div>
    //                 <div className="h-1/6 border-black border flex justify-center items-center">
    //                   <button
    //                     className="btn btn-ghost border-primary hover:bg-primary"
    //                     onClick={() => {
    //                       console.log({ dataAddress, dataMethod });
    //                       navigate("/confirmation");
    //                     }}
    //                   >
    //                     pilih metode
    //                   </button>
    //                 </div>
    //               </label>
    //             </label>
    <div
      className="h-screen w-screen top-0 fixed bg-black/30 flex justify-center items-center"
      onClick={(e) => {
        console.log("bg close");
      }}
    >
      <div
        className="h-96 aspect-square bg-white flex flex-col p-7 gap-y-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/6 flex items-center border-black border">
          <button className="h-6 aspect-square border border-gray-700 flex items-center justify-center hover:bg-gray-700">
            x
          </button>
          header
        </div>
        <div className="h-4/6 border-black border">content</div>
        <div className="h-1/6 border-black border flex justify-center items-center">
          <button
            className="border border-green-500 hover:bg-green-500"
            onClick={() => navigate("/confirmation")}
          >
            pilih metode
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPaymentMethod;
