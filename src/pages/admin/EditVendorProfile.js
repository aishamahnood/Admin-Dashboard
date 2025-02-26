import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Text,
  Heading,
  FormLabel,
  FormControl,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setLoader, setUser } from "../../store/userSlice";
import { apiservice } from "../../api";
import { EmailIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";

const EditVendorProfile = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { user } = useSelector((state) => state.user);
  const [Name, setName] = useState(user?.data?.name ?? "");
  const [Address, setAddress] = useState(user?.data?.address ?? "");
  const [Contact, setContact] = useState(user?.data?.phone ?? " ");
  const [Email, setEmail] = useState(user?.data?.email ?? " ");
  const [Image, setImage] = useState(null);
  const { loader } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setName(user?.data?.name),
      setEmail(user?.data?.email),
      setContact(user?.data?.phone),
      setAddress(user?.data?.address);
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes logic here...
    navigate("/vendor-profile"); // Redirect to Vendor Profile after saving changes
  };

  const Save = async () => {
    try {
      dispatch(setLoader(true));

      const id = await apiservice.put(`/api/user/${user?.data?._id}`, {
        name: Name,
        email: Email,
        phone: Contact,
        address: Address,
      });
      dispatch(setLoader(false));
     dispatch(setUser(id?.data))
    } catch (error) {
      dispatch(setLoader(false));
      console.log("save err",error);
    }
  };

  return (
    <Box >
      <Box p={5}>
        <Heading
          as="h2"
          size="lg"
          color="black"
          mb={6}
          mt={"20px"}
          display={"flex"}
          flexDirection={"start"}
        >
          Edit Profile
        </Heading>
        <VStack
          spacing={4}
          align="stretch"
          bgColor={"white"}
          borderRadius={10}
          p={10}
         
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired my={5}>
              <FormLabel htmlFor="name">Name:</FormLabel>
            </FormControl>
            <FormControl isRequired my={5}>
              <Input
                
                mt={"10px"}
                placeholder=" Name"
                value={Name}
                display={"flex"}
                flex={"start"}
                onChange={(e) => setName(e.target.value)}
                required
                mb={4}
              />
            </FormControl>
            <FormControl isRequired my={5}>
              <FormLabel htmlFor="name"> Address:</FormLabel>

              <Input
              
                mt={"10px"}
                placeholder=" Address"
                display={"flex"}
                flex={"start"}
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
                mb={4}
              />
            </FormControl>
            <FormControl isRequired my={5}>
              <FormLabel htmlFor="name"> Contact:</FormLabel>
              <Input
               
                mt={"10px"}
                display={"flex"}
                flex={"start"}
                placeholder="Contact"
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
                required
                mb={4}
              />
            </FormControl>
            <FormControl isRequired my={5}>
              <FormLabel htmlFor="name"> Email:</FormLabel>
              <Input
               
                mt={"10px"}
                placeholder="Email"
                display={"flex"}
                flex={"start"}
                disabled
                value={Email}
                onChange={(e) => setEmail(Email)}
                required
                mb={4}
              />
            </FormControl>
            {/* <FormControl isRequired my={5}>
                <FormLabel htmlFor="name">Shop image:</FormLabel>
                <Input
                  w={"100%"}
                  mt={"10px"}
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  mb={4}
                />
              </FormControl> */}
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                colorScheme="teal"
                disabled={loader}
                onClick={() => {
                  Save();
                }}
              >
                {loader ? "Loading..." : "Save change"}
              </Button>
            </Box>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditVendorProfile;
