import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { apiservice } from "../../api";

// ✅ Required components register karo
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrdersChart = () => {
  const [chartData, setChartData] = useState(null);
  const shopId = "671e44ae4ee0be1b284eba4a"; // Tumhara shop ID

  useEffect(() => {
    let isMounted = true;

    apiservice
      .get(`/api/shops/${shopId}/stats`)
      .then((res) => {
        if (!isMounted) return;

        const data = res.data.data;
        const labels = data.monthlyData.map((item) => item.month);
        const ordersData = data.monthlyData.map((item) => item.orders);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Monthly Orders",
              data: ordersData,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.2)",
              fill: true,
              tension: 0.4, // ✅ Smooth curve
            },
          ],
        });
      })
      .catch((err) => console.error("Error fetching orders:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box mt={6} p={4} bg="white" shadow="md" borderRadius="md">
      <Text fontSize="lg" mb={2} textAlign="center">Monthly Orders</Text>
      {chartData ? (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          width="100%" 
          height="300px"
        > 
          <Box width="80%" height="100%">
            <Line data={chartData} options={options} />
          </Box>
        </Box>
      ) : (
        <Text textAlign="center">Loading...</Text>
      )}
    </Box>
  );
};

export default OrdersChart;
