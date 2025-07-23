import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input as ChakraInput,
  Text,
  VStack,
  useColorModeValue,
  Flex,
  Image,
} from "@chakra-ui/react";
import {
  emailValidationMessage,
  validateEmail,
  validatePasswordMessage,
  validatePassword,
} from "../../shared/validators";
import { useLogin } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";

import loginImage from "../../assets/image/login.jpeg";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const primaryColor = useColorModeValue('purple.500', 'purple.300');
  const accentColor = useColorModeValue('gray.800', 'gray.100'); // Negro/gris oscuro para el texto y fondo general
  const cardBg = useColorModeValue('gray.900', 'gray.700'); // Fondo del formulario oscuro en ambos modos
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900'); // Texto blanco dentro del formulario
  const inputBorderColor = useColorModeValue('gray.600', 'gray.500');
  const inputFocusBorderColor = useColorModeValue('purple.400', 'purple.300');
  const imageBorderColor = useColorModeValue('purple.500', 'purple.300'); // Borde de la imagen morado

  const [formState, setFormState] = useState({
    email: {
      value: "",
      isValid: false,
      showError: false,
    },
    password: {
      value: "",
      isValid: false,
      showError: false,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(formState.email.value, formState.password.value);
  };

  const isSubmitButtonDisabled =
    isLoading || !formState.email.isValid || !formState.password.isValid;

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={accentColor}
      p={{ base: 4, md: 8 }}
    >
      <Box
        flex="1"
        display={{ base: "none", md: "block" }}
        position="relative"
        overflow="hidden"
        borderRadius="xl"
        boxShadow="2xl"
        height="600px"
        mr={8}
        border="2px solid"
        borderColor={imageBorderColor}
      >
        <Image
          src={loginImage}
          alt="Login Background"
          objectFit="cover"
          width="100%"
          height="100%"
          fallbackSrc="https://via.placeholder.com/600x800?text=Imagen+de+Login"
        />
      </Box>

      <Box
        maxW={{ base: "90%", md: "450px" }}
        mx={{ base: "auto", md: "unset" }}
        p={{ base: "6", md: "10" }}
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="2xl"
        bg={cardBg}
        color={textColor}
        borderColor={useColorModeValue('gray.700', 'gray.600')}
        _hover={{
          boxShadow: "dark-lg",
          transform: "translateY(-5px)",
        }}
        transition="all 0.3s ease-in-out"
      >
        <Heading mb="8" textAlign="center" size="xl" color={primaryColor} fontWeight="extrabold">
          Bienvenido de Nuevo
        </Heading>

        <form onSubmit={handleLogin}>
          <VStack spacing="5">
            <FormControl
              isInvalid={formState.email.showError}
              isRequired
            >
              <FormLabel htmlFor="email" fontWeight="semibold">Email</FormLabel>
              <ChakraInput
                id="email"
                type="email"
                value={formState.email.value}
                onChange={(e) => handleInputValueChange(e.target.value, "email")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "email")}
                size="lg"
                borderColor={inputBorderColor}
                _hover={{ borderColor: inputFocusBorderColor }}
                _focus={{
                  borderColor: inputFocusBorderColor,
                  boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                }}
              />
              {formState.email.showError && (
                <FormErrorMessage fontSize="sm" color="red.400">{emailValidationMessage}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={formState.password.showError}
              isRequired
            >
              <FormLabel htmlFor="password" fontWeight="semibold">Contraseña</FormLabel>
              <ChakraInput
                id="password"
                type="password"
                value={formState.password.value}
                onChange={(e) => handleInputValueChange(e.target.value, "password")}
                onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
                size="lg"
                borderColor={inputBorderColor}
                _hover={{ borderColor: inputFocusBorderColor }}
                _focus={{
                  borderColor: inputFocusBorderColor,
                  boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                }}
              />
              {formState.password.showError && (
                <FormErrorMessage fontSize="sm" color="red.400">{validatePasswordMessage}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              width="full"
              isDisabled={isSubmitButtonDisabled}
              isLoading={isLoading}
              mt="4"
              fontWeight="bold"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s ease-in-out"
            >
              Iniciar Sesión
            </Button>

            <Text fontSize="md" mt="4" textAlign="center">
              ¿No tienes cuenta?{" "}
              <Button
                variant="link"
                colorScheme="purple"
                fontWeight="bold"
                onClick={() => navigate('/register')}
                _hover={{ textDecoration: "underline" }}
              >
                Solicita una aquí
              </Button>
            </Text>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}