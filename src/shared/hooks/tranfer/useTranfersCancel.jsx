import { cancelTranfers } from "../../../services/api"
import toast from "react-hot-toast"

export const useTranfersCancel = () => {
    const cancelTransfer = async (id) => {
    const response = await cancelTranfers(id)

    if (response.error) {
      return toast.error(
        response?.e?.response?.data?.msg || "Error al cancelar transferencia"
      )
    }

    toast.success("¡Transferencia cancelada exitosamente!")
    
  }

  return { cancelTransfer }
}