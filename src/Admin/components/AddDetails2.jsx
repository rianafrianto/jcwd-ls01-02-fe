import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { satuanList } from "../../Helpers/categoryList";
import { toast } from "react-toastify";

function AddDetails2(props) {
  const { setModalState, details2, setDetails2, editId } = props;
  let { stock, satuan, kemasan, price, modal, promo, berat } = details2;
  const initialValues2 = {
    stock,
    satuan,
    kemasan,
    price,
    modal,
    promo,
    berat,
  };
  const listSatuan = [{ content: "Satuan", value: "" }, ...satuanList];

  const validationSchema2 = Yup.object({
    stock: editId
      ? ""
      : Yup.number().required("Wajib diisi").min(1, "Kuantitas min. 1"),
    satuan: Yup.string().required("Wajib diisi"),
    kemasan: Yup.string().required("Wajib diisi"),
    price: Yup.number().required("Wajib diisi").min(1, "Nilai Barang min. 1"),
    modal: Yup.number().required("Wajib diisi").min(1, "Nilai Jual min. 1"),
    promo: Yup.number().required("Wajib diisi").min(1, "Potongan Promo min. 1"),
    berat: Yup.number().required("Wajib diisi").min(1, "Berat min. 1"),
  });

  const onSubmit2 = (values) => {
    const { stock, satuan, kemasan, price, modal, promo, berat } = values;
    const insertData = {
      stock,
      satuan,
      kemasan,
      price,
      modal,
      promo,
      berat,
    };
    setDetails2(insertData);
    setModalState(3);
  };

  return (
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
              <div className="h-16 border-b-2 flex items-center">
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
                    <li className="w-full flex items-center gap-x-2">
                      <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                        4
                      </span>
                      Konfirmasi
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
                        {editId ? (
                          "Tambah Kuantitas"
                        ) : (
                          <>
                            Kuantitas
                            <span className="text-red-700">*</span>
                          </>
                        )}
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
                        {errors.stock && touched.stock && errors.stock}
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
                          id="satuan"
                          placeholder="Masukkan Satuan"
                          type="text"
                          value={values.satuan}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          className={`field-input h-8 rounded ${
                            errors.satuan && touched.satuan
                              ? "outline-red-700"
                              : null
                          }`}
                        >
                          {listSatuan.map((val, i) => {
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
                        {errors.satuan && touched.satuan && errors.satuan}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Kemasan
                        <span className="text-red-700">*</span>
                      </th>
                      <td className="py-2">
                        <Field
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
                        {errors.kemasan && touched.kemasan && errors.kemasan}
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
                        {errors.price && touched.price && errors.price}
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
                        {errors.modal && touched.modal && errors.modal}
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
                        {errors.promo && touched.promo && errors.promo}
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
                        {errors.berat && touched.berat && errors.berat}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
              <div
                role="button"
                className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                onClick={() => setModalState(1)}
              >
                Kembali
              </div>
              <button
                form="form2"
                type="submit"
                className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
                onClick={() => {
                  if (!isValid)
                    return toast.error("Data belum lengkap!", {
                      theme: "colored",
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

export default AddDetails2;
