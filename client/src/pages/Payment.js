import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeItemAPI } from "../api/itemApi";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const initPayment = async (data) => {
    const options = {
      key: "rzp_test_i9xW1rAkBXrwXe",
      amount: data.data,
      currency: data.currency,
      name: "Hunger Food",
      description: "Enjoy your food.",
      image: "",
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/payment/verify`,
            response
          );
          if (data.message === "success") {
            location.state.data.forEach(async (element) => {
              try {
                await removeItemAPI(element.id);
              } catch {
                console.log("Error while removing item");
              }
            });
            navigate(`/order/${location.state.key}`, {
              state: { data: location.state.data, key: location.state.key },
            });
          } else {
            console.log("Payement failed");
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rpz = new window.Razorpay(options);
    rpz.open();
  };
  const handlePayement = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payment`,
        { amount: location.state.amount }
      );
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlePayement();
  }, []);
}
