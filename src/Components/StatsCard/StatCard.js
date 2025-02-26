import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const StatsCard = ({ title, value, subtext, icon }) => {
  return (
    <MotionBox
      bg="white"
      p={4}
      borderRadius="md"
      shadow="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex direction="column">
        <Text fontSize="sm" color="gray.500">{title}</Text>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        <Text fontSize="xs" color="gray.600">{subtext}</Text>
      </Flex>
    </MotionBox>
  );
};

export default StatsCard;
