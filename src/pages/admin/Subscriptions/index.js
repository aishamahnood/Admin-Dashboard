import React, { useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { apiservice } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setLoader, setSubscriptions } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import InteractiveOverlayLoader from "../../../Components/InteractiveOverlayLoader";

const Subscriptions = () => {
  const { shop, subscriptions, loader } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Toast = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, [shop]);

  const fetchSubscriptions = async () => {
    try {
      dispatch(setLoader(true));
      if (shop?._id) {
        const result = await apiservice.get(
          `/api/subscription/shop/${shop?._id}`
        
        );
        if (result?.data?.data?.length > 0) {
          dispatch(setSubscriptions(result?.data?.data));
        }
      }
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  const handleStatusChange = async (status, id) => {
    try {
      dispatch(setLoader(true));
      const result = await apiservice.patch("/api/subscription", {
        id: id,
        status: status,
      });
      if (result.status == 200) {
        await fetchSubscriptions();
        Toast({
          title: "Subscription Status Change to " + status,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Toast({
          title: result?.data?.message ?? "Something Went Wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      dispatch(setLoader(false));
    } catch (error) {
      console.log("error", error);
      dispatch(setLoader(false));
      Toast({
        title:
          error?.response?.data?.message ??
          error?.message ??
          "Something Went Wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
        <Heading size="xl">Subscription</Heading>
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
                <Th>Quantity</Th>
                <Th>User Name</Th>
                <Th>Delivery Option</Th>
                <Th>Address</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((item, index) => (
                  <Tr key={item._id}>
                    <Td>{item?.product?.productName}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item?.user?.name}</Td>
                    <Td>{item?.deliveryOption}</Td>
                    <Td>{item?.address}</Td>
                    <Td>{item?.status}</Td>
                    <Td>
                      {item?.status == "Pending" ? (
                        <HStack spacing={2}>
                          <Button
                            colorScheme="teal"
                            size="sm"
                            onClick={() =>
                              handleStatusChange("Active", item._id)
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() =>
                              handleStatusChange("Cancelled", item._id)
                            }
                          >
                            Reject
                          </Button>
                        </HStack>
                      ) : (
                        <HStack spacing={2}>
                          <Button
                            isDisabled={item?.status == "Cancelled"}
                            colorScheme="red"
                            size="sm"
                            onClick={() =>
                              handleStatusChange("Cancelled", item._id)
                            }
                          >
                            {item?.status == "Cancelled"
                              ? "Cancelled"
                              : "Cancel"}
                          </Button>
                        </HStack>
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    No Subscription found.
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

export default Subscriptions;
