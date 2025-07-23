import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input as ChakraInput,
    Select,
    Text,
    VStack,
    Heading,
    useColorModeValue,
    SimpleGrid,
    Flex, 
} from "@chakra-ui/react";

import { useRegister } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";
import { Input } from "../setting/Input"; 

export const Register = () => {
    const navigate = useNavigate();
    const { register, isLoading, isSuccess } = useRegister();

    const primaryColor = useColorModeValue('purple.500', 'purple.300');
    const accentColor = useColorModeValue('gray.800', 'gray.100');
    const cardBg = useColorModeValue('gray.900', 'gray.700');
    const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
    const inputBorderColor = useColorModeValue('gray.600', 'gray.500');
    const inputFocusBorderColor = useColorModeValue('purple.400', 'purple.300');
    const pageBg = useColorModeValue('gray.200', 'gray.950');


    const [formState, setFormState] = useState({
        name: { value: "", isValid: false, showError: false },
        username: { value: "", isValid: false, showError: false },
        dpi: { value: "", isValid: false, showError: false },
        work: { value: "", isValid: false, showError: false },
        nombreEmpresa: { value: "", isValid: false, showError: false },
        email: { value: "", isValid: false, showError: false },
        password: { value: "", isValid: false, showError: false },
        passwordConfir: { value: "", isValid: false, showError: false },
        direction: { value: "", isValid: false, showError: false },
        phone: { value: "", isValid: false, showError: false },
        income: { value: "", isValid: false, showError: false },
        typeAccount: { value: "NORMAL", isValid: true, showError: false },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: value,
                showError: false,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "name":
                isValid = value.length >= 3;
                break;
            case "username":
                isValid = value.length >= 3;
                break;
            case "direction":
                isValid = value.length > 9;
                break;
            case "phone":
                isValid = value.length >= 8;
                break;
            case "dpi":
                isValid = /^[0-9]{13}$/.test(value);
                break;
            case "work":
            case "nombreEmpresa":
                isValid = value.length >= 5;
                break;
            case "email":
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case "password":
                isValid = value.length >= 10;
                break;
            case "passwordConfir":
                isValid = value === formState.password.value;
                break;
            case "income":
                isValid = !isNaN(value) && Number(value) >= 1;
                break;
            default:
                isValid = false;
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

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            name: formState.name.value,
            username: formState.username.value,
            direction: formState.direction.value,
            phone: formState.phone.value,
            email: formState.email.value,
            password: formState.password.value,
            income: Number(formState.income.value),
            typeAccount: formState.typeAccount.value,
            role: "USER_ROLE",
        };

        if (formState.typeAccount.value === "NORMAL") {
            if (formState.dpi.value) data.dpi = formState.dpi.value;
            if (formState.work.value) data.work = formState.work.value;
        } else {
            if (formState.nombreEmpresa.value)
                data.nombreEmpresa = formState.nombreEmpresa.value;
        }

        register(data);
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.name.isValid ||
        !formState.username.isValid ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfir.isValid ||
        !formState.direction.isValid ||
        !formState.phone.isValid ||
        !formState.income.isValid ||
        (formState.typeAccount.value === "NORMAL" &&
            (!formState.dpi.isValid || !formState.work.isValid)) ||
        (formState.typeAccount.value === "EMPRESARIAL" &&
            !formState.nombreEmpresa.isValid);

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
    }, [isSuccess, navigate]);

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={pageBg}
            p={{ base: 4, md: 8 }}
        >
            <Box
                maxW={{ base: "95%", md: "800px" }}
                mx="auto"
                mt={{ base: "4", md: "8" }}
                p={{ base: "6", md: "10" }}
                bg={cardBg}
                boxShadow="2xl"
                borderRadius="xl"
                border="1px solid"
                borderColor={useColorModeValue('gray.700', 'gray.600')}
                color={textColor}
                _hover={{
                    boxShadow: "dark-lg",
                    transform: "translateY(-5px)",
                }}
                transition="all 0.3s ease-in-out"
            >
                <Heading mb={8} textAlign="center" fontWeight="extrabold" size="xl" color={primaryColor}>
                    Solicitar Nueva Cuenta 
                </Heading>

                <form onSubmit={handleRegister}>
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={6}
                        p={6}
                        borderRadius="md"
                        bg={useColorModeValue('gray.800', 'gray.600')} 
                        boxShadow="inner" 
                    >
                        <FormControl gridColumn={{ base: "span 1", md: "span 2" }}>
                            <FormLabel fontWeight="semibold">Tipo de Cuenta</FormLabel>
                            <Select
                                value={formState.typeAccount.value}
                                onChange={(e) => handleInputValueChange(e.target.value, "typeAccount")}
                                focusBorderColor={inputFocusBorderColor}
                                shadow="sm"
                                borderRadius="md"
                                size="lg"
                                bg={useColorModeValue('gray.700', 'gray.500')}
                                color={textColor}
                                borderColor={inputBorderColor}
                                _hover={{ borderColor: inputFocusBorderColor }}
                            >
                                <option value="NORMAL">Normal</option>
                                <option value="EMPRESARIAL">Empresarial</option>
                            </Select>
                        </FormControl>

                        <Input
                            field="name"
                            label="Nombre"
                            value={formState.name.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.name.showError}
                            validationMessage="El nombre debe tener al menos 3 caracteres."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="username"
                            label="Nombre de Usuario"
                            value={formState.username.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.username.showError}
                            validationMessage="El nombre de usuario debe tener al menos 3 caracteres."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        {formState.typeAccount.value === "NORMAL" && (
                            <>
                                <Input
                                    field="dpi"
                                    label="DPI"
                                    value={formState.dpi.value}
                                    onChangeHandler={handleInputValueChange}
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.dpi.showError}
                                    validationMessage="El DPI debe tener 13 dígitos."
                                    inputProps={{
                                        size: "lg",
                                        borderColor: inputBorderColor,
                                        _hover: { borderColor: inputFocusBorderColor },
                                        _focus: {
                                            borderColor: inputFocusBorderColor,
                                            boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                        },
                                        bg: useColorModeValue('gray.700', 'gray.600'),
                                        color: textColor,
                                    }}
                                    labelProps={{ fontWeight: "semibold" }}
                                    errorProps={{ fontSize: "sm", color: "red.300" }}
                                />
                                <Input
                                    field="work"
                                    label="Nombre de Trabajo"
                                    value={formState.work.value}
                                    onChangeHandler={handleInputValueChange}
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.work.showError}
                                    validationMessage="El nombre del trabajo debe tener al menos 5 caracteres."
                                    inputProps={{
                                        size: "lg",
                                        borderColor: inputBorderColor,
                                        _hover: { borderColor: inputFocusBorderColor },
                                        _focus: {
                                            borderColor: inputFocusBorderColor,
                                            boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                        },
                                        bg: useColorModeValue('gray.700', 'gray.600'),
                                        color: textColor,
                                    }}
                                    labelProps={{ fontWeight: "semibold" }}
                                    errorProps={{ fontSize: "sm", color: "red.300" }}
                                />
                            </>
                        )}

                        {formState.typeAccount.value === "EMPRESARIAL" && (
                            <Input
                                field="nombreEmpresa"
                                label="Nombre de la Empresa"
                                value={formState.nombreEmpresa.value}
                                onChangeHandler={handleInputValueChange}
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.nombreEmpresa.showError}
                                validationMessage="El nombre de la empresa debe tener al menos 5 caracteres."
                                inputProps={{
                                    size: "lg",
                                    borderColor: inputBorderColor,
                                    _hover: { borderColor: inputFocusBorderColor },
                                    _focus: {
                                        borderColor: inputFocusBorderColor,
                                        boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                    },
                                    bg: useColorModeValue('gray.700', 'gray.600'),
                                    color: textColor,
                                }}
                                labelProps={{ fontWeight: "semibold" }}
                                errorProps={{ fontSize: "sm", color: "red.300" }}
                            />
                        )}

                        <Input
                            field="email"
                            label="Correo Electrónico"
                            value={formState.email.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.email.showError}
                            validationMessage="Correo electrónico inválido."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="password"
                            label="Contraseña"
                            type="password"
                            value={formState.password.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.password.showError}
                            validationMessage="La contraseña debe tener al menos 10 caracteres."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="passwordConfir"
                            label="Confirmar Contraseña"
                            type="password"
                            value={formState.passwordConfir.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.passwordConfir.showError}
                            validationMessage="Las contraseñas no coinciden."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="direction"
                            label="Dirección"
                            value={formState.direction.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.direction.showError}
                            validationMessage="La dirección debe tener al menos 10 caracteres."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="phone"
                            label="Teléfono"
                            value={formState.phone.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.phone.showError}
                            validationMessage="El teléfono debe tener al menos 8 dígitos."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Input
                            field="income"
                            label="Ingresos Mensuales"
                            value={formState.income.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.income.showError}
                            validationMessage="Los ingresos deben ser un número válido."
                            inputProps={{
                                size: "lg",
                                borderColor: inputBorderColor,
                                _hover: { borderColor: inputFocusBorderColor },
                                _focus: {
                                    borderColor: inputFocusBorderColor,
                                    boxShadow: `0 0 0 1px ${inputFocusBorderColor}`,
                                },
                                bg: useColorModeValue('gray.700', 'gray.600'),
                                color: textColor,
                            }}
                            labelProps={{ fontWeight: "semibold" }}
                            errorProps={{ fontSize: "sm", color: "red.300" }}
                        />

                        <Button
                            type="submit"
                            colorScheme="purple"
                            isLoading={isLoading}
                            isDisabled={isSubmitButtonDisabled}
                            size="lg"
                            w="full"
                            borderRadius="md"
                            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
                            transition="all 0.2s ease-in-out"
                            gridColumn={{ base: "span 1", md: "span 2" }}
                            mt={4}
                            fontWeight="bold"
                        >
                            Solicitar Cuenta
                        </Button>
                    </SimpleGrid>
                </form>
                <Text mt={6} textAlign="center" fontSize="md">
                    ¿Ya tienes una cuenta?{" "}
                    <Button
                        variant="link"
                        colorScheme="purple"
                        fontWeight="bold"
                        onClick={() => navigate('/')}
                        _hover={{ textDecoration: "underline" }}
                    >
                        Iniciar Sesión
                    </Button>
                </Text>
            </Box>
        </Flex>
    )
}
export default Register