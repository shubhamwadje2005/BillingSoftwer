// import React, { useState } from 'react'
// import { useDeleteBillsMutation, useGetBillsQuery, useUpdateBillsMutation } from '../../redux/api/bill.api';

// const GetAllBill = () => {
//     const [selectedBill, setSelectedBill] = useState(null);
//     // const [pagi, setPagi] = useState({ start: 0, limit: 2 })
//     //    useEffect(() => {
//     //         getTodos(pagi)
//     //     }, [pagi])
//     const { data, isLoading, isError, error } = useGetBillsQuery()
//     const [deleteBill, { isSuccess, isError: deleteiserror, error: deleteerror }] = useDeleteBillsMutation()
//     const [updatebill, { isSuccess: updateIsSuccess, isError: updateIsError, error: updateError }] = useUpdateBillsMutation()
//     const bills = data?.bills || []

//     console.log("API DATA 👉", data)
//     console.log("BILLS 👉", bills)
//     return <>
//         <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
//             <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

//                 {/* Table Header Section */}
//                 <div className="bg-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
//                     <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
//                         Bills List
//                     </h2>
//                     <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full border border-slate-500">
//                         Total Records: {bills?.length || 0}
//                     </span>
//                 </div>

//                 {/* Table Container */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
//                         <thead>
//                             <tr className="bg-slate-100 border-b border-gray-300">
//                                 {/* <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">No.</th> */}
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">Customer Info</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">Product Details</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Qty</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Price</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Specs</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Totals</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Payment</th>
//                                 <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200">
//                             {bills && bills.length > 0 ? (
//                                 bills.map((bill, index) => (
//                                     <tr key={index} className="hover:bg-slate-50 transition-colors">
//                                         {/* <td className="px-2 sm:px-4 py-3 max-w-[140px] sm:max-w-none break-words">
//                                             <div className="text-sm text-gray-700 font-medium capitalize">
//                                                 {bill.id}
//                                             </div>
//                                         </td> */}
//                                         {/* Customer Info */}
//                                         <td className="px-2 sm:px-4 py-3">
//                                             <div className="text-xs sm:text-sm font-semibold text-gray-800 uppercase">{bill.customerName}</div>
//                                             <div className="text-[10px] sm:text-xs text-gray-500">{bill.customerPhone}</div>
//                                         </td>

//                                         {/* Product Name */}
//                                         <td className="px-2 sm:px-4 py-3 max-w-[140px] sm:max-w-none break-words">
//                                             <div className="text-sm text-gray-700 font-medium capitalize">
//                                                 {bill.items[0]?.productName}
//                                             </div>
//                                         </td>

//                                         {/* Quantity */}
//                                         <td className="px-2 sm:px-4 py-3 text-center">
//                                             <span className="text-[10px] sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded">
//                                                 {bill.items[0]?.quantity}
//                                             </span>
//                                         </td>

//                                         {/* Price */}
//                                         <td className="px-2 sm:px-4 py-3 text-center text-sm font-mono">
//                                             ₹{bill.items[0]?.price}
//                                         </td>

//                                         {/* Size & Color */}
//                                         <td className="px-2 sm:px-4 py-3 text-center">
//                                             <div className="flex flex-col gap-0.5 sm:gap-1 items-center">
//                                                 <span className="text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 rounded uppercase">
//                                                     Size: {bill.items[0]?.size || 'N/A'}
//                                                 </span>
//                                                 <span className="text-[10px] sm:text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 px-2 rounded uppercase">
//                                                     Color: {bill.items[0]?.color || 'N/A'}
//                                                 </span>
//                                             </div>
//                                         </td>

//                                         {/* Totals */}
//                                         <td className="px-2 sm:px-4 py-3 text-center">
//                                             <div className="text-xs text-gray-400 line-through">₹{bill.subTotal}</div>
//                                             <div className="text-sm font-bold text-slate-900 font-mono">₹{bill.totalAmount}</div>
//                                         </td>

//                                         {/* Payment Method */}
//                                         <td className="px-2 sm:px-4 py-3 text-center">
//                                             <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
//                                                 {bill.paymentMethod}
//                                             </span>
//                                         </td>

