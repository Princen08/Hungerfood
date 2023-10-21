import React, { useEffect, useRef, useState } from "react";
import QrReader from 'modern-react-qr-reader'

export default function QRCodeScanner() {
  const [data, setData] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to request camera access
    async function getCameraAccess() {
      // try {
        // const stream = await navigator.mediaDevices.getUserMedia({
        //   video: {
        //     facingMode: {
        //       ideal: 'environment',
        //     },
        //     width: {
        //         min: 1
        //     },
        //     height: {
        //         min: 1
        //     }
        //   },
        // });
        // console.log(stream);
        // if (videoRef.current) {
        //   videoRef.current.srcObject = stream;
        // }
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
      setData(data);
  }

  return (
    <>
      <div>
        <h1>camera</h1>
        <QrReader
          delay={300}
          facingMode={"environment"}
          // onError={this.handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        {data}
      </div>
    </>
  );
}
