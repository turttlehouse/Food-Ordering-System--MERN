import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  // MdLock,
} from "react-icons/md";
import Orders from "views/admin/orders";
import Products from "views/admin/products";
import Users from "views/admin/users";
import SingleOrder from "views/admin/orders/SingleOrder";
import SingleProduct from "views/admin/products/SingleProduct";
import AddProduct from "views/admin/products/AddProduct";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products",
    component: <Products />,
  },
  {
    name: "Add Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products/add",
    component: <AddProduct />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Users />,
  },
  {
    // name: "Orders",
    layout: "/admin",
    path: "orders/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <SingleOrder />,
    secondary: true,
  },
  {
    // name: "Products",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "products/:id",
    component: <SingleProduct />,
  },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },

];
export default routes;
