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
  Tag,
} from "@chakra-ui/react";
import { FaUserCircle, FaBuilding, FaInfoCircle } from "react-icons/fa";

export const RequestsList = ({ requests, onSelectRequest }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("purple.700", "purple.300");
  const dpiColor = useColorModeValue("teal.600", "teal.300");
  const buttonColorScheme = "purple";

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 6, md: 8 }}
      p={{ base: 4, md: 8 }}
    >
      {requests.map((request) => (
        <Box
          key={request._id}
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
                <Icon as={request.dpi ? FaUserCircle : FaBuilding} mr={2} />
                {request.name}
              </Heading>
              <Tag
                size="md"
                variant="subtle"
                colorScheme={request.dpi ? "blue" : "orange"}
                borderRadius="full"
                px={3}
              >
                {request.dpi ? "Individual" : "Empresarial"}
              </Tag>
            </Flex>
            <Text fontSize="md" color={textColor}>
              <Text as="span" fontWeight="semibold">
                Username:
              </Text>{" "}
              {request.username || "N/A"}
            </Text>
            <Text fontSize="md" color={textColor}>
              <Text as="span" fontWeight="semibold">
                Dirección:
              </Text>{" "}
              {request.direction || "N/A"}
            </Text>

            {request.dpi ? (
              <Text fontSize="xl" fontWeight="bold" color={dpiColor} mt={2}>
                DPI: {request.dpi}
              </Text>
            ) : (
              <Text fontSize="xl" fontWeight="bold" color={dpiColor} mt={2}>
                Solicitud Empresarial
              </Text>
            )}

            <Flex justify="flex-end" w="100%" mt={4}>
              <Button
                colorScheme={buttonColorScheme}
                size="md"
                onClick={() => onSelectRequest(request)}
                px={6}
                borderRadius="lg"
                leftIcon={<Icon as={FaInfoCircle} />}
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
