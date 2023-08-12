import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.js"
import Home from "./pages/Home.js"

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}