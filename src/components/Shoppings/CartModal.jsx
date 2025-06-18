import { useAddShopping } from "../../shared/hooks/shopping"
import { useState } from "react"
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  IconButton
} from "@chakra-ui/react"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import toast from "react-hot-toast"

export const CartModal = ({ cart, setCart, onClose }) => {
  const { addCompra, isLoading } = useAddShopping()
  const [processing, setProcessing] = useState(false)

  const handleBuy = async () => {
    setProcessing(true);

    const user = JSON.parse(localStorage.getItem("user"))
    const keeperUser = user?.id

    if (!keeperUser || !cart.length) {
      toast.error("Datos inválidos o carrito vacío.")
      setProcessing(false)
      return;
    }

    const items = cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }))

    await addCompra(keeperUser, items)
    setProcessing(false)
    onClose()
  }

  const increaseQuantity = (index) => {
    const updatedCart = [...cart]
    updatedCart[index].quantity += 1
    setCart(updatedCart)
  }

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart]
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1
    } else {
      updatedCart.splice(index, 1)
    }
    setCart(updatedCart);
  }

  return (
    <Box p={6} bg="white" borderRadius="xl" boxShadow="xl">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Resumen del Carrito</Text>
      <VStack spacing={4} align="stretch">
        {cart.map((item, index) => (
          <HStack key={index} justify="space-between" align="center">
            <Box>
              <Text fontWeight="medium">{item.product.nameProduct}</Text>
              <HStack mt={1}>
                <IconButton
                  size="sm"
                  icon={<MinusIcon />}
                  onClick={() => decreaseQuantity(index)}
                  aria-label="Restar"
                />
                <Text>{item.quantity}</Text>
                <IconButton
                  size="sm"
                  icon={<AddIcon />}
                  onClick={() => increaseQuantity(index)}
                  aria-label="Sumar"
                />
              </HStack>
            </Box>
            <Text fontWeight="medium">
              Q{item.product.price * item.quantity}
            </Text>
          </HStack>
        ))}
      </VStack>

      <Divider my={4} />

      <HStack justify="space-between">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold" color="green.600">
          Q{cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
        </Text>
      </HStack>

      <Button
        mt={4}
        colorScheme="green"
        width="100%"
        onClick={handleBuy}
        isLoading={isLoading || processing}
      >
        Confirmar Compra
      </Button>
      <Button mt={2} onClick={onClose} colorScheme="red" width="100%">
        Cancelar
      </Button>
    </Box>
  )
}
