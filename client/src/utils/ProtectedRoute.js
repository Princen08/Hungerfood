import React, {useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
   const navigate = useNavigate()
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   useEffect(()=> {
    const checkUser = () => {
        const userToken = localStorage.getItem("token");
        if(!userToken || userToken === 'undefined') {
         setIsLoggedIn(false);
         return navigate('/');
        }
        setIsLoggedIn(true);
    } 
    checkUser();
   },[isLoggedIn])

   return (
    <>
    {isLoggedIn ? props.children: null}
    </>
   )
}
export default ProtectedRoute