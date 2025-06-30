import {
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast,
  Icon,
} from "@chakra-ui/react"
import { useState } from "react"
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers"
import { FaMoneyCheckAlt } from "react-icons/fa"

export const TransferWiew = () => {
const { addTranfer, isLoading } = useTranfers()
  const toast = useToast()

  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    if (!toAccount || !amount || !description) {
      return toast({
        title: "Todos los campos son obligatorios",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
    }

    await addTranfer(toAccount, parseFloat(amount), description);

    setToAccount("")
    setAmount("")
    setDescription("")
  }

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50" p={4}>
      <Box
        bg="white"
        p={8}
        rounded="xl"
        boxShadow="lg"
        w={{ base: "100%", md: "500px" }}
      >
        <Flex align="center" mb={6}>
          <Icon as={FaMoneyCheckAlt} boxSize={8} color="teal.500" mr={3} />
          <Heading size="lg" color="teal.600">
            Transferencia Bancaria
          </Heading>
        </Flex>

        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Número de Cuenta Destino</FormLabel>
            <Input
              placeholder="Ej. 5401484935"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Monto a Transferir</FormLabel>
            <Input
              type="number"
              placeholder="Cantidad"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            mt={4}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Transferir
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}