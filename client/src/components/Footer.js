import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <>
      <footer class="flex flex-col space-y-10 justify-center m-10" style={{fontFamily:"DM Sans"}}>
    
        <div class="flex justify-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
          </a>
        </div>
        <p class="text-center text-gray-700 font-medium">
          &copy; 2023 Hunger Food. All rights reservered.
        </p>
      </footer>
    </>
    // <>
    //   <footer
    //     className="bg-gray-800 text-center dark:bg-secondary-600 h-70 md:h-28"
    //     style={{ fontFamily: "DM Sans" }}
    //   >
    //     {/*Sign-up form section*/}
    //     <div className="px-6 pt-6">
    //       <form action>
    //         <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
    //           <div className="md:mb-6 md:ml-auto">
    //             <p className="text-white dark:text-secondary-200">
    //               <p>Sign up for our newsletter</p>
    //             </p>
    //           </div>
    //           <div className="relative md:mb-6" data-te-input-wrapper-init>
    //             <input
    //               type="text"
    //               className="bg-white peer block min-h-[auto] w-full rounded-3xl border-0  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear 100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  text-black"
    //               id="exampleFormControlInput1"
    //               placeholder="Email address"
    //             />
    //           </div>
    //           <div className="mb-6 md:mr-auto">
    //             <button
    //               type="button"
    //               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
    //               data-te-ripple-init
    //               data-te-ripple-color="light"
    //             >
    //               Subscribe
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //     <div className="bg-secondary-200  text-center text-white dark:bg-secondary-700 dark:text-secondary-200">
    //       Copyright © 2023 Hunger Food.
    //     </div>
    //   </footer>
    // </>
  );
}
