import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import { isLoggedIn } from "../api/authApi";

const UserHomeRoute = () => {
  const navigate = useNavigate();
  const [isisAuthenticated, setIsisAuthenticated] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const res = await isLoggedIn();
      if (res.data.auth) {
        setIsisAuthenticated(true);
        return navigate("/home");
      }
    };
    checkUser();
  }, [isLoggedIn]);

  return <>{isisAuthenticated ? <Home/> : <Auth/>}</>;
};
export default UserHomeRoute;
