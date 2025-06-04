import {
  Box,
  Grid,
  Heading,
  Text,
  Link,
  Divider,
  VStack,
  Fade,
} from '@chakra-ui/react'

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#096B68"
      color="white"
      py={12}
      mt={20}
      transition="all 0.5s ease-in-out"
    >
      <Box maxW="7xl" mx="auto" px={{ base: 6, lg: 8 }}>
        <Fade in>
          <Grid
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={10}
          >
            <Box>
              <Heading as="h3" fontSize="xl" mb={2}>
                Banco Ágil
              </Heading>
              <Text fontSize="sm" color="#FFFBDE" lineHeight="tall">
                informacion del banco no se que poner aldair hueco no se le para me conto jeremy Xd
              </Text>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" mb={2}>
                Enlaces útiles
              </Heading>
              <VStack align="start" spacing={2}>
                <Link href="#cuenta" fontSize="sm" color="#FFFBDE" _hover={{ color: 'white' }}>
                  Kinal
                </Link>
                <Link href="#transferencia" fontSize="sm" color="#FFFBDE" _hover={{ color: 'white' }}>
                  Redes sociales
                </Link>
                <Link href="#retiro" fontSize="sm" color="#FFFBDE" _hover={{ color: 'white' }}>
                  Reyes
                </Link>
              </VStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" mb={2}>
                Contacto
              </Heading>
              <Text fontSize="sm" color="#FFFBDE" lineHeight="tall">
                Dirección: Ciudad de Guatemala
                <br />
                Correo: elvergalarga11@gmail.com
                <br />
                Teléfono: +502 3575 0000
              </Text>
            </Box>
          </Grid>
        </Fade>

        <Divider borderColor="#FFFBDE" mt={10} mb={6} />

        <Text textAlign="center" fontSize="sm" color="#FFFBDE">
          © {new Date().getFullYear()} Grupo 4 chepe el admin el mas chiludo.
        </Text>
      </Box>
    </Box>
  )
}
