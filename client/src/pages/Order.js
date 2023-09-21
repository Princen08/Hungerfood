import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SyncLoader from "react-spinners/SyncLoader";
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
          <SyncLoader loading={loading} color="#4287f5" />
        </div>
      )}
      {!loading && (
        <div
          style={{
            fontFamily: "DM Sans",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "6rem",
          }}
        >
          <h2 className="font-bold ml-24 sm:ml-0">
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
