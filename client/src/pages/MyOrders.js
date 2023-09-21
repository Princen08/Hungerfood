import Navbar from "../components/Navbar";
import { getOrderAPI } from "../api/orderApi";
import { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";
export default function MyOrders() {
    const [loading, setLoading] = useState(true);
  const getOrders = async () => {
    const res = await getOrderAPI();
    setLoading(false)
    console.log(res);
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Navbar current={"My Orders"}></Navbar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="#4287f5" />
        </div>
      )}
    </>
  );
}
