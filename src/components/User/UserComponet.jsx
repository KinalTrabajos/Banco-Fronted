import {
  Box,
  Text,
  Spinner,
  Heading,
  Stack,
  Badge,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useViewUser, useUpdateUser } from "../../shared/hooks/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const UserComponet = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isOpen: isEditOpen,onOpen: onEditOpen,onClose: onEditClose,} = useDisclosure()

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  const { user, setUser, isLoading } = useViewUser(userId);
  const { handleUpdateUser, handleUpdatePassword, loading} = useUpdateUser(userId)
  const [formData, setFormData] = useState({
    name: "",
    direction: "",
    work: "",
    income: "",
  })

  const [passwordData, setPasswordData] = useState({
    passwordOld: "",
    passwordNew: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        direction: user.direction || "",
        work: user.work || "",
        income: user.income || "",
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const updated = await handleUpdateUser(formData)
    if (updated) {
      setUser((prev) => ({ ...prev, ...formData }))
    }
    onEditClose()
  }

  const handlePasswordSubmit = async () => {
    await handleUpdatePassword(passwordData)
    setPasswordData({ passwordOld: "", passwordNew: "" })
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    )
  }

  if (!user) {
    return (
      <Text textAlign="center" mt={10}>
        No se encontró el usuario
      </Text>
    )
  }

  return (
    <>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        p={6}
        boxShadow="xl"
        m="auto"
        mt={10}
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">
            {user.name} ({user.username})
          </Heading>
          <Flex gap={2}>
            <Button colorScheme="blue" size="sm" onClick={onEditOpen}>
              Editar usuario
            </Button>
            <Button colorScheme="red" size="sm" onClick={onOpen}>
              Cerrar sesión
            </Button>
          </Flex>
        </Flex>

        <Stack spacing={2}>
          <Text>
            <strong>DPI:</strong> {user.dpi}
          </Text>
          <Text>
            <strong>Dirección:</strong> {user.direction}
          </Text>
          <Text>
            <strong>Teléfono:</strong> {user.phone}
          </Text>
          <Text>
            <strong>Email:</strong> {user.email}
          </Text>
          <Text>
            <strong>Trabajo:</strong> {user.work}
          </Text>
          <Text>
            <strong>Ingreso mensual:</strong> Q{user.income}
          </Text>
          <Text>
            <strong>Cuenta:</strong> {user.noAccount}
          </Text>
          <Text>
            <strong>Rol:</strong> <Badge colorScheme="blue">{user.role}</Badge>
          </Text>
          <Text>
            <strong>Tipo de cuenta:</strong>{" "}
            <Badge colorScheme="green">{user.typeAccount}</Badge>
          </Text>
          <Text>
            <strong>Estado:</strong>{" "}
            <Badge colorScheme={user.status ? "green" : "red"}>
              {user.status ? "Activo" : "Inactivo"}
            </Badge>
          </Text>
          <Text fontSize="xs" color="gray.500">
            Creado: {new Date(user.createdAt).toLocaleString()}
          </Text>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar cierre de sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>¿Estás seguro que deseas cerrar sesión?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar usuario y contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direction"
                  value={formData.direction}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lugar de trabajo</FormLabel>
                <Input
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ingreso mensual</FormLabel>
                <Input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Divider />

              <FormControl>
                <FormLabel>Contraseña actual</FormLabel>
                <Input
                  type="password"
                  name="passwordOld"
                  value={passwordData.passwordOld}
                  onChange={handlePasswordChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contraseña nueva</FormLabel>
                <Input
                  type="password"
                  name="passwordNew"
                  value={passwordData.passwordNew}
                  onChange={handlePasswordChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Guardar cambios
            </Button>
            <Button
              colorScheme="blue"
              onClick={handlePasswordSubmit}
              isLoading={loading}
            >
              Cambiar contraseña
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
