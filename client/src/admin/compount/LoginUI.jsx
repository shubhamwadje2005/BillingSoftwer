import React, { useState } from "react";

const LoginUI = ({ title, children }) => {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black font-sans">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop')",
                    filter: isOn
                        ? "brightness(0.8) contrast(1.1)"
                        : "brightness(0.15) contrast(1.2)",
                }}
            >
                <div
                    className={`absolute inset-0 transition-colors duration-1000 ${isOn ? "bg-black/20" : "bg-black/80"
                        }`}
                />
            </div>

            {/* Lamp */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
                <div
                    className="relative w-40 h-16 bg-[#2a2a2a] flex items-center justify-center shadow-2xl"
                    style={{
                        clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
                    }}
                >
                    {!isOn && (
                        <span className="text-white text-[11px] font-bold tracking-[0.3em] mt-2">
                            {title.toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Bulb + Switch */}
                <div className="relative flex flex-col items-center -mt-1">
                    <div
                        className={`w-6 h-6 rounded-full transition-all duration-500 shadow-2xl ${isOn ? "bg-yellow-200 blur-[2px]" : "bg-[#444]"
                            }`}
                    />
                    <div
                        className="absolute top-1 left-[250%] flex flex-col items-center cursor-pointer"
                        onClick={() => setIsOn(!isOn)}
                    >
                        <div className="w-[1.5px] h-20 bg-gray-500" />
                        <div
                            className={`w-4 h-4 rounded-full border border-gray-600 ${isOn ? "bg-yellow-400" : "bg-[#555]"
                                }`}
                        />
                    </div>
                </div>

                {/* Light Beam */}
                <div
                    className={`pointer-events-none absolute -top-8 transition-opacity duration-700 ${isOn ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        width: "200vw",
                        height: "200vh",
                        background:
                            "linear-gradient(to bottom, transparent 4%, rgba(255,255,220,0.35) 20%, rgba(255,255,220,0.15) 45%, rgba(255,255,220,0.06) 65%, transparent 80%)",
                        clipPath: "polygon(50% 0%, 10% 100%, 90% 100%)",
                    }}
                />
            </div>

            {/* Form Container */}
            <div
                className={`relative z-40 transition-all duration-1000 ${isOn ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] w-[380px]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LoginUI;
