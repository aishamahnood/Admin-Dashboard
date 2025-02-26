import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react"; // Import Chakra UI components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSlash } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import InteractiveOverlayLoader from "../../Components/InteractiveOverlayLoader";

import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { apiservice } from "../../api";
import { setLoader, setShop } from "../../store/userSlice";

const dummyOrders = [
  {
    _id: "1",
    user: {
      fullName: "User 1",
      email: "user1@example.com",
      address: "Address 1",
      city: "City 1",
    },
    product: { name: "Product 1" },
  },
  {
    _id: "2",
    user: {
      fullName: "User 2",
      email: "user2@example.com",
      address: "Address 2",
      city: "City 2",
    },
    product: { name: "Product 2" },
  },
  // ... add more orders as needed
];

const dummyProducts = [
  {
    _id: "1",
    name: "Product 1",
    description: "Description 1",
    price: 100,
    category: { name: "Category 1" },
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Description 2",
    price: 200,
    category: { name: "Category 2" },
  },
  // ... add more products as needed
];

export default function Shop() {
  const [product, setProduct] = useState(dummyProducts);
  const [order, setOrder] = useState(dummyOrders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loader, shop } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (!Boolean(Object.keys(shop).length) || user?.data?._id != shop?.vendor?._id) {
      fetchShop();
      dispatch(setLoader(true))
    }else {
      setFormData(shop)
      dispatch(setLoader(false))
    }
  }, [user?.data?._id]);
console.log("id",user?.data?._id)
  const fetchShop = async () => {
    try {
      if (user?.data?._id) {
        const result = await apiservice.get(
          `/api/shops/vendor/${user?.data?._id}`
        );
        dispatch(setLoader(false));
        if (Object.entries(result.data?.data ?? {}).length > 0) {
          setFormData(result.data?.data);
          dispatch(setShop(result.data?.data));
          dispatch(setLoader(false));
        }
      }
    } catch (error) {}
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      dispatch(setLoader(true));
      e.preventDefault();
      const obj = {};
      obj.vendor = user?.data?._id;
      obj.shopAddress = formData.shopAddress;
      obj.shopContact = formData.shopContact;
      obj.shopImage = formData.shopImage;
      obj.shopName = formData.shopName;

      const result = await apiservice.post("/api/shops/update", obj);
      if (result?.data?.data) {
        // dispatch(setLoader(true))
        toast({
          title: result?.data?.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setFormData(result?.data ?? {});
        await fetchShop();
      }
      dispatch(setLoader(false));
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
    <Box p={5}>
      {loader && <InteractiveOverlayLoader/>}
      <Heading textAlign="left" mb={5}>
        Shop
      </Heading>
      {/* {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">Error loading data</Text>
      ) : (
        <>
          <Box mb={10}>
            <Heading textAlign="left" size="md" mb={3}>
              Top Products
            </Heading>
            {product.length === 0 ? (
              <Text>No products available</Text>
            ) : (
              <Box overflowX="auto">
                <Table
                  variant="simple"
                  bgColor={"white"}
                  borderRadius={10}
                  shadow={"xl"}
                >
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Description</Th>
                      <Th>Price</Th>
                      <Th>Category</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {product.map((prod) => (
                      <Tr key={prod._id}>
                        <Td>{prod.name}</Td>
                        <Td>{prod.description}</Td>
                        <Td>{prod.price}</Td>
                        <Td>{prod.category?.name}</Td>
                        <Td>
                          <Button
                            colorScheme="blue"
                            // onClick={() => deleteProduct(prod._id)}
                            mx={1}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => deleteProduct(prod._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box> // End of Box for responsiveness
            )}
          </Box>

          <Box>
            <Heading textAlign="left" size="md" mb={3}>
              Latest Orders
            </Heading>
            {order.length === 0 ? (
              <Text>No orders available</Text>
            ) : (
              <Box overflowX="auto">
                <Table
                  variant="simple"
                  bgColor={"white"}
                  borderRadius={10}
                  shadow={"xl"}
                >
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Address</Th>
                      <Th>City</Th>
                      <Th>Product</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.map((ord) => (
                      <Tr key={ord._id}>
                        <Td>{ord.user?.fullName}</Td>
                        <Td>{ord.user?.email}</Td>
                        <Td>{ord.user?.address}</Td>
                        <Td>{ord.user?.city}</Td>
                        <Td>{ord.product?.name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box> // End of Box for responsiveness
            )}
          </Box>
        </>
      )} */}

      <Box
        maxW="100%"
        mx="auto"
        mt="8"
        p="6"
        boxShadow="lg"
        borderRadius="md"
        borderWidth="1px"
        backgroundColor={"white"}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl id="shopName" isRequired>
              <FormLabel>Shop Name</FormLabel>
              <Input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="shopAddress" isRequired>
              <FormLabel>Shop Address</FormLabel>
              <Input
                type="text"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="shopContact" isRequired>
              <FormLabel>Shop Contact</FormLabel>
              <Input
                type="text"
                name="shopContact"
                value={formData.shopContact}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="shopImage">
              <FormLabel>Shop Image URL</FormLabel>
              <Input
                type="url"
                name="shopImage"
                value={formData.shopImage}
                onChange={handleChange}
              />
            </FormControl>

            {formData.shopImage && (
              <Image
                src={formData.shopImage}
                alt="Shop Image"
                borderRadius="md"
                boxSize="150px"
                objectFit="cover"
              />
            )}

            {/* <FormControl id="isCertified">
              <Checkbox
                name="isCertified"
                isChecked={formData.isCertified}
                onChange={handleChange}
              >
                Is Certified
              </Checkbox>
            </FormControl> */}

            <Button isLoading={loader} colorScheme="teal" type="submit">
              {loader ? "Loading..." : "Submit"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
