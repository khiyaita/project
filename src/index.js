import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./component/contact";
import Account from "./component/Account/account";
import Cart from "./component/Cart/cart";
import ProductDetails from "./component/Product/ProductDetails";
import About from "./component/About/about";
import Err from "./component/err";
import SignUp from "./component/singUp";
import LogIn from "./component/logIn";
import Home from "./component/Home/home";
import CheckOut from "./component/checkOut";
import Wishlist from "./component/Wishlist/wishlist";
import Products from "./component/Product/products";
import Admin from "./Admin/admin";

import UsersShow from "./Admin/Users/UsersShow";
import UsersCreate from "./Admin/Users/UsersCreate";
import UsersList from "./Admin/Users/UsersList";
import UsersUpdate from "./Admin/Users/UsersUpdate";

import ProductsShow from "./Admin/Products/ProductsShow";
import ProductsCreate from "./Admin/Products/ProductsCreate";
import ProductsList from "./Admin/Products/ProductsList";
import ProductsUpdate from "./Admin/Products/ProductsUpdate";

import Orders from "./Admin/Orders/Orders";
import CreateOrder from "./Admin/Orders/CreateOrder";
import ShowOrder from "./Admin/Orders/ShowOrder";
import UpdateOrder from "./Admin/Orders/UpdateOrder";
import Profile from "./Admin/profile";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        >
          <Route index element={<Home />} />
          <Route path="*" element={<Err />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Account />} />
          <Route path="productDetails/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout/:id?" element={<CheckOut />} />
          <Route path="products/:category" element={<Products />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="account" element={<Profile />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/create" element={<UsersCreate />} />
          <Route path="users/show/:id" element={<UsersShow />} />
          <Route path="users/update/:id" element={<UsersUpdate />} />

          <Route path="products" element={<ProductsList />} />
          <Route path="products/create" element={<ProductsCreate />} />
          <Route path="products/show/:id" element={<ProductsShow />} />
          <Route path="products/update/:id" element={<ProductsUpdate />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<CreateOrder />} />
          <Route path="orders/show/:id" element={<ShowOrder />} />
          <Route path="orders/update/:id" element={<UpdateOrder />} />
          
          <Route path="*" element={<Err />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
