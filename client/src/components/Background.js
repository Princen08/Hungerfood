import React from "react";
// import { Image } from "./Image";
import "../App.css";

export default function Background(props) {
  const handleClick = () => {
    window.scrollTo({
      top: props.data.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className="landing-page w-full0" style={{fontFamily:"Inter"}}>
      <div className="div">
        <div className="overlap-group">
          <div>
          </div>
          
          <div className="navigation-bar"></div>
          <div className="frame ">
            <div className="text-wrapper-3">Hey, You Hungry?</div>
            <p className="p">
              Delight your taste buds with our culinary creations. Explore
              flavors, savor moments.
            </p>
              <button className="font-medium font-white rounded-3xl bg-blue-500 px-4 py-2 hover:bg-blue-700" style={{color:"white"}} onClick={handleClick}>
                Buy Now
              </button>
          </div>
          
        </div>
        <div className="frame-2 mb-100">
        <img src = {require("../assets/foodImage.png")}></img>
        </div>
      </div>
    </div>
  );
}
