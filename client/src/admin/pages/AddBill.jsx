import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAddBillsMutation, useUpdateBillsMutation } from "../../redux/api/bill.api";
import { useGetAllClothProductsQuery } from "../../redux/api/product.api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Plus,
    Trash2,
    CheckCircle2,
    PackageCheck,
    Receipt,
    User,
    ChevronDown,
    AlertTriangle,
    Search
} from "lucide-react";

const AddBill = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editData = location.state?.bill;
    const isEdit = location.state?.isEdit;

    const [addBill, { isLoading: isAdding }] = useAddBillsMutation();
    const [updateBill, { isLoading: isUpdating }] = useUpdateBillsMutation();

    // Fetch all products from DB
    const {
        data: productsData,
        isLoading: isLoadingProducts,
        refetch: refetchProducts
    } = useGetAllClothProductsQuery({ all: "true" }, {
        refetchOnMountOrArgChange: true,
    });
    const availableProducts = productsData?.products || [];

    useEffect(() => {
        refetchProducts();
    }, []);

    // Item state
    const [items, setItems] = useState(
        editData?.items?.length
            ? editData.items.map(it => {
                const matched = availableProducts.find(p => p.itemName?.toLowerCase() === it.productName?.toLowerCase());
                return {
                    productId: it.productId || matched?._id || "",
                    productName: it.productName || "",
                    quantity: it.quantity || 1,
                    price: it.price || "",
                    currentStock: matched ? (matched.currentStock ?? matched.openingStock) : undefined,
                    unit: matched?.unit || "PCS",
                    openDropdown: false
                };
            })
            : [{ productId: "", productName: "", quantity: 1, price: "", currentStock: undefined, unit: "PCS", openDropdown: false }]
    );

    // Ref to detect clicks outside dropdown
    const itemRefs = useRef([]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            setItems(prevItems =>
                prevItems.map((item, idx) => {
                    if (itemRefs.current[idx] && !itemRefs.current[idx].contains(e.target)) {
                        return { ...item, openDropdown: false };
                    }
                    return item;
                })
            );
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Helper to extract numeric percent from taxRate (e.g. '5%' -> 5)
    const parseTaxPercent = (rateStr) => {
        if (!rateStr || rateStr === 'None') return '';
        const match = String(rateStr).match(/[\d.]+/);
        return match ? match[0] : '';
    };

    // Handle text change in Product Name (Editable & Manual)
    const handleProductNameChange = (index, value) => {
        const updated = [...items];
        updated[index].productName = value;
        updated[index].openDropdown = true;

        // If the typed name exactly matches an inventory product, auto-fill price, stock, discount & tax
        const matched = availableProducts.find(p => p.itemName?.toLowerCase() === value.trim().toLowerCase());
        if (matched) {
            updated[index].productId = matched._id;
            updated[index].price = matched.salePrice;
            updated[index].currentStock = matched.currentStock !== undefined ? matched.currentStock : matched.openingStock;
            updated[index].unit = matched.unit || "PCS";

            // Auto-fill Discount (%) if set on product
            if (matched.discountOnSalePrice !== undefined && matched.discountOnSalePrice !== null && matched.discountOnSalePrice !== '') {
                formik.setFieldValue('discount', matched.discountOnSalePrice);
            }
            // Auto-fill Tax (%) if set on product
            if (matched.taxRate) {
                const parsed = parseTaxPercent(matched.taxRate);
                if (parsed !== '') {
                    formik.setFieldValue('tax', parsed);
                }
            }
        } else {
            updated[index].productId = "";
            updated[index].currentStock = undefined;
        }

        setItems(updated);
    };

    // Handle product selection from dropdown (Automatic)
    const selectProduct = (index, prod) => {
        const updated = [...items];
        updated[index].productId = prod._id;
        updated[index].productName = prod.itemName;
        updated[index].price = prod.salePrice;
        updated[index].currentStock = prod.currentStock !== undefined ? prod.currentStock : prod.openingStock;
        updated[index].unit = prod.unit || "PCS";
        updated[index].openDropdown = false;
        setItems(updated);

        // Auto-fill Discount (%) from product
        if (prod.discountOnSalePrice !== undefined && prod.discountOnSalePrice !== null && prod.discountOnSalePrice !== '') {
            formik.setFieldValue('discount', prod.discountOnSalePrice);
        }
        // Auto-fill Tax (%) from product
        if (prod.taxRate) {
            const parsed = parseTaxPercent(prod.taxRate);
            if (parsed !== '') {
                formik.setFieldValue('tax', parsed);
            }
        }
    };

    // Handle quantity & price changes
    const handleNumberChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value === "" ? "" : Number(value);
        setItems(updated);
    };

    const addItem = () => {
        setItems([
            ...items,
            { productId: "", productName: "", quantity: 1, price: "", currentStock: undefined, unit: "PCS", openDropdown: false }
        ]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const formik = useFormik({
        initialValues: {
            customerName: editData?.customerName || "",
            customerPhone: editData?.customerPhone || "",
            discount: editData?.discount || "",
            tax: editData?.tax || "",
            paymentMethod: editData?.paymentMethod || "Cash",
        },
        validationSchema: yup.object({
            customerName: yup.string().required("Enter Customer Name"),
            customerPhone: yup.string().required("Enter Customer Phone"),
            paymentMethod: yup.string().required("Choose Payment Method"),
        }),
        onSubmit: async (values, { resetForm }) => {
            // Validate items
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (!item.productName || !item.productName.trim()) {
                    toast.error(`Please enter or select a Product Name for item #${i + 1}`);
                    return;
                }
                if (item.price === "" || Number(item.price) < 0) {
                    toast.error(`Please enter a valid Price for item #${i + 1}`);
                    return;
                }
                if (!item.quantity || Number(item.quantity) < 1) {
                    toast.error(`Quantity must be at least 1 for item #${i + 1}`);
                    return;
                }
            }

            const cleanItems = items.map(it => ({
                productId: it.productId || undefined,
                productName: it.productName.trim(),
                quantity: Number(it.quantity) || 1,
                price: Number(it.price) || 0,
            }));

            const payload = {
                customerName: values.customerName.trim(),
                customerPhone: values.customerPhone.trim(),
                items: cleanItems,
                subTotal,
                discount: Number(values.discount) || 0,
                tax: Number(values.tax) || 0,
                totalAmount,
                paymentMethod: values.paymentMethod,
            };

            try {
                if (isEdit) {
                    await updateBill({ id: editData._id, data: payload }).unwrap();
                    toast.success("Bill Updated Successfully");
                    refetchProducts();
                    navigate("/getallbill");
                } else {
                    await addBill(payload).unwrap();
                    toast.success("Bill Created Successfully & Stock Decreased!");
                    refetchProducts();
                    resetForm();
                    setItems([{ productId: "", productName: "", quantity: 1, price: "", currentStock: undefined, unit: "PCS", openDropdown: false }]);
                    navigate("/getallbill");
                }
            } catch (err) {
                toast.error(err?.data?.message || "Failed to save bill");
            }
        }
    });

    const subTotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0), 0);
    const discountPercent = Number(formik.values.discount) || 0;
    const taxPercent = Number(formik.values.tax) || 0;

    const discountAmount = (subTotal * discountPercent) / 100;
    const taxableAmount = subTotal - discountAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const totalAmount = Number((taxableAmount + taxAmount).toFixed(2));

    return (
        <div className="min-h-full bg-slate-50 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-5 text-white flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <Receipt className="w-7 h-7 text-white" />
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">
                                {isEdit ? "Edit Bill" : "Create Bill"}
                            </h1>
                            <p className="text-orange-100 text-xs font-medium">
                                Select from products or type & edit manually, calculate total, and generate bill
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/getallbill')}
                        className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3.5 py-1.5 rounded-lg font-semibold transition border border-white/20"
                    >
                        View Bills
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-orange-600" />
                            Customer Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Customer Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    placeholder="Enter Customer Name"
                                    value={formik.values.customerName}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 text-slate-800 text-sm font-medium transition"
                                />
                                {formik.touched.customerName && formik.errors.customerName && (
                                    <p className="text-rose-500 text-xs mt-1">{formik.errors.customerName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Customer Phone <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="customerPhone"
                                    placeholder="Enter Customer Phone"
                                    value={formik.values.customerPhone}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 text-slate-800 text-sm font-medium transition"
                                />
                                {formik.touched.customerPhone && formik.errors.customerPhone && (
                                    <p className="text-rose-500 text-xs mt-1">{formik.errors.customerPhone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ITEMS LIST (Product Name, Qty, Price only - No Size/Color) */}
                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                <PackageCheck className="w-3.5 h-3.5 text-orange-600" />
                                Bill Items ({items.length})
                            </h2>
                            <span className="text-[11px] text-slate-500 font-semibold">
                                Type to search or select from dropdown list
                            </span>
                        </div>

                        <div className="space-y-4">
                            {items.map((item, index) => {
                                const isOverStock = item.currentStock !== undefined && Number(item.quantity) > Number(item.currentStock);
                                const isOutOfStock = item.currentStock !== undefined && Number(item.currentStock) <= 0;

                                // Filter products based on what user is typing
                                const searchVal = (item.productName || "").toLowerCase();
                                const filteredProducts = availableProducts.filter(p =>
                                    p.itemName?.toLowerCase().includes(searchVal) ||
                                    p.category?.toLowerCase().includes(searchVal) ||
                                    p.itemCode?.toLowerCase().includes(searchVal)
                                );

                                return (
                                    <div
                                        key={index}
                                        ref={el => itemRefs.current[index] = el}
                                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative hover:border-slate-300 transition"
                                    >
                                        <div className="flex justify-between items-center pb-1">
                                            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                                <span>Item #{index + 1}</span>
                                                {item.currentStock !== undefined && (
                                                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                                                        item.currentStock > 5
                                                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                                            : item.currentStock > 0
                                                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                                                    }`}>
                                                        Available Stock: {item.currentStock} {item.unit}
                                                    </span>
                                                )}
                                            </span>

                                            {items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center gap-1 transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Remove</span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Row with Product Name (Combobox), Qty, Price */}
                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                                            
                                            {/* Product Name (Col 6) - EDITABLE & AUTOMATIC COMBOBOX */}
                                            <div className="sm:col-span-6 relative">
                                                <div className="flex justify-between items-center mb-1">
                                                    <label className="text-xs font-bold text-slate-700">
                                                        Product Name <span className="text-rose-500">*</span>
                                                    </label>
                                                    <span className="text-[10px] text-slate-400 font-semibold">
                                                        Select or type & edit
                                                    </span>
                                                </div>

                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Type or click to choose product..."
                                                        value={item.productName}
                                                        onChange={(e) => handleProductNameChange(index, e.target.value)}
                                                        onFocus={() => {
                                                            const updated = [...items];
                                                            updated[index].openDropdown = true;
                                                            setItems(updated);
                                                        }}
                                                        className="w-full pl-3.5 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 shadow-sm"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updated = [...items];
                                                            updated[index].openDropdown = !updated[index].openDropdown;
                                                            setItems(updated);
                                                        }}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                                                    >
                                                        <ChevronDown className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Floating Dropdown List of Products */}
                                                {item.openDropdown && (
                                                    <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl z-40 max-h-56 overflow-y-auto divide-y divide-slate-100">
                                                        {filteredProducts.length > 0 ? (
                                                            filteredProducts.map(prod => (
                                                                <button
                                                                    key={prod._id}
                                                                    type="button"
                                                                    onClick={() => selectProduct(index, prod)}
                                                                    className="w-full text-left p-3 hover:bg-orange-50 hover:text-orange-700 transition flex items-center justify-between group"
                                                                >
                                                                    <div>
                                                                        <div className="font-bold text-sm text-slate-800 group-hover:text-orange-700">
                                                                            {prod.itemName}
                                                                        </div>
                                                                        <div className="text-[11px] text-slate-400">
                                                                            {prod.category} • Code: {prod.itemCode || 'N/A'}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-black text-sm text-slate-900 font-mono">
                                                                            ₹{prod.salePrice}
                                                                        </div>
                                                                        <div className="text-[10px] text-emerald-600 font-bold">
                                                                            Stock: {prod.currentStock ?? prod.openingStock} {prod.unit}
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))
                                                        ) : (
                                                            <div className="p-3 text-xs text-slate-400 text-center">
                                                                {availableProducts.length === 0
                                                                    ? "No products added yet in Add Product."
                                                                    : "No exact matches. You can type any custom name above!"}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Out of Stock Warning */}
                                                {isOutOfStock && (
                                                    <p className="text-rose-600 text-[11px] font-bold mt-1 flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        Out of Stock (0 remaining)
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity (Col 3) */}
                                            <div className="sm:col-span-3">
                                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                                    Qty <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    placeholder="1"
                                                    value={item.quantity}
                                                    onChange={(e) => handleNumberChange(index, "quantity", e.target.value)}
                                                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-800 font-bold focus:ring-2 focus:ring-orange-500 ${
                                                        isOverStock ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-slate-300'
                                                    }`}
                                                    required
                                                />
                                                {isOverStock && (
                                                    <p className="text-rose-600 text-[10px] font-bold mt-0.5">
                                                        Exceeds stock ({item.currentStock})!
                                                    </p>
                                                )}
                                            </div>

                                            {/* Price (Col 3) - AUTO FILLED & DIRECTLY EDITABLE */}
                                            <div className="sm:col-span-3">
                                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                                    Price (₹) <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    step="any"
                                                    min={0}
                                                    placeholder="0.00"
                                                    value={item.price}
                                                    onChange={(e) => handleNumberChange(index, "price", e.target.value)}
                                                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 font-bold focus:ring-2 focus:ring-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* + Add Item Button */}
                        <button
                            type="button"
                            onClick={addItem}
                            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-500/20 active:scale-95 transition flex items-center gap-1.5"
                        >
                            <Plus className="w-4 h-4" />
                            <span>+ Add Item</span>
                        </button>
                    </div>

                    {/* BILL TOTALS SUMMARY */}
                    <div className="pt-4 border-t border-slate-200">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            {/* Sub Total (Pure Automatic from items) */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Sub Total (₹)
                                </label>
                                <input
                                    type="text"
                                    value={`₹ ${subTotal.toFixed(2)}`}
                                    readOnly
                                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-800 font-bold text-base cursor-not-allowed"
                                />
                            </div>

                            {/* Discount (%) (Auto populated from product + directly editable manually) */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Discount (%)
                                    </label>
                                    <span className="text-[10px] text-slate-400 font-bold">
                                        Auto / Manual
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    step="any"
                                    min={0}
                                    max={100}
                                    name="discount"
                                    placeholder="Enter Discount %"
                                    value={formik.values.discount}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 shadow-sm transition"
                                />
                            </div>

                            {/* Tax (%) (Auto populated from product + directly editable manually) */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs font-semibold text-slate-700">
                                        Tax (%)
                                    </label>
                                    <span className="text-[10px] text-slate-400 font-bold">
                                        Auto / Manual
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    step="any"
                                    min={0}
                                    max={100}
                                    name="tax"
                                    placeholder="Enter Tax %"
                                    value={formik.values.tax}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 shadow-sm transition"
                                />
                            </div>
                        </div>

                        {/* Total Amount Banner */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Total Amount
                            </label>
                            <div className="px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-white flex justify-between items-center shadow-inner">
                                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
                                    Grand Total Payable
                                </span>
                                <span className="text-2xl font-black text-amber-400 font-mono">
                                    ₹ {totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Payment Method <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="paymentMethod"
                                    value={formik.values.paymentMethod}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium text-sm focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                >
                                    <option value="" disabled hidden>Choose Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                                <p className="text-rose-500 text-xs mt-1">{formik.errors.paymentMethod}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isAdding || isUpdating}
                            className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isAdding || isUpdating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving Bill & Decreasing Stock...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>{isEdit ? "Update Bill" : "Create Bill"}</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddBill;
