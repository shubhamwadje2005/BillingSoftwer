import React, { useState } from 'react'
import { useAddProductMutation } from '../../redux/api/product.api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

const AddProduct = () => {
    const [select, setSelect] = useState()
    const [billphoto, setBillphoto] = useState([])
    const [addproduct, { isSuccess, isLoading, isError, error }] = useAddProductMutation()

    const formik = useFormik({
        initialValues: {
            companyName: select ? select.companyName : "",
            companycontact: select ? select.companycontact : "",
            productType: select ? select.productType : "",
            allProducttotalamout: select ? select.allProducttotalamout : "",
        },
        validationSchema: yup.object({
            companyName: yup.string().required("Enter CompanyName"),
            companycontact: yup.string().required("Enter Companycontact"),
            productType: yup.string().required("Enter ProductType"),
            allProducttotalamout: yup
                .number()
                .required("Enter amount")

        }),
        onSubmit: async (values, { resetForm }) => {
            if (billphoto.length === 0) {
                toast.error("Please upload at least one bill photo");
                return;
            }

            const fd = new FormData()

            fd.append("companyName", values.companyName)
            fd.append("companycontact", values.companycontact)
            fd.append("productType", values.productType)
            fd.append("allProducttotalamout", values.allProducttotalamout)

            for (let i = 0; i < billphoto.length; i++) {
                fd.append("billphoto", billphoto[i])
            }
            try {
                await addproduct(fd).unwrap();
                toast.success("Add Product Bill Successfully");
                resetForm();
                setBillphoto([]);
            } catch (err) {
                toast.error(err?.data?.message || "Add Product Bill Failed");
            }
        }
    })

    useEffect(() => {
        if (isError) {
            toast.success(error.data.message || "Add Product Bill Failed !")
        }
    }, [isError])

    return <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">

                {/* Form Header */}
                <div className="bg-orange-600 p-4 text-center">
                    <h2 className="text-xl font-bold text-black tracking-wide ">
                        Add Product Bill
                    </h2>
                </div>

                {/* <form className="p-6 space-y-5" onSubmit={formik.handleSubmit}> */}
                <form
                    className="p-6 space-y-5"
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                >


                    {/* Company Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500  mb-1 ml-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            // value={formData.companyName}
                            // onChange={handleChange}
                            {...formik.getFieldProps("companyName")}
                            required
                            placeholder="Enter Company Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all"
                        />
                        {formik.touched.companyName &&
                            formik.errors.companyName && (
                                <p className="text-red-500 text-xs">
                                    {formik.errors.companyName}
                                </p>
                            )}
                    </div>

                    {/* Company Contact */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500  mb-1 ml-1">
                            Company Contact
                        </label>
                        <input
                            type="text"
                            name="companycontact"
                            // value={formData.companycontact}
                            // onChange={handleChange}
                            {...formik.getFieldProps("companycontact")}
                            required
                            placeholder="Enter Contact Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Product Type (Enum) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500  mb-1 ml-1">
                                Product Type
                            </label>
                            <select
                                name="productType"
                                // value={formData.productType}
                                // onChange={handleChange}
                                {...formik.getFieldProps("productType")}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-slate-500 focus:outline-none appearance-none transition-all"
                            >
                                <option value="" disabled hidden>
                                    Choose Type
                                </option>
                                {/* <option value="">Choose Type</option> */}
                                <option value="cloth">Cloth</option>
                                <option value="footer">Footer</option>
                            </select>
                        </div>

                        {/* Total Amount */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500  mb-1 ml-1">
                                Total Amount
                            </label>
                            <input
                                type="number"
                                name="allProducttotalamout"
                                // value={formData.allProducttotalamout}
                                // onChange={handleChange}
                                {...formik.getFieldProps("allProducttotalamout")}
                                required
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Bill Photo Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500  mb-1 ml-1">
                            Upload Bill Photos
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-slate-400 transition-colors bg-gray-50">
                            <input
                                type="file"
                                name="billphoto"
                                multiple
                                required
                                accept="image/*"
                                onChange={(e) => setBillphoto(e.target.files)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                                <span className="text-sm text-gray-600">Click to upload or drag & drop</span>
                                <p className="text-[10px] text-gray-400 mt-1 ">Images Only (Multiple allowed)</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-600 hover:bg-orange-400 text-black font-bold py-3 rounded-lg shadow-md transform active:scale-[0.98] transition-all "
                    >
                        {isLoading ? "Submitting..." : "Submit Bill"}
                    </button>
                </form>
            </div>
        </div>
    </>
}

export default AddProduct

// import React, { useState } from "react";
// import { useAddProductMutation } from "../../redux/api/product.api";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const AddProduct = () => {
//     const [billphoto, setBillphoto] = useState([]);
//     const [fileKey, setFileKey] = useState(Date.now());

//     const [addproduct, { isLoading }] = useAddProductMutation();

//     const formik = useFormik({
//         initialValues: {
//             companyName: "",
//             companycontact: "",
//             productType: "cloth",
//             allProducttotalamout: "",
//         },
//         validationSchema: yup.object({
//             companyName: yup.string().required("Enter Company Name"),
//             companycontact: yup.string().required("Enter Company Contact"),
//             productType: yup.string().required("Select Product Type"),
//             allProducttotalamout: yup
//                 .number()
//                 .typeError("Enter valid amount")
//                 .required("Enter Amount"),
//         }),
//         onSubmit: async (values, { resetForm }) => {
//             if (!billphoto || billphoto.length === 0) {
//                 toast.error("Please upload at least one bill photo");
//                 return;
//             }

//             const fd = new FormData();
//             fd.append("companyName", values.companyName);
//             fd.append("companycontact", values.companycontact);
//             fd.append("productType", values.productType);
//             fd.append("allProducttotalamout", values.allProducttotalamout);

//             for (let i = 0; i < billphoto.length; i++) {
//                 fd.append("billphoto", billphoto[i]);
//             }

//             try {
//                 await addproduct(fd).unwrap();
//                 toast.success("Add Product Bill Successfully");

//                 resetForm();
//                 setBillphoto([]);
//                 setFileKey(Date.now()); // 🔥 FILE INPUT RESET FIX
//             } catch (err) {
//                 toast.error(err?.data?.message || "Add Product Bill Failed");
//             }
//         },
//     });

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//             <div className="w-full max-w-lg bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">

//                 {/* Header */}
//                 <div className="bg-orange-600 p-4 text-center">
//                     <h2 className="text-xl font-bold text-black tracking-wide">
//                         Add Product Bill
//                     </h2>
//                 </div>

//                 {/* Form */}
//                 <form
//                     className="p-6 space-y-5"
//                     onSubmit={formik.handleSubmit}
//                     encType="multipart/form-data"
//                 >

//                     {/* Company Name */}
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">
//                             Company Name
//                         </label>
//                         <input
//                             type="text"
//                             {...formik.getFieldProps("companyName")}
//                             placeholder="Enter Company Name"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
//                         />
//                         {formik.touched.companyName && formik.errors.companyName && (
//                             <p className="text-red-500 text-xs">{formik.errors.companyName}</p>
//                         )}
//                     </div>

//                     {/* Company Contact */}
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">
//                             Company Contact
//                         </label>
//                         <input
//                             type="text"
//                             {...formik.getFieldProps("companycontact")}
//                             placeholder="Enter Contact Number"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
//                         />
//                     </div>

//                     {/* Product Type + Amount */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">
//                                 Product Type
//                             </label>
//                             <select
//                                 {...formik.getFieldProps("productType")}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-slate-500"
//                             >
//                                 <option value="cloth">Cloth</option>
//                                 <option value="footer">Footer</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">
//                                 Total Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 {...formik.getFieldProps("allProducttotalamout")}
//                                 placeholder="0.00"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Bill Photos */}
//                     <div>
//                         <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">
//                             Upload Bill Photos
//                         </label>
//                         <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:border-slate-400">
//                             <input
//                                 key={fileKey}
//                                 type="file"
//                                 multiple
//                                 accept="image/*"
//                                 onChange={(e) => setBillphoto(e.target.files)}
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                             />
//                             <div className="text-center">
//                                 <span className="text-sm text-gray-600">
//                                     Click to upload or drag & drop
//                                 </span>
//                                 <p className="text-[10px] text-gray-400 mt-1">
//                                     Images Only (Multiple allowed)
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-orange-600 hover:bg-orange-400 text-black font-bold py-3 rounded-lg shadow-md transition-all"
//                     >
//                         {isLoading ? "Submitting..." : "Submit Bill"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddProduct;
