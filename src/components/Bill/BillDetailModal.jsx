import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  VStack,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const BillDetailModal = ({
  bill,
  isOpen,
  onClose,
  printableContentRef,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {}, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, printableContentRef]);

  const handlePrint = useReactToPrint({
    content: () => {
      return printableContentRef.current;
    },
    documentTitle: `Factura-${bill?._id || "Desconocida"}`,
    pageStyle: `@page { size: A4 portrait; margin: 15mm; } @media print { body { -webkit-print-color-adjust: exact; } }`,
    onBeforeGetContent: async () => {
      if (!printableContentRef.current) {
        return Promise.reject("Contenido de impresión no disponible.");
      }
      return Promise.resolve();
    },
    onBeforePrint: () => {},
    onAfterPrint: () => {},
  });

  const modalBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("purple.500", "purple.600");
  const headerColor = "white";
  const textColor = useColorModeValue("gray.700", "gray.200");
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const tableHeaderBg = useColorModeValue("gray.100", "gray.600");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");
  const totalColor = useColorModeValue("green.600", "green.300");
  const printButtonScheme = "purple";
  const closeButtonScheme = "red";

  if (!bill) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay
        bg={useColorModeValue("blackAlpha.600", "blackAlpha.700")}
      />
      <ModalContent bg={modalBg} borderRadius="xl" boxShadow="2xl">
        <ModalHeader
          bg={headerBg}
          color={headerColor}
          borderTopRadius="xl"
          pb={4}
        >
          <Heading size="lg">Detalles de la Factura</Heading>
        </ModalHeader>
        <ModalCloseButton
          color={headerColor}
          _hover={{ bg: "whiteAlpha.300" }}
        />
        <ModalBody p={6}>
          <VStack align="start" spacing={4} mb={6}>
            <Flex justify="space-between" width="100%">
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                Factura No.
                <Text as="span" fontWeight="normal" ml={2}>
                  {bill._id}
                </Text>
              </Text>
              <Text fontSize="md" color={textColor}>
                Fecha:{" "}
                <Text as="span" fontWeight="normal">
                  {format(new Date(bill.createdAt), "PPP - hh:mm a", {
                    locale: es,
                  })}
                </Text>
              </Text>
            </Flex>
            <Text fontSize="md" color={textColor}>
              Cliente:{" "}
              <Text as="span" fontWeight="normal">
                {bill.user?.name || "No disponible"}
              </Text>
            </Text>
            <Text fontSize="md" color={textColor}>
              Cuenta:{" "}
              <Text as="span" fontWeight="normal">
                {bill.account?.noAccount || "No disponible"}
              </Text>
            </Text>

            <Divider borderColor={dividerColor} />

            <Heading size="md" color={textColor} mt={4}>
              Productos Comprados:
            </Heading>
            {bill.products && bill.products.length > 0 ? (
              <TableContainer
                width="100%"
                borderRadius="lg"
                borderWidth="1px"
                borderColor={tableBorderColor}
              >
                <Table variant="simple" size="md">
                  <Thead bg={tableHeaderBg}>
                    <Tr>
                      <Th color={textColor}>Producto</Th>
                      <Th isNumeric color={textColor}>
                        Cantidad
                      </Th>
                      <Th isNumeric color={textColor}>
                        Precio Unitario
                      </Th>
                      <Th isNumeric color={textColor}>
                        Subtotal
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bill.products.map((product, index) => (
                      <Tr key={index}>
                        <Td color={textColor}>{product.description}</Td>
                        <Td isNumeric color={textColor}>
                          {product.quantity}
                        </Td>
                        <Td isNumeric color={textColor}>
                          Q{product.price ? product.price.toFixed(2) : "0.00"}
                        </Td>
                        <Td isNumeric color={textColor}>
                          Q
                          {(product.price * product.quantity).toFixed(2) ||
                            "0.00"}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text color={textColor}>No hay productos en esta factura.</Text>
            )}
            <Divider borderColor={dividerColor} />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              alignSelf="flex-end"
              color={totalColor}
            >
              Total: Q{bill.total ? bill.total.toFixed(2) : "0.00"}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter
          borderTop="1px solid"
          borderColor={dividerColor}
          pt={4}
          pb={4}
        >
          <Button
            colorScheme={printButtonScheme}
            mr={3}
            onClick={handlePrint}
            size="lg"
            px={8}
          >
            Imprimir Factura
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            colorScheme={closeButtonScheme}
            size="lg"
            px={8}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
