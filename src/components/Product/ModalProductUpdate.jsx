import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Button,
    Input,
    Stack,
    FormLabel
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useUpdateProduct } from "../../shared/hooks/products"

export const ModalProductUpdate = ({ isOpen, onClose, product }) => {
    const { editProduct, isLoading } = useUpdateProduct()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (product) {
            setName(product.nameProduct)
            setPrice(product.price)
            setDescription(product.description)
        }
    }, [product])

    const handleSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        await editProduct(product._id, name, price, description, user.id)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar producto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <FormLabel>Nombre</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                        <FormLabel>Precio</FormLabel>
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <FormLabel>Descripción</FormLabel>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancelar</Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    >
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

