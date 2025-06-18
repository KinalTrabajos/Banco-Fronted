import { Card, CardHeader, CardBody, CardFooter,Stack, Heading, Divider, ButtonGroup, Button, Text } from '@chakra-ui/react'

export const CardBill = ({account, user, numeroFactura, total}) => {

    return(
        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Factura #.{numeroFactura}</Heading>
                <Text>Cuenta No.{account.noAccount}</Text>
                <Text>Total: {total}</Text>
                <Text color='black.600' fontSize='2xl'>
                    {user.name}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                    Add to cart
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}