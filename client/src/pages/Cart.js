import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import {
  getItem,
  getUserCartItemsAPI,
  removeItemAPI,
  updateItemAPI,
} from "../api/itemApi";
import { addOrderAPI } from "../api/orderApi";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar.js";
import IcTwotoneShoppingCartCheckout from "../assets/IcTwotoneShoppingCartCheckout.js";


const qty = new Map();

export default function Cart() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  
  const increment = async (event) => {
    const itemId = event.currentTarget.id;
    try {
      const itemData = selectedItem.findIndex((item => item._id === itemId));
      const prevCount = selectedItem[itemData].count;
      selectedItem[itemData].count = prevCount + 1;
      await updateItemAPI(itemId, 1);
    } catch {
      console.log("Error while updating item.");
    }
    getOrder();
  };

  const decrement = async (event) => {
    const itemId = event.currentTarget.id;
    try {
      const itemData = selectedItem.findIndex((item => item._id === itemId));
      const prevCount = selectedItem[itemData].count;
      if (prevCount > 1) {
        selectedItem[itemData].count = prevCount - 1;
        await updateItemAPI(itemId, -1);
      }
    } catch {
      console.log("Error while updating item.");
    }
    getOrder();
  };

  const handleRemove = async (event) => {
    const itemId = event.currentTarget.id;
    try {
      await removeItemAPI(itemId);
      setSelectedItem((current) =>
        current.filter((order) => order._id !== itemId)
      );
      toast.success("Item removed successfully.");
    } catch {
      console.log("Error while removing item");
    }
  };

  const handleCheckOut = async () => {
    const data = [];
    selectedItem.forEach((item) => {
      data.push({
        id: item._id,
        count: qty.get(item._id),
      });
    });
    try {
      const res = await addOrderAPI(data);
      navigate(`/payment/${res.data.data}`, {
        state: { data: data, key: res.data.data, amount: totalAmt },
      });
    } catch {
      console.log("Error while adding order details.");
    }
  };

  const getOrder = async () => {
    try {
      const res = await getUserCartItemsAPI();
      if (res.data.success) {
        const tempData = [];
        for(var i = 0; i < res.data.data.length; i++) {
          qty.set(res.data.data[i].item, res.data.data[i].count);
          const itemData = await getItem(res.data.data[i].item);
          itemData.data.data["count"] = res.data.data[i].count;
          tempData.push(itemData.data.data);
        }
        setSelectedItem(tempData)
      }
      setLoading(false);
    } catch {
      console.log("Error while fetching data.");
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    console.log(selectedItem);
    var curr = 0;
    for(var i = 0; i < selectedItem.length; i++) {
      curr += qty.get(selectedItem[i]._id) * selectedItem[i].price;
    }
    setTotalAmt(curr);
  }, [selectedItem]);

  return (
    <>
      <NavBar count = {selectedItem.length}></NavBar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="black" />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      {!loading && (
        <div style={{ fontFamily: "Inter" }}>
          <h1 className="mb-10 text-center text-2xl font-bold mt-8">
            Cart Items
          </h1>
          {selectedItem.length === 0 && (
            <h1 className="mb-10 text-center text-2xl font-bold mt-8">
              Cart is empty!
            </h1>
          )}
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg mb-32 md:w-2/3 ">
              {selectedItem &&
                selectedItem.map((item, index) => (
                  <div key={index} className="justify-between mb-6 rounded-lg  p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item?.src}
                      alt="product"
                      className="w-full border-1 border-black rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-l text-gray-700">
                          Rs. {item.price}
                        </p>
                        <p className="mt-1 text-l text-gray-700">
                          Category - {item.category}
                        </p>
                      </div>
                      <div className="mt-4 flex  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center">
                          <div style={{ scale: 0.8 }}>
                            <label htmlFor="uantity" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <div className="flex items-center rounded">
                              <button
                                id={item._id}
                                onClick={decrement}
                                type="button"
                                className="w-10 h-10 bg-red-500 leading-10 text-white rounded transition hover:opacity-75"
                              >
                                &minus;
                              </button>

                              <input
                                readOnly = {true}
                                type="number"
                                id="Quantity"
                                value={item.count}
                                className="h-10 w-12 border-2 border-slate-200 rounded text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                              />

                              <button
                                onClick={increment}
                                type="button"
                                id={item._id}
                                className="w-10 h-10 leading-10 bg-green-500 text-white rounded transition hover:opacity-75"
                              >
                                <span>&#43;</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm ml-2">
                            Rs. {item.price * item.count}
                          </p>
                          <svg
                            id={item._id}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={handleRemove}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {selectedItem.length > 0 && (
              <div className="mt-6 h-full rounded-lg border bg-white p-6 mb-56 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">Rs. {totalAmt}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className>
                    <p className="mb-1 text-lg font-bold">Rs. {totalAmt}</p>
                    <p className="text-sm text-gray-700">including GST</p>
                  </div>
                </div>
                <button
                  className="mt-4 flex justify-center w-full rounded-3xl bg-orange-600 py-2 font-medium text-blue-50 hover:bg-orange-400"
                  onClick={handleCheckOut}
                >
                  <span>Check out</span>
                  <IcTwotoneShoppingCartCheckout/>
                </button>
              </div>
            )}
          </div>
          <div className="h-40 mt-96 md:h-28 md:mt-64">
            <Footer></Footer>
          </div>
        </div>
      )}
    </>
  );
}
