import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react'; // Import Chakra UI components
import E404 from '../../assets/404.png';

export default function Er404() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bg="gray.100" // Background color
    >
      <Image 
        src={E404} 
        alt="404 Not Found" 
        boxSize="300px" // Adjusted size
        objectFit="contain" 
        mb={4} 
      />
      <Text fontSize="2xl" mb={4}>Page Not Found</Text>
      <Button colorScheme="teal" onClick={() => window.location.href = '/'}> 
        Go to Home
      </Button>
    </Box>
  );
}
