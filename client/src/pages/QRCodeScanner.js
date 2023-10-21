import React, { useEffect, useRef, useState } from "react";
import QrReader from 'modern-react-qr-reader'

export default function QRCodeScanner() {
  const [data, setData] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to request camera access
    async function getCameraAccess() {
        const constraints = {
          video: {
            facingMode: {
              ideal: "environment"
            }
          }
        };
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {videoRef.srcObject = stream})
        .catch( console.error );
     
    }
    getCameraAccess();
  }, []);
  const handleScan = (data) => {
      // setData(data);
  }
  const handleResult = (data) => {
    setData(data);
}

  return (
    <>
      <div>
        <h1>camera</h1>
        <QrReader
          delay={300}
          facingMode={"environment"}
          onScan={handleScan}
          style={{ width: '100%' }}
          onResult = {handleResult}
        />
        {data}
      </div>
    </>
  );
}
