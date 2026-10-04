import React, { useEffect, useState } from 'react';
import {
    useGetAllClothProductsQuery,
    useDeleteClothProductMutation,
    useUpdateClothProductMutation,
    useLazyGetProductQuery,
    useDeleteProductMutation
} from '../../redux/api/product.api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    Receipt,
    Plus,
    Search,
    Trash2,
    Eye,
    Edit2,
    Barcode,
    Layers,
    DollarSign,
    MapPin,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Download
} from 'lucide-react';

const GetProduct = () => {
    const navigate = useNavigate();

    // View tab: 'cloth' or 'bills'
    const [viewMode, setViewMode] = useState('cloth');
    const [searchTerm, setSearchTerm] = useState('');

    // Cloth products RTK Query
    const {
        data: clothData,
        isLoading: isClothLoading,
        refetch: refetchCloth
    } = useGetAllClothProductsQuery({ search: searchTerm }, {
        refetchOnMountOrArgChange: true,
    });
    const [deleteClothProduct, { isLoading: isDeletingCloth }] = useDeleteClothProductMutation();
    const [updateClothProduct, { isLoading: isUpdatingProduct }] = useUpdateClothProductMutation();
    const [editingProduct, setEditingProduct] = useState(null);

    const clothProducts = clothData?.products || [];
    const clothTotal = clothData?.total || 0;

    // Supplier Bills RTK Query (Legacy)
    const [deleteBillProduct, { isSuccess: deleteBillIsSuccess, isError: deleteBillIsError, error: deleteBillError }] = useDeleteProductMutation();
    const [getBillsData, { data: billsData }] = useLazyGetProductQuery();

    const [billPagi, setBillPagi] = useState({ start: 0, limit: 10 });
    const [selectedBill, setSelectedBill] = useState(null);
    const [selectedClothItem, setSelectedClothItem] = useState(null);
    const [openImage, setOpenImage] = useState(null);

    const bills = billsData?.bill || [];
    const billsTotal = billsData?.total || 0;
    const billsTotalPages = Math.ceil(billsTotal / billPagi.limit) || 1;

    useEffect(() => {
        if (viewMode === 'bills') {
            getBillsData(billPagi);
        }
    }, [viewMode, billPagi]);

    useEffect(() => {
        if (deleteBillIsSuccess) {
            toast.success('Bill deleted successfully');
        }
    }, [deleteBillIsSuccess]);

    useEffect(() => {
        if (deleteBillIsError) {
            toast.error(deleteBillError?.data?.message || 'Bill delete failed');
        }
    }, [deleteBillIsError]);

    const handleDeleteCloth = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteClothProduct(id).unwrap();
                toast.success('Product deleted successfully');
                refetchCloth();
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete product');
            }
        }
    };

    const handleDownloadPDF = async (billId, companyName) => {
        try {
            const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const BASE = isLocal ? 'http://localhost:5000' : 'https://billing-softwer-server.vercel.app';

            const response = await axios.get(`${BASE}/api/productbill/bill-pdf/${billId}`, {
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
            console.error('PDF download failed:', err);
            toast.error('PDF download failed');
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-slate-50 min-h-full">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top View Selector & Action Header */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                            <Package className="w-6 h-6 text-orange-600" />
                            Product & Inventory Records
                        </h1>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Manage cloth items, check stock levels, and view purchase bills
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Tab Switcher */}
                        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setViewMode('cloth')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                    viewMode === 'cloth'
                                        ? 'bg-orange-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Package className="w-3.5 h-3.5" />
                                Cloth Items ({clothTotal})
                            </button>

                            <button
                                type="button"
                                onClick={() => setViewMode('bills')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                    viewMode === 'bills'
                                        ? 'bg-orange-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                <Receipt className="w-3.5 h-3.5" />
                                Supplier Bills ({billsTotal})
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/addproduct')}
                            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 active:scale-95 transition flex items-center gap-1.5 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Product</span>
                        </button>
                    </div>
                </div>

                {/* VIEW 1: CLOTH PRODUCTS TABLE */}
                {viewMode === 'cloth' && (
                    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                        {/* Search and Filters Bar */}
                        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <div className="relative w-full sm:w-80">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search by name, barcode, category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <span className="text-xs font-semibold text-slate-500">
                                Showing {clothProducts.length} of {clothTotal} items
                            </span>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                        <th className="px-5 py-3.5">Product Name</th>
                                        <th className="px-5 py-3.5">Category</th>
                                        <th className="px-5 py-3.5">Barcode / Code</th>
                                        <th className="px-5 py-3.5">Sale Price</th>
                                        <th className="px-5 py-3.5">Purchase Price</th>
                                        <th className="px-5 py-3.5">Initial Qty</th>
                                        <th className="px-5 py-3.5">Sold Qty</th>
                                        <th className="px-5 py-3.5">Available Stock</th>
                                        <th className="px-5 py-3.5">Location</th>
                                        <th className="px-5 py-3.5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {clothProducts.length > 0 ? (
                                        clothProducts.map((item) => {
                                            const stockVal = item.currentStock !== undefined ? item.currentStock : item.openingStock;
                                            const soldVal = item.totalSold !== undefined ? item.totalSold : Math.max(0, (item.openingStock || 0) - (item.currentStock || 0));

                                            return (
                                                <tr key={item._id} className="hover:bg-slate-50/80 transition">
                                                    {/* Name & Unit */}
                                                    <td className="px-5 py-3.5">
                                                        <div className="font-bold text-slate-800">{item.itemName}</div>
                                                        <div className="text-[11px] text-slate-400 font-medium">Unit: {item.unit || 'PCS'}</div>
                                                    </td>

                                                    {/* Category */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                                            {item.category || 'Cloth'}
                                                        </span>
                                                    </td>

                                                    {/* Barcode */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="font-mono text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                                                            {item.itemCode || '—'}
                                                        </span>
                                                    </td>

                                                    {/* Sale Price */}
                                                    <td className="px-5 py-3.5">
                                                        <div className="font-bold text-slate-900 font-mono">
                                                            ₹ {Number(item.salePrice || 0).toFixed(2)}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 font-medium">
                                                            {item.salePriceTaxType || 'Without Tax'}
                                                        </div>
                                                    </td>

                                                    {/* Purchase Price */}
                                                    <td className="px-5 py-3.5">
                                                        <div className="text-slate-600 font-mono text-xs">
                                                            ₹ {Number(item.purchasePrice || 0).toFixed(2)}
                                                        </div>
                                                    </td>

                                                    {/* Initial Stock */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="text-slate-700 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                                                            {item.openingStock || 0} {item.unit || 'PCS'}
                                                        </span>
                                                    </td>

                                                    {/* Sold Stock */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="text-indigo-700 font-bold text-xs bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                                                            {soldVal} {item.unit || 'PCS'}
                                                        </span>
                                                    </td>

                                                    {/* Available Stock with Badge */}
                                                    <td className="px-5 py-3.5">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                                                            stockVal > 5
                                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                                : stockVal > 0
                                                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                                                        }`}>
                                                            {stockVal} {item.unit || 'PCS'}
                                                        </span>
                                                    </td>

                                                    {/* Location */}
                                                    <td className="px-5 py-3.5 text-xs text-slate-600">
                                                        {item.itemLocation || '—'}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-3.5 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedClothItem(item)}
                                                                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingProduct({ ...item })}
                                                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                                                                title="Edit Product"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteCloth(item._id, item.itemName)}
                                                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                                                title="Delete Product"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-5 py-12 text-center text-slate-400 text-sm">
                                                {isClothLoading ? "Loading products..." : "No cloth products found. Click '+ Add Product' to create one!"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* VIEW 2: SUPPLIER BILLS TABLE (LEGACY) */}
                {viewMode === 'bills' && (
                    <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                                        <th className="px-5 py-3.5">Company Details</th>
                                        <th className="px-5 py-3.5">Product Type</th>
                                        <th className="px-5 py-3.5">Total Amount</th>
                                        <th className="px-5 py-3.5">Photos</th>
                                        <th className="px-5 py-3.5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {bills && bills.length > 0 ? (
                                        bills.map((bill) => (
                                            <tr key={bill._id} className="hover:bg-slate-50 transition">
                                                <td className="px-5 py-3.5">
                                                    <div className="font-bold text-slate-800">{bill.companyName}</div>
                                                    <div className="text-xs text-slate-400">{bill.companycontact}</div>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                                                        bill.productType === 'cloth'
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                        {bill.productType}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 font-bold font-mono text-slate-800">
                                                    ₹{bill.allProducttotalamout?.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex -space-x-2">
                                                        {bill.billphoto?.slice(0, 3).map((img, idx) => (
                                                            <div key={idx} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                                                <img src={img} alt="bill" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => setSelectedBill(bill)}
                                                            className="text-xs font-bold text-slate-700 hover:text-slate-900"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => deleteBillProduct(bill._id)}
                                                            className="text-xs font-bold text-rose-500 hover:text-rose-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-5 py-10 text-center text-slate-400 text-sm">
                                                No supplier bills found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination for Bills */}
                        {billsTotalPages > 1 && (
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center gap-2">
                                {[...Array(billsTotalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setBillPagi({ ...billPagi, start: i * billPagi.limit })}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                            billPagi.start / billPagi.limit === i
                                                ? 'bg-orange-600 text-white'
                                                : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* MODAL 1: VIEW CLOTH ITEM DETAILS */}
            {selectedClothItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold">{selectedClothItem.itemName}</h2>
                                <p className="text-xs text-orange-100 mt-0.5">Category: {selectedClothItem.category} | Unit: {selectedClothItem.unit}</p>
                            </div>
                            <button
                                onClick={() => setSelectedClothItem(null)}
                                className="text-white/80 hover:text-white text-2xl font-bold leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <span className="text-slate-400 font-bold block mb-1">SALE PRICE</span>
                                    <span className="text-base font-bold text-slate-800 font-mono">
                                        ₹ {selectedClothItem.salePrice}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block">{selectedClothItem.salePriceTaxType}</span>
                                </div>

                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <span className="text-slate-400 font-bold block mb-1">PURCHASE PRICE</span>
                                    <span className="text-base font-bold text-slate-800 font-mono">
                                        ₹ {selectedClothItem.purchasePrice || 0}
                                    </span>
                                    <span className="text-[10px] text-slate-400 block">{selectedClothItem.purchasePriceTaxType}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <span className="text-slate-400 font-bold block mb-1">CURRENT STOCK</span>
                                    <span className="text-base font-bold text-emerald-600 font-mono">
                                        {selectedClothItem.currentStock ?? selectedClothItem.openingStock} {selectedClothItem.unit}
                                    </span>
                                </div>

                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <span className="text-slate-400 font-bold block mb-1">BARCODE / CODE</span>
                                    <span className="text-xs font-mono font-bold text-slate-700">
                                        {selectedClothItem.itemCode || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Location:</span>
                                    <span className="font-bold text-slate-800">{selectedClothItem.itemLocation || 'Not specified'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">HSN/SAC Code:</span>
                                    <span className="font-bold text-slate-800">{selectedClothItem.hsnCode || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Tax Rate:</span>
                                    <span className="font-bold text-slate-800">{selectedClothItem.taxRate || 'None'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 font-medium">Discount On Sale:</span>
                                    <span className="font-bold text-slate-800">
                                        {selectedClothItem.discountOnSalePrice || 0} {selectedClothItem.discountType === 'Percentage' ? '%' : '₹'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedClothItem(null)}
                                className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold transition hover:bg-slate-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: VIEW SUPPLIER BILL (LEGACY) */}
            {selectedBill && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
                        <div className="text-center bg-slate-800 p-5 text-white">
                            <h2 className="text-2xl font-bold">{selectedBill.companyName}</h2>
                            <p className="text-xs text-slate-300 mt-1">{selectedBill.companycontact}</p>
                            <button
                                onClick={() => setSelectedBill(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-xs font-semibold text-slate-500">Total Amount:</span>
                                <span className="text-base font-bold text-slate-900 font-mono">
                                    ₹{selectedBill.allProducttotalamout?.toLocaleString()}
                                </span>
                            </div>

                            {selectedBill.billphoto?.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold text-slate-600 mb-2">Bill Photos</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {selectedBill.billphoto.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt="bill"
                                                onClick={() => setOpenImage(img)}
                                                className="w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-90"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => handleDownloadPDF(selectedBill._id, selectedBill.companyName)}
                                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-md transition"
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Image Preview */}
            {openImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setOpenImage(null)}
                >
                    <img src={openImage} alt="Full view" className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl" />
                </div>
            )}

            {/* MODAL 3: EDIT CLOTH PRODUCT */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold">Edit Product</h2>
                                <p className="text-xs text-blue-100 mt-0.5">Update item details, price, or stock</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="text-white/80 hover:text-white text-2xl font-bold leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    await updateClothProduct({
                                        id: editingProduct._id,
                                        data: {
                                            itemName: editingProduct.itemName,
                                            category: editingProduct.category,
                                            itemCode: editingProduct.itemCode,
                                            salePrice: Number(editingProduct.salePrice),
                                            purchasePrice: Number(editingProduct.purchasePrice || 0),
                                            discountOnSalePrice: Number(editingProduct.discountOnSalePrice || 0),
                                            taxRate: editingProduct.taxRate || 'None',
                                            currentStock: Number(editingProduct.currentStock),
                                            openingStock: Number(editingProduct.openingStock),
                                            itemLocation: editingProduct.itemLocation,
                                            unit: editingProduct.unit
                                        }
                                    }).unwrap();
                                    toast.success("Product updated successfully!");
                                    setEditingProduct(null);
                                    refetchCloth();
                                } catch (err) {
                                    toast.error(err?.data?.message || "Failed to update product");
                                }
                            }}
                            className="p-6 space-y-4 text-xs"
                        >
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Item Name</label>
                                <input
                                    type="text"
                                    value={editingProduct.itemName}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, itemName: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 font-bold focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={editingProduct.category}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                                    <input
                                        type="text"
                                        value={editingProduct.unit}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Sale Price (₹)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={editingProduct.salePrice}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Price (₹)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={editingProduct.purchasePrice || 0}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, purchasePrice: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Discount on Sale Price (%)</label>
                                    <input
                                        type="number"
                                        step="any"
                                        min={0}
                                        max={100}
                                        value={editingProduct.discountOnSalePrice ?? 0}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, discountOnSalePrice: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-slate-800"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Tax Rate</label>
                                    <select
                                        value={editingProduct.taxRate || 'None'}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, taxRate: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                                    >
                                        <option value="None">None</option>
                                        <option value="0%">0%</option>
                                        <option value="5%">5%</option>
                                        <option value="12%">12%</option>
                                        <option value="18%">18%</option>
                                        <option value="28%">28%</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Available Stock</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={editingProduct.currentStock}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, currentStock: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold text-emerald-700"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={editingProduct.itemLocation || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, itemLocation: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                                        placeholder="e.g. Rack A1"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdatingProduct}
                                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition disabled:opacity-50"
                                >
                                    {isUpdatingProduct ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GetProduct;
