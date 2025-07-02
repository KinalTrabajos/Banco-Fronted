import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { useState, useEffect, useRef } from "react"; 
import { Box, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { BillList } from "../../components/Bill/BillList";
import { BillDetailModal } from "../../components/Bill/BillDetailModal";
import { PrintableBillContent } from "../../components/Bill/PrintableBillContent";
import { useBillsByRole } from "../../shared/hooks/bill/useAllBills";

export const BillPage = () => {
    const [selectedBill, setSelectedBill] = useState(null);
    const printableRef = useRef();
    const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

    const { bills, fetchBills } = useBillsByRole(user);

    useEffect(() => {
        if (user && user.id) {
        fetchBills();
    }
    }, [user, fetchBills]);

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
    if(!bills){
        return(
            <Flex direction="column" minH="100vh">
                <Navbar />
                <Flex flex="1" justify="center" align="center">
                    <Spinner size="xl" />
                    <Text ml={4}>No hay Facturas emitidas</Text>
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
                    {user.role === "ADMIN_ROLE"
                        ? "Panel de Facturas"
                        : "Mis Facturas"}
                </Heading>

                {bills.length === 0 ? (
                    <Text textAlign="center" fontSize="lg" mt={10}>
                        No hay facturas para mostrar.
                    </Text>
                ) : (
                    <BillList bills={bills} onSelectBill={setSelectedBill} />
                )}
            </Box>
            <Footer />

            {selectedBill && (
                <BillDetailModal
                    bill={selectedBill}
                    isOpen={!!selectedBill}
                    onClose={() => setSelectedBill(null)}
                    printableContentRef={printableRef}
                />
            )}

            {selectedBill && (
                <div
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                        width: "210mm",
                        minHeight: "297mm",
                        overflow: "hidden",
                    }}
                >
                    <PrintableBillContent
                        ref={printableRef}
                        account={selectedBill.account}
                        user={selectedBill.user}
                        numeroFactura={selectedBill._id}
                        total={selectedBill.total}
                        products={selectedBill.products}
                    />
                </div>
            )}
        </Box>
    );
};