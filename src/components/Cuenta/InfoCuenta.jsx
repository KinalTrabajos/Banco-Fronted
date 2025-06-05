import { Flex, Box, Text, VStack, Stack,Heading, Divider,Card,CardBody, CardFooter, ButtonGroup,Button, useBoolean,HStack } from "@chakra-ui/react";
import { FaEye, FaBitcoin,FaEyeSlash, BsThreeDots  } from "react-icons/fa";

export const InfoCuenta = () => {
    const [flag,setFlag] = useBoolean()
    const saldo = 1000;
    const puntos = 255;
    const tipo = "Monetaria";
    const NumeroCuenta = 'NB-3476829018'
    const usuario = 'Chepe el Mas capito'
   return (
        <Flex minH="100vh" direction="column" bg="gray.50" p={8}>
               <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
                Información de Cuenta
            </Text>
            <Flex flex="1" align="center" justify="center">
                <VStack>
                <Card maxW="sm">
                    <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">Cuenta {tipo} {NumeroCuenta}</Heading>
                        <Text>
                            {usuario}
                        </Text>
                        <Text>
                            Mi Saldo
                        </Text>
                        <Text color="black.600" fontSize="2xl">
                        {!flag ? '********': `Q.${saldo}`}
                        <Button onClick={setFlag.toggle} m={3}>
                            {!flag ? <FaEye/> : <FaEyeSlash />}
                        </Button>
                        </Text>
                        <HStack>
                             <FaBitcoin />
                            <Text m={2}>Puntos: </Text>
                            <Text>{puntos}</Text>
                        </HStack>
                    </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                    <ButtonGroup spacing="2">
                        <Button variant="solid" colorScheme="blue">
                        Transferir
                        </Button>
                        <Button variant="ghost" colorScheme="blue">
                        Canjear Puntos
                        </Button>
                        <Button variant="ghost" colorScheme="blue">
                            <BsThreeDots/>
                        </Button>
                    </ButtonGroup>
                    </CardFooter>
                </Card>
                </VStack>
            </Flex>
     </Flex>
   )
}