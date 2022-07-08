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

export const loginAction = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        username: values.personId,
        email: values.personId,
        password: values.password,
      });
      Cookies.set("token", res.headers["x-token-access"]);
      dispatch({ type: "LOGIN", payload: res.data });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const logoutAction = () => {
  Cookies.remove("token");
  return {
    type: "LOGOUT",
  };
};
