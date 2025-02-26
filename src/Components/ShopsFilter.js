import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Box, Text } from '@chakra-ui/react';
import { apiservice } from '../api';
import { useSelector } from "react-redux";

const ShopsFilter = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [shops, setShops] = useState([]);

  // Get token from Redux or localStorage
  const user = useSelector((state) => state.user || {}); 
  const token = user?.token || localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("🔴 Token not found!");
      return;
    }
  
    apiservice.get('/api/shops', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("✅ Shops Data:", res.data);
        if (!res.data.data) {
          console.error("⚠ Unexpected API response format!");
          return;
        }
  
        // Extract vendor data
        const vendorsList = res.data.data
          .filter(shop => shop.vendor && shop.vendor._id)  // Ensure vendor exists
          .map(shop => ({
            value: shop.vendor._id,
            label: shop.vendor.name || "Unknown Vendor"
          }));
  
        console.log("✅ Vendor List:", vendorsList);
        setVendors(vendorsList);
      })
      .catch((err) => console.error("⚠ Error fetching vendors:", err));
  }, [token]);
  

  const handleVendorChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
    if (!selectedOption) {
      setShops([]);
      return;
    }

    apiservice.get(`/api/shops/filter?vendorId=${selectedOption.value}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("✅ Filtered Shops Data:", res.data);
        setShops(res.data.data || []);
      })
      .catch((err) => console.error("⚠ Error fetching filtered shops:", err));
  };

  return (
    <Box p={4} border="1px solid #ddd" borderRadius="md" mb={6}>
      <Text mb={2}>Filter Shops by Vendor:</Text>
      
      <Select 
  options={vendors} 
  placeholder={vendors.length > 0 ? "Select Vendor" : "No Vendors Available"} 
  value={selectedVendor}
  onChange={handleVendorChange}
  isClearable
/>


      <Box mt={4}>
        {shops.length > 0 ? (
          shops.map(shop => (
            <Box key={shop._id} p={2} mb={2} border="1px solid #ccc" borderRadius="sm">
              <Text fontWeight="bold">{shop.shopName}</Text>
              <Text>{shop.shopAddress}</Text>
            </Box>
          ))
        ) : (
          <Text>No shops found for the selected vendor.</Text>
        )}
      </Box>
    </Box>
  );
};

export default ShopsFilter;
