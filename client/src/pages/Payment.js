import axios from "axios";
import { useEffect } from "react";
export default function Payment() {
  const initPayment = async (data) => {
    const options = {
        key:"rzp_test_i9xW1rAkBXrwXe",
        amount: data.data,
        currency: data.currency,
        name: "Test",
        description: "This is test",
        iamge:"",
        order_id: data.id,
        handler: async(response) => {
            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/payment/verify`, response
                  );
                  console.log(data);
            } catch (err) {
                console.log(err);
            }
        },
        theme: {
            color:"#3399cc"
        }
    }
    const rpz = new window.Razorpay(options);
    rpz.open()
  }
  const handlePayement = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payment`, {amount: 250}
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
