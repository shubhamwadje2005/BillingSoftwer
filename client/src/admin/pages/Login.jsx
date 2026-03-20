// import React, { useState } from 'react';

// const LoginUI = () => {
//     const [isOn, setIsOn] = useState(false);

//     const toggleLight = () => setIsOn(!isOn);

//     return (
//         <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${isOn ? 'bg-orange-300' : 'bg-black'}`}>

//             {/* Background Image (Sunset/Palm trees) */}
//             <div
//                 className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isOn ? 'opacity-80' : 'opacity-20'}`}
//                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')` }}
//             ></div>

//             {/* The Lamp & Beam */}
//             <div className="absolute top-0 flex flex-col items-center z-20">
//                 {/* Lamp Base */}
//                 <div className="w-24 h-12 bg-gray-800 clip-path-lamp flex items-center justify-center text-white text-xs font-bold pt-2">
//                     {!isOn && "LOGIN"}
//                 </div>

//                 {/* Pull String (Dori) */}
//                 <div
//                     onClick={toggleLight}
//                     className="cursor-pointer flex flex-col items-center group"
//                 >
//                     <div className="w-0.5 h-16 bg-gray-400 group-hover:bg-yellow-400 transition-colors"></div>
//                     <div className={`w-4 h-4 rounded-full border-2 border-gray-400 transition-colors ${isOn ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
//                 </div>

//                 {/* Light Beam (Triangle) */}
//                 <div
//                     className={`transition-opacity duration-500 pointer-events-none ${isOn ? 'opacity-100' : 'opacity-0'}`}
//                     style={{
//                         width: '1000px',
//                         height: '800px',
//                         background: 'linear-gradient(to bottom, rgba(255,255,200,0.4) 0%, transparent 80%)',
//                         clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                         marginTop: '-60px'
//                     }}
//                 ></div>
//             </div>

//             {/* Login Card */}
//             <div className={`relative z-30 transition-all duration-700 transform ${isOn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//                 <div className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 p-8 rounded-2xl shadow-2xl w-80 text-center">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>

//                     <div className="text-left mb-4">
//                         <label className="block text-sm font-semibold text-gray-700 mb-1">Username:</label>
//                         <input type="text" className="w-full px-3 py-2 rounded bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                     </div>

//                     <div className="text-left mb-6">
//                         <label className="block text-sm font-semibold text-gray-700 mb-1">Password:</label>
//                         <input type="password" className="w-full px-3 py-2 rounded bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                     </div>

//                     <button className="w-full py-3 bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all shadow-lg active:scale-95">
//                         SIGN IN
//                     </button>
//                 </div>
//             </div>

//             {/* Tailwind Custom CSS Style */}
//             <style jsx>{`
//         .clip-path-lamp {
//           clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
//         }
//       `}</style>
//         </div>
//     );
// };

// export default LoginUI;





// import React, { useState } from 'react';

