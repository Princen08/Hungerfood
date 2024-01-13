import axios from "axios";

export const getUserCartItemsAPI = async () => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/item/getCartItems`,
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

export const getItem = async (id) => {
  try {
    const res = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/item/getItem`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        params: {
          id: id,
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

export const addItemAPI = async (id) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/item/addItem`,
      {
        id: id,
        email: localStorage.getItem("currUser"),
        count: 1,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
  } catch (err) {
    return err;
  }
};

export const removeItemAPI = async (id) => {
  try {
    axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/item/removeItem`,
      {
        id: id,
        email: localStorage.getItem("currUser"),
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
  } catch (err) {
    return err;
  }
};

export const updateItemAPI = async (id, type) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/item/updateItem`,
      {
          email: localStorage.getItem("currUser"),
          id: id,
          type: type,
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
