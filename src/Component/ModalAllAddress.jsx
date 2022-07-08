import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../Helpers/API_URL";
import CardAddress from "./CardAddress";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "./Loading";

function ModalAllAddress(props) {
  const {
    dataAddresses,
    setSelectedAddress,
    loadingAllAddress,
    selectedAddress,
  } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { address_id } = useSelector((state) => state.user);

  const changePrimaryAddress = async (data) => {
    try {
      let token = Cookies.get("token");
      setLoading(true);
      await axios.patch(`${API_URL}/profile/change-primary-address`, data, {
        headers: { authorization: token },
      });
      dispatch({ type: "CHANGEADDRESS", payload: data.id });
      toast.success(`Alamat utama telah diganti`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printAddresses = () => {
    return dataAddresses.map((val, i) => {
      return (
        <div
          className="w-full min-h-min relative p-2 border-b border-neutral-gray"
          key={i}
        >
          <CardAddress data={val} className="border-0" />
          {selectedAddress.id === val.id ? null : (
            <label
              role="button"
              htmlFor="addresses"
              onClick={() => {
                setSelectedAddress(val);
              }}
              className="button-primary px-5 absolute right-2 top-2"
            >
              Pilih Alamat
            </label>
          )}
          <div className="w-full flex justify-start">
            {address_id === val.id ? (
              <span className="text-primary font-bold text-sm">
                Alamat Utama
              </span>
            ) : (
              <button
                disabled={loading}
                className="button-general text-primary outline-0 py-0 hover:font-semibold disabled:pointer-events-none"
                onClick={() => changePrimaryAddress(val)}
              >
                {loading ? "Loading..." : "Jadikan Alamat Utama"}
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <input type="checkbox" id="addresses" className="modal-toggle" />
      <label htmlFor="addresses" className="modal cursor-pointer">
        <label className="modal-box relative h-1/2 flex flex-col" htmlFor="">
          <div className="relative w-full min-h-min flex items-start justify-between border-b border-neutral-gray pb-2">
            <span className="text-xl font-bold text-secondary">
              Pilih Alamat
            </span>
            <label
              htmlFor="addresses"
              className="button-outline rounded-full h-5 aspect-square"
            >
              ✕
            </label>
          </div>
          <div className="h-full w-full overflow-y-scroll border-b border-neutral-gray">
            {loadingAllAddress ? (
              <Loading className="h-full" />
            ) : (
              printAddresses()
            )}
          </div>
        </label>
      </label>
    </>
  );
}

export default ModalAllAddress;
