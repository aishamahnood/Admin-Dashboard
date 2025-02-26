import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductRating from "../../../Components/ProductRating";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  Icon,
  Text,
  Image,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react"; // Import Chakra UI components
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { apiservice } from "../../../api";
import { setLoader } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [waterType, setWaterType] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [volume, setVolume] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const toast = useToast(); // Initialize toast for notifications

  const { shop, loader } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Image file change with preview
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setDragActive(false);

    // Image preview on drop
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoader(true));
      const obj = {
        shop: shop?._id,
        productName: name,
        waterType: waterType,
        volumeInLitres: volume,
        price: price,
        image: imagePreview,
        description: description,
      };
      const result = await apiservice.post("/api/product/add", obj);
      if (result?.data?.data) {
        toast({
          title: result?.data?.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      dispatch(setLoader(false));
      navigate('/products')
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: error?.message ?? "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} textAlign={"left"}>
        Add Product
      </Heading>
      <Text mb={4} color={"red"} textAlign={"left"}>
        {!shop?._id && "* Add Shop First"}
      </Text>
      <VStack
        spacing={4}
        align="stretch"
        bgColor={"white"}
        borderRadius={10}
        p={10}
      >
        <form
          onSubmit={handleSubmit}
          // encType="multipart/form-data"
          // method="POST"
        >
          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="price">Price:</FormLabel>
            <Input
              type="number"
              name="price"
              id="price"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="volume">Volume in Litres:</FormLabel>
            <Input
              type="number"
              name="volume"
              id="volume"
              autoComplete="off"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </FormControl>

          {/* Water Type */}
          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="stock">Water Type:</FormLabel>
            <RadioGroup
              onChange={(value) => setWaterType(value)}
              defaultValue="1"
            >
              <HStack gap="6">
                <Radio value="RO">RO</Radio>
                <Radio value="Mineral">Mineral</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          {/* Volume in Litres */}
          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Textarea
              name="description"
              id="description"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          {/* Image Upload */}
          <FormControl isDisabled={!shop?._id} isRequired my={5}>
            <FormLabel htmlFor="image">Image:</FormLabel>
            <Input
              type="url"
              name="image"
              value={imagePreview}
              onChange={(e) => setImagePreview(e?.target?.value)}
            />
            {/* <Box
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
                {file
                  ? file?.name
                  : "Drag and drop an image or click to upload"}
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
            </Box> */}

            {/* Image Preview */}
            {imagePreview && (
              <Box mt={4}>
                <Image src={imagePreview} alt="Preview" maxH="200px" />
              </Box>
            )}
          </FormControl>

          <Button
            isDisabled={!shop?._id}
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={loader}
            loadingText="Adding Product..."
          >
            Add Product
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default AddProduct;
