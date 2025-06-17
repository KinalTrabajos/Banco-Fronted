import {
  Box,
  Flex,
  Text,
  Spacer,
  Link as ChakraLink,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { href, Link as RouterLink } from "react-router-dom"; // 👈 Importa el Link de react-router-dom

const logoUrl =
  "https://static.vecteezy.com/system/resources/previews/013/948/727/non_2x/bank-icon-logo-design-vector.jpg";
const userIconUrl = "https://cdn-icons-png.flaticon.com/512/456/456212.png";

export const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "ADMIN_ROLE") {
      setIsAdmin(true);
    }
  }, []);

  const navigation = [
    { name: "Cuentas", href: "/cuenta" },
    { name: "Transferencia", href: "/transferencia" },
    { name: "Facturas", href: "/bills"},
    ...(isAdmin ? [{ name: "Register", href: "/register" }] : []),
  ];

  return (
    <Box
      as="header"
      bg="teal.500"
      color="white"
      py={4}
      px={{ base: 4, md: 8 }}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center" maxW="1200px" mx="auto" gap={10}>
        <Flex
          as={RouterLink}
          to="/DashboardPage"
          align="center"
          gap={4}
          _hover={{ textDecoration: "none", transform: "scale(1.02)" }}
          transition="all 0.2s ease"
        >
          <Image
            src={logoUrl}
            alt="Logo Banco"
            boxSize="40px"
            borderRadius="full"
          />
          <Box>
            <Heading size="lg">Nexus Bank</Heading>
            <Text fontSize="sm">Tu dinero, más cerca de ti</Text>
          </Box>
        </Flex>

        <Flex gap={{ base: 4, md: 8 }} ml={8}>
          {navigation.map((item) => (
            <ChakraLink
              as={RouterLink} // 👈 Esto permite navegación con SPA
              to={item.href}
              key={item.name}
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              position="relative"
              _hover={{
                color: "teal.200",
                _after: {
                  width: "100%",
                },
              }}
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-4px",
                left: 0,
                width: "0%",
                height: "2px",
                bg: "teal.200",
                transition: "width 0.3s ease",
              }}
              transition="color 0.3s ease"
            >
              {item.name}
            </ChakraLink>
          ))}
        </Flex>

        <Spacer />

        <Flex
          as={RouterLink} // 👈 Enlace completo al perfil de usuario
          to="/user"
          align="center"
          gap={3}
          cursor="pointer"
          _hover={{ color: "teal.200", transform: "scale(1.05)" }}
          transition="all 0.3s ease"
        >
          <Image
            src={userIconUrl}
            alt="Usuarios"
            boxSize="32px"
            borderRadius="full"
          />
          <Text fontWeight="bold" fontSize="lg">
            Usuarios
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
