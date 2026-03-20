import React, { useEffect, useState } from 'react'
import { useDeleteProductMutation, useLazyGetProductQuery } from '../../redux/api/product.api';
import { toast } from 'react-toastify';
import axios from "axios";


const GetProduct = () => {

    const [deleteProduct, { isSuccess: deleteProductIsSuccess, isError: deleteProductIsError, error: deleteProductError }] = useDeleteProductMutation()
    const [getAllData, { data }] = useLazyGetProductQuery()

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })
    const [selectedBill, setSelectedBill] = useState(null);
    const [openImage, setOpenImage] = useState(null);
    const bills = data?.bill || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / pagi.limit);

    // const total = data?.count || 0;


    useEffect(() => {
        if (deleteProductIsSuccess) {
            toast.success("Product delete is successfully")
        }
    }, [deleteProductIsSuccess])

    useEffect(() => {
        if (deleteProductIsError) {
            toast.error(deleteProductError.data.message || "Product delete is successfully")
        }
    }, [deleteProductIsError])

    useEffect(() => {
        getAllData(pagi)
    }, [pagi])





    const handleDownloadPDF = async (billId, companyName) => {
        try {
            const response = await axios.get(`https://billing-softwer-server.vercel.app/api/productbill/bill-pdf/${billId}`, {
                responseType: 'blob',
                withCredentials: true
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${companyName}-bill.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("PDF download failed:", err);
        }
    };



    return <>
        <div className="p-4 bg-gray-50 h-full">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

                {/* Table Header Section */}
                <div className="bg-slate-800 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white tracking-wide uppercase">
                        Product Bill Records
                    </h2>
                    <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full border border-slate-500">
                        {/* Total Bills: {bills?.length || 0} */}
                        Total Bills: {total}
                    </span>
                </div>

                {/* Table Container */}
                <div className="overflow-auto max-h-[60vh]">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10 bg-slate-100">
                            <tr className="border-b border-gray-300">
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Company Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Product Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Photos</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bills && bills.length > 0 ? (
                                bills.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-slate-50 transition-colors">
                                        {/* Company Info */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-800">{bill.companyName}</div>
                                            <div className="text-xs text-gray-500">{bill.companycontact}</div>
                                        </td>

                                        {/* Product Type (Enum) */}
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${bill.productType === 'cloth'
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                }`}>
                                                {bill.productType}
                                            </span>
                                        </td>

                                        {/* Total Amount */}
                                        <td className="px-6 py-4 font-mono font-bold text-gray-700">
                                            ₹{bill.allProducttotalamout.toLocaleString()}
                                        </td>

                                        {/* Photos Count */}
                                        <td className="px-6 py-4">
                                            <div className="flex -space-x-2">
                                                {bill.billphoto.slice(0, 3).map((img, idx) => (
                                                    <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                                                        <img src={img} alt="bill" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                                {bill.billphoto.length > 3 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800 text-white flex items-center justify-center text-[10px]">
                                                        +{bill.billphoto.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                {/* <button className="text-blue-600 hover:text-blue-800 text-xs font-bold uppercase tracking-tighter">Edit</button> */}
                                                <button onClick={() => setSelectedBill(bill)} className="text-slate-700 hover:text-slate-800 text-xs font-bold uppercase tracking-tighter">View</button>
                                                <button onClick={() => deleteProduct(bill._id)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-tighter">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic text-sm">
                                        No billing records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[...Array(totalPages)].map((_, i) => {
                    const isActive = pagi.start / pagi.limit === i;

                    return (
                        <button
                            key={i}
                            onClick={() =>
                                setPagi({ ...pagi, start: i * pagi.limit })
                            }
                            className={`px-4 py-2 rounded
                        ${isActive
                                    ? "bg-[#145EFB] text-white"
                                    : "border border-[#145EFB] text-[#145EFB]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
        </div>


        {selectedBill && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-fadeIn scale-95 transform transition-all duration-300">

                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedBill(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-3xl font-bold transition-colors"
                    >
                        ✕
                    </button>
                    {/* Company Header */}
                    <div className="text-center bg-slate-800 p-4 rounded-t-xl shadow-md">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-100">{selectedBill.companyName}</h2>
                        <p className="text-sm text-blue-100 mt-1">{selectedBill.companycontact}</p>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Product Details with pastel backgrounds */}
                        <div className="space-y-4">
                            <div className="bg-blue-100 text-blue-700 p-4 rounded-xl shadow-sm">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <span>📦</span> Product Type
                                </p>
                                <p className="font-semibold text-lg">{selectedBill.productType}</p>
                            </div>

                            <div className="bg-green-100 text-green-700 p-4 rounded-xl shadow-sm">
                                <p className="text-sm font-medium flex items-center gap-2">
                                    <span>💰</span> Total Amount
                                </p>
                                <p className="font-semibold text-lg">₹{selectedBill.allProducttotalamout.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Bill Images */}
                        <div className="mt-4">
                            <p className="font-semibold text-gray-800 mb-2">Bill Images</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {selectedBill.billphoto.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="overflow-hidden rounded-xl shadow hover:scale-105 transform transition-all duration-300 cursor-pointer"
                                        onClick={() => setOpenImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`bill-${idx}`}
                                            className="w-full h-32 sm:h-40 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Modal */}
                            {openImage && (
                                <div
                                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                                    onClick={() => setOpenImage(null)}
                                >
                                    <img
                                        src={openImage}
                                        alt="Full view"
                                        className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Download PDF Button */}
                        <button
                            className="block w-full text-center bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all mt-4"
                            onClick={() => handleDownloadPDF(selectedBill._id, selectedBill.companyName)}
                        >
                            Download PDF
                        </button>


                    </div>
                </div>
            </div>
        )}

    </>
}

export default GetProduct