//                                         {/* Actions */}
//                                         <td className="px-2 sm:px-4 py-3">
//                                             <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
//                                                 <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
//                                                     <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter" onClick={() => updatebill({ id: bill._id, data: { customerName: "New Name" } })}>Edit</span>
//                                                 </button>
//                                                 <button
//                                                     className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
//                                                     title="View Bill"
//                                                     onClick={() => setSelectedBill(bill)}
//                                                 >
//                                                     <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">View</span>
//                                                 </button>
//                                                 <button className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
//                                                     <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter" onClick={() => deleteBill(bill._id)}>Delete</span>
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="8" className="px-2 sm:px-6 py-12 text-center text-gray-400 italic text-sm">
//                                         No bills found in the records.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 {bills &&
//                     [...Array(Math.ceil(bills.total / pagi.limit))].map((_, i) => {
//                         const isActive = pagi.start / pagi.limit === i;

//                         return (
//                             <button
//                                 key={i}
//                                 onClick={() =>
//                                     setPagi({ ...pagi, start: pagi.limit * i })
//                                 }
//                                 className={`px-3 py-1 rounded-md text-sm font-medium transition
//             ${isActive
//                                         ? "bg-yellow-500 text-black"
//                                         : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                                     }`}
//                             >
//                                 {i + 1}
//                             </button>
//                         );
//                     })}
//             </div> */}




//             {/* View Bill Modal */}
//             {/* {selectedBill && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
//                         <button
//                             onClick={() => setSelectedBill(null)}
//                             className="absolute top-3 right-3 text-gray-500"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-xl font-bold mb-4">
//                             Bill Details
//                         </h2>

//                         <p>
//                             <strong>Customer:</strong>{" "}
//                             {selectedBill.customerName}
//                         </p>
//                         <p>
//                             <strong>Phone:</strong>{" "}
//                             {selectedBill.customerPhone}
//                         </p>

//                         <table className="w-full mt-4 border">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="border px-3 py-2">Product</th>
//                                     <th className="border px-3 py-2">Qty</th>
//                                     <th className="border px-3 py-2">Price</th>
//                                     <th className="border px-3 py-2">Size</th>
//                                     <th className="border px-3 py-2">Color</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {selectedBill.items.map((item, i) => (
//                                     <tr key={i}>
//                                         <td className="border px-3 py-2">
//                                             {item.productName}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.quantity}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             ₹{item.price}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.size}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.color}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <div className="mt-4 text-right">
//                             <p>SubTotal: ₹{selectedBill.subTotal}</p>
//                             <p>Discount: ₹{selectedBill.discount}</p>
//                             <p>Tax: ₹{selectedBill.tax}</p>
//                             <p className="text-lg font-bold">
//                                 Total: ₹{selectedBill.totalAmount}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

//             {selectedBill && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
//                     <div className="bg-white w-full max-w-[350px] rounded-sm shadow-2xl relative font-mono text-black overflow-hidden">

//                         {/* Close Button - UI साठी */}
//                         <button
//                             onClick={() => setSelectedBill(null)}
//                             className="absolute top-1 right-1 text-gray-400 hover:text-black print:hidden"
//                         >
//                             ✕
//                         </button>

//                         {/* RECEIPT CONTENT */}
//                         <div className="p-4 sm:p-6">

//                             {/* Header Section */}
//                             <div className="text-center mb-4">
//                                 <h1 className="text-lg font-bold uppercase tracking-widest">MAITARI MENSWEAR</h1>
//                                 <p className="text-[10px] uppercase">Address : Lorem Ipsum, City</p>
//                                 <p className="text-[10px]">CONTACT NO : +91 90000 00000</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>
//                             <div className="text-center font-bold text-sm tracking-widest my-1">CASH RECEIPT</div>
//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Metadata Section */}
//                             <div className="text-[11px] mb-3">
//                                 <div className="flex justify-between">
//                                     <span>DATE : {new Date().toLocaleDateString()}</span>
//                                     <span>TIME : {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                                 </div>
//                                 <p>CUSTOMER : {selectedBill.customerName.toUpperCase()}</p>
//                                 <p>CASHIER : ADMIN</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Items Table */}
//                             <div className="text-[12px]">
//                                 <div className="flex justify-between font-bold mb-1">
//                                     <span>DESCRIPTION</span>
//                                     <span>PRICE</span>
//                                 </div>
//                                 {selectedBill.items.map((item, i) => (
//                                     <div key={i} className="flex justify-between mb-1">
//                                         <span className="uppercase">
//                                             {item.productName} {item.size && `(${item.size})`}
//                                         </span>
//                                         <span>{item.quantity * item.price}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Calculation Section */}
//                             <div className="text-[12px]">
//                                 <div className="flex justify-between font-bold text-sm">
//                                     <span>TOTAL</span>
//                                     <span>{selectedBill.subTotal}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span>{selectedBill.discount}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Tax</span>
//                                     <span>{selectedBill.tax}</span>
//                                 </div>
//                                 <div className="border-t border-dashed border-black my-2"></div>
//                                 <div className="flex justify-between mt-1">
//                                     {/* <span>Cash</span> */}
//                                     <span>{selectedBill.paymentMethod}</span>
//                                     <span>{selectedBill.totalAmount}</span>
//                                 </div>

