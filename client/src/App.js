import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.js";
import Home from "./pages/Home.js";
import Verify from "./pages/Verify.js";
import Cart from "./pages/Cart.js";
import QRCodeScanner from "./pages/QRCodeScanner.js";
import Order from "./pages/Order.js";
import Payment from "./pages/Payment.js";
import MyOrders
 from "./pages/MyOrders.js";
import DetailsList from "./components/DetailsList.js";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/qrcode" element={<QRCodeScanner />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/details/:id" element={<DetailsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
