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
    ModalContent,
    useColorModeValue,
    Icon,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { useState, useRef } from "react";
import { useProductsView, useProductsIdView } from "../../shared/hooks/products";
import { useAddShoppingsPoints } from "../../shared/hooks/shopping";
import { CartModal } from "./CartModal";
import { ModalProductAdd } from "../../components/Product/ModalProductAdd";
import { ModalConfirDelete } from "../../components/Product/ModalConfirDelete";
import { ModalProductUpdate } from "../Product/ModalProductUpdate";
import { BillDetailModal } from "../Bill/BillDetailModal";
import { PrintableBillContent } from "../Bill/PrintableBillContent";

export const ShoppingView = () => {
    const [cart, setCart] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const printableRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const keeperUser = user?.id;
    const typeAccount = user?.typeAccount;

    const isEmpresarial = typeAccount === "EMPRESARIAL";

    const { products: allProducts, isLoading: loadingAll } = useProductsView();
    const { products: userProducts, isLoading: loadingUser } = useProductsIdView(isEmpresarial ? keeperUser : null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editProductData, setEditProductData] = useState(null);
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    const products = isEmpresarial ? userProducts : allProducts;
    const isLoading = isEmpresarial ? loadingUser : loadingAll;

    const { addComraPoints } = useAddShoppingsPoints();

    const handleBuyWithPoints = async (items) => {
        await addComraPoints(keeperUser, items);
        onClose();
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.product._id === product._id
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };

    const handleEdit = (product) => {
        setEditProductData(product);
        onEditOpen();
    };

    const handleDelete = (product) => {
        setSelectedProductId(product._id);
        setDeleteModalOpen(true);
    };

    const bgColor = useColorModeValue("gray.50", "gray.800");
    const cardBg = useColorModeValue("white", "gray.700");
    const headingColor = useColorModeValue("purple.700", "purple.300");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const priceColor = useColorModeValue("green.600", "green.300");
    const pointsColor = useColorModeValue("orange.500", "orange.300");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const buttonColorScheme = "purple";
    const addProductButtonColor = "blue";
    const cartButtonColor = "green";

    if (isLoading) {
        return (
            <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
                <Spinner size="xl" color={buttonColorScheme + ".500"} />
            </Flex>
        );
    }

    return (
        <Box p={{ base: 4, md: 8 }} bg={bgColor} minH="100vh">
            <Flex justify="space-between" align="center" mb={{ base: 6, md: 10 }} direction={{ base: "column", md: "row" }} gap={4}>
                <Heading size={{ base: "xl", md: "2xl" }} color={headingColor} textAlign={{ base: "center", md: "left" }}>
                    <Icon as={FaStore} mr={3} color={headingColor} />
                    Tienda 
                </Heading>
                {isEmpresarial && (
                    <Button
                        colorScheme={addProductButtonColor}
                        onClick={onAddOpen}
                        leftIcon={<AddIcon />}
                        size="lg"
                        boxShadow="lg"
                        _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                        transition="all 0.2s ease"
                    >
                        Agregar Producto
                    </Button>
                )}
            </Flex>

            {products.length === 0 ? (
                <Text textAlign="center" mt={10} fontSize="xl" color={textColor}>
                    {isEmpresarial
                        ? "Aún no tienes productos publicados. ¡Es hora de agregar algunos!"
                        : "Parece que no hay productos disponibles en este momento. Vuelve pronto."}
                </Text>
            ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: 6, md: 8 }}>
                    {products.map((product) => (
                        <Box
                            key={product._id}
                            borderWidth="1px"
                            borderRadius="xl"
                            borderColor={borderColor}
                            boxShadow="md"
                            p={6}
                            bg={cardBg}
                            _hover={{ boxShadow: "xl", transform: "translateY(-3px)", borderColor: buttonColorScheme + ".300" }}
                            transition="all 0.3s ease-in-out"
                        >
                            <Stack spacing={3}>
                                <Heading size="md" color={headingColor}>
                                    {product.nameProduct}
                                </Heading>

                                <Text color={textColor} fontSize="sm" noOfLines={2}>
                                    {product.description}
                                </Text>

                                <Flex justify="space-between" align="center">
                                    <Text fontWeight="bold" fontSize="xl" color={priceColor}>
                                        Q{product.price?.toFixed(2) || '0.00'}
                                    </Text>
                                    <Text fontWeight="bold" fontSize="lg" color={pointsColor}>
                                        {product.price} Puntos
                                    </Text>
                                </Flex>

                                <Text fontSize="sm" color="gray.500">
                                    Empresa:{" "}
                                    <Badge colorScheme="purple" variant="solid" px={2} py={1} borderRadius="md">
                                        {product.keeperUser?.nombreEmpresa || "N/A"}
                                    </Badge>
                                </Text>

                                <Text fontSize="xs" color="gray.400">
                                    Publicado: {new Date(product.createdAt).toLocaleDateString("es-ES")}
                                </Text>

                                {!isEmpresarial && (
                                    <Button
                                        colorScheme={buttonColorScheme}
                                        size="md"
                                        onClick={() => addToCart(product)}
                                        leftIcon={<Icon as={FaShoppingCart} />}
                                        mt={3}
                                        _hover={{ bg: buttonColorScheme + ".600", transform: "scale(1.02)" }}
                                    >
                                        Agregar al Carrito
                                    </Button>
                                )}


                                {isEmpresarial && (
                                    <Flex gap={3} mt={3}>
                                        <Button
                                            leftIcon={<EditIcon />}
                                            size="sm"
                                            colorScheme="purple"
                                            variant="outline"
                                            onClick={() => handleEdit(product)}
                                            flex="1"
                                            _hover={{ bg: "purple.50" }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            leftIcon={<DeleteIcon />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => handleDelete(product)}
                                            flex="1"
                                            _hover={{ bg: "red.50" }}
                                        >
                                            Eliminar
                                        </Button>
                                    </Flex>
                                )}
                            </Stack>
                        </Box>
                    ))}
                </SimpleGrid>
            )}

            {cart.length > 0 && (
                <IconButton
                    icon={<Icon as={FaShoppingCart} />}
                    colorScheme={cartButtonColor}
                    position="fixed"
                    bottom={{ base: "20px", md: "30px" }}
                    right={{ base: "20px", md: "30px" }}
                    borderRadius="full"
                    size="lg"
                    onClick={onOpen}
                    zIndex={10}
                    aria-label="Abrir carrito"
                    boxShadow="xl"
                    _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }}
                    transition="all 0.2s ease"
                />
            )}

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay bg={useColorModeValue('blackAlpha.600', 'blackAlpha.700')} />
                <ModalContent bg={cardBg} borderRadius="xl" boxShadow="2xl">
                    <CartModal
                        cart={cart}
                        setCart={setCart}
                        onClose={onClose}
                        onBuyWithPoints={handleBuyWithPoints}
                        onFactureCrated={(bill) => setSelectedBill(bill)}
                        headingColor={headingColor}
                        textColor={textColor}
                        buttonColorScheme={buttonColorScheme}
                    />
                </ModalContent>
            </Modal>

            <ModalProductAdd isOpen={isAddOpen} onClose={onAddClose} />
            <ModalConfirDelete isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} productId={selectedProductId} />
            <ModalProductUpdate isOpen={isEditOpen} onClose={onEditClose} product={editProductData} />

            {selectedBill && (
                <BillDetailModal
                    bill={selectedBill}
                    isOpen={!!selectedBill}
                    onClose={() => setSelectedBill(null)}
                    printableContentRef={printableRef}
                />
            )}

            {selectedBill && (
                <div
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                        width: "210mm",
                        minHeight: "297mm",
                        overflow: "hidden",
                    }}
                >
                    <PrintableBillContent
                        ref={printableRef}
                        account={selectedBill.account}
                        user={selectedBill.user}
                        numeroFactura={selectedBill._id}
                        total={selectedBill.total}
                        products={selectedBill.products}
                    />
                </div>
            )}
        </Box>
    );
};