//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Payment Info */}
//                             <div className="text-[11px] mb-4">
//                                 <p className="uppercase">Payment: {selectedBill.paymentMethod}</p>
//                                 <p>Approval: #12345</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Footer */}
//                             <div className="text-center mt-4">
//                                 <p className="font-bold text-sm tracking-widest">THANK YOU!</p>

//                                 {/* Dummy Barcode Area */}
//                                 <div className="flex flex-col items-center mt-3">
//                                     <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)]"></div>
//                                     <p className="text-[9px] mt-1 tracking-[4px]">000123456789</p>
//                                 </div>
//                             </div>

//                         </div>

//                         {/* Bottom Serrated Edge Effect */}
//                         <div className="h-2 w-full bg-[linear-gradient(-45deg,transparent_5px,white_5px),linear-gradient(45deg,transparent_5px,white_5px)] bg-[length:10px_10px]"></div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     </>
// };

// export default GetAllBill




import React, { useState, useEffect } from "react";
import AddBill from "./AddBill";
import { GrOverview } from "react-icons/gr";
import { useDeleteBillsMutation, useGetBillsQuery, useLazyGetPaginationBillsQuery, useUpdateBillsMutation } from "../../redux/api/bill.api";
import View from "./Viewbill";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GetAllBill = () => {
    const [selectedBill, setSelectedBill] = useState(null);
    const [editBill, setEditBill] = useState(null);
    const navigate = useNavigate()
    const [pagi, setPagi] = useState({ start: 0, limit: 2 })
    const [search, setSearch] = useState("");

    const { data, isLoading, isError, error } = useGetBillsQuery();
    // console.log("add bills cha data", data)
    const [deleteBill, { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError }] = useDeleteBillsMutation();
    const [updatebill, { isSuccess: updateIsSuccess, isError: updateIsError, error: updateError }] = useUpdateBillsMutation();
    const [getbillpagi, { data: billdata }] = useLazyGetPaginationBillsQuery()

    // const bills = data?.bills || [];
    const bills = billdata?.result?.length
        ? billdata.result
        : data?.bills || [];

    const sourceBills =
        search.trim().length > 0
            ? data?.bills || []   // search = full data
            : bills;              // no search = paginated


    const totalPages = Math.ceil(
        (billdata?.total || data?.bills?.length || 0) / pagi.limit
    );

    const filteredData = sourceBills.filter((bill) => {
        const text = search.toLowerCase();

        return (
            bill?.customerName?.toLowerCase().includes(text) ||
            bill?.customerPhone?.toString().includes(text) ||
            bill?.items?.some(item =>
                item.productName?.toLowerCase().includes(text)
            ) ||
            bill?.paymentMethod?.toLowerCase().includes(text)
        );
    });





    useEffect(() => {
        getbillpagi(pagi)
    }, [pagi])

    useEffect(() => {
        if (deleteIsSuccess) {
            toast.success("Bill Delete is SuccessFully ")
            navigate("/issoftdeletebill")
        }
    }, [deleteIsSuccess])
    useEffect(() => {
        if (deleteIsError) {
            toast.error(deleteError.data.message || "Bill Delete is Failed ! ")
        }
    }, [deleteIsError])


    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Bill Update is SuccessFully ")
        }
    }, [updateIsSuccess])

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError?.data?.message || "Bill Update is Failed!")
        }
    }, [updateIsError])




    return (
        <>
            <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

                    {/* Table Header */}
                    <div className="bg-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                            Bills List
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <input
                                type="text"
                                placeholder="Search customer name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-3 py-1.5 text-sm border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full border border-slate-500">
                                Total Records: {billdata?.total || data?.bills?.length || 0}
                            </span>
                        </div>

                    </div>

                    {/* Table */}
                    <div className="overflow-auto max-h-[60vh]">
                        <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
                            <thead className="sticky top-0 z-10 bg-slate-100">
                                <tr className="border-b border-gray-300">
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">Customer Info</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">Product Details</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Qty</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Price</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Specs</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Totals</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Payment</th>
                                    <th className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredData && filteredData.length > 0 ? (
                                    filteredData.map((bill, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                            {/* Customer Info */}
                                            <td className="px-2 sm:px-4 py-3">
                                                <div className="text-xs sm:text-sm font-semibold text-gray-800 uppercase">{bill.customerName}</div>
                                                <div className="text-[10px] sm:text-xs text-gray-500">{bill.customerPhone}</div>
                                            </td>

                                            {/* Product Name */}
                                            <td className="px-2 sm:px-4 py-3 max-w-[140px] sm:max-w-none break-words">
                                                <div className="text-sm text-gray-700 font-medium capitalize">
                                                    {bill.items[0]?.productName}
                                                </div>
                                            </td>

                                            {/* Quantity */}
                                            <td className="px-2 sm:px-4 py-3 text-center">
                                                <span className="text-[10px] sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {bill.items[0]?.quantity}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-2 sm:px-4 py-3 text-center text-sm font-mono">
                                                ₹{bill.items[0]?.price}
                                            </td>

                                            {/* Size & Color */}
                                            <td className="px-2 sm:px-4 py-3 text-center">
                                                <div className="flex flex-col gap-0.5 sm:gap-1 items-center">
                                                    <span className="text-[10px] sm:text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 rounded uppercase">
                                                        Size: {bill.items[0]?.size || 'N/A'}
                                                    </span>
                                                    <span className="text-[10px] sm:text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 px-2 rounded uppercase">
                                                        Color: {bill.items[0]?.color || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Totals */}
                                            <td className="px-2 sm:px-4 py-3 text-center">
                                                <div className="text-xs text-gray-400 line-through">₹{bill.subTotal}</div>
                                                <div className="text-sm font-bold text-slate-900 font-mono">₹{bill.totalAmount}</div>
                                            </td>

                                            {/* Payment Method */}
                                            <td className="px-2 sm:px-4 py-3 text-center">
                                                <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                    {bill.paymentMethod}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-2 sm:px-4 py-3">
                                                <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                                                    {/* Edit Button */}
                                                    <button
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                        title="Edit"
                                                        onClick={() => navigate("/addbill", {
                                                            state: { bill, isEdit: true }
                                                        })}
                                                    >
                                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Edit</span>
                                                    </button>

                                                    {/* View Button */}
                                                    <button
                                                        className="p-1.5 text-green-700 hover:bg-slate-100 rounded transition-colors"
                                                        title="View Bill"
                                                        onClick={() => setSelectedBill(bill)}
                                                    // onClick={() => navigate(`/bill/recpite/${bill._id}`)}
                                                    >
                                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Recpite</span>
                                                    </button>
                                                    <button
                                                        className="p-1.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
                                                        title="View Bill"
                                                        // onClick={() => setSelectedBill(bill)}
                                                        onClick={() => navigate(`/bill/view/${bill._id}`)}
                                                    >
                                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">
                                                            View
                                                        </span>
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                        onClick={() => deleteBill(bill._id)}
                                                    >
                                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <tr>
                                            <td colSpan="8" className="px-2 sm:px-6 py-12 text-center text-gray-400 italic text-sm">
                                                {search
                                                    ? `No bills found for "${search}"`
                                                    : "No bills found in the records."}
                                            </td>
                                        </tr>

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="flex justify-center gap-2 mt-10">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPagi({ ...pagi, start: i * pagi.limit })}
                            className={`px-4 py-2 rounded ${i === pagi.start / pagi.limit
                                ? "bg-[#145EFB] text-white"
                                : "border border-[#145EFB] text-[#145EFB]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                </div>

                {/* View Bill Modal */}
                {selectedBill && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
                        <div className="bg-white w-full max-w-[350px] rounded-sm shadow-2xl relative font-mono text-black overflow-hidden">

                            <button
                                onClick={() => setSelectedBill(null)}
                                className="absolute top-1 right-1 text-gray-400 hover:text-black print:hidden"
                            >
                                ✕
                            </button>

                            <div className="p-4 sm:p-6">

                                <div className="text-center mb-4">
                                    <h1 className="text-lg font-bold uppercase tracking-widest">MAITARI MENSWEAR</h1>
                                    <p className="text-[10px] uppercase">Address : Lorem Ipsum, City</p>
                                    <p className="text-[10px]">CONTACT NO : +91 90000 00000</p>
                                </div>

                                <div className="border-t border-dashed border-black my-2"></div>
                                <div className="text-center font-bold text-sm tracking-widest my-1">CASH RECEIPT</div>
                                <div className="border-t border-dashed border-black my-2"></div>

                                <div className="text-[11px] mb-3">
                                    <div className="flex justify-between">
                                        <span>DATE : {new Date().toLocaleDateString()}</span>
                                        <span>TIME : {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p>CUSTOMER : {selectedBill.customerName.toUpperCase()}</p>
                                    <p>CASHIER : ADMIN</p>
                                </div>

                                <div className="border-t border-dashed border-black my-2"></div>

                                <div className="text-[12px]">
                                    <div className="flex justify-between font-bold mb-1">
                                        <span>DESCRIPTION</span>
                                        <span>PRICE</span>
                                    </div>
                                    {selectedBill.items.map((item, i) => (
                                        <div key={i} className="flex justify-between mb-1">
                                            <span className="uppercase">
                                                {item.productName} {item.size && `(${item.size})`}
                                            </span>
                                            <span>{item.quantity * item.price}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-dashed border-black my-2"></div>

                                <div className="text-[12px]">
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>TOTAL</span>
                                        <span>{selectedBill.subTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span>{selectedBill.discount ?? "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>{selectedBill.tax ?? "N/A"}</span>
                                    </div>
                                    <div className="border-t border-dashed border-black my-2"></div>
                                    <div className="flex justify-between mt-1">
                                        <span>{selectedBill.paymentMethod}</span>
                                        <span>{selectedBill.totalAmount}</span>
                                    </div>

                                </div>

                                <div className="border-t border-dashed border-black my-2"></div>

                                <div className="text-[11px] mb-4">
                                    <p className="uppercase">Payment: {selectedBill.paymentMethod}</p>
                                    <p>Approval: #12345</p>
                                </div>

                                <div className="border-t border-dashed border-black my-2"></div>

                                <div className="text-center mt-4">
                                    <p className="font-bold text-sm tracking-widest">THANK YOU!</p>

                                    <div className="flex flex-col items-center mt-3">
                                        <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)]"></div>
                                        <p className="text-[9px] mt-1 tracking-[4px]">000123456789</p>
                                    </div>
                                </div>

                            </div>

                            <div className="h-2 w-full bg-[linear-gradient(-45deg,transparent_5px,white_5px),linear-gradient(45deg,transparent_5px,white_5px)] bg-[length:10px_10px]"></div>
                        </div>
                    </div>
                )}


                {/* Edit Bill Modal */}
                {/* {editBill && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
                        <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative">

                            <button
                                onClick={() => setEditBill(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold z-50"
                            >
                                ✕
                            </button>

                            <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4">Edit Bill</h2>

                                <AddBill
                                    initialValues={{
                                        customerName: editBill.customerName,
                                        customerPhone: editBill.customerPhone,
                                        items: editBill.items,
                                        discount: editBill.discount,
                                        tax: editBill.tax,
                                        paymentMethod: editBill.paymentMethod,
                                    }}
                                    onSubmit={(updatedData) => {
                                        updatebill({ id: editBill._id, data: updatedData });
                                        setEditBill(null);
                                    }}
                                />

                            </div>
                        </div>
                    </div>
                )} */}

            </div >
        </>
    );
};

export default GetAllBill;


// imp code
// import React, { useState } from 'react'

// const GetAllBill = () => {
//     const [selectedBill, setSelectedBill] = useState(null);
//     // const [pagi, setPagi] = useState({ start: 0, limit: 2 })
//     //    useEffect(() => {
//     //         getTodos(pagi)
//     //     }, [pagi])
//     const bills = [
//         {
//             customerName: "Rahul",
//             customerPhone: "9876543210",
//             items: [
//                 {
//                     productName: "Pant",
//                     quantity: 1,
//                     price: 1200,
//                     size: "32",
//                     color: "Black",
//                 },
//             ],
//             subTotal: 1200,
//             discount: 0,
//             tax: 0,
//             totalAmount: 1200,
//             paymentMethod: "UPI",
//         },
//         {
//             customerName: "Amit",
//             customerPhone: "9123456789",
//             items: [
//                 {
//                     productName: "Shirt",
//                     quantity: 2,
//                     price: 800,
//                     size: "M",
//                     color: "Blue",
//                 },
//             ],
//             subTotal: 1600,
//             discount: 100,
//             tax: 50,
//             totalAmount: 1550,
//             paymentMethod: "Cash",
//         },
//     ];

//     return <>


//         <div className="p-6 max-w-7xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6 text-center">
//                 Bills List
//             </h1>
//             {/* <select onChange={e => setPagi({ start: 0, limit: +e.target.value })}>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="5">5</option>
//                 <option value="10">10</option>
//             </select> */}
//             {/* Table */}
//             <div className="overflow-x-auto bg-white shadow rounded-lg">
//                 <table className="min-w-full border border-gray-200">
//                     <thead className="bg-orange-500 text-black">
//                         <tr>
//                             {/* <th className="px-4 py-3 border">NO.</th> */}
//                             <th className="px-4 py-3 border">Customer</th>
//                             <th className="px-4 py-3 border">Phone</th>
//                             <th className="px-4 py-3 border">Product</th>
//                             <th className="px-4 py-3 border">Qty</th>
//                             <th className="px-4 py-3 border">Price</th>
//                             <th className="px-4 py-3 border">Size</th>
//                             <th className="px-4 py-3 border">Color</th>
//                             <th className="px-4 py-3 border">SubTotal</th>
//                             <th className="px-4 py-3 border">Total</th>
//                             <th className="px-4 py-3 border">Payment</th>
//                             <th className="px-4 py-3 border">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {bills.map((bill, index) => (
//                             <tr
//                                 key={index}
//                                 className="hover:bg-gray-300 transition"
//                             >
//                                 {/* <td className="px-4 py-2 border">
//                                     {pagi.start + index + 1}
//                                 </td> */}
//                                 <td className="px-4 py-2 border">
//                                     {bill.customerName}
//                                 </td>
//                                 <td className="px-4 py-2 border">
//                                     {bill.customerPhone}
//                                 </td>
//                                 <td className="px-4 py-2 border">
//                                     {bill.items[0].productName}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].quantity}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     ₹{bill.items[0].price}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].size}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].color}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     ₹{bill.subTotal}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center font-semibold">
//                                     ₹{bill.totalAmount}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.paymentMethod}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center space-x-2">

//                                     <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
//                                         Edit
//                                     </button>
//                                     <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">
//                                         Delete
//                                     </button>
//                                     <button
//                                         className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
//                                         onClick={() => setSelectedBill(bill)}
//                                     >
//                                         View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 {bills &&
//                     [...Array(Math.ceil(bills.total / pagi.limit))].map((_, i) => {
//                         const isActive = pagi.start / pagi.limit === i;

//                         return (
//                             <button
//                                 key={i}
//                                 onClick={() =>
//                                     setPagi({ ...pagi, start: pagi.limit * i })
//                                 }
//                                 className={`px-3 py-1 rounded-md text-sm font-medium transition
//             ${isActive
//                                         ? "bg-yellow-500 text-black"
//                                         : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//                                     }`}
//                             >
//                                 {i + 1}
//                             </button>
//                         );
//                     })}
//             </div> */}




//             {/* View Bill Modal */}
//             {/* {selectedBill && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
//                         <button
//                             onClick={() => setSelectedBill(null)}
//                             className="absolute top-3 right-3 text-gray-500"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-xl font-bold mb-4">
//                             Bill Details
//                         </h2>

//                         <p>
//                             <strong>Customer:</strong>{" "}
//                             {selectedBill.customerName}
//                         </p>
//                         <p>
//                             <strong>Phone:</strong>{" "}
//                             {selectedBill.customerPhone}
//                         </p>

//                         <table className="w-full mt-4 border">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="border px-3 py-2">Product</th>
//                                     <th className="border px-3 py-2">Qty</th>
//                                     <th className="border px-3 py-2">Price</th>
//                                     <th className="border px-3 py-2">Size</th>
//                                     <th className="border px-3 py-2">Color</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {selectedBill.items.map((item, i) => (
//                                     <tr key={i}>
//                                         <td className="border px-3 py-2">
//                                             {item.productName}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.quantity}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             ₹{item.price}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.size}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.color}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <div className="mt-4 text-right">
//                             <p>SubTotal: ₹{selectedBill.subTotal}</p>
//                             <p>Discount: ₹{selectedBill.discount}</p>
//                             <p>Tax: ₹{selectedBill.tax}</p>
//                             <p className="text-lg font-bold">
//                                 Total: ₹{selectedBill.totalAmount}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

//             {selectedBill && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
//                     <div className="bg-white w-full max-w-[350px] rounded-sm shadow-2xl relative font-mono text-black overflow-hidden">

//                         {/* Close Button - UI साठी */}
//                         <button
//                             onClick={() => setSelectedBill(null)}
//                             className="absolute top-1 right-1 text-gray-400 hover:text-black print:hidden"
//                         >
//                             ✕
//                         </button>

//                         {/* RECEIPT CONTENT */}
//                         <div className="p-4 sm:p-6">

//                             {/* Header Section */}
//                             <div className="text-center mb-4">
//                                 <h1 className="text-lg font-bold uppercase tracking-widest">MAITARI MENSWEAR</h1>
//                                 <p className="text-[10px] uppercase">Address : Lorem Ipsum, City</p>
//                                 <p className="text-[10px]">CONTACT NO : +91 90000 00000</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>
//                             <div className="text-center font-bold text-sm tracking-widest my-1">CASH RECEIPT</div>
//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Metadata Section */}
//                             <div className="text-[11px] mb-3">
//                                 <div className="flex justify-between">
//                                     <span>DATE : {new Date().toLocaleDateString()}</span>
//                                     <span>TIME : {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                                 </div>
//                                 <p>CUSTOMER : {selectedBill.customerName.toUpperCase()}</p>
//                                 <p>CASHIER : ADMIN</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Items Table */}
//                             <div className="text-[12px]">
//                                 <div className="flex justify-between font-bold mb-1">
//                                     <span>DESCRIPTION</span>
//                                     <span>PRICE</span>
//                                 </div>
//                                 {selectedBill.items.map((item, i) => (
//                                     <div key={i} className="flex justify-between mb-1">
//                                         <span className="uppercase">
//                                             {item.productName} {item.size && `(${item.size})`}
//                                         </span>
//                                         <span>{item.quantity * item.price}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Calculation Section */}
//                             <div className="text-[12px]">
//                                 <div className="flex justify-between font-bold text-sm">
//                                     <span>TOTAL</span>
//                                     <span>{selectedBill.subTotal}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Discount</span>
//                                     <span>{selectedBill.discount}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Tax</span>
//                                     <span>{selectedBill.tax}</span>
//                                 </div>
//                                 <div className="border-t border-dashed border-black my-2"></div>
//                                 <div className="flex justify-between mt-1">
//                                     <span>Cash</span>
//                                     <span>{selectedBill.totalAmount}</span>
//                                 </div>

//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Payment Info */}
//                             <div className="text-[11px] mb-4">
//                                 <p className="uppercase">Payment: {selectedBill.paymentMethod}</p>
//                                 <p>Approval: #12345</p>
//                             </div>

//                             <div className="border-t border-dashed border-black my-2"></div>

//                             {/* Footer */}
//                             <div className="text-center mt-4">
//                                 <p className="font-bold text-sm tracking-widest">THANK YOU!</p>

//                                 {/* Dummy Barcode Area */}
//                                 <div className="flex flex-col items-center mt-3">
//                                     <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)]"></div>
//                                     <p className="text-[9px] mt-1 tracking-[4px]">000123456789</p>
//                                 </div>
//                             </div>

//                         </div>

//                         {/* Bottom Serrated Edge Effect */}
//                         <div className="h-2 w-full bg-[linear-gradient(-45deg,transparent_5px,white_5px),linear-gradient(45deg,transparent_5px,white_5px)] bg-[length:10px_10px]"></div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     </>
// };

// export default GetAllBill







// import React, { useState } from "react";

// const GetAllBill = () => {
//     const [selectedBill, setSelectedBill] = useState(null);

//     const bills = [
//         {
//             customerName: "Rahul",
//             customerPhone: "9876543210",
//             items: [
//                 {
//                     productName: "Pant",
//                     quantity: 1,
//                     price: 1200,
//                     size: "32",
//                     color: "Black",
//                 },
//             ],
//             subTotal: 1200,
//             discount: 0,
//             tax: 0,
//             totalAmount: 1200,
//             paymentMethod: "UPI",
//         },
//         {
//             customerName: "Amit",
//             customerPhone: "9123456789",
//             items: [
//                 {
//                     productName: "Shirt",
//                     quantity: 2,
//                     price: 800,
//                     size: "M",
//                     color: "Blue",
//                 },
//             ],
//             subTotal: 1600,
//             discount: 100,
//             tax: 50,
//             totalAmount: 1550,
//             paymentMethod: "Cash",
//         },
//     ];

//     return (
//         <div className="p-3 sm:p-6 max-w-7xl mx-auto">
//             <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center">
//                 Bills List
//             </h1>

//             {/* Table Wrapper */}
//             <div className="w-full overflow-x-auto bg-white shadow rounded-lg">
//                 <table className="min-w-[1100px] w-full border border-gray-200 text-sm sm:text-base">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="px-4 py-3 border whitespace-nowrap">Customer</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Phone</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Product</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Qty</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Price</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Size</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Color</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">SubTotal</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Discount</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Tax</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Total</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Payment</th>
//                             <th className="px-4 py-3 border whitespace-nowrap">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {bills.map((bill, index) => (
//                             <tr
//                                 key={index}
//                                 className="hover:bg-gray-100 transition"
//                             >
//                                 <td className="px-4 py-2 border whitespace-nowrap">
//                                     {bill.customerName}
//                                 </td>
//                                 <td className="px-4 py-2 border whitespace-nowrap">
//                                     {bill.customerPhone}
//                                 </td>
//                                 <td className="px-4 py-2 border whitespace-nowrap">
//                                     {bill.items[0].productName}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].quantity}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     ₹{bill.items[0].price}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].size}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.items[0].color}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     ₹{bill.subTotal}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.discount}%
//                                 </td>
//                                 <td className="px-4 py-2 border text-center">
//                                     {bill.tax}%
//                                 </td>
//                                 <td className="px-4 py-2 border text-center font-semibold">
//                                     ₹{bill.totalAmount}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center whitespace-nowrap">
//                                     {bill.paymentMethod}
//                                 </td>
//                                 <td className="px-4 py-2 border text-center whitespace-nowrap space-x-2">
//                                     <button
//                                         className="px-3 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm"
//                                         onClick={() => setSelectedBill(bill)}
//                                     >
//                                         View
//                                     </button>
//                                     <button className="px-3 py-1 bg-yellow-500 text-white rounded text-xs sm:text-sm">
//                                         Edit
//                                     </button>
//                                     <button className="px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm">
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal */}
//             {selectedBill && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
//                     <div className="bg-white rounded-xl w-full max-w-3xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
//                         <button
//                             onClick={() => setSelectedBill(null)}
//                             className="absolute top-3 right-3 text-gray-500 text-xl"
//                         >
//                             ✕
//                         </button>

//                         <h2 className="text-lg sm:text-xl font-bold mb-4">
//                             Bill Details
//                         </h2>

//                         <p>
//                             <strong>Customer:</strong>{" "}
//                             {selectedBill.customerName}
//                         </p>
//                         <p>
//                             <strong>Phone:</strong>{" "}
//                             {selectedBill.customerPhone}
//                         </p>

//                         <table className="w-full mt-4 border text-sm">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="border px-3 py-2">Product</th>
//                                     <th className="border px-3 py-2">Qty</th>
//                                     <th className="border px-3 py-2">Price</th>
//                                     <th className="border px-3 py-2">Size</th>
//                                     <th className="border px-3 py-2">Color</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {selectedBill.items.map((item, i) => (
//                                     <tr key={i}>
//                                         <td className="border px-3 py-2">
//                                             {item.productName}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.quantity}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             ₹{item.price}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.size}
//                                         </td>
//                                         <td className="border px-3 py-2 text-center">
//                                             {item.color}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         <div className="mt-4 text-right text-sm sm:text-base">
//                             <p>SubTotal: ₹{selectedBill.subTotal}</p>
//                             <p>Discount: ₹{selectedBill.discount}</p>
//                             <p>Tax: ₹{selectedBill.tax}</p>
//                             <p className="text-lg font-bold">
//                                 Total: ₹{selectedBill.totalAmount}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GetAllBill;

