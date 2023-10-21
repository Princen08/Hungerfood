import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRCodeScanner() {
  const [data, setData] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to request camera access
    async function getCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: {
            exact: 'environment'
          } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    // // Call the function to request camera access
    getCameraAccess();
  }, []);
  return (
    <>
      <div>
        {/* <h1>{data}</h1> */}
        <QrReader
          facingMode={"environment"}
          delay={500}
          // onError={handleError}
          // onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: "200px", heigth: "100px" }}
        />
        {data}
      </div>
    </>
  );
}
