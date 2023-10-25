import { ReactComponent as QRCodeScanner } from "../assets/QRCodeScanner.svg";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
  const navigate = useNavigate();
  const OpenQRScanner = () => {
    navigate("/qrcode");
  };
  return (
    <>
      <div className="group fixed bottom-0 right-0 p-2  flex items-end justify-end w-24 h-24 ">
        <div
          className="cursor-pointer text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-black z-50 absolute hover:bg-slate-700"
          onClick={OpenQRScanner}
        >
          <QRCodeScanner></QRCodeScanner>
        </div>
      </div>
    </>
  );
}
