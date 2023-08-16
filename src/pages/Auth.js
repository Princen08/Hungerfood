import React, { useEffect, useState } from "react";
import "../App.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/ClipLoader";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let otp = "";
  useEffect(() => {
    setEmail("");
    setName("");
    setPassword("");
  }, [isSignIn]);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  async function handleVerification() {
    otp = randomNumberInRange(1000, 9999);
    axios.post('http://localhost:4000/verify', {
      email: email,
      otp: otp
    })
      .then((response) => {
        console.log(response);
        if (response.data === "Success") {
          navigate("/verify", { state: { email: email, otp: otp, name: name, password: password } });
        } else if (response.data === "User exist") {
          alert("User already exist");
        }
      }, (error) => {
        console.log(error);
      });
  }

  async function handleSignIn() {
    axios.post('http://localhost:4000/signin', {
      email: email,
      password: password
    })
      .then((response) => {
        if (response.data === "User exist") {
          navigate("/home", { state: { email: email} });
        } else if (response.data === "User not exist") {
          alert("Email id or password does not match.")
        }
      }, (error) => {
        console.log(error);
      });
  }
  useEffect(()=> {
    setTimeout(() => setLoading(false), 1500);
  },[])
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isSignIn) {
      handleVerification();
    } else {
      handleSignIn();
    }
  }

  return (
    <>
     {loading && (<div className="flex items-center justify-center h-screen">
        <BeatLoader size={70} loading={loading} color="blue" />
      </div>)}

      {isSignIn && !loading && (<div className="bg-white rounded-lg shadow-lg flex justify-center items-center border border-black" style={{ margin: "auto", width: "50%", marginTop: "5%" }}>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" style={{ fontFamily: "Roboto" }}>Sign in to your account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontFamily: "Poppins" }}>Email address</label>
                <div className="mt-2">
                  <input id="email" value={email} pattern="[a-zA-z0-9]+@nirmauni\.ac\.in$" title="Use Nirma e-mail id only."
                    onChange={(e) => setEmail(e.target.value)} name="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" style={{ fontFamily: "Poppins" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontFamily: "Poppins" }}>Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ fontFamily: "Poppins" }}>Sign in</button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500" style={{ fontFamily: "Roboto" }}>
              Not have an account?
              <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => {
                setIsSignIn(!isSignIn);
              }} style={{ cursor: "pointer" }}> Create an account</a>
            </p>
          </div>
        </div>
      </div>)}
      {!isSignIn && !loading && (<div className="bg-white rounded-lg shadow-lg flex justify-center items-center  border border-black" style={{ margin: "auto", width: "50%", marginTop: "5%" }}>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" style={{ fontFamily: "Roboto" }}>Create a new account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontFamily: "Poppins" }}>Name</label>
                <div className="mt-2">
                  <input id="name" value={name}
                    onChange={(e) => setName(e.target.value)} name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" style={{ fontFamily: "Poppins" }} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontFamily: "Poppins" }}>Email address</label>
                <div className="mt-2">
                  <input id="email" value={email} pattern="[a-zA-z0-9]+@nirmauni\.ac\.in$" title="Use Nirma e-mail id only."
                    onChange={(e) => setEmail(e.target.value)} name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" style={{ fontFamily: "Poppins" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900" style={{ fontFamily: "Poppins" }}>Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ fontFamily: "Poppins" }}>Sign Up</button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500" style={{ fontFamily: "Roboto" }}>
              Have an account already?
              <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => {
                setIsSignIn(!isSignIn);
              }} style={{ cursor: "pointer" }}> Sign in</a>
            </p>
          </div>
        </div>
      </div>)}
    </>
  );
}