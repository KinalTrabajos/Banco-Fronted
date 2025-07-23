import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Spinner,
  Icon,
  Badge,
  Input,
  Button,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegStar, FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import {
  useViewFavorite,
  useAddFavorite,
  useDeleteFavorito,
  useEditFavorite,
} from "../../shared/hooks/favorite";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const FavoritePage = () => {
  const [user, setUser] = useState(null);
  const [noAccountInput, setNoAccountInput] = useState("");
  const [aliasInput, setAliasInput] = useState("");

  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);
  const [editAliasInput, setEditAliasInput] = useState("");
  const cancelRef = useRef();

  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userLocal);
  }, []);

  const { favorites, isLoading, getFavorites } = useViewFavorite(user?.id);

  const { addFavo, isLoading: isAdding } = useAddFavorite();
  const { deleteFavo } = useDeleteFavorito();
  const { editFavo } = useEditFavorite();

  const handleAddFavorite = async () => {
    if (!noAccountInput || !aliasInput) {
      toast({
        title: "Campos vacíos",
        description: "Por favor, ingresa el número de cuenta y el alias.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const yaExiste = favorites.some(
      (fav) => fav.favoriteAccount?.noAccount === noAccountInput
    );

    if (yaExiste) {
      return toast({
        title: "Esta cuenta ya está en tus favoritos",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    await addFavo(noAccountInput, aliasInput);
    await getFavorites(user?.id);

    setNoAccountInput("");
    setAliasInput("");

  };

  const handleDeleteFavorite = async () => {
    if (selectedFavoriteId) {
      await deleteFavo(selectedFavoriteId);
      await getFavorites(user?.id);
      setSelectedFavoriteId(null);
      onDeleteClose();
    }
  };

  const handleOpenEdit = (fav) => {
    setSelectedFavoriteId(fav._id);
    setEditAliasInput(fav.alias);
    onEditOpen();
  };

  const handleEditFavorite = async () => {
    if (!editAliasInput) {
      toast({
        title: "Alias vacío",
        description: "Por favor, ingresa un alias para guardar los cambios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await editFavo(selectedFavoriteId, editAliasInput);
    await getFavorites(user?.id);
    setSelectedFavoriteId(null);
    setEditAliasInput("");
    onEditClose();
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("purple.700", "purple.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const inputBorderColor = useColorModeValue("gray.200", "gray.500");
  const buttonColorScheme = "purple";
  const deleteButtonScheme = "red";
  const editButtonScheme = "teal";
  const modalBg = useColorModeValue("white", "gray.700");
  const modalOverlayBg = useColorModeValue("blackAlpha.600", "blackAlpha.700");

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
      bg={bgColor}
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Heading size="xl" color={headingColor} mb={8} textAlign="center">
        <Icon as={FaRegStar} mr={3} /> Tus Cuentas Favoritas
      </Heading>

      <Box
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        rounded="2xl"
        boxShadow="xl"
        mb={8}
        w={{ base: "100%", md: "700px" }}
        transition="all 0.3s ease-in-out"
        _hover={{ boxShadow: "dark-lg" }}
      >
        <Heading
          size="md"
          color={headingColor}
          mb={5}
          borderBottom="1px solid"
          borderColor={inputBorderColor}
          pb={3}
        >
          Agregar Nuevo Favorito
        </Heading>
        <Stack spacing={4}>
          <Input
            placeholder="Número de cuenta"
            value={noAccountInput}
            onChange={(e) => setNoAccountInput(e.target.value)}
            bg={inputBg}
            borderColor={inputBorderColor}
            _hover={{ borderColor: buttonColorScheme + ".400" }}
            _focus={{
              borderColor: buttonColorScheme + ".500",
              boxShadow: `0 0 0 1px ${buttonColorScheme}.500`,
            }}
            color={textColor}
          />
          <Input
            placeholder="Alias (Ej. 'Mi Hermano', 'Pago de Renta')"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            bg={inputBg}
            borderColor={inputBorderColor}
            _hover={{ borderColor: buttonColorScheme + ".400" }}
            _focus={{
              borderColor: buttonColorScheme + ".500",
              boxShadow: `0 0 0 1px ${buttonColorScheme}.500`,
            }}
            color={textColor}
          />
          <Button
            colorScheme={buttonColorScheme}
            onClick={handleAddFavorite}
            isLoading={isAdding}
            leftIcon={<Icon as={FaPlusCircle} />}
            size="lg"
            mt={4}
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.2s ease"
          >
            Agregar a Favoritos
          </Button>
        </Stack>
      </Box>

      {isLoading ? (
        <Spinner size="xl" color={buttonColorScheme + ".500"} mt={10} />
      ) : (
        <Stack spacing={5} w={{ base: "100%", md: "700px" }}>
          {favorites.length === 0 && (
            <Box
              bg={cardBg}
              p={6}
              rounded="lg"
              boxShadow="md"
              textAlign="center"
              color={textColor}
              border="1px solid"
              borderColor={inputBorderColor}
            >
              <Text fontSize="lg">
                No tienes cuentas favoritas registradas. ¡Agrega una para
                empezar!
              </Text>
            </Box>
          )}

          {favorites.map((fav) => (
            <Box
              key={fav._id}
              bg={cardBg}
              p={5}
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor={inputBorderColor}
              _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
              transition="all 0.2s ease"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Icon
                    as={FaRegStar}
                    color={buttonColorScheme + ".500"}
                    boxSize={6}
                    mr={3}
                  />
                  <Text fontWeight="bold" fontSize="xl" color={headingColor}>
                    {fav.alias}
                  </Text>
                </Flex>
                {fav.isFavorite && (
                  <Badge
                    colorScheme="green"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    Favorito
                  </Badge>
                )}
              </Flex>

              <Text fontSize="md" color={textColor} mb={1}>
                <Text as="span" fontWeight="semibold">
                  No. de Cuenta:
                </Text>{" "}
                {fav.favoriteAccount?.noAccount}
              </Text>
              <Text fontSize="md" color={textColor} mb={1}>
                <Text as="span" fontWeight="semibold">
                  Tipo de Cuenta:
                </Text>{" "}
                {fav.favoriteAccount?.typeAccount}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Registrado el{" "}
                {format(new Date(fav.createdAt), "PPP - hh:mm a", {
                  locale: es,
                })}
              </Text>

              <Flex mt={4} gap={3} direction={{ base: "column", sm: "row" }}>
                <Button
                  size="md"
                  colorScheme={editButtonScheme}
                  leftIcon={<FaEdit />}
                  variant="outline"
                  onClick={() => handleOpenEdit(fav)}
                  flex="1"
                  _hover={{ bg: editButtonScheme + ".50" }}
                >
                  Editar Alias
                </Button>
                <Button
                  size="md"
                  colorScheme={deleteButtonScheme}
                  leftIcon={<FaTrash />}
                  variant="outline"
                  onClick={() => {
                    setSelectedFavoriteId(fav._id);
                    onDeleteOpen();
                  }}
                  flex="1"
                  _hover={{ bg: deleteButtonScheme + ".50" }}
                >
                  Eliminar
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay bg={modalOverlayBg}>
          <AlertDialogContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={headingColor}
            >
              Confirmar Eliminación
            </AlertDialogHeader>

            <AlertDialogBody color={textColor}>
              ¿Estás seguro que deseas eliminar este favorito? Esta acción no se
              puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onDeleteClose}
                variant="ghost"
                colorScheme={buttonColorScheme}
              >
                Cancelar
              </Button>
              <Button
                colorScheme={deleteButtonScheme}
                onClick={handleDeleteFavorite}
                ml={3}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <ModalOverlay bg={modalOverlayBg} />
        <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
          <ModalHeader color={headingColor}>Editar Alias</ModalHeader>
          <ModalCloseButton color={textColor} />
          <ModalBody>
            <Input
              placeholder="Nuevo alias"
              value={editAliasInput}
              onChange={(e) => setEditAliasInput(e.target.value)}
              bg={inputBg}
              borderColor={inputBorderColor}
              _hover={{ borderColor: editButtonScheme + ".400" }}
              _focus={{
                borderColor: editButtonScheme + ".500",
                boxShadow: `0 0 0 1px ${editButtonScheme}.500`,
              }}
              color={textColor}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onEditClose}
              variant="ghost"
              colorScheme={buttonColorScheme}
              mr={3}
            >
              Cancelar
            </Button>
            <Button colorScheme={editButtonScheme} onClick={handleEditFavorite}>
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
