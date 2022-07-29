import React, { Fragment, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { categoryList, golonganList } from "../../Helpers/categoryList";
import { toast } from "react-toastify";

function AddDetails1(props) {
  const { setModalState, details1, setDetails1, editId } = props;
  let {
    name,
    NIE,
    category,
    golongan,
    tgl_kadaluarsa,
    indikasi,
    komposisi,
    cara_penyimpanan,
    principal,
    cara_pakai,
    peringatan,
  } = details1;

  const initialValues1 = {
    name,
    NIE,
    category,
    golongan,
    tgl_kadaluarsa,
    indikasi,
    komposisi,
    cara_penyimpanan,
    principal,
    cara_pakai,
    peringatan,
  };

  let newListCat = categoryList.map((val, i) => {
    return { content: val.cardText, value: `${i + 1}` };
  });
  const listCat = [{ content: "Kategori", value: "" }, ...newListCat];
  const listGol = [{ content: "Golongan", value: "" }, ...golonganList];

  const validationSchema1 = Yup.object({
    name: Yup.string().required("Wajib diisi"),
    NIE: Yup.string().required("Wajib diisi"),
    category: Yup.string().required("Wajib diisi"),
    golongan: Yup.string().required("Wajib diisi"),
    tgl_kadaluarsa: editId
      ? ""
      : Yup.date()
          .required("Wajib diisi")
          .min(new Date(), "Tanggal sudah lewat"),
    indikasi: Yup.string().required("Wajib diisi"),
    komposisi: Yup.string().required("Wajib diisi"),
    cara_penyimpanan: Yup.string().required("Wajib diisi"),
    principal: Yup.string().required("Wajib diisi"),
    cara_pakai: Yup.string().required("Wajib diisi"),
    peringatan: Yup.string().required("Wajib diisi"),
  });

  const onSubmit1 = (values) => {
    const {
      name,
      NIE,
      category,
      golongan,
      tgl_kadaluarsa,
      indikasi,
      komposisi,
      cara_penyimpanan,
      principal,
      cara_pakai,
      peringatan,
    } = values;
    const insertData = {
      name,
      NIE,
      category,
      golongan,
      tgl_kadaluarsa,
      indikasi,
      komposisi,
      cara_penyimpanan,
      principal,
      cara_pakai,
      peringatan,
    };
    setDetails1(insertData);
    setModalState(2);
  };

  return (
    <Formik
      initialValues={initialValues1}
      validationSchema={validationSchema1}
      onSubmit={onSubmit1}
      //   validateOnChange={false}
      //   validateOnBlur={false}
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
          resetForm,
        } = formik;
        return (
          <Form id="form1">
            <div className="overflow-y-scroll border-y w-full h-[340px] flex flex-col">
              <table>
                <thead>
                  <tr>
                    <th className="w-48"></th>
                    <th className="w-96"></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr>
                    <th>
                      Nama Produk <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        name="name"
                        placeholder="Masukkan Nama Produk"
                        type="text"
                        className={`field-input h-8 rounded ${
                          errors.name && touched.name ? "outline-red-700" : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.name && touched.name && errors.name}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      No. BPOM
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        name="NIE"
                        placeholder="Masukkan No. BPOM"
                        type="text"
                        className={`field-input h-8 rounded ${
                          errors.NIE && touched.NIE ? "outline-red-700" : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.NIE && touched.NIE && errors.NIE}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Kategori
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <select
                        name="category"
                        id="category"
                        placeholder="Masukkan Kategori"
                        type="text"
                        value={values.category}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`field-input h-8 rounded ${
                          errors.category && touched.category
                            ? "outline-red-700"
                            : null
                        }`}
                      >
                        {listCat.map((val, i) => {
                          return (
                            <option
                              key={i}
                              value={val.value}
                              disabled={i === 0}
                            >
                              {val.content}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.category && touched.category
                        ? errors.category
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Golongan
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <select
                        name="golongan"
                        id="golongan"
                        placeholder="Masukkan Golongan"
                        type="text"
                        value={values.golongan}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`field-input h-8 rounded ${
                          errors.golongan && touched.golongan
                            ? "outline-red-700"
                            : null
                        }`}
                      >
                        {listGol.map((val, i) => {
                          return (
                            <option
                              key={i}
                              value={val.value}
                              disabled={i === 0}
                            >
                              {val.content}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.golongan && touched.golongan
                        ? errors.golongan
                        : ""}
                    </td>
                  </tr>
                  {editId ? null : (
                    <tr>
                      <th>
                        Tgl. Kadaluarsa
                        <span className="text-red-700">*</span>
                      </th>
                      <td className="py-2">
                        <Field
                          name="tgl_kadaluarsa"
                          placeholder="1 STRIP @ 10 KAPSUL"
                          type="date"
                          className={`field-input h-8 rounded ${
                            errors.tgl_kadaluarsa && touched.tgl_kadaluarsa
                              ? "outline-red-700"
                              : null
                          }`}
                        />
                      </td>
                      <td className="text-red-600 pl-5">
                        {errors.tgl_kadaluarsa &&
                          touched.tgl_kadaluarsa &&
                          errors.tgl_kadaluarsa}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th>
                      Indikasi
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        as="textarea"
                        rows={3}
                        name="indikasi"
                        placeholder="Masukkan indikasi"
                        type="text"
                        className={`field-input h-auto rounded py-2 ${
                          errors.indikasi && touched.indikasi
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.indikasi && touched.indikasi && errors.indikasi}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Komposisi
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        as="textarea"
                        rows={3}
                        name="komposisi"
                        placeholder="Masukkan komposisi"
                        type="text"
                        className={`field-input h-auto rounded py-2 ${
                          errors.komposisi && touched.komposisi
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.komposisi &&
                        touched.komposisi &&
                        errors.komposisi}
                    </td>
                  </tr>

                  <tr>
                    <th>
                      Cara Penyimpanan
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        as="textarea"
                        rows={3}
                        name="cara_penyimpanan"
                        placeholder="Masukkan cara penyimpanan"
                        type="text"
                        className={`field-input h-auto rounded py-2 ${
                          errors.cara_penyimpanan && touched.cara_penyimpanan
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.cara_penyimpanan &&
                        touched.cara_penyimpanan &&
                        errors.cara_penyimpanan}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Principal
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        name="principal"
                        placeholder="Masukkan Principal"
                        type="text"
                        className={`field-input h-8 rounded ${
                          errors.principal && touched.principal
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.principal &&
                        touched.principal &&
                        errors.principal}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Cara Pakai
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        as="textarea"
                        rows={3}
                        name="cara_pakai"
                        placeholder="Masukkan cara pakai"
                        type="text"
                        className={`field-input h-auto rounded py-2 ${
                          errors.cara_pakai && touched.cara_pakai
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.cara_pakai &&
                        touched.cara_pakai &&
                        errors.cara_pakai}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      Peringatan
                      <span className="text-red-700">*</span>
                    </th>
                    <td className="py-2">
                      <Field
                        as="textarea"
                        rows={3}
                        name="peringatan"
                        placeholder="Masukkan peringatan"
                        type="text"
                        className={`field-input h-auto rounded py-2 ${
                          errors.peringatan && touched.peringatan
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </td>
                    <td className="text-red-600 pl-5">
                      {errors.peringatan &&
                        touched.peringatan &&
                        errors.peringatan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end h-20 items-center">
              <button
                form="form1"
                type="submit"
                className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                onClick={() => {
                  if (!isValid)
                    return toast.error("Data belum lengkap!", {
                      theme: "colored",
                      style: { backgroundColor: "#DC2626" },
                    });
                }}
              >
                Lanjutkan
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddDetails1;
