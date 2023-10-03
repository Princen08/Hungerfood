import React, {useMemo, useState } from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth.js";
import Home from "./pages/Home.js";
import Verify from "./pages/Verify.js";
import Cart from "./pages/Cart.js";
import QRCodeScanner from "./pages/QRCodeScanner.js";
import Order from "./pages/Order.js";
import Payment from "./pages/Payment.js";
import MyOrders from "./pages/MyOrders.js";
import DetailsList from "./components/DetailsList.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import Error from "./components/Error.js";

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useMemo(() => {
    const checkUser = () => {
      const userToken = localStorage.getItem("token");
      if (!userToken || userToken === "undefined") {
        setIsLoggedIn(false);
      } else {
        navigate("/home");
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, [isLoggedIn]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute>
              <QRCodeScanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <DetailsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
