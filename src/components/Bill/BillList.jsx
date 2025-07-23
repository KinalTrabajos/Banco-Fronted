import {
  SimpleGrid,
  Box,
  Text,
  Button,
  VStack,
  Flex,
  useColorModeValue,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const BillList = ({ bills, onSelectBill }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("purple.700", "purple.300");
  const totalColor = useColorModeValue("green.600", "green.300");
  const buttonColorScheme = "purple";

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 6, md: 8 }}
      p={{ base: 4, md: 8 }}
    >
      {bills.map((bill) => (
        <Box
          key={bill._id}
          p={6}
          shadow="md"
          borderWidth="1px"
          borderRadius="xl"
          borderColor={borderColor}
          bg={cardBg}
          _hover={{
            shadow: "xl",
            transform: "translateY(-3px)",
            borderColor: buttonColorScheme + ".300",
          }}
          transition="all 0.3s ease-in-out"
        >
          <VStack align="start" spacing={3}>
            <Flex align="center" justify="space-between" width="100%">
              <Heading
                size="md"
                color={headingColor}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaFileInvoiceDollar} mr={2} /> Factura
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {format(new Date(bill.createdAt), "PPP", { locale: es })}
              </Text>
            </Flex>
            <Text fontSize="md" color={textColor}>
              <Text as="span" fontWeight="semibold">
                No.
              </Text>{" "}
              {bill._id}
            </Text>
            <Text fontSize="md" color={textColor}>
              <Text as="span" fontWeight="semibold">
                Cuenta:
              </Text>{" "}
              {bill.account?.noAccount || "No disponible"}
            </Text>
            <Text fontSize="md" color={textColor}>
              <Text as="span" fontWeight="semibold">
                Cliente:
              </Text>{" "}
              {bill.user?.name || "No disponible"}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={totalColor} mt={2}>
              Total: Q{bill.total ? bill.total.toFixed(2) : "0.00"}
            </Text>
            <Flex justify="flex-end" w="100%" mt={4}>
              <Button
                colorScheme={buttonColorScheme}
                size="md"
                onClick={() => onSelectBill(bill)}
                px={6}
                borderRadius="lg"
                _hover={{
                  bg: buttonColorScheme + ".600",
                  transform: "scale(1.02)",
                }}
                transition="all 0.2s ease"
              >
                Ver Detalles
              </Button>
            </Flex>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
