// import React, { useState } from 'react'

// const AddBill = () => {

//     const [items, setItems] = useState([
//         { productName: "", quantity: 1, price: 0, size: "", color: "" },
//     ]);

//     const handleItemChange = (index, e) => {
//         const { name, value } = e.target;
//         const newItems = [...items];
//         newItems[index][name] =
//             name === "quantity" || name === "price" ? Number(value) : value;
//         setItems(newItems);
//     };

//     const addItem = () => {
//         setItems([
//             ...items,
//             { productName: "", quantity: 1, price: 0, size: "", color: "" },
//         ]);
//     };

//     const removeItem = (index) => {
//         const newItems = items.filter((_, i) => i !== index);
//         setItems(newItems);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitted Items:", items);
//         alert("Check console for submitted items!");
//     };



//     return <form>
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-50">
//             <h1 className='text-3xl font-bold text-black mb-5 text-center'>Create Bill</h1>
//             <div className=''>
//                 <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
//                     <input
//                         type="text"
//                         placeholder="Enter Customer Name"
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
//                     <input
//                         type="text"
//                         placeholder="Enter Customer Phonenumber"
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>


//                 {items.map((item, index) => (
//                     <div
//                         key={index}
//                         className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end"
//                     >
//                         {/* Product Name */}
//                         <div className="sm:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Product Name
//                             </label>
//                             <input
//                                 type="text"
//                                 name="productName"
//                                 placeholder="Enter Product Name"
//                                 value={item.productName}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 className="w-full p-2 border border-gray-300 rounded "
//                                 required
//                             />
//                         </div>

//                         {/* Quantity */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Quantity
//                             </label>
//                             <input
//                                 type="number"
//                                 name="quantity"
//                                 min={1}
//                                 value={item.quantity}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 className="w-full p-2 border border-gray-300 rounded "
//                                 required
//                             />
//                         </div>

//                         {/* Price */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Price
//                             </label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 min={0}
//                                 value={item.price}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 className="w-full p-2 border border-gray-300 rounded "
//                                 required
//                             />
//                         </div>

//                         {/* Size */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Size
//                             </label>
//                             <input
//                                 type="text"
//                                 name="size"
//                                 value={item.size}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 className="w-full p-2 border border-gray-300 rounded "
//                                 placeholder="Enter Size"
//                             />
//                         </div>

//                         {/* Color */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Color
//                             </label>
//                             <input
//                                 type="text"
//                                 name="color"
//                                 value={item.color}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 className="w-full p-2 border border-gray-300 rounded "
//                                 placeholder="Enter Color"
//                             />
//                         </div>

//                         {/* Remove button */}
//                         <div>
//                             {items.length > 1 && (
//                                 <button
//                                     type="button"
//                                     onClick={() => removeItem(index)}
//                                     className="text-red-600 font-semibold hover:underline"
//                                 >
//                                     Remove
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//                 <button
//                     type="button"
//                     onClick={addItem}
//                     className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition"
//                 >
//                     + Add Item
//                 </button>

//                 {/* <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">subTotal</label>
//                     <input
//                         type="text"
//                         placeholder="Enter Customer Phonenumber"
//                         className="w-full p-2 border rounded"
//                     />
//                 </div> */}
//                 <div
//                     // key={index}
//                     className="grid grid-cols-5 w-lg:grid-cols-6 gap-4 mt-5 mb-3"
//                 >
//                     {/* Product Name */}
//                     <div className="sm:col-span-3">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             subTotal
//                         </label>
//                         <input
//                             type="text"
//                             name="productName"
//                             placeholder="Enter subTotal"
//                             // value={item.productName}
//                             // onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border border-gray-300 rounded "
//                             required
//                         />
//                     </div>

//                     {/* Quantity */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Discount
//                         </label>
//                         <input
//                             type="number"
//                             name="quantity"
//                             min={0}
//                             // value={item.quantity}
//                             // onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border border-gray-300 rounded "
//                             required
//                         />
//                     </div>

