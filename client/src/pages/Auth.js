import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import "../App.css";
import { userSignInAPI, userVerifyAPI } from "../api/authApi";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import toast, { Toaster } from "react-hot-toast";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  let otp = "";
  useEffect(() => {
    setEmail("");
    setName("");
    setPassword("");
    setShowLoader(false);
  }, [isSignIn]);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  async function handleVerification() {
    otp = randomNumberInRange(1000, 9999);
    const res = await userVerifyAPI(email, otp);
    if (res === "Success") {
      navigate("/verify", {
        state: { email: email, otp: otp, name: name, password: password },
      });
    } else if (res === "User exist") {
      setShowLoader(false);
      toast.error("User already exist. Please log In.");
    } else {
      setShowLoader(false);
      toast.error("User already exist. Please log In.");
    }
  }
  async function handleSignIn() {
    const res = await userSignInAPI(email, password);
    if (res.auth) {
      localStorage.setItem("token", "Bearer " + res.token);
      localStorage.setItem("currUser", email);
      navigate("/home", { state: { email: email } });
      setShowLoader(false);
    } else {
      toast.error("User is not valid. Please check email or password.");
      setShowLoader(false);
    }
  }

  useEffect(() => {
    setShowLoader(false);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoader(true);
    if (!isSignIn) {
      handleVerification();
    } else {
      handleSignIn();
    }
  };
  const handleChange = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader loading={loading} color="#4287f5" />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen md:flex" style={{ fontFamily: "Inter" }}>
        <div className="relative overflow-hidden md:flex w-2/5 bg-blue-600 i justify-around items-center hidden">
          <div>
            <Logo style={{ marginBottom: "35rem" }}></Logo>
          </div>
          <div style={{ paddingRight: "10rem" }}>
            <h1 className="text-white font-bold text-4xl">Hunger Food </h1>
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 mt-4 justify-center  items-center bg-white">
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>
            {!isSignIn && (
              <div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Username"
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    id="email"
                    value={email}
                    pattern="[a-zA-z0-9.]+@nirmauni\.ac\.in$"
                    title="Use Nirma e-mail id only."
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-indigo-800"
                  // onClick={handleSubmit}
                >
                  <div className="flex justify-center  items-center">
                    {showLoader && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                    <span>{!showLoader ? "Register" : ""} </span>
                  </div>
                </button>
                <span className="text-sm ml-2">
                  {" "}
                  Have an account already?{" "}
                  <span
                    className="cursor-pointer"
                    style={{ color: "blue" }}
                    onClick={handleChange}
                  >
                    {" "}
                    Login
                  </span>{" "}
                </span>
              </div>
            )}
            {isSignIn && (
              <div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    id="email"
                    value={email}
                    pattern="[a-zA-z0-9.]+@nirmauni\.ac\.in$"
                    title="Use Nirma e-mail id only."
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-indigo-800"
                  // onClick={handleSubmit}
                >
                  <div className="flex justify-center  items-center">
                    {showLoader && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                    <span>{!showLoader ? "Login" : ""} </span>
                  </div>
                </button>
                <span className="text-sm ml-2">
                  New user?{" "}
                  <span
                    className="cursor-pointer"
                    style={{ color: "blue" }}
                    onClick={handleChange}
                  >
                    {" "}
                    Register
                  </span>
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
