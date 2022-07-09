import axios from "axios";
import API_URL from "../../../../Helpers/API_URL";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data);
      dispatch({ type: "LOGIN", payload: res.data.data });
      Cookies.set("token", res.headers["x-token-access"]);
      toast.success(`welcome ${res.data.data.username}`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      console.log(error);
      toast.error("Coba cek data kamu!", {
        theme: "colored",
      });
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      throw new Error(error);
    }
  };
};

export const newAddressAction = (data) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/profile/new-address`, data, {
        headers: { authorization: token },
      });
      toast.success(`berhasil`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getPrimaryAddress = (data) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/transaction/primary-address`, {
        headers: { authorization: token },
        params: { address_id: data },
      });
      console.log(res.data.data);
      toast.success(`berhasil`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const addtoCart = (data) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/transaction/addtocart`, data, {
        headers: { authorization: token },
        params: { product_id: data, qty: data },
      });
      toast.success(`Berhasil masuk ke dalam Cart`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getCart = (data) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/transaction/getcart`, {
        headers: { authorization: token },
      });
      console.log(res.data.data);
      toast.success(`Berhasil dalam cart`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
