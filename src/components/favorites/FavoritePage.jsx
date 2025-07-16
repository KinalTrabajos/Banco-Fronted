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
} from "@chakra-ui/react";
import { FaRegStar, FaTrash, FaEdit } from "react-icons/fa";
import {
  useViewFavorite,
  useAddFavorite,
  useDeleteFavorito,
  useEditFavorite,
} from "../../shared/hooks/favorite";
import { useEffect, useState, useRef } from "react";

export const FavoritePage = () => {
  const [user, setUser] = useState(null)
  const [noAccountInput, setNoAccountInput] = useState("")
  const [aliasInput, setAliasInput] = useState("")

  const [selectedFavoriteId, setSelectedFavoriteId] = useState(null)
  const [editAliasInput, setEditAliasInput] = useState("")
  const cancelRef = useRef()

  const toast = useToast()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"))
    setUser(userLocal)
  }, [])

  const {
    favorites,
    isLoading,
    getFavorites,
  } = useViewFavorite(user?.id)

  const { addFavo, isLoading: isAdding } = useAddFavorite()
  const { deleteFavo } = useDeleteFavorito()
  const { editFavo } = useEditFavorite()

  const handleAddFavorite = async () => {
    if (!noAccountInput || !aliasInput) {
      return
    }

    const yaExiste = favorites.some(
      (fav) => fav.favoriteAccount?.noAccount === noAccountInput
    )

    if (yaExiste) {
      return toast({
        title: "Esta cuenta ya está en tus favoritos",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }

    await addFavo(noAccountInput, aliasInput)
    await getFavorites(user?.id)

    setNoAccountInput("")
    setAliasInput("")
  }

  const handleDeleteFavorite = async () => {
    if (selectedFavoriteId) {
      await deleteFavo(selectedFavoriteId)
      await getFavorites(user?.id)
      setSelectedFavoriteId(null)
      onDeleteClose()
    }
  }

  const handleOpenEdit = (fav) => {
    setSelectedFavoriteId(fav._id)
    setEditAliasInput(fav.alias)
    onEditOpen()
  }

  const handleEditFavorite = async () => {
    if (!editAliasInput) {
      return
    }

    await editFavo(selectedFavoriteId, editAliasInput)
    await getFavorites(user?.id)
    setSelectedFavoriteId(null)
    setEditAliasInput("")
    onEditClose()
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
      bg="gray.50"
      py={10}
      px={4}
    >
      <Heading size="lg" color="teal.700" mb={6}>
        Cuentas Favoritas
      </Heading>

      <Box
        bg="white"
        p={6}
        rounded="lg"
        boxShadow="md"
        mb={6}
        w={{ base: "100%", md: "600px" }}
      >
        <Stack spacing={3}>
          <Input
            placeholder="Número de cuenta"
            value={noAccountInput}
            onChange={(e) => setNoAccountInput(e.target.value)}
          />
          <Input
            placeholder="Alias"
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={handleAddFavorite}
            isLoading={isAdding}
          >
            Agregar a Favoritos
          </Button>
        </Stack>
      </Box>

      {isLoading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <Stack spacing={4} w={{ base: "100%", md: "600px" }}>
          {favorites.length === 0 && (
            <Box
              bg="white"
              p={6}
              rounded="lg"
              boxShadow="md"
              textAlign="center"
            >
              <Text color="gray.500">
                No tienes cuentas favoritas registradas.
              </Text>
            </Box>
          )}

          {favorites.map((fav) => (
            <Box
              key={fav._id}
              bg="white"
              p={5}
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Icon as={FaRegStar} color="teal.500" boxSize={5} mr={2} />
                  <Text fontWeight="bold" color="teal.700">
                    {fav.alias}
                  </Text>
                </Flex>
                {fav.isFavorite && (
                  <Badge colorScheme="green">Favorito</Badge>
                )}
              </Flex>

              <Text fontSize="sm" color="gray.600">
                <strong>No. de Cuenta:</strong> {fav.favoriteAccount?.noAccount}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Tipo de Cuenta:</strong> {fav.favoriteAccount?.typeAccount}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>ID:</strong> {fav._id}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Registrado el{" "}
                {new Date(fav.createdAt).toLocaleDateString()}
              </Text>

              <Flex mt={3} gap={2}>
                <Button
                  size="sm"
                  colorScheme="teal"
                  leftIcon={<FaEdit />}
                  variant="outline"
                  onClick={() => handleOpenEdit(fav)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  leftIcon={<FaTrash />}
                  variant="outline"
                  onClick={() => {
                    setSelectedFavoriteId(fav._id);
                    onDeleteOpen();
                  }}
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
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Eliminación
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que deseas eliminar este favorito? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteFavorite} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Alias</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Nuevo alias"
              value={editAliasInput}
              onChange={(e) => setEditAliasInput(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onEditClose}>Cancelar</Button>
            <Button colorScheme="teal" onClick={handleEditFavorite} ml={3}>
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
