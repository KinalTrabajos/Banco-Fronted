import { SimpleGrid, Box, Text, Button, VStack, Flex } from "@chakra-ui/react";

export const BillList = ({ bills, onSelectBill }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {bills.map((bill) => (
        <Box
          key={bill._id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          _hover={{ shadow: "lg" }}
          transition="all 0.2s"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="lg">
              <strong>Factura No.</strong> {bill._id}
            </Text>
            <Text>
              <strong>Cuenta:</strong> {bill.account?.noAccount || "No disponible"}
            </Text>
            <Text>
              <strong>Cliente:</strong> {bill.user?.name || "No disponible"}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              Total: ${bill.total ? bill.total.toFixed(2) : '0.00'}
            </Text>
            <Flex justify="end" w="100%" mt={4}>
                <Button colorScheme="blue" size="sm" onClick={() => onSelectBill(bill)}>
                    Ver Detalles
                </Button>
            </Flex>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};