//                     {/* Price */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Tax
//                         </label>
//                         <input
//                             type="number"
//                             name="price"
//                             min={0}
//                             // value={item.price}
//                             // onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border border-gray-300 rounded "
//                             required
//                         />
//                     </div>
//                 </div>


//                 <div className="mb-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
//                     <input
//                         type="text"
//                         placeholder="Enter totalAmount"
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
//                     <select
//                         as="select"
//                         name="paymentMethod"
//                         className="w-full p-2 border border-gray-300 rounded-lg"
//                     >
//                         <option value="Cash">Cash</option>
//                         <option value="Card">Card</option>
//                         <option value="UPI">UPI</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition mt-3">
//                     Create Bill
//                 </button>
//             </div>

//         </div>
//     </form>
// }

// export default AddBill


import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAddBillsMutation, useUpdateBillsMutation } from "../../redux/api/bill.api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddBill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editData = location.state?.bill;
    const isEdit = location.state?.isEdit;

    const [addBill] = useAddBillsMutation();
    const [updateBill] = useUpdateBillsMutation();

    const [items, setItems] = useState(
        editData?.items || [{ productName: "", quantity: 1, price: "", size: "", color: "" }]
    );

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = name === "quantity" || name === "price" ? Number(value) : value;
        setItems(updatedItems);
    };

    const addItem = () => setItems([...items, { productName: "", quantity: 1, price: "", size: "", color: "" }]);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));


    const formik = useFormik({
        initialValues: {
            customerName: editData?.customerName || "",
            customerPhone: editData?.customerPhone || "",
            discount: editData?.discount || "",
            tax: editData?.tax || "",
            paymentMethod: editData?.paymentMethod || "",
        },
        validationSchema: yup.object({
            customerName: yup.string().required("Enter Name"),
            customerPhone: yup.string().required("Enter Phone"),
            paymentMethod: yup.string().required("Choose Payment Method"),
        }),
        onSubmit: (values, { resetForm }) => {
            const payload = {
                customerName: values.customerName,
                customerPhone: values.customerPhone,
                items,
                subTotal,
                discount: values.discount,
                tax: values.tax,
                totalAmount,
                paymentMethod: values.paymentMethod,
            };

            if (isEdit) {
                updateBill({ id: editData._id, data: payload }).unwrap()
                    .then(() => {
                        toast.success("Bill Updated Successfully");
                        navigate("/getallbill")
                    })
                    .catch((err) => toast.error(err?.data?.message || "Update failed"));
            } else {
                addBill(payload).unwrap()
                    .then(() => {
                        toast.success("Bill Created Successfully");
                        navigate("/getallbill")
                        resetForm();
                        setItems([{ productName: "", quantity: 1, price: "", size: "", color: "" }]);
                    })
                    .catch((err) => toast.error(err?.data?.message || "Add bill failed"));
            }
        }

    });


    const subTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discountPercent = Number(formik.values.discount) || 0;
    const taxPercent = Number(formik.values.tax) || 0;

    const discountAmount = (subTotal * discountPercent) / 100;
    const taxableAmount = subTotal - discountAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const totalAmount = taxableAmount + taxAmount;

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">{isEdit ? "Edit Bill" : "Create Bill"}</h1>

            {/* Customer */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Customer Name</label>
                    <input
                        name="customerName"
                        className="w-full p-2 border rounded"
                        placeholder="Enter Customer Name"
                        value={formik.values.customerName}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Customer Phone</label>
                    <input
                        name="customerPhone"
                        className="w-full p-2 border rounded"
                        placeholder="Enter Customer Phone"
                        value={formik.values.customerPhone}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>

            {/* Items */}
            {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-6 gap-3 mb-4 items-end">
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input
                            name="productName"
                            placeholder="Enter Product Name"
                            value={item.productName}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Qty</label>
                        <input
                            type="number"
                            min={1}
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Price</label>
                        <input
                            name="price"
                            placeholder="Enter Price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Size</label>
                        <input
                            name="size"
                            value={item.size}
                            placeholder="Enter size"
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Color</label>
                        <input
                            name="color"
                            placeholder="Enter Color"
                            value={item.color}
                            onChange={(e) => handleItemChange(index, e)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        {items.length > 1 && (
                            <button type="button" onClick={() => removeItem(index)} className="text-red-600 font-semibold hover:underline">
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <button type="button" onClick={addItem} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition">
                + Add Item
            </button>

            {/* Bill Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 mt-4">
                <div>
                    <label className="text-sm font-medium">Sub Total</label>
                    <input className="w-full p-2 border rounded" value={subTotal} readOnly />
                </div>
                <div>
                    <label className="text-sm font-medium">Discount</label>
                    <input
                        name="discount"
                        placeholder="Enter Discount"
                        value={formik.values.discount}
                        onChange={formik.handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Tax</label>
                    <input
                        name="tax"
                        placeholder="Enter Tax"
                        value={formik.values.tax}
                        onChange={formik.handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="text-sm font-medium">Total Amount</label>
                <input className="w-full p-2 border rounded" value={totalAmount} readOnly />
            </div>

            <div className="mb-6">
                <label className="text-sm font-medium">Payment Method</label>
                <select
                    name="paymentMethod"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled hidden>Choose Payment Method</option>
                    <option>Cash</option>
                    <option>Card</option>
                    <option>UPI</option>
                    <option>Other</option>
                </select>
            </div>

            <button type="submit" className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg">
                {isEdit ? "Update Bill" : "Create Bill"}
            </button>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                <p className="text-red-500 mt-1">{formik.errors.paymentMethod}</p>
            )}
        </form>
    );
};

export default AddBill;


// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useAddBillsMutation } from "../../redux/api/bill.api";
// import { toast } from "react-toastify";

// const AddBill = () => {

//     const [addBill, { isSuccess, isError, error }] = useAddBillsMutation();

//     const [items, setItems] = useState([
//         { productName: "", quantity: 1, price: "", size: "", color: "" },
//     ]);

//     /* ---------------- Item Functions ---------------- */
//     const handleItemChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedItems = [...items];
//         updatedItems[index][name] =
//             name === "quantity" || name === "price" ? Number(value) : value;
//         setItems(updatedItems);
//     };

//     /* ---------------- Formik ---------------- */
//     const formik = useFormik({
//         initialValues: {
//             customerName: "",
//             customerPhone: "",
//             discount: "",
//             tax: "",
//             paymentMethod: "",
//         },
//         validationSchema: yup.object({
//             customerName: yup.string().required("Enter Name"),
//             customerPhone: yup.string().required("Enter Phone"),
//         }),
//         onSubmit: (values, { resetForm }) => {
//             addBill({
//                 customerName: values.customerName,
//                 customerPhone: values.customerPhone,
//                 items: items,
//                 subTotal: subTotal,
//                 discount: values.discount,
//                 tax: values.tax,
//                 totalAmount: totalAmount,
//                 paymentMethod: values.paymentMethod,
//             });
//             resetForm();
//             setItems([{ productName: "", quantity: 1, price: "", size: "", color: "" }]);
//         },
//     });


//     const addItem = () => {
//         setItems([
//             ...items,
//             { productName: "", quantity: 1, price: "", size: "", color: "" },
//         ]);
//     };

//     const removeItem = (index) => {
//         setItems(items.filter((_, i) => i !== index));
//     };

//     /* ---------------- Calculations ---------------- */
//     const subTotal = items.reduce(
//         (sum, item) => sum + item.quantity * item.price,
//         0
//     );

//     const discountPercent = Number(formik.values.discount) || 0;
//     const taxPercent = Number(formik.values.tax) || 0;

//     const discountAmount = (subTotal * discountPercent) / 100;
//     const taxableAmount = subTotal - discountAmount;

//     const taxAmount = (taxableAmount * taxPercent) / 100;
//     const totalAmount = taxableAmount + taxAmount;


//     /* ---------------- Effects ---------------- */
//     useEffect(() => {
//         if (isSuccess) {
//             toast.success("Add bill SuccessFully");
//         }
//     }, [isSuccess]);

//     useEffect(() => {
//         if (isError) {
//             toast.error(error?.data?.message || "Add to bill failed !");
//         }
//     }, [isError]);

//     return (
//         <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//             <h1 className="text-3xl font-bold text-center mb-6">Create Bill</h1>

//             {/* Customer */}
//             <div className="space-y-4 mb-6">
//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Customer Name
//                     </label>
//                     <input
//                         name="customerName"
//                         className="w-full p-2 border rounded"
//                         placeholder="Enter Customer Name"
//                         value={formik.values.customerName}
//                         onChange={formik.handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1">
//                         Customer Phone
//                     </label>
//                     <input
//                         name="customerPhone"
//                         className="w-full p-2 border rounded"
//                         placeholder="Enter Customer Phone"
//                         value={formik.values.customerPhone}
//                         onChange={formik.handleChange}
//                     />
//                 </div>
//             </div>

//             {/* Items */}
//             {items.map((item, index) => (
//                 <div
//                     key={index}
//                     className="grid grid-cols-1 sm:grid-cols-6 gap-3 mb-4 items-end"
//                 >
//                     <div className="sm:col-span-2">
//                         <label className="text-sm font-medium">Product Name</label>
//                         <input
//                             name="productName"
//                             placeholder="Enter Product Name"
//                             value={item.productName}
//                             onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-medium">Qty</label>
//                         <input
//                             type="number"
//                             min={1}
//                             name="quantity"
//                             value={item.quantity}
//                             onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-medium">Price</label>
//                         <input
//                             // type="number"
//                             // min={0}
//                             name="price"
//                             placeholder="Enter Price"
//                             value={item.price}
//                             onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-medium">Size</label>
//                         <input
//                             name="size"
//                             value={item.size}
//                             placeholder="Enter size"
//                             onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm font-medium">Color</label>
//                         <input
//                             name="color"
//                             placeholder="Enter Color"
//                             value={item.color}
//                             onChange={(e) => handleItemChange(index, e)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         {items.length > 1 && (
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem(index)}
//                                 className="text-red-600 font-semibold hover:underline"
//                             >
//                                 Remove
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             ))}

//             <button
//                 type="button"
//                 onClick={addItem}
//                 className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition"
//             >
//                 + Add Item
//             </button>

//             {/* Bill Summary */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 mt-4">
//                 <div>
//                     <label className="text-sm font-medium">Sub Total</label>
//                     <input
//                         className="w-full p-2 border rounded"
//                         value={subTotal}
//                         readOnly
//                     />
//                 </div>

//                 <div>
//                     <label className="text-sm font-medium">Discount</label>
//                     <input
//                         // type="number"
//                         name="discount"
//                         placeholder="Enter Discount"
//                         value={formik.values.discount}
//                         onChange={formik.handleChange}
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="text-sm font-medium">Tax</label>
//                     <input
//                         // type="number"
//                         name="tax"
//                         placeholder="Enter Tax"
//                         value={formik.values.tax}
//                         onChange={formik.handleChange}
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="text-sm font-medium">Total Amount</label>
//                 <input
//                     className="w-full p-2 border rounded"
//                     value={totalAmount}
//                     readOnly
//                 />
//             </div>

//             <div className="mb-6">
//                 <label className="text-sm font-medium">Payment Method</label>
//                 <select
//                     name="paymentMethod"
//                     value={formik.values.paymentMethod}
//                     onChange={formik.handleChange}
//                     className="w-full p-2 border rounded"
//                 >
//                     <option value="" disabled hidden>
//                         Choose Payment Method
//                     </option>
//                     <option>Cash</option>
//                     <option>Card</option>
//                     <option>UPI</option>
//                     <option>Other</option>
//                 </select>
//             </div>

//             <button type="submit" className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg">
//                 Create Bill
//             </button>
//         </form>
//     );
// };

// export default AddBill;
