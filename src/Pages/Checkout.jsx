import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardCart from "../Component/CardCart";
import API_URL from "../Helpers/API_URL";
import axios from "axios";
import Cookies from "js-cookie";
import CardAddress from "../Component/CardAddress";
import { toast } from "react-toastify";
import plusIcon from "../Assets/plus-icon.png";
import ModalAllAddress from "../Component/ModalAllAddress";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, address_id } = useSelector((state) => state.user);
  const [loadingPrimaryAddress, setLoadingPrimaryAddress] = useState(false);
  const [loadingAllAddress, setLoadingAllAddress] = useState(false);
  const [dataAddresses, setDataAddresses] = useState([]);
  const [destinationId, setDestinationId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getPrimaryAddress = async (data) => {
    try {
      let token = Cookies.get("token");
      setLoadingPrimaryAddress(true);
      const res = await axios.get(`${API_URL}/transaction/primary-address`, {
        headers: { authorization: token },
        params: { address_id: data },
      });
      if (res.data.data?.primary_address)
        dispatch({
          type: "CHANGEADDRESS",
          payload: res.data.data?.primary_address,
        });
      console.log(res.data.data);
      setSelectedAddress(res.data.data);
      setDestinationId(res.data.data.destination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPrimaryAddress(false);
    }
  };
  console.log(selectedAddress);
  const getAllAddresses = async () => {
    try {
      let token = Cookies.get("token");
      setLoadingAllAddress(true);
      const res = await axios.get(`${API_URL}/transaction/all-addresses`, {
        headers: { authorization: token },
      });
      setDataAddresses(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAllAddress(false);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/home");
    getPrimaryAddress(address_id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="h-full w-screen  flex justify-center pt-20">
        <div className="container h-full flex flex-col px-24 py-11">
          <div className="w-full flex gap-x-16">
            <div className="flex flex-col gap-y-7 w-4/6">
              <div className="w-full h-full flex flex-col items-start gap-y-3">
                <h1 className="h-6 w-full font-bold text-secondary text-xl">
                  Alamat Pengiriman
                </h1>
                <div className="border-b border-neutral-gray w-full" />
                {!selectedAddress ? null : (
                  <div className="h-32 w-full relative">
                    {loadingPrimaryAddress ? (
                      <div className="w-full h-full bg-neutral-gray" />
                    ) : (
                      <CardAddress data={selectedAddress} />
                    )}

                    <label
                      htmlFor="addresses"
                      className="button-general py-0 outline-0 text-primary font-bold absolute top-2 right-2 modal-button cursor-pointer"
                      onClick={getAllAddresses}
                    >
                      Pilih alamat lain
                    </label>
                    <ModalAllAddress
                      setSelectedAddress={setSelectedAddress}
                      dataAddresses={dataAddresses}
                      loadingAllAddress={loadingAllAddress}
                      selectedAddress={selectedAddress}
                      setLoadingAllAddress={setLoadingAllAddress}
                    />
                    <div className="border-b border-neutral-gray w-full" />
                  </div>
                )}
                <button
                  className="button-outline px-5 flex justify-between gap-x-2 rounded-full shadow-lg"
                  onClick={() => navigate("/address")}
                >
                  <img src={plusIcon} alt="" className="h-7 aspect-square" />
                  Tambah Alamat Baru
                </button>
              </div>
              <div className="border border-black">
                <div className="h-6 w-full mb-3 border-b-[.5px] border-black">
                  Ringkasan Order
                </div>
                <CardCart />
              </div>
            </div>
            <div className="w-2/6 h-full border border-putih flex flex-col p-7 bg-green-400">
              <div className="h-full w-full bg-white flex flex-col gap-y-11">
                <div className="text-base mb-1">Total</div>
                <div className="text-base mb-5">Sub Total</div>
                <div className="text-base mb-3">Total</div>
                {/* <button
                  className="text-base border border-green-800 hover:bg-green-800"
                  onClick={() => {
                    setPaymentMethodModal(true);
                    console.log("modal open");
                  }}
                >
                  Metode Pembayaran
                </button> */}
                <label
                  htmlFor="my-modal-4"
                  className="button-primary text-sm modal-button"
                >
                  Pilih Metode Pembayaran
                </label>
                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative" htmlFor="">
                    <label
                      htmlFor="my-modal-4"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <div className="h-4/6 border-black border">content</div>
                    <div className="h-1/6 border-black border flex justify-center items-center">
                      <button
                        className="btn btn-ghost border-primary hover:bg-primary"
                        onClick={() => navigate("/confirmation")}
                      >
                        pilih metode
                      </button>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