// const LoginUI = () => {
//     const [isOn, setIsOn] = useState(false);
//     const [credentials, setCredentials] = useState({ username: '', password: '' });

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     const handleSignIn = (e) => {
//         e.preventDefault();
//         alert(`Signing in with: ${credentials.username}`);
//     };

//     return (
//         <div className="relative min-h-screen flex items-center justify-center bg-[#1a0a0a] overflow-hidden font-sans">

//             {/* 1. Background Image with Dark Overlay */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
//                 style={{
//                     backgroundImage: `url('https://images.unsplash.com/photo-1500051638674-bb996a00b717?q=80&w=2000&auto=format&fit=crop')`, // Tropical Sunset Image
//                     filter: isOn ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.2) contrast(1.2)'
//                 }}
//             >
//                 <div className={`absolute inset-0 transition-colors duration-1000 ${isOn ? 'bg-orange-900/20' : 'bg-black/60'}`}></div>
//             </div>

//             {/* 2. The Lamp and Spotlight */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
//                 {/* Trapezoid Lamp Head */}
//                 <div
//                     onClick={() => setIsOn(!isOn)}
//                     className="cursor-pointer w-32 h-16 bg-[#444] flex items-center justify-center text-white text-sm font-bold shadow-xl active:scale-95 transition-transform"
//                     style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }}
//                 >
//                     {!isOn && <span className="mt-2 tracking-widest">LOGIN</span>}
//                 </div>

//                 {/* String (Dori) */}
//                 <div className="w-[2px] h-12 bg-gray-500 shadow-md"></div>
//                 <div
//                     onClick={() => setIsOn(!isOn)}
//                     className={`w-5 h-5 rounded-full cursor-pointer border-2 border-gray-600 transition-colors shadow-lg ${isOn ? 'bg-yellow-400' : 'bg-gray-800'}`}
//                 ></div>

//                 {/* The Spotlight Beam - Image Match */}
//                 <div
//                     className={`pointer-events-none transition-opacity duration-700 ${isOn ? 'opacity-100' : 'opacity-0'}`}
//                     style={{
//                         width: '120vw',
//                         height: '150vh',
//                         background: 'linear-gradient(to bottom, rgba(255, 243, 176, 0.5) 0%, rgba(255, 243, 176, 0.1) 40%, transparent 80%)',
//                         clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                         marginTop: '-85px'
//                     }}
//                 ></div>
//             </div>

//             {/* 3. Login Card (Workable Form) */}
//             <div className={`relative z-30 transition-all duration-1000 transform ${isOn ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
//                 <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-[20px] shadow-2xl w-[350px]">
//                     <h2 className="text-[28px] font-bold text-[#333] mb-8 text-center">Welcome Back</h2>

//                     <form onSubmit={handleSignIn}>
//                         <div className="mb-5">
//                             <label className="block text-[15px] font-bold text-[#444] mb-2">Username:</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={credentials.username}
//                                 onChange={handleChange}
//                                 className="w-full h-11 px-4 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-8">
//                             <label className="block text-[15px] font-bold text-[#444] mb-2">Password:</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                                 className="w-full h-11 px-4 rounded-lg bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
//                                 required
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full py-3.5 bg-gradient-to-b from-[#ffed4b] to-[#f7b500] hover:from-[#f7b500] hover:to-[#ffed4b] text-black font-extrabold rounded-lg shadow-md transition-all active:translate-y-1"
//                         >
//                             SIGN IN
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginUI;




// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// const AuthUI = () => {
//     const [isOn, setIsOn] = useState(false);
//     const [isRegister, setIsRegister] = useState(true); // default Register
//     const [showPassword, setShowPassword] = useState(false);

//     const [form, setForm] = useState({
//         branchName: "",
//         name: "",
//         email: "",
//         mobile: "",
//         username: "",
//         password: "",
//         shopImages: []
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setForm({ ...form, shopImages: Array.from(e.target.files) });
//     };

//     return (
//         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black font-sans">

//             {/* Background */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
//                 style={{
//                     backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop')`,
//                     filter: isOn ? "brightness(0.8) contrast(1.1)" : "brightness(0.15) contrast(1.2)",
//                 }}
//             >
//                 <div className={`absolute inset-0 transition-colors duration-1000 ${isOn ? "bg-black/20" : "bg-black/80"}`} />
//             </div>

//             {/* Lamp */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
//                 <div
//                     className="relative w-40 h-16 bg-[#2a2a2a] flex items-center justify-center shadow-2xl"
//                     style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
//                 >
//                     {!isOn && (
//                         <span className="text-white text-[11px] font-bold tracking-[0.3em] mt-2">
//                             {isRegister ? "REGISTER" : "LOGIN"}
//                         </span>
//                     )}
//                 </div>

//                 {/* Bulb + Dori */}
//                 <div className="relative flex flex-col items-center -mt-1">
//                     <div
//                         className={`w-6 h-6 rounded-full transition-all duration-500 shadow-2xl ${isOn ? "bg-yellow-200 blur-[2px]" : "bg-[#444]"}`}
//                     />
//                     <div
//                         className="absolute top-1 left-[250%] flex flex-col items-center cursor-pointer group"
//                         onClick={() => setIsOn(!isOn)}
//                     >
//                         <div className="w-[1.5px] h-20 bg-gray-500 group-hover:bg-yellow-400 transition-colors" />
//                         <div
//                             className={`w-4 h-4 rounded-full border border-gray-600 transition-all ${isOn ? "bg-yellow-400 scale-110" : "bg-[#555]"}`}
//                         />
//                     </div>
//                 </div>

//                 {/* Light Beam */}
//                 <div
//                     className={`pointer-events-none absolute -top-8 transition-opacity duration-700 ${isOn ? "opacity-100" : "opacity-0"}`}
//                     style={{
//                         width: "200vw",
//                         height: "200vh",
//                         background: `linear-gradient(to bottom, transparent 4%, rgba(255,255,220,0.35) 20%, rgba(255,255,220,0.15) 45%, rgba(255,255,220,0.06) 65%, transparent 80%)`,
//                         clipPath: "polygon(50% 0%, 10% 100%, 90% 100%)",
//                     }}
//                 />
//             </div>

//             {/* Form */}
//             <div className={`relative z-40 transition-all duration-1000 transform ${isOn ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}>
//                 <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-[380px]">

//                     <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center">
//                         {isRegister ? "Create Account" : "Welcome Back"}
//                     </h2>

//                     <div className="space-y-4">
//                         {isRegister && (
//                             <>
//                                 <input
//                                     type="text"
//                                     name="branchName"
//                                     value={form.branchName}
//                                     onChange={handleChange}
//                                     placeholder="Branch Name"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={form.name}
//                                     onChange={handleChange}
//                                     placeholder="Owner Name"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={form.email}
//                                     onChange={handleChange}
//                                     placeholder="Email"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="mobile"
//                                     value={form.mobile}
//                                     onChange={handleChange}
//                                     placeholder="Mobile"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     value={form.username}
//                                     onChange={handleChange}
//                                     placeholder="Username"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         placeholder="Password"
//                                         className="w-full h-11 px-5 pr-12 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-4 top-3 text-gray-600"
//                                     >
//                                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>
//                                 {/* File Input */}
//                                 <div>
//                                     <label className="block text-sm font-semibold text-black mb-1">Shop Images</label>
//                                     <input
//                                         type="file"
//                                         multiple
//                                         onChange={handleFileChange}
//                                         className="w-full text-sm text-black
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-lg file:border-0
//                     file:bg-yellow-400 file:text-black
//                     hover:file:bg-yellow-500 cursor-pointer"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         {!isRegister && (
//                             <>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     value={form.username}
//                                     onChange={handleChange}
//                                     placeholder="Username"
//                                     className="w-full h-11 px-5 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                 />
//                                 <div className="relative">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         placeholder="Password"
//                                         className="w-full h-11 px-5 pr-12 rounded-xl bg-white/95 text-black outline-none focus:ring-2 focus:ring-yellow-500"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-4 top-3 text-gray-600"
//                                     >
//                                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>
//                             </>
//                         )}

//                         <button className="w-full py-4 mt-4 bg-gradient-to-b from-[#ffed4b] to-[#f7b500] text-black font-black rounded-xl uppercase tracking-widest text-sm">
//                             {isRegister ? "Sign Up" : "Sign In"}
//                         </button>

//                         {/* Toggle between Register/Login */}
//                         <p
//                             className="text-center text-sm mt-4 cursor-pointer text-black/80 hover:underline"
//                             onClick={() => setIsRegister(!isRegister)}
//                         >
//                             {isRegister
//                                 ? "Already have an account? Sign In"
//                                 : "Don't have an account? Register"}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Floor Reflection */}
//             <div
//                 className={`absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-500/10 to-transparent transition-opacity duration-1000 ${isOn ? "opacity-100" : "opacity-0"}`}
//             />
//         </div>
//     );
// };

// export default AuthUI;



//  imp code

// import React, { useState } from 'react';

// const LoginUI = () => {
//     const [isOn, setIsOn] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     return (
//         <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black font-sans">

//             {/* 1. Background Image (Cloth Shop) */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
//                 style={{
//                     backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop')`, // High quality Cloth Shop image
//                     filter: isOn ? 'brightness(0.8) contrast(1.1)' : 'brightness(0.15) contrast(1.2)'
//                 }}
//             >
//                 {/* Dark Overlay for the Night/Dim Feel */}
//                 <div className={`absolute inset-0 transition-colors duration-1000 ${isOn ? 'bg-black/20' : 'bg-black/80'}`}></div>
//             </div>

//             {/* 2. Lamp & Centered Dori (Bulb Unit) */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">

//                 {/* The Lamp Head (Box) - Positioned at the very top */}
//                 <div
//                     className="relative w-40 h-16 bg-[#2a2a2a] flex items-center justify-center shadow-2xl"
//                     style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
//                 >
//                     {!isOn && <span className="text-white text-[11px] font-bold tracking-[0.3em] mt-2">LOGIN</span>}
//                 </div>

//                 {/* The Bulb & Dori - Center Aligned */}
//                 {/* <div
//                     className="relative flex flex-col items-center -mt-1 cursor-pointer"
//                     onClick={() => setIsOn(!isOn)}
//                 >
//                     <div className={`w-6 h-6 rounded-full transition-all duration-500 shadow-2xl ${isOn ? 'bg-yellow-200 blur-[2px]' : 'bg-[#444]'}`}></div>

//                     <div className="w-[1.5px] h-24 bg-gray-500 shadow-lg"></div>

//                     <div className={`w-4 h-4 rounded-full border border-gray-600 transition-all  ${isOn ? 'bg-yellow-400' : 'bg-[#555]'}`}></div>
//                 </div> */}

//                 <div className="relative flex flex-col items-center -mt-1">
//                     {/* Small Yellow Bulb (Ha center la rahil) */}
//                     <div className={`w-6 h-6 rounded-full transition-all duration-500 shadow-2xl ${isOn ? 'bg-yellow-200 blur-[2px]' : 'bg-[#444]'}`}></div>

//                     {/* Side Pull String (Dori) - Fakt ya section la absolute kela ahe */}
//                     <div
//                         className="absolute top-1 left-[250%] flex flex-col items-center cursor-pointer group"
//                         onClick={() => setIsOn(!isOn)}
//                     >
//                         {/* Centered Pull String (Dori) */}
//                         <div className="w-[1.5px] h-20 bg-gray-500 group-hover:bg-yellow-400 transition-colors"></div>

//                         {/* Dori Ball */}
//                         <div className={`w-4 h-4 rounded-full border border-gray-600 transition-all ${isOn ? 'bg-yellow-400 scale-110 shadow-md' : 'bg-[#555]'}`}></div>
//                     </div>
//                 </div>


//                 {/* 3. The Sharp Beam (Light Effect) */}
//                 <div
//                     className={`pointer-events-none absolute -top-8 transition-opacity duration-700 ${isOn ? 'opacity-100' : 'opacity-0'}`}
//                     style={{
//                         width: '200vw',
//                         height: '200vh',
//                         // background: 'linear-gradient(to bottom, rgba(255, 255, 220, 0.4) 0%, rgba(255, 255, 220, 0.05) 40%, transparent 70%)',
//                         background: ` linear-gradient(to bottom,transparent 4%,transparent 4%,rgba(255,255,220,0.35) 20%,rgba(255,255,220,0.15) 45%,rgba(255,255,220,0.06) 65%,transparent 80%)`,

//                         clipPath: 'polygon(50% 0%, 10% 100%, 90% 100%)',
//                     }}
//                 ></div>
//             </div>

//             {/* 4. Login Form */}
//             <div className={`relative z-40 transition-all duration-1000 transform ${isOn ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
//                 <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-[380px]">
//                     <h2 className="text-3xl font-bold text-[#1a1a1a] mb-10 text-center tracking-tight">Welcome Back</h2>

//                     <div className="space-y-6">
//                         <div className="text-left">
//                             <label className="block text-sm font-bold text-[#1a1a1a] mb-2 ml-1">Username:</label>
//                             <input
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
//                                 placeholder="Enter username"
//                             />
//                         </div>

//                         <div className="text-left">
//                             <label className="block text-sm font-bold text-[#1a1a1a] mb-2 ml-1">Password:</label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
//                                 placeholder="••••••••"
//                             />
//                         </div>

//                         <button className="w-full py-4 mt-6 bg-gradient-to-b from-[#ffed4b] to-[#f7b500] hover:brightness-110 text-black font-black rounded-xl shadow-[0_4px_15px_rgba(247,181,0,0.4)] transition-all active:scale-95 uppercase tracking-widest text-sm">
//                             Sign In
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Floor Reflection */}
//             <div className={`absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-500/10 to-transparent transition-opacity duration-1000 ${isOn ? 'opacity-100' : 'opacity-0'}`}></div>
//         </div>
//     );
// };

// export default LoginUI;







import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginUI from "../compount/LoginUI";
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useUserLoginMutation } from "../../redux/api/auth.api";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [select, setselect] = useState()

    const [signin, { isLoading, isSuccess, isError, error }] = useUserLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: select ? select.email : "",
            password: select ? select.password : "",
        },
        validationSchema: yup.object({
            email: yup.string().required(),
            password: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            signin(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate("/")
            toast.success("User Login Successfully")
        }
    }, [isSuccess])


    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "user Login faild !")
        }
    }, [isError])
    return <>
        <LoginUI title="Login">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
                Welcome Back
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Username */}
                <div className="mb-5">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-2">
                        Email:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("email")}
                        placeholder="Email"
                        id="email"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>

                {/* Password */}
                <div className="mb-5 relative">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-2">
                        Password:
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...formik.getFieldProps("password")}
                        id="password"
                        placeholder="Password"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-11"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Sign In button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 font-bold rounded-xl transition-all ${isLoading
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                        }`}
                >
                    {isLoading ? "Signing Ip..." : "  Sign In"}
                </button>
                {/* Register link */}
                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold underline">
                        Register
                    </Link>
                </p>
            </form>
        </LoginUI>
    </>
};

export default Login;




// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom";
// import AuthLayout from "../compount/LoginUI";

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);

//     return (
//         <AuthLayout title="Login">
//             <h2 className="text-3xl font-bold text-black mb-8 text-center">
//                 Welcome Back
//             </h2>

//             <label className="block text-sm font-bold text-[#1a1a1a] mb-2 ml-1">Username:</label>

//             <input
//                 type="Username"
//                 placeholder="Username"
//                 // className="w-full h-11 px-5 rounded-xl mb-4"
//                 className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
//             />

//             <label className="block text-sm font-bold text-[#1a1a1a] mb-2 ml-1">Password:</label>
//             <div className="relative mb-4">
//                 <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     // className="w-full h-11 px-5 pr-12 rounded-xl"
//                     className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
//                 />
//                 <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-4"
//                 >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//             </div>

//             <button className="w-full py-4 bg-yellow-400 font-bold rounded-xl">
//                 Sign In
//             </button>

//             <p className="text-center mt-4 text-sm">
//                 Don't have an account?{" "}
//                 <Link to="/register" className="font-semibold underline">
//                     Register
//                 </Link>
//             </p>
//         </AuthLayout>
//     );
// };

// export default Login;
