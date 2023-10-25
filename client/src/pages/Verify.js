import React, { useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { userSignUpAPI } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";
import OtpInput from "react-otp-input";
import Error from "../components/Error";

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  async function addUser() {
    try {
      const res = await userSignUpAPI(
        location.state.name,
        location.state.email,
        location.state.password
      );
      if (res.auth) {
        localStorage.setItem("token", "Bearer " + res.token);
      }
    } catch {
      console.log("Error while adding user in database.");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp == location.state.otp) {
      addUser();
      localStorage.setItem("currUser", location.state.email);
      navigate("/home");
    } else {
      toast.error("OTP does not match. Please try again!");
    }
  };
  return (
    <>
      {location.state?.email ? (
        <div
          className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12"
          style={{ fontFamily: "Inter" }}
        >
          <Toaster position="top-center" reverseOrder={false} />
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>
                    We have sent a code to your email {location.state?.email}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        renderInput={(props) => <input {...props} />}
                        numInputs={4}
                        separator={<span style={{ width: "8px" }}></span>}
                        inputType="number"
                        shouldAutoFocus={true}
                        inputStyle={{
                          border: "2px solid black",
                          marginLeft: "22px",
                          borderRadius: "8px",
                          width: "54px",
                          height: "54px",
                          fontSize: "20px",
                          color: "#000",
                          fontWeight: "400",
                          caretColor: "blue",
                        }}
                        focusStyle={{
                          border: "1px solid",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={handleSubmit}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-full outline-none py-5 bg-black border-none text-white text-sm shadow-sm hover:bg-slate-700"
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
}
