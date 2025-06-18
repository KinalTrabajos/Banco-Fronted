import { Card, CardHeader, CardBody, CardFooter,Stack, Heading, Divider, ButtonGroup, Button, Text } from '@chakra-ui/react'

export const CardAccount = ({typeAccount, noAccount, user, }) => {

    return(
        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Cuenta {typeAccount} NB-{noAccount}</Heading>
                <Text> Usuario: {user} </Text>
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