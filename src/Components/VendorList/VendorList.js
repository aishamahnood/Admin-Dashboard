import React, { useEffect, useState } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { apiservice } from '../../api';
import VendorStatusButton from '../VendorStatusButton/VendorStatusButton';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  // Fetch vendors from your API endpoint (/api/shops)
  useEffect(() => {
    apiservice.get(`/api/shops`)
      .then((res) => {
        console.log("Vendor List Data:", res.data);
        const vendorList = res.data.data
          .filter(shop => shop.vendor) // Ensure vendor exists
          .map(shop => shop.vendor);
        setVendors(vendorList || []);
      })
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);
  
  return (
    <Box mt={6}>
      <Text fontSize="xl" mb={4}>Vendor List</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Vendor ID</Th>
            <Th>Shop Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vendors.map((vendor) => (
            <Tr
              key={vendor._id}
              cursor="pointer"
              onClick={() => navigate(`/admin/vendorDetails/${vendor._id}`)}


            >
              <Td>{vendor._id}</Td>
              <Td>{vendor.name || "No Name Available"}</Td>

              <Td>{vendor.email ? vendor.email : "No Email"}</Td>
              <Td>
                <VendorStatusButton 
                  vendor={vendor} 
                  onStatusChange={(updatedVendor) => {
                    console.log("Updated vendor:", updatedVendor);
                    setVendors((prevVendors) =>
                      prevVendors.map((v) =>
                        v._id === updatedVendor._id ? updatedVendor : v
                      )
                    );
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VendorList;
