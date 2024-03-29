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
import TopPicks from "../components/TopPicks";
import IcOutlineFilterAlt from "../assets/IcOutlineFilterAlt";
import { createPopper } from "@popperjs/core";
import InputRange from "react-input-range";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [popoverShow, setPopoverShow] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [searchResultList, setSearchResultList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState([]);
  const [categoryList, setCategoryList] = useState(["All"]);
  const [selecetdCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10);
  const mainSection = useRef(null);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "right",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  const getOrder = async () => {
    try {
      const res = await getUserCartItemsAPI();
      setSelectedItem(res.data.data.map(getId));
      function getId(item) {
        return item.item;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getMenu = async () => {
    try {
      const res = await getItemsMenuAPI();
      setItemList(res.data.data);
      setSearchResultList(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Error while fetching data.");
    }
  };

  const handleClick = async (event) => {
    const itemId = event.currentTarget.id;
    if (selectedItem.includes(itemId)) {
      // remove item
      const updatedCart = selectedItem.filter((item) => item !== itemId);
      setSelectedItem(updatedCart);
      await removeItemAPI(itemId);
    } else {
      // add item
      setSelectedItem([...selectedItem, itemId]);
      await addItemAPI(itemId);
    }
  };

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

  useEffect(() => {
    for (var i = 0; i < itemList?.length; i++) {
      const isExist = categoryList.filter(
        (category) => category === itemList[i].category
      );
      if (isExist?.length === 0) {
        categoryList.push(itemList[i].category);
        setCategoryList(categoryList);
      }
    }
  }, [itemList]);

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  }

  const handleFilter = () => {
    const filteredItems = [];
    itemList.forEach(item => {
       if(selecetdCategory === "All" || selecetdCategory === item.category) {
          if(item.price <= priceRange) {
            filteredItems.push(item);
          }
       }
    });
    setSearchResultList(filteredItems);
    setPopoverShow(false)
  }

  useEffect(() => {
    getOrder();
    getMenu();
  }, []);

  return (
    <>
      <NavBar count={selectedItem.length} current={"Home"}></NavBar>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="black" loading={loading} />
        </div>
      )}
      {!loading && (
        <div className="relative mt-28 md:mx-40 m-4 z-10">
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
        <>
          <div class="flex justify-center items-center gap-10 invisible md:visible">
            <h1 class=" text-3xl font-extrabold leading-none tracking-tight font-[Inter] text-orange-800 md:text-3xl lg:text-3xl">
              Top picks
            </h1>
          </div>
          <div className="mt-4 mb-8 invisible md:visible">
            <TopPicks></TopPicks>
          </div>
          <div className="flex mt-8 gap-2 mx-12">
            <button
              type="button"
              class="flex gap-1 font-[Inter] h-12 py-3.5 md:h-10 md:py-2.5 text-white bg-green-400 hover:bg-green-500  rounded-full text-sm px-5 py-2.5 text-center"
              onClick={() => {
                popoverShow ? closePopover() : openPopover();
              }}
              ref={btnRef}
            >
              <div style={{ marginTop: "0.18rem" }}>
                <IcOutlineFilterAlt />
              </div>
              <p>Filter</p>
            </button>
            <div
              className={
                (popoverShow ? "" : "hidden ") +
                "font-[Inter] bg-white border-2 border-black ml-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
              }
              ref={popoverRef}
            >
              <div className="rounded-lg">
                <div
                  className={
                    "font-[Inter] bg-white rounded-lg text-black opacity-75 font-semibold p-3 mb-0 "
                  }
                >
                  Filter Items
                </div>
                <div className="text-white p-3">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50  text-gray-900 text-sm rounded-full block w-full p-2.5"
                    value={selecetdCategory}
                    onChange={(e)=> setSelectedCategory(e.target.value)}
                  >
                    {categoryList.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-white p-3">
                  <label
                    for="priceRange"
                    class="flex flex-col mb-2 text-sm font-medium text-gray-900"
                  >
                    Price Range
                  </label>
                  <p className="text-black">Price: {priceRange}</p>
                  <input type="range" id="vol" name="vol" min="0" max="300" step={1} value={priceRange} onChange={handlePriceChange}/>
                </div>
                <div>
                <button
              type="button"
              class="flex gap-1 font-[Inter] text-white bg-black hover:bg-gray-800  rounded-full text-sm px-5 py-2 text-center mx-2 my-2" onClick={handleFilter}>
                Apply </button>
                </div>
              </div>
            </div>
            <div className="font-[Inter] bg-blue-100 text-blue-800 text-sm font-medium  px-2.5 mb-4 py-1.5 border-solid border-1.5 border-indigo-600 rounded">Category: {selecetdCategory}</div>
            <div className="font-[Inter] bg-blue-100 text-blue-800 text-sm font-medium  px-2.5 mb-4 py-1.5 border-solid border-1.5 border-indigo-600 rounded">Max Price: {priceRange}</div>
          </div>
          <div
            ref={mainSection}
            className="mt-8 content-center grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5 mx-10"
          >
            {searchResultList &&
              searchResultList?.map((item, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-gray-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{ fontFamily: "Inter" }}
                >
                  <img
                    referrerPolicy="no-referrer"
                    key={item.id}
                    className="p-8 rounded-t-lg"
                    alt="product"
                    src={item?.src}
                    placeholderSrc={require("../assets/photo.png")}
                  ></img>
                  {/* {!isImageLoaded.get(item.id) && t && (<Skeleton square height={200} className="pt-2"></Skeleton>)} */}
                  <div className="px-5 pb-5">
                    <span>
                      {/* <span class="bg-blue-100 text-blue-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"> {item.name}</span> */}
                      <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white">
                        {item.name}
                      </h5>
                    </span>
                    <div className="flex items-center justify-between mt-6">
                      <span class="bg-green-500 text-white text-xs font-medium me-2 px-3 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        Rs. {item.price}
                      </span>
                      <button
                        id={item._id}
                        className="text-white  py-2 px-4 rounded-3xl"
                        style={{
                          backgroundColor: selectedItem.includes(item._id)
                            ? "#f21b1b"
                            : "#EA580C",
                        }}
                        onClick={handleClick}
                      >
                        {!selectedItem.includes(item._id)
                          ? "Add to cart"
                          : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {!loading && <Footer></Footer>}
    </>
  );
}
