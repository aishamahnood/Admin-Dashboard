// src/pages/admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Box, Grid, Heading, Container } from '@chakra-ui/react';
import { apiservice } from '../../api';
import StatsCard from '../../Components/StatsCard/StatCard';
import OrdersChart from '../../Components/OrdersChart/OrdersChart';
// import RevenueChart from '../../Components/RevenueChart/RevenueChart';
import ShopsFilter from '../../Components/ShopsFilter';
import InteractiveOverlayLoader from '../../Components/InteractiveOverlayLoader';
import { FaUsers, FaShoppingCart, FaWater } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiservice.get('/api/admin/stats')
      .then(res => {
         setStats(res.data);
         setLoading(false);
      })
      .catch(err => {
         console.error("Error fetching admin stats:", err);
         setLoading(false);
      });
  }, []);

  return (
    <Box bg="gray.50" minH="100vh" p={{ base: 4, md: 8 }}>
      {loading && <InteractiveOverlayLoader />}
      <Container maxW="1400px">
        <Heading size="lg" alignSelf="flex-start">Admin Dashboard</Heading>
        <br/>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <StatsCard 
            title="Total Users" 
            value={stats.totalUsers || 0} 
            subtext="Customers & Vendors" 
            icon={FaUsers}
          />
          <StatsCard 
            title="Total Vendors" 
            value={stats.totalVendors || 0} 
            subtext="Active, Pending, Banned" 
            icon={FaUsers}
          />
          <StatsCard 
            title="Total Orders" 
            value={stats.totalDeliveries || 0} 
            subtext="Completed & Pending" 
            icon={FaShoppingCart}
          />
          <StatsCard 
            title="Total Complaints" 
            value={stats.totalComplaints || 0} 
            subtext="Pending & Resolved" 
            icon={FaWater}
          />
        </Grid>
        {/* Insert interactive components */}
        <ShopsFilter />
        <OrdersChart />
        {/* <RevenueChart /> */}
      </Container>
    </Box>
  );
};

export default Dashboard;
