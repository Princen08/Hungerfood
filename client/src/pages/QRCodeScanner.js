import React, { useEffect, useRef, useState } from "react";
import QrReader from "modern-react-qr-reader";
import { getItem } from "../api/itemApi";
import { updateOrderAPI } from "../api/orderApi";

export default function QRCodeScanner() {
  const [data, setData] = useState([]);
  const [showQRCode, setShowQRCode] = useState(true);
  const [orderData, setOrderData] = useState();
  const videoRef = useRef(null);
  const [itemList, setItemList] = useState([]);
  

  useEffect(() => {
    // Function to request camera access
    async function getCameraAccess() {
    try{  
      const constraints = {
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.srcObject = stream;
        })
        .catch(console.error);
    } catch{
      console.log("Error while getting camera permission")
    }
  } 
    getCameraAccess();
  }, []);
  
  const handleScan = async (data) => {
    setItemList([]);
    setData(data);
    const order = JSON.parse(data);
    let mainData = {};
    mainData.email = order?.email;
    mainData.timestamp = order?.timestamp;
    mainData._id = order?._id;

    order?.items.forEach(async (element) => {
      let res = await getItem(element.id);
      res["count"] = element.count;
      setItemList((item) => [...item, {"count": res.count, "name": res?.data[0]?.name}]);
    });
    setOrderData(order);

    if (data) {
      setShowQRCode(false);
    }
  };

  const handleCollect = async () => {
    setShowQRCode(true);
    await updateOrderAPI(orderData?._id, orderData?.email)
  }
  return (
    <>
      <div>
        {showQRCode && (
          <QrReader
            delay={300}
            facingMode={"environment"}
            onScan={handleScan}
            style={{ width: "100%" }}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
          />
        )}
       {!showQRCode && (
        <div
          className="px-20 py-20 text-gray-700"
          style={{ fontFamily: "Inter", color: "black" }}
        >
          <div className="px-4 sm:px-0">
            <h3 className="text-2xl font-bold leading-7 text-gray-900">
              Order Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  Order ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {orderData?._id}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Time
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {orderData?.timestamp}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {orderData?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Items
                </dt>
                <dd className="flex mt-1 text-sm gap-20 leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700  bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemList && itemList.map((item, index) => (
                          <>
                            <tr className="bg-white border-b">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                              >
                                {item?.name}
                              </th>
                              <td className="px-6 py-4">
                                {item?.count}
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-3xl"
                    style={{
                      fontFamily: "Inter",
                      position: "inherit",
                    }}
                    onClick={handleCollect}
                  >
                    Done
                  </button>
        </div>
      )}
      </div>
    </>
  );
}
