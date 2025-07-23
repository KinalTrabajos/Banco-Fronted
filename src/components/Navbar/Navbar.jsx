import {
  Box,
  Flex,
  Text,
  Spacer,
  Link as ChakraLink,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const logoUrl =
  "https://static.vecteezy.com/system/resources/previews/013/948/727/non_2x/bank-icon-logo-design-vector.jpg";
const userIconUrl = "https://cdn-icons-png.flaticon.com/512/456/456212.png";

export const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [navigation, setNavigation] = useState([]);

  const navbarBg = useColorModeValue("gray.900", "gray.700"); // Fondo oscuro para la navbar
  const navbarColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900"); // Color del texto
  const linkHoverColor = useColorModeValue("purple.300", "purple.200"); // Morado para hover
  const linkUnderlineColor = useColorModeValue("purple.400", "purple.300"); // Morado para la línea

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "ADMIN_ROLE") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const navigationAdmin = [
        { name: "Cuentas", href: "/cuenta" },
        { name: "Facturas", href: "/bills" },
        { name: "Registrar", href: "/requests" },
      ];
      setNavigation(navigationAdmin);
    } else {
      const navigationUser = [
        { name: "Mi Cuenta", href: "/cuenta" },
        { name: "Transferencia", href: "/tranferencia" },
        { name: "Compras", href: "/compras" },
        { name: "Facturas", href: "/bills" },
        { name: "Favoritos", href: "/favorito" },
      ];
      setNavigation(navigationUser);
    }
  }, [isAdmin]);

  return (
    <Box
      as="header"
      bg={navbarBg}
      color={navbarColor}
      py={4}
      px={{ base: 4, md: 8 }}
      boxShadow="xl"
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.700", "gray.600")}
    >
      <Flex align="center" maxW="1400px" mx="auto" gap={10}>
        <Flex
          as={RouterLink}
          to="/DashboardPage"
          align="center"
          gap={4}
          _hover={{ textDecoration: "none", transform: "scale(1.02)" }}
          transition="all 0.2s ease-in-out"
        >
          <Image
            src={logoUrl}
            alt="Logo Banco"
            boxSize={{ base: "35px", md: "45px" }}
            borderRadius="full"
            border="2px solid"
            borderColor={linkUnderlineColor}
            p="2px"
          />
          <Box>
            <Heading size={{ base: "md", md: "lg" }} color={linkHoverColor}>
              Nexus Bank
            </Heading>
            <Text fontSize={{ base: "xs", md: "sm" }} color={navbarColor}>
              Tu dinero, más cerca de ti
            </Text>
          </Box>
        </Flex>

        <Flex gap={{ base: 3, md: 8 }} ml={8}>
          {navigation.map((item) => (
            <ChakraLink
              as={RouterLink}
              to={item.href}
              key={item.name}
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              position="relative"
              p={2}
              borderRadius="md"
              _hover={{
                color: linkHoverColor,
                textDecoration: "none",
                bg: useColorModeValue("gray.800", "gray.600"), // Un sutil fondo al hacer hover
                _after: {
                  width: "100%",
                },
              }}
              _after={{
                content: '""',
                position: "absolute",
                bottom: "0px", // Ajustado para estar justo en la base del enlace
                left: 0,
                width: "0%",
                height: "2px",
                bg: linkUnderlineColor,
                transition: "width 0.3s ease-in-out",
              }}
              transition="all 0.3s ease-in-out"
            >
              {item.name}
            </ChakraLink>
          ))}
        </Flex>

        <Spacer />

        <Flex
          as={RouterLink}
          to="/user"
          align="center"
          gap={3}
          cursor="pointer"
          p={2}
          borderRadius="md"
          _hover={{
            color: linkHoverColor,
            transform: "scale(1.05)",
            bg: useColorModeValue("gray.800", "gray.600"),
          }}
          transition="all 0.3s ease-in-out"
        >
          <Image
            src={userIconUrl}
            alt="Usuarios"
            boxSize={{ base: "28px", md: "36px" }}
            borderRadius="full"
            border="2px solid"
            borderColor={linkUnderlineColor}
            p="1px"
          />
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            color={navbarColor}
          >
            Usuarios
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
