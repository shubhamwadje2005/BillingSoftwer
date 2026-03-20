import { useParams } from "react-router-dom";
import { useGetBillsQuery } from "../../redux/api/bill.api";
import { toast } from "react-toastify";
import axios from "axios";


const ViewBill = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetBillsQuery();

    if (isLoading)
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;

    if (!data?.bills)
        return <p className="text-center mt-10 text-red-500">No Bills</p>;

    const bill = data.bills.find(b => b._id === id);
    if (!bill) return <p className="text-center mt-10 text-gray-500">No Bill Found</p>;
    console.log(bill)

    const handleDownloadPDF = async (billId) => {
        try {
            const response = await axios.get(
                `https://billing-softwer-server.vercel.app/api/bills/bill/downloadbill/${billId}`,
                {
                    responseType: "blob",
                    withCredentials: true,
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `receipt-${billId}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF download failed:", error);
            toast.error("PDF download failed");
        }
    };

    return (
        <div className="h-full bg-white flex justify-center p-4">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-gray-800 text-white p-5 text-center">
                    {/* <h1 className="text-2xl font-bold tracking-wide">MAITARI MENSWEAR</h1> */}
                    <h1 className="text-2xl font-bold tracking-wide">{bill.createdBy.branchName || "No Branch Name"}</h1>
                    <p className="text-sm mt-1">Cash Receipt</p>
                    {/* <p className="text-xs mt-1">Bill ID: {bill._id}</p> */}
                    <p className="text-xs mt-1">Date: {new Date(bill.date).toLocaleString()}</p>
                </div>

                <div className="p-5 space-y-6 text-sm">

                    {/* Customer Info */}
                    <div className="flex justify-between bg-gray-50 rounded-lg p-4">
                        <div>
                            <p className="text-gray-500 text-xs">Customer Name</p>
                            <p className="font-semibold">{bill.customerName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Phone</p>
                            <p className="font-semibold">{bill.customerPhone}</p>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex bg-gray-100 font-semibold">
                            <div className="flex-1 px-4 py-2">Items</div>
                            <div className="w-32 px-4 py-2 text-right">Price</div>
                        </div>


                        {bill.items.map(item => (
                            <div key={item._id} className="flex justify-between px-4 py-3 border-b last:border-b-0">
                                <div>
                                    <p className="font-medium capitalize">{item.productName || "N/A"}</p>
                                    <p className="text-xs text-gray-500">
                                        Qty: {item.quantity != null ? item.quantity : "N/A"} |
                                        Size: {item.size ? item.size : "N/A"} |
                                        Color: {item.color ? item.color : "N/A"}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">₹{item.price}</p>
                                    <p className="text-xs text-gray-400">Total: ₹{item.quantity * item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span>₹{bill.subTotal}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>Discount</span>
                            <span>- ₹{bill.discount ?? "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{bill.tax ?? "N/A"}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{bill.totalAmount}</span>
                        </div>
                    </div>

                    {/* Payment & Status */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-xs">Payment Method</p>
                            <p className="font-semibold">{bill.paymentMethod}</p>
                        </div>
                        <span
                            className={`px-4 py-1 rounded-full text-xs font-bold
                                ${bill.isDeleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}
                            `}
                        >
                            {bill.isDeleted ? "Deleted" : "Active"}
                        </span>
                    </div>

                    {/* Print Button */}
                    {/* <button
                        onClick={() => window.print()}
                        className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                    >
                        Print Receipt
                    </button> */}

                    <button
                        className="block w-full text-center bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all mt-4"
                        onClick={() => handleDownloadPDF(bill._id)}
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewBill;
