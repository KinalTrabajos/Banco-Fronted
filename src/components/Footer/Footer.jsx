import {
  Box,
  Grid,
  Heading,
  Text,
  Link,
  Divider,
  VStack,
  Fade,
  useColorModeValue,
} from "@chakra-ui/react";

export const Footer = () => {
  const footerBg = useColorModeValue("gray.900", "gray.700");
  const headingColor = useColorModeValue("purple.400", "purple.200");
  const textColor = useColorModeValue("gray.300", "gray.300");
  const linkColor = useColorModeValue("purple.200", "purple.100");
  const linkHoverColor = useColorModeValue("purple.400", "purple.300");
  const dividerColor = useColorModeValue("gray.600", "gray.500");

  return (
    <Box
      as="footer"
      bg={footerBg}
      color={textColor}
      py={{ base: 10, md: 16 }}
      mt={{ base: 16, md: 24 }}
      transition="all 0.5s ease-in-out"
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.700", "gray.600")}
    >
      <Box maxW="1200px" mx="auto" px={{ base: 6, lg: 8 }}>
        <Fade in>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={{ base: 8, md: 12 }}
            textAlign={{ base: "center", sm: "left" }}
          >
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                mb={4}
                color={headingColor}
              >
                Nexus Bank
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={textColor}
                lineHeight="tall"
              >
                Un futuro financiero sólido, al alcance de tu mano. Con Nexus
                Bank, gestiona tu dinero con confianza y simplicidad.
              </Text>
            </Box>

            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                mb={4}
                color={headingColor}
              >
                Enlaces útiles
              </Heading>
              <VStack align={{ base: "center", sm: "flex-start" }} spacing={3}>
                <Link
                  href="#privacidad"
                  fontSize={{ base: "sm", md: "md" }}
                  color={linkColor}
                  _hover={{
                    color: linkHoverColor,
                    textDecoration: "underline",
                  }}
                  transition="color 0.2s ease-in-out"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="#terminos"
                  fontSize={{ base: "sm", md: "md" }}
                  color={linkColor}
                  _hover={{
                    color: linkHoverColor,
                    textDecoration: "underline",
                  }}
                  transition="color 0.2s ease-in-out"
                >
                  Términos y Condiciones
                </Link>
                <Link
                  href="#faq"
                  fontSize={{ base: "sm", md: "md" }}
                  color={linkColor}
                  _hover={{
                    color: linkHoverColor,
                    textDecoration: "underline",
                  }}
                  transition="color 0.2s ease-in-out"
                >
                  Preguntas Frecuentes
                </Link>
              </VStack>
            </Box>

            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "lg", md: "xl" }}
                mb={4}
                color={headingColor}
              >
                Contacto
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={textColor}
                lineHeight="tall"
              >
                Dirección: 7a. Av. 13-54 Zona 9, Guatemala
                <br />
                Correo: info@nexusbank.com
                <br />
                Teléfono: +502 2323-2323
              </Text>
            </Box>
          </Grid>
        </Fade>

        <Divider borderColor={dividerColor} mt={12} mb={8} />

        <Text
          textAlign="center"
          fontSize={{ base: "xs", md: "sm" }}
          color={textColor}
        >
          © {new Date().getFullYear()} Nexus Bank. Todos los derechos
          reservados.
        </Text>
      </Box>
    </Box>
  );
};
