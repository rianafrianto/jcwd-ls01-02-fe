import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../Helpers/API_URL";

function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [verification, setVerification] = useState(false);
  const { username, id, email, verified } = useSelector((state) => state.user);

  const verifying = async () => {
    try {
      if (verified) {
        navigate("/");
      }
      setLoading(true);
      let res = await axios.get(`${API_URL}/auth/verification`, {
        headers: {
          authorization: `${token}?verif`,
        },
      });
      dispatch({ type: "LOGIN", payload: res.data });
      setVerification(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setVerification(false);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setLoadingEmail(true);
      await axios.post(`${API_URL}/auth/email-verification`, {
        id,
        username,
        email,
      });
      toast.success("Email sent!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  useEffect(() => {
    verifying();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (verification) return <div>Verified! </div>;
  return (
    <div>
      Failed{" "}
      <button className="border border-1 border-black" onClick={sendEmail}>
        send
      </button>
    </div>
  );
}

export default Verification;
