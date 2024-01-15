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

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [searchResultList, setSearchResultList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState([]);
  const mainSection = useRef(null);

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
  }

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
    getOrder();
    getMenu();
  }, []);


  return (
    <>
      <NavBar count = {selectedItem.length} current={"Home"}></NavBar>
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
        {/* <div class="flex items-center gap-10">
           <hr class="flex-grow"/>
          <span class="text-orange-400 text-2xl font-semibold  font-[Inter]" style={{color:"black"}}>Top Picks</span>
           <hr class="flex-grow"/>
        </div>
        <TopPicks></TopPicks> */}
        <div
          ref={mainSection}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mx-10"
        >
          {searchResultList &&
            searchResultList?.map((item, index) => (
              <div
                key={index}
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
