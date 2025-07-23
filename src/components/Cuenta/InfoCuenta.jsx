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
  ButtonGroup,
  Button,
  useBoolean,
  HStack,
  Select,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaEye, FaBitcoin, FaEyeSlash } from "react-icons/fa";
import { MdOutlineSwapHoriz } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAccountDetails } from "../../shared/hooks/useAccountDetails";
import { useGetHistoryFromUser } from "../../shared/hooks/history/useHistoryFromUser";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export const InfoCuenta = ({ idUser }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useBoolean();
  const [monedaDestino, setMonedaDestino] = useState("");
  const [saldoConvertido, setSaldoConvertido] = useState(null);
  const { getAccountOfUser, accountDetails } = useAccountDetails();
  const { historyUser, getHistoryByUser } = useGetHistoryFromUser();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("purple.600", "purple.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const balanceColor = useColorModeValue("green.500", "green.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonColorScheme = "purple";
  const selectBg = useColorModeValue("white", "gray.600");
  const selectBorderColor = useColorModeValue("gray.300", "gray.500");
  const selectColor = useColorModeValue("gray.800", "white");

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
      return amount.toFixed(2);
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

    const resultado = await convertirGTQaOtraMoneda(
      accountDetails.balance,
      monedaSeleccionada
    );
    setSaldoConvertido(resultado);
  };

  if (!accountDetails) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
        <Text fontSize="xl" color={textColor}>
          Cargando información de la cuenta...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      bg={bgColor}
      minH="100vh"
      p={{ base: 4, md: 8, lg: 12 }}
    >
      <Heading
        textAlign="center"
        mb={{ base: 8, md: 12 }}
        size={{ base: "xl", md: "2xl" }}
        color={headingColor}
      >
        Resumen de Cuenta
      </Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 10 }}>
        <Card
          bg={cardBg}
          boxShadow="xl"
          borderRadius="xl"
          p={{ base: 4, md: 6 }}
          border="1px solid"
          borderColor={borderColor}
          _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}
          transition="all 0.3s ease-in-out"
        >
          <CardBody>
            <Heading size="lg" mb={3} color={headingColor}>
              Cuenta {accountDetails.typeAccount}{" "}
              <Text as="span" color={textColor} fontWeight="normal">
                NB-{accountDetails.noAccount}
              </Text>
            </Heading>
            <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={4}>
              Titular: {accountDetails?.keeperUser?.name}
            </Text>
            <Divider my={4} borderColor={borderColor} />

            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              Saldo Actual:
            </Text>
            <HStack align="center" spacing={3}>
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="extrabold"
                color={balanceColor}
              >
                {!flag
                  ? "********"
                  : `Q${accountDetails.balance?.toFixed(2) || "0.00"}`}
              </Text>
              <Button
                onClick={setFlag.toggle}
                ml={3}
                size="md"
                variant="ghost"
                colorScheme={buttonColorScheme}
                aria-label={!flag ? "Mostrar saldo" : "Ocultar saldo"}
              >
                <Icon as={!flag ? FaEye : FaEyeSlash} w={6} h={6} />
              </Button>
            </HStack>

            <HStack mt={5} spacing={3} color={textColor}>
              <Icon as={FaBitcoin} w={5} h={5} color="orange.400" />
              <Text fontWeight="medium" fontSize="lg">
                Puntos:{" "}
                <Text as="span" fontWeight="bold">
                  {accountDetails.points}
                </Text>
              </Text>
            </HStack>

            <ButtonGroup
              mt={8}
              spacing={{ base: 3, md: 5 }}
              direction={{ base: "column", md: "row" }}
              w="full"
            >
              <Button
                colorScheme={buttonColorScheme}
                size="lg"
                flex="1"
                onClick={() => navigate("/tranferencia")}
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s ease"
                fontWeight="bold"
              >
                Transferir
              </Button>
              <Button
                variant="outline"
                colorScheme={buttonColorScheme}
                size="lg"
                flex="1"
                onClick={() => navigate("/compras")}
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s ease"
                fontWeight="bold"
              >
                Canjear Puntos
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>

        <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
          <Box
            bg={cardBg}
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            _hover={{ boxShadow: "lg", transform: "translateY(-3px)" }}
            transition="all 0.3s ease-in-out"
          >
            <HStack mb={4} align="center">
              <Icon as={MdOutlineSwapHoriz} w={6} h={6} color={headingColor} />
              <Heading size="md" color={headingColor}>
                Convertir Moneda
              </Heading>
            </HStack>
            <Text mb={3} fontSize="md" color={textColor}>
              Selecciona la moneda a la que quieres convertir tu saldo:
            </Text>
            <Select
              placeholder="Selecciona una moneda"
              onChange={handleMonedaChange}
              size="lg"
              bg={selectBg}
              color={selectColor}
              borderColor={selectBorderColor}
              _hover={{ borderColor: buttonColorScheme + ".400" }}
              _focus={{
                borderColor: buttonColorScheme + ".500",
                boxShadow: `0 0 0 1px ${buttonColorScheme}.500`,
              }}
            >
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
            <Text mt={4} fontSize="lg" color={textColor}>
              Saldo convertido:{" "}
              <Text as="span" fontWeight="bold" color={balanceColor}>
                {saldoConvertido
                  ? `≈ ${saldoConvertido} ${monedaDestino}`
                  : "—"}
              </Text>
            </Text>
          </Box>

          <Box
            bg={cardBg}
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
            boxShadow="md"
            maxH="500px"
            overflowY="auto"
            border="1px solid"
            borderColor={borderColor}
            _hover={{ boxShadow: "lg", transform: "translateY(-3px)" }}
            transition="all 0.3s ease-in-out"
          >
            <Heading size="md" mb={5} color={headingColor}>
              Historial de Movimientos 📜
            </Heading>
            <VStack
              spacing={4}
              align="stretch"
              divider={<Divider borderColor={borderColor} />}
            >
              {historyUser.length === 0 ? (
                <Text textAlign="center" color={textColor}>
                  No hay movimientos recientes.
                </Text>
              ) : (
                historyUser.map((h) => (
                  <Box
                    key={h._id}
                    p={2}
                    _hover={{
                      bg: useColorModeValue("gray.50", "gray.600"),
                      borderRadius: "md",
                    }}
                  >
                    <Text fontSize="sm" color={textColor}>
                      <Text as="span" fontWeight="bold">
                        ID Transacción:
                      </Text>{" "}
                      {h.transfer}
                    </Text>
                    <Text
                      fontSize="md"
                      color={balanceColor}
                      fontWeight="bold"
                      my={1}
                    >
                      Monto: Q{h.amount?.toFixed(2) || "0.00"}
                    </Text>
                    <Text fontSize="sm" color={textColor}>
                      <Text as="span" fontWeight="bold">
                        Descripción:
                      </Text>{" "}
                      {h.description || "N/A"}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      <Text as="span" fontWeight="bold">
                        Fecha:
                      </Text>{" "}
                      {format(new Date(h.createdAt), "PPP - hh:mm a", {
                        locale: es,
                      })}
                    </Text>
                    {h.toUser && (
                      <Text fontSize="sm" color={textColor}>
                        <Text as="span" fontWeight="bold">
                          Para:
                        </Text>{" "}
                        {h.toUser.name} (Cuenta {h.toUser.noAccount})
                      </Text>
                    )}
                  </Box>
                ))
              )}
            </VStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
