import React, { useEffect, useState } from "react";
import "../App.css"

export default function Footer() {
  return (
    <> 
       <footer className="bg-gray-800 text-center dark:bg-secondary-600" style={{fontFamily:"poppins"}}>
        {/*Sign-up form section*/}
        <div className="px-6 pt-6">
          <form action>
            <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
              <div className="md:mb-6 md:ml-auto">
                <p className="text-white dark:text-secondary-200">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <div className="relative md:mb-6" data-te-input-wrapper-init>
                <input type="text" className="bg-white peer block min-h-[auto] w-full rounded border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear 100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  text-black" id="exampleFormControlInput1" placeholder="Email address"/>
              </div>
              <div className="mb-6 md:mr-auto">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{backgroundColor: "#6066d1"}} data-te-ripple-init data-te-ripple-color="light">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-secondary-200 p-4 text-center text-white dark:bg-secondary-700 dark:text-secondary-200">
          Copyright © 2023 Hunger Food.
        </div>
      </footer>
    </>
  );
}