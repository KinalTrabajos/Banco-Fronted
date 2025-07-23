import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'
import { Box, Heading, Text, Button, Stack, Image, Flex, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const BancoPagePrincipal = () => {

  const navigate = useNavigate();

  const primaryColor = useColorModeValue('purple.500', 'purple.300');
  const secondaryColor = useColorModeValue('gray.800', 'gray.100'); // Fondo oscuro principal
  const textColor = useColorModeValue('gray.200', 'gray.700'); // Texto que contrasta con el fondo
  const headingColor = useColorModeValue('purple.400', 'purple.200'); // Un morado más claro para el título
  const buttonColorScheme = "purple";
  const imageBorderColor = useColorModeValue('purple.500', 'purple.300');


  return (
    <Flex direction="column" minH="100vh" bg={secondaryColor}>
      <Navbar />

      <Flex
        flex="1"
        align="center"
        justify="center"
        p={8}
        direction={{ base: 'column', md: 'row' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Stack spacing={6} maxW="lg" mr={{ base: 0, md: 12 }}>
          <Heading as="h1" size="2xl" color={headingColor} fontWeight="extrabold">
            Bienvenido Nexus Bank
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color={textColor}>
            Consulta tus movimientos, realiza transferencias y gestiona tus finanzas de manera rápida y segura desde la comodidad de tu hogar.
          </Text>
          <Button
            colorScheme={buttonColorScheme}
            size="lg"
            alignSelf={{ base: 'center', md: 'flex-start' }}
            onClick={() => navigate('/cuenta')}
            mt={4}
            py={7} 
            px={10} 
            borderRadius="full" 
            boxShadow="xl"
            _hover={{
              transform: 'translateY(-3px)',
              boxShadow: '2xl',
              bg: useColorModeValue('purple.600', 'purple.400')
            }}
            transition="all 0.3s ease-in-out"
            fontWeight="bold"
            fontSize="xl"
          >
            Ver mi estado de cuenta
          </Button>
        </Stack>

        <Box
          display={{ base: 'none', md: 'block' }}
          ml={{ base: 0, md: 12 }}
          mt={{ base: 8, md: 0 }}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="2xl"
          border="3px solid"
          borderColor={imageBorderColor}
          _hover={{
            boxShadow: 'dark-lg',
            transform: 'scale(1.02)',
          }}
          transition="all 0.3s ease-in-out"
        >
          <Image
            src="https://static.wixstatic.com/media/d91b4f_43c54dcc6e5f45a186784eb679a0c73c~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-(1)-nexa.jpg"
            alt="Banco moderno"
            objectFit="cover"
            width="100%"
            height="auto"
            maxH="450px"
          />
        </Box>
      </Flex>

      <Footer />
    </Flex>
  )
}