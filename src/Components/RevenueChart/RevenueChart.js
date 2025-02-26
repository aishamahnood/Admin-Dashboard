// import React, { useEffect, useState } from 'react';
// import { Box, Text } from '@chakra-ui/react';
// import { Line } from 'react-chartjs-2';
// import { apiservice } from '../../api';

// const RevenueChart = () => {
//   const [chartData, setChartData] = useState(null); // Initially null

//   useEffect(() => {
//     apiservice.get('/api/admin/stats')
//       .then(res => {
//         console.log("🟢 API Response:", res.data); // Debugging ke liye
//         console.log("🟢 RevenueChart Component Rendered!");
//         if (res.data && res.data.monthlyData) {
//           const labels = res.data.monthlyData.map(item => item.month);
//           const data = res.data.monthlyData.map(item => item.orders);

//           setChartData({
//             labels,
//             datasets: [
//               {
//                 label: "Total Orders",
//                 data,
//                 borderColor: "blue",
//                 fill: false,
//               }
//             ]
//           });
//         } else {
//           console.error("🔴 API Response is Empty or Invalid!");
//         }
//       })
//       .catch(err => console.error("🔴 Error fetching orders stats:", err));
//   }, []);

//   return (
//     <Box mt={6} p={4} bg="white" shadow="md" borderRadius="md">
//       <Text fontSize="lg" mb={2}>Monthly Orders</Text>
//       {!chartData ? <Text>Loading...</Text> : <Line data={chartData} />}
//     </Box>
//   );
// };

// export default RevenueChart;
