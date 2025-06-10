<<<<<<< HEAD
=======
import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    Textarea,
    FormErrorMessage,
} from "@chakra-ui/react";

>>>>>>> f-rosas
export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type = "text",
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea = false,
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    return (
        <FormControl isInvalid={showErrorMessage} mb={4}>
            <FormLabel fontSize="sm">{label}</FormLabel>
            {textArea ? (
                <Textarea
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    rows={5}
                />
            ) : (
                <ChakraInput
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                />
            )}
            {showErrorMessage && (
                <FormErrorMessage fontSize="sm">{validationMessage}</FormErrorMessage>
            )}
        </FormControl>
    );
};
