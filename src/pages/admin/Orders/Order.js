import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  // Example orders data
  const orders = [
    {
      id: 1,
      user: "User A",
      items: "2x 1L Water Bottles",
      status: "Delivered",
      deliveryDate: "2024-10-12",
    },
    {
      id: 2,
      user: "User B",
      items: "1x 5L Water Bottle",
      status: "Pending",
      deliveryDate: "2024-10-13",
    },
    {
      id: 3,
      user: "User C",
      items: "3x 10L Water Bottles",
      status: "Pending",
      deliveryDate: "2024-10-13",
    },
    {
      id: 4,
      user: "User D",
      items: "1x 2L Water Bottle",
      status: "Delivered",
      deliveryDate: "2024-10-12",
    },
    {
      id: 5,
      user: "User E",
      items: "4x 5L Water Bottles",
      status: "Pending",
      deliveryDate: "2024-10-14",
    },
  ];

  // Use media query to check if screen size is less than 768px (mobile devices)
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Heading
        as="h2"
        size="lg"
        mb={6}
        display={"flex"}
        flexDirection={"start"}
        mt={"20px"}
        paddingLeft={"20px"}
      >
        Daily Orders
      </Heading>

      <Box p={8} bg="white" shadow="md" borderRadius="lg" maxW="97%" mx="auto">
        {!isMobile ? (
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>User</Th>
                <Th>Items</Th>
                <Th>Status</Th>
                <Th>Delivery Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.user}</Td>
                  <Td>{order.items}</Td>
                  <Td>{order.status}</Td>
                  <Td>{order.deliveryDate}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          // Mobile-friendly layout
          <VStack spacing={4}>
            {orders.map((order) => (
              <Box
                key={order.id}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                width="100%"
                bg="gray.50"
              >
                <Text>
                  <strong>Order ID:</strong> {order.id}
                </Text>
                <Text>
                  <strong>User:</strong> {order.user}
                </Text>
                <Text>
                  <strong>Items:</strong> {order.items}
                </Text>
                <Text>
                  <strong>Status:</strong> {order.status}
                </Text>
                <Text>
                  <strong>Delivery Date:</strong> {order.deliveryDate}
                </Text>
                <Button
                  mt={2}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </Button>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </>
  );
};

export default Order;
