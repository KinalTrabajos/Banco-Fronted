import { useState } from "react"
import { addShoppingsPoints } from "../../../services/api"
import toast from "react-hot-toast"

export const useAddShoppingsPoints = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addComraPoints = async (keeperUser, items) => {
        setIsLoading(true)

        const response = await addShoppingsPoints({keeperUser, items})

        setIsLoading(false)

        if(response.error) {
            return toast.error(response?.e?.response?.data?.message || "Puntos Insuficientes para comprar")
        }

        toast.success("!Compra con Puntos realizada exitosamente")
    }

    return{
        addComraPoints,
        isLoading
    }
}