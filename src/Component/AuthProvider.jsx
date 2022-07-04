import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../Helpers/API_URL";

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const keepLogin = async () => {
    try {
      let token = Cookies.get("token");
      setLoading(true);
      if (token) {
        let res = await axios.get(`${API_URL}/auth/keep-login`, {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "LOGIN", payload: res.data });
      }
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  return children;
}

export default AuthProvider;
