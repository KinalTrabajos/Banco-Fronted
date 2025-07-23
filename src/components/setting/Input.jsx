import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    Textarea,
    FormErrorMessage,
    useColorModeValue,
} from "@chakra-ui/react";

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
    inputProps = {}, 
    labelProps = {}, 
    errorProps = {}, 
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    const defaultInputBorderColor = useColorModeValue('gray.600', 'gray.500');
    const defaultInputFocusBorderColor = useColorModeValue('purple.400', 'purple.300');
    const defaultInputBg = useColorModeValue('gray.700', 'gray.600');
    const defaultInputColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
    const defaultLabelColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.800'); 
    const defaultErrorColor = useColorModeValue('red.300', 'red.300');

    return (
        <FormControl isInvalid={showErrorMessage} mb={4}>
            <FormLabel
                fontSize="md" 
                color={defaultLabelColor}
                {...labelProps} 
            >
                {label}
            </FormLabel>
            {textArea ? (
                <Textarea
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    rows={5}
                    size="lg" 
                    borderColor={defaultInputBorderColor}
                    bg={defaultInputBg}
                    color={defaultInputColor}
                    _hover={{ borderColor: defaultInputFocusBorderColor }}
                    _focus={{
                        borderColor: defaultInputFocusBorderColor,
                        boxShadow: `0 0 0 1px ${defaultInputFocusBorderColor}`,
                    }}
                    {...inputProps} 
                />
            ) : (
                <ChakraInput
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleInputBlur}
                    size="lg" 
                    borderColor={defaultInputBorderColor}
                    bg={defaultInputBg}
                    color={defaultInputColor}
                    _hover={{ borderColor: defaultInputFocusBorderColor }}
                    _focus={{
                        borderColor: defaultInputFocusBorderColor,
                        boxShadow: `0 0 0 1px ${defaultInputFocusBorderColor}`,
                    }}
                    {...inputProps} 
                />
            )}
            {showErrorMessage && (
                <FormErrorMessage
                    fontSize="sm"
                    color={defaultErrorColor}
                    {...errorProps} 
                >
                    {validationMessage}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};