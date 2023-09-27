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
          <div className="ellipse hidden sm:block" />
          <div className="navigation-bar"></div>
          <div className="frame ">
            <div className="text-wrapper-3">Hey, You Hungry?</div>
            <p className="p">
              Delight your taste buds with our culinary creations. Explore
              flavors, savor moments.
            </p>
            <div className="div-wrapper bg-blue-500 hover:bg-blue-800">
              <button className="text-wrapper-4" onClick={handleClick}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="frame-2"></div>
      </div>
    </div>
  );
}
