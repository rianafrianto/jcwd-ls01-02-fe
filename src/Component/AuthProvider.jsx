import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../Helpers/API_URL";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading Auth Provider</div>;
  return children;
}

export default AuthProvider;
