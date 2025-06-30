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
  Table, TableContainer, Tbody, Td, Th, Thead, Tr
} from '@chakra-ui/react';
import {  useEffect } from 'react'; 
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';


export const BillDetailModal = ({ bill, isOpen, onClose, printableContentRef }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, printableContentRef]); 

  const handlePrint = useReactToPrint({

    content: () => {
      return printableContentRef.current;
    },
    documentTitle: `Factura-${bill?._id || 'Desconocida'}`,
    pageStyle: `@page { size: A4 portrait; margin: 15mm; } @media print { body { -webkit-print-color-adjust: exact; } }`,

    onBeforeGetContent: async () => {
      

      if (!printableContentRef.current) {
        return Promise.reject("Contenido de impresión no disponible."); 
      }
      return Promise.resolve(); 
    },

    onBeforePrint: () => console.log("DEBUG: A punto de imprimir."),

    onAfterPrint: () => console.log("DEBUG: Impresión finalizada."),
  });

  if (!bill) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Factura</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Contenido visible del modal (la UI que el usuario ve) */}
          <VStack align="start" spacing={4} mb={6}>
            <Heading size="lg">Factura No. {bill._id}</Heading>
            <Text fontSize="md">
              Cliente: {bill.user?.name || "No disponible"}
            </Text>
            <Text fontSize="md">
              Cuenta: {bill.account?.noAccount || "No disponible"}
            </Text>
            <Text fontSize="md">
              Fecha de Emisión: {format(new Date(bill.createdAt), "PPPpp") || "No disponible"}
            </Text>
            <Divider />
            <Heading size="md">Productos:</Heading>
            {bill.products && bill.products.length > 0 ? (
              <TableContainer width="100%">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Producto</Th>
                      <Th isNumeric>Cantidad</Th>
                      <Th isNumeric>Precio Unitario</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {bill.products.map((product, index) => (
                      <Tr key={index}>
                        {console.log(product)}
                        <Td>{product.description}</Td>
                        <Td isNumeric>{product.quantity}</Td>
                        <Td isNumeric>${product.price ? product.price.toFixed(2) : '0.00'}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text>No hay productos en esta factura.</Text>
            )}
            <Divider />
            <Text fontSize="xl" fontWeight="bold" alignSelf="flex-end">
              Total: ${bill.total ? bill.total.toFixed(2) : '0.00'}
            </Text>
          </VStack>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handlePrint}>
            Imprimir Factura
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};