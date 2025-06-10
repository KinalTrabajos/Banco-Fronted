import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { InfoCuenta } from "../../components/Cuenta/InfoCuenta";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export const CuentaPage = () => {

    const [user, setUser] = useState('');

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        setUser(userLocal);
      }, [])


      console.log(user.uid)
    if(user.role === 'USER_ROLE'){
        return(
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar/>
                    <InfoCuenta idUser={user.uid}/>
                    
                <Footer/>
            </Flex>
        )
    }else if(user.role === 'ADMIN_ROLE'){
        return(
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar/>
                <h1>Hola mundo</h1>
                <Footer/>
            </Flex>
        )
    }
}