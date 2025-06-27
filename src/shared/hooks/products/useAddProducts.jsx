import { addProduct } from "../../../services/api"
import { useState } from "react"
import toast from "react-hot-toast"

export const useAddProducts = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addProduc = async(nameProduct,price,description,keeperUser)=> {

        setIsLoading(true)

        const response = await addProduct({nameProduct,price,description,keeperUser})

        setIsLoading(false)

        if(response.error){
            return toast.error(response.error?.response?.data || 'Error al agregar Producto')
        }

        toast.success("Producto agregado correctamente")
        window.location.reload()
    }

    return{
        addProduc,
        isLoading
    }
}