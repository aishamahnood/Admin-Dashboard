import { useEffect, useState } from "react";
import { Box, Text, Spinner, VStack } from "@chakra-ui/react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box p={5}>
      {loading ? (
        <Spinner />
      ) : orders.length > 0 ? (
        <VStack spacing={4}>
          {orders.map((order) => (
            <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Text>Order ID: {order.id}</Text>
              <Text>Status: {order.status}</Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box textAlign="center" alignContent={"center"} height="600" p={5}>
          <Text fontSize="4xl" color="gray.500">
            No orders found
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Orders;
