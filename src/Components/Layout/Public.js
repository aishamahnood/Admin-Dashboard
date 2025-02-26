import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Box,
  Text,
  Link,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, useToast } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, ViewIcon } from "@chakra-ui/icons";
// import '../css/index.css'
import { NavLink, useNavigate } from "react-router-dom";
import { apiServices } from "../../api";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
const Public = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let localuser = localStorage.getItem("user");
    // console.log('user',localuser)
    if (localuser) {
      const user = JSON.parse(localuser);
      const token = jwtDecode(user?.token);

      const expire = new Date(token.exp).getTime();
      const date = new Date().getTime();
      if (user && date > expire) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
    
  }, []);
  return<Component/>
};
export default Public;
