import {
    Box,
    Text,
    Heading,
    SimpleGrid,
    Spinner,
    Badge,
    Flex,
    Stack,
    Button,
    useDisclosure,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useProductsView } from "../../shared/hooks/products";
import { CartModal } from "./CartModal";

export const ShoppingView = () => {
    const { products, isLoading } = useProductsView()
    const [cart, setCart] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const typeAccount = user.typeAccount

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product._id === product._id)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        })
    }

    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" />
            </Flex>
        )
    }

    if (!products.length) {
        return (
            <Text textAlign="center" mt={10} fontSize="lg">
                No hay productos disponibles.
            </Text>
        )
    }

    return (
        <Box p={6} position="relative">
            <Heading textAlign="center" mb={6}>
                Productos Disponibles
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                {products.map((product) => (
                    <Box
                        key={product._id}
                        borderWidth="1px"
                        borderRadius="2xl"
                        boxShadow="lg"
                        p={5}
                        bg="white"
                        _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                        transition="all 0.3s"
                    >
                        <Stack spacing={3}>
                            <Heading size="md" color="teal.600">
                                {product.nameProduct}
                            </Heading>

                            <Text color="gray.600" fontSize="sm">
                                {product.description}
                            </Text>

                            <Text fontWeight="bold" fontSize="lg" color="green.500">
                                Q{product.price}
                            </Text>

                            <Text fontSize="sm" color="gray.500">
                                Empresa:{" "}
                                <Badge colorScheme="purple">
                                    {product.keeperUser?.nombreEmpresa || "N/A"}
                                </Badge>
                            </Text>

                            <Text fontSize="xs" color="gray.400">
                                Publicado: {new Date(product.createdAt).toLocaleDateString()}
                            </Text>

                            <Button colorScheme="blue" size="sm" onClick={() => addToCart(product)}>
                                Agregar al carrito
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </SimpleGrid>

             {(typeAccount === "EMPRESARIAL") && (
                <Button colorScheme="blue" size="sm" onClick={() => addToCart(product)}>
                    Agregar Producto
                </Button>
             )}
        
            {cart.length > 0 && (
                <IconButton
                    icon={<AddIcon />}
                    colorScheme="green"
                    position="fixed"
                    bottom="30px"
                    right="30px"
                    borderRadius="full"
                    size="lg"
                    onClick={onOpen}
                    zIndex={10}
                    aria-label="Abrir carrito"
                />
            )}

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
              <ModalOverlay />
              <ModalContent>
                <CartModal cart={cart} setCart={setCart} onClose={onClose} />
              </ModalContent>
            </Modal>

        </Box>
    )
}
