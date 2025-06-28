import {
  Flex,
  Box,
  Text,
  VStack,
  Stack,
  Heading,
  Divider,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  useBoolean,
  HStack,
  Select,
  SimpleGrid
} from "@chakra-ui/react";
import { FaEye, FaBitcoin, FaEyeSlash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAccountDetails } from "../../shared/hooks/useAccountDetails";
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser";
import { format } from "date-fns";

export const InfoCuenta = ({ idUser }) => {
  const [flag, setFlag] = useBoolean();
  const [monedaDestino, setMonedaDestino] = useState("");
  const [saldoConvertido, setSaldoConvertido] = useState(null);
  const { getAccountOfUser, accountDetails } = useAccountDetails();
  const { historyUser, getHistoryByUser } = useGetHistoryFromUser();

  console.log(historyUser.description);
  useEffect(() => {
    const fetchAccount = async () => {
      await getAccountOfUser({ id: idUser });
      await getHistoryByUser({ id: idUser });
    };

    fetchAccount();
  }, []);

  const apiKey = "301233cc6b9347c2b98bdb3bbb59cfb9";

  const obtenerCambioDolar = async (saldo) => {
    try {
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=GTQ,USD`
      );
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      const tasaGTQ = parseFloat(data.rates.GTQ);
      console.log(`1 USD = ${tasaGTQ} GTQ`);

      const gtqToUsd = saldo / tasaGTQ;
      return parseFloat(gtqToUsd);
    } catch (error) {
      console.error("Error al obtener el tipo de cambio:", error);
      return null;
    }
  };

  const convertirSaldo = async (to, amount) => {
    if (to === "USD") {
      return amount.toFixed(2); // No es necesario convertir si ya está en USD
    }

    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=USD&symbols=${to}`
      );
      const data = await response.json();
      const convertedAmount = (amount * data.rates[to]).toFixed(2);

      console.log(`${amount} USD = ${convertedAmount} ${to}`);
      return convertedAmount;
    } catch (error) {
      console.error("Error al obtener el tipo de cambio:", error);
      return null;
    }
  };


  const convertirGTQaOtraMoneda = async (saldo, monedaDestino) => {
    const usd = await obtenerCambioDolar(saldo);
    if (usd !== null) {
      const resultadoFinal = await convertirSaldo(monedaDestino, usd);
      console.log(`${saldo} GTQ equivale a ${resultadoFinal} ${monedaDestino}`);
      return resultadoFinal;
    } else {
      console.log("No se pudo convertir GTQ a USD.");
    }
  };

  const handleMonedaChange = async (e) => {
    const monedaSeleccionada = e.target.value;
    setMonedaDestino(monedaSeleccionada);

    const resultado = await convertirGTQaOtraMoneda(accountDetails.balance, monedaSeleccionada);
    setSaldoConvertido(resultado);
  };

  if (!accountDetails) {
    return <Text>Cargando información de la cuenta...</Text>;
  }

  console.log(saldoConvertido)
  return (
    <Flex direction="column" bg="gray.100" minH="100vh" p={8}>
      <Heading textAlign="center" mb={10}>
        Resumen de Cuenta
      </Heading>

      <SimpleGrid columns={[1, null, 2]} spacing={8}>
        {/* Tarjeta de cuenta */}
        <Card bg="white" boxShadow="xl" p={6}>
          <CardBody>
            <Heading size="md" mb={2}>
              Cuenta {accountDetails.typeAccount} NB-{accountDetails.noAccount}
            </Heading>
            <Text>{accountDetails?.keeperUser?.name}</Text>
            <Divider my={4} />
            <Text fontWeight="bold">Saldo:</Text>
            <Text fontSize="2xl" color="teal.600">
              {!flag ? "********" : `Q${accountDetails.balance}`}
              <Button onClick={setFlag.toggle} ml={3} size="sm">
                {!flag ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </Text>
            <HStack mt={4}>
              <FaBitcoin />
              <Text fontWeight="medium">Puntos: {accountDetails.points}</Text>
            </HStack>
            <ButtonGroup mt={6} spacing={4}>
              <Button colorScheme="blue">Transferir</Button>
              <Button variant="outline" colorScheme="blue">
                Canjear
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>

        {/* Conversión y historial */}
        <VStack align="stretch" spacing={6}>
          {/* Conversor */}
          <Box bg="white" p={5} borderRadius="xl" boxShadow="md">
            <Text mb={2}>Convertir a:</Text>
            \<Select placeholder="Selecciona una moneda" onChange={handleMonedaChange}>
              <option value="USD">USD - Dólar estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Libra esterlina</option>
              <option value="JPY">JPY - Yen japonés</option>
              <option value="AUD">AUD - Dólar australiano</option>
              <option value="CAD">CAD - Dólar canadiense</option>
              <option value="CHF">CHF - Franco suizo</option>
              <option value="CNY">CNY - Yuan chino</option>
              <option value="SEK">SEK - Corona sueca</option>
              <option value="NZD">NZD - Dólar neozelandés</option>
            </Select>
            <Text mt={3}>
              Saldo convertido:{" "}
              <strong>{saldoConvertido ? `≈ ${saldoConvertido}` : "—"}</strong>
            </Text>
          </Box>

          {/* Historial */}
          <Box
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="md"
            maxH="400px"
            overflowY="auto"
          >
            <Heading size="sm" mb={4}>
              Historial de Movimientos
            </Heading>
            <Stack spacing={4}>
              {historyUser.map((h) => (
                <Box key={h._id} borderBottom="1px solid #e2e8f0" pb={2}>
                  <Text>
                    <strong>ID:</strong> {h.transfer}
                  </Text>
                  <Text>
                    <strong>Monto:</strong> Q{h.amount}
                  </Text>
                  <Text>
                    <strong>Descripción:</strong> {h.description}
                  </Text>
                  <Text>
                    <strong>Fecha:</strong>{" "}
                    {format(new Date(h.createdAt), "PPPpp")}
                  </Text>
                  <Text>
                    <strong>Para:</strong> {h.toUser?.name} —{" "}
                    {h.toUser?.noAccount}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
