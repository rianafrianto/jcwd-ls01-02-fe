import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { newDateGenerator } from "../../Helpers/dateGenerator";

function ModalAddStock(props) {
  const { modalAddStock, closeModalAddStock, editId, setEditId } = props;
  let date = newDateGenerator();
  const initialValues = {
    hari_ini: new Date(),
    tgl_kadaluarsa: date,
    stock: 0,
  };
  console.log(initialValues.tgl_kadaluarsa);

  const validationSchema = {
    tgl_kadaluarsa: Yup.date().required("Wajib diisi"),
    //   .min(Yup.ref("hari_ini"), `Date needs to be before !!`),
    stock: Yup.number().required("Wajib diisi").min(1, "Kuantitas min. 1"),
  };

  const onClose = () => {
    closeModalAddStock();
    setEditId(null);
  };

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Transition appear show={modalAddStock} as={Fragment}>
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
                  <h1 className="font-bold">Tambah Kuantitas Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center px-2 py-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
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
                    } = formik;
                    return (
                      <Form id="form2">
                        <div className="h-[340px] border-y w-full flex flex-col">
                          <table>
                            <thead>
                              <tr>
                                <th>Nama Produk</th>
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
                                <th className="w-48"></th>
                                <th className="w-96"></th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody className="">
                              <tr>
                                <th>
                                  {`Kuantitas (stok)`}
                                  <span className="text-red-700">*</span>
                                </th>
                                <td className="py-2">
                                  <Field
                                    name="stock"
                                    placeholder={
                                      editId
                                        ? "Masukkan tambahan kuantitas"
                                        : "Masukkan kuantitas"
                                    }
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
                                <td className="text-red-600 pl-5">
                                  {errors.tgl_kadaluarsa &&
                                    touched.tgl_kadaluarsa &&
                                    errors.tgl_kadaluarsa}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="w-full flex justify-end h-20 items-center gap-x-5">
                          <button
                            form="form2"
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
                </Formik>{" "}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalAddStock;
