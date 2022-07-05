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
