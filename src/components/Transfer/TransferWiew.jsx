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
  Text
} from "@chakra-ui/react"
import { useState, useEffect, use } from "react"
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers"
import { FaMoneyCheckAlt } from "react-icons/fa"
import { format } from "date-fns";
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser";

export const TransferWiew = () => {
  const { addTranfer, isLoading } = useTranfers()
  const toast = useToast()

  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [user, setUser ] = useState('');
  const { historyUser, getHistoryByUser} = useGetHistoryFromUser();
 
  useEffect(()=> {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    setUser(userLocal);
  },[])

  useEffect(()=> {
    const fetchHistory = async ()=> {
      await getHistoryByUser({id: user.id});
    }

    fetchHistory();
  },[])

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
      <Box
        bg="white"
        p={5}
        m={5}
        borderRadius="xl"
        boxShadow="md"
        maxH="400px"
        overflowY="auto"
      >
        <Heading size="sm" mb={4}>
          Historial de Movimientos
        </Heading>
        <Stack spacing={4}>
          {historyUser.map((h) => (
            <Box key={h._id} borderBottom="1px solid #e2e8f0" pb={2}>
              <Text>
                <strong>ID:</strong> {h.transfer}
              </Text>
              <Text>
                <strong>Monto:</strong> Q{h.amount}
              </Text>
              <Text>
                <strong>Descripción:</strong> {h.description}
              </Text>
              <Text>
                <strong>Fecha:</strong>{" "}
                {format(new Date(h.createdAt), "PPPpp")}
              </Text>
              <Text>
                <strong>Para:</strong> {h.toUser?.name} —{" "}
                {h.toUser?.noAccount}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}