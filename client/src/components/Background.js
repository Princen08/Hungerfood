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
    <div className="landing-page w-full" style={{ fontFamily: "Inter" }}>
      <div className="div">
        <div className="overlap-group">
          <div className="navigation-bar"></div>
          <div className="md:ml-36 frame">
            <div className="text-wrapper-3 text-orange-600 mt-10">Hey, You Hungry?</div>
            <svg style={{ marginTop: "-30px" }} width="213" height="16" viewBox="0 0 213 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M90.0279 1.82676C80.0714 2.35129 70.2321 2.98858 60.6374 3.6816C47.0551 4.66199 33.4781 5.67469 19.9848 7.2526C15.7374 7.75085 11.4235 8.07156 7.20309 8.6909C4.55376 9.07903 1.04093 9.6314 0.580047 9.74597C0.339005 9.81136 0.234066 9.90873 0.200161 9.94115C-0.0382405 10.1681 0.00608573 10.386 0.141598 10.5552C0.196031 10.6277 0.333656 10.8051 0.714204 10.8281C26.1642 12.403 52.1726 9.08876 77.6471 8.66825C121.824 7.94575 167.35 10.111 211.195 15.0121C211.577 15.0513 211.949 14.8481 212.001 14.549C212.064 14.258 211.787 13.9761 211.404 13.937C167.485 9.02801 121.885 6.85491 77.6224 7.58576C53.8812 7.97651 29.6793 10.8892 5.90109 9.99565C6.44709 9.91313 6.9825 9.83061 7.47114 9.75634C11.6746 9.13706 15.9704 8.82449 20.2008 8.3263C33.6654 6.74848 47.2147 5.73588 60.779 4.76362C77.6096 3.54667 95.1739 2.48894 112.878 1.96395C119.212 2.01646 125.525 2.06907 131.839 2.1378C145.496 2.28813 159.218 2.80987 172.845 3.52579C176.948 3.74698 181.051 3.97623 185.154 4.17318C186.515 4.24155 190.022 4.44036 190.511 4.42265C191.117 4.40456 191.233 4.01647 191.243 3.95181C191.274 3.8063 191.252 3.6044 190.954 3.4357C190.922 3.41157 190.731 3.33134 190.306 3.28423C165.523 0.503509 139.07 0.111308 112.896 0.881422C85.2843 0.670561 57.5669 0.629624 30.0259 0.580106C29.6316 0.581363 29.3104 0.824773 29.3081 1.12368C29.307 1.42258 29.6255 1.66396 30.0198 1.67078C49.9619 1.70414 70.0049 1.73712 90.0279 1.82676Z" fill="#FFC47E" />
            </svg>

            <p className="p">
              Delight your taste buds with our culinary creations. Explore
              flavors, savor moments.
            </p>
            <button
              className="font-medium font-white rounded-3xl bg-orange-600 px-4 py-2 hover:bg-orange-400"
              style={{ color: "white" }}
              onClick={handleClick}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div style={{marginTop:"-2%", marginLeft:"35%"}} className="invisible md:visible">
          <img src={require("../assets/bg.png")} style={{scale:"0.5", pointerEvents:"none"}}></img>
        </div>
      </div>
    </div>
  );
}
