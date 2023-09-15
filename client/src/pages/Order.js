import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import BeatLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";

export default function Order() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <BeatLoader size={70} loading={loading} color="blue" />
        </div>
      )}
      {!loading && (
        <div
          style={{
            fontFamily: "DM Sans",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "6rem",
          }}
        >
          <h2 className="font-bold">
            Your QR Code for Order ID: {location.state.key}
          </h2>
          <QRCode
            style={{ height: "30rem", maxWidth: "60%", width: "60%" }}
            value={JSON.stringify(location.state.data)}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </>
  );
}
