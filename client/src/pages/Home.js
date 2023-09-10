import React, { useEffect, useState } from "react";
import "../App.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import BeatLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  getUserCartItemsAPI,
  getItemsMenuAPI,
  addItemAPI,
  removeItemAPI
} from "../api/itemApi";

let currOrder = [];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [searchResultList, setSearchResultList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState([]);

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
    setTimeout(() => setLoading(false), 1500);
    getOrder();
  }, []);

  useEffect(() => {
    getMenu();
  }, [selectedItem]);

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
            autoFocus
            formatResult={formatResult}
            placeholder="Search..."
            onClear={handleOnClear}
          />
        </div>
      )}
      <div className="mt-1" style={{ width: "100%" }}>
        <Background style={{ fontFamily: "DM Sans" }}></Background>
      </div>
      {!loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 m-10 mb-44">
          {searchResultList &&
            searchResultList.map((item, index) => (
              <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                style={{ fontFamily: "Inter" }}
              >
                <span>
                  <img
                    className="p-8 rounded-t-lg"
                    src={item?.src}
                    alt="product"
                  />
                </span>
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
                      className="text-white font-bold py-2 px-4 rounded-3xl"
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
