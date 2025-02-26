import React from "react"; // Add this line
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Link,
  Image,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { FiMapPin, FiPhone, FiMail, FiUpload, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const VendorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate(); // useNavigate hook for navigation
  const vendor = {
    name: user?.data?.name ?? "WaterWorks Store",
    image: "https://via.placeholder.com/150", // Vendor image
    address: user?.data?.address ?? "123 Vendor St, City, Country",
    phone: user?.data?.phone ?? "123-456-7890",
    email: user?.data?.email ?? "vendor@example.com",
    website: "https://vendorwebsite.com",
    description:
      user?.data?.address ??
      "We provide the best quality water to keep you hydrated!",
    rating: 4.5,
  };

  // States for image upload
  const [file, setFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);

  // Handlers for file upload
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreview(URL.createObjectURL(droppedFile));
  };

  return (
    <>
      {" "}
      <Heading
        as="h2"
        size="lg"
        mb={6}
        mt={"20px"}
        display={"flex"}
        flexDirection={"start"}
        paddingLeft={"20px"}
      >
        Profile
      </Heading>
      <Box p={6} bg="white" shadow="md" borderRadius="lg" maxW="97%" mx="auto">
        <Flex direction={{ base: "column", md: "row" }}>
          <Box ml={{ md: 8 }} w="full">
            <Flex alignItems="center" mb={3}>
              <Avatar
                size={"xl"}
                src={
                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </Flex>
            <Flex alignItems="center" mb={3}>
              <FiUser />
              <Text ml={2}>{vendor.name}</Text>
            </Flex>
            <Flex alignItems="center" mb={3}>
              <FiMapPin />
              <Text ml={2}>{vendor.address}</Text>
            </Flex>
            <Flex alignItems="center" mb={3}>
              <FiPhone />
              <Text ml={2}>{vendor.phone}</Text>
            </Flex>
            <Flex alignItems="center" mb={3}>
              <FiMail />
              <Text ml={2}>{vendor.email}</Text>
            </Flex>
          </Box>

          <Button colorScheme="teal" onClick={() => navigate("/edit-vendor")}>
            Edit Profile
          </Button>
        </Flex>

        {/* Centered Visit Website Link */}
        {/* <Flex justifyContent="center" mt={4}>
        <Link href={vendor.website} isExternal color="teal.500" fontSize="lg" fontWeight="bold">
          Visit Website
        </Link>
      </Flex> */}

        {/* Image Upload */}
        {/* <FormControl isRequired my={5}>
        <FormLabel htmlFor="image">Shop Image:</FormLabel>
        <Box
          border="2px dashed"
          borderColor={dragActive ? "teal.500" : "gray.300"}
          borderRadius="md"
          p={6}
          textAlign="center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          position="relative"
          bg={dragActive ? "teal.50" : "white"}
          transition="all 0.3s ease"
        >
          <Icon as={FiUpload} boxSize={10} color="gray.400" mb={2} />
          <Text color="gray.500">
            {file ? file?.name : "Drag and drop an image or click to upload"}
          </Text>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            opacity={0}
            cursor="pointer"
          />
        </Box>
        {imagePreview && (
          <Box mt={4}>
            <Image src={imagePreview} alt="Preview" maxH="200px" />
          </Box>
        )}
      </FormControl> */}
      </Box>
    </>
  );
};

export default VendorProfile;
