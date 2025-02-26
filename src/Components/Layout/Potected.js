import React from "react";
// import '../css/index.css'
import { NavLink, useNavigate } from "react-router-dom";
import { apiservice } from "../../api";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setShop, setUser } from "../../store/userSlice";

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shop, user } = useSelector((state) => state?.user);

  useEffect(() => {
    let localuser = localStorage.getItem("user");
    if (localuser) {
      const user = JSON.parse(localuser);
      dispatch(setUser(user));
      if (
        Boolean(Object.keys(user).length) &&
        !Boolean(Object.keys(shop).length)
      ) {
        fetchShop(user);
      }
      const token = jwtDecode(user?.token);

      const expire = new Date(token.exp).getTime();
      const date = new Date().getTime();
      if (!user || date < expire) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const fetchShop = async (user) => {
    try {
      if (user?.data?._id) {
        const result = await apiservice.get(
          `/api/shops/vendor/${user?.data?._id}`
        );
        if (Object.entries(result.data?.data ?? {}).length > 0) {
          dispatch(setShop(result.data?.data));
        }
      }
    } catch (error) {}
  };

  return <div>{children}</div>;
};
export default Protected;
