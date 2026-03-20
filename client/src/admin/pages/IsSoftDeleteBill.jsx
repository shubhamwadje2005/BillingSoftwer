import React, { useEffect, useState } from 'react'
import { useLazyGetdeleteBillsQuery, useRestoredeleteBillsMutation } from '../../redux/api/bill.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const IsSoftDeleteBill = () => {
    const [selectedBill, setSelectedBill] = useState(null);
    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()
    const [Restore, { isSuccess, isError, error }] = useRestoredeleteBillsMutation()
    const [getDeleteBills, { data }] = useLazyGetdeleteBillsQuery()
    const bills = data?.bills || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / pagi.limit);


    useEffect(() => {
        if (isSuccess) {
            toast.success("restore is SuccessFully")
            navigate("/getallbill")
        }
    }, [isSuccess])

    useEffect(() => {
        getDeleteBills(pagi)
    }, [pagi])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "restore is Faild !")
        }
    }, [isError])

    return <>
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">

                {/* Table Header Section */}
                <div className="bg-slate-800 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white tracking-wide uppercase">
                        Deleted Bills List
                    </h2>
                    <span className="bg-slate-700 text-white text-xs px-3 py-1 rounded-full border border-slate-500">
                        {/* Total Records: {bills?.length || 0} */}
                        Total Records: {total}
                    </span>
                </div>

                {/* Table Container */}
                <div className="overflow-auto max-h-[60vh]">
                    <table className="w-full text-left border-collapse min-w-[700px] sm:min-w-full">
                        <thead className="sticky top-0 z-10 bg-slate-100">
                            <tr className="border-b border-gray-300">
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Customer Info</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Product Details</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Qty</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Price</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Specs</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Totals</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Payment</th>
                                <th className="px-4 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bills && bills.length > 0 ? (
                                bills.map((bill, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors">

                                        {/* Customer Info */}
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-semibold text-gray-800 uppercase">{bill.customerName}</div>
                                            <div className="text-xs text-gray-500">{bill.customerPhone}</div>
                                        </td>

                                        {/* Product Name */}
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-700 font-medium capitalize">
                                                {bill.items[0]?.productName}
                                            </div>
                                        </td>

                                        {/* Quantity */}
                                        <td className="px-4 py-4 text-center">
                                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                {bill.items[0]?.quantity}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-4 py-4 text-center text-sm font-mono">
                                            ₹{bill.items[0]?.price}
                                        </td>

                                        {/* Size & Color */}
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex flex-col gap-1 items-center">
                                                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 rounded uppercase">
                                                    Size: {bill.items[0]?.size || 'N/A'}
                                                </span>
                                                <span className="text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100 px-2 rounded uppercase">
                                                    Color: {bill.items[0]?.color || 'N/A'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Totals */}
                                        <td className="px-4 py-4 text-center">
                                            <div className="text-xs text-gray-400 line-through">₹{bill.subTotal}</div>
                                            <div className="text-sm font-bold text-slate-900 font-mono">₹{bill.totalAmount}</div>
                                        </td>

                                        {/* Payment Method */}
                                        <td className="px-4 py-4 text-center">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                {bill.paymentMethod}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button className="p-1.5 text-green-500 hover:bg-blue-50 rounded transition-colors" title="Edit"
                                                    // onClick={() => Restore({ id: bill._id, isDeleted: false })}
                                                    onClick={() => Restore(bill._id)}
                                                >
                                                    <span className="text-xs font-bold uppercase tracking-tighter">Restore</span>
                                                </button>
                                                <button
                                                    className="p-1.5 text-blue-600 hover:bg-slate-100 rounded transition-colors"
                                                    title="View Bill"
                                                    // onClick={() => setSelectedBill(bill)}
                                                    onClick={() => navigate(`/bill/view/${bill._id}`)}
                                                >
                                                    <span className="text-xs font-bold uppercase tracking-tighter">View</span>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-400 italic text-sm">
                                        No bills found in the records.
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



            {/* {selectedBill && (
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
                                    <span>{selectedBill.discount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{selectedBill.tax}</span>
                                </div>
                                <div className="border-t border-dashed border-black my-2"></div>
                                <div className="flex justify-between mt-1">
                                    <span>Cash</span>
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
            )} */}

        </div>
    </>
}

export default IsSoftDeleteBill