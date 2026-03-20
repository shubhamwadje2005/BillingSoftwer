// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { withLazy } from './admin/compount/withLazy'
// import "react-toastify/ReactToastify.css"
// import { ToastContainer } from "react-toastify"

// const Navbar = withLazy(() => import("./admin/compount/Navbar"))
// const AddBill = withLazy(() => import("./admin/pages/AddBill"))
// const AddProduct = withLazy(() => import("./admin/pages/AddProduct"))
// const GetAllBill = withLazy(() => import("./admin/pages/GetAllBill"))
// const GetProduct = withLazy(() => import("./admin/pages/GetProduct"))
// const IsSoftDeleteBill = withLazy(() => import("./admin/pages/IsSoftDeleteBill"))
// const IsSoftDeleteProduct = withLazy(() => import("./admin/pages/IsSoftDeleteProduct"))
// const AdminProfile = withLazy(() => import("./admin/pages/AdminProfile"))
// const Home = withLazy(() => import("./admin/pages/Home"))
// const Register = withLazy(() => import('./admin/pages/Register'))
// const Login = withLazy(() => import('./admin/pages/Login'))

// const App = () => {

//   const USER_ROUTE = [
//     { path: "/login", element: <Login /> },
//     { path: "/register", element: <Register /> },
//     { path: "home", element: <Home /> },
//     { path: "/addbill", element: <AddBill /> },
//     { path: "/getallbill", element: <GetAllBill /> },
//     { path: "/issoftdeletebill", element: <IsSoftDeleteBill /> },
//     { path: "/addproduct", element: <AddProduct /> },
//     { path: "/getproduct", element: <GetProduct /> },
//     { path: "/issoftdeleteproduct", element: <IsSoftDeleteProduct /> },
//     { path: "/Adminprofile", element: <AdminProfile /> },
//   ]

//   return <>
//     <ToastContainer />
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Navbar />} />
//         {USER_ROUTE.map((item, index) => (
//           <Route key={index} path={item.path} element={item.element} />
//         ))}

//         <Route path='*' element={<h1>Page Not Found</h1>} />
//       </Routes>
//     </BrowserRouter>
//   </>
// }

// export default App




import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withLazy } from "./admin/compount/withLazy";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import UserProtected from "./admin/compount/UserProtected";
import View from "./admin/pages/Viewbill";

const Navbar = withLazy(() => import("./admin/compount/Navbar"));
const AddBill = withLazy(() => import("./admin/pages/AddBill"));
const AddProduct = withLazy(() => import("./admin/pages/AddProduct"));
const GetAllBill = withLazy(() => import("./admin/pages/GetAllBill"));
const GetProduct = withLazy(() => import("./admin/pages/GetProduct"));
const IsSoftDeleteBill = withLazy(() => import("./admin/pages/IsSoftDeleteBill"));
const IsSoftDeleteProduct = withLazy(() => import("./admin/pages/IsSoftDeleteProduct"));
const AdminProfile = withLazy(() => import("./admin/pages/AdminProfile"));
const Home = withLazy(() => import("./admin/pages/Home"));
const Register = withLazy(() => import("./admin/pages/Register"));
const Login = withLazy(() => import("./admin/pages/Login"));

const App = () => {
  const USER_ROUTE = [
    { path: "home", element: <Home /> },
    { path: "addbill", element: <AddBill /> },
    { path: "bill/view/:id", element: <View /> },
    { path: "getallbill", element: <GetAllBill /> },
    { path: "issoftdeletebill", element: <IsSoftDeleteBill /> },
    { path: "addproduct", element: <AddProduct /> },
    { path: "getproduct", element: <GetProduct /> },
    { path: "issoftdeleteproduct", element: <IsSoftDeleteProduct /> },
    { path: "adminprofile", element: <AdminProfile /> },
  ];

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<UserProtected><Navbar /></UserProtected>}>
            <Route index element={<Home />} />

            {USER_ROUTE.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={item.element}
              />
            ))}
          </Route>

          <Route path="*" element={<h1>Page Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
