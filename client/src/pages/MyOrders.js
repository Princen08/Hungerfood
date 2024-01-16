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
    console.log(res.data.data)
    setLoading(false);
    setOrderList(res.data.data);
  };

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

  useEffect(() => {
    getOrders();
  }, []);
  
  return (
    <>
      <Navbar current={"My orders"}></Navbar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="black" />
        </div>
      )}
      {!loading && (
        <div className="mt-20" style={{ fontFamily: "Inter", zIndex: 10 }}>
          {ordersList &&
            ordersList.map((order, index) => (
              <div key={index} className="justify-between mb-2 mx-12 rounded-2xl bg-gray-100 p-6 shadow-md sm:flex sm:justify-start">
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900 break-words">
                      Order ID: {order._id}
                    </h2>
                    <h2 className="text-md mt-2 text-gray-900 break-words">
                      Ordered At: {order.purchaseAt}
                    </h2>
                    <div className="mt-4"> 
                      {order.collected ? <span class="bg-green-100 w-text-green-800 text-xs font-medium me-2 px-2.5 py-2 rounded-full dark:bg-green-900 dark:text-green-300">Collected</span>: <span  className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-2 rounded-full dark:bg-red-500 dark:text-white">Not Collected</span>}
                    </div>
                  </div>
                  <div className="mt-4 flex  sm:space-y-2 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex md:flex-col items-center gap-4 mt-3">
                      {!order.collected && (<button
                        className="bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded-3xl"
                        style={{
                          fontFamily: "Inter",
                          position: "inherit",
                        }}
                        onClick={() => showQRCode(order)}
                      >
                        QR Code
                      </button> )}
                      <button
                        className="bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded-3xl"
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
      <div className="h-40 mt-96 md:h-28 md:mt-88">
            <Footer></Footer>
      </div>
    </>
  );
}
