import axios from "axios";

export const userVerifyAPI = async (email, otp) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/verify`,
      {
        email: email,
        otp: otp,
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const userSignInAPI = async (email, password) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
      {
        email: email,
        password: password,
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const userSignUpAPI = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  };
  