import { Card, CardBody, Stack, Heading, Divider, Text, useColorModeValue } from '@chakra-ui/react';

export const CardAccount = ({ typeAccount, noAccount, user }) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const headingColor = useColorModeValue('purple.600', 'purple.300');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Card
            maxW='sm'
            bg={cardBg}
            boxShadow="xl"
            borderRadius="xl"
            p={4}
            border="1px solid"
            borderColor={borderColor}
            _hover={{ boxShadow: '2xl', transform: 'translateY(-5px)' }}
            transition="all 0.3s ease-in-out"
        >
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md' color={headingColor}>
                        Cuenta {typeAccount} <Text as="span" color={textColor} fontWeight="normal">NB-{noAccount}</Text>
                    </Heading>
                    <Text fontSize="md" color={textColor}>
                        Usuario: {user}
                    </Text>
                </Stack>
            </CardBody>
            <Divider my={4} borderColor={borderColor} />
        </Card>
    );
}