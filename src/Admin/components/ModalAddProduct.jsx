import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../User/Component/Formik/FormikControl";

function ModalAddProduct(props) {
  const { modalAdd, closeModalAdd } = props;
  const [modalState, setmodalState] = useState(1);

  const initialValues1 = {
    name: "",
    NIE: "",
    category: "",
    golongan: "",
    tgl_kadaluarsa: "",
    indikasi: "",
    komposisi: "",
    cara_penyimpanan: "",
    principal: "",
    cara_pakai: "",
    peringatan: "",
  };

  const initialValues2 = {
    stock: null,
    satuan: "",
    kemasan: "",
    price: null,
    modal: null,
    promo: null,
    berat: null,
  };

  const validationSchema1 = Yup.object({
    name: Yup.string().required("Wajib diisi"),
    NIE: Yup.string().required("Wajib diisi"),
    category: Yup.string().required("Wajib diisi"),
    golongan: Yup.string().required("Wajib diisi"),
    indikasi: Yup.string().required("Wajib diisi"),
    komposisi: Yup.string().required("Wajib diisi"),
    cara_penyimpanan: Yup.string().required("Wajib diisi"),
    principal: Yup.string().required("Wajib diisi"),
    cara_pakai: Yup.string().required("Wajib diisi"),
    peringatan: Yup.string().required("Wajib diisi"),
  });

  const validationSchema2 = Yup.object({
    stock: Yup.number().required("Wajib diisi").min(1, "Kuantitas min. 1"),
    satuan: Yup.string().required("Wajib diisi"),
    kemasan: Yup.string().required("Wajib diisi"),
    price: Yup.number().required("Wajib diisi").min(1, "Nilai Barang min. 1"),
    modal: Yup.number().required("Wajib diisi").min(1, "Nilai Jual min. 1"),
    promo: Yup.number().required("Wajib diisi").min(1, "Potongan Promo min. 1"),
    berat: Yup.number().required("Wajib diisi").min(1, "Berat min. 1"),
  });

  const cancelAdd = () => {
    closeModalAdd();
    setmodalState(1);
  };

  const onSubmit1 = (values) => {
    console.log(values);
    setmodalState(2);
  };
  const onSubmit2 = (values) => {
    console.log(values);
    setmodalState(3);
  };

  const printForm = (state) => {
    switch (state) {
      case 1:
        return (
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Tambah Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-3 py-1 absolute right-0"
                    onClick={cancelAdd}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <Formik
                  initialValues={initialValues1}
                  validationSchema={validationSchema1}
                  onSubmit={onSubmit1}
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
                        <div className="w-full h-[427px] flex flex-col">
                          <div className="h-16 border flex items-center">
                            <div className="text-md breadcrumbs">
                              <ul>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-primary font-bold text-white h-6 aspect-square text-center">
                                    1
                                  </span>
                                  Detail Obat
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                                    2
                                  </span>
                                  Detail Kuantitas & Harga
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                                    3
                                  </span>
                                  Gambar Produk
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="overflow-y-scroll h-full">
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
                                    Nama Produk{" "}
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="name"
                                      placeholder="Masukkan Nama Produk"
                                      type="text"
                                      className={`field-input h-8 rounded ${
                                        errors.name && touched.name
                                          ? "outline-red-700"
                                          : null
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
                                        errors.NIE && touched.NIE
                                          ? "outline-red-700"
                                          : null
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
                                    <Field
                                      name="category"
                                      placeholder="Masukkan Kategori"
                                      type="text"
                                      className={`field-input h-8 rounded ${
                                        errors.category && touched.category
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.category &&
                                      touched.category &&
                                      errors.category}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    Golongan
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="golongan"
                                      placeholder="Masukkan Golongan"
                                      type="text"
                                      className={`field-input h-8 rounded ${
                                        errors.golongan && touched.golongan
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.golongan &&
                                      touched.golongan &&
                                      errors.golongan}
                                  </td>
                                </tr>
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
                                        errors.tgl_kadaluarsa &&
                                        touched.tgl_kadaluarsa
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                </tr>
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
                                    {errors.indikasi &&
                                      touched.indikasi &&
                                      errors.indikasi}
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
                                        errors.cara_penyimpanan &&
                                        touched.cara_penyimpanan
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
                        </div>
                        <div className="w-full flex justify-end h-20 items-center border-t-2">
                          <button
                            form="form1"
                            type="submit"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            disabled={!isValid}
                          >
                            Lanjutkan
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        );
      case 2:
        return (
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Tambah Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-3 py-1 absolute right-0"
                    onClick={cancelAdd}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <Formik
                  initialValues={initialValues2}
                  validationSchema={validationSchema2}
                  onSubmit={onSubmit2}
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
                    } = formik;
                    return (
                      <Form id="form2">
                        <div className="w-full h-[427px] flex flex-col">
                          <div className="h-16 border flex items-center">
                            <div className="text-md breadcrumbs">
                              <ul>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                                    1
                                  </span>
                                  Detail Obat
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-primary font-bold text-white h-6 aspect-square text-center">
                                    2
                                  </span>
                                  Detail Kuantitas & Harga
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                                    3
                                  </span>
                                  Gambar Produk
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="overflow-y-scroll h-full">
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
                                    Kuantitas
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="stock"
                                      placeholder="Masukkan kuantitas"
                                      type="number"
                                      className={`field-input h-8 rounded ${
                                        errors.stock && touched.stock
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.stock &&
                                      touched.stock &&
                                      errors.stock}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    Satuan
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <select
                                      name="satuan"
                                      placeholder="Masukkan satuan"
                                      className={`field-input h-8 rounded ${
                                        errors.satuan && touched.satuan
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    ></select>
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.satuan &&
                                      touched.satuan &&
                                      errors.satuan}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    Kemasan
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      autoComplete={false}
                                      name="kemasan"
                                      placeholder="1 STRIP @ 10 KAPSUL"
                                      type="text"
                                      className={`field-input h-8 rounded ${
                                        errors.kemasan && touched.kemasan
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.kemasan &&
                                      touched.kemasan &&
                                      errors.kemasan}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    {`Nilai Barang (Rp)`}
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="price"
                                      placeholder="Masukkan Nilai Barang (Rp)"
                                      type="number"
                                      className={`field-input h-8 rounded ${
                                        errors.price && touched.price
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.price &&
                                      touched.price &&
                                      errors.price}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    {`Nilai Jual (Rp)`}
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="modal"
                                      placeholder="Masukkan Nilai Jual (Rp)"
                                      type="number"
                                      className={`field-input h-8 rounded ${
                                        errors.modal && touched.modal
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.modal &&
                                      touched.modal &&
                                      errors.modal}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    {`Potongan Promo (Rp)`}
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="promo"
                                      placeholder="Masukkan Potongan Promo (Rp)"
                                      type="number"
                                      className={`field-input h-8 rounded ${
                                        errors.promo && touched.promo
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.promo &&
                                      touched.promo &&
                                      errors.promo}
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    {`Berat (gram)`}
                                    <span className="text-red-700">*</span>
                                  </th>
                                  <td className="py-2">
                                    <Field
                                      name="berat"
                                      placeholder="Masukkan Berat (gram)"
                                      type="number"
                                      className={`field-input h-8 rounded ${
                                        errors.berat && touched.berat
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.berat &&
                                      touched.berat &&
                                      errors.berat}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
                          <div
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            // disabled={!isValid}
                            onClick={() => setmodalState(1)}
                          >
                            Kembali
                          </div>
                          <button
                            form="form2"
                            type="submit"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            disabled={!isValid}
                          >
                            Lanjutkan
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        );

      case 3:
        return (
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Tambah Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-3 py-1 absolute right-0"
                    onClick={cancelAdd}
                  >
                    ✕
                  </button>
                </Dialog.Title>
                <Formik
                  initialValues={initialValues2}
                  validationSchema={validationSchema2}
                  onSubmit={onSubmit2}
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
                    } = formik;
                    return (
                      <Form id="form3">
                        <div className="w-full h-[427px] flex flex-col">
                          <div className="h-16 border flex items-center">
                            <div className="text-md breadcrumbs">
                              <ul>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                                    1
                                  </span>
                                  Detail Obat
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-neutral-gray  font-bold text-white h-6 aspect-square text-center">
                                    2
                                  </span>
                                  Detail Kuantitas & Harga
                                </li>
                                <li className="w-full flex items-center gap-x-2">
                                  <span className="rounded-full bg-primary font-bold text-white h-6 aspect-square text-center">
                                    3
                                  </span>
                                  Gambar Produk
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="overflow-y-scroll h-full"></div>
                        </div>

                        <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
                          <div
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            // disabled={!isValid}
                            onClick={() => setmodalState(2)}
                          >
                            Kembali
                          </div>
                          <button
                            form="form2"
                            type="button"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            disabled={!isValid}
                            onClick={onSubmit2}
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <Transition appear show={modalAdd} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <>{printForm(modalState)}</>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalAddProduct;
