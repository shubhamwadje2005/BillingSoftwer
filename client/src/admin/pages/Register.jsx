import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginUI from "../compount/LoginUI";
import { useUserRegisterMutation } from "../../redux/api/auth.api";
import { useFormik } from "formik";
import * as yup from 'yup'
import { toast } from "react-toastify";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [select, setSelect] = useState()
    const navigate = useNavigate()
    const [signup, { isLoading, isSuccess, isError, error }] = useUserRegisterMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            branchName: select ? select.branchName : "",
            name: select ? select.name : "",
            address: select ? select.address : "",
            email: select ? select.email : "",
            mobile: select ? select.mobile : "",
            shopImages: select ? select.shopImages : "",
        },
        validationSchema: yup.object({
            branchName: yup.string().required(),
            name: yup.string().required(),
            address: yup.string().required(),
            email: yup.string().required(),
            mobile: yup.string().required(),
            shopImages: yup
                .mixed()
                .required("Shop image is required"),

        }),
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData()

            formData.append("branchName", values.branchName)
            formData.append("name", values.name)
            formData.append("address", values.address)
            formData.append("email", values.email)
            formData.append("mobile", values.mobile)
            formData.append("shopImages", values.shopImages)

            signup(formData)
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
            toast.success("User Register Success")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "User Register Faild !")
        }
    }, [isError])

    return (
        <LoginUI title="Register">
            <h2 className="text-3xl font-bold text-black mb-3 text-center">
                Create Account
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {/* <input className="w-full h-11 px-5 mb-3 rounded-xl" placeholder="Branch Name" />
            <input className="w-full h-11 px-5 mb-3 rounded-xl" placeholder="Owner Name" />
            <input className="w-full h-11 px-5 mb-3 rounded-xl" placeholder="Email" />
            <input className="w-full h-11 px-5 mb-3 rounded-xl" placeholder="Mobile" />
            <input className="w-full h-11 px-5 mb-3 rounded-xl" placeholder="Username" /> */}
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Branch Name:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("branchName")}
                        placeholder="Branch Name"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Owner Name:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("name")}
                        placeholder="Owner Name"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Email:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("email")}
                        placeholder="Email"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Mobile:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("mobile")}
                        placeholder="Mobile"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Address:
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("address")}
                        placeholder="Address"
                        className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                        Shop Image:
                    </label>
                    <div className="w-full h-12 rounded-xl bg-white/95 shadow-inner flex items-center justify-center border-none cursor-pointer relative focus-within:ring-2 focus-within:ring-yellow-500">
                        <input
                            type="file"
                            onChange={(e) =>
                                formik.setFieldValue(
                                    "shopImages",
                                    e.currentTarget.files[0]
                                )
                            }
                            name="shopImages"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <span className="text-black text-sm select-none">Choose Image</span>
                    </div>


                </div>

                {/* <div className="relative mb-3">
                <label className="block text-sm font-bold text-[#1a1a1a] mb-1">
                    Password:
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 px-5 rounded-xl bg-white/95 shadow-inner outline-none focus:ring-2 focus:ring-yellow-500 transition-all border-none text-black"
                />
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div> */}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 font-bold rounded-xl transition-all ${isLoading
                        ? "bg-yellow-300 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-500"
                        }`}
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="text-center mt-4 text-sm  -mb-4">
                    Already have an account?{" "}
                    <Link to="/" className="font-semibold underline">
                        Login
                    </Link>
                </p>
            </form>
        </LoginUI>
    );
};

export default Register;
