import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useState, useEffect, useRef } from "react"; 
import { Box, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { useRequestPending } from "../../shared/hooks/accountRequests/useAllRequests";
import { RequestsList } from "../../components/requests/RequestsList";
import { RequestsModal } from "../../components/requests/RequestModal";

export const AccountRequestsPage = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const printableRef = useRef();
    const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

    const { requests, getRequestsAccounts } = useRequestPending();

    useEffect(() => {
        if (user && user.id) {
        getRequestsAccounts();
    }
    }, [user]);

    if (!user) {
        return (
            <Flex direction="column" minH="100vh">
                <Navbar />
                <Flex flex="1" justify="center" align="center">
                    <Spinner size="xl" />
                    <Text ml={4}>Cargando usuario...</Text>
                </Flex>
                <Footer />
            </Flex>
        );
    }
    if(!requests){
        return(
            <Flex direction="column" minH="100vh">
                <Navbar />
                <Flex flex="1" justify="center" align="center">
                    <Spinner size="xl" />
                    <Text ml={4}>No hay Solicitudes emitidas</Text>
                </Flex>
                <Footer />
            </Flex>
        )
    }

    return (
        <Box flex="1" overflowY="auto" minH="100vh">
            <Navbar />
            <Box p={6} maxW="1200px" mx="auto">
                <Heading as="h1" size="xl" mb={6} textAlign="center">
                    Peticiones de Apertura de Cuentas
                </Heading>

                {requests.length === 0 ? (
                    <Text textAlign="center" fontSize="lg" mt={10}>
                        No hay facturas para mostrar.
                    </Text>
                ) : (
                    <RequestsList requests={requests} onSelectRequest={setSelectedRequest}/>
                )}
            </Box>
            <Footer />

            {selectedRequest && (
                <RequestsModal
                    request={selectedRequest}
                    isOpen={!!selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    printableContentRef={printableRef}
                />
            )}

        </Box>
    );
};