import { getItem } from "../api/itemApi";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Footer from "./Footer";
export default function DetailsList() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemList] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    setItemList([]);
    let total = 0;
    location.state.data.items.forEach(async (element) => {
      let res = await getItem(element.id);
      res["count"] = element.count;
      total += element.count * res.data[0].price;
      setTotalAmt(total);
      setItemList((prev) => [...prev, res]);
    });
  }, [loading]);
  return (
    <>
      <Navbar></Navbar>
      {loading && (
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
                  Order Id
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {location.state.data._id}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Time
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {location.state.data.timestamp}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {location.state.data.email}
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
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsList.map((item, index) => (
                          <>
                            <tr className="bg-white border-b">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                              >
                                {itemsList[index].data[0].name}
                              </th>
                              <td className="px-6 py-4">
                                {itemsList[index].count}
                              </td>
                              <td className="px-6 py-4">
                                {" "}
                                {itemsList[index].data[0].price}
                              </td>
                              <td className="px-6 py-4">
                                {" "}
                                {itemsList[index].data[0].price *
                                  itemsList[index].count}
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  Total Amount
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Rs. {totalAmt}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      <div className="h-40 md:h-28">
        <Footer></Footer>
      </div>
    </>
  );
}
