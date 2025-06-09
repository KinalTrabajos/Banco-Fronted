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
    SimpleGrid
} from "@chakra-ui/react";

import { useRegister } from "../../shared/hooks";
import { useNavigate } from "react-router-dom";
import { Input } from "../setting/Input";

const Register = () => {
    const navigate = useNavigate();
    const { register, isLoading, isSuccess } = useRegister();

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
            case "username":
            case "direction":
            case "phone":
                isValid = value.length >= 3;
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
                isValid = !isNaN(value) && Number(value) >= 0;
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
        if (isSuccess) navigate("/login");
    }, [isSuccess, navigate]);

    const bgColor = useColorModeValue("white", "gray.800");
    const formBg = useColorModeValue("gray.50", "gray.700");
    const btnColorScheme = "blue";

    return (
        <Box
            maxW="600px"
            mx="auto"
            mt={10}
            p={8}
            bg={bgColor}
            boxShadow="2xl"
            borderRadius="lg"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
        >
            <Heading mb={6} textAlign="center" fontWeight="extrabold" size="xl">
                Create Your Account
            </Heading>

            <form onSubmit={handleRegister}>
                <SimpleGrid
                    columns={2}
                    spacing={5}
                    bg={formBg}
                    p={6}
                    borderRadius="md"
                    boxShadow="md"
                >
                    <FormControl gridColumn="span 2">
                        <FormLabel>Account Type</FormLabel>
                        <Select
                            value={formState.typeAccount.value}
                            onChange={(e) => handleInputValueChange(e.target.value, "typeAccount")}
                            focusBorderColor={`${btnColorScheme}.500`}
                            shadow="sm"
                            borderRadius="md"
                        >
                            <option value="NORMAL">Normal</option>
                            <option value="EMPRESARIAL">Empresarial</option>
                        </Select>
                    </FormControl>

                    <Input
                        field="name"
                        label="Name"
                        value={formState.name.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.name.showError}
                        validationMessage="Name must be at least 3 characters"
                    />

                    <Input
                        field="username"
                        label="Username"
                        value={formState.username.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.username.showError}
                        validationMessage="Username must be at least 3 characters"
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
                                validationMessage="DPI must be 13 digits"
                            />
                            <Input
                                field="work"
                                label="Work"
                                value={formState.work.value}
                                onChangeHandler={handleInputValueChange}
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.work.showError}
                                validationMessage="Work must be at least 5 characters"
                            />
                        </>
                    )}

                    {formState.typeAccount.value === "EMPRESARIAL" && (
                        <Input
                            field="nombreEmpresa"
                            label="Company Name"
                            value={formState.nombreEmpresa.value}
                            onChangeHandler={handleInputValueChange}
                            onBlurHandler={handleInputValidationOnBlur}
                            showErrorMessage={formState.nombreEmpresa.showError}
                            validationMessage="Company name must be at least 5 characters"
                        />
                    )}

                    <Input
                        field="email"
                        label="Email"
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.email.showError}
                        validationMessage="Invalid email"
                    />

                    <Input
                        field="password"
                        label="Password"
                        type="password"
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.password.showError}
                        validationMessage="Password must be at least 6 characters"
                    />

                    <Input
                        field="passwordConfir"
                        label="Confirm Password"
                        type="password"
                        value={formState.passwordConfir.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.passwordConfir.showError}
                        validationMessage="Passwords must match"
                    />

                    <Input
                        field="direction"
                        label="Address"
                        value={formState.direction.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.direction.showError}
                        validationMessage="Address must be at least 3 characters"
                    />

                    <Input
                        field="phone"
                        label="Phone"
                        value={formState.phone.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.phone.showError}
                        validationMessage="Phone must be at least 3 digits"
                    />

                    <Input
                        field="income"
                        label="Income"
                        value={formState.income.value}
                        onChangeHandler={handleInputValueChange}
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.income.showError}
                        validationMessage="Income must be a number"
                    />

                    <Button
                        type="submit"
                        colorScheme={btnColorScheme}
                        isLoading={isLoading}
                        isDisabled={isSubmitButtonDisabled} 
                        size="lg"
                        w="full"
                        borderRadius="md"
                        _hover={{ boxShadow: "lg" }}
                        gridColumn="span 2"
                    >
                        Register
                    </Button>
                </SimpleGrid>
            </form>

            <Text mt={4} textAlign="center" fontSize="sm" color="gray.500">
                Already have an account?{" "}
                <Button
                    variant="link"
                    colorScheme={btnColorScheme}
                    onClick={() => navigate("/")}
                >
                    Login here
                </Button>
            </Text>
        </Box>
    );
};

export default Register;
