import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { InfoCuenta } from "../../components/Cuenta/InfoCuenta";
import { Flex } from "@chakra-ui/react";


export const CuentaPage = () => {
    return(
        <Flex direction="column" minH="100vh" bg="gray.50">
            <Navbar/>
                <InfoCuenta/>
            <Footer/>
        </Flex>
    )
}