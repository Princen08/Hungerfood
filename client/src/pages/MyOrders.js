import Navbar from "../components/Navbar";
import { getOrderAPI } from "../api/orderApi";
import { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [ordersList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const getOrders = async () => {
    const res = await getOrderAPI();
    setLoading(false);
    setOrderList(res.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const showQRCode = (orderDeatils) => {
    navigate(`/order/${orderDeatils._id}`, {
      state: { data: orderDeatils, key: orderDeatils._id },
    });
  };
  const showDetails = (orderDeatils) => {
    navigate(`/details/${orderDeatils._id}`, {
      state: { data: orderDeatils, key: orderDeatils._id },
    });
  };
  return (
    <>
      <Navbar current={"My Orders"}></Navbar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="#4287f5" />
        </div>
      )}
      {!loading && (
        <div className="mt-20" style={{ fontFamily: "Inter", zIndex:10}}>
          {ordersList &&
            ordersList.map((order, index) => (
              <div className="justify-between mb-2 mx-12 rounded-lg bg-gray-100 p-6 shadow-md sm:flex sm:justify-start">
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900 break-words">
                      Order Id: {order._id}
                    </h2>
                    <p className="mt-1 text-l text-gray-700">
                      Time: {order.timestamp.replaceAll("/", "-")}
                    </p>
                  </div>
                  <div className="mt-4 flex  sm:space-y-2 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-3xl"
                        style={{
                          fontFamily: "Inter",
                          position: "inherit",
                        }}
                        onClick={() => showQRCode(order)}
                      >
                        QR Code
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-3xl"
                        style={{
                          fontFamily: "Inter",
                          position: "inherit",
                        }}
                        onClick={() => showDetails(order)}
                      >
                        Details
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm ml-2">
                        {/* Rs. {item.price * qty.get(item.id)} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              // <div className="mt-2  rounded-lg bg-gray-100 p-6 shadow-md">
              //   <div className="flex justify-between ">
              //     <div>
              //       <h2 className="font-bold">Order Id: {order._id}</h2>
              //       <h2 className="font-bold">Time: {order.timestamp}</h2>
              //     </div>
              //     <div className="flex gap-4">

              //     </div>
              //   </div>
              // </div>
            ))}
        </div>
      )}
      <div className="h-40 md:h-28">
        <Footer></Footer>
      </div>
    </>
  );
}
