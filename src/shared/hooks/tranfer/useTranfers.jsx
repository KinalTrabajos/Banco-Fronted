import { tranfers } from "../../../services/api"
import { useState } from "react"
import toast from "react-hot-toast"

export const useTranfers = () => {
  const [isLoading, setIsLoading] = useState(false)

  const addTranfer = async (toAccount, amount, description) => {
    setIsLoading(true)

    const response = await tranfers({ toAccount, amount, description })

    setIsLoading(false)

    if (response.error) {
      return toast.error(
        response?.e?.response?.data?.message || "Número de cuenta no válido."
      )
    }

    toast.success("¡Transferencia exitosa!")
  }

  return {
    addTranfer,
    isLoading,
  }
  
}
