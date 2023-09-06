
import Navbar from "../components/Navbar"
import { useLocation } from "react-router-dom"
import QRCode from "react-qr-code";


export default function Order() {
   const location = useLocation();
   return (
      <>
         <Navbar></Navbar>
           <div style={{fontFamily:"DM Sans",display:"flex", flexDirection:"column", gap:10,justifyContent:"center", alignItems:"center", marginTop:"6rem"}}>
            <h2 className="font-bold">Your QR Code for Order ID: {location.state.key}</h2>
           <QRCode 
               style={{ height: "30rem", maxWidth: "60%", width: "60%"}}
               value={JSON.stringify(location.state.data)}
               viewBox={`0 0 256 256`}
            />
           </div>
      </>
   )
}