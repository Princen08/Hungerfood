import axios from "axios";

export const addOrderAPI = async (itemsData) => {
  try {
    console.log(itemsData)
    const res = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/order/addOrder`,
      {
        email: localStorage.getItem("currUser"),
        items: itemsData
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrderAPI = async () => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/order/getOrder`,
      {
        params: {
          email: localStorage.getItem("currUser"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};