import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  useToast
} from "@chakra-ui/react"
import { useDeleteProduct } from "../../shared/hooks/products/useDeleteProduct"

export const ModalConfirDelete = ({ isOpen, onClose, productId, onSuccess }) => {
  const { deleteProduc } = useDeleteProduct()
  const toast = useToast()

  const handleConfirm = async () => {
    const response = await deleteProduc(productId)
    if (!response.error) {
      onSuccess()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">¿Está seguro de eliminar?</ModalHeader>
        <ModalBody textAlign="center">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
            boxSize="100px"
            mx="auto"
            mb={4}
            alt="Alerta"
          />
          <Text>Esta acción no se puede deshacer.</Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={handleConfirm}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
