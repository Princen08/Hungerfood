import React from "react";


export default function Card() {
 
  return (
    <> 
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{fontFamily:"poppins"}}>
        <a>
          <img className="p-8 rounded-t-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="product image" />
        </a>
        <div className="px-5 pb-5">
          <a>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
          </a>
          <div className="flex items-center justify-between mt-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
}