import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { InfoCuenta } from "../../components/Cuenta/InfoCuenta";
import { CardAccount } from "../../components/Cuenta/CardAccount";
import { Flex, HStack, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllAccounts } from "../../shared/hooks/useAllAccounts";
import { SimpleGrid } from "@chakra-ui/react";


export const CuentaPage = () => {

    const [user, setUser] = useState('');
    const { allAccounts, getAllAccounts } = useGetAllAccounts();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    }

    const filteredAccounts = searchQuery?.trim()
        ? allAccounts?.filter((prov) =>
            prov.typeAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prov.noAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prov.keeperUser?.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : allAccounts;

    if (user.role === 'USER_ROLE') {
        return (
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar />
                <InfoCuenta idUser={user.id} />

                <Footer />
            </Flex>
        )
    } else if (user.role === 'ADMIN_ROLE') {
        return (
            <Flex direction="column" minH="100vh" bg="gray.50">
                <Navbar />
                <HStack spacing={5} m={4} w="100%" maxW="500px">
                    <Input
                        placeholder="Buscar producto"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        bg="white"
                        borderColor="gray.300"
                        _hover={{ borderColor: "blue.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                    />
                    <Button
                        colorScheme="blue"
                        onClick={handleSearch}
                        px={6}
                    >
                        Buscar
                    </Button>
                </HStack>
                <SimpleGrid columns={[1, 2, 3]} spacing={6} p={4}>
                    {filteredAccounts.map((account) => (
                        <CardAccount
                            key={account._id}
                            typeAccount={account.typeAccount}
                            noAccount={account.noAccount}
                            user={account.keeperUser?.name}
                        />
                    ))}
                </SimpleGrid>
                <Footer />
            </Flex>
        )
    }
}