import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      let auth = localStorage.getItem("user");
      if (auth) {
        dispatch({ type: "LOGIN", payload: { username: auth } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line
  }, []);

  return children;
}

export default AuthProvider;
