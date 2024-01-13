import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faFacebookMessenger,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <footer
        className="flex flex-col space-y-10 justify-center m-10 border-t-2"
        style={{ fontFamily: "Inter" }}
      >
        <div className="flex justify-center space-x-5 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="xl"
              style={{ color: "black", cursor: "pointer" }}
              // onClick={handleClick}
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="xl"
              style={{ color: "black", cursor: "pointer" }}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              style={{ color: "black", cursor: "pointer" }}
            />
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebookMessenger}
              size="xl"
              style={{ color: "black", cursor: "pointer" }}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="xl"
              style={{ color: "black", cursor: "pointer" }}
            />
          </a>
        </div>
        <p className="text-center text-gray-700 font-medium">
          &copy; 2023 Hunger Food. All rights reservered.
        </p>
      </footer>
    </>
  );
}
