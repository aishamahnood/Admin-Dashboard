import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { apiservice } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoader } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import InteractiveOverlayLoader from "../../../Components/InteractiveOverlayLoader";

const Products = () => {
  const { shop, products, loader } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const cancelRef = React.useRef();

  useEffect(() => {
    dispatch(setLoader(true));
    fetchProducts();
  }, [shop]);

  const fetchProducts = async () => {
    try {
      dispatch(setLoader(true));
      if (shop?._id) {
        const result = await apiservice.get(`/api/product/shop/${shop?._id}`);
        dispatch(setLoader(false));
        if (result?.data?.data?.length > 0) {
          dispatch(setProducts(result?.data?.data));
        }
      }else {
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: "Error fetching products",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoader(true));
      const result = await apiservice.put(`/api/product/${editingProduct._id}`, editingProduct);
      dispatch(setLoader(false));
      if (result.status == 200) {
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsEditModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: "Error updating product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    try {
      dispatch(setLoader(true));
      const result = await apiservice.delete(`/api/product/${deletingProductId}`);
      dispatch(setLoader(false));
      if (result.status == 200) {
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchProducts();
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast({
        title: "Error deleting product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setDeletingProductId(null);
    }
  };

  return (
    <Stack p={5} alignItems={"flex-start"}>
      {loader && <InteractiveOverlayLoader />}
      <Box
        width={"full"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Heading size="xl">Products</Heading>
        <Button
          onClick={() => navigate('/add-product')}
          colorScheme="teal"
        >
          Add Product
        </Button>
      </Box>
      <Box
        mt="8"
        p="6"
        boxShadow="lg"
        borderRadius="md"
        borderWidth="1px"
        backgroundColor={"white"}
        width={"100%"}
      >
        <Box overflowX="auto">
          <Table width={"100%"} variant="striped">
            <Thead>
              <Tr>
                <Th>Count</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Volume</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.length > 0 ? (
                products.map((prod, index) => (
                  <Tr key={prod._id}>
                    <Td>{index + 1}</Td>
                    <Td alignItems={"center"}>
                      <Image src={prod?.image} height={"50"} width={"50"} />
                    </Td>
                    <Td>{prod.productName}</Td>
                    <Td>{prod.price}</Td>
                    <Td>{prod?.volumeInLitres}</Td>
                    <Td>{prod?.waterType}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() => handleEdit(prod)}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(prod._id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    No products found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleEditSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={editingProduct?.productName || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, productName: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Water Type</FormLabel>
                <Select
                  value={editingProduct?.waterType || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, waterType: e.target.value })}
                >
                  <option value="RO">RO</option>
                  <option value="Mineral">Mineral</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Volume (in Litres)</FormLabel>
                <Input
                  type="number"
                  value={editingProduct?.volumeInLitres || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, volumeInLitres: parseFloat(e.target.value) })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={editingProduct?.price || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={editingProduct?.image || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  value={editingProduct?.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteAlertOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
};

export default Products;

