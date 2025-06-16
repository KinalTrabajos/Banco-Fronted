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
} from "@chakra-ui/react";
import {
  emailValidationMessage,
  validateEmail,
  validatePasswordMessage,
  validatePassword,
} from "../../shared/validators";
import { useLogin } from "../../shared/hooks";

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin()

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
    <Box
      maxW="400px"
      mx="auto"
      mt="8"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading mb="6" textAlign="center" size="lg">
        Iniciar Sesión
      </Heading>

      <form onSubmit={handleLogin}>
        <VStack spacing="4">
          <FormControl
            isInvalid={formState.email.showError}
            isRequired
          >
            <FormLabel>Email</FormLabel>
            <ChakraInput
              type="email"
              value={formState.email.value}
              onChange={(e) => handleInputValueChange(e.target.value, "email")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "email")}
            />
            {formState.email.showError && (
              <FormErrorMessage>{emailValidationMessage}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isInvalid={formState.password.showError}
            isRequired
          >
            <FormLabel>Contraseña</FormLabel>
            <ChakraInput
              type="password"
              value={formState.password.value}
              onChange={(e) => handleInputValueChange(e.target.value, "password")}
              onBlur={(e) => handleInputValidationOnBlur(e.target.value, "password")}
            />
            {formState.password.showError && (
              <FormErrorMessage>{validatePasswordMessage}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isDisabled={isSubmitButtonDisabled}
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </VStack>
      </form> 
    </Box>
  )
}
