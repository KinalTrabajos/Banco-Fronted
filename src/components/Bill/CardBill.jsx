
import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  Text,
  Box
} from "@chakra-ui/react";

export const CardBill = ({ account, user, numeroFactura, total, products = [] }) => {
  return (
    <div>
      <Card maxW="sm" w="100%">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Factura #.{numeroFactura}</Heading>
            <Text>Cuenta No. {account?.noAccount ?? "No disponible"}</Text>
            <Text>Total: {total ? total.toFixed(2) : '0.00'}</Text>
            <Text fontSize="2xl">Cliente: {user?.name ?? "No disponible"}</Text>
            {products.length > 0 && (
              <Box>
                <Heading size="sm">Productos:</Heading>
                <ul>
                  {products.map((p, i) => (
                    <li key={i}>
                      {p.name} - {p.quantity} x {p.price ? p.price.toFixed(2) : '0.00'}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
};