import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

const ProductRating = ({ rating, setRating }) => {
  return (
    <Box>
      <FormControl isRequired my={5}>
        <FormLabel htmlFor="rating">Rating:</FormLabel>
        <Input
          type="number"
          name="rating"
          id="rating"
          autoComplete="off"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min={0}
          max={5}
        />
      </FormControl>
    </Box>
  );
};

export default ProductRating;
