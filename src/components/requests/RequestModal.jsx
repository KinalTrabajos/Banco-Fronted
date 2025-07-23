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
  Stack,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateStatusRequests } from "../../shared/hooks/accountRequests/useUpdateRequests";
import emailjs from "@emailjs/browser";
import {
  FaUserCircle,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

export const RequestsModal = ({
  request,
  isOpen,
  onClose,
  printableContentRef,
}) => {
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const { updateRequests, message } = updateStatusRequests();

  const cardBg = useColorModeValue("white", "gray.700");
  const headerBg = useColorModeValue("purple.500", "purple.600");
  const headerColor = "white";
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const approveButtonScheme = "green";
  const denyButtonScheme = "red";
  const closeButtonScheme = "gray";
  const textareaBg = useColorModeValue("gray.50", "gray.600");
  const textareaBorderColor = useColorModeValue("gray.200", "gray.500");

  const sendEmail = (templateId, toEmail) => {
    return emailjs.send(
      "service_hd61v07",
      templateId,
      {
        to_email: toEmail,
      },
      "EqbW0eW_UPtGuoknR"
    );
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {}, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, printableContentRef]);

  const handleApprove = async () => {
    try {
      await updateRequests(request._id, { status: "approved" });
      await sendEmail("template_qe79ai8", request.email);
    } catch (error) {
      return;
    }
    onClose();
  };

  const handleDeny = async () => {
    try {
      if (showReason && reason.trim()) {
        await updateRequests(request._id, {
          status: "rejected",
          rejectionReason: reason,
        });
        await sendEmail("template_qe79ai8", request.email);
        onClose();
      } else {
        setShowReason(true);
      }
    } catch (error) {
      return;
    }
  };

  if (!request) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay
        bg={useColorModeValue("blackAlpha.600", "blackAlpha.700")}
      />
      <ModalContent borderRadius="xl" boxShadow="2xl" bg={cardBg}>
        <ModalHeader
          fontSize="2xl"
          fontWeight="bold"
          bg={headerBg}
          color={headerColor}
          borderTopRadius="xl"
          pb={4}
        >
          Detalles de la Petición de Cuenta
        </ModalHeader>
        <ModalCloseButton
          color={headerColor}
          _hover={{ bg: "whiteAlpha.300" }}
        />
        <ModalBody p={6}>
          <VStack align="start" spacing={5} mb={6}>
            <Flex align="center" justify="space-between" w="100%">
              <Heading size="md" color={textColor}>
                Petición No. {request._id}
              </Heading>
              <Badge
                colorScheme={
                  request.status === "approved"
                    ? "green"
                    : request.status === "rejected"
                    ? "red"
                    : "yellow"
                }
                px={3}
                py={1}
                borderRadius="full"
                textTransform="capitalize"
                fontSize="sm"
              >
                {request.status}
              </Badge>
            </Flex>

            <Divider borderColor={dividerColor} />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Nombre:
                </Text>{" "}
                {request.name || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Usuario:
                </Text>{" "}
                {request.username || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  DPI:
                </Text>{" "}
                {request.dpi || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Dirección:
                </Text>{" "}
                {request.direction || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Teléfono:
                </Text>{" "}
                {request.phone || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Correo:
                </Text>{" "}
                {request.email || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Trabajo:
                </Text>{" "}
                {request.work || "N/A"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Ingresos:
                </Text>{" "}
                Q
                {request.income
                  ? parseFloat(request.income).toFixed(2)
                  : "0.00"}
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Tipo de Cuenta:
                </Text>{" "}
                <Badge
                  colorScheme={
                    request.typeAccount === "Monetaria" ? "blue" : "purple"
                  }
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  {request.typeAccount || "N/A"}
                </Badge>
              </Text>
              <Text color={textColor}>
                <Text as="span" fontWeight="semibold">
                  Tipo de Solicitud:
                </Text>{" "}
                <Badge
                  colorScheme={request.dpi ? "cyan" : "orange"}
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  {request.dpi ? "Individual" : "Empresarial"}
                </Badge>
              </Text>
            </SimpleGrid>

            {showReason && (
              <VStack w="100%" align="start" mt={4}>
                <Text fontWeight="bold" color={textColor}>
                  Motivo de la denegación:
                </Text>
                <Textarea
                  placeholder="Escribe el motivo aquí..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  bg={textareaBg}
                  borderColor={textareaBorderColor}
                  color={textColor}
                  _hover={{ borderColor: denyButtonScheme + ".400" }}
                  _focus={{
                    borderColor: denyButtonScheme + ".500",
                    boxShadow: `0 0 0 1px ${denyButtonScheme}.500`,
                  }}
                  rows={3}
                />
              </VStack>
            )}
            {request.status === "rejected" && request.rejectionReason && (
              <VStack w="100%" align="start" mt={4}>
                <Text fontWeight="bold" color={textColor}>
                  Motivo de Rechazo (Registrado):
                </Text>
                <Text fontSize="md" color={subTextColor}>
                  {request.rejectionReason}
                </Text>
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter
          justifyContent="flex-end"
          flexWrap="wrap"
          gap={3}
          borderTop="1px solid"
          borderColor={dividerColor}
          pt={4}
        >
          {request.status === "pending" && (
            <>
              <Button
                colorScheme={approveButtonScheme}
                onClick={handleApprove}
                leftIcon={<Icon as={FaCheckCircle} />}
                size="lg"
                px={6}
                borderRadius="lg"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              >
                Aprobar
              </Button>
              <Button
                colorScheme={denyButtonScheme}
                onClick={handleDeny}
                leftIcon={<Icon as={FaTimesCircle} />}
                size="lg"
                px={6}
                borderRadius="lg"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              >
                {showReason ? "Confirmar Denegación" : "Denegar"}
              </Button>
            </>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            colorScheme={closeButtonScheme}
            size="lg"
            px={6}
            borderRadius="lg"
            _hover={{ bg: closeButtonScheme + ".50" }}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
