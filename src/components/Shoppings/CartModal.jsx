import { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  IconButton,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useAddShopping } from "../../shared/hooks/shopping";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

export const CartModal = ({
  cart,
  setCart,
  onClose,
  onBuyWithPoints,
  onFactureCrated,
}) => {
  const { addCompra, isLoading } = useAddShopping();
  const [processing, setProcessing] = useState(false);

  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const totalColor = useColorModeValue("green.600", "green.300");
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const buttonColorSchemePrimary = "purple";
  const buttonColorSchemeSecondary = "orange";
  const buttonColorSchemeCancel = "red";
  const iconButtonScheme = "gray";

  const handleBuy = async () => {
    setProcessing(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const keeperUser = user?.id;

    if (!keeperUser || !cart.length) {
      toast.error("Datos inválidos o carrito vacío.");
      setProcessing(false);
      return;
    }

    const items = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const factura = await addCompra(keeperUser, items);

    if (factura && typeof onFactureCrated === "function") {
      onFactureCrated(factura);
    }

    setCart([]); // Vaciar el carrito después de la compra
    setProcessing(false);
    onClose();
  };

  const handleBuyPoints = async () => {
    setProcessing(true);
    const items = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));
    await onBuyWithPoints(items); // Llama a la función proporcionada por el padre
    setCart([]); // Vaciar el carrito después de la compra con puntos
    setProcessing(false);
    onClose();
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  return (
    <Box p={6} bg={cardBg} borderRadius="xl" boxShadow="xl">
      <Heading size="lg" mb={5} color={textColor} textAlign="center">
        Resumen del Carrito
      </Heading>
      <VStack
        spacing={4}
        align="stretch"
        divider={<Divider borderColor={dividerColor} />}
      >
        {cart.length === 0 ? (
          <Text textAlign="center" color={subTextColor} py={4}>
            El carrito está vacío.
          </Text>
        ) : (
          cart.map((item, index) => (
            <HStack key={index} justify="space-between" align="center" py={2}>
              <Box flex="1">
                <Text fontWeight="medium" fontSize="md" color={textColor}>
                  {item.product.nameProduct}
                </Text>
                <Text fontSize="sm" color={subTextColor}>
                  Q{item.product.price?.toFixed(2) || "0.00"} c/u
                </Text>
                <HStack mt={2}>
                  <IconButton
                    size="sm"
                    icon={<MinusIcon />}
                    onClick={() => decreaseQuantity(index)}
                    aria-label="Restar cantidad"
                    variant="outline"
                    colorScheme={iconButtonScheme}
                  />
                  <Text fontWeight="bold" color={textColor}>
                    {item.quantity}
                  </Text>
                  <IconButton
                    size="sm"
                    icon={<AddIcon />}
                    onClick={() => increaseQuantity(index)}
                    aria-label="Sumar cantidad"
                    variant="outline"
                    colorScheme={iconButtonScheme}
                  />
                </HStack>
              </Box>
              <Text fontWeight="bold" fontSize="lg" color={totalColor}>
                Q{(item.product.price * item.quantity)?.toFixed(2) || "0.00"}
              </Text>
            </HStack>
          ))
        )}
      </VStack>

      <Divider my={5} borderColor={dividerColor} />

      <HStack justify="space-between" mb={6}>
        <Text fontWeight="bold" fontSize="xl" color={textColor}>
          Total:
        </Text>
        <Text fontWeight="extrabold" fontSize="2xl" color={totalColor}>
          Q
          {cart
            .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
            ?.toFixed(2) || "0.00"}
        </Text>
      </HStack>

      <VStack spacing={3}>
        <Button
          colorScheme={buttonColorSchemePrimary}
          width="100%"
          onClick={handleBuy}
          isLoading={isLoading || processing}
          isDisabled={cart.length === 0}
          size="lg"
          boxShadow="md"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        >
          Confirmar Compra 
        </Button>

        <Button
          colorScheme={buttonColorSchemeSecondary}
          width="100%"
          onClick={handleBuyPoints}
          isLoading={processing}
          isDisabled={cart.length === 0}
          size="lg"
          variant="outline"
          boxShadow="md"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        >
          Comprar con Puntos
        </Button>

        <Button
          onClick={onClose}
          colorScheme={buttonColorSchemeCancel}
          width="100%"
          size="lg"
          variant="ghost"
          _hover={{ bg: buttonColorSchemeCancel + ".50" }}
        >
          <CloseIcon mr={2} /> Cancelar
        </Button>
      </VStack>
    </Box>
  )
}
