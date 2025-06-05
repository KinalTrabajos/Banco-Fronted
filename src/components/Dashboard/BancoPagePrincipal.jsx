import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { Box, Heading, Text, Button, Stack, Image, Flex } from '@chakra-ui/react'

export const BancoPagePrincipal = () => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Navbar />

      <Flex flex="1" align="center" justify="center" p={8}>
        <Stack spacing={6} maxW="lg" textAlign="center">
          <Heading color="teal.600">Bienvenido al Banco Ágil</Heading>
          <Text fontSize="lg" color="gray.600">
            Consulta tu cuenta, haz transferencias y accede a servicios financieros en segundos.
          </Text>
          <Button colorScheme="teal" size="lg" alignSelf="center">
            Iniciar sesión
          </Button>
        </Stack>

        <Box display={{ base: 'none', md: 'block' }} ml={12}>
          <Image
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3"
            alt="Banco moderno"
            borderRadius="xl"
            boxShadow="xl"
            maxW="400px"
          />
        </Box>
      </Flex>

      <Footer />
    </Flex>
  )
}
