import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

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

    // // Call the function to request camera access
    getCameraAccess();
  }, []);
  return (
    <>
      <div>
        {/* <h1>{data}</h1> */}
        <QrReader
          delay={500}
          // onError={handleError}
          // onScan={handleScan}
          // chooseDeviceId={()=>selected}
        />
        {/* {data} */}
      </div>
    </>
  );
}
