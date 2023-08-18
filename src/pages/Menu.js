import React, { useEffect, useState } from "react";
import "../App.css"
import NavBar from "../components/Navbar.js";
import Footer from "../components/Footer";
import BeatLoader from "react-spinners/ClipLoader";

export default function Menu() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, [])
  return (
    <>
      <NavBar count={10}></NavBar>
      {loading && (<div className="flex items-center justify-center h-screen">
        <BeatLoader size={70} loading={loading} color="blue" />
      </div>)}
      {!loading && (<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 m-10">
        {/* <Card></Card> */}
      </div>)}

      <Footer></Footer>

    </>
  );
}