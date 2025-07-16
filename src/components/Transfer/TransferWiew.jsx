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
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers";
import { FaMoneyCheckAlt, FaRegStar } from "react-icons/fa";
import { format } from "date-fns";
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser";
import { useTranfersCancel } from "../../shared/hooks/tranfer/useTranfersCancel";
import { useViewFavorite } from "../../shared/hooks/favorite/userViewFavorit";
import { useAddFavorite } from "../../shared/hooks/favorite/useAddFavorite";

export const TransferWiew = () => {
  const { addTranfer, isLoading } = useTranfers();
  const { cancelTransfer } = useTranfersCancel();
  const { addFavo, isLoading: isAddingFavorite } = useAddFavorite();
  const toast = useToast();

  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const { historyUser, getHistoryByUser } = useGetHistoryFromUser();
  const {favorites,isLoading: isLoadingFavorites,getFavorites,} = useViewFavorite(user?.id);
  const [hasFetchedHistory, setHasFetchedHistory] = useState(false);

  const [isAliasModalOpen, setIsAliasModalOpen] = useState(false);
  const [selectedNoAccount, setSelectedNoAccount] = useState("");
  const [aliasInput, setAliasInput] = useState("");

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userLocal);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?.id && !hasFetchedHistory) {
        await getHistoryByUser({ id: user.id });
        setHasFetchedHistory(true);
      }
    };
    fetchHistory();
  }, [user, hasFetchedHistory, getHistoryByUser]);

  const handleSubmit = async () => {
    if (!toAccount || !amount || !description) {
      return toast({
        title: "Todos los campos son obligatorios",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    await addTranfer(toAccount, parseFloat(amount), description);

    setToAccount("");
    setAmount("");
    setDescription("");

    await getHistoryByUser({ id: user.id });
  };

  const handleCancel = async (id) => {
    await cancelTransfer(id);
    await getHistoryByUser({ id: user.id });
  };

  const openAliasModal = (noAccount) => {
    setSelectedNoAccount(noAccount);
    setAliasInput("");
    setIsAliasModalOpen(true);
  };

  const handleAddFavorite = async () => {
    if (!aliasInput) {
      return toast({
        title: "Por favor escribe un alias",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    const yaExiste = favorites.some(
      (fav) => fav.favoriteAccount?.noAccount === selectedNoAccount
    )

    if (yaExiste) {
      return toast({
        title: "Esta cuenta ya está en tus favoritos",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }

    await addFavo(selectedNoAccount, aliasInput)
    await getFavorites(user?.id)
    setIsAliasModalOpen(false)
  }

  return (
    <Flex
      align="flex-start"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={4}
      gap={6}
      flexWrap="wrap"
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        boxShadow="2xl"
        w={{ base: "100%", md: "480px" }}
      >
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
          {isLoadingFavorites ? (
            <Spinner size="sm" color="teal.500" />
          ) : favorites.length === 0 ? (
            <Text color="gray.500" fontSize="sm">
              No tienes clientes frecuentes registrados.
            </Text>
          ) : (
            <Flex gap={2} flexWrap="wrap">
              {favorites.map((fav) => (
                <Button
                  key={fav._id}
                  leftIcon={<FaRegStar />}
                  size="sm"
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => setToAccount(fav.favoriteAccount?.noAccount)}
                >
                  {fav.alias}
                </Button>
              ))}
            </Flex>
          )}
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
                    colorScheme="teal"
                    mt={2}
                    onClick={() => openAliasModal(h.toUser?.noAccount)}
                  >
                    Agregar a Favoritos
                  </Button>

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

      {isAliasModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
        >
          <Box bg="white" p={6} rounded="lg" w="300px" boxShadow="lg">
            <Heading size="sm" mb={4}>
              Alias para la cuenta
            </Heading>
            <Text fontSize="sm" mb={2}>
              No. Cuenta: {selectedNoAccount}
            </Text>
            <Input
              placeholder="Escribe un alias"
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              mb={4}
            />
            <Flex justify="flex-end" gap={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAliasModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                colorScheme="teal"
                onClick={handleAddFavorite}
                isLoading={isAddingFavorite}
              >
                Guardar
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Flex>
  )
}
