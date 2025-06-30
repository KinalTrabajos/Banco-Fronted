import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Stack,
  FormLabel,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useAddProducts } from "../../shared/hooks/products/useAddProducts"

export const ModalProductAdd = ({ isOpen, onClose}) => {
  const toast = useToast()
  const { addProduc, isLoading } = useAddProducts()

  const [nameProduct, setNameProduct] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const keeperUser = user?.id

    if (!nameProduct || !price || !description) {
      toast({
        title: "Campos requeridos",
        description: "Todos los campos son obligatorios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    await addProduc(nameProduct, price, description, keeperUser)
    onClose()
    setNameProduct("")
    setPrice("")
    setDescription("")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Nuevo Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <div>
              <FormLabel>Nombre del producto</FormLabel>
              <Input
                placeholder="Nombre"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>
            <div>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <FormLabel>Descripción</FormLabel>
              <Input
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
            Agregar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
