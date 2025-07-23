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
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTranfers } from "../../shared/hooks/tranfer/useTranfers";
import { FaMoneyCheckAlt, FaRegStar } from "react-icons/fa";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
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
    const { favorites, isLoading: isLoadingFavorites, getFavorites, } = useViewFavorite(user?.id);
    const [hasFetchedHistory, setHasFetchedHistory] = useState(false);

    const [isAliasModalOpen, setIsAliasModalOpen] = useState(false);
    const [selectedNoAccount, setSelectedNoAccount] = useState("");
    const [aliasInput, setAliasInput] = useState("");

    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.700");
    // Colores acordados: purple para headings y botones, green para saldos
    const headingColor = useColorModeValue("purple.700", "purple.300");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const balanceColor = useColorModeValue("green.500", "green.300"); // Para montos en historial
    const inputBg = useColorModeValue("gray.50", "gray.600");
    const inputBorderColor = useColorModeValue("gray.200", "gray.500");
    const buttonColorScheme = "purple"; // Color scheme para botones
    const historyItemBg = useColorModeValue("gray.50", "gray.600");
    const historyItemBorder = useColorModeValue("gray.200", "gray.500");
    const modalBg = useColorModeValue("white", "gray.700");
    const modalOverlayBg = useColorModeValue("blackAlpha.600", "blackAlpha.700");


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
        );

        if (yaExiste) {
            return toast({
                title: "Esta cuenta ya está en tus favoritos",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }

        await addFavo(selectedNoAccount, aliasInput);
        await getFavorites(user?.id);
        setIsAliasModalOpen(false);
    };

    return (
        <Flex
            align="flex-start"
            justify="center"
            minH="100vh"
            bg={bgColor}
            p={{ base: 4, md: 8 }}
            gap={{ base: 6, lg: 8 }}
            flexWrap="wrap"
        >
            <Box
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                rounded="2xl"
                boxShadow="2xl"
                w={{ base: "100%", md: "480px" }}
                transition="all 0.3s ease-in-out"
                _hover={{ boxShadow: "dark-lg" }}
            >
                <Flex align="center" mb={6} pb={4} borderBottom="1px solid" borderColor={inputBorderColor}>
                    <Icon as={FaMoneyCheckAlt} boxSize={8} color={headingColor} mr={3} />
                    <Heading size="lg" color={headingColor}>
                        Transferencia Bancaria
                    </Heading>
                </Flex>

                <Box mb={6}>
                    <Heading size="sm" color={headingColor} mb={3}>
                        Clientes Favoritos
                    </Heading>
                    {isLoadingFavorites ? (
                        <Spinner size="sm" color={buttonColorScheme + ".500"} />
                    ) : favorites.length === 0 ? (
                        <Text color={textColor} fontSize="sm">
                            No tienes clientes Favoritos registrados.
                        </Text>
                    ) : (
                        <Flex gap={2} flexWrap="wrap">
                            {favorites.map((fav) => (
                                <Button
                                    key={fav._id}
                                    leftIcon={<FaRegStar />}
                                    size="sm"
                                    variant="outline"
                                    colorScheme={buttonColorScheme}
                                    onClick={() => setToAccount(fav.favoriteAccount?.noAccount)}
                                    borderRadius="full"
                                    _hover={{ bg: buttonColorScheme + ".50", transform: "translateY(-1px)" }}
                                >
                                    {fav.alias}
                                </Button>
                            ))}
                        </Flex>
                    )}
                </Box>

                <Stack spacing={5}>
                    <FormControl isRequired>
                        <FormLabel color={textColor}>Número de Cuenta Destino</FormLabel>
                        <Input
                            placeholder="Ej. 5401484935"
                            value={toAccount}
                            onChange={(e) => setToAccount(e.target.value)}
                            bg={inputBg}
                            borderColor={inputBorderColor}
                            _hover={{ borderColor: buttonColorScheme + ".400" }}
                            _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                            color={textColor}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Monto a Transferir</FormLabel>
                        <Input
                            type="number"
                            placeholder="Cantidad"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            bg={inputBg}
                            borderColor={inputBorderColor}
                            _hover={{ borderColor: buttonColorScheme + ".400" }}
                            _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                            color={textColor}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Descripción</FormLabel>
                        <Input
                            placeholder="Motivo de la transferencia"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            bg={inputBg}
                            borderColor={inputBorderColor}
                            _hover={{ borderColor: buttonColorScheme + ".400" }}
                            _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                            color={textColor}
                        />
                    </FormControl>

                    <Button
                        colorScheme={buttonColorScheme}
                        size="lg"
                        mt={4}
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        leftIcon={<Icon as={FaMoneyCheckAlt} />}
                        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                        transition="all 0.2s ease"
                    >
                        Transferir
                    </Button>
                </Stack>
            </Box>

            <Box
                bg={cardBg}
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                boxShadow="xl"
                maxH="700px"
                overflowY="auto"
                w={{ base: "100%", md: "450px" }}
                transition="all 0.3s ease-in-out"
                _hover={{ boxShadow: "dark-lg" }}
            >
                <Heading size="md" mb={6} color={headingColor} pb={4} borderBottom="1px solid" borderColor={inputBorderColor}>
                    Historial de Movimientos
                </Heading>
                <Stack spacing={5}>
                    {historyUser.length === 0 ? (
                        <Text color={textColor} textAlign="center" py={4}>No hay movimientos registrados.</Text>
                    ) : (
                        historyUser.map((h) => {
                            const isCancelable =
                                Date.now() - new Date(h.createdAt).getTime() <= 3 * 60 * 1000;
                            return (
                                <Box
                                    key={h._id}
                                    border="1px solid"
                                    borderColor={historyItemBorder}
                                    borderRadius="lg"
                                    p={4}
                                    bg={historyItemBg}
                                    boxShadow="sm"
                                    _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                                    transition="all 0.2s ease"
                                >
                                    <Stack spacing={1}>
                                        <Flex justify="space-between" align="center" mb={1}>
                                            <Text fontWeight="bold" fontSize="lg" color={balanceColor}>
                                                Q{h.amount?.toFixed(2) || '0.00'}
                                            </Text>
                                            <Badge
                                                colorScheme={isCancelable ? "green" : "gray"}
                                                variant="subtle"
                                                px={2}
                                                py={1}
                                                borderRadius="full"
                                            >
                                                {isCancelable ? "Cancelable" : "No Cancelable"}
                                            </Badge>
                                        </Flex>
                                        <Text fontSize="md" color={textColor}>{h.description}</Text>
                                        <Text fontSize="xs" color="gray.500">
                                            {format(new Date(h.createdAt), "PPP - hh:mm a", { locale: es })}
                                        </Text>
                                        <Text fontSize="sm" color={textColor} fontWeight="medium">
                                            Para: {h.toUser?.name} — {h.toUser?.noAccount}
                                        </Text>

                                        <Flex mt={3} gap={2} direction={{ base: 'column', sm: 'row' }}>
                                            <Button
                                                size="sm"
                                                colorScheme={buttonColorScheme}
                                                variant="outline"
                                                leftIcon={<FaRegStar />}
                                                onClick={() => openAliasModal(h.toUser?.noAccount)}
                                                flex="1"
                                                _hover={{ bg: buttonColorScheme + ".50" }}
                                            >
                                                Agregar a Favoritos
                                            </Button>
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                leftIcon={<Icon as={FaMoneyCheckAlt} transform="rotate(180deg)" />}
                                                onClick={() => handleCancel(h.transfer)}
                                                isDisabled={!isCancelable}
                                                flex="1"
                                                _hover={{ bg: "red.50" }}
                                            >
                                                Cancelar Transferencia
                                            </Button>
                                        </Flex>
                                    </Stack>
                                </Box>
                            );
                        })
                    )}
                </Stack>
            </Box>

            <Modal isOpen={isAliasModalOpen} onClose={() => setIsAliasModalOpen(false)} isCentered>
                <ModalOverlay bg={modalOverlayBg} />
                <ModalContent bg={modalBg} p={4} rounded="xl" boxShadow="2xl">
                    <ModalHeader pb={2} color={headingColor}>Alias para la cuenta</ModalHeader>
                    <ModalCloseButton color={textColor} />
                    <ModalBody>
                        <Text fontSize="md" mb={4} color={textColor}>
                            No. Cuenta: <Text as="span" fontWeight="bold">{selectedNoAccount}</Text>
                        </Text>
                        <Input
                            value={aliasInput}
                            onChange={(e) => setAliasInput(e.target.value)}
                            bg={inputBg}
                            borderColor={inputBorderColor}
                            _hover={{ borderColor: buttonColorScheme + ".400" }}
                            _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                            color={textColor}
                        />
                    </ModalBody>
                    <ModalFooter pt={5}>
                        <Button
                            variant="outline"
                            onClick={() => setIsAliasModalOpen(false)}
                            mr={3}
                            colorScheme={buttonColorScheme}
                        >
                            Cancelar
                        </Button>
                        <Button
                            colorScheme={buttonColorScheme}
                            onClick={handleAddFavorite}
                            isLoading={isAddingFavorite}
                        >
                            Guardar Alias
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};