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
        style: { backgroundColor: "#DC2626" },
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
      const res = await axios.post(`${API_URL}/profile/new-address`, data, {
        headers: { authorization: token },
      });
      toast.success(`berhasil`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      if (data.primaryAddress) {
        dispatch({
          type: "CHANGEADDRESS",
          payload: res.data.data?.address_id,
        });
      }
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getPrimaryAddress = (data) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/profile/primary-address`, {
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

<<<<<<< HEAD:src/Redux/Reducers/Actions/UserActions/index.jsx
// export const addtoCart = (data) => {
//   return async (dispatch) => {
//     try {
//       let token = Cookies.get("token");
//       await axios.post(`${API_URL}/transaction/addtocart`, data, {
//         headers: { authorization: token },
//         params: { product_id: data, qty: data },
//       });
//       toast.success(`Berhasil masuk ke dalam Cart`, {
//         theme: "colored",
//         style: { backgroundColor: "#009B90" },
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
// };

// export const getCart = (data) => {
//   return async (dispatch) => {
//     try {
//       let token = Cookies.get("token");
//       const res = await axios.get(`${API_URL}/transaction/getcart`, {
//         headers: { authorization: token },
//       });
//       console.log(res.data.data);
//       toast.success(`Berhasil dalam cart`, {
//         theme: "colored",
//         style: { backgroundColor: "#009B90" },
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
// };
=======
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
>>>>>>> b1e21fa8c25c644948b6992caf613adae38ccf6b:src/Redux/Reducers/Actions/UserActions/index.js
