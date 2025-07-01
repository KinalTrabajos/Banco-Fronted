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
  Text,
  Badge,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers"
import { FaMoneyCheckAlt } from "react-icons/fa"
import { format } from "date-fns"
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser"
import { useTranfersCancel } from "../../shared/hooks/tranfer/useTranfersCancel"

export const TransferWiew = () => {
  const { addTranfer, isLoading } = useTranfers()
  const { cancelTransfer } = useTranfersCancel()
  const toast = useToast()

  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [user, setUser] = useState(null)
  const { historyUser, getHistoryByUser } = useGetHistoryFromUser()
  const [hasFetchedHistory, setHasFetchedHistory] = useState(false)

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"))
    setUser(userLocal)
  }, [])

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?.id && !hasFetchedHistory) {
        await getHistoryByUser({ id: user.id })
        setHasFetchedHistory(true)
      }
    }
    fetchHistory()
  }, [user, hasFetchedHistory, getHistoryByUser])

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

    setToAccount("");
    setAmount("");
    setDescription("");

    await getHistoryByUser({ id: user.id })
  }

  const handleCancel = async (id) => {
    await cancelTransfer(id);
    await getHistoryByUser({ id: user.id })
  }

  return (
    <Flex align="flex-start" justify="center" minH="100vh" bg="gray.50" p={4} gap={6} flexWrap="wrap">
      <Box bg="white" p={8} rounded="2xl" boxShadow="2xl" w={{ base: "100%", md: "480px" }}>
        <Flex align="center" mb={6}>
          <Icon as={FaMoneyCheckAlt} boxSize={8} color="teal.600" mr={3} />
          <Heading size="lg" color="teal.700">
            Transferencia Bancaria
          </Heading>
        </Flex>

        <Box mb={4}>
          <Heading size="sm" color="teal.600" mb={2}>
            Clientes Frecuentes
          </Heading>
          <Flex gap={2} flexWrap="wrap">
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              Juan Pérez
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              Empresa XYZ
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
            >
              María López
            </Button>
          </Flex>
        </Box>

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
              placeholder="Motivo de la transferencia"
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
        p={6}
        borderRadius="2xl"
        boxShadow="lg"
        maxH="600px"
        overflowY="auto"
        w={{ base: "100%", md: "400px" }}
      >
        <Heading size="md" mb={4} color="teal.700">
          Historial de Movimientos
        </Heading>
        <Stack spacing={4}>
          {historyUser.length === 0 && (
            <Text color="gray.500">No hay movimientos registrados.</Text>
          )}
          {historyUser.map((h) => {
            const isCancelable =
              Date.now() - new Date(h.createdAt).getTime() <= 3 * 60 * 1000;
            return (
              <Box
                key={h._id}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                p={3}
                bg="gray.50"
              >
                <Stack spacing={1}>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" color="teal.700">
                      Q{h.amount}
                    </Text>
                    <Badge colorScheme={isCancelable ? "green" : "gray"}>
                      {isCancelable ? "Cancelable" : "No Cancelable"}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm">{h.description}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {format(new Date(h.createdAt), "PPPpp")}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Para: {h.toUser?.name} — {h.toUser?.noAccount}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mt={2}
                    onClick={() => handleCancel(h.transfer)}
                    isDisabled={!isCancelable}
                  >
                    Cancelar Transferencia
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Flex>
  )
}