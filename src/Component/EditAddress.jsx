import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import * as Yup from "yup";
import Button from "./Button";
import FormikControl from "./Formik/FormikControl";
import { newAddressAction } from "../Redux/Reducers/Actions/UserActions";

function EditAddress({ data, switchModal, address }) {
  const {
    alamat,
    kode_kota,
    kode_provinsi,
    id,
    kode_pos,
    label,
    nama_belakang,
    nama_depan,
    nomor_hp,
    primary_address,
  } = data;
  const navigate = useNavigate();
  const topModal = useRef(null);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const [provinceId, setProvinceId] = useState(kode_provinsi);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([
    { content: "Kota/Kabupaten", value: 0 },
  ]);
  const [cityId, setCityId] = useState(kode_kota);
  const [kodePos, setKodePos] = useState(kode_pos);

  const initialValues = {
    label,
    nama_depan,
    nama_belakang,
    nomor_hp,
    provinsi: kode_provinsi,
    kota: kode_kota,
    alamat,
    kode_pos: kodePos,
    primaryAddress: primary_address,
  };
  console.log({ initialValues });

  const validationSchema = Yup.object({
    label: Yup.string().required("Wajib diisi"),
    nama_depan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[A-Za-z]+$/, "Hanya menggunakan huruf"),
    nama_belakang: Yup.string()
      .required("Wajib diisi")
      .matches(/^[A-Za-z]+$/, "Hanya menggunakan huruf"),
    nomor_hp: Yup.string()
      .required("Wajib diisi")
      .matches(/^[0-9]*$/, "Hanya menggunakan angka"),
    provinsi: Yup.string().required("Wajib diisi"),
    kota: Yup.string().required("Wajib diisi"),
    alamat: Yup.string().required("Wajib diisi"),
  });

  const getProvince = async () => {
    try {
      let res = await axios.get(`${API_URL}/raja-ongkir/provinces`);
      let data = res.data.data.map((val) => {
        return { value: val.id, content: val.province };
      });
      setProvinces([{ content: "Provinsi", value: "" }, , ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/raja-ongkir/cities?province_id=${provinceId}`
      );
      let data = res.data.data.map((val) => {
        return { value: val.id, content: val.city, kode_pos: val.postal_code };
      });
      setCities([{ content: "Kota/Kabupaten", value: 0 }, , ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch({ type: "LOADING" });
      console.log(values);
      switchModal();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getProvince();
    getCity();
    if (cityId)
      setKodePos(() => {
        for (let val of cities) {
          if (val?.value == cityId) {
            return val.kode_pos;
          }
        }
      });
    // eslint-disable-next-line
  }, [provinceId, cityId]);

  return (
    <div className="flex flex-col gap-y-2 px-2 pb-2">
      <div ref={topModal}>Alamat Pengiriman</div>
      <div className="w-full h-full flex">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const {
              handleChange,
              isSubmitting,
              isValid,
              handleBlur,
              errors,
              touched,
              values,
              dirty,
            } = formik;
            if (kodePos) values.kode_pos = kodePos;
            return (
              <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                {/* Label*/}
                <div className="w-full relative flex flex-col justify-between gap-y-2">
                  <FormikControl
                    control="INPUT"
                    label="Label Alamat"
                    name="label"
                    placeholder="Contoh: Apartemen"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.label}
                    type="text"
                    className={`${
                      errors.label && touched.label ? "outline-red-700" : null
                    }`}
                  />
                </div>
                {/* Info Penerima */}
                <div className="w-full">Info Penerima</div>
                <div className="w-full flex gap-x-3">
                  {/* Nama Depan*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Nama Depan"
                      name="nama_depan"
                      placeholder="John"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      defaultValue={values.nama_depan}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.nama_depan && touched.nama_depan
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                  </div>{" "}
                  {/* Nama Belakang*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Nama Belakang"
                      name="nama_belakang"
                      placeholder="Doe"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      defaultValue={values.nama_belakang}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.nama_belakang && touched.nama_belakang
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                  </div>{" "}
                </div>
                {/* Nomor HP*/}
                <div className="w-full relative flex flex-col justify-between gap-y-2">
                  <FormikControl
                    control="INPUT"
                    label="Nomor HP"
                    name="nomor_hp"
                    placeholder="8788888888"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    defaultValue={values.nomor_hp}
                    onBlur={handleBlur}
                    type="text"
                    className={`pl-14 ${
                      errors.nomor_hp && touched.nomor_hp
                        ? "outline-red-700"
                        : null
                    }`}
                  />
                  <span className="absolute top-8 border-r border-neutral-gray w-12 h-11 flex items-center justify-center">
                    +62
                  </span>
                </div>{" "}
                <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
                  {/* Provinsi*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="SELECT"
                      label="Provinsi"
                      name="provinsi"
                      placeholder="Provinsi"
                      onChange={(e) => {
                        handleChange(e);
                        setProvinceId(e.target.value);
                      }}
                      value={values.provinsi}
                      options={provinces}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.provinsi && touched.provinsi
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                  </div>{" "}
                  {/* Kota/Kabupaten*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="SELECT"
                      label="Kota/Kabupaten"
                      name="kota"
                      placeholder="Contoh: Alamat"
                      onChange={(e) => {
                        handleChange(e);
                        setCityId(e.target.value);
                      }}
                      value={values.kota}
                      options={cities}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.kota && touched.kota ? "outline-red-700" : null
                      }`}
                    />
                  </div>{" "}
                  {/* Kode Pos */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <label htmlFor="kode_pos">Kode Pos</label>
                    <input
                      label="Kode Pos"
                      name="kode_pos"
                      placeholder="Kode Pos"
                      disabled={true}
                      onBlur={handleBlur}
                      type="text"
                      className={`field-input ${
                        errors.kode_pos && touched.kode_pos
                          ? "outline-red-700"
                          : null
                      }`}
                      defaultValue={kodePos}
                    />
                    {errors.kode_pos && touched.kode_pos && (
                      <div className="absolute text-red-600 -bottom-5 right-0 text-sm">
                        {errors.kode_pos}
                      </div>
                    )}
                  </div>
                </div>
                {/* Alamat*/}
                <div className="w-full relative flex flex-col justify-between gap-y-2">
                  <FormikControl
                    control="INPUT"
                    label="Alamat"
                    name="alamat"
                    placeholder="Contoh: Alamat"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    defaultValue={values.alamat}
                    type="text"
                    className={`${
                      errors.alamat && touched.alamat ? "outline-red-700" : null
                    }`}
                  />
                </div>
                <div className="w-full relative flex items-center">
                  <Field
                    name="primaryAddress"
                    type="checkbox"
                    className={`checkbox checkbox-primary 
                      }`}
                  />
                  <label htmlFor="" className="ml-3">
                    Simpan sebagai alamat utama
                  </label>
                </div>
                <div className="w-full h-full flex gap-x-4">
                  <Button
                    type="button"
                    buttonContent={`Batalkan`}
                    disabled={!isValid || isSubmitting}
                    className={`button-outline w-full text-sm leading-5
                    }`}
                    onClick={switchModal}
                  />
                  <Button
                    type="submit"
                    buttonContent={
                      isSubmitting
                        ? "Loading.."
                        : !isValid
                        ? "Cek Kembali Data Kamu!"
                        : "Simpan Alamat"
                    }
                    disabled={!isValid || isSubmitting || !dirty}
                    className={`button-primary w-full disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed text-sm leading-5  ${
                      isSubmitting && "button-loading"
                    }`}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default EditAddress;
