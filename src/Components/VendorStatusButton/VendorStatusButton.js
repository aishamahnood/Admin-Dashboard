// src/Components/VendorStatusButton/VendorStatusButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';
import { apiservice } from '../../api';

const VendorStatusButton = ({ vendor, onStatusChange }) => {
  const toggleStatus = () => {
    // Adjust the endpoint as needed based on your backend routes.
    apiservice
      .patch(`/api/admin/vendor/${vendor._id}/deactivate`)
      .then((res) => {
        // Pass updated vendor data to the parent component.
        onStatusChange(res.data.data);
      })
      .catch((err) => console.error("Error updating vendor status:", err));
  };

  return (
    <Button
      onClick={toggleStatus}
      colorScheme={vendor.status === 'active' ? 'red' : 'green'}
    >
      {vendor.status === 'active' ? 'Deactivate' : 'Activate'}
    </Button>
  );
};

export default VendorStatusButton;
