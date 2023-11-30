import axios from "axios";

export const addOrderAPI = async (itemsData) => {
  try {
    const res = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/order/addOrder`,
      {
        email: localStorage.getItem("currUser"),
        items: itemsData,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const updateOrderAPI = async (orderId) => {
  try {
    const res = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/order/updateOrder`,
      {
        email: localStorage.getItem("currUser"),
        orderId: orderId,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrderAPI = async (orderId) => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/order/getOrder`,
      {
        params: {
          email: localStorage.getItem("currUser"),
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrderByIdAPI = async (orderId) => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/order/getOrderById`,
      {
        params: {
          email: localStorage.getItem("currUser"),
          orderId: orderId
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
