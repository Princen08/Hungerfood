import React, { useEffect, useState, useRef } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SyncLoader from "react-spinners/SyncLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FloatingButton from "../components/FloatingButton";
import "../App.css";
import {
  addItemAPI,
  getItemsMenuAPI,
  getUserCartItemsAPI,
  removeItemAPI,
  getItem,
} from "../api/itemApi";
import Background from "../components/Background";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import "react-loading-skeleton/dist/skeleton.css";

let currOrder = [];
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
    } catch (err) {
      console.log(err);
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
        const res = await getItem(curr);
        try {
          await addItemAPI(
            curr,
            res.data[0].name,
            res.data[0].price,
            res.data[0].category,
            res.data[0].src
          );
        } catch {
          console.log("Error while adding item.");
        }
      } catch (err) {
        console.log("Error while fetching data.");
      }
    } else {
      // remove item
      event.currentTarget.innerText = "Add to cart";
      event.currentTarget.style.backgroundColor = "black";
      setSelectedItem((current) => current.filter((order) => order !== curr));
      try {
        let index = currOrder.indexOf(curr); // Find the index of the element
        if (index !== -1) {
          currOrder.splice(index, 1); // Remove the element at the found index
        }
        await removeItemAPI(curr);
      } catch {
        console.log("Error while removing item.");
      }
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    getMenu();
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

  return (
    <>
      <NavBar count={currOrder.length} current={"Home"}></NavBar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="black" loading={loading} />
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
      {!loading && (
        <>
          <div className="mt-1" style={{ width: "100%" }}>
            <Background
              style={{ fontFamily: "DM Sans" }}
              data={mainSection}
            ></Background>
          </div>
          <div className="bg-black hover:bg-slate-700">
            <FloatingButton></FloatingButton>
          </div>
        </>
      )}
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
                <LazyLoadImage
                  key={item.id}
                  className="p-8 rounded-t-lg"
                  alt="product"
                  src={item?.src}
                  placeholderSrc={require("../assets/photo.png")}
                />
                {/* {!isImageLoaded.get(item.id) && t && (<Skeleton square height={200} className="pt-2"></Skeleton>)} */}
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
                          : "black",
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
      {!loading && <Footer></Footer>}
    </>
  );
}
