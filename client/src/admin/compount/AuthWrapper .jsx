import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthLayout from "./LoginUI";

const AuthWrapper = () => {
    const [isOn, setIsOn] = useState(false);
    const location = useLocation();

    // 🔥 ROUTE वरून TITLE ठरवतो
    const title =
        location.pathname === "/register" ? "Register" : "Login";

    return (
        <AuthLayout title={title} isOn={isOn} setIsOn={setIsOn}>
            <Outlet />
        </AuthLayout>
    );
};

export default AuthWrapper;
