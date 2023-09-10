import axios from "axios";

export const getUserCartItemsAPI = async () => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/item/getCartItems`,
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

export const getItemsMenuAPI = async () => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/item/getMenu`,
      {}
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const addItemAPI = async (id, name, price, category, src) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/item/addItem`,
      {
        id: id,
        email: localStorage.getItem("currUser"),
        count: 1,
        name: name,
        price: price,
        category: category,
        src: src,
      }
    );
  } catch (err) {
    return err;
  }
};

export const removeItemAPI = async (id) => {
  try {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/item/removeItem`, {
      id: id,
      email: localStorage.getItem("currUser"),
    });
  } catch (err) {
    return err;
  }
};

export const updateItemAPI = async (id, type) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/item/updateItem`,
      {
        params: {
          email: localStorage.getItem("currUser"),
          id: id,
          type: type,
        },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
};
