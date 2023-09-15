import React from "react";
// import { Image } from "./Image";
import "../App.css";

export default function Background() {
  return (
    <div className="landing-page w-screen ">
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
            <div className="div-wrapper bg-blue-500">
              <div className="text-wrapper-4">Buy Now</div>
            </div>
          </div>
          {/* <div className="mb-8">
            <img
              style={{ scale: "0.2", marginBottom: "10rem" }}
              src={require("../assets/img1.png")}
            ></img>
          </div> */}
        </div>
        <div className="frame-2" />
      </div>
    </div>
  );
}