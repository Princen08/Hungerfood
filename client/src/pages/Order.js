import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SyncLoader from "react-spinners/SyncLoader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderByIdAPI } from "../api/orderApi";
export default function Order() {

  const location = useLocation();
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [QRData, setQRData] = useState();

  useEffect(() => {
    const getOrderData = async () => {
      const res = await getOrderByIdAPI(param.id);
      setQRData(res.data[0]);
    }
    getOrderData();
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="black" />
        </div>
      )}
      {!loading && (
        <div
          style={{
            fontFamily: "Inter",
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
            value={JSON.stringify(QRData)}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </>
  );
}
