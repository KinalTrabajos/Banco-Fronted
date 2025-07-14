import { SimpleGrid, Box, Text, Button, VStack, Flex } from "@chakra-ui/react";

export const RequestsList = ({ requests, onSelectRequest }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {requests.map((request) => (
        <Box
          key={request._id}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          _hover={{ shadow: "lg" }}
          transition="all 0.2s"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="lg">
              <strong>Nombre: </strong> {request.name}
            </Text>
            <Text>
              <strong>Username:</strong> {request.username || "No disponible"}
            </Text>
            <Text>
              <strong>Direccion:</strong> {request.direction || "No disponible"}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              DPI: ${request.dpi}
            </Text>
            <Flex justify="end" w="100%" mt={4}>
                <Button colorScheme="blue" size="sm" onClick={() => onSelectBill(request)}>
                    Ver Detalles
                </Button>
            </Flex>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};