// PrintableBillContent.jsx
import React, { forwardRef } from 'react';
import {
  Box,
  Text,
  VStack,
  Heading,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,      
  CardBody,
  Stack
} from '@chakra-ui/react';


export const PrintableBillContent = forwardRef(({ account, user, numeroFactura, total, products = [] }, ref) => {
  return (
    <Box
      ref={ref}
      p={5}
      border="1px solid #ccc"
      borderRadius="md"
      bg="white"
      width="210mm" 
      minHeight="297mm" 
      padding="15mm"
    >

      <Card maxW="sm" w="100%"> 
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Factura #.{numeroFactura || "N/A"}</Heading>
            <Text>Cuenta No. {account?.noAccount ?? "No disponible"}</Text>
            <Text>Total: ${total ? total.toFixed(2) : '0.00'}</Text>
            <Text fontSize="2xl">Cliente: {user?.name ?? "No disponible"}</Text>

            <Divider /> {/* Separador */}

            {products.length > 0 ? (
              <Box>
                <Heading size="sm">Productos:</Heading>
                <TableContainer width="100%">
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Producto</Th>
                        <Th isNumeric>Cantidad</Th>
                        <Th isNumeric>Precio Unitario</Th>
                        <Th isNumeric>Subtotal</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {products.map((p, i) => (
                        <Tr key={i}>
                          <Td>{p.name}</Td>
                          <Td isNumeric>{p.quantity}</Td>
                          <Td isNumeric>${p.price ? p.price.toFixed(2) : '0.00'}</Td>
                          <Td isNumeric>${(p.quantity * (p.price || 0)).toFixed(2)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Text>No hay productos en esta factura.</Text>
            )}

            <Divider /> 

            <Text fontSize="xl" fontWeight="bold" alignSelf="flex-end">
              Total a Pagar: ${total ? total.toFixed(2) : '0.00'}
            </Text>

          </Stack>
        </CardBody>

      </Card>

    </Box>
  );
});

PrintableBillContent.displayName = 'PrintableBillContent';