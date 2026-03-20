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
        <div className="flex min-h-screen bg-gray-100">

            <aside
                className={`
    fixed top-0 left-0 h-screen bg-slate-900 text-white z-40
    transition-all duration-300
    sm:w-20
    ${open ? "lg:w-64" : "lg:w-20"}
    hidden sm:flex flex-col
  `}
            >
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

                <div className="flex items-center justify-center lg:justify-start gap-3 p-4 border-b border-slate-700">


                    <img
                        src={user?.result?.shopImages || "/default-user.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-white"
                    />

                    {open && (
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold">
                                {/* {user?.result?.name || "No Name"} */}
                                {user?.result?.branchName || "No Name"}
                            </h1>
                        </div>
                    )}
                </div>

                <nav className="px-2 my-5 space-y-2 overflow-y-auto scrollbar-hide flex-1">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;

                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`
    group flex items-center gap-4 px-4 py-3 rounded-xl
    transition-all duration-200
    ${active
                                        ? "bg-amber-500 text-slate-900 shadow-md"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }
    justify-center lg:justify-start
  `}
                            >

                                <Icon size={22} />
                                {open && <span className="hidden lg:inline">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

            </aside>

            <main
                className={`
                    flex-1 transition-all duration-300
                    sm:ml-20              /* Tablet margin */
                    ${open ? "lg:ml-64" : "lg:ml-20"}   /* Laptop margin */
                `}
            >
                <header className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">


                    {/* LEFT SIDE — Toggle + Title */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block">
                            {open ? (
                                <X size={28} className="cursor-pointer" onClick={() => setOpen(false)} />
                            ) : (
                                <Menu size={28} className="cursor-pointer" onClick={() => setOpen(true)} />
                            )}
                        </div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            {getPageTitle()}
                        </h2>

                    </div>

                    <button
                        onClick={() => UserLogout()}
                        className="border-2 border-red-500 text-slate-900 px-4 py-2 rounded-md
             hover:bg-red-700 transition font-semibold"
                    >
                        Logout
                    </button>


                </header>

                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default SecretaryDashboard;

