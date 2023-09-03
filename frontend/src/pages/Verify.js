import React, {useState} from "react";
import {useLocation} from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import axios from "axios";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [c3, setC3] = useState('');
  const [c4, setC4] = useState('');

   async function addUser() {
       axios.post('https://online-food-coupon-api.vercel.app/signup', {
          name: location.state.name,
          email: location.state.email,
          password: location.state.password
      })
    }
  const handleSubmit = (event) => {
    event.preventDefault();
     console.log(c1,c2,c3,c4);
     let userOtp = c1 + c2 + c3 + c4;
     userOtp = parseInt(userOtp)
     console.log(userOtp, location.state.otp)
     if(userOtp === location.state.otp) {
        addUser();
        navigate("/home", {state:{email:location.state.email}});
     } else {
        console.log("No found");
     }
 }
  return (
    <>
       <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{fontFamily:"DM Sans"}}>
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {location.state?.email}</p>
              </div>
            </div>
            <div>
              <form  method="post" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input maxLength="1"  pattern="[0-9]" className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" value={c1} onChange={(e)=> setC1(e.target.value)}/>
                    </div>
                    <div className="w-16 h-16 ">
                      <input maxLength="1" pattern="[0-9]" className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" value={c2}  onChange={(e)=> setC2(e.target.value)}/>
                    </div>
                    <div className="w-16 h-16 ">
                      <input maxLength="1"  pattern="[0-9]" className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" value={c3}  onChange={(e)=> setC3(e.target.value)}/>
                    </div>
                    <div className="w-16 h-16 ">
                      <input maxLength="1" pattern="[0-9]" className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" value={c4}  onChange={(e)=> setC4(e.target.value)}/>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-3xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}