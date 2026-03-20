import React, { useEffect, useState } from 'react'
import { useLazyGetIsSoftDeleteProductQuery, useRestoreProductMutation } from '../../redux/api/product.api';
import { toast } from 'react-toastify';

const IsSoftDeleteProduct = () => {
    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const [deleteProductBill, { data }] = useLazyGetIsSoftDeleteProductQuery()
    const [restoreProductbill, { isSuccess, isError, error }] = useRestoreProductMutation()

    const bills = data?.bills || []
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / pagi.limit);


    useEffect(() => {
        if (isSuccess) {
            toast.success("restore productBill is successFully")
        }
    }, [isSuccess])

    useEffect(() => {
        deleteProductBill(pagi)
    }, [pagi])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "restore productBill is Faild !")
        }
    }, [isError])


    return <>
        <div className="p-4 bg-white h-full">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

                {/* Table Header Section */}
                <div className="bg-slate-800 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white tracking-wide uppercase">
                        Deleted Product Bill Records
                    </h2>
                    <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full border border-slate-500">
                        {/* Total Bills: {bills?.length || 0} */}
                        Total Bills: {total}
                    </span>
                </div>

                {/* Table Container */}
                <div className="overflow-auto max-h-[60vh]">
                    <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
                        <thead className="sticky top-0 z-10 bg-slate-100">
                            <tr className="border-b border-gray-300">
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Company Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Product Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Bill Photo</th>
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
                                                <button onClick={() => restoreProductbill(bill._id)} className="text-green-500 hover:text-green-600 text-xs font-bold uppercase tracking-tighter">Restore</button>
                                                {/* <button className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-tighter">Delete</button> */}
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
    </>
}

export default IsSoftDeleteProduct