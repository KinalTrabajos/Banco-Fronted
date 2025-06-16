import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { InfoCuenta } from "../../components/Cuenta/InfoCuenta";
import { CardAccount } from "../../components/Cuenta/CardAccount";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllAccounts } from "../../shared/hooks/useAllAccounts";
import { SimpleGrid } from "@chakra-ui/react";


export const CuentaPage = () => {

    const [user, setUser] = useState('');
    const { allAccounts, getAllAccounts} = useGetAllAccounts();

    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        setUser(userLocal);
    }, [])

      useEffect(() => {
        if (user?.role === "ADMIN_ROLE") {
        const fetchAccount = async () => {
            await getAllAccounts();
        };
        fetchAccount();
        }
    }, [user]); 

    if(user.role === 'USER_ROLE'){
        return(
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar/>
                    <InfoCuenta idUser={user.id}/>
                    
                <Footer/>
            </Flex>
        )
    }else if(user.role === 'ADMIN_ROLE'){
        return(
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar/>
                    <SimpleGrid columns={[1, 2, 3]} spacing={6} p={4}>
                    {allAccounts.map((account) => (
                        <CardAccount
                        key={account._id}
                        typeAccount={account.typeAccount}
                        noAccount={account.noAccount}
                        user={account.keeperUser?.name}
                        />
                    ))}
                    </SimpleGrid>
                <Footer/>
            </Flex>
        )
    }
}