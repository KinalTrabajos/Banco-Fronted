import { Flex, Box, Text, VStack, Stack,Heading, Divider,Card,CardBody, CardFooter, ButtonGroup,Button, useBoolean,HStack, Select } from "@chakra-ui/react";
import { FaEye, FaBitcoin,FaEyeSlash, } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getAccountOfUser } from "../../service/api";

export const InfoCuenta = () => {
    const [flag,setFlag] = useBoolean()
    const [monedaDestino, setMonedaDestino] = useState("");
    const [saldoConvertido, setSaldoConvertido] = useState(null);
    const [cuenta, setCuenta] = useState(null);
    const idCuenta = '6842f2ebcf01beca4e14db0c';
    
    useEffect(()=> {
      const fetchAccount = async () => {
        const accout = await getAccountOfUser(idCuenta);
        setCuenta(accout);
        console.log(accout);
      };

      fetchAccount();
    },[])

    const apiKey = '301233cc6b9347c2b98bdb3bbb59cfb9';

    const obtenerCambioDolar = async (saldo) => {
        try {
            const response = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=GTQ,USD`);
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }

            const data = await response.json();
            const tasaGTQ = parseFloat(data.rates.GTQ);
            console.log(`1 USD = ${tasaGTQ} GTQ`);

            const gtqToUsd = saldo / tasaGTQ;
            return parseFloat(gtqToUsd);
        } catch (error) {
            console.error('Error al obtener el tipo de cambio:', error);
            return null;
        }
    };

    const convertirSaldo = async (to, amount) => {
        try {
            const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${to}`);
            const data = await response.json();
            const convertedAmount = (amount * data.rates[to]).toFixed(2);

            console.log(`${amount} USD = ${convertedAmount} ${to}`);
            return convertedAmount;
        } catch (error) {
            console.error('Error al obtener el tipo de cambio:', error);
            return null;
        }
    };

    const convertirGTQaOtraMoneda = async (saldo, monedaDestino) => {
        const usd = await obtenerCambioDolar(saldo);
        if(usd !== null){
            const resultadoFinal = await convertirSaldo(monedaDestino, usd);
             console.log(`${saldo} GTQ equivale a ${resultadoFinal} ${monedaDestino}`);
             return resultadoFinal;
        }else {
            console.log("No se pudo convertir GTQ a USD.");
        }
    }

    const handleMonedaChange = (e) => {
        const monedaSeleccionada = e.target.value;
        setMonedaDestino(monedaSeleccionada);
        setSaldoConvertido(convertirGTQaOtraMoneda(cuenta.balance, monedaSeleccionada));
    };

    if(!cuenta){
      return <Text>Cargando información de la cuenta...</Text>;
    }

   return (
        <Flex minH="100vh" direction="column" bg="gray.50" p={8}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
        Información de Cuenta
      </Text>

      <Flex flex="1" align="center" justify="center">
        <HStack spacing={8} align="flex-start">
          {/* Card */}
          <Card maxW="sm">
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  Cuenta {cuenta.typeAccount} NB-{cuenta.noAccount}
                </Heading>
                <Text>{cuenta.keeperUser.name}</Text>
                <Text>Mi Saldo</Text>
                <Text color="black.600" fontSize="2xl">
                  {!flag ? "********" : `Q.${cuenta.balance}`}
                  <Button onClick={setFlag.toggle} m={3}>
                    {!flag ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </Text>

                {/* Muestra siempre el saldo convertido si existe */}
                <HStack>
                  <FaBitcoin />
                  <Text m={2}>Puntos: </Text>
                  <Text>{cuenta.points}</Text>
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
                  <BsThreeDots />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>

          {/* Selector de moneda fuera del card */}
          <Box w="200px">
            <Text fontSize="md" fontWeight="medium" mb={2}>
              Convertir a:
            </Text>
            <Select
              placeholder="Selecciona una moneda"
              value={monedaDestino}
              onChange={handleMonedaChange}
            >
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="MXN">MXN - Peso Mexicano</option>
              <option value="JPY">JPY - Yen Japonés</option>
            </Select>
          </Box>
          <Box>
            <Text>Saldo Convetido: </Text>
            <Text color="green.600" fontWeight="bold" fontSize="lg">
               ≈ {saldoConvertido}
            </Text>
          </Box>
        </HStack>
      </Flex>
    </Flex>
   )
}