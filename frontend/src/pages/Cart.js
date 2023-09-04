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
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [showModel, setShowModal] = useState(false);
  async function getOrder() {
    currOrder = [];
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/item/getCartItems`, {
      params: {
        email: location.state.email
      }
    }).then((response) => {
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/item/updateItem`, {
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/item/updateItem`, {
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/item/removeItem`, {
        email: location.state.email,
        id: curr,
    }).then((res)=> {
      getOrder();
   })
  }

  const handleCheckOut = () => {
    setShowModal(!showModel);
  }
  return (
    <> 
    <NavBar count={selectedItem.length} email = {location.state.email}></NavBar>
    {loading && (<div className="flex items-center justify-center h-screen">
        <BeatLoader size={70} loading={loading} color="blue" />
      </div>)}
      
         {/* <Modal  data = {selectedItem}/> */}
      {!loading && ( <div style={{fontFamily:"Inter"}}>
      <h1 className="mb-10 text-center text-2xl font-bold mt-8">Cart Items</h1>
      {selectedItem.length === 0 && (  <h1 className="mb-10 text-center text-2xl font-bold mt-8">Cart is empty!</h1>)}
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {selectedItem && selectedItem.map((item, index) => (
           <div className="justify-between mb-6 rounded-lg bg-gray-100 p-6 shadow-md sm:flex sm:justify-start">
           <img src={item?.src} alt="product" className="w-full border-1 border-black rounded-lg sm:w-40" />
           <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
             <div className="mt-5 sm:mt-0">
               <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
               <p className="mt-1 text-l text-gray-700">Rs. {item.price}</p>
               <p className="mt-1 text-l text-gray-700">Category - {item.category}</p>
             </div>
             <div className="mt-4 flex  sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
               <div className="flex items-center">
                 <span id = {item.id} className="cursor-pointer rounded-l bg-red-600 text-white py-1 px-3.5 " style={{userSelect:"none"}} onClick={decrement}> - </span>
                 <span className="h-8 w-8 border-2 bg-white text-center text-xs outline-none justify-between pt-2" style={{userSelect:"none"}} >{qty.get(item.id)}</span>
                 <span id = {item.id} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 bg-green-600 text-white" style={{userSelect:"none"}}  onClick={increment}> + </span>
               </div>
               <div className="flex items-center space-x-4">
                 <p className="text-sm ml-2">Rs. {item.price * qty.get(item.id)}</p>
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
      {selectedItem.length > 0  && (<div className="mt-6 h-full rounded-lg border bg-white p-6 mb-4 shadow-md md:mt-0 md:w-1/3">
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
            <button className="mt-6 w-full rounded-3xl bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleCheckOut}>Check out</button>
          </div>)}
        </div>
         <Footer></Footer>
      </div>)}
    </>
  );
}