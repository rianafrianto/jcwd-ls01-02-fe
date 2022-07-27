import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { toast } from "react-toastify";
// import unknown from "../Assets/unknownpeople.png";
import DefaultPicture from "../../Assets/default_pic.png";
import ChangePassword from "../Component/ChangePassword";
import Button from "../Component/Button";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import ModalImageCropper from "../Component/ModalImageCropper";
import Loading from "../Component/Loading";
import searchIcon from "../../Assets/search-icon.png";
import CardOrderAdmin from "../../Admin/components/CardOrderAdmin";
import CardOrderUser from "../Component/CardOrderUser";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

function Profile() {
  const dispatch = useDispatch();
  const avaRef = useRef();
  const navigate = useNavigate();
  // const { id, username, email, profile_picture, verified, fullname } =
  //   useSelector((state) => state.user);
  const params = useParams();
  const { tab } = params;
  const { isLogin } = useSelector((state) => state.user);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changed, setChanged] = useState(false);
  const [modalImageCropper, setModalImageCropper] = useState(false);
  const [cropping, setCropping] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(1);
  const [total, setTotal] = useState(0);
  const [terms, setTerms] = useState("");
  const [sinceDate, setSinceDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [order, setOrder] = useState("ORDER BY o.id ASC");
  const [status, setStatus] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  // const firstparams = Object.fromEntries([...searchParams]);
  // console.log("Mounted:", firstparams);

  const getOrders = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `${API_URL}/transaction/orders/${status.split("_").join("-")}`,
        {
          params: { terms, sinceDate, toDate, page, limit, order },
        }
      );
      console.log(res);
      setData(res.data.data.orders);
      setTotal(res.data.data.total);
      setTotalPages(() => Math.ceil(res.data.data.total / limit));
      setMinPage(0);
      setMaxPage(() => {
        if (totalPages > 5) return 4;
        return totalPages - 1;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printOrders = (data) => {
    return data.map((val, i) => {
      return <CardOrderUser data={val} key={i} getOrders={getOrders} />;
    });
  };

  const printButtons = () => {
    let pages = [];
    let buttonsTotal = totalPages;
    for (let i = 0; i < buttonsTotal; i++) {
      pages.push("");
    }
    console.log({ buttonsTotal });
    return pages.map((val, i) => {
      return (
        <button
          key={i}
          className={`btn-plain h-8 aspect-square rounded-full ${
            page === i ? "bg-primary text-white" : ""
          }`}
          onClick={async () => {
            if (page !== i) {
              setPage(i);
            }
          }}
        >
          {i + 1}
        </button>
      );
    });
  };

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);
  }, [searchParams]);

  useEffect(() => {
    setSinceDate("");
    setToDate("");
    setTerms("");
    getOrders();
    return () => {};
  }, [status, limit, page]);

  useEffect(() => {
    if (sinceDate || toDate) getOrders();
  }, [sinceDate, toDate]);

  const modalImageCropperHandler = () => {
    setModalImageCropper(!modalImageCropper);
  };
  let {
    profile_picture,
    id,
    verified,
    username,
    email,
    fullname,
    // gender,
    // address,
    // age,
    error_mes,
  } = useSelector((state) => state.user);
  if (fullname == null) {
    fullname = "";
  }
  const [loadingVerify, setloadingVerify] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    ava: {
      url: profile_picture ? API_URL + profile_picture : DefaultPicture,
      file: null,
    },
  });
  const initialValues = {
    profile_picture: null,
    fullname,
    username,
    email,
  };
  const validationSchema = Yup.object({
    // validasi ketika user mengganti username
    fullname: Yup.string().max(50, "Must be 50 characters or fewer"),
    username: Yup.string()
      .min(4, "Username must be 4 to 15 characters.")
      .max(15, "Username  must be 4 to 15 characters.")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces/")
      .required("Username is required!"),
    // address: Yup.string().required("Address is required"),
  });

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  const onSubmit = async (values) => {
    let formData = new FormData();
    if (values.profile_picture) {
      values.profile_picture[0] = profilePicture.ava.file;
      formData.append("profile_picture", values.profile_picture[0]);
    }

    let dataInput = {
      username: values.username,
      fullname: values.fullname,
      gender: values.gender,
      address: values.address,
      age: values.age,
    };

    formData.append("data", JSON.stringify(dataInput));
    try {
      setChanged(false);
      setloadingSubmit(true);
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      let res = await axios.patch(
        `${API_URL}/profile/profile-update`,
        formData,
        {
          headers: { authorization: `${token}` },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("Updated!", {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      setloadingSubmit(false);
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

  const onCancel = () => {
    setCropping(null);
  };

  const tabPrint = (tab) => {
    switch (tab) {
      case "profile":
        return (
          <div className="w-full h-full bg-white">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                const {
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  isValid,
                  values,
                  dirty,
                  handleBlur,
                } = formik;
                return (
                  <div className="w-full h-full flex flex-col gap-y-5">
                    <div className="w-full text-lg font-semibold px-11 mt-5">
                      Edit Profile
                    </div>
                    {/* <div className="w-full text-center">baris</div> */}
                    <div className="flex w-full gap-x-14 justify-start px-9 h-[700px]">
                      <div className="w-44 px-2 flex flex-col aspect-square overflow-hidden gap-y-3">
                        <img
                          src={profilePicture.ava.url}
                          className="h-40 w-full object-cover "
                        />
                        <input
                          type="file"
                          ref={avaRef}
                          name="profile_picture"
                          id=""
                          accept=".jpg,.jpeg,.JPG,.JPEG,.png"
                          className="hidden"
                          onClick={(event) => (event.target.value = null)}
                          onChange={(event) => {
                            console.log("event :", event.target.files[0]);
                            if (event.target.files[0]) {
                              console.log("event :", event.target.files[0]);
                              let format =
                                event.target.files[0].name.split(".");
                              format = format[format.length - 1];
                              const reader = new FileReader();
                              reader.readAsDataURL(event.target.files[0]);
                              reader.addEventListener("load", () => {
                                setCropping({
                                  type: "ava",
                                  value: reader.result,
                                  fileType: event.target.files[0].type,
                                  format,
                                });
                                setChanged(true);
                                setModalImageCropper(true);
                              });
                              formik.setFieldValue("profile_picture", [
                                event.target.files[0],
                              ]);
                            } else {
                              setProfilePicture({
                                ...profilePicture,
                                ava: {
                                  url: profile_picture
                                    ? API_URL + profile_picture
                                    : DefaultPicture,
                                  file: null,
                                },
                              });
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="button-outline w-full h-11"
                          onClick={() => avaRef.current.click()}
                          disabled={!verified}
                        >
                          Pilih Foto
                        </button>
                        <div className="text-xs">
                          Besar file: Maksimum 5 mb. Extensi file yang
                          diperbolehkan: JPG, JPEG & PNG
                        </div>
                        <button
                          disabled={loadingEmail}
                          className="button-primary disabled:bg-gray-500 w-full h-11"
                          onClick={sendEmail}
                        >
                          Send Email Verification
                        </button>
                        <button
                          className="button-outline w-full h-11"
                          onClick={() => {
                            setChangePassword(true);
                          }}
                        >
                          Change Password
                        </button>
                        <div className="flex flex-col items-center text-center">
                          {loadingVerify ? (
                            <Loading
                              className={"animate-spin items-center h-30 w-30"}
                            />
                          ) : (
                            <>
                              <div
                                className={`text-l ${
                                  verified ? `text-primary` : `text-red-600`
                                }`}
                              >
                                {verified ? (
                                  "Already verified!"
                                ) : (
                                  <div className="flex flex-col">
                                    Not yet verified!
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        {!verified && (
                          <div className="text-sm mr-5 text-red-600 text-center">
                            Please verify your account to be able to change User
                            Details.
                          </div>
                        )}
                      </div>
                      <Form className="w-3/4 flex flex-col">
                        <div>
                          <div className="mb-2">Full Name</div>
                          <input
                            name="fullname"
                            type="text"
                            disabled={!verified}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setChanged(true);
                              handleChange(e);
                            }}
                            placeholder="Jhon Doe"
                            value={values.fullname}
                            className={`field-input w-full h-10 ${
                              errors.fullname ? "text-red-600" : "text-black"
                            }`}
                          />
                          {errors.fullname &&
                          dirty &&
                          values.fullname.length ? (
                            <div
                              name="fullname"
                              className="text-red-600 -mt-5 ml-2 text-xs absolute bg-white px-2 -bottom-2 pointer-events-none"
                            >
                              {errors.fullname}
                            </div>
                          ) : null}
                          <div className="mb-2 mt-3">User Name</div>
                          <input
                            name="username"
                            type="text"
                            disabled={!verified}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setChanged(true);
                              handleChange(e);
                            }}
                            placeholder="Jhondoe"
                            value={values.username}
                            className={`field-input w-full h-10 ${
                              errors.username
                                ? "outline outline-2 outline-red-600"
                                : "outline-gray-500 outline outline-1 focus:outline-2 focus:outline-black"
                            }`}
                          />
                          {errors.username && dirty ? (
                            <div
                              name="username"
                              className="text-red-600 -mt-5 ml-2 text-xs absolute bg-white px-2 -bottom-2 pointer-events-none"
                            >
                              {errors.username}
                            </div>
                          ) : null}
                          {error_mes && !errors.username && (
                            <div className="text-red-600 mt-1 ml-12 mx-2 text-xs absolute">
                              {error_mes}
                            </div>
                          )}
                          <div className="mb-2 mt-3">Email Address</div>
                          <input
                            name="email"
                            type="text"
                            value={email}
                            disabled
                            placeholder="Jhondoe@mail.com"
                            className={`field-input w-full h-10 bg-neutral-gray cursor-not-allowed`}
                          />
                          <div className={`text-gray text-xs mt-2`}>
                            Email cannot be changed.
                          </div>
                          <div className="mb-2 mt-3">Address</div>
                          <input
                            name="address"
                            type="text"
                            placeholder="Jl. Meruya No. 9 Kembangan Jakarta Barat"
                            className={`field-input w-full h-10 `}
                          />
                          <div className="w-full flex gap-x-5">
                            <div className="w-2/4">
                              <div className="mt-3">Age</div>
                              <input
                                name="age"
                                type="date"
                                placeholder=""
                                className={`field-input w-full h-10 mr-5 `}
                              />
                            </div>
                            <div className="w-2/4">
                              <div className="mt-3">Gender</div>
                              <select className="field-input w-full h-10 bg-white rounded-lg">
                                <option value="">All</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                          {loadingSubmit ? (
                            <Loading
                              className={"animate-spin h-10 w-10 ml-5"}
                            />
                          ) : (
                            <Button
                              type="submit"
                              buttonContent={
                                isSubmitting ? "Loading.." : "Save Changes"
                              }
                              disabled={!isValid || isSubmitting}
                              className={`bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-48 mt-6  ${
                                isSubmitting && "loading"
                              }`}
                            />
                          )}
                        </div>
                      </Form>
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
        );
      case "orders":
        return (
          <div className="w-full px-10 py-7">
            <div className="">Daftar Pemesanan</div>
            <div className="w-full flex mt-3">
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5 rounded-full"
                onClick={() => navigate("/myaccount/orders?status=all")}
              >
                Semua
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5 rounded-full"
                onClick={() =>
                  navigate("/myaccount/orders?status=Pengecekan-Resep")
                }
              >
                Pengecekan Resep
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5 rounded-full"
                onClick={() =>
                  navigate("/myaccount/orders?status=Pesanan-Diterima")
                }
              >
                Pesanan Diterima
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5  rounded-full"
                onClick={() =>
                  navigate("/myaccount/orders?status=Menunggu-Pembayaran")
                }
              >
                Menunggu Pembayaran
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5  rounded-full"
                onClick={() => navigate("/myaccount/orders?status=Diproses")}
              >
                Diproses
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5  rounded-full"
                onClick={() => navigate("/myaccount/orders?status=Dikirim")}
              >
                Dikirim
              </button>
              <button
                className="w-1/6 mr-4 h-10 button-outline py-5  rounded-full"
                onClick={() => navigate("/myaccount/orders?status=Selesai")}
              >
                Selesai
              </button>
              <button
                className="w-1/6 h-10 button-outline py-5  rounded-full"
                onClick={() => navigate("/myaccount/orders?status=Dibatalkan")}
              >
                Dibatalkan
              </button>
            </div>
            <div className="w-full flex h-11 justify-between gap-x-48 mt-4">
              <div className="flex gap-x-4 h-full w-full items-center">
                <div className="font-bold w-28 ">Jenis Obat</div>
                <div className="w-full flex gap-x-3">
                  <button className="button-outline w-full rounded-full">
                    Semua Obat
                  </button>
                  <button className="button-outline w-full rounded-full">
                    Obat Resep
                  </button>
                  <button className="button-outline w-full rounded-full">
                    Obat Bebas
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex gap-x-4 items-center">
                <span>Urutkan</span>
                <select className="select select-primary h-25 w-44 border border-neutral-gray p-2 rounded-lg">
                  <option value="" className="hover:bg-primary">
                    Terbaru
                  </option>
                  <option value="">Terakhir</option>
                </select>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-5 mt-4">
              {loading ? <Loading className="pt-56" /> : printOrders(data)}
            </div>
            <div className="w-full h-14 flex justify-between items-center px-4 py-3 mt-4">
              <div className="w-59 flex h-full items-center gap-x-2">
                Kartu per halaman
                <div className="dropdown dropdown-top dropdown-end">
                  <label
                    tabIndex="0"
                    className="h-full w-20 border border-neutral-gray p-1 rounded-lg focus:outline-primary flex gap-x-5 cursor-pointer"
                  >
                    {limit} <ChevronDownIcon className={`h-5`} />
                  </label>
                  <ul
                    tabIndex="0"
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
                  >
                    <li>
                      <button onClick={() => setLimit(1)}>1</button>
                    </li>
                    <li>
                      <button onClick={() => setLimit(2)}>2</button>
                    </li>
                    <li>
                      <button onClick={() => setLimit(3)}>3</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-8 min-w-min flex items-center gap-x-2">
                <button
                  className="button-outline h-7 aspect-square rounded-full"
                  onClick={() => setPage(0)}
                >
                  <ChevronDoubleLeftIcon className="h-5" />
                </button>
                <button
                  className="button-primary h-full aspect-square rounded-full"
                  disabled={page === minPage}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <ChevronLeftIcon className="h-7" />
                </button>
                <div className="h-full w-full flex gap-x-2">
                  {loading && !total ? (
                    <div className="w-[250px] h-full rounded-lg bg-neutral-gray button-loading flex justify-center items-center">
                      Loading ...
                    </div>
                  ) : (
                    printButtons()
                  )}
                </div>

                <button
                  className="button-primary h-full aspect-square rounded-full"
                  disabled={page === totalPages - 1}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  <ChevronRightIcon className="h-7" />
                </button>
                <button
                  className="button-outline h-7 aspect-square rounded-full"
                  onClick={() => setPage(totalPages - 1)}
                >
                  <ChevronDoubleRightIcon className="h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      case "payment-methods":
        return <>Metode Pembayaran</>;
      case "addresses":
        return <>Alamat Pengiriman</>;
      case "favorites":
        return <>Favorite</>;
      case "help":
        return <>Pesan Bantuan</>;
      default:
        return null;
    }
  };

  return (
    <>
      {changePassword && (
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        />
      )}
      {modalImageCropper && (
        <ModalImageCropper
          image={cropping}
          cropInit={cropping.crop}
          zoomInit={cropping.zoom}
          setPicture={setProfilePicture}
          picture={profilePicture}
          onCancel={onCancel}
          modalImageCropper={modalImageCropper}
          setModalImageCropper={setModalImageCropper}
          modalImageCropperHandler={modalImageCropperHandler}
        />
      )}
      <div className="h-full w-full bg-green-200 flex justify-center pt-20">
        <div className="container h-full flex px-24 py-14 gap-x-11">
          <div className="w-80 bg-white flex flex-col px-10">
            <div className="w-full h-20 flex items-center">Jane Doe</div>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/profile")}
            >
              Profil
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/orders")}
            >
              Proses Pemesanan
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/payment-methods")}
            >
              Metode Pembayaran
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/addresses")}
            >
              Alamat Pengiriman
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/favorites")}
            >
              Favorite
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 btn-plain"
              onClick={() => navigate("/myaccount/help")}
            >
              Pesan Bantuan
            </button>
          </div>
          <div className="w-full h-[550px] bg-white">{tabPrint(tab)}</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
