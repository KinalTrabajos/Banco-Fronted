import {
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Icon,
  Text,
  Badge,
  Spinner,
  Wrap,
  WrapItem,
  Tooltip,
  useColorModeValue,
  useDisclosure, // NUEVO
  Modal, // NUEVO
  ModalOverlay, // NUEVO
  ModalContent, // NUEVO
  ModalHeader, // NUEVO
  ModalBody, // NUEVO
  ModalFooter, // NUEVO
  ModalCloseButton, // NUEVO
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers";
import { FaMoneyCheckAlt, FaRegStar } from "react-icons/fa";
import { format } from "date-fns";
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser";
import { useTranfersCancel } from "../../shared/hooks/tranfer/useTranfersCancel";
import { useViewFavorite } from "../../shared/hooks/favorite/userViewFavorit";
import { useAddFavorite } from "../../shared/hooks/favorite/useAddFavorite"; // NUEVO

export const TransferWiew = () => {
  const { addTranfer, isLoading } = useTranfers();
  const { cancelTransfer } = useTranfersCancel();
  const { addFavo, isLoading: isAddingFavorite } = useAddFavorite(); // NUEVO

  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const { historyUser, getHistoryByUser } = useGetHistoryFromUser();
  const [hasFetchedHistory, setHasFetchedHistory] = useState(false);

  const { favorites, isLoading: isLoadingFavorites } = useViewFavorite(
    user?.id
  );

  const { isOpen, onOpen, onClose } = useDisclosure(); // NUEVO
  const [selectedFavoriteId, setSelectedFavoriteId] = useState(""); // NUEVO
  const [alias, setAlias] = useState(""); // NUEVO

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

  // NUEVO: abrir modal
  const handleOpenFavoriteModal = (accountId) => {
    setSelectedFavoriteId(accountId);
    setAlias("");
    onOpen();
  };

  // NUEVO: confirmar agregar favorito
  const handleAddFavorite = async () => {
    await addFavo(selectedFavoriteId, alias);
    onClose();
  };

  // Colors para modo claro/oscuro
  const panelBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex
      align="flex-start"
      justify="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      p={6}
      gap={8}
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      {/* Panel izquierdo: Formulario + Favoritos */}
      <Box
        bg={panelBg}
        p={8}
        rounded="2xl"
        boxShadow="2xl"
        w={{ base: "100%", md: "480px" }}
        border="1px solid"
        borderColor={borderColor}
      >
        <Flex align="center" mb={6}>
          <Icon as={FaMoneyCheckAlt} boxSize={8} color="teal.600" mr={3} />
          <Heading size="lg" color="teal.700">
            Transferencia Bancaria
          </Heading>
        </Flex>

        <Stack spacing={4}>
          {/* Favoritos debajo del input de cuenta destino */}
          <Box mb={4}>
            <Text mb={2} fontWeight="semibold" color="teal.600">
              Cuentas Favoritas
            </Text>

            {isLoadingFavorites ? (
              <Flex justify="center" py={4}>
                <Spinner size="md" color="teal.500" />
              </Flex>
            ) : favorites.length === 0 ? (
              <Text fontSize="sm" color="gray.500" fontStyle="italic">
                No tienes cuentas favoritas registradas.
              </Text>
            ) : (
              <Wrap spacing={2}>
                {favorites.map((fav) => (
                  <WrapItem key={fav._id}>
                    <Tooltip label={`Alias: ${fav.alias}`} hasArrow>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="teal"
                        onClick={() =>
                          handleSelectFavorite(fav.favoriteAccount?.noAccount)
                        }
                        leftIcon={<FaRegStar />}
                      >
                        {fav.favoriteAccount?.noAccount}
                      </Button>
                    </Tooltip>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Box>
          <FormControl isRequired>
            <FormLabel>Número de Cuenta Destino</FormLabel>
            <Input
              placeholder="Ej. 5401484935"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              bg={inputBg}
              borderColor={borderColor}
              _focus={{ borderColor: "teal.400" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Monto a Transferir</FormLabel>
            <Input
              type="number"
              placeholder="Cantidad"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              bg={inputBg}
              borderColor={borderColor}
              _focus={{ borderColor: "teal.400" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Descripción</FormLabel>
            <Input
              placeholder="Motivo de la transferencia"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg={inputBg}
              borderColor={borderColor}
              _focus={{ borderColor: "teal.400" }}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            mt={2}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Transferir
          </Button>
        </Stack>
      </Box>

      {/* Panel derecho: Historial */}
      <Box
        bg={panelBg}
        p={6}
        borderRadius="2xl"
        boxShadow="lg"
        maxH="600px"
        overflowY="auto"
        w={{ base: "100%", md: "400px" }}
        border="1px solid"
        borderColor={borderColor}
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
                borderColor={borderColor}
                borderRadius="lg"
                p={3}
                bg={useColorModeValue("gray.50", "gray.600")}
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
                    Para: {h.toUser?.name} — {h.toUser?.noAccount} id cuenta{" "}
                    {h.toUser?._id}
                  </Text>
                  <Flex mt={2} gap={2}>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleCancel(h.transfer)}
                      isDisabled={!isCancelable}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => {
                        if (h.toUser?._id) {
                          handleOpenFavoriteModal(h.toUser._id);
                        } else {
                          console.error(
                            "Este movimiento no tiene un destinatario válido."
                          );
                        }
                      }}
                      isDisabled={!h.toUser?._id}
                    >
                      Agregar a Favoritos
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Modal para agregar favorito */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar a Favoritos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Alias para esta cuenta</FormLabel>
              <Input
                placeholder="Ej. Mi proveedor"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleAddFavorite}
              isLoading={isAddingFavorite}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
