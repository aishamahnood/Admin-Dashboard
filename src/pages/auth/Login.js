import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import logo from "../../assets/app-logo.png";
import { apiservice } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLoader, setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loader } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onlogin = async () => {
    try {
      dispatch(setLoader(true));
      const response = await apiservice.post("/api/auth/login", {
        email: email,
        password: password,
        role: "admin"
      });
      dispatch(setLoader(false));
      // Save the user data (including token, _id, shop, etc.) in Redux
      dispatch(setUser(response.data));
      // Save the same data in localStorage for later use in other components
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Debug: Check in console that the user data is saved
      console.log("User data saved in localStorage:", JSON.parse(localStorage.getItem("user")));
      
      toast({
        title: "Login successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Navigate to dashboard or home page
      navigate("/");
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.500"} cursor={"pointer"}>Forgot password?</Text>
            </Stack>
            <Button
              onClick={onlogin}
              colorScheme={"blue"}
              variant={"solid"}
              disabled={loader}
            >
              {loader ? "Loading..." : "Sign in"}
            </Button>
            <Stack display={"flex"} flexDirection={"row"}>
              <Text>you don't have an account?</Text>
              <Text cursor={"pointer"} color={"blue.500"} onClick={()=> navigate("/signup")}>Signup</Text>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} bgColor={"blackAlpha.100"}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={logo}
        />
      </Flex>
    </Stack>
  );
};

export default Login;
