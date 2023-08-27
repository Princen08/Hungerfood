import "../App.css"
import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar.js";
import Footer from "../components/Footer";
import BeatLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useLocation } from 'react-router-dom';
let currOrder = [];
const qty = new Map();
export default function Cart() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  async function getOrder() {
    currOrder = [];
    axios.get('http://localhost:4000/getCartItems', {
      params: {
        email: location.state.email
      }
    }).then((response) => {
      console.log(response.data)
      setSelectedItem(response.data);
    }, (error) => {
    });
  }
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    getOrder();
  }, [])
  useEffect(() => {
    let curr = 0;
    for(let i = 0; i < selectedItem.length; i++) {
      qty.set(selectedItem[i].id, selectedItem[i].count);
      curr = curr + (selectedItem[i].price * selectedItem[i].count);
    }
    setTotalAmt(curr);
  },[selectedItem])

  const increment = event => {
    let curr = parseInt(event.currentTarget.id);
    axios.post('http://localhost:4000/updateItem', {
      params: {
        email: location.state.email,
        id: curr,
        type: 1,
      }
    }).then((res)=> {
       qty.set(curr, res.data.count);
       getOrder();
    })
  }
  
  const decrement = event => {
    let curr = parseInt(event.currentTarget.id);
    axios.post('http://localhost:4000/updateItem', {
      params: {
        email: location.state.email,
        id: curr,
        type: -1,
      }
    }).then((res)=> {
      qty.set(curr, res.data.count);
      getOrder();
   })
  }
  const handleRemove = event => {
    let curr = parseInt(event.currentTarget.id);
    axios.post('http://localhost:4000/removeItem', {
        email: location.state.email,
        id: curr,
    }).then((res)=> {
      getOrder();
   })
  }
  return (
    <> 
    <NavBar count={selectedItem.length} email = {location.state.email}></NavBar>
    {loading && (<div className="flex items-center justify-center h-screen">
        <BeatLoader size={70} loading={loading} color="blue" />
      </div>)}
      {!loading && ( <div style={{fontFamily:"poppins"}}>
      <h1 className="mb-10 text-center text-2xl font-bold mt-8">Cart Items</h1>
      {selectedItem.length == 0 && (  <h1 className="mb-10 text-center text-2xl font-bold mt-8">Cart is empty!</h1>)}
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {selectedItem && selectedItem.map((item, index) => (
           <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
           <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full rounded-lg sm:w-40" />
           <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
             <div className="mt-5 sm:mt-0">
               <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
               <p className="mt-1 text-l text-gray-700">Rs. {item.price}</p>
               <p className="mt-1 text-l text-gray-700">Category - {item.category}</p>
             </div>
             <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
               <div className="flex items-center border-gray-100">
                 <span id = {item.id} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decrement}> - </span>
                 <span className="h-8 w-8 border bg-white text-center text-xs outline-none justify-between pt-2">{qty.get(item.id)}</span>
                 <span id = {item.id} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={increment}> + </span>
               </div>
               <div className="flex items-center space-x-4">
                 <p className="text-sm">Rs. {item.price * qty.get(item.id)}</p>
                 <svg id = {item.id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={handleRemove}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </div>
             </div>
           </div>
         </div>
        ))
        }
        </div>
      {selectedItem.length > 0  && (<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
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
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div>)}
        </div>
         <Footer></Footer>
      </div>)}
    </>
  );
}