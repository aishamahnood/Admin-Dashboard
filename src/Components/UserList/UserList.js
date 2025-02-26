// UserList.js
import React, { useEffect, useState } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { apiservice } from '../../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiservice.get('/api/user')
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <Box mt={6}>
      <Text fontSize="xl" mb={4}>All Users</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user._id} onClick={() => navigate(`/admin/users/${user._id}`)}
              cursor="pointer">
              <Td>{user._id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserList;
