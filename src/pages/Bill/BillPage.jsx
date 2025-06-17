import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useGetAllBills } from "../../shared/hooks/bill/useAllBills";
import { SimpleGrid, Flex } from "@chakra-ui/react";
import { CardBill } from "../../components/Bill/CardBill";

export const  BillPage = () => {
    const [user, setUser] = useState('');
    const { allBills, getAllBills} = useGetAllBills();
    
    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'));
        setUser(userLocal);
    },[])

    useEffect(() => {
        if(user?.role === "ADMIN_ROLE") {
            const fetchAccount = async () => {
                await getAllBills();
            };

            fetchAccount();
        }
    },[user])

    console.log(allBills);
    if(user.role === 'USER_ROLE'){
        return(
            <Flex direction="column" minH="100vh">
                <Navbar/>
                    <SimpleGrid columns={[1,2,3]} spacing={6} p={3}>
                        {allBills.map((bill) => (
                            <CardBill
                                key={bill._id}
                                account={bill.account}
                                user={bill.user}
                                numeroFactura={bill._id}
                                total={bill.total}
                            />
                        ))}
                    </SimpleGrid>
                <Footer/>
            </Flex>
        )
    }else if(user.role === 'ADMIN_ROLE'){
        return(
            <Flex direction="column" minH="100vh">
                <Navbar/>
                    <SimpleGrid columns={[1,2,3]} spacing={6} p={3}>
                        {allBills.map((bill) => (
                            <CardBill
                                key={bill._id}
                                account={bill.account}
                                user={bill.user}
                                numeroFactura={bill.numeroFactura}
                                total={bill.total}
                            />
                        ))}
                    </SimpleGrid>
                <Footer/>
            </Flex>
        )
    }

}