// import React, { useState } from 'react';

// const AdminProfile = ({ userData, onUpdate }) => {
//     // 1. Dummy data la component chya baher kiwa surwati la thewa
//     const dummyUser = {
//         _id: "65a1b2c3d4e5f6g7h8i901",
//         branchName: "Maitari Menswear - Main Branch",
//         name: "Akash Shinde",
//         address: "Shop No. 12, Royal Plaza, Near MG Road, Pune, Maharashtra - 411001",
//         email: "akash.shinde@maitari.com",
//         mobile: "+91 98765 43210",
//         password: "hashed_password_123",
//         shopImages: [
//             "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
//             "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
//             "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000"
//         ],
//         inActive: false,
//     };

//     // 2. Jar prop madhun data ala nahi tar dummyUser vapra
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(userData || dummyUser);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSave = () => {
//         if (onUpdate) onUpdate(formData);
//         setIsEditing(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 pb-12">
//             {/* TOP SECTION: SHOP IMAGES */}
//             <div className="w-full h-64 sm:h-80 bg-slate-200 relative overflow-hidden">
//                 {formData.shopImages && formData.shopImages.length > 0 ? (
//                     <div className="flex w-full h-full overflow-x-auto snap-x scrollbar-hide">
//                         {formData.shopImages.map((img, index) => (
//                             <img
//                                 key={index}
//                                 src={img}
//                                 alt={`Shop ${index}`}
//                                 className="w-full h-full object-cover flex-shrink-0 snap-center"
//                             />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                         No Shop Images Available
//                     </div>
//                 )}
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
//                     {formData.shopImages?.length || 0} Images
//                 </div>
//             </div>

//             {/* PROFILE CONTENT */}
//             <div className="max-w-4xl mx-auto -mt-12 px-4 relative z-10">
//                 <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">

//                     {/* Header */}
//                     <div className="bg-slate-800 p-6 flex justify-between items-center">
//                         <div>
//                             <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
//                                 {isEditing ? "Edit Profile" : formData.branchName}
//                             </h2>
//                             <p className="text-slate-400 text-sm italic">Branch Profile</p>
//                         </div>
//                         <button
//                             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//                             className={`px-6 py-2 rounded-lg font-bold text-sm uppercase transition-all ${isEditing
//                                 ? "bg-emerald-500 hover:bg-emerald-600 text-white"
//                                 : "bg-white hover:bg-gray-100 text-slate-800"
//                                 }`}
//                         >
//                             {isEditing ? "Save Changes" : "Edit Profile"}
//                         </button>
//                     </div>

//                     {/* Info Grid */}
//                     <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-slate-500 uppercase">Manager Name</label>
//                             {isEditing ? (
//                                 <input
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-400 outline-none"
//                                 />
//                             ) : (
//                                 <p className="text-lg font-medium text-slate-800">{formData.name}</p>
//                             )}
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
//                             {isEditing ? (
//                                 <input
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-400 outline-none"
//                                 />
//                             ) : (
//                                 <p className="text-lg font-medium text-slate-800">{formData.email}</p>
//                             )}
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-slate-500 uppercase">Contact Number</label>
//                             {isEditing ? (
//                                 <input
//                                     name="mobile"
//                                     value={formData.mobile}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-400 outline-none"
//                                 />
//                             ) : (
//                                 <p className="text-lg font-medium text-slate-800">{formData.mobile}</p>
//                             )}
//                         </div>

//                         <div className="space-y-2">
//                             <label className="text-xs font-bold text-slate-500 uppercase">Account Status</label>
//                             <div className="flex items-center gap-2">
//                                 <span className={`w-3 h-3 rounded-full ${formData.inActive ? 'bg-orange-400' : 'bg-emerald-500'}`}></span>
//                                 <p className="text-sm font-bold uppercase text-gray-700">
//                                     {formData.inActive ? "Inactive / Pending" : "Active"}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="space-y-2 md:col-span-2">
//                             <label className="text-xs font-bold text-slate-500 uppercase">Shop Address</label>
//                             {isEditing ? (
//                                 <textarea
//                                     name="address"
//                                     rows="3"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-400 outline-none"
//                                 />
//                             ) : (
//                                 <p className="text-slate-700 leading-relaxed">{formData.address}</p>
//                             )}
//                         </div>

//                         {isEditing && (
//                             <div className="md:col-span-2 pt-4 border-t">
//                                 <button
//                                     onClick={() => {
//                                         setIsEditing(false);
//                                         setFormData(userData || dummyUser);
//                                     }}
//                                     className="text-red-500 text-sm font-bold uppercase hover:underline"
//                                 >
//                                     Cancel Editing
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminProfile;



import React, { useState, useRef, useEffect } from 'react';
import { useUsergetprofileQuery, useUserUpdateprofileMutation, } from '../../redux/api/auth.api';

const ProfessionalAdminProfile = ({ userData, onUpdate }) => {

    const { data, isLoading } = useUsergetprofileQuery();
    console.log(data)
    const [updateProfile, { isLoading: updating }] = useUserUpdateprofileMutation();

    const profileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [openImage, setOpenImage] = useState(null);

    useEffect(() => {
        if (data?.user) {
            setFormData(data.user);
        }
    }, [data]);

    if (isLoading || !formData) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, profileImage: imageUrl });
        }
    };

    const handleSave = async () => {
        await updateProfile(formData);
        setIsEditing(false);
    };


    return (
        <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto">
                <input
                    type="file"
                    ref={profileInputRef}
                    className="hidden"
                    onChange={handleProfileChange}
                    accept="image/*"
                />

                <div className="relative h-72 w-full rounded-[2rem] overflow-hidden shadow-2xl mb-12 group">
                    <img
                        // src={formData.shopImages[0]}
                        src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200'
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt="Store Front"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                    <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">

                            <div className="relative group/profile">
                                {/* <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-2xl overflow-hidden">
                                    {formData.profileImage ? (
                                        <img src={formData?.result?.shopImages[0]} className="w-full h-full object-cover" alt="Profile" />
                                    ) : (
                                        "👕"
                                    )}
                                </div> */}
                                {/* <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-2xl overflow-hidden">
                                    {formData?.shopImages?.length > 0 ? (
                                        <img
                                            src={formData.shopImages[0]}
                                            className="w-full h-full object-cover"
                                            alt="Profile"
                                        />
                                    ) : (
                                        "👕"
                                    )}
                                </div> */}
                                <div
                                    className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
             flex items-center justify-center text-3xl shadow-2xl overflow-hidden 
             cursor-pointer"
                                    onClick={() => {
                                        if (formData?.shopImages?.length > 0) {
                                            setOpenImage(formData.shopImages[0]);
                                        }
                                    }}
                                >
                                    {formData?.shopImages?.length > 0 ? (
                                        <img
                                            src={formData.shopImages[0]}
                                            className="w-full h-full object-cover"
                                            alt="Profile"
                                        />
                                    ) : (
                                        "👕"
                                    )}
                                </div>



                                {openImage && (
                                    <div
                                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                                        onClick={() => setOpenImage(null)}
                                    >
                                        <img
                                            src={openImage}
                                            alt="Full Image"
                                            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
                                        />
                                    </div>
                                )}


                                {isEditing && (
                                    <div
                                        onClick={() => profileInputRef.current.click()}
                                        className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl cursor-pointer opacity-0 group-hover/profile:opacity-100 transition-opacity"
                                    >
                                        <span className="text-lg">📸</span>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                                    {formData.branchName}
                                </h1>
                                <p className="text-slate-300 font-medium flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${formData.inActive ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`} />
                                    {formData.inActive ? 'Branch Offline' : 'Active Management'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95"
                                >
                                    Edit Settings
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => {
                                        setIsEditing(false);
                                        setFormData(userData || formData);
                                    }} className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Cancel</button>
                                    <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/30 transition-all">Save Changes</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Management Overview</h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">Chief Manager</p>
                                    <p className="font-bold text-slate-800">{formData.name}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">Support Contact</p>
                                    <p className="font-bold text-slate-800">{formData.mobile}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-50">
                                    <p className="text-[11px] text-slate-400 font-bold uppercase mb-3 text-center">Branch Health Status</p>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-600 h-full w-[95%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-8 w-1 bg-indigo-600 rounded-full" />
                            <h3 className="text-2xl font-extrabold text-slate-800">Branch Configuration</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <InputField label="Business Entity Name" name="branchName" value={formData.branchName} isEditing={isEditing} onChange={handleChange} />
                            <InputField label="Responsible Manager" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                            <InputField label="Corporate Email Address" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} />
                            <InputField label="Official Mobile Link" name="mobile" value={formData.mobile} isEditing={isEditing} onChange={handleChange} />
                            <div className="sm:col-span-2 pt-4">
                                <InputField label="Registered Physical Address" name="address" value={formData.address} isEditing={isEditing} onChange={handleChange} isTextArea />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, value, isEditing, name, onChange, isTextArea }) => (
    <div className="flex flex-col group">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-indigo-600 transition-colors">
            {label}
        </label>
        {isEditing ? (
            isTextArea ? (
                <textarea name={name} value={value} onChange={onChange} rows="4" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold focus:ring-[6px] focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all resize-none" />
            ) : (
                <input type="text" name={name} value={value} onChange={onChange} className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold focus:ring-[6px] focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all" />
            )
        ) : (
            <div className="bg-transparent border-b border-slate-100 p-1 group-hover:border-indigo-200 transition-all">
                <p className="text-slate-700 font-bold text-base">{value}</p>
            </div>
        )}
    </div>
);

export default ProfessionalAdminProfile;







// import React, { useState } from 'react';

// const ProfessionalAdminProfile = ({ userData, onUpdate }) => {
//     // Initial State: If userData is not passed, use these clean defaults
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState(userData || {
//         branchName: "Maitari Menswear",
//         name: "Akash Shinde",
//         address: "Pune, Maharashtra",
//         email: "akash@example.com",
//         mobile: "9876543210",
//         shopImages: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"],
//         inActive: false
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSave = () => {
//         if (onUpdate) onUpdate(formData);
//         setIsEditing(false);
//     };

//     return (
//         <div className="min-h-screen bg-[#fcfcfd] p-6 lg:p-12 font-sans text-slate-900">
//             <div className="max-w-5xl mx-auto">

//                 {/* --- TOP IMAGE BANNER --- */}
//                 <div className="relative h-72 w-full rounded-[2rem] overflow-hidden shadow-2xl mb-12">
//                     <img
//                         src={formData.shopImages[0]}
//                         className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//                         alt="Store Front"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

//                     {/* Header Overlay */}
//                     <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-center justify-between gap-6">
//                         <div className="flex items-center gap-6">
//                             <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-2xl">
//                                 👕
//                             </div>
//                             <div>
//                                 <h1 className="text-4xl font-black text-white tracking-tight uppercase">
//                                     {formData.branchName}
//                                 </h1>
//                                 <p className="text-slate-300 font-medium flex items-center gap-2">
//                                     <span className={`h-2 w-2 rounded-full ${formData.inActive ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`} />
//                                     {formData.inActive ? 'Branch Offline' : 'Active Management'}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex gap-3">
//                             {!isEditing ? (
//                                 <button
//                                     onClick={() => setIsEditing(true)}
//                                     className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95"
//                                 >
//                                     Edit Settings
//                                 </button>
//                             ) : (
//                                 <div className="flex gap-2">
//                                     <button onClick={() => setIsEditing(false)} className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Cancel</button>
//                                     <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-500/30 transition-all">Save Changes</button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- INFORMATION SECTION --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

//                     {/* Sidebar: Profile Summary */}
//                     <div className="space-y-6">
//                         <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
//                             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Management Overview</h4>
//                             <div className="space-y-6">
//                                 <div>
//                                     <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">Chief Manager</p>
//                                     <p className="font-bold text-slate-800">{formData.name}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-[11px] text-slate-400 font-bold uppercase mb-1">Support Contact</p>
//                                     <p className="font-bold text-slate-800">{formData.mobile}</p>
//                                 </div>
//                                 <div className="pt-4 border-t border-slate-50">
//                                     <p className="text-[11px] text-slate-400 font-bold uppercase mb-3 text-center">Branch Health</p>
//                                     <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                                         <div className="bg-indigo-600 h-full w-[92%]" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main: Detailed Form */}
//                     <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm">
//                         <div className="flex items-center gap-3 mb-10">
//                             <div className="h-8 w-1 bg-indigo-600 rounded-full" />
//                             <h3 className="text-2xl font-extrabold text-slate-800">Branch Configuration</h3>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                             <InputField
//                                 label="Business Entity Name"
//                                 name="branchName"
//                                 value={formData.branchName}
//                                 isEditing={isEditing}
//                                 onChange={handleChange}
//                             />
//                             <InputField
//                                 label="Responsible Manager"
//                                 name="name"
//                                 value={formData.name}
//                                 isEditing={isEditing}
//                                 onChange={handleChange}
//                             />
//                             <InputField
//                                 label="Corporate Email Address"
//                                 name="email"
//                                 value={formData.email}
//                                 isEditing={isEditing}
//                                 onChange={handleChange}
//                             />
//                             <InputField
//                                 label="Official Mobile Link"
//                                 name="mobile"
//                                 value={formData.mobile}
//                                 isEditing={isEditing}
//                                 onChange={handleChange}
//                             />
//                             <div className="sm:col-span-2 pt-4">
//                                 <InputField
//                                     label="Registered Physical Address"
//                                     name="address"
//                                     value={formData.address}
//                                     isEditing={isEditing}
//                                     onChange={handleChange}
//                                     isTextArea
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Custom High-End Input Component
// const InputField = ({ label, value, isEditing, name, onChange, isTextArea }) => (
//     <div className="flex flex-col group">
//         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 group-focus-within:text-indigo-600 transition-colors">
//             {label}
//         </label>
//         {isEditing ? (
//             isTextArea ? (
//                 <textarea
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     rows="4"
//                     className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold focus:ring-[6px] focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all resize-none"
//                 />
//             ) : (
//                 <input
//                     type="text"
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold focus:ring-[6px] focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all"
//                 />
//             )
//         ) : (
//             <div className="bg-transparent border-b border-slate-100 p-1 group-hover:border-indigo-200 transition-all">
//                 <p className="text-slate-700 font-bold text-base">{value}</p>
//             </div>
//         )}
//     </div>
// );

// export default ProfessionalAdminProfile;