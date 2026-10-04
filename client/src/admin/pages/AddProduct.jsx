import React, { useState } from 'react';
import { useAddClothProductMutation } from '../../redux/api/product.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles,
    Search,
    Barcode,
    Layers,
    DollarSign,
    Package,
    ChevronDown,
    Building2,
    UploadCloud,
    CheckCircle2,
    Calendar,
    MapPin,
    AlertCircle
} from 'lucide-react';

const UNIT_OPTIONS = ['PCS', 'MTR', 'BOX', 'NOS', 'SET', 'PAIR', 'DOZEN', 'KG'];
const CATEGORY_OPTIONS = [
    'Shirts',
    'T-Shirts',
    'Pants / Trousers',
    'Jeans',
    'Sarees',
    'Kurtas / Kurtis',
    'Dresses / Suits',
    'Fabrics / Material',
    'Kids Wear',
    'Innerwear',
    'Footer / Shoes',
    'Other'
];
const TAX_RATES = ['None', '0%', '5%', '12%', '18%', '28%'];

const AddProduct = () => {
    const navigate = useNavigate();
    const [addClothProduct, { isLoading }] = useAddClothProductMutation();

    // Tab state: 'pricing' or 'stock'
    const [activeTab, setActiveTab] = useState('pricing');

    // Unit modal / dropdown state
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        itemName: '',
        unit: 'PCS',
        itemCode: '',
        category: 'Shirts',
        customCategory: '',
        hsnCode: '',

        // Pricing tab
        salePrice: '',
        salePriceTaxType: 'Without Tax',
        discountOnSalePrice: '',
        discountType: 'Percentage',
        purchasePrice: '',
        purchasePriceTaxType: 'Without Tax',
        taxRate: 'None',

        // Stock tab
        openingStock: '',
        asOfDate: new Date().toISOString().split('T')[0],
        atPriceUnit: '',
        minStockQty: '',
        itemLocation: '',

        // Optional supplier & photos
        companyName: '',
        companyContact: '',
        productType: 'cloth',
    });

    const [photos, setPhotos] = useState([]);
    const [showSupplierSection, setShowSupplierSection] = useState(false);

    // Generate random barcode / code
    const handleAssignCode = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const code = `CLOTH-${randomNum}`;
        setFormData(prev => ({ ...prev, itemCode: code }));
        toast.info(`Assigned Code: ${code}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.itemName.trim()) {
            toast.error('Please enter Item Name');
            return;
        }

        if (formData.salePrice === '' || Number(formData.salePrice) < 0) {
            toast.error('Please enter a valid Sale Price');
            setActiveTab('pricing');
            return;
        }

        try {
            const fd = new FormData();
            const selectedCategory = formData.category === 'Other' && formData.customCategory
                ? formData.customCategory
                : formData.category;

            fd.append('itemName', formData.itemName.trim());
            fd.append('unit', formData.unit);
            fd.append('itemCode', formData.itemCode);
            fd.append('category', selectedCategory);
            fd.append('hsnCode', formData.hsnCode);

            fd.append('salePrice', formData.salePrice);
            fd.append('salePriceTaxType', formData.salePriceTaxType);
            fd.append('discountOnSalePrice', formData.discountOnSalePrice || 0);
            fd.append('discountType', formData.discountType);
            fd.append('purchasePrice', formData.purchasePrice || 0);
            fd.append('purchasePriceTaxType', formData.purchasePriceTaxType);
            fd.append('taxRate', formData.taxRate);

            fd.append('openingStock', formData.openingStock || 0);
            fd.append('asOfDate', formData.asOfDate);
            fd.append('atPriceUnit', formData.atPriceUnit || 0);
            fd.append('minStockQty', formData.minStockQty || 0);
            fd.append('itemLocation', formData.itemLocation);

            fd.append('companyName', formData.companyName);
            fd.append('companyContact', formData.companyContact);
            fd.append('productType', formData.productType);

            if (photos && photos.length > 0) {
                for (let i = 0; i < photos.length; i++) {
                    fd.append('billphoto', photos[i]);
                }
            }

            await addClothProduct(fd).unwrap();
            toast.success('Product Item Added Successfully!');

            // Reset form
            setFormData({
                itemName: '',
                unit: 'PCS',
                itemCode: '',
                category: 'Shirts',
                customCategory: '',
                hsnCode: '',
                salePrice: '',
                salePriceTaxType: 'Without Tax',
                discountOnSalePrice: '',
                discountType: 'Percentage',
                purchasePrice: '',
                purchasePriceTaxType: 'Without Tax',
                taxRate: 'None',
                openingStock: '',
                asOfDate: new Date().toISOString().split('T')[0],
                atPriceUnit: '',
                minStockQty: '',
                itemLocation: '',
                companyName: '',
                companyContact: '',
                productType: 'cloth',
            });
            setPhotos([]);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || 'Failed to add product');
        }
    };

    return (
        <div className="min-h-full bg-slate-50 py-8 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                {/* Header Banner */}
                <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 px-6 py-5 text-white flex justify-between items-center shadow-md">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Add Product Item</h1>
                        <p className="text-orange-100 text-xs mt-0.5 font-medium">
                            Add cloth items with pricing, inventory stock, and barcodes
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate('/getproduct')}
                        className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3.5 py-1.5 rounded-lg font-semibold transition border border-white/20"
                    >
                        View Items
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* TOP SECTION: Basic Item Info (Matching Image 2) */}
                    <div className="space-y-4">
                        {/* Item Name + Select Unit */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    Item Name <span className="text-rose-500">*</span>
                                </label>
                                <span className="text-xs font-semibold text-slate-500">
                                    Unit: <span className="text-orange-600 font-bold">{formData.unit}</span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        name="itemName"
                                        value={formData.itemName}
                                        onChange={handleChange}
                                        placeholder="e.g. 6T9 aarmani, Cotton Shirt, Linen Saree"
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm font-medium transition"
                                    />
                                </div>

                                {/* Select Unit Dropdown / Button */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                                        className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition active:scale-95 whitespace-nowrap"
                                    >
                                        <span>Select Unit</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                    </button>

                                    {showUnitDropdown && (
                                        <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 max-h-48 overflow-auto">
                                            {UNIT_OPTIONS.map(unit => (
                                                <button
                                                    key={unit}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, unit }));
                                                        setShowUnitDropdown(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-orange-50 hover:text-orange-600 transition flex items-center justify-between ${formData.unit === unit ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-700'
                                                        }`}
                                                >
                                                    <span>{unit}</span>
                                                    {formData.unit === unit && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Item Code / Barcode + Assign Code Button */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                Item Code / Barcode
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Barcode className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="itemCode"
                                        value={formData.itemCode}
                                        onChange={handleChange}
                                        placeholder="Scan or enter barcode / item code"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm font-mono transition"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAssignCode}
                                    className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold transition active:scale-95 whitespace-nowrap flex items-center gap-1.5 shadow-sm"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                    <span>Assign Code</span>
                                </button>
                            </div>
                        </div>

                        {/* Item Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    Item Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm font-medium appearance-none transition"
                                    >
                                        {CATEGORY_OPTIONS.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                                {formData.category === 'Other' && (
                                    <input
                                        type="text"
                                        name="customCategory"
                                        value={formData.customCategory}
                                        onChange={handleChange}
                                        placeholder="Enter custom category"
                                        className="mt-2 w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                                    />
                                )}
                            </div>

                            {/* HSN/SAC Code */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                                    HSN / SAC Code
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="hsnCode"
                                        value={formData.hsnCode}
                                        onChange={handleChange}
                                        placeholder="e.g. 5208, 6205"
                                        className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800 text-sm font-medium transition"
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TABS HEADER: PRICING & STOCK (Matching Image 2 & 3) */}
                    <div className="pt-2">
                        <div className="flex border-b-2 border-slate-200">
                            <button
                                type="button"
                                onClick={() => setActiveTab('pricing')}
                                className={`flex-1 py-3 text-center text-sm font-bold tracking-wide transition relative ${activeTab === 'pricing'
                                        ? 'text-rose-600'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-1.5">
                                    <DollarSign className="w-4 h-4" />
                                    Pricing
                                </span>
                                {activeTab === 'pricing' && (
                                    <span className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-rose-600 rounded-full" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('stock')}
                                className={`flex-1 py-3 text-center text-sm font-bold tracking-wide transition relative ${activeTab === 'stock'
                                        ? 'text-rose-600'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-1.5">
                                    <Package className="w-4 h-4" />
                                    Stock
                                </span>
                                {activeTab === 'stock' && (
                                    <span className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-rose-600 rounded-full" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* TAB 1: PRICING (Matching Image 3) */}
                    {activeTab === 'pricing' && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            {/* Sale Price Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                                    Sale Price
                                </h3>

                                <div className="space-y-3">
                                    {/* Sale Price Field */}
                                    <div className="relative border border-slate-300 rounded-xl p-1 bg-white flex items-center focus-within:ring-2 focus-within:ring-orange-500">
                                        <div className="flex-1 px-3 py-1">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                Sale Price <span className="text-rose-500">*</span>
                                            </span>
                                            <input
                                                type="number"
                                                step="any"
                                                name="salePrice"
                                                value={formData.salePrice}
                                                onChange={handleChange}
                                                placeholder="680.00"
                                                required
                                                className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                            />
                                        </div>
                                        <div className="pr-2">
                                            <select
                                                name="salePriceTaxType"
                                                value={formData.salePriceTaxType}
                                                onChange={handleChange}
                                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border-0 focus:ring-1 focus:ring-slate-400 cursor-pointer"
                                            >
                                                <option value="Without Tax">Without Tax</option>
                                                <option value="With Tax">With Tax</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Disc. On Sale Price */}
                                    <div className="relative border border-slate-300 rounded-xl p-1 bg-white flex items-center focus-within:ring-2 focus-within:ring-orange-500">
                                        <div className="flex-1 px-3 py-1">
                                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                Disc. On Sale Price
                                            </span>
                                            <input
                                                type="number"
                                                step="any"
                                                name="discountOnSalePrice"
                                                value={formData.discountOnSalePrice}
                                                onChange={handleChange}
                                                placeholder="10.0"
                                                className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                            />
                                        </div>
                                        <div className="pr-2">
                                            <select
                                                name="discountType"
                                                value={formData.discountType}
                                                onChange={handleChange}
                                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border-0 focus:ring-1 focus:ring-slate-400 cursor-pointer"
                                            >
                                                <option value="Percentage">Percentage</option>
                                                <option value="Amount">Amount (₹)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Price Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                                    Purchase Price
                                </h3>

                                <div className="relative border border-slate-300 rounded-xl p-1 bg-white flex items-center focus-within:ring-2 focus-within:ring-orange-500">
                                    <div className="flex-1 px-3 py-1">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            Purchase Price
                                        </span>
                                        <input
                                            type="number"
                                            step="any"
                                            name="purchasePrice"
                                            value={formData.purchasePrice}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                        />
                                    </div>
                                    <div className="pr-2">
                                        <select
                                            name="purchasePriceTaxType"
                                            value={formData.purchasePriceTaxType}
                                            onChange={handleChange}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border-0 focus:ring-1 focus:ring-slate-400 cursor-pointer"
                                        >
                                            <option value="Without Tax">Without Tax</option>
                                            <option value="With Tax">With Tax</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Taxes Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                                    Taxes
                                </h3>

                                <div className="border border-slate-300 rounded-xl p-3 bg-white">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Tax Rate
                                    </span>
                                    <div className="relative">
                                        <select
                                            name="taxRate"
                                            value={formData.taxRate}
                                            onChange={handleChange}
                                            className="w-full bg-transparent text-slate-800 font-bold text-sm focus:outline-none cursor-pointer appearance-none"
                                        >
                                            {TAX_RATES.map(rate => (
                                                <option key={rate} value={rate}>{rate}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: STOCK (Matching Image 2) */}
                    {activeTab === 'stock' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                            {/* Opening Stock */}
                            <div className="border border-slate-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-orange-500">
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    Opening Stock
                                </span>
                                <input
                                    type="number"
                                    step="any"
                                    name="openingStock"
                                    value={formData.openingStock}
                                    onChange={handleChange}
                                    placeholder="20.0"
                                    className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                />
                            </div>

                            {/* As Of Date & At Price/Unit */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="border border-slate-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-orange-500">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        As Of Date
                                    </span>
                                    <input
                                        type="date"
                                        name="asOfDate"
                                        value={formData.asOfDate}
                                        onChange={handleChange}
                                        className="w-full text-slate-800 font-semibold text-sm focus:outline-none"
                                    />
                                </div>

                                <div className="border border-slate-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-orange-500">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        At Price / piece
                                    </span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="atPriceUnit"
                                        value={formData.atPriceUnit}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Min Stock Qty & Item Location */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="border border-slate-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-orange-500">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Min Stock Qty
                                    </span>
                                    <input
                                        type="number"
                                        step="any"
                                        name="minStockQty"
                                        value={formData.minStockQty}
                                        onChange={handleChange}
                                        placeholder="0.0"
                                        className="w-full text-slate-800 font-bold text-base focus:outline-none"
                                    />
                                </div>

                                <div className="border border-slate-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-orange-500">
                                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Item Location
                                    </span>
                                    <input
                                        type="text"
                                        name="itemLocation"
                                        value={formData.itemLocation}
                                        onChange={handleChange}
                                        placeholder="e.g. Rack A1, Shelf 3"
                                        className="w-full text-slate-800 font-medium text-sm focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OPTIONAL SUPPLIER & PHOTOS (Collapsible) */}
                    <div className="pt-2">
                        <button
                            type="button"
                            onClick={() => setShowSupplierSection(!showSupplierSection)}
                            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition"
                        >
                            <span>{showSupplierSection ? '− Hide Supplier & Photo details' : '+ Add Supplier & Photos (Optional)'}</span>
                        </button>

                        {showSupplierSection && (
                            <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in fade-in">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">Company / Supplier Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Supplier Name"
                                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 mb-1">Company Contact</label>
                                        <input
                                            type="text"
                                            name="companyContact"
                                            value={formData.companyContact}
                                            onChange={handleChange}
                                            placeholder="Contact number"
                                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Product Photos / Bills</label>
                                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-100 transition cursor-pointer">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => setPhotos(e.target.files)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                                        <span className="text-xs text-slate-600 font-medium">Click to upload or drag & drop</span>
                                        {photos && photos.length > 0 && (
                                            <p className="text-xs text-emerald-600 font-bold mt-1">
                                                {photos.length} photo(s) selected
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving Product...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Save Product</span>
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;
