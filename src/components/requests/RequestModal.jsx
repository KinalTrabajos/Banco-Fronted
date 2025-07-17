import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    VStack,
    Divider,
    Heading,
    Textarea,
    SimpleGrid,
    Badge,
    Stack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { updateStatusRequests } from '../../shared/hooks/accountRequests/useUpdateRequests';
import emailjs from '@emailjs/browser'

export const RequestsModal = ({ request, isOpen, onClose, printableContentRef }) => {
    const [showReason, setShowReason] = useState(false);
    const [reason, setReason] = useState('');
    const { updateRequests, message } = updateStatusRequests();

    const sendEmail = (templateId, toEmail) => {
        return emailjs.send(
            'service_hd61v07',
            templateId,
            {
                to_email: toEmail,
            },
            'EqbW0eW_UPtGuoknR'
        )
    }

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => { }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, printableContentRef]);

    const handleApprove = async () => {
        try {
            updateRequests(request._id, { status: 'approved' })

            await sendEmail('template_qe79ai8', request.email);
        } catch (error) {
            console.log('error to send email', error)
            return
        }
        onClose();
    };

    const handleDeny = () => {
        try {
            if (showReason && reason.trim()) {
                updateRequests(request._id, { status: 'rejected', rejectionReason: reason })
                sendEmail('template_qe79ai8', request.email)
            } else {
                setShowReason(true);
            }
        } catch (error) {
            console.log('error to send email', error)
            return
        }
        onClose();
    };

    if (!request) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent borderRadius="2xl" boxShadow="xl">
                <ModalHeader fontSize="2xl" fontWeight="bold">
                    Detalles de la Petición para Apertura de Cuenta
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={6} mb={6}>
                        <Heading size="md">Petición No. {request._id}</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                            <Text><strong>Cliente:</strong> {request.name || "No disponible"}</Text>
                            <Text><strong>Usuario:</strong> {request.username || "No disponible"}</Text>
                            <Text><strong>DPI:</strong> {request.dpi || "No disponible"}</Text>
                            <Text><strong>Dirección:</strong> {request.direction || "No disponible"}</Text>
                            <Text><strong>Teléfono:</strong> {request.phone || "No disponible"}</Text>
                            <Text><strong>Correo:</strong> {request.email || "No disponible"}</Text>
                            <Text><strong>Trabajo:</strong> {request.work || "No disponible"}</Text>
                            <Text><strong>Ingresos:</strong> {request.income || "No disponible"}</Text>
                            <Text><strong>Tipo de Cuenta:</strong> {request.typeAccount || "No disponible"}</Text>
                            <Stack direction="row" align="center">
                                <Text><strong>Estado:</strong></Text>
                                {request.status === 'approved' && (
                                    <Badge colorScheme="green">Aprobado</Badge>
                                )}
                                {request.status === 'rejected' && (
                                    <Badge colorScheme="red">Rechazado</Badge>
                                )}
                                {request.status === 'pending' && (
                                    <Badge colorScheme="yellow">Pendiente</Badge>
                                )}
                            </Stack>

                        </SimpleGrid>

                        <Divider />

                        {showReason && (
                            <VStack w="100%" align="start">
                                <Text fontWeight="bold">Motivo de la denegación:</Text>
                                <Textarea
                                    placeholder="Escribe el motivo aquí..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </VStack>
                        )}
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent="space-between" flexWrap="wrap" gap={2}>
                    <Button colorScheme="green" onClick={handleApprove}>
                        Aprobar
                    </Button>
                    <Button colorScheme="red" onClick={handleDeny}>
                        Denegar
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
