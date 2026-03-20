import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Menu, X, Users, Wallet,
    CalendarPlus, Calendar, FileText, IndianRupee,
    LayoutDashboard,
    Receipt,
    Trash2,
    PackagePlus,
    PackageSearch,
    PackageX,
    UserCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUserLogoutMutation } from "../../redux/api/auth.api";

const SecretaryDashboard = () => {

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [UserLogout, { isSuccess }] = useUserLogoutMutation()

    const [open, setOpen] = useState(true);

    const location = useLocation();

    // const menuItems = [
    //     { label: "Dashbord", path: "/home", icon: LayoutDashboard },
    //     { label: "Add Bill", path: "/addbill", icon: BookUser },
    //     { label: "Bill Data", path: "/getallbill", icon: Database },
    //     { label: "Delete Bill", path: "/issoftdeletebill", icon: DatabaseBackup },
    //     // { label: "Create Maintenance", path: "/secretary/maintenance/create", icon: FileText },
    //     { label: "Add Product", path: "/addproduct", icon: Wallet },
    //     { label: "Product Data", path: "/getproduct", icon: IndianRupee },
    //     // { label: "Add Event", path: "/secretary/events/create", icon: CalendarPlus },
    //     { label: "Delete Product", path: "/issoftdeleteproduct", icon: Calendar },
    //     { label: "Profile", path: "/Adminprofile", icon: UserRound },
    // ];
    const menuItems = [
        { label: "Dashbord", path: "/home", icon: LayoutDashboard },

        { label: "Add Bill", path: "/addbill", icon: Receipt },

        { label: "Bill Data", path: "/getallbill", icon: FileText },

        { label: "Delete Bill", path: "/issoftdeletebill", icon: Trash2 },

        { label: "Add Product", path: "/addproduct", icon: PackagePlus },

        { label: "Product Data", path: "/getproduct", icon: PackageSearch },

        { label: "Delete Product", path: "/issoftdeleteproduct", icon: PackageX },

        { label: "Profile", path: "/adminprofile", icon: UserCircle },
    ];
    const getPageTitle = () => {
        const current = menuItems.find(item => location.pathname.startsWith(item.path));
        return current ? current.label : "Dashboard";
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Logout Sucessfully")
            navigate('/login')
        }
    }, [isSuccess])

    // useEffect(() => {
    //     if (location.pathname === "/login") {

    //         const timer = setTimeout(() => {
    //             navigate("/secretary/residents/register");
    //         }, 300);

    //         return () => clearTimeout(timer);
    //     }
    // }, [location.pathname]);



    return (
        <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">

            {/* Mobile Overlay */}
            {open && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity" 
                    onClick={() => setOpen(false)} 
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-slate-900 text-white z-40
                    transition-all duration-300 flex flex-col
                    ${open ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"}
                `}
            >
                <div className={`flex items-center justify-center lg:justify-start gap-3 p-4 border-b border-slate-700 ${!open && "lg:justify-center"}`}>
                    <img
                        src={user?.result?.shopImages || "/default-user.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-white flex-shrink-0"
                    />
                    <div className={`overflow-hidden transition-all duration-300 ${open ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                        <h1 className="text-lg font-semibold whitespace-nowrap">
                            {user?.result?.branchName || "No Name"}
                        </h1>
                    </div>
                </div>

                <nav className="px-2 my-5 space-y-2 overflow-y-auto scrollbar-hide flex-1">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;

                        return (
                            <Link
                                key={i}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setOpen(false)}
                                className={`
                                    group flex items-center gap-4 px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    ${active
                                        ? "bg-amber-500 text-slate-900 shadow-md"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }
                                    ${!open && "lg:justify-center"}
                                `}
                                title={item.label}
                            >
                                <Icon size={22} className="min-w-[22px]" />
                                <span className={`whitespace-nowrap transition-all duration-300 ${open ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden lg:hidden"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main
                className={`
                    flex-1 flex flex-col min-h-screen min-w-0
                    transition-all duration-300
                    ${open ? "lg:ml-64" : "lg:ml-20"}
                `}
            >
                {/* Header */}
                <header className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <div className="block cursor-pointer">
                            {open ? (
                                <X size={28} onClick={() => setOpen(false)} />
                            ) : (
                                <Menu size={28} onClick={() => setOpen(true)} />
                            )}
                        </div>

                        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
                            {getPageTitle()}
                        </h2>
                    </div>

                    <button
                        onClick={() => UserLogout()}
                        className="border-2 border-red-500 text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md
                                 hover:bg-red-600 hover:text-white transition font-semibold text-sm sm:text-base mx-2"
                    >
                        Logout
                    </button>
                </header>

                {/* Page Content */}
                <div className="p-2 sm:p-6 flex-1 w-full max-w-full overflow-x-hidden">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default SecretaryDashboard;

