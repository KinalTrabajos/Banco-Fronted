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
    useColorModeValue,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { useViewUser, useUpdateUser } from "../../shared/hooks/user";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserEdit, FaSignOutAlt, FaLock, FaSave } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const UserComponet = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose, } = useDisclosure()

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    const { user, setUser, isLoading } = useViewUser(userId);
    const { handleUpdateUser, handleUpdatePassword, loading } = useUpdateUser(userId)
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
        const updated = await handleUpdatePassword(passwordData);
        if (updated) {
            setPasswordData({ passwordOld: "", passwordNew: "" });
            handleLogout(); // Cerrar sesión después de un cambio exitoso de contraseña
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.700");
    const headingColor = useColorModeValue("purple.700", "purple.300");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const badgeColorScheme = {
        CLIENTE: "blue",
        EMPRESARIAL: "green",
        ADMIN: "red",
    };
    const buttonColorScheme = "purple";
    const logoutButtonScheme = "red";
    const editButtonScheme = "teal";
    const modalBg = useColorModeValue("white", "gray.700");
    const modalOverlayBg = useColorModeValue("blackAlpha.600", "blackAlpha.700");

    if (isLoading) {
        return (
            <Flex justify="center" align="center" height="100vh" bg={bgColor}>
                <Spinner size="xl" color={buttonColorScheme + ".500"} />
            </Flex>
        )
    }

    if (!user) {
        return (
            <Text textAlign="center" mt={10} color={textColor}>
                No se encontró el usuario.
            </Text>
        )
    }

    return (
        <>
            <Box
                maxW="xl"
                borderWidth="1px"
                borderRadius="2xl"
                borderColor={borderColor}
                overflow="hidden"
                p={{ base: 6, md: 8 }}
                boxShadow="xl"
                m="auto"
                mt={{ base: 8, md: 10 }}
                bg={cardBg}
                _hover={{ boxShadow: "dark-lg", transform: "translateY(-2px)" }}
                transition="all 0.3s ease-in-out"
            >
                <Flex justify="space-between" align="center" mb={6} pb={4} borderBottom="1px solid" borderColor={borderColor}>
                    <Heading size={{ base: "lg", md: "xl" }} color={headingColor}>
                        {user.name}
                        <Text as="span" fontSize="md" fontWeight="normal" ml={2}>({user.username})</Text>
                    </Heading>
                    <Flex gap={3}>
                        <IconButton
                            icon={<Icon as={FaUserEdit} />}
                            colorScheme={editButtonScheme}
                            size="md"
                            onClick={onEditOpen}
                            aria-label="Editar usuario"
                            borderRadius="full"
                            boxShadow="sm"
                            _hover={{ transform: "scale(1.1)", boxShadow: "md" }}
                        />
                        <IconButton
                            icon={<Icon as={FaSignOutAlt} />}
                            colorScheme={logoutButtonScheme}
                            size="md"
                            onClick={onOpen}
                            aria-label="Cerrar sesión"
                            borderRadius="full"
                            boxShadow="sm"
                            _hover={{ transform: "scale(1.1)", boxShadow: "md" }}
                        />
                    </Flex>
                </Flex>

                <Stack spacing={3} color={textColor} fontSize={{ base: "md", md: "lg" }}>
                    <Text>
                        <Text as="span" fontWeight="semibold">DPI:</Text> {user.dpi}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Dirección:</Text> {user.direction || "No especificada"}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Teléfono:</Text> {user.phone}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Email:</Text> {user.email}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Trabajo:</Text> {user.work || "No especificado"}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Ingreso mensual:</Text> Q{parseFloat(user.income).toFixed(2) || '0.00'}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Cuenta:</Text> {user.noAccount}
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Rol:</Text> <Badge colorScheme={badgeColorScheme[user.role] || "gray"} borderRadius="md" px={2} py={1}>
                            {user.role}
                        </Badge>
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Tipo de cuenta:</Text>{" "}
                        <Badge colorScheme={badgeColorScheme[user.typeAccount] || "gray"} borderRadius="md" px={2} py={1}>
                            {user.typeAccount}
                        </Badge>
                    </Text>
                    <Text>
                        <Text as="span" fontWeight="semibold">Estado:</Text>{" "}
                        <Badge colorScheme={user.status ? "green" : "red"} borderRadius="md" px={2} py={1}>
                            {user.status ? "Activo" : "Inactivo"}
                        </Badge>
                    </Text>
                    <Text fontSize="sm" color="gray.500" pt={2} borderTop="1px dashed" borderColor={borderColor}>
                        Miembro desde: {format(new Date(user.createdAt), "PPP - hh:mm a", { locale: es })}
                    </Text>
                </Stack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay bg={modalOverlayBg} />
                <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
                    <ModalHeader color={headingColor}>Confirmar cierre de sesión</ModalHeader>
                    <ModalCloseButton color={textColor} />
                    <ModalBody color={textColor}>
                        <Text>¿Estás seguro que deseas cerrar sesión?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose} colorScheme={buttonColorScheme}>
                            Cancelar
                        </Button>
                        <Button colorScheme={logoutButtonScheme} onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered size="lg">
                <ModalOverlay bg={modalOverlayBg} />
                <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
                    <ModalHeader color={headingColor} borderBottom="1px solid" borderColor={borderColor} pb={4}>
                        <Heading size="md">Editar Perfil y Contraseña</Heading>
                    </ModalHeader>
                    <ModalCloseButton color={textColor} />
                    <ModalBody py={6}>
                        <VStack spacing={5}>
                            <FormControl>
                                <FormLabel color={textColor}>Nombre Completo</FormLabel>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: editButtonScheme + ".400" }}
                                    _focus={{ borderColor: editButtonScheme + ".500", boxShadow: `0 0 0 1px ${editButtonScheme}.500` }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color={textColor}>Dirección</FormLabel>
                                <Input
                                    name="direction"
                                    value={formData.direction}
                                    onChange={handleInputChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: editButtonScheme + ".400" }}
                                    _focus={{ borderColor: editButtonScheme + ".500", boxShadow: `0 0 0 1px ${editButtonScheme}.500` }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color={textColor}>Lugar de Trabajo</FormLabel>
                                <Input
                                    name="work"
                                    value={formData.work}
                                    onChange={handleInputChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: editButtonScheme + ".400" }}
                                    _focus={{ borderColor: editButtonScheme + ".500", boxShadow: `0 0 0 1px ${editButtonScheme}.500` }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color={textColor}>Ingreso Mensual (Q)</FormLabel>
                                <Input
                                    type="number"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleInputChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: editButtonScheme + ".400" }}
                                    _focus={{ borderColor: editButtonScheme + ".500", boxShadow: `0 0 0 1px ${editButtonScheme}.500` }}
                                />
                            </FormControl>

                            <Divider my={4} borderColor={borderColor} />

                            <Heading size="sm" color={headingColor} alignSelf="flex-start">Cambiar Contraseña</Heading>
                            <FormControl>
                                <FormLabel color={textColor}>Contraseña Actual</FormLabel>
                                <Input
                                    type="password"
                                    name="passwordOld"
                                    value={passwordData.passwordOld}
                                    onChange={handlePasswordChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: buttonColorScheme + ".400" }}
                                    _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color={textColor}>Contraseña Nueva</FormLabel>
                                <Input
                                    type="password"
                                    name="passwordNew"
                                    value={passwordData.passwordNew}
                                    onChange={handlePasswordChange}
                                    color={textColor}
                                    borderColor={borderColor}
                                    _hover={{ borderColor: buttonColorScheme + ".400" }}
                                    _focus={{ borderColor: buttonColorScheme + ".500", boxShadow: `0 0 0 1px ${buttonColorScheme}.500` }}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter gap={3} borderTop="1px solid" borderColor={borderColor} pt={4}>
                        <Button
                            colorScheme={editButtonScheme}
                            onClick={handleSubmit}
                            isLoading={loading}
                            leftIcon={<Icon as={FaSave} />}
                            size="lg"
                        >
                            Guardar Cambios
                        </Button>
                        <Button
                            colorScheme={buttonColorScheme}
                            onClick={handlePasswordSubmit}
                            isLoading={loading}
                            leftIcon={<Icon as={FaLock} />}
                            size="lg"
                        >
                            Cambiar Contraseña
                        </Button>
                        <Button variant="ghost" onClick={onEditClose} colorScheme={logoutButtonScheme} size="lg">
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}