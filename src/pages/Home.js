import React, { useEffect, useState } from "react";
import "../App.css"
import NavBar from "../components/Navbar.js";
import Footer from "../components/Footer";
import BeatLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

let currOrder = [];
export default function Home() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [itemList, setItemList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  async function getOrder() {
    currOrder = [];
    axios.get('http://localhost:4000/getItems', {
      params: {
        email: location.state.email
      }
    }).then((response) => {
      console.log(response)
      response?.data.forEach(element => {
        if (!currOrder.includes(element.id))
          currOrder.push(element.id)
      });
    }, (error) => {
    });
    setSelectedItem(currOrder);
  }

  async function getMenu() {
    axios.get('http://localhost:4000/getMenu', {
    }).then((response) => {
      setItemList(response.data)
    }, (error) => {
      console.log(error);
    });
  }

  const handleClick = event => {
    // add item
    let curr = parseInt(event.currentTarget.id);
    if (event.currentTarget.innerText == "Add to cart") {
      if (!currOrder.includes(curr)) {
        currOrder.push(curr);
        setSelectedItem([...selectedItem, curr]);
      }
      event.currentTarget.innerText = "Remove";
      event.currentTarget.style.backgroundColor = "#f21b1b";
      axios.post('http://localhost:4000/addItem', {
        id: event.currentTarget.id,
        email: location.state.email,
        payment: 0
      });
    } else {
      // remove item
      event.currentTarget.innerText = "Add to cart";
      event.currentTarget.style.backgroundColor = "#2472f0";
      setSelectedItem((current) =>
        current.filter((order) => order !== curr)
      );
      axios.post('http://localhost:4000/removeItem', {
        id: event.currentTarget.id,
        email: location.state.email
      });
      let index = currOrder.indexOf(curr); // Find the index of the element
      if (index !== -1) {
        currOrder.splice(index, 1); // Remove the element at the found index
      }
    }
    console.log(currOrder);
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    getOrder();
  }, [])

  useEffect(() => {
    getMenu();
  }, [selectedItem]);
  

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }
  return (
    <>
      <NavBar count={currOrder.length}></NavBar>
      {loading && (<div className="flex items-center justify-center h-screen">
        <BeatLoader size={70} loading={loading} color="blue" />
      </div>)}
      {!loading && (
        <div style={{margin:"1rem 5rem"}}>
          <ReactSearchAutocomplete styling={{ fontFamily: "poppins", border:"1px solid black", backgroundColor:"#f7f7f7"}}
            items={itemList}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            placeholder="Search"
          />
        </div>
      )}
      {!loading && (<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 m-10">
        {itemList && itemList.map((item, index) => (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ fontFamily: "poppins" }}>
            <a>
              <img className="p-8 rounded-t-lg" src="" alt="product image" />
            </a>
            <div className="px-5 pb-5">
              <a>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
              </a>
              <div className="flex items-center justify-between mt-6">
                <span className="text-1xl font-bold text-gray-900 dark:text-white">Rs {item.price} /-</span>
                <button id={item.id} className="text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: currOrder.includes(item.id) ? "#f21b1b" : "#2472f0" }} onClick={handleClick}>{!currOrder.includes(item.id) ? "Add to cart" : "Remove"}</button>
              </div>
            </div>
          </div>
        ))
        }
      </div>)}
      <Footer></Footer>

    </>
  );
}