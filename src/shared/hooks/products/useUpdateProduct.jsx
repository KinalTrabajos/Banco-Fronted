import { updateProduct } from "../../../services/api"
import { useState } from "react"
import toast from "react-hot-toast"

export const useUpdateProduct = () => {
const [isLoading, setIsLoading] = useState(false)

    const editProduct = async (id, nameProduct, price, description, keeperUser) => {
        setIsLoading(true);
        const response = await updateProduct(id, {
            nameProduct,
            price,
            description,
            keeperUser
        })
        setIsLoading(false)

        if (response.error) {
            toast.error("Error al editar el producto")
            return { error: true }
        }

        toast.success("Producto editado correctamente")
        window.location.reload()
        return response
    }

    return { editProduct, isLoading }
}
