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
} from "@chakra-ui/react"
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"
import {useProductsView,useProductsIdView} from "../../shared/hooks/products"
import { useAddShoppingsPoints } from "../../shared/hooks/shopping"
import { CartModal } from "./CartModal"
import { ModalProductAdd } from "../../components/Product/ModalProductAdd"
import { ModalConfirDelete } from "../../components/Product/ModalConfirDelete"
import { ModalProductUpdate } from "../Product/ModalProductUpdate"

export const ShoppingView = () => {
  const [cart, setCart] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const keeperUser = user?.id
  const typeAccount = user?.typeAccount

  const isEmpresarial = typeAccount === "EMPRESARIAL"

  const { products: allProducts, isLoading: loadingAll } = useProductsView()
  const { products: userProducts, isLoading: loadingUser } = useProductsIdView(isEmpresarial ? keeperUser : null)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [editProductData, setEditProductData] = useState(null)
  const {isOpen: isEditOpen,onOpen: onEditOpen,onClose: onEditClose} = useDisclosure()

  const {isOpen: isAddOpen,onOpen: onAddOpen,onClose: onAddClose} = useDisclosure()

  const products = isEmpresarial ? userProducts : allProducts
  const isLoading = isEmpresarial ? loadingUser : loadingAll

  const { addComraPoints } = useAddShoppingsPoints()

  const handleBuyWithPoints = async (items) => {
    await addComraPoints(keeperUser, items)
    onClose()
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id
      )
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const handleEdit = (product) => {
    setEditProductData(product)
    onEditOpen()
  }

  const handleDelete = (product) => {
    setSelectedProductId(product._id)
    setDeleteModalOpen(true)
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box p={6} position="relative">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Productos Disponibles</Heading>
        {isEmpresarial && (
          <Button
            colorScheme="blue"
            position="fixed"
            bottom="100px"
            right="30px"
            onClick={onAddOpen}
            zIndex={10}
          >
            Agregar Producto
          </Button>
        )}
      </Flex>

      {products.length === 0 ? (
        <Text textAlign="center" mt={10} fontSize="lg">
          {isEmpresarial
            ? "No tienes productos publicados."
            : "No hay productos disponibles."}
        </Text>
      ) : (
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

                <Text fontWeight="bold" fontSize="lg" color="black.500">
                  Puntos {product.price}
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

                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </Button>

                {isEmpresarial && (
                  <Flex gap={2}>
                    <Button
                      leftIcon={<EditIcon />}
                      size="sm"
                      colorScheme="teal"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(product)}
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
          <CartModal cart={cart} setCart={setCart} onClose={onClose} onBuyWithPoints={handleBuyWithPoints}/>
        </ModalContent>
      </Modal>
      <ModalProductAdd isOpen={isAddOpen} onClose={onAddClose} />
      <ModalConfirDelete isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} productId={selectedProductId}/>
      <ModalProductUpdate isOpen={isEditOpen}onClose={onEditClose}product={editProductData}/>
    </Box>
  )
}