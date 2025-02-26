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
    useToast
  } from "@chakra-ui/react";
  import logo from "../../assets/app-logo.png";
  import { apiservice } from "../../api";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  
  const Rigester = () => {
    const toast = useToast()
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setename] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");
    const [city, setcity] = useState("");
    const  status  = ['error']
    const onregister = async () => {
      try {
        const response = await apiservice.post("/api/auth/register", {
          email: email,
          password: password,
          name:name,
          address:address,
          phone:phone,
          city:city,
          role:"admin"
        });
     
        // if (response?.data?.user) {
        
        // }
        if (response?.data?.user) {
            toast({
              title: "Account created",
              description: "We've created your account",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            navigate ("/login");
          }
      } catch (error) {
        toast({title:"This email has already account",
          status: 'error',
          duration: 9000,
          isClosable: true,
       
        });
        console.log("error",error)
    };
  }
    return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign up to your account</Heading>
            <FormControl id="name">
              <FormLabel>Enter your name</FormLabel>
              <Input type="name" onChange={(e)=>{setename(e.target.value)}} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>{setemail(e.target.value)}}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e)=>{setpassword(e.target.value)}} />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input type="address" onChange={(e)=>{setaddress(e.target.value)}}/>
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input type="phone" onChange={(e)=>{setphone(e.target.value)}}/>
            </FormControl>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input type="city" onChange={(e)=>{setcity(e.target.value)}}/>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                // justify={"space-between"}
              >
                <Text>already have an account? </Text>
                <Text cursor={"pointer"} color={"blue.500"}onClick={()=>{navigate("/login")}}>Sign in</Text>
              </Stack>
              <Button
                onClick={() => onregister()}
                colorScheme={"blue"}
                variant={"solid"}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} bgColor={"blackAlpha.100"}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              logo
              // 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    );
  };
  export default Rigester;