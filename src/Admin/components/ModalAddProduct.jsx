import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../User/Component/Formik/FormikControl";

function ModalAddProduct(props) {
  const { modalAdd, closeModalAdd } = props;
  const [modalState, setmodalState] = useState(1);

  const initialValues = {
    name: "",
    NIE: "",
    category: "",
    golongan: "",
    tgl_kadaluarsa: "",
    satuan: "",
    indikasi: "",
    komposisi: "",
    kemasan: "",
    cara_penyimpanan: "",
    principal: "",
    cara_pakai: "",
    peringatan: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    NIE: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    category: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    golongan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    satuan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    indikasi: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    komposisi: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    kemasan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    cara_penyimpanan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    principal: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    cara_pakai: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    peringatan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
  });

  const cancelAdd = () => {
    closeModalAdd();
    setmodalState(1);
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
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  // onSubmit={submitProcess}
                >
                  {(formik) => {
                    const {
                      handleChange,
                      isSubmitting,
                      isValid,
                      handleBlur,
                      errors,
                      touched,
                    } = formik;
                    return (
                      <Form>
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
                                  <th>Nama Produk</th>
                                  <td className="py-2">
                                    <input
                                      name="name"
                                      placeholder="Masukkan nama produk"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>No. BPOM</th>
                                  <td className="py-2">
                                    <input
                                      name="NIE"
                                      placeholder="Masukkan No. BPOM"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Kategori</th>
                                  <td className="py-2">
                                    <input
                                      name="category"
                                      placeholder="Masukkan Kategori"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Golongan</th>
                                  <td className="py-2">
                                    <input
                                      name="golongan"
                                      placeholder="Masukkan golongan"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Tgl. Kadaluarsa</th>
                                  <td className="py-2">
                                    <input
                                      name="tgl_kadaluarsa"
                                      placeholder="1 STRIP @ 10 KAPSUL"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Satuan</th>
                                  <td className="py-2">
                                    <input
                                      name="satuan"
                                      placeholder="Masukkan satuan"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
                                      type="text"
                                      className={`field-input h-8 rounded ${
                                        errors.satuan && touched.satuan
                                          ? "outline-red-700"
                                          : null
                                      }`}
                                    />
                                  </td>
                                  <td className="text-red-600 pl-5">
                                    {errors.satuan &&
                                      touched.satuan &&
                                      errors.satuan}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Indikasi</th>
                                  <td className="py-2">
                                    <textarea
                                      rows={3}
                                      name="indikasi"
                                      placeholder="Masukkan indikasi"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Komposisi</th>
                                  <td className="py-2">
                                    <textarea
                                      rows={3}
                                      name="komposisi"
                                      placeholder="Masukkan komposisi"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Kemasan</th>
                                  <td className="py-2">
                                    <input
                                      name="kemasan"
                                      placeholder="1 STRIP @ 10 KAPSUL"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Cara Penyimpanan</th>
                                  <td className="py-2">
                                    <textarea
                                      rows={3}
                                      name="cara_penyimpanan"
                                      placeholder="Masukkan cara penyimpanan"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Principal</th>
                                  <td className="py-2">
                                    <input
                                      name="principal"
                                      placeholder="Masukkan Principal"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Cara Pakai</th>
                                  <td className="py-2">
                                    <textarea
                                      rows={3}
                                      name="cara_pakai"
                                      placeholder="Masukkan cara pakai"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                                  <th>Peringatan</th>
                                  <td className="py-2">
                                    <textarea
                                      rows={3}
                                      name="peringatan"
                                      placeholder="Masukkan peringatan"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                            type="submit"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            // disabled={!isValid}
                            onClick={() => setmodalState(2)}
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
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  // onSubmit={submitProcess}
                >
                  {(formik) => {
                    const {
                      handleChange,
                      isSubmitting,
                      isValid,
                      handleBlur,
                      errors,
                      touched,
                    } = formik;
                    return (
                      <Form>
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
                                  <th>Nama Produk</th>
                                  <td className="py-2">
                                    <input
                                      name="name"
                                      placeholder="Masukkan nama produk"
                                      onBlur={handleBlur}
                                      onChange={(e) => handleChange(e)}
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
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
                          <button
                            type="button"
                            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                            // disabled={!isValid}
                            onClick={() => setmodalState(1)}
                          >
                            Kembali
                          </button>
                          <button
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
