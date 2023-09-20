import React, { useEffect, useState, useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import BeatLoader from "react-spinners/ClipLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FloatingButton from "../components/FloatingButton";
import "../App.css";
import {
  addItemAPI,
  getItemsMenuAPI,
  getUserCartItemsAPI,
  removeItemAPI,
} from "../api/itemApi";
import Background from "../components/Background";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

let currOrder = [];
const isImageLoaded = new Map();
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [searchResultList, setSearchResultList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState([]);
  const mainSection = useRef(null);
  async function getOrder() {
    currOrder = [];
    try {
      const res = await getUserCartItemsAPI();
      res?.data.forEach((element) => {
        if (!currOrder.includes(element.id)) currOrder.push(element.id);
      });
    } catch {
      console.log("Error while fetching data.");
    }
    setSelectedItem(currOrder);
  }

  async function getMenu() {
    try {
      const res = await getItemsMenuAPI();
      setItemList(res.data);
      setSearchResultList(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error while fetching data.");
    }
  }

  const handleClick = async (event) => {
    // add item
    let curr = parseInt(event.currentTarget.id);
    if (event.currentTarget.innerText === "Add to cart") {
      if (!currOrder.includes(curr)) {
        currOrder.push(curr);
        setSelectedItem([...selectedItem, curr]);
      }
      event.currentTarget.innerText = "Remove";
      event.currentTarget.style.backgroundColor = "#f21b1b";
      try {
        const res = await getItemsMenuAPI();
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].id === curr) {
            try {
              await addItemAPI(
                curr,
                res.data[i].name,
                res.data[i].price,
                res.data[i].category,
                res.data[i].src
              );
            } catch {
              console.log("Error while adding item.");
            }
            break;
          }
        }
      } catch (err) {
        console.log("Error while fetching data.");
      }
    } else {
      // remove item
      event.currentTarget.innerText = "Add to cart";
      event.currentTarget.style.backgroundColor = "#2472f0";
      setSelectedItem((current) => current.filter((order) => order !== curr));
      try {
        await removeItemAPI(curr);
      } catch {
        console.log("Error while removing item.");
      }
      let index = currOrder.indexOf(curr); // Find the index of the element
      if (index !== -1) {
        currOrder.splice(index, 1); // Remove the element at the found index
      }
    }
  };
  useEffect(() => {
    // setTimeout(() => setLoading(false), 1500);
    getOrder();
  }, []);

  useEffect(() => {
    getMenu();
    console.log(localStorage.getItem("currUser"));
  }, []);

  const handleOnSearch = (string, results) => {
    if (results.length === 0) {
      setSearchResultList(itemList);
    } else {
      setSearchResultList(results);
    }
  };

  const handleOnSelect = (item) => {
    // the item selected
    setSearchResultList([item]);
  };
  const handleOnClear = () => {
    // the item selected
    setSearchResultList(itemList);
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  const handleLoad = (index) => {
    isImageLoaded.set(index, true);
  };
  return (
    <>
      <NavBar count={currOrder.length}></NavBar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <BeatLoader size={70} loading={loading} color="blue" />
        </div>
      )}
      {!loading && (
        <div className="relative mt-20 ml-8 mr-8 z-10">
          <ReactSearchAutocomplete
            styling={{
              fontFamily: "Inter",
              border: "px solid black",
              backgroundColor: "#f7f7f7",
            }}
            items={itemList}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            placeholder="Search..."
            onClear={handleOnClear}
          />
        </div>
      )}
      <div className="mt-1" style={{ width: "100%" }}>
        <Background
          style={{ fontFamily: "DM Sans" }}
          data={mainSection}
        ></Background>
      </div>
      <div className="bg-blue-500 hover:bg-blue-800">
        <FloatingButton></FloatingButton>
      </div>
      {!loading && (
        <div
          ref={mainSection}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 m-10 mb-44"
        >
          {searchResultList &&
            searchResultList.map((item, index) => (
              <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                style={{ fontFamily: "Inter" }}
              >
                {!isImageLoaded.get(item.id) && (
                  <div
                    role="status"
                    class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                  >
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                  </div>
                )}
                <LazyLoadImage
                  style={{
                    display: isImageLoaded.get(item.id) ? "block" : "none",
                  }}
                  onLoad={handleLoad(item.id)}
                  className="p-8 rounded-t-lg"
                  alt="product"
                  src={item?.src} // use normal <img> attributes as props
                />
                {/* <span>
                  <div id = {index} class="flex items-center justify-center ml-3 mt-4 w-11/12 h-48 bg-gray-300 rounded sm:w-11/12 dark:bg-gray-700">
                    <svg
                      class="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  
                   
                </span> */}
                <div className="px-5 pb-5">
                  <span>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                  </span>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-1xl font-bold text-gray-900 dark:text-white">
                      Rs. {item.price}
                    </span>
                    <button
                      id={item.id}
                      className="text-white  py-2 px-4 rounded-3xl"
                      style={{
                        backgroundColor: currOrder.includes(item.id)
                          ? "#f21b1b"
                          : "#2472f0",
                      }}
                      onClick={handleClick}
                    >
                      {!currOrder.includes(item.id) ? "Add to cart" : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <Footer></Footer>
    </>
  );
}
