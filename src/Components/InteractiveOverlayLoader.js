// src/components/InteractiveOverlayLoader.js
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import './InteractiveOverlayLoader.css'; // Import CSS for animations

const InteractiveOverlayLoader = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
      flexDirection="column"
    >
      <div className="water-drop-loader">
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
      </div>
    </Box>
  );
};

export default InteractiveOverlayLoader;