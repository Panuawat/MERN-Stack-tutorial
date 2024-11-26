import {
  Box,
  IconButton,
  Heading,
  Image,
  Text,
  useColorModeValue,
  HStack,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.700", "gray.200");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toast({
        title: "Error.",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success.",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    if (!success) {
      toast({
        title: "Error.",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success.",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <Text noOfLines={2}>{product.description}</Text>
        <HStack spacing={2}>
          <IconButton onClick={onOpen} icon={<EditIcon />} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8}>
              <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Update Product
              </Heading>

              <Box
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                p={6}
                rounded={"lg"}
                shadow={"md"}
              >
                <VStack spacing={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Price"
                    name="price"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder={"Product Description"}
                    name="description"
                    value={updatedProduct.description}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Image"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
