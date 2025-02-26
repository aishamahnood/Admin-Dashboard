import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { apiservice } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setDeliver } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../store/userSlice";
import InteractiveOverlayLoader from "../../Components/InteractiveOverlayLoader";
import Subscriptions from "./Subscriptions";
import { useToast } from "@chakra-ui/react";
const Deliver = () => {
  const { shop, deliver, loader, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [quantity, setquantity] = useState("");
  const [productName, setproductName] = useState("");
  const toast = useToast();

  useEffect(() => {
    dispatch(setLoader(true));
    fetchDeliver();
  }, [shop]);

  const markcomplete = async (e) => {
    try {
      const obj = {};
      obj.shop = e?.shop;
      obj.user = e?.user;
      obj.subscription = e?._id;
      obj.isDelivered = true;
      obj.quantity = e?.quantity;
      const complete = await apiservice.post(
        "/api/deliveries/mark-delivered",
        obj
      );
      if (complete?.data?.data) {
        toast({
          title: complete?.data?.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
    fetchDeliver();
  };

  const fetchDeliver = async () => {
    try {
      dispatch(setLoader(true));
      if (shop?._id) {
        const result = await apiservice.get(
          `/api/deliveries/shop/${shop?._id}/today`
        );
        dispatch(setLoader(false));
        setname(result?.data?.name);
        setaddress(result?.data?.address);
        setquantity(result?.data?.quantity);
        setproductName(result?.data?.productDetails?.productName);
        if (result?.data?.data?.length > 0) {
          dispatch(setDeliver(result?.data?.data));
        } else {
          dispatch(setDeliver([]));
        }
      }else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  return (
    <Stack p={5} alignItems={"flex-start"}>
      {loader && <InteractiveOverlayLoader />}
      <Box
        width={"full"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Heading size="xl">Today Deliveries</Heading>
      </Box>
      <Box
        mt="8"
        p="6"
        boxShadow="lg"
        borderRadius="md"
        borderWidth="1px"
        backgroundColor={"white"}
        width={"100%"}
      >
        <Box overflowX="auto">
          <Table width={"100%"} variant="striped">
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Price</Th>
                <Th>quantity</Th>
                <Th>Customer address</Th>
                <Th>Customer Phone</Th>
              </Tr>
            </Thead>
            <Tbody>
              {deliver.length > 0 ? (
                deliver.map((order, index) => (
                  <Tr key={order.id}>
                    <Td>{order?.productDetails?.productName}</Td>
                    <Td>{order?.productDetails?.price}</Td>
                    <Td>{order?.quantity}</Td>
                    <Td>{order?.address}</Td>
                    <Td>{order?.userDetails?.phone}</Td>

                    <Td>
                      <HStack spacing={2}>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() => markcomplete(order)}
                        >
                          Mark as complete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    No products found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
};

export default Deliver;
