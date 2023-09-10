import axios from "axios";

export const addOrderAPI = async () => {
  try {
    const res = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/order/addOrder`,
      {
        email: localStorage.getItem("currUser"),
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
